import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import NavBar from "./components/NavBar";
import Footer from "./components/Footer";
import ProductPage from "./pages/ProductPage";
import LoginSignUpPage from "./pages/LoginSignUpPage";
import "./styles/App.css";

function App() {
  return (
    <div>
      <BrowserRouter>
        <NavBar />
        <Routes>
          <Route path="/products" element={<ProductPage />} />
          <Route path="/login" element={<LoginSignUpPage />} />
        </Routes>
        <Footer />
      </BrowserRouter>
    </div>
  );
}

export default App;
