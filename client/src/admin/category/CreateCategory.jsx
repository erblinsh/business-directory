import React, { useState } from 'react';
import { usePostCategoryMutation } from '../../redux/api/categoryApi';

const CreateCategory = () => {
    const [formData, setFormData] = useState({
        name: '',
        description: ''
    });

    const [createCategory] = usePostCategoryMutation();

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value,
        });
    };

    const handleSubmit = async(e) => {
        e.preventDefault();
        const response = await createCategory(formData);

        setFormData({
            name: '',
            description: ''
        });
        console.log(response);
    };

    return (
        <div className="container">
            <h2>Create Category</h2>
            <br />
            <a href="/admin/category/" className="float-right btn btn-success btn-sm">View All</a>
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
                <br />
                <button type="submit" className="btn btn-primary">
                    Submit
                </button>
            </form>
        </div>
    );
};

export default CreateCategory;
