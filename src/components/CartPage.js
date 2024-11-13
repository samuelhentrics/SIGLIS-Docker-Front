import React, { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { Button, Table, Alert, Form } from "react-bootstrap";
import { useCart } from "../utils/CartContext"; // Contexte global pour gérer le panier

const CartPage = () => {
  const { cart, removeArticle, clearCart } = useCart(); // Récupérer les articles du panier via le contexte
  const [name, setName] = useState('');
  const [orderNumber, setOrderNumber] = useState(null);
  const [showAlert, setShowAlert] = useState(false);

  // Fonction pour s'assurer que la valeur est un nombre valide avant d'appliquer toFixed()
  const safeToFixed = (value) => {
    const number = parseFloat(value);
    return isNaN(number) ? "Erreur" : number.toFixed(2);
  };

  const calculateTotal = () => {
    return cart.reduce((total, article) => total + article.Quantite * article.PrixTTC, 0);
  };

  const handleOrder = async () => {
    const newOrderNumber = Math.floor(Math.random() * 1000000);
    const commande = {
      Numero: newOrderNumber,
      NomClient: name,
      DateCommande: new Date(),
      LignesDeCommande: cart.map(article => ({
        Article: article._id,
        Quantite: article.Quantite
      }))
    };

    try {
      const response = await fetch('/api/commandes', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(commande)
      });

      if (response.ok) {
        setOrderNumber(newOrderNumber);
        setShowAlert(true);
        clearCart();
      } else {
        console.error('Erreur lors de la création de la commande');
      }
    } catch (error) {
      console.error('Erreur lors de la création de la commande :', error);
    }
  };

  if (cart.length === 0) {
    return (
      <div className="container mt-5">
        {showAlert && (
            <Alert variant="success" onClose={() => setShowAlert(false)} dismissible>
            Commande #{orderNumber} passée avec succès !
            </Alert>
        )}
        <h2>Votre panier est vide</h2>
        <p>Ajoutez des articles pour commencer vos achats !</p>
      </div>
    );
  }

  return (
    <div className="container mt-5">
      <h2>Panier</h2>
      {showAlert && (
        <Alert variant="success" onClose={() => setShowAlert(false)} dismissible>
          Commande #{orderNumber} passée avec succès !
        </Alert>
      )}
      <Form.Group controlId="formName">
        <Form.Label>Nom</Form.Label>
        <Form.Control
          type="text"
          placeholder="Entrez votre nom"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />
      </Form.Group>
      <Table striped bordered hover className="mt-3">
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
              <td>{article.Quantite}</td>
              <td>{safeToFixed(article.PrixTTC)} €</td>
              <td>{safeToFixed(article.Quantite * article.PrixTTC)} €</td>
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
        <Button variant="success" onClick={handleOrder} className="mt-2 ml-2" disabled={!name}>
          Commander
        </Button>
      </div>
    </div>
  );
};

export default CartPage;
