import React, { createContext, useContext, useState } from "react";

// Création du contexte
const CartContext = createContext();

// Fournisseur du contexte
export const CartProvider = ({ children }) => {
  const [cart, setCart] = useState([]);

  console.log(cart)
  const addArticle = (article) => {
    setCart((prev) => {
      // Vérifier si l'article existe déjà dans le panier
      const existingArticle = prev.find((item) => item.Reference === article.Reference);
      
      if (existingArticle) {
        // Si l'article existe déjà, on augmente sa quantité de 1
        return prev.map((item) =>
          item.Reference === article.Reference
            ? { ...item, Quantite: item.Quantite + 1 }
            : item
        );
      } else {
        // Si l'article n'existe pas, on l'ajoute avec une quantité de 1
        return [...prev, { ...article, Quantite: 1 }];
      }
    });
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
