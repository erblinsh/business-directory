import React from 'react';
import { useDeleteCategoryMutation } from "../../redux/api/categoryApi";
import { MdDelete } from "react-icons/md";

const DeleteCategory = ({ categoryId, onDelete }) => {
    const [deleteCategory] = useDeleteCategoryMutation();

    const handleDelete = async () => {
        try {
            await deleteCategory(categoryId);
            onDelete(); 
        } catch (error) {
            console.error('Error deleting category:', error);
        }
    };

    return (
        <MdDelete onClick={handleDelete} className="btn btn-danger btn-sm" />
    );
};

export default DeleteCategory;
