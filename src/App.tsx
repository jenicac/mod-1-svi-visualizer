import React, { useState } from 'react';
import './App.css';
import DataUploader from './components/DataUploader';
import NetworkVisualizer from './components/NetworkVisualizer';
import StepwiseNetworkVisualizer from './components/StepwiseNetworkVisualizer';

// Simple forward propagation for demonstration
function forwardProp(input: number[], weights: number[][], biases: number[][], activations: string[]): number[][] {
  let a = input;
  const acts: number[][] = [[...input]];
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
  const [sviData, setSviData] = useState<any[]>([]);
  const [input, setInput] = useState<number[]>([0.5, 0.3, 0.7]);
  const acts = forwardProp(input, defaultWeights, defaultBiases, defaultActivations);

  return (
    <div className="App" style={{ background: '#f8fafc', minHeight: '100vh' }}>
      <header style={{ background: '#334155', color: 'white', padding: 24, borderRadius: 8, margin: 24 }}>
        <h1>Mod 1 SVI Neural Network Visualizer</h1>
        <p>Visualize forward propagation on CDC Social Vulnerability Index (SVI) data</p>
      </header>
      <main style={{ maxWidth: 1200, margin: '0 auto', padding: 24 }}>
        <div style={{ display: 'flex', gap: 32, alignItems: 'flex-start', flexWrap: 'wrap' }}>
          {/* Section 1: Network Architecture Visualization */}
          <section style={{ flex: '1 1 340px', minWidth: 320, background: '#fff', borderRadius: 10, padding: 20, boxShadow: '0 1px 8px #e0e7ef' }}>
            <h2 style={{ color: '#334155', marginBottom: 18 }}>1. Network Architecture</h2>
            <NetworkVisualizer layers={defaultLayers} activations={acts} />
          </section>

          {/* Section 2: Data Input Panel */}
          <section style={{ flex: '1 1 320px', minWidth: 300, background: '#fff', borderRadius: 10, padding: 20, boxShadow: '0 1px 8px #e0e7ef' }}>
            <h2 style={{ color: '#334155', marginBottom: 18 }}>2. Data Input Panel</h2>
            <DataUploader onDataLoaded={setSviData} />
            {sviData.length > 0 && (
              <div style={{ margin: '16px 0', background: '#f1f5f9', borderRadius: 8, padding: 12, fontSize: 13 }}>
                <strong>Sample SVI Data:</strong>
                <pre style={{ maxHeight: 120, overflow: 'auto' }}>{JSON.stringify(sviData.slice(0, 2), null, 2)}</pre>
              </div>
            )}
            <div style={{ marginTop: 18 }}>
              <label>Input (3 features): </label>
              <input type="number" value={input[0]} step="0.01" onChange={e => setInput([+e.target.value, input[1], input[2]])} style={{ width: 60, marginRight: 8 }} />
              <input type="number" value={input[1]} step="0.01" onChange={e => setInput([input[0], +e.target.value, input[2]])} style={{ width: 60, marginRight: 8 }} />
              <input type="number" value={input[2]} step="0.01" onChange={e => setInput([input[0], input[1], +e.target.value])} style={{ width: 60 }} />
            </div>
          </section>

          {/* Section 3: Propagation Visualization */}
          <section style={{ flex: '1 1 340px', minWidth: 320, background: '#fff', borderRadius: 10, padding: 20, boxShadow: '0 1px 8px #e0e7ef' }}>
            <h2 style={{ color: '#334155', marginBottom: 18 }}>3. Propagation Visualization</h2>
            <StepwiseNetworkVisualizer input={input} />
          </section>
        </div>
      </main>
    </div>
  );
}

export default App;
