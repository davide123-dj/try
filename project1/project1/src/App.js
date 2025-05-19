import React, { useState, useEffect } from 'react';
import axios from 'axios';

function App() {
  const [employees, setEmployees] = useState([]);
  const [formError, setFormError] = useState('');
  const [formData, setFormData] = useState({
    FirstName: '', LastName: '', Position: '',
    Address: '', Telephone: '', Gender: '',
    hireDate: '', DepartmentCode: ''
  });

  useEffect(() => {
    loadAllData();
  }, []);

  const loadAllData = async () => {
    try {
      const empRes = await axios.get('http://localhost:5000/employees');
      setEmployees(empRes.data);
    } catch (err) {
      console.error('Error fetching data:', err);
    }
  };

  const handleChange = e => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    setFormError(''); // clear error on change
  };

  const handleSubmit = async e => {
    e.preventDefault();
    try {
      await axios.post('http://localhost:5000/employees', formData);
      setFormError('');
      loadAllData();
      setFormData({
        FirstName: '', LastName: '', Position: '',
        Address: '', Telephone: '', Gender: '',
        hireDate: '', DepartmentCode: ''
      });
    } catch (err) {
      console.error(err);
      setFormError('⚠️ Error adding employee. Please check the form and try again.');
    }
  };

  const handleUpdate = async (id) => {
    try {
      await axios.put(`http://localhost:5000/employees/${id}`, formData);
      setFormError('');
      loadAllData();
      setFormData({
        FirstName: '', LastName: '', Position: '',
        Address: '', Telephone: '', Gender: '',
        hireDate: '', DepartmentCode: ''
      });
      alert('Employee updated successfully');
    } catch (err) {
      console.error(err);
      setFormError('⚠️ Error updating employee. Please check the form and try again.');
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this employee?')) {
      try {
        await axios.delete(`http://localhost:5000/employees/${id}`);
        loadAllData();
        alert('Employee deleted successfully');
      } catch (err) {
        console.error(err);
        alert('⚠️ Error deleting employee. Please try again.');
      }
    }
  };

  return (
    <div className="max-w-6xl mx-auto p-6 font-sans">
      <h1 className="text-3xl font-bold mb-6 text-center">Employee Management System</h1>

      <form onSubmit={handleSubmit} className="bg-white p-6 rounded-xl shadow-md mb-10">
        <h2 className="text-xl font-semibold mb-4">Register New Employee</h2>

        {formError && (
          <div className="bg-red-100 text-red-700 p-3 rounded mb-4">
            {formError}
          </div>
        )}

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {['FirstName', 'LastName', 'Position', 'Address', 'Telephone'].map(field => (
            <input
              key={field}
              name={field}
              value={formData[field]}
              placeholder={field}
              onChange={handleChange}
              className="p-2 border rounded"
              required
            />
          ))}
          <select name="Gender" value={formData.Gender} onChange={handleChange} required className="p-2 border rounded">
            <option value="">Select Gender</option>
            <option>Male</option>
            <option>Female</option>
          </select>
          <input type="date" name="hireDate" value={formData.hireDate} onChange={handleChange} className="p-2 border rounded" required />
          <input
            name="DepartmentCode"
            value={formData.DepartmentCode}
            onChange={handleChange}
            className="p-2 border rounded"
            placeholder="Department Code"
            required
          />
        </div>
        <button type="submit" className="mt-4 px-4 py-2 bg-blue-600 text-white rounded">Save</button>
      </form>

      <h2 className="text-xl font-semibold mb-2">Employee List</h2>
      <table className="w-full mb-10 bg-white rounded shadow">
        <thead>
          <tr className="bg-gray-200">
            <th className="p-2">Name</th>
            <th className="p-2">Position</th>
            <th className="p-2">Actions</th>
          </tr>
        </thead>
        <tbody>
          {employees.map(emp => (
            <tr key={emp.EmployeeNumber}>
              <td className="p-2">{emp.FirstName} {emp.LastName}</td>
              <td className="p-2">{emp.Position}</td>
              <td>
                <button onClick={() => handleUpdate(emp.EmployeeNumber)} className="btn btn-info">Update</button>
                <button onClick={() => handleDelete(emp.EmployeeNumber)} className="btn btn-danger ml-2">Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default App;
