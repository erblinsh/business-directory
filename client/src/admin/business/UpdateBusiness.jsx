import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useGetBusinessByIdQuery, useUpdateBusinessMutation } from "../../redux/api/businessApi";

const UpdateBusiness = () => {
    const { id } = useParams();
    const { data: { result: business } = {} } = useGetBusinessByIdQuery(id);
    const [formData, setFormData] = useState({
        name: '',
        description: '',
        address: '',
        phoneNumber: '',
        websiteUrl: '',
        imageUrl: '',
        email: '', 
        categoryId: ''
    });

    const [updateBusiness] = useUpdateBusinessMutation();

    useEffect(() => {
        if (business) {
            setFormData({
                name: business.name || '',
                description: business.description || '',
                address: business.address || '',
                phoneNumber: business.phoneNumber || '',
                websiteUrl: business.websiteUrl || '',
                imageUrl: business.imageUrl || '',
                email: business.email || '',
                categoryId: business.categoryId || ''
            });
        }
    }, [business]);
    
    const handleChange = (e) => {
        const { name, value } = e.target;
    
        if (name === 'category') {
            setFormData({
                ...formData,
                categoryId: parseInt(value), 
            });
        } else {
            setFormData({
                ...formData,
                [name]: value,
            });
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await updateBusiness({ 
                id, 
                updatedBusiness: formData, // Pass formData directly without JSON.stringify
            });
            console.log('Response:', response);
            if (response.data.isSuccess) {
                alert('Updated Successfully!');
            }
        } catch (error) {
            console.error('Error:', error);
        }
    };
    
    
    
    
    

    return (
        <div className="container">
            <h2>Update Business</h2>
            <br />
            <a href="/admin/business/" className="float-right btn btn-success btn-sm">View All</a>
            <form onSubmit={handleSubmit}>
                <div className="form-group">
                    <label>Name:</label>
                    <input
                        type="text"
                        className="form-control"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                    />
                </div>
                <div className="form-group">
                    <label>Description:</label>
                    <input
                        type="text"
                        className="form-control"
                        name="description"
                        value={formData.description}
                        onChange={handleChange}
                    />
                </div>
                <div className="form-group">
                    <label>Address:</label>
                    <input
                        type="text"
                        className="form-control"
                        name="address"
                        value={formData.address}
                        onChange={handleChange}
                    />
                </div>
                <div className="form-group">
                    <label>Phone Number:</label>
                    <input
                        type="text"
                        className="form-control"
                        name="phoneNumber"
                        value={formData.phoneNumber}
                        onChange={handleChange}
                    />
                </div>
                <div className="form-group">
                    <label>Website:</label>
                    <input
                        type="text"
                        className="form-control"
                        name="websiteUrl"
                        value={formData.websiteUrl}
                        onChange={handleChange}
                    />
                </div>
                <div className="form-group">
                    <label>Image:</label>
                    <input
                        type="text"
                        className="form-control"
                        name="image"
                        value={formData.imageUrl}
                        onChange={handleChange}
                    />
                </div>
                <div className="form-group">
                    <label>Email:</label>
                    <input
                        type="text"
                        className="form-control"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                    />
                </div>
                <div className="form-group">
                    <label>Category:</label>
                    <input
                        type="text"
                        className="form-control"
                        name="category"
                        value={formData.categoryId}
                        onChange={handleChange}
                    />
                </div>
                <br />
                <button type="submit" className="btn btn-primary">
                    Submit
                </button>
            </form>
        </div>
    );
};

export default UpdateBusiness;
