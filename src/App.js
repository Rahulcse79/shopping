import './Css/App.css';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import ShoppingList from "./ShoppingList";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          
          <Route path="/" element={<ShoppingList />} />

        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
