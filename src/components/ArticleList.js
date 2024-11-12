import React from 'react';
import { Link } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Modal, Button } from 'react-bootstrap';

const ArticleList = () => {
    const [articles, setArticles] = React.useState([]);
    const [showModal, setShowModal] = React.useState(false);
    const [selectedArticle, setSelectedArticle] = React.useState(null);

    React.useEffect(() => {
        const fetchData = async () => {
            const result = await fetch('/api/articles');
            const body = await result.json();
            setArticles(body);
        };
        fetchData();
    }, []);

    const handleShowModal = (article) => {
        setSelectedArticle(article);
        setShowModal(true);
    };

    const handleCloseModal = () => {
        setShowModal(false);
        setSelectedArticle(null);
    };

    if (!articles) {
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
                                    <button className="btn btn-success" onClick={() => handleShowModal(article)}>
                                        Ajouter
                                    </button>
                                )}
                            </div>
                        </div>
                    </div>
                ))}
            </div>

            {selectedArticle && (
                <Modal show={showModal} onHide={handleCloseModal}>
                    <Modal.Header closeButton>
                        <Modal.Title>Ajouter l'article</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <p>Référence: {selectedArticle.Reference}</p>
                        <p>Nom de l'article: {selectedArticle.Descriptif}</p>
                        <p>Taux de TVA: {selectedArticle.TauxTVA}</p>
                    </Modal.Body>
                    <Modal.Footer>
                        <Button variant="secondary" onClick={handleCloseModal}>
                            Fermer
                        </Button>
                        <Button variant="primary" onClick={handleCloseModal}>
                            Ajouter au panier
                        </Button>
                    </Modal.Footer>
                </Modal>
            )}
        </div>
    );
};

export default ArticleList;