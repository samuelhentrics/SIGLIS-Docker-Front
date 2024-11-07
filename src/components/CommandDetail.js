import React from 'react';
import { useParams } from 'react-router-dom';

const CommandDetail = () => {
  const { id } = useParams(); // Récupérer l'ID de la commande depuis l'URL

  const [command, setCommand] = React.useState(null);

  React.useEffect(() => {
    const fetchData = async () => {
      const result = await fetch(`http://localhost:3000/api/commandes/${id}`);
      const body = await result.json();

      body.DateCommande = new Date(body.DateCommande).toLocaleDateString();

      setCommand(body);
    };
    fetchData();
  }, [id]);

  if (!command) {
    // Pas encore de commandes
    return <div>Chargement...</div>;
  }
  console.log(command.LignesDeCommande)

  return (
    <div className="container mt-5">
      <h2>Détails de la commande</h2>
      <h4>Numéro de commande : {command.Numero}</h4>
      <p>Passé par le client : {command.NomClient} - Le : {command.DateCommande}</p>


      <h3>Détails des produits</h3>
      <table className="table table-striped">
        <thead>
          <tr>
            <th>Produit</th>
            <th>Quantité</th>
            <th>Prix unitaire HT</th>
            <th>Prix unitaire TTC</th>
            <th>Prix total</th>
          </tr>
        </thead>
        <tbody>
          {command.LignesDeCommande.map((ligne) => (
            <tr key={ligne.Article._id}>
              <td>
                <a href={`/articles/${ligne.Article.Reference}`}>{ligne.Article.Reference} - {ligne.Article.Descriptif}</a>
              </td>
              <td>{ligne.Quantite}</td>
              <td>{ligne.Article.PrixHT} €</td>
              <td>{ligne.Article.PrixTTC} € (TVA : {ligne.Article.Tva.TauxTVA * 100}%)</td>
              <td>{ligne.PrixTotal} €</td>
            </tr>
          ))}
            <tr>
              <td colSpan="4">Total de la commande</td>
              <td>{command.PrixTotal} €</td>
            </tr>
         
        </tbody>
      </table>
    </div>
  );
};

export default CommandDetail;
