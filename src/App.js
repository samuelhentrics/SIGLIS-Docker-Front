import React from 'react';
import { BrowserRouter as Router, Route, Routes, Link as RouterLink } from 'react-router-dom';
import { Container, Navbar, Nav } from 'react-bootstrap';
import CommandList from './components/CommandList';
import CommandDetail from './components/CommandDetail';
import ArticleDetail from './components/ArticleDetail';
import Home from './components/Home';
import ArticleList from './components/ArticleList';

function App() {
  return (
    <Router>
      <div className="App">
        <Navbar bg="dark" variant="dark">
          <Container>
            <Navbar.Brand as={RouterLink} to="/">Notre super site de vente</Navbar.Brand>
            <Nav className="mr-auto">
              <Nav.Link as={RouterLink} to="/">Accueil</Nav.Link>
              <Nav.Link as={RouterLink} to="/commands">Commandes</Nav.Link>
              <Nav.Link as={RouterLink} to="/articles">Articles</Nav.Link>

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
          </Routes>
        </Container>
      </div>
    </Router>
  );
}

export default App;
