import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';

export default function EmployeeDetail() {
  const { id } = useParams(); 
  const [employee, setEmployee] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [editing, setEditing] = useState(false); 
  const [formData, setFormData] = useState({
    name: '',
    emailId: '',
    mobile: '',
    country: '',
    state: '',
    district: ''
  });
  const navigate = useNavigate();

  useEffect(() => {
    const fetchEmployee = async () => {
      try {
        const response = await axios.get(`https://669b3f09276e45187d34eb4e.mockapi.io/api/v1/employee/${id}`);
        setEmployee(response.data);
        setFormData(response.data); 
        setLoading(false);
      } catch (error) {
        setError(error);
        setLoading(false);
      }
    };

    fetchEmployee();
  }, [id]);

  const handleEditToggle = () => {
    setEditing(!editing);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };
  const handleClose = () => {
    navigate('/'); 
};

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.put(`https://669b3f09276e45187d34eb4e.mockapi.io/api/v1/employee/${id}`, formData);
      setEmployee(formData);
      setEditing(false); 
    } catch (error) {
      setError(error);
    }
  };

  if (loading) {
    return <p className="mt-4 text-center">Loading...</p>;
  }

  if (error) {
    return <p className="mt-4 text-center text-red-500">Error loading employee details: {error.message}</p>;
  }

  if (!employee) {
    return <p className="mt-4 text-center">Employee not found</p>;
  }

  return (
    <div className="container p-4 mx-auto">
      <h1 className="mb-6 text-3xl font-bold text-center">Employee Details</h1>
      <div className="max-w-md p-6 mx-auto bg-white rounded-lg shadow-lg">
        {editing ? (
          <form onSubmit={handleSubmit}>
            <h2 className="mb-4 text-xl font-bold">Edit Details</h2>
            <div className="mb-4">
              <label htmlFor="name" className="block text-sm font-medium text-gray-700">Name</label>
              <input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                className="block w-full px-3 py-2 mt-1 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                required
              />
            </div>
            <div className="mb-4">
              <label htmlFor="emailId" className="block text-sm font-medium text-gray-700">Email ID</label>
              <input
                type="email"
                id="emailId"
                name="emailId"
                value={formData.emailId}
                onChange={handleChange}
                className="block w-full px-3 py-2 mt-1 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                required
              />
            </div>
            <div className="mb-4">
              <label htmlFor="mobile" className="block text-sm font-medium text-gray-700">Mobile</label>
              <input
                type="text"
                id="mobile"
                name="mobile"
                value={formData.mobile}
                onChange={handleChange}
                className="block w-full px-3 py-2 mt-1 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                required
              />
            </div>
            <div className="mb-4">
              <label htmlFor="country" className="block text-sm font-medium text-gray-700">Country</label>
              <input
                type="text"
                id="country"
                name="country"
                value={formData.country}
                onChange={handleChange}
                className="block w-full px-3 py-2 mt-1 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                required
              />
            </div>
            <div className="mb-4">
              <label htmlFor="state" className="block text-sm font-medium text-gray-700">State</label>
              <input
                type="text"
                id="state"
                name="state"
                value={formData.state}
                onChange={handleChange}
                className="block w-full px-3 py-2 mt-1 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                required
              />
            </div>
            <div className="mb-4">
              <label htmlFor="district" className="block text-sm font-medium text-gray-700">District</label>
              <input
                type="text"
                id="district"
                name="district"
                value={formData.district}
                onChange={handleChange}
                className="block w-full px-3 py-2 mt-1 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                required
              />
            </div>
            <button 
              type="submit"
              className="px-4 py-2 text-white bg-blue-500 rounded hover:bg-blue-700 focus:outline-none focus:shadow-outline-blue"
            >
              Update
            </button>
            <button
              type="button"
              onClick={handleEditToggle}
              className="px-4 py-2 ml-4 text-white bg-gray-500 rounded hover:bg-gray-700 focus:outline-none focus:shadow-outline-gray"
            >
              Cancel
            </button>
          </form>
        ) : (
          <>
            <h2 className="mb-4 text-xl font-bold">Details</h2>
            <p><strong>Name:</strong> {employee.name}</p>
            <p><strong>Email ID:</strong> {employee.emailId}</p>
            <p><strong>Mobile:</strong> {employee.mobile}</p>
            <p><strong>Country:</strong> {employee.country}</p>
            <p><strong>State:</strong> {employee.state}</p>
            <p><strong>District:</strong> {employee.district}</p>
            <button 
    onClick={handleEditToggle}
    className="px-4 py-2 mr-4 text-white bg-blue-500 rounded hover:bg-blue-700 focus:outline-none focus:shadow-outline-blue"
>
    Edit
</button>

<button 
    onClick={handleClose}
    className="px-4 py-2 text-white bg-gray-500 rounded hover:bg-gray-700"
>
    Close
</button>

          </>
        )}
      </div>
    </div>
  );
}
