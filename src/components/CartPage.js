import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { Button, Table } from "react-bootstrap";
import { useCart } from "../utils/CartContext";// Contexte global pour gérer le panier

const CartPage = () => {
  const { cart, removeArticle, clearCart } = useCart(); // Récupérer les articles du panier via le contexte

  const calculateTotal = () => {
    return cart.reduce((total, article) => total + article.quantite * article.prixHT, 0).toFixed(2);
  };

  if (cart.length === 0) {
    return (
      <div className="container mt-5">
        <h2>Votre panier est vide</h2>
        <p>Ajoutez des articles pour commencer vos achats !</p>
      </div>
    );
  }

  return (
    <div className="container mt-5">
      <h2>Panier</h2>
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>#</th>
            <th>Référence</th>
            <th>Descriptif</th>
            <th>Quantité</th>
            <th>Prix HT</th>
            <th>Prix Total HT</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {cart.map((article, index) => (
            <tr key={article.id}>
              <td>{index + 1}</td>
              <td>{article.reference}</td>
              <td>{article.descriptif}</td>
              <td>{article.quantite}</td>
              <td>{article.prixHT.toFixed(2)} €</td>
              <td>{(article.quantite * article.prixHT).toFixed(2)} €</td>
              <td>
                <Button variant="danger" size="sm" onClick={() => removeArticle(article.id)}>
                  Supprimer
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
      <div className="mt-4">
        <h4>Total : {calculateTotal()} € HT</h4>
        <Button variant="warning" onClick={clearCart} className="mt-2">
          Vider le panier
        </Button>
      </div>
    </div>
  );
};

export default CartPage;
