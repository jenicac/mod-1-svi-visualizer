import React from 'react';

const DataUploader = ({ onDataLoaded }) => {
  const handleFileChange = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (evt) => {
      const text = evt.target?.result;
      // Basic CSV parsing (comma split, no quotes)
      const [headerLine, ...rows] = text.split(/\r?\n/).filter(Boolean);
      const headers = headerLine.split(',');
      const data = rows.map(row => {
        const values = row.split(',');
        const obj = {};
        headers.forEach((h, i) => (obj[h] = values[i]));
        return obj;
      });
      onDataLoaded(data);
    };
    reader.readAsText(file);
  };

  return (
    <div>
      <label style={{ fontWeight: 500 }}>
        Upload CDC SVI CSV:
        <input type="file" accept=".csv" onChange={handleFileChange} style={{ marginLeft: 8 }} />
      </label>
    </div>
  );
};

export default DataUploader;
