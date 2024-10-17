import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import NavBar from "./components/NavBar";
import HomePage from "./pages/HomePage";
import Footer from "./components/Footer";
import ProductPage from "./pages/ProductPage";
import LoginSignUpPage from "./pages/LoginSignUpPage";
import PrivateRoute from "./components/PrivateRoute";
import { AuthProvider } from "./context/AuthContext";
import "./styles/App.css";

function App() {
  return (
    <div>
      <AuthProvider>
        <BrowserRouter>
          <NavBar />
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/login" element={<LoginSignUpPage wantLogin={true} />} />
            <Route path="/register" element={<LoginSignUpPage wantLogin={false} />} />
            
            <Route
              path="/products"
              element={
                <PrivateRoute>
                  <ProductPage />
                </PrivateRoute>
              }
            />
          </Routes>
          <Footer />
        </BrowserRouter>
      </AuthProvider>
    </div>
  );
}

export default App;
