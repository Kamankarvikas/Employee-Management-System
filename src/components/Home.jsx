
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';

export default function Home() {
    const [employees, setEmployees] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [searchQuery, setSearchQuery] = useState('');
    const [currentPage, setCurrentPage] = useState(1);
    const [employeesPerPage] = useState(10);

    const navigate = useNavigate();
    const defaultAvatar = 'https://via.placeholder.com/150';

    useEffect(() => {
        const fetchEmployees = async () => {
            try {
                const response = await axios.get('https://669b3f09276e45187d34eb4e.mockapi.io/api/v1/employee');
                setEmployees(response.data);
                setLoading(false);
            } catch (error) {
                setError(error);
                setLoading(false);
            }
        };

        fetchEmployees();
    }, []);

    const handleSearchChange = (e) => {
        setSearchQuery(e.target.value);
    };

    const handleDelete = async (id) => {
        try {
            await axios.delete(`https://669b3f09276e45187d34eb4e.mockapi.io/api/v1/employee/${id}`);
            setEmployees(employees.filter(employee => employee.id !== id));
            navigate('/'); 
        } catch (error) {
            console.error('Error deleting employee:', error);
        }
    };

   
    const handleAddEmployee = async (newEmployee) => {
        try {
            const response = await axios.post('https://669b3f09276e45187d34eb4e.mockapi.io/api/v1/employee', newEmployee);
            setEmployees([...employees, response.data]); 
            navigate('/');
        } catch (error) {
            console.error('Error adding employee:', error);
        }
    };

    const filteredEmployees = employees
        .filter(employee =>
            employee.name && 
            employee.name.trim() !== '' && 
            employee.name.toLowerCase().includes(searchQuery.toLowerCase())
        );

    const indexOfLastEmployee = currentPage * employeesPerPage;
    const indexOfFirstEmployee = indexOfLastEmployee - employeesPerPage;
    const currentEmployees = filteredEmployees.slice(indexOfFirstEmployee, indexOfLastEmployee);

    const totalPages = Math.ceil(filteredEmployees.length / employeesPerPage);

    if (loading) {
        return <p className="mt-4 text-center">Loading...</p>;
    }

    if (error) {
        return <p className="mt-4 text-center text-red-500">Error loading employees: {error.message}</p>;
    }

    return (
        <div className="container p-4 mx-auto">
            <h1 className="mb-6 text-3xl font-bold text-center">Employee Management</h1>
            <div className="mb-4 text-right">
                <Link to="/add-emp">
                    <button className="px-4 py-2 text-white bg-green-500 rounded hover:bg-green-700">
                        Add Employee
                    </button>
                </Link>
            </div>
            <div className="mb-4">
                <input
                    type="text"
                    placeholder="Search employees..."
                    value={searchQuery}
                    onChange={handleSearchChange}
                    className="w-full p-2 border border-gray-300 rounded"
                />
            </div>
            {currentEmployees.length > 0 ? (
                <div className="overflow-x-auto">
                    <table className="min-w-full bg-white border border-collapse border-gray-200">
                        <thead>
                            <tr>
                                <th className="px-6 py-3 text-xs font-medium leading-4 tracking-wider text-left text-gray-600 uppercase bg-gray-100 border-b-2 border-gray-300">
                                    Sr No
                                </th>
                                <th className="px-6 py-3 text-xs font-medium leading-4 tracking-wider text-left text-gray-600 uppercase bg-gray-100 border-b-2 border-gray-300">
                                    Avatar
                                </th>
                                <th className="px-6 py-3 text-xs font-medium leading-4 tracking-wider text-left text-gray-600 uppercase bg-gray-100 border-b-2 border-gray-300">
                                    Employee Name
                                </th>
                                <th className="px-6 py-3 text-xs font-medium leading-4 tracking-wider text-left text-gray-600 uppercase bg-gray-100 border-b-2 border-gray-300">
                                    Actions
                                </th>
                            </tr>
                        </thead>
                        <tbody>
                            {currentEmployees.map((employee, index) => (
                                <tr key={employee.id} className={index % 2 === 0 ? "bg-white" : "bg-gray-50"}>
                                    <td className="px-6 py-4 text-sm leading-5 text-gray-700 whitespace-no-wrap border-b border-gray-200">
                                        {indexOfFirstEmployee + index + 1}
                                    </td>
                                    <td className="px-6 py-4 text-sm leading-5 text-gray-700 whitespace-no-wrap border-b border-gray-200">
                                        <img
                                            src={employee.avatar || defaultAvatar}
                                            alt={`${employee.name}'s avatar`}
                                            className="w-12 h-12 rounded-full"
                                        />
                                    </td>
                                    <td className="px-6 py-4 text-sm leading-5 text-gray-700 whitespace-no-wrap border-b border-gray-200">
                                        {employee.name}
                                    </td>
                                    <td className="px-6 py-4 text-sm leading-5 text-gray-700 whitespace-no-wrap border-b border-gray-200">
                                        <Link to={`/emp-detail/${employee.id}`}>
                                            <button className="px-3 py-1 mr-2 text-white bg-blue-500 rounded hover:bg-blue-700 focus:outline-none focus:shadow-outline-blue">
                                                View
                                            </button>
                                        </Link>
                                        <Link to={`/update-emp/${employee.id}`}>
                                            <button className="px-3 py-1 mr-2 text-white bg-blue-500 rounded hover:bg-blue-700 focus:outline-none focus:shadow-outline-blue">
                                                Update
                                            </button>
                                        </Link>
                                        <button 
                                            onClick={() => handleDelete(employee.id)}
                                            className="px-3 py-1 text-white bg-red-500 rounded hover:bg-red-700 focus:outline-none focus:shadow-outline-red"
                                        >
                                            Delete
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                    <div className="flex justify-between mt-4">
                        <button
                            onClick={() => setCurrentPage(currentPage - 1)}
                            disabled={currentPage === 1}
                            className="px-4 py-2 text-white bg-blue-500 rounded hover:bg-blue-700"
                        >
                            Previous
                        </button>
                        <span className="self-center text-lg">
                            Page {currentPage} of {totalPages}
                        </span>
                        <button
                            onClick={() => setCurrentPage(currentPage + 1)}
                            disabled={currentPage === totalPages}
                            className="px-4 py-2 text-white bg-blue-500 rounded hover:bg-blue-700"
                        >
                            Next
                        </button>
                    </div>
                </div>
            ) : (
                <p className="mt-4 text-center">No employees available</p>
            )}
        </div>
    );
}
