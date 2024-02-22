import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Form.css'; // Import CSS file for styling

const Form = () => {
  const [formData, setFormData] = useState({
    candidateName: '',
    designation: '',
    ctc: '',
    location: '',
    joiningDate: '',
    companyName: 'XYZ Pvt Ltd'
  });
  const navigate = useNavigate(); // Initialize the useNavigate hook

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    navigate('/offerletter', { state: formData }); // Navigate to the offer letter page with form data
  };

  return (
    <div className="form-container">
      <h2>Offer Letter Form</h2>
      <form onSubmit={handleSubmit}>
        <label htmlFor="candidateName">Candidate Name:</label>
        <input type="text" id="candidateName" name="candidateName" value={formData.candidateName} onChange={handleChange} />

        <label htmlFor="designation">Designation:</label>
        <input type="text" id="designation" name="designation" value={formData.designation} onChange={handleChange} />

        <label htmlFor="ctc">CTC:</label>
        <input type="text" id="ctc" name="ctc" value={formData.ctc} onChange={handleChange} />

        <label htmlFor="location">Location:</label>
        <input type="text" id="location" name="location" value={formData.location} onChange={handleChange} />

        <label htmlFor="joiningDate">Joining Date:</label>
        <input type="date" id="joiningDate" name="joiningDate" value={formData.joiningDate} onChange={handleChange} />

        <button type="submit">Generate Offer Letter</button>
      </form>
    </div>
  );
};

export default Form;
