import React, { useState } from 'react';

const weightsIH = [
  [0.2, -0.1, 0.4],
  [0.7, 0.3, -0.5],
  [-0.3, 0.8, 0.1],
  [0.5, -0.7, 0.2],
];
const weightsHO = [[0.6, -0.2, 0.1, 0.3]];
const inputCount = 3;
const hiddenCount = 4;
const outputCount = 1;
const layerX = [60, 200, 340];
const nodeRadius = 18;
const svgWidth = 400;
const svgHeight = 260;

function getYPositions(count) {
  const spacing = svgHeight / (count + 1);
  return Array.from({ length: count }, (_, i) => spacing * (i + 1));
}
const inputY = getYPositions(inputCount);
const hiddenY = getYPositions(hiddenCount);
const outputY = getYPositions(outputCount);

const NetworkVisualizer = () => {
  const [hovered, setHovered] = useState(null);
  return (
    <svg width={svgWidth} height={svgHeight} style={{ background: '#f8fafc', borderRadius: 12, boxShadow: '0 2px 8px #ddd' }}>
      {/* Connections: input -> hidden */}
      {inputY.map((y1, i) =>
        hiddenY.map((y2, j) => {
          const isHovered = hovered && hovered.fromLayer === 0 && hovered.fromIdx === i && hovered.toLayer === 1 && hovered.toIdx === j;
          return (
            <g key={`ih-${i}-${j}`} onMouseEnter={() => setHovered({ fromLayer: 0, fromIdx: i, toLayer: 1, toIdx: j })} onMouseLeave={() => setHovered(null)}>
              <line
                x1={layerX[0] + nodeRadius}
                y1={y1}
                x2={layerX[1] - nodeRadius}
                y2={y2}
                stroke={isHovered ? '#6366f1' : '#bbb'}
                strokeWidth={isHovered ? 2.5 : 1.5}
              />
              {isHovered && (
                <text x={(layerX[0] + layerX[1]) / 2} y={(y1 + y2) / 2 - 6} fontSize={13} fill="#334155" textAnchor="middle">
                  {weightsIH[j][i].toFixed(2)}
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
          return (
            <g key={`ho-${i}-${j}`} onMouseEnter={() => setHovered({ fromLayer: 1, fromIdx: i, toLayer: 2, toIdx: j })} onMouseLeave={() => setHovered(null)}>
              <line
                x1={layerX[1] + nodeRadius}
                y1={y1}
                x2={layerX[2] - nodeRadius}
                y2={y2}
                stroke={isHovered ? '#6366f1' : '#bbb'}
                strokeWidth={isHovered ? 2.5 : 1.5}
              />
              {isHovered && (
                <text x={(layerX[1] + layerX[2]) / 2} y={(y1 + y2) / 2 - 6} fontSize={13} fill="#334155" textAnchor="middle">
                  {weightsHO[0][i].toFixed(2)}
                </text>
              )}
            </g>
          );
        })
      )}
      {/* Input nodes */}
      {inputY.map((y, i) => (
        <circle key={`input-${i}`} cx={layerX[0]} cy={y} r={nodeRadius} fill="#fff" stroke="#555" strokeWidth={2} />
      ))}
      {/* Hidden nodes */}
      {hiddenY.map((y, i) => (
        <circle key={`hidden-${i}`} cx={layerX[1]} cy={y} r={nodeRadius} fill="#fff" stroke="#555" strokeWidth={2} />
      ))}
      {/* Output node */}
      {outputY.map((y, i) => (
        <circle key={`output-${i}`} cx={layerX[2]} cy={y} r={nodeRadius} fill="#fff" stroke="#555" strokeWidth={2} />
      ))}
    </svg>
  );
};

export default NetworkVisualizer;
