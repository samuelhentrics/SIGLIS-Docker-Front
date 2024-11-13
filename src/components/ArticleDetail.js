import React from 'react';
import { Link, useParams } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';

const ArticleDetail = () => {
    console.log("hELLOWORLD")
    const { id } = useParams();

    const [article, setArticle] = React.useState(null);

    React.useEffect(() => {
        const fetchData = async () => {
            try {
                const result = await fetch(`/api/articles/${id}`);
                const body = await result.json();
                setArticle(body);
            } catch (error) {
                console.error('Erreur lors de la récupération de l\'article :', error);
            }
        };
        fetchData();
    }, [id]);

    if (!article) {
        return <div className="container mt-5">Chargement...</div>;
    }

    return (
        <div className="container mt-5">
            <div className="card">
                <div className="card-body">
                    <h2 className="card-title">Détails de l'article</h2>
                    <h4 className="card-subtitle mb-3 text-muted">{article.Reference} - {article.Descriptif}</h4>
                    <h5 className="card-subtitle mb-3 text-muted">
                        {article.QteStock < 1 && <span className="text-danger">Rupture de stock</span>}
                        {article.QteStock > 0 && article.QteStock < 5 && <span className="text-warning">Derniers articles en stock (Plus que {article.QteStock} restant(s) )</span>}
                        {article.QteStock >= 5 && <span className="text-success">En stock ({article.QteStock} en stock)</span>}
                    </h5>
                    <p className="card-text">Prix HT : {article.PrixHT} €</p>
                    <p className="card-text">Prix TTC : {article.PrixTTC} €</p>
                    <p className="card-text">Taux de TVA : {article.Tva.TauxTVA * 100} %</p>

                    

                    {article.QteStock > 0 && (
                        <button className="btn btn-success mt-3">
                            Ajouter au panier
                        </button>
                    )}

                    <Link to="/articles" className="btn btn-outline-primary mt-3 ml-3">
                        Retour à la liste des articles
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default ArticleDetail;
