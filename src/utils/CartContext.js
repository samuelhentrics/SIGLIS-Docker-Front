import React, { createContext, useContext, useState } from "react";

// Création du contexte
const CartContext = createContext();

// Fournisseur du contexte
export const CartProvider = ({ children }) => {
  const [cart, setCart] = useState([]);

  const addArticle = (article) => {
    setCart((prev) => [...prev, article]);
  };

  const removeArticle = (id) => {
    setCart((prev) => prev.filter((article) => article.id !== id));
  };

  const clearCart = () => {
    setCart([]);
  };

  return (
    <CartContext.Provider value={{ cart, addArticle, removeArticle, clearCart }}>
      {children}
    </CartContext.Provider>
  );
};

// Hook pour utiliser le contexte facilement
export const useCart = () => {
  return useContext(CartContext);
};
