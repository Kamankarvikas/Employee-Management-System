import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';

export default function UpdateEmp() {
    const [countries, setCountries] = useState([]);
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        mobile: '',
        country: '',
        state: '',
        district: ''
    });

    const navigate = useNavigate();
    const { id } = useParams(); 

    useEffect(() => {
        const fetchCountries = async () => {
            try {
                const response = await axios.get('https://669b3f09276e45187d34eb4e.mockapi.io/api/v1/country');
                setCountries(response.data);
            } catch (error) {
                console.error('Error fetching countries:', error);
            }
        };

        const fetchEmployee = async () => {
            try {
                const response = await axios.get(`https://669b3f09276e45187d34eb4e.mockapi.io/api/v1/employee/${id}`);
                setFormData(response.data);
            } catch (error) {
                console.error('Error fetching employee:', error);
            }
        };

        fetchCountries();
        fetchEmployee();
    }, [id]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value
        });
    };
    const handleClose = () => {
        navigate('/'); 
    };
    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await axios.put(`https://669b3f09276e45187d34eb4e.mockapi.io/api/v1/employee/${id}`, formData);
            navigate('/'); 
        } catch (error) {
            console.error('Error updating employee:', error);
        }
    };

    return (
        <div className="container p-4 mx-auto">
            <h1 className="mb-6 text-3xl font-bold text-center">Update Employee</h1>
            <form onSubmit={handleSubmit} className="max-w-lg p-8 mx-auto bg-white border border-gray-200 rounded-lg">
                <div className="mb-4">
                    <label className="block text-gray-700">Name</label>
                    <input
                        type="text"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        className="w-full px-3 py-2 border border-gray-300 rounded"
                        required
                    />
                </div>
                <div className="mb-4">
                    <label className="block text-gray-700">Email ID</label>
                    <input
                        type="email"
                        name="email"
                        value={formData.emailId}
                        onChange={handleChange}
                        className="w-full px-3 py-2 border border-gray-300 rounded"
                        required
                    />
                </div>
                <div className="mb-4">
                    <label className="block text-gray-700">Mobile</label>
                    <input
                        type="tel"
                        name="mobile"
                        value={formData.mobile}
                        onChange={handleChange}
                        className="w-full px-3 py-2 border border-gray-300 rounded"
                        required
                    />
                </div>
                <div className="mb-4">
                    <label className="block text-gray-700">Country</label>
                    <select
                        name="country"
                        value={formData.country}
                        onChange={handleChange}
                        className="w-full px-3 py-2 border border-gray-300 rounded"
                        required
                    >
                        <option value="">Select a country</option>
                        {countries.map((country) => (
                            <option key={country.id} value={country.name}>
                                {country.country}
                            </option>
                        ))}
                    </select>
                </div>
                <div className="mb-4">
                    <label className="block text-gray-700">State</label>
                    <input
                        type="text"
                        name="state"
                        value={formData.state}
                        onChange={handleChange}
                        className="w-full px-3 py-2 border border-gray-300 rounded"
                        required
                    />
                </div>
                <div className="mb-4">
                    <label className="block text-gray-700">District</label>
                    <input
                        type="text"
                        name="district"
                        value={formData.district}
                        onChange={handleChange}
                        className="w-full px-3 py-2 border border-gray-300 rounded"
                        required
                    />
                </div>
                <div className="text-center">
                    <button type="submit" className="px-4 py-2 mr-4 text-white bg-blue-500 rounded hover:bg-blue-700 focus:outline-none focus:shadow-outline-blue">
                        Update Employee
                    </button>
                    <button 
                onClick={handleClose}
                className="px-4 py-2 text-white bg-gray-500 rounded hover:bg-gray-700"
            >
                Close
            </button>
                </div>
            </form>
        </div>
    );
}
