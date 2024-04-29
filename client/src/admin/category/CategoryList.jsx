import React, { useState, useEffect } from 'react';
import { FaEdit } from "react-icons/fa";
import { MdDelete } from "react-icons/md";
import { Link } from 'react-router-dom';
import { useGetAllCategoriesQuery, useDeleteCategoryMutation } from '../../redux/api/categoryApi';
import '../../styles/dashboard.css';
import Sidebar from '../Sidebar';
import { MdNavigateNext } from "react-icons/md";
import { GrFormPrevious } from "react-icons/gr";

const CategoryList = () => {
    const [pageNumber, setPageNumber] = useState(1);
    const pageSize = 10;
    const { data: { result: category } = {} } = useGetAllCategoriesQuery({ pageNumber, pageSize });
    const [deletedCategoryId, setDeletedCategoryId] = useState(null);

    const [deleteCategory] = useDeleteCategoryMutation();

    const handleDelete = async (id) => {
        try {
            await deleteCategory(id);
            setDeletedCategoryId(id); 
        } catch (error) {
            console.error('Error deleting category:', error);
        }
    };

    useEffect(() => {
        setPageNumber(1);
    }, [deletedCategoryId]);

    const handleNextPage = () => {
        setPageNumber(pageNumber + 1);
    };

    const handlePrevPage = () => {
        setPageNumber(pageNumber - 1);
    };

    const filteredCategory = category ? category.filter(item => item.id !== deletedCategoryId) : [];

    return (
        <div className="container-fluid">
            <div className="row">
                <Sidebar/>
                <div className="category-list col-md-9">
                    <div className="category-table card shadow mb-4">
                        <div className="card-header py-3">
                            <a href="/admin/createcategory/" className="float-left btn btn-success btn-sm" >Add a Category</a>
                        </div>
                        <div className="category-card-body card-body">
                            <table className="data-table table table-bordered" width="100%" cellSpacing="0">
                                <thead>
                                    <tr>
                                        <th>#</th>
                                        <th>Name</th>
                                        <th width='750px'>Description</th>
                                        <th>Action</th>
                                    </tr>
                                </thead>
                                <tfoot>
                                    <tr>
                                        <th>#</th>
                                        <th>Name</th>
                                        <th>Description</th>
                                        <th>Action</th>
                                    </tr>
                                </tfoot>
                                <tbody>
                                    {filteredCategory?.map((category, index) => (
                                        <tr key={index}>
                                            <td>{category.id}</td>
                                            <td>{category.name}</td>
                                            <td>{category.description}</td>
                                            <td>
                                                <Link to={`/admin/updateCategory/${category.id}`} className="btn btn-primary btn-sm mx-2"><FaEdit /></Link>
                                                <Link to={`/admin/category`} className="btn btn-danger btn-sm"><MdDelete onClick={() => handleDelete(category.id)} /></Link>
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

export default CategoryList;
