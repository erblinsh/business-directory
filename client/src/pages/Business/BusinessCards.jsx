import { Card } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom'; 

export const BusinessCards = ({businesses}) => {
    const navigate = useNavigate()
    
    const GoToBusinessDetail = (id) => {
        navigate(`/business/${id}`);
    }    

    return (
        <div className="d-flex flex-wrap justify-content-around business-cards">
            {
                businesses?.map((business, key) => (        
                    <Card key={key} className="business-card m-4" onClick={() => GoToBusinessDetail(business.id)}>

                        <Card.Img className='business-card-image' variant="top" src={business && business.imageUrl} />
                        
                        <Card.Body>
                            <h5 className="text-truncate">{business?.name}</h5>
                        </Card.Body>

                        <Card.Footer>
                            <p className="text-truncate-2">
                                {business?.description}
                            </p>
                        </Card.Footer>

                    </Card>
                ))
            }
        </div>
    )
}