import React, { useRef } from 'react';

interface DataUploaderProps {
  onDataLoaded: (data: any[]) => void;
}

const DataUploader: React.FC<DataUploaderProps> = ({ onDataLoaded }) => {
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (evt) => {
      const text = evt.target?.result as string;
      // Parse CSV (simple, assumes header)
      const lines = text.split(/\r?\n/).filter(Boolean);
      const header = lines[0].split(',');
      const rows = lines.slice(1).map(line => {
        const values = line.split(',');
        const obj: any = {};
        header.forEach((h, i) => {
          obj[h.trim()] = values[i]?.trim();
        });
        return obj;
      });
      onDataLoaded(rows);
    };
    reader.readAsText(file);
  };

  return (
    <div style={{ margin: '16px 0' }}>
      <input
        type="file"
        accept=".csv"
        ref={fileInputRef}
        onChange={handleFileChange}
        style={{ display: 'none' }}
      />
      <button
        onClick={() => fileInputRef.current?.click()}
        style={{ padding: '10px 18px', borderRadius: 6, border: '1px solid #888', background: '#f1f5f9', cursor: 'pointer' }}
      >
        Upload CDC SVI CSV
      </button>
    </div>
  );
};

export default DataUploader;
