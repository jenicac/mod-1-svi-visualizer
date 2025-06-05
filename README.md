# Mod 1 SVI: Neural Network Visualizer

A modern, interactive React application for visualizing simple neural network forward propagation using CDC Social Vulnerability Index (SVI) data.

[![Live Demo](https://img.shields.io/badge/Live%20Demo-View%20App-brightgreen?logo=github)](https://jenicac.github.io/mod-1-svi-visualizer)

## Overview
This project helps users understand how a basic neural network processes real-world SVI data. Upload your own data or use sample scenarios, adjust input values, and visually trace the step-by-step propagation through the network. The app is ideal for education, demonstration, and exploratory data analysis.

## Features
- **Network Architecture Visualization:** See the structure of a simple neural network, including input, hidden, and output layers.
- **Data Input Panel:** Upload SVI data, enter values manually, or pick from preset scenarios.
- **Stepwise Propagation:** Watch how inputs propagate through each layer, with highlighted active nodes and connections.
- **Results Panel:** View the network’s prediction and a breakdown of how each input contributed to the result.
- **Feature Importance Chart:** Instantly see which input features most influenced the prediction using a dynamic bar chart.
- **Responsive Design:** Works well on desktop and mobile devices.

## Live Demo
👉 **[Try the app now!](https://jenicac.github.io/mod-1-svi-visualizer)**

---

## Why Deploy a Live Demo?

Deploying this app as a live, public demo serves several important purposes:

- **Educational Access:** Students, instructors, and lifelong learners can instantly interact with neural network concepts—no installation or coding required. This lowers the barrier to entry for exploring machine learning and SVI data.
- **Research Transparency:** Researchers and collaborators can reproduce your results and visually explore model behavior with real or sample data, supporting open science and reproducibility principles.
- **Community Outreach:** Public health professionals, policymakers, and the general public can see how SVI data can be modeled and interpreted in a neural network, fostering greater understanding and trust in data-driven approaches.
- **Showcasing Work:** A live demo makes your work easily shareable in talks, classrooms, and on social media, increasing its impact and visibility.
- **Feedback & Iteration:** Users can provide feedback directly from the demo, accelerating improvement cycles and making the tool more robust for diverse use cases.

By hosting the app on GitHub Pages, you ensure that anyone, anywhere, can explore and learn from your project in seconds—empowering a broader audience to engage with neural network modeling and SVI analysis.

## Getting Started

### Prerequisites
- [Node.js](https://nodejs.org/) (v16+ recommended)
- [npm](https://www.npmjs.com/)

### Installation
1. Clone the repository:
   ```bash
   git clone https://github.com/jenicac/mod-1-svi-visualizer.git
   cd mod-1-svi-visualizer
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Start the development server:
   ```bash
   npm start
   ```
   The app will open at [http://localhost:3000](http://localhost:3000).

### Build & Deploy
To create a production build:
```bash
npm run build
```
To deploy to GitHub Pages:
```bash
npm run deploy
```

## Usage
- **Upload Data:** Use the Data Input Panel to upload a CSV file or select a sample scenario.
- **Adjust Inputs:** Change input values to see how predictions and feature importances update in real time.
- **Stepwise Visualization:** Use the propagation panel to walk through each step of the network’s forward pass.
- **Interpret Results:** Review the results panel for output value and feature breakdown.

## Technologies Used
- [React](https://react.dev/) (JavaScript/JSX)
- [Create React App](https://create-react-app.dev/)
- [CDC Social Vulnerability Index (SVI)](https://www.atsdr.cdc.gov/placeandhealth/svi/index.html)
- [gh-pages](https://www.npmjs.com/package/gh-pages) for deployment

## Acknowledgments
- CDC for the SVI data resource
- [React](https://react.dev/) community for tooling and inspiration

---

> 2025 Jenica C. | [MIT License](LICENSE)
