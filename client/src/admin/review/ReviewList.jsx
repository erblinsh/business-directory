import React from 'react';
import { useGetAllReviewsQuery } from '../../redux/api/reviewApi';
import Sidebar from '../Sidebar'; 
import '../../styles/dashboard.css';

const ReviewList = () => {
    const { data } = useGetAllReviewsQuery();

    //console.log(data);

    return (
        <div className="container-fluid">
            <div className="row">
                <Sidebar/>
                <div className="col-md-9">
                    <div className="category-table">
                        <div className="category-table-card card shadow mb-4">
                            <div className="card-header py-3">
                            </div>
                            <div className="category-card-body card-body">
                                <table className="data-table table table-bordered" width="100%" cellSpacing="0">
                                    <thead>
                                        <tr>
                                            <th>#</th>
                                            <th>Rating</th>
                                            <th>Comment</th>
                                            <th>User</th>
                                            <th>Business</th>
                                        </tr>
                                    </thead>
                                    <tfoot>
                                        <tr>
                                            <th>#</th>
                                            <th>Rating</th>
                                            <th>Comment</th>
                                            <th>User</th>
                                            <th>Business</th>
                                        </tr>
                                    </tfoot>
                                    <tbody>
                                        {data?.map((review, index) => (
                                            <tr key={index}>
                                                <td>{review.id}</td>
                                                <td>{review.rating}</td>
                                                <td>{review.comment}</td>
                                                <td>{review.userId}</td>
                                                <td>{review.businessId}</td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ReviewList;
