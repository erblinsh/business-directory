import React from 'react';
import { useDeleteBusinessMutation } from "../../redux/api/businessApi";
import { MdDelete } from "react-icons/md";

const DeleteBusiness = ({ businessId, onDelete }) => {
    const [deleteBusiness] = useDeleteBusinessMutation();

    const handleDelete = async () => {
        try {
            await deleteBusiness(businessId);
            onDelete(); 
        } catch (error) {
            console.error('Error deleting business:', error);
        }
    };

    return (
        <MdDelete onClick={handleDelete} className="btn btn-danger btn-sm" />
    );
};

export default DeleteBusiness;
