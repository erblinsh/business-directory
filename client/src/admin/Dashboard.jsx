import React, { useEffect, useState } from 'react';
import { Card, Container, Row, Col, Table } from 'react-bootstrap';
import { useGetAllBusinessQuery } from "../redux/api/businessApi";
import { useGetAllCategoriesQuery } from "../redux/api/categoryApi";
import Sidebar from "./Sidebar";
import { useGetAllReviewsQuery } from '../redux/api/reviewApi';

const Dashboard = () => {
    const { data: businessData } = useGetAllBusinessQuery();
    const { data: categoryData } = useGetAllCategoriesQuery();
    const { data: reviewData } = useGetAllReviewsQuery();
    const [businessCount, setBusinessCount] = useState(0);
    const [categoryCount, setCategoryCount] = useState(0);
    const [reviewCount, setReviewCount] = useState(0);

    useEffect(() => {
        if (businessData) {
            setBusinessCount(businessData.result.length);
        }
        if (categoryData) {
            setCategoryCount(categoryData.result.length);
        }
    }, [businessData, categoryData]);

    useEffect(() => {
        if (reviewData && reviewData.result) {
            setReviewCount(reviewData.result.length);
        } else {
            setReviewCount(0); 
        }
    }, [reviewData]);

    return (
        <div className="dashboard"> 
            <Container fluid>
                <Row>
                    <Col md={3}>
                        <Sidebar />
                    </Col>
                    <br />
                    <Col md={9}>
                        <Row className="cards justify-content-center align-items-center">
                            <Col xl={3} md={6} mb={4}>
                                <Card className='dashboard-card'>
                                    <Card.Body>
                                        <div className="text-xs font-weight-bold text-primary text-uppercase mb-1">
                                            Businesses
                                        </div>
                                        <div className="h5 mb-0 font-weight-bold text-gray-800">{businessCount}</div>
                                    </Card.Body>
                                </Card>
                            </Col>
                            <Col xl={3} md={6} mb={4}>
                                <Card className='dashboard-card'>
                                    <Card.Body>
                                        <div className="text-xs font-weight-bold text-success text-uppercase mb-1">
                                            Categories
                                        </div>
                                        <div className="h5 mb-0 font-weight-bold text-gray-800">{categoryCount}</div>
                                    </Card.Body>
                                </Card>
                            </Col>
                            <Col xl={3} md={6} mb={4}>
                                <Card className='dashboard-card'>
                                    <Card.Body>
                                        <div className="text-xs font-weight-bold text-primary text-uppercase mb-1">
                                            Reviews
                                        </div>
                                        <div className="h5 mb-0 font-weight-bold text-gray-800">{reviewCount}</div>
                                    </Card.Body>
                                </Card>
                            </Col>
                        </Row>
                        <br />
                        <br />
                    </Col>
                </Row>
            </Container>
            
        </div>
    );
};

export default Dashboard;
