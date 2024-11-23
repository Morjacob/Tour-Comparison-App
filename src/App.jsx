// src/App.jsx
import React from 'react';
import Gallery from './Gallery'; 
import './App.css';

const App = () => {
  return (
    <div className="app-container">
      <header className="app-header">
        <h1>Tour Comparison Guide</h1>
        <p>Discover the perfect tour for your next vacation!</p>
      </header>

      <Gallery /> 
    </div>
  );
};

export default App;
