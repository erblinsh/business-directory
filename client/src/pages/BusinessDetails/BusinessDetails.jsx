import { useParams } from "react-router-dom"
import { useGetBusinessByIdQuery } from "../../redux/api/businessApi";
import { Card, Container, ListGroup, ListGroupItem, Row, Col, Form, Button } from 'react-bootstrap';
import '../../styles/businessDetails.css';
import { useState } from "react";

export const BusinessDetails = () => {
  const { id } = useParams();

  const { data: {result: business} = {}} = useGetBusinessByIdQuery(id);

  const [reviewText, setReviewText] = useState("");
  const [reviews, setReviews] = useState(business?.reviews || []);

  const handleReviewSubmit = () => {
    if (reviewText.trim() !== "") {
      const newReview = { text: reviewText };
      setReviews([...reviews, newReview]);
      setReviewText(""); 
    }
  };

  return (
    <Container className="mt-5">
      <Row>
        <Col md={6}>
          <Card.Img className='business-card-image' variant="top" src={business?.imageUrl} />
        </Col>
        <Col md={6}>
          <Card className='business-details-card'> 
            <Card.Body>
              <Card.Title>{business?.name}</Card.Title>
            </Card.Body>
            <ListGroup className="list-group-flush business-list-group">
              <ListGroupItem>
                <Row>
                  <Col>Address:</Col>
                  <Col>{business?.address}</Col>
                </Row>
              </ListGroupItem>
              <ListGroupItem>
                <Row>
                  <Col>Website:</Col>
                  <Col><a href={business?.websiteUrl} >{business?.websiteUrl}</a></Col>
                </Row>
              </ListGroupItem>
              <ListGroupItem>
                <Row>
                  <Col>Phone:</Col>
                  <Col>{business?.phoneNumber}</Col>
                </Row>
              </ListGroupItem>
              <ListGroupItem>
                <Row>
                  <Col>Email:</Col>
                  <Col>{business?.email}</Col>
                </Row>
              </ListGroupItem>
              <ListGroupItem>
                <Row>
                  <Col>Ratings:</Col>
                  <Col>{reviews?.rating}</Col>
                </Row>
              </ListGroupItem>
              <ListGroupItem>
                <Row>
                  <Col>{business?.description}</Col>
                </Row>
              </ListGroupItem>
            </ListGroup>
         </Card>
         <br />
         <ListGroupItem>
            <Form>
              <Form.Group controlId="reviewText">
                <Form.Label>Write a Review:</Form.Label>
                <Form.Control
                  as="textarea"
                  rows={6}
                  value={reviewText}
                  onChange={(e) => setReviewText(e.target.value)}
                />
              </Form.Group>
              <br/>
              <Button className="button" onClick={handleReviewSubmit}>Submit</Button>
            </Form>
          </ListGroupItem>
        </Col>
      </Row>
    </Container>
  );
}