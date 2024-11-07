import React from 'react';
import { Link } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';

const ArticleList = () => {

    const [articles, setArticles] = React.useState([]);

    React.useEffect(() => {
        const fetchData = async () => {
            const result = await fetch('http://api:3000/api/articles');
            const body = await result.json();
            setArticles(body);
        };
        fetchData();
    }, []);

    if(!articles) {
        return <div>Chargement...</div>;
    }

    return (
        <div className="container mt-5">
            <h2>Liste des articles</h2>
            <div className="row mt-3">
                {articles.map((article) => (
                    <div key={article.Reference} className="col-md-3 mb-3">
                        <div className="card">
                            <img src={article.ImageUrl || 'https://via.placeholder.com/100x100'} className="card-img-top" alt={`Article ${article.Reference}`} />
                            <div className="card-body">
                                <h5 className="card-title">{article.Reference} - {article.Descriptif}</h5>
                                <p className="card-text">Prix TTC : {article.PrixTTC}</p>

                                <p className="card-text">
                                    {article.QteStock < 1 && <span className="text-danger">Rupture de stock</span>}
                                    {article.QteStock > 0 && article.QteStock < 5 && <span className="text-warning">Derniers articles en stock (Plus que {article.QteStock} restant(s) )</span>}
                                    {article.QteStock >= 5 && <span className="text-success">En stock</span>}
                                </p>


                            </div>
                            <div className="card-footer">
                                <Link to={`/articles/${article.Reference}`} className="btn btn-primary mr-2">
                                    Détails
                                </Link>
                                {article.QteStock > 0 && (
                                    <button className="btn btn-success">
                                        Ajouter
                                    </button>
                                )}
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default ArticleList;
