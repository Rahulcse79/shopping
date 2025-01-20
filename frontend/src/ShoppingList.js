import React, { useEffect, useState } from 'react';
import { FaCartArrowDown } from 'react-icons/fa6';
import { MdKeyboardVoice } from "react-icons/md";
import { FaMoneyCheckAlt } from "react-icons/fa";
import './Css/ShoppingList.css';
import Wave from './Images/wave.gif';
import WavePic from './Images/pic_wave.png';

const ShoppingList = () => {

    const [products, setProducts] = useState([]);  // Initialize as an empty array
    const [showList, setShowList] = useState(false);
    const [cartPoducts, setCartProducts] = useState([]);  // State to cart data
    const [history, setHistory] = useState([]);  // State to history data
    const [suggestion, setSuggestion] = useState([]);  // State to suggestion data
    const [showPopup, setShowPopup] = useState(false); // State to control popup visibility
    const [showVoicePopup, setShowVoicePopup] = useState(false); // State to control voice popup visibility
    const [currentPage, setCurrentPage] = useState(1);
    const [transcript, setTranscript] = useState(""); // Store the transcribed text
    const [showHistory, setShowHistory] = useState(false); // History state
    const [showSuggestion, setShowSuggestion] = useState(false); // Suggestion state
    const [showDummyForm, setShowDummyForm] = useState(false);
    const [listening, setListening] = useState(false);
    const [language, setLanguage] = useState("en-US");
    const [error, setError] = useState(null);
    const recognitionRef = React.useRef(null);
    const username = "admin"; // default user.

    const itemsPerPage = 6;
    // Calculate the index of the first and last items on the current page
    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;

    // Get the current items to display
    let currentItems = cartPoducts.slice(indexOfFirstItem, indexOfLastItem);

    // Handle next and previous button clicks
    const nextPage = () => setCurrentPage((prev) => prev + 1);
    const prevPage = () => setCurrentPage((prev) => prev - 1);

    // Access environment variables for the server config.
    const ServerSecure = process.env.REACT_APP_SERVER_SECURE || "http";
    const ServerHost = process.env.REACT_APP_SERVER_HOST || "170.187.248.8";
    const ServerPort = process.env.REACT_APP_SERVER_PORT || 3999;

    useEffect(() => {
        if (!("webkitSpeechRecognition" in window || "SpeechRecognition" in window)) {
            setError("Speech Recognition API is not supported in this browser.");
            return;
        }

        const SpeechRecognition =
            window.SpeechRecognition || window.webkitSpeechRecognition;

        recognitionRef.current = new SpeechRecognition();
        recognitionRef.current.continuous = true;
        recognitionRef.current.interimResults = true;
        recognitionRef.current.lang = language;

        recognitionRef.current.onresult = (event) => {
            let interimTranscript = "";
            let finalTranscript = "";

            for (let i = 0; i < event.results.length; i++) {
                const transcript = event.results[i][0].transcript;
                if (event.results[i].isFinal) {
                    finalTranscript += transcript;
                } else {
                    interimTranscript += transcript;
                }
            }

            setTranscript(finalTranscript + " " + interimTranscript);
        };

        recognitionRef.current.onerror = (event) => {
            setError(`Error occurred in recognition: ${event.error}`);
        };
    }, [language]);

    const handleStart = () => {
        if (recognitionRef.current) {
            setListening(true);
            recognitionRef.current.lang = language;
            recognitionRef.current.start();
        }
    };

    const handleStop = () => {
        if (recognitionRef.current) {
            setListening(false);
            recognitionRef.current.stop();
        }
    };

    const filterProducts = () => {
        const words = transcript.split(/\s+/).map(word => word.toLowerCase()).filter(word => word.trim().length > 0);
        if (!words || words.length === 0) {
            return products;
        }
        const occurrencesUnder = words.filter(word => word === "under");
        const occurrencesMore = words.filter(word => word === "more");
        const numbers = transcript.match(/\d+/g);
        let priceFilter = { min: null, max: null };
        if (numbers) {
            const [firstNum, secondNum] = numbers.map(Number);
            if (occurrencesUnder.length > 0) {
                priceFilter.max = firstNum;
            } else if (occurrencesMore.length > 0) {
                priceFilter.min = firstNum;
            }
        }
        const result = products.filter(item => {
            const matchesSearchTerm = words.some(word =>
                item.name.toLowerCase().includes(word) || item.category.toLowerCase().includes(word)
            );
            const matchesPriceRange = (priceFilter.min === null || item.price >= priceFilter.min) &&
                (priceFilter.max === null || item.price <= priceFilter.max);
            return matchesSearchTerm && matchesPriceRange;
        });

        return result;
    };

    const filteredProducts = filterProducts();

    const handleLanguageChange = (e) => {
        setLanguage(e.target.value);
    };

    const fetchProducts = async () => {
        try {
            const response = await fetch(`${ServerSecure}://${ServerHost}:${ServerPort}/api/products`);
            if (!response.ok) {
                if (response.status === 404) {
                    throw new Error('No products found');
                } else if (response.status === 500) {
                    throw new Error('Internal server error. Please try again later.');
                } else {
                    throw new Error(`Error: ${response.statusText}`);
                }
            }

            const data = await response.json();
            // Ensure the response is an array
            if (!Array.isArray(data.data)) {
                throw new Error('Invalid data format: expected an array');
            }

            if (data.error) {
                throw new Error(data.message || 'Something went wrong');
            }

            setProducts(data.data); // Set the product data
        } catch (error) {
            console.error(error.message || 'An unexpected error occurred');
        }
    };

    const fetchHistorys = async () => {
        try {
            const response = await fetch(`${ServerSecure}://${ServerHost}:${ServerPort}/api/history/${username}`);
            if (!response.ok) {
                // Handle non-200 responses
                if (response.status === 404) {
                    throw new Error('No history found');
                } else if (response.status === 500) {
                    throw new Error('Internal server error. Please try again later.');
                } else {
                    throw new Error(`Error: ${response.statusText}`);
                }
            }

            const data = await response.json();
            // Ensure the response is an array
            if (!Array.isArray(data.data)) {
                throw new Error('Invalid data format: expected an array');
            }

            if (data.error) {
                throw new Error(data.message || 'Something went wrong');
            }

            setHistory(data.data); // Set the history data
        } catch (error) {
            console.error(error.message || 'An unexpected error occurred');
        }
    };

    const SuggestionAPICall = async () => {
        const payload = {
            key1: transcript,
        };

        try {
            const response = await fetch(`${ServerSecure}://${ServerHost}:${ServerPort}/api/suggestion/${username}`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json', // Set the content type to JSON
                },
                body: JSON.stringify(payload), // Convert the payload object to JSON
            });

            if (!response.ok) {
                switch (response.status) {
                    case 404:
                        throw new Error('No suggestions found. Please check back later.');
                    case 500:
                        throw new Error('Internal server error. Please try again later.');
                    default:
                        throw new Error(`Unexpected error: ${response.statusText}`);
                }
            }

            const data = await response.json();

            if (data.error) {
                throw new Error(data.message || 'An unknown error occurred');
            }

            if (!Array.isArray(data.data)) {
                throw new Error('Invalid data format. Expected an array.');
            }
            let makeFormatedData = [];
            setSuggestion(data.data);
        } catch (error) {
            console.error('Error fetching suggestions:', error.message);
        }
    }

    const BuyAPICall = async (product) => {

        if (typeof product.id === 'undefined' || !product.name || !product.category || !product.price || !product.quantity) {
            console.error('Missing required fields');
            return;
        }

        const payload = {
            productId: product.id,
            productName: product.name,
            category: product.category,
            price: product.price,
            quantity: product.quantity,
        };

        try {
            // Make the API request
            const response = await fetch(`${ServerSecure}://${ServerHost}:${ServerPort}/api/addHistory/${username}`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(payload),
            });
            // Handle non-OK responses
            if (!response.ok) {
                switch (response.status) {
                    case 404:
                        throw new Error('User history not found. Please check the username.');
                    case 500:
                        throw new Error('Internal server error. Please try again later.');
                    default:
                        throw new Error(`Unexpected error: ${response.statusText}`);
                }
            }
            const data = await response.json();
            if (data.success) {
                alert("Item purchased successfully, ID: " + product.id);
            } else {
                alert(data.message || 'An unknown error occurred');
            }

        } catch (error) {
            console.error('Error adding purchase history:', error.message);
        }
    };

    const handleListClick = () => {
        fetchProducts();
        setShowList(true);
        setShowSuggestion(false);
        setShowHistory(false);
        setShowDummyForm(false);
    };

    const ClearClick = () => {
        setTranscript("");
    };

    const AddOrUpdateProductTOCart = async (product, call) => {
        const { id, name, category, price, quantity } = product;

        try {
            const response = await fetch(`${ServerSecure}://${ServerHost}:${ServerPort}/api/handleToCart/${username}`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    id,
                    name,
                    category,
                    price,
                    quantity,
                    call, // 'add' or 'remove'
                }),
            });

            const result = await response.json();

            if (!response.ok) {
                console.log(result);
                alert(result.message || 'Failed to update the cart. Please try again.');
                return;
            }
            await fetchProducts();
            alert(result.message || 'Product successfully updated in the cart.');
        } catch (error) {
            console.error("Error updating the cart:", error);
            alert('An error occurred while updating the cart. Please try again later.');
        }
    };

    const handleAddProduct = async (product) => {
        if (product.quantity === 0) {
            alert('The product is out of stock.');
            return;
        }
        await AddOrUpdateProductTOCart(product, "add");
    };

    const handleRemoveProduct = async (product) => {
        await AddOrUpdateProductTOCart(product, "remove");
    };

    const CartAPICall = async () => {
        try {
            const response = await fetch(`${ServerSecure}://${ServerHost}:${ServerPort}/api/getCart/${username}`);
            if (!response.ok) {
                if (response.status === 404) {
                    throw new Error('No products found');
                } else if (response.status === 500) {
                    throw new Error('Internal server error. Please try again later.');
                } else {
                    throw new Error(`Error: ${response.statusText}`);
                }
            }

            const data = await response.json();
            // Ensure the response is an array
            if (!Array.isArray(data.data)) {
                throw new Error('Invalid data format: expected an array');
            }

            if (data.error) {
                throw new Error(data.message || 'Something went wrong');
            }

            setCartProducts(data.data);
        } catch (error) {
            console.error(error.message || 'An unexpected error occurred');
        }
    }

    const handleCartClick = async () => {
        await CartAPICall();
        setShowPopup(true);
        setCurrentPage(1);
    };

    const closePopup = () => {
        setShowPopup(false);
    };

    const handleVoiceClick = () => {
        setShowVoicePopup(!showVoicePopup);
        setListening(false);
    }

    const handleHistoryClick = () => {
        fetchHistorys();
        setShowList(false);
        setShowDummyForm(false);
        setShowSuggestion(false);
        setShowHistory(true);
        setCurrentPage(1);
    }

    const handleSuggestionClick = async () => {
        SuggestionAPICall();
        setCurrentPage(1);
        setShowList(false);
        setShowHistory(false);
        setShowDummyForm(false);
        setShowSuggestion(true);
    };

    const handleDummyClick = async () => {
        setShowHistory(false);
        setShowList(false);
        setShowSuggestion(false);
        setShowDummyForm(true);
    }

    const DummyDataShoppingList = async () => {
        try {
            const response = await fetch(`${ServerSecure}://${ServerHost}:${ServerPort}/api/dummy/addProducts`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                }
            });

            if (!response.ok) {
                switch (response.status) {
                    case 404:
                        throw new Error('No dummy data found. Please check back later.');
                    case 500:
                        throw new Error('Internal server error. Please try again later.');
                    default:
                        throw new Error(`Unexpected error: ${response.statusText}`);
                }
            }

            const data = await response.json();

            if (data.error) {
                throw new Error(data.message || 'An unknown error occurred');
            }

            if (data.success) {
                alert("Dummy data added successfully !");
            }
        } catch (error) {
            console.error('Error fetching dummy shopping api: ', error.message);
        }
    }

    const DummyDataHistoryList = async () => {
        try {
            const response = await fetch(`${ServerSecure}://${ServerHost}:${ServerPort}/api/dummy/addHistory/${username}`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                }
            });

            if (!response.ok) {
                switch (response.status) {
                    case 404:
                        throw new Error('No dummy data found. Please check back later.');
                    case 500:
                        throw new Error('Internal server error. Please try again later.');
                    default:
                        throw new Error(`Unexpected error: ${response.statusText}`);
                }
            }

            const data = await response.json();

            if (data.error) {
                throw new Error(data.message || 'An unknown error occurred');
            }

            if (data.success) {
                alert("Dummy data added successfully !");
            }
        } catch (error) {
            console.error('Error fetching dummy shopping api: ', error.message);
        }
    }

    return (
        <>
            <div className="navbar">
                <nav className="navbar-container">
                    <h1>Shopping website</h1>
                </nav>
                <div className="button-container">
                    <button className="nav-button" onClick={handleListClick}>Shopping list</button>
                    <button className="nav-button" onClick={handleSuggestionClick}>Suggestion list</button>
                    <button className="nav-button" onClick={handleHistoryClick}>History list</button>
                    <button className="nav-button" onClick={handleDummyClick}>Add dummy data</button>
                </div>
            </div>

            {showDummyForm && (
                <div className="form-container">
                    <form className="form">
                        <h2 className="form-title">Add dummy data</h2>
                        <div className="form-buttons">
                            <button type="button" className="form-button" onClick={DummyDataShoppingList}>Shopping list</button>
                            <button type="button" className="form-button" onClick={DummyDataHistoryList}>History</button>
                        </div>
                    </form>
                </div>
            )}

            {showList && (<div>
                <h1>Shopping List</h1>
                <div className="search-label">
                    <p className="transcript"><span className="search-text">Search:</span> {transcript ? transcript : "No string search"}</p>
                </div>
                {filteredProducts.length === 0 ? (
                    <p>No products match your search. Try a different term.</p>
                ) : (
                    <table className="shopping-list-table">
                        <thead>
                            <tr>
                                <th>Serial no.</th>
                                <th>Name</th>
                                <th>Category</th>
                                <th>Quantity</th>
                                <th>Price</th>
                                <th>Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {filteredProducts.map((product, index) => (
                                <tr key={product.id}>
                                    <td>{index + 1}</td>
                                    <td>{product.name}</td>
                                    <td>{product.category}</td>
                                    <td>{product.quantity}</td>
                                    <td>${product.price.toFixed(2)}</td>
                                    <td>
                                        <button
                                            onClick={() => handleRemoveProduct(product)}
                                            className="remove-button"
                                        >
                                            Remove
                                        </button>
                                        <button
                                            onClick={() => handleAddProduct(product)}
                                            className="add-button"
                                        >
                                            Add
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                )}
            </div>)}

            {showSuggestion && (<div>
                <h1>Your suggestion list</h1>
                {suggestion.length === 0 ? (
                    <p>No products available.</p>
                ) : (
                    <div>
                        <table className="shopping-list-table">
                            <thead>
                                <tr>
                                    <th>Serial no.</th>
                                    <th>Name</th>
                                    <th>Category</th>
                                    <th>Quantity</th>
                                    <th>Price</th>
                                    <th>Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                {suggestion.map((product, index) => (
                                    <tr key={product.id}>
                                        <td>{index + 1}</td>
                                        <td>{product.name}</td>
                                        <td>{product.category}</td>
                                        <td>{product.quantity}</td>
                                        <td>${product.price.toFixed(2)}</td>
                                        <td>
                                            <button onClick={() => handleRemoveProduct(product.id)} className="remove-button">Remove</button>
                                            <button onClick={() => handleAddProduct(product.id)} className="add-button">Add</button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                )}
            </div>)}

            {showHistory && (
                <div>
                    <h1>Your history list</h1>
                    {history.length === 0 ? (
                        <p>No history products available.</p>
                    ) : (
                        <table className="shopping-list-table">
                            <thead>
                                <tr>
                                    <th>Serial no.</th>
                                    <th>Name</th>
                                    <th>Category</th>
                                    <th>Quantity</th>
                                    <th>Total price</th>
                                </tr>
                            </thead>
                            <tbody>
                                {history.map((product, index) => (
                                    <tr key={product.id}>
                                        <td>{index + 1}</td>
                                        <td>{product.name}</td>
                                        <td>{product.category}</td>
                                        <td>{product.quantity}</td>
                                        <td>${product.price.toFixed(2) * product.quantity}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    )}
                </div>
            )}

            <button className="voice-button" onClick={handleVoiceClick}>
                <MdKeyboardVoice size={30} />
            </button>

            {showVoicePopup && (
                <div className="voice-popup">
                    <div className="voice-popup-content">
                        <h2>Speak here</h2>
                        <img src={(listening !== false) ? Wave : WavePic} alt="Voice gif" className="voice-image" />
                        <h1>Speech to Text</h1>
                        {error && <p className="error-message">{error}</p>}
                        <div className="language-selector">
                            <label htmlFor="language">Choose a language: </label>
                            <select id="language" value={language} onChange={handleLanguageChange}>
                                <option value="en-US">English (US)</option>
                                <option value="en-GB">English (UK)</option>
                                <option value="es-ES">Spanish (Spain)</option>
                                <option value="fr-FR">French (France)</option>
                                <option value="de-DE">German</option>
                                <option value="hi-IN">Hindi (India)</option>
                                <option value="zh-CN">Chinese (Mandarin)</option>
                                <option value="ja-JP">Japanese</option>
                                <option value="ko-KR">Korean</option>
                                <option value="it-IT">Italian</option>
                                <option value="ru-RU">Russian</option>
                                <option value="ar-SA">Arabic</option>
                                <option value="pt-BR">Portuguese (Brazil)</option>
                            </select>
                        </div>
                        <div className="button-container">
                            <button onClick={handleStart} disabled={listening} className="btn start">
                                Start Listening
                            </button>
                            <button onClick={handleStop} disabled={!listening} className="btn stop">
                                Stop Listening
                            </button>
                        </div>
                        <h3>Transcript:</h3>
                        <span style={{ color: "red", fontSize: "12px" }}>
                            Currently, the system supports only English due to the high cost of Google Translation API, which requires a paid subscription for additional languages beyond the default supported language.
                        </span>
                        <div className="transcript-box">
                            <textarea
                                value={transcript}
                                onChange={(event) => setTranscript(event.target.value)}
                                rows="5"
                                cols="50"
                            />
                        </div>
                        <button className="close-button" onClick={ClearClick}>
                            Clear
                        </button>
                        <button className="close-button" onClick={handleVoiceClick}>
                            Close
                        </button>
                    </div>
                </div>
            )}

            <button className="cart-button" onClick={handleCartClick}>
                <FaCartArrowDown size={30} />
            </button>

            {showPopup && (
                <div className="popup">
                    <div className="popup-content">
                        <h2>Your Cart</h2>
                        <table className="popup-table">
                            <thead>
                                <tr>
                                    <th>Serial no.</th>
                                    <th>Name</th>
                                    <th>Category</th>
                                    <th>Quantity</th>
                                    <th>Total price</th>
                                    <th>Buy</th>
                                </tr>
                            </thead>
                            <tbody>
                                {currentItems.map((product, index) => (
                                    <tr key={product.id}>
                                        <td>{indexOfFirstItem + index + 1}</td>
                                        <td>{product.name}</td>
                                        <td>{product.category}</td>
                                        <td>{product.quantity}</td>
                                        <td>${product.price.toFixed(2) * product.quantity}</td>
                                        <FaMoneyCheckAlt size={30} onClick={() => BuyAPICall(product)} style={{ cursor: 'pointer' }} />
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                        <div className="pagination">
                            <button onClick={prevPage} disabled={currentPage === 1}>
                                Previous
                            </button>
                            <button
                                onClick={nextPage}
                                disabled={indexOfLastItem >= cartPoducts.length}
                            >
                                Next
                            </button>
                        </div>
                        <button className="close-button" onClick={closePopup}>
                            Close
                        </button>
                    </div>
                </div>
            )}

        </>
    );
};

export default ShoppingList;
