import React from 'react';
import './App.css';
import GoogleSheetsAPI from './GoogleSheetsAPI';
import CHFC from './CHFC.png';

const containerStyle = {
  display: 'flex', // Use flex layout to arrange items horizontally
  alignItems: 'center', // Vertically center items
  flexDirection: 'column', // Stack items vertically
};

const h1Style = {
  textAlign: 'center', // Center the <h1> horizontally
  marginTop: '20px', // Add some margin at the top
};

function App() {
  return (
    <div>
      <div className="image-container">
        <img src={CHFC} alt="CHFC" />
      </div>
      <h1 style={h1Style}>Somerton Pitch Allocation</h1>
      <div style={containerStyle}>
        <GoogleSheetsAPI />
      </div>
    </div>
  );
}

export default App;
