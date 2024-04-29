mport React, { useState } from 'react';
import { usePostBusinessMutation } from "../../redux/api/businessApi";

const CreateBusiness = () => {
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

    const [createBusiness] = usePostBusinessMutation();

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
    const handleSubmit = async(e) => {
        e.preventDefault();
        const response = await createBusiness(formData);
        
        setFormData({
            name: '',
            description: '',
            address: '',
            phoneNumber: '',
            websiteUrl: '',
            imageUrl: '',
            email: '', 
            category: ''
        });
        console.log(response);
    };

    return (
        <div className="container">
            <h2>Create Business</h2>
            <br />
            <a href="/admin/business" className="float-right btn btn-success btn-sm">View All</a>
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
                        name="imageUrl"
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

export default CreateBusiness;