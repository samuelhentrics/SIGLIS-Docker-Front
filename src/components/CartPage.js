import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { Button, Table } from "react-bootstrap";
import { useCart } from "../utils/CartContext"; // Contexte global pour gérer le panier

const CartPage = () => {
  const { cart, removeArticle, clearCart } = useCart(); // Récupérer les articles du panier via le contexte

  console.log(cart)
  // Fonction pour s'assurer que la valeur est un nombre valide avant d'appliquer toFixed()
  const safeToFixed = (value) => {
    const number = parseFloat(value);
    return isNaN(number) ? "Erreur" : number.toFixed(2);
  };

  const calculateTotal = () => {
    return cart.reduce((total, article) => total + article.quantity * article.PrixTTC, 0);
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
              <td>{article.Reference}</td>
              <td>{article.Descriptif}</td>
              <td>{article.quantity}</td>
              <td>{safeToFixed(article.PrixTTC)} €</td>
              <td>{safeToFixed(article.quantity * article.PrixTTC)} €</td>
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
        <h4>Total : {safeToFixed(calculateTotal())} € HT</h4>
        <Button variant="warning" onClick={clearCart} className="mt-2">
          Vider le panier
        </Button>
      </div>
    </div>
  );
};

export default CartPage;
