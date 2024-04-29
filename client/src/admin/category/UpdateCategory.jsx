import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useGetCategoryByIdQuery, useUpdateCategoryMutation } from '../../redux/api/categoryApi';

const UpdateCategory = () => {
    const { id } = useParams();
    const { data: {result: category} = {}} = useGetCategoryByIdQuery(id);
    const [formData, setFormData] = useState({
        name: '',
        description: ''
    });

    const [updateCategory] = useUpdateCategoryMutation();

    console.log(category);

    useEffect(() => {
        if (category) {
            setFormData({
                name: category.name || '',
                description: category.description || ''
            });
        }
    }, [category]);
    
    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value,
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const response = await updateCategory({ 
            id, 
            data: formData,
            headers: {
                'Content-Type': 'application/json'
            }
        });
        if(response.data.isSuccess){
            alert('Updated Successfully!');
        }
    };

    return (
        <div className="container">
            <h2>Update Category</h2>
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

export default UpdateCategory;
