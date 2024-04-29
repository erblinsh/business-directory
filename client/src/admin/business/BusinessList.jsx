import React, { useState, useEffect } from 'react';
import { useGetAllBusinessQuery, useDeleteBusinessMutation } from "../../redux/api/businessApi";
import { FaEdit } from "react-icons/fa";
import { MdDelete } from "react-icons/md";
import { Link } from 'react-router-dom';
import Sidebar from '../Sidebar';
import '../../styles/dashboard.css';
import { MdNavigateNext } from "react-icons/md";
import { GrFormPrevious } from "react-icons/gr";

const BusinessList = () => {
    const [pageNumber, setPageNumber] = useState(1);
    const pageSize = 10;
    const { data: { result: business } = {} } = useGetAllBusinessQuery({ pageNumber, pageSize });
    const [deletedBusinessId, setDeletedBusinessId] = useState(null); 

    const [deleteBusiness] = useDeleteBusinessMutation();

    const handleDelete = async (id) => {
        try {
            await deleteBusiness(id);
            setDeletedBusinessId(id); 
        } catch (error) {
            console.error('Error deleting business:', error);
        }
    };

    useEffect(() => {
        setPageNumber(1);
    }, [deletedBusinessId]);

    const handleNextPage = () => {
        setPageNumber(pageNumber + 1);
    };

    const handlePrevPage = () => {
        setPageNumber(pageNumber - 1);
    };


    const filteredBusiness = business ? business.filter(item => item.id !== deletedBusinessId) : [];

    return (
        <div className="container-fluid">
            <div className="business-dashboard row">
                <Sidebar/>
                <div className="business-list col-md-9">
                    <div className="business-table card shadow mb-4">
                        <div className="card-header py-3">
                            <a href="/admin/createBusiness/" className="float-left btn btn-success btn-sm" >Add a Business</a>
                        </div>
                        <div className="card-body">
                            <table className="business-list-table table table-bordered" id="dataTable" width="100%" cellSpacing="0">
                                <thead>
                                    <tr>
                                        <th>#</th>
                                        <th>Name</th>
                                        {/* <th>Description</th> */}
                                        <th>Address</th>
                                        <th>Phone Number</th>
                                        <th>Website URL</th>
                                        <th>Email</th>
                                        <th>Category</th>
                                        <th>Action</th>
                                    </tr>
                                </thead>
                                <tfoot>
                                    <tr>
                                        <th>#</th>
                                        <th>Name</th>
                                        {/* <th>Description</th> */}
                                        <th>Address</th>
                                        <th>Phone Number</th>
                                        <th>Website URL</th>
                                        <th>Email</th>
                                        <th>Category</th>
                                        <th>Action</th>
                                    </tr>
                                </tfoot>
                                <tbody className='business-tbody'>
                                    {filteredBusiness?.map((business, index) => (
                                        <tr key={index}>
                                            <td>{business.id}</td>
                                            <td>{business.name}</td>
                                            {/* <td>{business.description}</td> */}
                                            <td>{business.address}</td>
                                            <td>{business.phoneNumber}</td>
                                            <td>{business.websiteUrl}</td>
                                            <td>{business.email}</td>
                                            <td>{business.category.name}</td>
                                            <td>
                                                {/* <Link to={`/admin/viewbusiness`} className='btn btn-info btn-sm'><FaEye /></Link> */}
                                                <Link to={`/admin/updatebusiness/${business.id}`} className="btn btn-primary btn-sm mx-2"><FaEdit /></Link>
                                                <Link to={`/admin/business`} className="btn btn-danger btn-sm"><MdDelete onClick={() => handleDelete(business.id)} /></Link>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                            <div className="pagination">
                                <GrFormPrevious onClick={handlePrevPage} disabled={pageNumber === 1}/>
                                <MdNavigateNext onClick={handleNextPage}/>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default BusinessList;
