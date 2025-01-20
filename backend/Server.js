const express = require('express');
const dummyData = require('./Helper/dummy.json');
const historyData = require('./Helper/history.json');
const seasonal = require('./Helper/seasonal.json');
const mongoose = require('mongoose');
require('./db/Configuration');
const Product = require("./db/Data/ProductsSchema");
const UserHistory = require("./db/Data/userSchema");
const cors = require('cors');
const dotenv = require('dotenv');
const app = express();
const server = require('http').createServer(app);

// Load environment variables from .env file
dotenv.config();

// Use the environment variables from the .env file
const host = process.env.HOST || 'localhost';
const port = process.env.PORT || 3001;

// Middleware to allow CORS (Cross-Origin Resource Sharing)
app.use(cors());

// Middleware to parse JSON (add this before your route definitions)
app.use(express.json());

// Async function to handle available items
const findAvailableItems = async (sanitizedString, dummyProductsData, suggestion) => {
    try {
        if (!Array.isArray(sanitizedString) || sanitizedString.length === 0) {
            throw new Error("Invalid input: sanitizedString is empty or not an array");
        }
        if (!Array.isArray(suggestion)) {
            suggestion = [];
        }
        for (const word of sanitizedString) {
            const availableItems = dummyProductsData.filter(item =>
                item.name.toLowerCase().includes(word.toLowerCase()) && item.quantity > 0
            );
            availableItems.forEach(item => {
                const existingItem = suggestion.find(suggested => suggested.id === item.id);
                if (!existingItem) {
                    suggestion.push({ id: item.id, priority: 1 });
                } else {
                    existingItem.priority += 1;
                }
            });
        }
    } catch (error) {
        console.error("Error finding available items:", error.message);
        throw new Error("Failed to find available items");
    }
};

// Find history data that is in availableStoreData but not in suggestion
const AddHistoryDataIfAvailable = (dummyProductsData, suggestion, transformedHistory) => {

    const filteredHistoryData = transformedHistory.filter(historyItem => {
        const storeItem = dummyProductsData.find(item => item.id === historyItem.id && item.quantity > 0);
        const isInSuggestion = suggestion.some(suggested => suggested.id === historyItem.id);
        return storeItem && !isInSuggestion;
    });
    filteredHistoryData.forEach(item => {
        suggestion.push({ id: item.id, priority: 1 });
    });
};

// Find seasonal data that is in availableStoreData but not in suggestion
const AddSeasonalDataIfAvailable = (currentMonth, dummyProductsData, suggestion) => {
    if (!seasonal[currentMonth]) {
        console.log("Invalid month");
        return;
    }
    const filteredSeasonalData = seasonal[currentMonth].filter(seasonalItem => {
        const storeItem = dummyProductsData.find(item => item.id === seasonalItem.id && item.quantity > 0);
        const isInSuggestion = suggestion.some(suggested => suggested.id === seasonalItem.id);
        return storeItem && !isInSuggestion;
    });
    filteredSeasonalData.forEach(item => {
        suggestion.push({ id: item.id, priority: 1 });
    });
};

// Async function to handle history items
const findItemInHistory = async (suggestion, transformedHistory) => {
    try {
        for (const suggestedItem of suggestion) {
            const historyItem = transformedHistory.find(item => item.id === suggestedItem.id);
            if (historyItem) {
                suggestedItem.priority += 1;
            }
        }
    } catch (error) {
        console.error("Error finding available items:", error.message);
        throw new Error("Failed to find available items");
    }
};

// Async function to handle seasonal items
const findItemInSeasonal = async (currentMonth, suggestion) => {
    try {
        if (!seasonal[currentMonth]) {
            throw new Error(`No data found for the month: ${currentMonth}`);
        }
        for (const suggestedItem of suggestion) {
            const seasonalItems = seasonal[currentMonth];
            const seasonalItem = seasonalItems.find(item => item.id === suggestedItem.id);
            if (seasonalItem) {
                suggestedItem.priority += 1;
            }
        }
    } catch (error) {
        console.error("Error finding available items:", error.message);
        throw new Error("Failed to find available items");
    }
};

const sanitizeAndCleanString = (key1) => {
    const sanitizedArray = key1
        .replace(/[^a-zA-Z\s]/g, "")
        .toLowerCase()
        .split(/\s+/)
        .filter(word => word.length > 1);
    const uniqueWords = [...new Set(sanitizedArray)];
    return uniqueWords;
};

const getCurrentMonthInIndia = () => {
    const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
    const currentMonth = months[new Date().getMonth()];
    return currentMonth;
};

// Function to make suggestions
const CallSuggestion = async (key1, transformedHistory) => {
    try {
        let suggestion = [];
        const dummyProductsData = await Product.find();
        const sanitizedString = sanitizeAndCleanString(key1);
        const currectMonth = getCurrentMonthInIndia();
        await findAvailableItems(sanitizedString, dummyProductsData, suggestion);
        await findItemInHistory(suggestion, transformedHistory);
        await findItemInSeasonal(currectMonth, suggestion);
        AddHistoryDataIfAvailable(dummyProductsData, suggestion, transformedHistory);
        AddSeasonalDataIfAvailable(currectMonth, dummyProductsData, suggestion);
        suggestion.sort((a, b) => b.priority - a.priority);
        return suggestion;
    } catch (error) {
        console.error("Error in suggestion function:", error);
    }
};

// API endpoint to send suggestion data to the frontend
app.post('/api/suggestion/:username', async (req, res, next) => {
    try {
        const { username } = req.params;
        const { key1 } = req.body;
        if (!req.body) {
            return res.status(400).json({
                success: false,
                message: 'Invalid request: "key1" is required in the request body',
            });
        }
        let user = await UserHistory.findOne({ username });
        if (!user) {
            user = new UserHistory({
                username,
                history: [],
                cart: [],
            });
        }
        let suggestion = [];
        const userHistory = await UserHistory.findOne({ username }).populate("history.product");
        let transformedHistory = [];
        if (userHistory) {
            transformedHistory = userHistory.history.map(item => ({
                id: item.product.id,
                name: item.product.name,
                category: item.product.category,
                price: item.product.price,
                quantity: item.product.quantity
            }));
        }

        if (key1.length > 0 && transformedHistory.length > 0) {
            suggestion = await CallSuggestion(key1, transformedHistory);
            const uniqueSuggestions = new Map();
            suggestion.forEach(product => {
                if (!uniqueSuggestions.has(product.id)) {
                    uniqueSuggestions.set(product.id, product);
                }
            });
            suggestion = Array.from(uniqueSuggestions.values());
        } else if (transformedHistory.length > 0) {
            suggestion = transformedHistory;
        }

        if (!suggestion || suggestion.length === 0) {
            return res.status(404).json({
                success: false,
                message: 'No suggestions found',
            });
        }
        const products = await Product.find();
        if(products) {
            let makeFormatedData = [];
            await products.forEach(product => {
                const matchedItem = suggestion.find(item => item.id === product.id && product.quantity > 0);
                if (matchedItem) {
                    makeFormatedData.push(product);
                }
            });
            suggestion = makeFormatedData;
        }

        const isValidData = suggestion.every(product => product.id && product.name);
        if (!isValidData) {
            return res.status(400).json({
                success: false,
                message: 'Invalid product data format: id and name are required for each product',
            });
        }

        res.status(200).json({
            success: true,
            message: 'Suggestions fetched successfully',
            data: suggestion,
        });
    } catch (error) {
        console.error('Error fetching suggestions:', error);
        next(error);
    }
});

// API endpoint to send product data to the frontend
app.get('/api/products', async (req, res, next) => {
    try {
        const products = await Product.find();
        if (!products || products.length === 0) {
            const error = new Error('No products found in the database');
            error.statusCode = 404;
            throw error;
        }
        res.status(200).json({
            success: true,
            message: 'Products fetched successfully',
            data: products,
        });
    } catch (error) {
        next(error);
    }
});

// API endpoint to add product data to the frontend
app.post('/api/addProduct', async (req, res, next) => {
    try {
        const { id, name, category, price, quantity } = req.body;
        if (!id || !name || !category || !price || !quantity) {
            const error = new Error('All fields are required: id, name, category, price, and quantity');
            error.statusCode = 400;
            throw error;
        }
        const existingProduct = await Product.findOne({ id });
        if (existingProduct) {
            const error = new Error('Product with this ID already exists');
            error.statusCode = 409;
            throw error;
        }
        const newProduct = new Product({
            id,
            name,
            category,
            price,
            quantity,
        });
        await newProduct.save();
        res.status(201).json({
            success: true,
            message: 'Product added successfully',
            data: newProduct,
        });
    } catch (error) {
        next(error);
    }
});

// API endpoint to update product data
app.put('/api/updateProduct', async (req, res, next) => {
    try {
        const { id, name, category, price, quantity } = req.body;
        if (!id) {
            const error = new Error('Product ID is required for updating');
            error.statusCode = 400;
            throw error;
        }
        const product = await Product.findOne({ id });
        if (!product) {
            const error = new Error('Product with this ID does not exist');
            error.statusCode = 404;
            throw error;
        }

        // Ensure the quantity is always >= -1
        if (quantity < 0) {
            const error = new Error('Product quantity cannot be less than 0');
            error.statusCode = 400;
            throw error;
        }

        if (name) product.name = name;
        if (category) product.category = category;
        if (price) product.price = price;
        if (quantity) product.quantity = quantity;
        await product.save();
        res.status(200).json({
            success: true,
            message: 'Product updated successfully',
            data: product,
        });
    } catch (error) {
        next(error);
    }
});

// API to add history
app.post('/api/addHistory/:username', async (req, res) => {
    const { username } = req.params;
    const { productId, productName, category, price, quantity } = req.body;
    try {
        let userHistory = await UserHistory.findOne({ username });
        if (!userHistory) {
            // Create new user history if not found
            userHistory = new UserHistory({
                username,
                history: [
                    {
                        product: {
                            id: productId,
                            name: productName,
                            category,
                            price,
                            quantity,
                        },
                        purchaseDate: new Date(),
                    },
                ],
            });
        } else {
            // Add the new purchase to the user's history
            userHistory.history.push({
                product: {
                    id: productId,
                    name: productName,
                    category,
                    price,
                    quantity,
                },
                purchaseDate: new Date(),
            });

            // Remove the product from the user's cart by productId
            userHistory.cart = userHistory.cart.filter(
                (cartItem) => cartItem.product.id !== productId
            );
        }
        // Save the updated user history
        await userHistory.save();
        res.status(201).json({
            success: true,
            message: 'Purchase history added successfully and product removed from cart',
            data: userHistory,
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal server error' });
    }
});

// API to get history of a user by username
app.get('/api/history/:username', async (req, res) => {
    try {
        const { username } = req.params;
        const userHistory = await UserHistory.findOne({ username }).populate("history.product");
        if (!userHistory) {
            return res.status(404).json({ message: "User history not found" });
        }
        const transformedHistory = userHistory.history.map(item => ({
            id: item.product.id,
            name: item.product.name,
            category: item.product.category,
            price: item.product.price,
            quantity: item.product.quantity
        }));
        res.status(200).json({
            success: true,
            message: "User history fetched successfully",
            data: transformedHistory
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Internal server error" });
    }
});

// API to endpoint to add product to cart or update both.
app.post('/api/handleToCart/:username', async (req, res) => {
    const { username } = req.params;
    const { id, name, category, price, quantity, call } = req.body;

    try {
        // Validate the request body
        if (!id || !name || !category || !price || quantity === undefined || quantity < 0) {
            return res.status(400).json({
                success: false,
                message: 'All fields are required: id, name, category, price, and quantity.',
            });
        }

        // Check if the product exists in the store
        const existingProduct = await Product.findOne({ id });
        if (!existingProduct) {
            return res.status(409).json({
                success: false,
                message: 'Product with this ID does not exist in the product list.',
            });
        }

        // Handle stock availability for adding products
        if (call === "add" && existingProduct.quantity === 0) {
            return res.status(409).json({
                success: false,
                message: 'Product is out of stock.',
            });
        }

        // Adjust the quantities based on the action
        const StoreQuantity = call === "remove" ? existingProduct.quantity + 1 : existingProduct.quantity - 1;

        if (StoreQuantity < 0) {
            return res.status(409).json({
                success: false,
                message: 'Insufficient stock to add this product.',
            });
        }

        // Find or create the user's cart
        let userCart = await UserHistory.findOne({ username });
        if (!userCart) {
            userCart = new UserHistory({
                username,
                cart: [],
            });
        }

        // Check if the product is already in the user's cart
        const productIndex = userCart.cart.findIndex((item) => item.product.id === id);
        if (productIndex >= 0) {
            const productInCart = userCart.cart[productIndex];
            // Update the quantity of the product in the cart
            if (productInCart.product.quantity <= 1 && call === "remove") {
                // Remove the product if quantity drops to zero
                userCart.cart.splice(productIndex, 1);
            } else {
                (call === "add") ? userCart.cart[productIndex].product.quantity += 1 : userCart.cart[productIndex].product.quantity -= 1;
                userCart.cart[productIndex].cartDate = new Date(); // Update cart date
            }
        } else if (call === "add") {
            // Add the product to the cart
            userCart.cart.push({
                product: {
                    id,
                    name,
                    category,
                    price,
                    quantity: 1,
                },
                cartDate: new Date(),
            });
        } else {
            return res.status(409).json({
                success: true,
                message: 'Cart is empty or product not found.',
                data: userCart,
            });
        }

        // Save the updated user cart
        await userCart.save();
        // Update the product inventory in the store
        existingProduct.quantity = StoreQuantity;
        await existingProduct.save();

        res.status(201).json({
            success: true,
            message: 'Product updated in cart successfully.',
            data: userCart,
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, message: 'Internal server error.' });
    }
});

// API to endpoint to get all produts to cart
app.get('/api/getCart/:username', async (req, res) => {
    const { username } = req.params;

    try {
        // Find the user's history record
        const userHistory = await UserHistory.findOne({ username });

        if (!userHistory) {
            return res.status(404).json({
                success: false,
                message: 'User not found or cart is empty.',
            });
        }

        // Retrieve the cart products
        const cartProducts = userHistory.cart.map((cartItem) => ({
            id: cartItem.product.id,
            name: cartItem.product.name,
            category: cartItem.product.category,
            price: cartItem.product.price,
            quantity: cartItem.product.quantity,
            cartDate: cartItem.cartDate,
        }));

        if (cartProducts.length === 0) {
            return res.status(200).json({
                success: true,
                message: 'Cart is empty.',
                data: [],
            });
        }

        res.status(200).json({
            success: true,
            message: 'Cart products retrieved successfully.',
            data: cartProducts,
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, message: 'Internal server error.' });
    }
});

// Dummy API's --------------------------------------------

// API to add dummy data on history for multiple products without removing from cart
app.post('/api/dummy/addHistory/:username', async (req, res) => {
    const { username } = req.params;
    if (!historyData || !Array.isArray(historyData) || historyData.length === 0) {
        return res.status(400).json({
            success: false,
            message: 'Products array is required and should not be empty',
        });
    }
    try {
        let userHistory = await UserHistory.findOne({ username });
        const purchaseItems = historyData.map(product => ({
            product: {
                id: product.id,
                name: product.name,
                category: product.category,
                price: product.price,
                quantity: product.quantity,
            },
            purchaseDate: new Date(),
        }));
        if (!userHistory) {
            userHistory = new UserHistory({
                username,
                history: purchaseItems,
                cart: [],
            });
        } else {
            userHistory.history.push(...purchaseItems);
        }
        await userHistory.save();
        res.status(201).json({
            success: true,
            message: 'Purchase history added successfully',
            data: userHistory,
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, message: 'Internal server error' });
    }
});

// API to add dummy data in product list
app.get('/api/dummy/addProducts', async (req, res, next) => {
    try {
        const products = dummyData;

        if (!Array.isArray(products) || products.length === 0) {
            const error = new Error('Request body should be an array of products');
            error.statusCode = 400;
            throw error;
        }

        const invalidProducts = products.filter(product =>
            !product.id || !product.name || !product.category || !product.price || !product.quantity
        );

        if (invalidProducts.length > 0) {
            const error = new Error('One or more products have missing fields');
            error.statusCode = 400;
            throw error;
        }

        // Check if products with the same id already exist in the database
        const existingProductIds = await Product.find({ 'id': { $in: products.map(p => p.id) } }).distinct('id');

        // Filter out products that already exist in the database
        const newProducts = products.filter(product => !existingProductIds.includes(product.id));

        if (newProducts.length > 0) {
            const savedProducts = await Product.insertMany(newProducts); // Save only new products to the database
            res.status(201).json({
                success: true,
                message: 'Products added successfully',
                data: savedProducts
            });
        } else {
            res.status(200).json({
                success: true,
                message: 'No new products to add'
            });
        }
    } catch (error) {
        next(error);
    }
});

// -----------------------------------------------------------

// General error handler middleware
app.use((err, req, res, next) => {
    console.error(err.stack); // Log the error details for debugging purposes

    const statusCode = err.statusCode || 500; // Default to 500 if no statusCode is set
    const message = err.message || 'Internal Server Error'; // Default error message

    // Return a structured error response
    res.status(statusCode).json({
        error: true,
        message: message,
        stack: process.env.NODE_ENV === 'production' ? null : err.stack, // Don't send stack trace in production
    });
});

// Start the server.
mongoose.connection.on('error', (error) => {
    console.error('Error connecting to database: ', error);
});

// Check database connection.
mongoose.connection.once('open', () => {
    console.log('Database connected.');
    server.listen(port, host, () => {
        console.log(`Server is running on http://${host}:${port}`);
    });
});