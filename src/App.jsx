import React, { useState } from 'react';
import './App.css';
import DataUploader from './components/DataUploader.jsx';
import NetworkVisualizer from './components/NetworkVisualizer.jsx';
import StepwiseNetworkVisualizer from './components/StepwiseNetworkVisualizer.jsx';
import FeatureImportanceBarChart from './components/FeatureImportanceBarChart.jsx';

// Simple forward propagation for demonstration
function forwardProp(input, weights, biases, activations) {
  let a = input;
  const acts = [[...input]];
  for (let l = 0; l < weights.length; l++) {
    const z = weights[l].map((wRow, i) => wRow.reduce((sum, w, j) => sum + w * a[j], biases[l][i]));
    a = z.map((v) => activations[l] === 'relu' ? Math.max(0, v) : 1 / (1 + Math.exp(-v)));
    acts.push([...a]);
  }
  return acts;
}

const defaultLayers = [
  { neurons: 3, activation: 'relu' },
  { neurons: 4, activation: 'relu' },
  { neurons: 1, activation: 'sigmoid' },
];

const defaultWeights = [
  [ [0.2, -0.1, 0.4], [0.7, 0.3, -0.5], [-0.3, 0.8, 0.1], [0.5, -0.7, 0.2] ], // 3->4
  [ [0.6, -0.2, 0.1, 0.3] ], // 4->1
];
const defaultBiases = [
  [0.1, -0.2, 0.05, 0.3], // 4
  [0.15], // 1
];
const defaultActivations = ['relu', 'sigmoid'];

function App() {
  const [sviData, setSviData] = useState([]);
  const [input, setInput] = useState([0.5, 0.3, 0.7]);
  const acts = forwardProp(input, defaultWeights, defaultBiases, defaultActivations);

  return (
    <div className="App" style={{ background: '#f8fafc', minHeight: '100vh' }}>
      <header style={{ padding: '20px 0', textAlign: 'center', background: '#e0e7ef', borderBottom: '1px solid #cbd5e1' }}>
        <h1 style={{ color: '#334155', fontWeight: 700, fontSize: 32, margin: 0 }}>Mod 1 SVI Neural Network Visualizer</h1>
        <div style={{ color: '#64748b', fontWeight: 500, fontSize: 18, marginTop: 8 }}>Visualize CDC SVI Data with a Simple Neural Network</div>
      </header>
      <main style={{ display: 'flex', flexWrap: 'wrap', gap: 24, justifyContent: 'center', alignItems: 'flex-start', padding: '36px 0' }}>
        {/* Section 1: Network Architecture Visualization */}
        <section style={{ flex: '1 1 340px', minWidth: 320, background: '#fff', borderRadius: 10, padding: 20, boxShadow: '0 1px 8px #e0e7ef' }}>
          <h2 style={{ color: '#334155', marginBottom: 18 }}>1. Network Architecture</h2>
          <NetworkVisualizer />
        </section>
        {/* Section 2: Data Input Panel */}
        <section style={{ flex: '1 1 340px', minWidth: 320, background: '#fff', borderRadius: 10, padding: 20, boxShadow: '0 1px 8px #e0e7ef' }}>
          <h2 style={{ color: '#334155', marginBottom: 18 }}>2. Data Input Panel</h2>
          <DataUploader onDataLoaded={setSviData} />
          <div style={{ marginTop: 16 }}>
            <label style={{ fontWeight: 500, color: '#475569', marginRight: 8 }}>Sample Scenarios:</label>
            <select
              onChange={e => {
                const val = e.target.value;
                if (val === "") return;
                // Presets for three input features
                const presets = {
                  'Urban Low Vulnerability': [0.2, 0.1, 0.3],
                  'Rural High Vulnerability': [0.9, 0.8, 0.7],
                  'Suburban Moderate': [0.5, 0.4, 0.6],
                  'Extreme Outlier': [1.0, 0.0, 1.0]
                };
                setInput(presets[val]);
              }}
              defaultValue=""
              style={{ marginRight: 14, padding: '2px 8px', fontSize: 15 }}
            >
              <option value="">Choose a scenario...</option>
              <option value="Urban Low Vulnerability">Urban Low Vulnerability</option>
              <option value="Rural High Vulnerability">Rural High Vulnerability</option>
              <option value="Suburban Moderate">Suburban Moderate</option>
              <option value="Extreme Outlier">Extreme Outlier</option>
            </select>
          </div>
          <div style={{ marginTop: 8 }}>
            <label style={{ fontWeight: 500, color: '#475569', marginRight: 8 }}>Input Values:</label>
            <input type="number" step="0.01" value={input[0]} onChange={e => setInput([+e.target.value, input[1], input[2]])} style={{ width: 60, marginRight: 6 }} />
            <input type="number" step="0.01" value={input[1]} onChange={e => setInput([input[0], +e.target.value, input[2]])} style={{ width: 60, marginRight: 6 }} />
            <input type="number" step="0.01" value={input[2]} onChange={e => setInput([input[0], input[1], +e.target.value])} style={{ width: 60 }} />
          </div>
        </section>
        {/* Section 3: Propagation Visualization */}
        <section style={{ flex: '1 1 340px', minWidth: 320, background: '#fff', borderRadius: 10, padding: 20, boxShadow: '0 1px 8px #e0e7ef' }}>
          <h2 style={{ color: '#334155', marginBottom: 18 }}>3. Propagation Visualization</h2>
          <StepwiseNetworkVisualizer input={input} />
        </section>
      </main>
      {/* Results Panel */}
      <section style={{ maxWidth: 700, margin: '36px auto 0', background: '#f9fafb', borderRadius: 12, boxShadow: '0 1px 8px #e0e7ef', padding: 28 }}>
        <h2 style={{ color: '#334155', marginBottom: 18 }}>Results</h2>
        <div style={{ fontSize: 18, color: '#475569', marginBottom: 8 }}>
          <strong>Prediction Output:</strong> {acts[acts.length-1][0].toFixed(4)}
        </div>
        <div style={{ marginBottom: 8 }}>
          <strong>How each input contributed:</strong>
        </div>
        {/* Bar chart visualization of feature importance */}
        <FeatureImportanceBarChart
          contributions={input.map((val, i) => {
            // Same calculation as table below
            const hiddenWeights = [0.2, 0.7, -0.3, 0.5];
            const hiddenWeights1 = [-0.1, 0.3, 0.8, -0.7];
            const hiddenWeights2 = [0.4, -0.5, 0.1, 0.2];
            const outWeights = [0.6, -0.2, 0.1, 0.3];
            let contrib = 0;
            for (let h = 0; h < 4; h++) {
              let wIn = 0;
              if (i === 0) wIn = hiddenWeights[h];
              if (i === 1) wIn = hiddenWeights1[h];
              if (i === 2) wIn = hiddenWeights2[h];
              contrib += wIn * outWeights[h];
            }
            contrib = contrib * val;
            return contrib;
          })}
          inputLabels={['Input 1', 'Input 2', 'Input 3']}
        />
        <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: 16, marginTop: 16 }}>
          <thead>
            <tr style={{ background: '#e0e7ef' }}>
              <th style={{ textAlign: 'left', padding: '6px 10px' }}>Input</th>
              <th style={{ textAlign: 'left', padding: '6px 10px' }}>Value</th>
              <th style={{ textAlign: 'left', padding: '6px 10px' }}>Contribution</th>
            </tr>
          </thead>
          <tbody>
            {input.map((val, i) => {
              // Approximate: input -> hidden (weighted sum), then hidden -> output (weighted sum)
              // Use absolute value of combined weights for a simple explanation
              const hiddenWeights = [0.2, 0.7, -0.3, 0.5]; // weightsIH for input 0
              const hiddenWeights1 = [-0.1, 0.3, 0.8, -0.7]; // input 1
              const hiddenWeights2 = [0.4, -0.5, 0.1, 0.2]; // input 2

              // Each input's effect on output: sum over hidden nodes (input->hidden * hidden->output)
              const outWeights = [0.6, -0.2, 0.1, 0.3]; // weightsHO[0]
              let contrib = 0;
              for (let h = 0; h < 4; h++) {
                let wIn = 0;
                if (i === 0) wIn = hiddenWeights[h];
                if (i === 1) wIn = hiddenWeights1[h];
                if (i === 2) wIn = hiddenWeights2[h];
                contrib += wIn * outWeights[h];
              }
              contrib = contrib * val;
              return (
                <tr key={i}>
                  <td style={{ padding: '6px 10px' }}>Input {i+1}</td>
                  <td style={{ padding: '6px 10px' }}>{val.toFixed(2)}</td>
                  <td style={{ padding: '6px 10px' }}>{contrib >= 0 ? '+' : ''}{contrib.toFixed(3)}</td>
                </tr>
              );
            })}
          </tbody>
        </table>
        <div style={{ marginTop: 12, color: '#64748b', fontSize: 15 }}>
          <em>Note: Contribution is a simple estimate based on network weights and does not account for non-linear activations.</em>
        </div>
      </section>
    </div>
  );
}

export default App;
