import React from 'react';
import { Link } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Modal, Button, Form } from 'react-bootstrap';
import { useCart } from '../utils/CartContext';

const ArticleList = () => {
    const [articles, setArticles] = React.useState([]);
    const [showModal, setShowModal] = React.useState(false);
    const [newArticle, setNewArticle] = React.useState({
        Reference: '',
        Descriptif: '',
        Tva: { TauxTVA: 0.2 },
        PrixHT: 100,
        QteStock: 0,
    });

    const { addArticle } = useCart(); // Hook pour accéder à addArticle

    React.useEffect(() => {
        const fetchData = async () => {
            const result = await fetch('/api/articles');
            const body = await result.json();
            setArticles(body);
        };
        fetchData();
    }, []);

    const handleShowModal = () => {
        setShowModal(true);
    };

    const handleCloseModal = () => {
        setShowModal(false);
        setNewArticle({
            Reference: '',
            Descriptif: '',
            Tva: { TauxTVA: 0.2 },
            PrixHT: 100,
            QteStock: 0,
        });
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setNewArticle((prevArticle) => ({
            ...prevArticle,
            [name]: value,
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const articleToSubmit = {
                ...newArticle,
                PrixHT: parseFloat(newArticle.PrixHT),
                QteStock: parseInt(newArticle.QteStock, 10),
            };

            await fetch('/api/articles', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(articleToSubmit),
            });

            const result = await fetch('/api/articles');
            const body = await result.json();
            setArticles(body);

            handleCloseModal();
        } catch (error) {
            console.error("Erreur lors de l'ajout de l'article :", error);
        }
    };

    if (!articles) {
        return <div>Chargement...</div>;
    }

    return (
        <div className="container mt-5">
            <h2>Liste des articles</h2>
            <Button variant="primary" onClick={handleShowModal}>
                Ajouter un article
            </Button>
            <div className="row mt-3">
                {articles.map((article) => (
                    <div key={article.Reference} className="col-md-3 mb-3">
                        <div className="card">
                            <img
                                src={article.ImageUrl || 'https://via.placeholder.com/100x100'}
                                className="card-img-top"
                                alt={`Article ${article.Reference}`}
                            />
                            <div className="card-body">
                                <h5 className="card-title">{article.Descriptif}</h5>
                                <p className="card-text">Prix TTC : {article.PrixTTC}</p>

                                <p className="card-text">
                                    {article.QteStock < 1 && (
                                        <span className="text-danger">Rupture de stock</span>
                                    )}
                                    {article.QteStock > 0 && article.QteStock < 5 && (
                                        <span className="text-warning">
                                            Derniers articles en stock (Plus que {article.QteStock}{' '}
                                            restant(s) )
                                        </span>
                                    )}
                                    {article.QteStock >= 5 && (
                                        <span className="text-success">En stock</span>
                                    )}
                                </p>
                            </div>
                            <div className="card-footer">
                                <Link to={`/articles/${article.Reference}`} className="btn btn-primary mr-2">
                                    Détails
                                </Link>
                                {article.QteStock > 0 && (
                                    <button
                                        className="btn btn-success"
                                        onClick={() => addArticle(article)} // Ajout au panier
                                    >
                                        Ajouter au panier
                                    </button>
                                )}
                            </div>
                        </div>
                    </div>
                ))}
            </div>

            <Modal show={showModal} onHide={handleCloseModal}>
                <Modal.Header closeButton>
                    <Modal.Title>Ajouter un article</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form onSubmit={handleSubmit}>
                        <Form.Group controlId="formReference">
                            <Form.Label>Référence</Form.Label>
                            <Form.Control
                                type="text"
                                name="Reference"
                                value={newArticle.Reference}
                                onChange={handleChange}
                                required
                            />
                        </Form.Group>
                        <Form.Group controlId="formDescriptif">
                            <Form.Label>Nom de l'article</Form.Label>
                            <Form.Control
                                type="text"
                                name="Descriptif"
                                value={newArticle.Descriptif}
                                onChange={handleChange}
                                required
                            />
                        </Form.Group>
                        <Form.Group controlId="formPrixHT">
                            <Form.Label>Prix HT</Form.Label>
                            <Form.Control
                                type="number"
                                name="PrixHT"
                                value={newArticle.PrixHT}
                                onChange={handleChange}
                                required
                            />
                        </Form.Group>
                        <Form.Group controlId="formQteStock">
                            <Form.Label>Quantité en stock</Form.Label>
                            <Form.Control
                                type="number"
                                name="QteStock"
                                value={newArticle.QteStock}
                                onChange={handleChange}
                                required
                            />
                        </Form.Group>
                        <Button variant="primary" type="submit">
                            Ajouter
                        </Button>
                    </Form>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleCloseModal}>
                        Fermer
                    </Button>
                </Modal.Footer>
            </Modal>
        </div>
    );
};

export default ArticleList;
