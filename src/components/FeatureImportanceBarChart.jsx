import React from 'react';

const colors = [
  'linear-gradient(135deg, #6366f1 60%, #818cf8 100%)',
  'linear-gradient(135deg, #10b981 60%, #34d399 100%)',
  'linear-gradient(135deg, #f59e42 60%, #fbbf24 100%)'
];

const FeatureImportanceBarChart = ({ contributions, inputLabels }) => {
  // Normalize for relative importance
  const absContribs = contributions.map(Math.abs);
  const max = Math.max(...absContribs, 0.01);
  const chartHeight = 120;
  return (
    <div style={{ position: 'relative', height: chartHeight + 40, marginTop: 18, background: 'linear-gradient(180deg, #f1f5f9 80%, #e0e7ef 100%)', borderRadius: 14, boxShadow: '0 1px 8px #e0e7ef', padding: '16px 0 0 0' }}>
      {/* Y-axis grid lines */}
      <svg width="100%" height={chartHeight} style={{ position: 'absolute', left: 0, top: 0, zIndex: 0 }}>
        {[0.25, 0.5, 0.75, 1].map((frac, idx) => (
          <line
            key={idx}
            x1="0" x2="100%"
            y1={chartHeight * (1 - frac)}
            y2={chartHeight * (1 - frac)}
            stroke="#cbd5e1"
            strokeDasharray="4 4"
            strokeWidth={1}
          />
        ))}
      </svg>
      <div style={{ display: 'flex', alignItems: 'flex-end', height: chartHeight, gap: 40, justifyContent: 'center', position: 'relative', zIndex: 1 }}>
        {contributions.map((c, i) => {
          const barHeight = 80 * Math.abs(c) / max;
          return (
            <div key={i} style={{ textAlign: 'center', width: 54, position: 'relative' }}>
              {/* Value bubble */}
              <div style={{
                position: 'absolute',
                left: '50%',
                bottom: barHeight + 32,
                transform: 'translateX(-50%)',
                background: '#fff',
                color: c >= 0 ? '#16a34a' : '#ef4444',
                fontWeight: 700,
                fontSize: 15,
                padding: '2.5px 10px',
                borderRadius: 8,
                boxShadow: '0 1px 4px #e0e7ef',
                border: c >= 0 ? '2px solid #16a34a' : '2px solid #ef4444',
                transition: 'bottom 0.4s',
                zIndex: 2,
              }}>{c >= 0 ? '+' : ''}{c.toFixed(2)}</div>
              {/* Bar */}
              <div
                style={{
                  height: `${barHeight}px`,
                  width: 36,
                  background: colors[i % colors.length],
                  borderRadius: '12px 12px 8px 8px',
                  marginBottom: 6,
                  marginLeft: 'auto',
                  marginRight: 'auto',
                  boxShadow: '0 2px 8px #d1d5db',
                  transition: 'height 0.4s',
                  position: 'relative',
                  border: c >= 0 ? '2px solid #16a34a' : '2px solid #ef4444',
                  outline: c === max ? '3px solid #6366f1' : undefined,
                  filter: c === max ? 'drop-shadow(0 0 6px #6366f1aa)' : undefined,
                }}
                title={`Contribution: ${c.toFixed(3)}`}
              />
              {/* X-axis label */}
              <div style={{ fontSize: 15, color: '#475569', marginTop: 8, fontWeight: 500 }}>{inputLabels[i] || `Input ${i+1}`}</div>
            </div>
          );
        })}
      </div>
      {/* Axis line */}
      <div style={{ position: 'absolute', left: 0, right: 0, bottom: 24, height: 2, background: '#cbd5e1', borderRadius: 1 }} />
    </div>
  );
};

export default FeatureImportanceBarChart;
