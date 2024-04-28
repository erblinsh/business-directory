import { useState } from "react";
import { useGetAllBusinessQuery } from "../../redux/api/businessApi";
import { Card } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";

export const TopBusinesses = () => {
    const [filters, setFilters] = useState({
        PageSize: 6
    });

    const {data: { result: businesses } = {} } = useGetAllBusinessQuery(filters)

    const navigate = useNavigate()

    const GoToBusinessDetail = (id) => {
        navigate(`/business/${id}`);
    }   


    return (
        <div className="top-businesses d-flex align-items-center flex-column py-3">
            <h2 className="text-center pb-4">Top Businesses</h2>

            <div className="d-flex flex-wrap justify-content-center top-businesses-cards">
                {businesses?.map((business,key) => (
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
                ))}
            </div>
            
            <Link className="text-decoration-none mt-3 see-more-business" to="/business">See more Businesses</Link>
        </div>
    )
}