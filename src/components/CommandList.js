import React from 'react';
import { Link } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';

const CommandList = () => {
  const [commands, setCommands] = React.useState([]);


  // Faire une connexion sur localhost:5000/api/commandes
  // et récupérer la liste des commandes avec axios

  React.useEffect(() => {
    const fetchData = async () => {
      const result = await fetch('http://api:3000/api/commandes');
      const body = await result.json();
      setCommands(body);
    };
    fetchData();
  }, []);


  return (
    <div className="container mt-5">
      <h2>Liste des commandes</h2>
      <ul className="list-group">
        {commands.map((command) => (
          <li key={command.Numero} className="list-group-item">
            <Link to={`/commands/${command.Numero}`}>
              <h4>Commande n°{command.Numero}</h4>
            </Link>
            <p>Client : {command.NomClient}</p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default CommandList;
