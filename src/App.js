import React from 'react';
import { BrowserRouter as Router, Route, Routes, Link as RouterLink } from 'react-router-dom';
import { Container, Navbar, Nav } from 'react-bootstrap';
import CommandList from './components/CommandList';
import CommandDetail from './components/CommandDetail';
import ArticleDetail from './components/ArticleDetail';
import Home from './components/Home';
import ArticleList from './components/ArticleList';
import { CartProvider } from './utils/CartContext';
import CartPage from './components/CartPage';

function App() {
  return (
    <CartProvider>
    <Router>
      <div className="App">
        <Navbar bg="dark" variant="dark">
          <Container>
            <Navbar.Brand as={RouterLink} to="/">Notre super site de vente</Navbar.Brand>
            <Nav className="mr-auto">
              <Nav.Link as={RouterLink} to="/">Accueil</Nav.Link>
              <Nav.Link as={RouterLink} to="/commands">Commandes</Nav.Link>
              <Nav.Link as={RouterLink} to="/articles">Articles</Nav.Link>
              <Nav.Link as={RouterLink} to="/cart">Panier</Nav.Link>
            </Nav>
          </Container>
        </Navbar>

        <Container className="mt-4">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/commands/:id" element={<CommandDetail />} />
            <Route path="/commands" element={<CommandList />} />
            <Route path="/articles" element={<ArticleList />} />
            <Route path="/articles/:id" element={<ArticleDetail />} />
            <Route path="/cart" element={<CartPage />} />
          </Routes>
        </Container>
      </div>
    </Router>
    </CartProvider>
  );
}

export default App;
