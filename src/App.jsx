import React from 'react';
import Gallery from './Gallery'; // Make sure the path is correct
import './App.css'; // Optional: your CSS file for styling

const App = () => {
  return (
    <div className="app-container">
      <header className="app-header">
        <h1>Tour Comparison App</h1>
        <p>Explore the best tours around the world!</p>
      </header>

      <Gallery /> {/* Make sure Gallery is rendered here */}
    </div>
  );
};

export default App;
