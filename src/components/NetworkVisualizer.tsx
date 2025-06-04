import React, { useState } from 'react';

// Demo weight matrices for input->hidden and hidden->output
const weightsIH = [
  [0.25, -0.31, 0.12, 0.48], // input 0 to hidden 0-3
  [0.05, 0.22, -0.14, 0.33], // input 1 to hidden 0-3
  [-0.17, 0.09, 0.41, -0.28], // input 2 to hidden 0-3
];
const weightsHO = [
  [0.18], // hidden 0 to output 0
  [-0.27], // hidden 1 to output 0
  [0.35], // hidden 2 to output 0
  [0.07], // hidden 3 to output 0
];

const inputCount = 3;
const hiddenCount = 4;
const outputCount = 1;

const layerX = [60, 200, 340]; // X positions for input, hidden, output layers
const nodeRadius = 18;
const svgWidth = 400;
const svgHeight = 260;

function getYPositions(count: number): number[] {
  const spacing = svgHeight / (count + 1);
  return Array.from({ length: count }, (_, i) => spacing * (i + 1));
}

const inputY = getYPositions(inputCount);
const hiddenY = getYPositions(hiddenCount);
const outputY = getYPositions(outputCount);

type HoveredConn = { fromLayer: number; fromIdx: number; toLayer: number; toIdx: number; } | null;

const NetworkVisualizer: React.FC = () => {
  const [hovered, setHovered] = useState<HoveredConn>(null);

  return (
    <svg width={svgWidth} height={svgHeight} style={{ background: '#f8fafc', borderRadius: 12, boxShadow: '0 2px 8px #ddd' }}>
      {/* Connections: input -> hidden */}
      {inputY.map((y1, i) =>
        hiddenY.map((y2, j) => {
          const isHovered = hovered && hovered.fromLayer === 0 && hovered.fromIdx === i && hovered.toLayer === 1 && hovered.toIdx === j;
          const x1 = layerX[0] + nodeRadius, x2 = layerX[1] - nodeRadius;
          const yLabel = (y1 + y2) / 2 - 8;
          const xLabel = (x1 + x2) / 2;
          return (
            <g key={`ih-${i}-${j}`}
              onMouseEnter={() => setHovered({ fromLayer: 0, fromIdx: i, toLayer: 1, toIdx: j })}
              onMouseLeave={() => setHovered(null)}>
              <line
                x1={x1}
                y1={y1}
                x2={x2}
                y2={y2}
                stroke={isHovered ? '#6366f1' : '#bbb'}
                strokeWidth={isHovered ? 2.5 : 1.5}
              />
              {isHovered && (
                <text x={xLabel} y={yLabel} textAnchor="middle" fontSize={14} fill="#334155" fontWeight="bold" style={{ pointerEvents: 'none' }}>
                  {weightsIH[i][j] >= 0 ? '+' : ''}{weightsIH[i][j].toFixed(2)}
                </text>
              )}
            </g>
          );
        })
      )}
      {/* Connections: hidden -> output */}
      {hiddenY.map((y1, i) =>
        outputY.map((y2, j) => {
          const isHovered = hovered && hovered.fromLayer === 1 && hovered.fromIdx === i && hovered.toLayer === 2 && hovered.toIdx === j;
          const x1 = layerX[1] + nodeRadius, x2 = layerX[2] - nodeRadius;
          const yLabel = (y1 + y2) / 2 - 8;
          const xLabel = (x1 + x2) / 2;
          return (
            <g key={`ho-${i}-${j}`}
              onMouseEnter={() => setHovered({ fromLayer: 1, fromIdx: i, toLayer: 2, toIdx: j })}
              onMouseLeave={() => setHovered(null)}>
              <line
                x1={x1}
                y1={y1}
                x2={x2}
                y2={y2}
                stroke={isHovered ? '#6366f1' : '#bbb'}
                strokeWidth={isHovered ? 2.5 : 1.5}
              />
              {isHovered && (
                <text x={xLabel} y={yLabel} textAnchor="middle" fontSize={14} fill="#334155" fontWeight="bold" style={{ pointerEvents: 'none' }}>
                  {weightsHO[i][j] >= 0 ? '+' : ''}{weightsHO[i][j].toFixed(2)}
                </text>
              )}
            </g>
          );
        })
      )}
      {/* Input nodes */}
      {inputY.map((y, i) => (
        <circle
          key={`input-${i}`}
          cx={layerX[0]}
          cy={y}
          r={nodeRadius}
          fill="#fff"
          stroke="#555"
          strokeWidth={2}
        />
      ))}
      {/* Hidden nodes */}
      {hiddenY.map((y, i) => (
        <circle
          key={`hidden-${i}`}
          cx={layerX[1]}
          cy={y}
          r={nodeRadius}
          fill="#fff"
          stroke="#555"
          strokeWidth={2}
        />
      ))}
      {/* Output node */}
      {outputY.map((y, i) => (
        <circle
          key={`output-${i}`}
          cx={layerX[2]}
          cy={y}
          r={nodeRadius}
          fill="#fff"
          stroke="#555"
          strokeWidth={2}
        />
      ))}
    </svg>
  );
};

export default NetworkVisualizer;
