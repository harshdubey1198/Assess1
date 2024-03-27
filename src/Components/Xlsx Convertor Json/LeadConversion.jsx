import React, { useState } from 'react';
import { read, utils } from 'xlsx';
import './LeadConversion.css';

function LeadConversion() {
  const [jsonData, setJsonData] = useState(null);
  const [schema, setSchema] = useState([]);
  const [fileType, setFileType] = useState('');
  const [fileUploaded, setFileUploaded] = useState(false);

  const handleFileUpload = (event) => {
    const file = event.target.files[0];
    if (!file) {
      alert('Please select a file');
      return;
    }

    const reader = new FileReader();
    reader.onload = (e) => {
      const data = new Uint8Array(e.target.result);
      const workbook = read(data, { type: 'array' });
      const sheetName = workbook.SheetNames[0];
      const fileType = file.name.split('.').pop(); // Extract file extension
      setFileType(fileType);

      if (fileType === 'xls' || fileType === 'xlsx') {
        const jsonData = utils.sheet_to_json(workbook.Sheets[sheetName]);
        setJsonData(jsonData);
        setSchema(Object.keys(jsonData[0]));
        setFileUploaded(true);
      } else {
        alert('Unsupported file format. Please upload an XLS or XLSX file.');
      }
    };
    reader.readAsArrayBuffer(file);
  };

  const handleDownloadJson = () => {
    if (jsonData) {
      const jsonContent = JSON.stringify(jsonData, null, 2);
      const blob = new Blob([jsonContent], { type: 'application/json' });
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = 'converted_leads.json';
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(url);
    } else {
      alert('No data to download. Please upload a file and convert it to JSON first.');
    }
  };

  const handleCopyCode = () => {
    if (schema.length > 0) {
      const code = `const mongoose = require('mongoose');

const leadSchema = new mongoose.Schema({
  ${schema.map(field => `${field}: { type: String, required: true },`).join('\n  ')}
});

const Lead = mongoose.model('Lead', leadSchema, 'leadsking'); // Change 'leadsking' to your collection name

module.exports = Lead;`;

      navigator.clipboard.writeText(code)
        .then(() => alert('Code copied to clipboard'))
        .catch((error) => console.error('Failed to copy code: ', error));
    } else {
      alert('No schema available to copy. Please upload a file and convert it to JSON first.');
    }
  };

  return (
    <div className="container">
      <h1>Conversion: XLS/XLSX to JSON</h1>
      
      {fileUploaded && (
        <button onClick={handleDownloadJson}>Download JSON</button>
      )}

      <input type="file" id="fileInput" onChange={handleFileUpload} />
      
      <div className="file-type">
        {fileType && (
          <p>File type: {fileType.toUpperCase()}</p>
        )}
      </div>

      <div className="schema">
        <h2>Schema:</h2>
        <ul>
          {schema.map((field, index) => (
            <li key={index}>{field}</li>
          ))}
        </ul>
      </div>

      <div id="preview" className="preview">
        {jsonData && (
          <>
            <h2>Preview:</h2>
            <pre>{JSON.stringify(jsonData, null, 2)}</pre>
          </>
        )}
      </div>

      <div className="mongoose-schema">
        {schema.length > 0 && (
          <>
            <h2>Mongoose Schema:</h2>
            <pre style={{
              border: "1px solid red",
              padding: "5px"
            }}>
              {`const mongoose = require('mongoose');

const leadSchema = new mongoose.Schema({
  ${schema.map(field => `${field}: { type: String, required: true },`).join('\n  ')}
});

const Lead = mongoose.model('Lead', leadSchema, 'leadsking'); // Change 'leadsking' to your collection name

module.exports = Lead;`}
            </pre>
            <button onClick={handleCopyCode}>Copy Code</button>
          </>
        )}
      </div>
    </div>
  );
}

export default LeadConversion;
