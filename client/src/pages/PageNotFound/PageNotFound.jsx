import React from 'react';
import { Container, Row, Col, Button } from 'react-bootstrap';
import '../../styles/pageNotFound.css';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';

export const PageNotFound = () => {
    const darkMode = useSelector(state => state.darkTheme.darkMode)

    const navigate = useNavigate();

    const navigateToHome = () => {
        navigate('/')
    }
    return (
        <Container className="page-not-found-container">
            <Row>
                <Col>
                    <h1 className="text-center">404</h1>
                    <h2 className="text-center">Page Not Found</h2>
                    <p className="text-center mb-4">Oops! The page you are looking for does not exist.</p>
                    <Button onClick={navigateToHome} className={`d-flex mx-auto ${darkMode ? "btn-danger" : "btn-primary"}`}>Return In Home Page</Button>
                </Col>
            </Row>
        </Container>
    );
};