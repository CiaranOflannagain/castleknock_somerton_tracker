// src/components/GoogleSheetData.js
import React, { useEffect, useState } from 'react';
import axios from 'axios';

const GoogleSheetsAPI = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const response = await axios.get(
        'https://docs.google.com/spreadsheets/d/e/2PACX-1vTRwhwhBRDgVpca-Y9C0jAOQZIVNoHI2aXGStP7GPr3yTnjTLY5n3Caf21h69oFX2NBOQkJJOZhotVw/pub?gid=0&single=true&output=csv'
      );
      const rows = response.data.split('\n');
      const columnAData = rows.slice(0, 50); // A1:A4

      setData(columnAData);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  return (
    <div>
      <h1>Google Sheet Data</h1>
      <ul>
        {data.map((item, index) => (
          <li key={index}>{item}</li>
        ))}
      </ul>
    </div>
  );
};

export default GoogleSheetsAPI;

