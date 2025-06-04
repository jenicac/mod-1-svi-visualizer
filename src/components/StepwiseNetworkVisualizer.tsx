import React, { useState } from 'react';

// Demo weights and biases
const weightsIH = [
  [0.25, -0.31, 0.12, 0.48],
  [0.05, 0.22, -0.14, 0.33],
  [-0.17, 0.09, 0.41, -0.28],
];
const biasesH = [0.1, -0.2, 0.05, 0.3];
const weightsHO = [0.18, -0.27, 0.35, 0.07];
const biasO = 0.15;

const inputCount = 3;
const hiddenCount = 4;
const outputCount = 1;

const layerX = [60, 200, 340];
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

function relu(x: number) { return Math.max(0, x); }
function sigmoid(x: number) { return 1 / (1 + Math.exp(-x)); }

export interface StepwiseNetworkVisualizerProps {
  input: number[];
}

const StepwiseNetworkVisualizer: React.FC<StepwiseNetworkVisualizerProps> = ({ input }) => {
  const [step, setStep] = useState(0); // 0=input, 1=hidden, 2=output

  // Forward propagation steps
  // Step 0: show input
  // Step 1: input -> hidden
  // Step 2: hidden -> output

  // Calculate hidden layer
  const zH = hiddenY.map((_, j) => input.reduce((sum, x, i) => sum + x * weightsIH[i][j], biasesH[j]));
  const aH = zH.map(relu);
  // Calculate output
  const zO = aH.reduce((sum, h, i) => sum + h * weightsHO[i], biasO);
  const aO = sigmoid(zO);

  // Animation helpers
  const highlightConn = (from: number, to: number, layer: number) => {
    if (step === 1 && layer === 0) return true;
    if (step === 2 && layer === 1) return true;
    return false;
  };
  const highlightNode = (layer: number, idx: number) => {
    if (step === 0 && layer === 0) return true;
    if (step === 1 && layer === 1) return true;
    if (step === 2 && layer === 2) return true;
    return false;
  };

  return (
    <div>
      <svg width={svgWidth} height={svgHeight} style={{ background: '#f8fafc', borderRadius: 12, boxShadow: '0 2px 8px #ddd' }}>
        {/* Connections: input -> hidden */}
        {inputY.map((y1, i) =>
          hiddenY.map((y2, j) => (
            <line
              key={`ih-${i}-${j}`}
              x1={layerX[0] + nodeRadius}
              y1={y1}
              x2={layerX[1] - nodeRadius}
              y2={y2}
              stroke={highlightConn(i, j, 0) ? '#6366f1' : '#bbb'}
              strokeWidth={highlightConn(i, j, 0) ? 2.5 : 1.5}
            />
          ))
        )}
        {/* Connections: hidden -> output */}
        {hiddenY.map((y1, i) =>
          outputY.map((y2, j) => (
            <line
              key={`ho-${i}-${j}`}
              x1={layerX[1] + nodeRadius}
              y1={y1}
              x2={layerX[2] - nodeRadius}
              y2={y2}
              stroke={highlightConn(i, j, 1) ? '#6366f1' : '#bbb'}
              strokeWidth={highlightConn(i, j, 1) ? 2.5 : 1.5}
            />
          ))
        )}
        {/* Input nodes */}
        {inputY.map((y, i) => (
          <g key={`input-${i}`}>
            <circle
              cx={layerX[0]}
              cy={y}
              r={nodeRadius}
              fill={highlightNode(0, i) ? '#6366f1' : '#fff'}
              stroke="#555"
              strokeWidth={2}
            />
            <text x={layerX[0]} y={y + 5} textAnchor="middle" fontSize={14} fill={highlightNode(0, i) ? '#fff' : '#333'}>
              {input[i].toFixed(2)}
            </text>
          </g>
        ))}
        {/* Hidden nodes */}
        {hiddenY.map((y, i) => (
          <g key={`hidden-${i}`}>
            <circle
              cx={layerX[1]}
              cy={y}
              r={nodeRadius}
              fill={highlightNode(1, i) ? '#6366f1' : '#fff'}
              stroke="#555"
              strokeWidth={2}
            />
            <text x={layerX[1]} y={y + 5} textAnchor="middle" fontSize={14} fill={highlightNode(1, i) ? '#fff' : '#333'}>
              {step > 0 ? aH[i].toFixed(2) : ''}
            </text>
          </g>
        ))}
        {/* Output node */}
        {outputY.map((y, i) => (
          <g key={`output-${i}`}>
            <circle
              cx={layerX[2]}
              cy={y}
              r={nodeRadius}
              fill={highlightNode(2, i) ? '#6366f1' : '#fff'}
              stroke="#555"
              strokeWidth={2}
            />
            <text x={layerX[2]} y={y + 5} textAnchor="middle" fontSize={14} fill={highlightNode(2, i) ? '#fff' : '#333'}>
              {step > 1 ? aO.toFixed(2) : ''}
            </text>
          </g>
        ))}
      </svg>
      <div style={{ display: 'flex', gap: 12, marginTop: 12 }}>
        <button onClick={() => setStep(s => Math.max(0, s - 1))} disabled={step === 0}>Previous</button>
        <button onClick={() => setStep(s => Math.min(2, s + 1))} disabled={step === 2}>Next</button>
        <span style={{ marginLeft: 16 }}>Step: {step === 0 ? 'Input Layer' : step === 1 ? 'Hidden Layer' : 'Output Layer'}</span>
      </div>
    </div>
  );
};

export default StepwiseNetworkVisualizer;
