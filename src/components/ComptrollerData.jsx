import React, { useState, useEffect } from 'react';
import Modal from 'react-modal'; 
import { getAllTaxReports, updateTaxReport, createTaxReport, deleteTaxReport } from '../services/ComptrollerApi';
import './ComptrollerData.css';

Modal.setAppElement('#root'); // Important for accessibility, ties modal to the root element

const ComptrollerData = () => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isEditing, setIsEditing] = useState(false); // Determine if we are editing or creating
  const [currentReport, setCurrentReport] = useState(null); // Store the report to be updated
  const [formData, setFormData] = useState({
    taxId: '',
    category: '',
    revenue: 0,
    taxAmount: 0,
    submittedDate: '',
    status: ''
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const result = await getAllTaxReports();
        setData(result);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  // Handle opening the modal for creating or editing
  const openModal = (report = null) => {
    if (report) {
      setIsEditing(true);
      setCurrentReport(report);
      setFormData({
        taxId: report.taxId,
        category: report.category,
        revenue: report.revenue,
        taxAmount: report.taxAmount,
        submittedDate: new Date(report.submittedDate).toISOString().substring(0, 10), // Format date for input type="date"
        status: report.status
      });
    } else {
      setIsEditing(false);
      setFormData({
        taxId: '',
        category: '',
        revenue: 0,
        taxAmount: 0,
        submittedDate: '',
        status: 'Unpaid'
      });
    }
    setIsModalOpen(true);
  };

  // Handle form submission for updating or creating
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (isEditing) {
        // Update existing report
        await updateTaxReport({ ...currentReport, ...formData }); // currentReport is to capture properties that are not part of the formData, for example `id` 
      } else {
        // Create new report
        await createTaxReport(formData);
      }
      setIsModalOpen(false);
      const updatedData = await getAllTaxReports();
      setData(updatedData);
    } catch (err) {
      setError(err.message);
    }
  };

  // Handle deleting a tax report
  const handleDelete = async (reportId) => {
    const confirmDelete = window.confirm('Are you sure you want to delete this report?');
    if (confirmDelete) {
      try {
        await deleteTaxReport(reportId);
        alert('Tax report deleted successfully!');
        // Update the table by refetching the data
        const updatedData = await getAllTaxReports();
        setData(updatedData);
      } catch (err) {
        setError(err.message);
      }
    }
  };

  // Handle form input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    console.log(name, value)
    setFormData({ ...formData, [name]: value });
  };

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;

  // Render the tax report data in a table with Update button at each row
  const renderTaxReport = () => {
    return (
      <table>
        <thead>
          <tr>
            <th>Tax ID</th>
            <th>Category</th>
            <th>Revenue</th>
            <th>Tax Amount</th>
            <th>Submitted Date</th>
            <th>Status</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {data.map((report, index) => (
            <tr key={index}>
              <td>{report.taxId}</td>
              <td>{report.category}</td>
              <td>${report.revenue.toFixed(2)}</td>
              <td>${report.taxAmount.toFixed(2)}</td>
              <td>{new Date(report.submittedDate).toLocaleDateString()}</td>
              <td>{report.status}</td>
              <td>
                <button onClick={() => openModal(report)}>Update Data</button>
                <button onClick={() => handleDelete(report.id)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    );
  };

  return (
    <div>
      <h1>Comptroller Tax Report</h1>
      <button className="create" onClick={() => openModal()}>Create New Tax Report</button> 
      {data && data.length > 0 ? (
        renderTaxReport()
      ) : (
        <p>No tax reports available.</p>
      )}

      {/* Modal for updating or creating data */}
      <Modal
        isOpen={isModalOpen}
        onRequestClose={() => setIsModalOpen(false)}
        contentLabel={isEditing ? 'Edit Tax Report' : 'Create New Tax Report'}
        className="modal"
        overlayClassName="overlay"
      >
        <h2>{isEditing ? 'Edit Tax Report' : 'Create New Tax Report'}</h2>
        <form onSubmit={handleSubmit}>
          <label>
            Tax ID:
            <input
              type="text"
              name="taxId"
              value={formData.taxId}
              onChange={handleChange}
              required
            />
          </label>
          <label>
            Category:
            <input
              type="text"
              name="category"
              value={formData.category}
              onChange={handleChange}
              required
            />
          </label>
          <label>
            Revenue:
            <input
              type="number"
              name="revenue"
              value={formData.revenue}
              onChange={handleChange}
              required
            />
          </label>
          <label>
            Tax Amount:
            <input
              type="number"
              name="taxAmount"
              value={formData.taxAmount}
              onChange={handleChange}
              required
            />
          </label>
          <label>
            Date:
            <input
              type="date"
              name="submittedDate"
              value={formData.submittedDate}
              onChange={handleChange}
              required
            />
          </label>
          <label>
            Status:
            <select name="status" value={formData.status} onChange={handleChange} required>
              <option value="Paid">Paid</option>
              <option value="Unpaid">Unpaid</option>
              <option value="Pending">Pending</option>
            </select>
          </label>
          <button type="submit">{isEditing ? 'Save Changes' : 'Create Report'}</button>
          <button type="button" onClick={() => setIsModalOpen(false)}>
            Cancel
          </button>
        </form>
      </Modal>
    </div>
  );
};

export default ComptrollerData;
