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
      const tables = [];
      let currentTable = [];
      let isSheet1 = false;

      for (let i = 0; i < rows.length; i++) {
        const row = rows[i].trim();

        if (row.startsWith('Table 1')) {
          // Start reading data for Sheet 1
          isSheet1 = true;
          currentTable.push(row.split('\t')); // Include the header row
        } else if (isSheet1) {
          if (row === '') {
            if (currentTable.length > 0) {
              tables.push(currentTable);
              currentTable = [];
            }
          } else {
            currentTable.push(row.split('\t'));
          }
        }
      }

      if (currentTable.length > 0) {
        tables.push(currentTable);
      }

      setData(tables);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  const columnHeaders = [
    'Senior Pitch 1',
    'Senior Pitch 2',
    'Juvenile Pitch',
    'ATA 1',
    'ATA 2',
    'Hurling Wall',
  ];

  const days = [
    'Monday',
    'Tuesday',
    'Wednesday',
    'Thursday',
    'Friday',
    'Saturday',
    'Sunday',
  ];

  const timeSlots = [
    '6:00pm - 6:30pm',
    '6:30pm - 7:00pm',
    '7:00pm - 7:30pm',
    '7:30pm - 8:00pm',
    '8:00pm - 8:30pm',
    '8:30pm - 9:00pm',
    '9:00pm - 9:30pm',
    '9:30pm - 10:00pm',
    '10:30pm - 11:00pm',
  ];

  const tableStyle = {
    borderCollapse: 'collapse',
    width: '100%', // Make tables smaller
    margin: 'auto', // Center tables horizontally
    border: '1px solid #dddddd', // Border around the table
  };

  const thStyle = {
    border: '1px solid #dddddd',
    textAlign: 'center', // Center horizontally
    verticalAlign: 'middle', // Center vertically
    padding: '4px',
    backgroundColor: '#f0f8ff', // Light Blue
    color: '#333',
    fontSize: '12px', // Reduce font size for table headers
  };

  const tdStyle = {
    border: '1px solid #dddddd', // Border around each cell
    textAlign: 'center',
    padding: '4px',
    fontSize: '12px', // Reduce font size for table cells
  };

  return (
    <div>
      <div className="table-container">
        {columnHeaders.slice(0, 3).map((tableHeader, tableIndex) => (
          <div key={tableIndex}>
            <h2>{tableHeader}</h2>
            <table style={tableStyle}>
              <thead>
                <tr>
                  <th style={thStyle}></th>
                  {days.map((day, dayIndex) => (
                    <th key={dayIndex} style={thStyle}>
                      {day}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {timeSlots.map((timeSlot, timeIndex) => (
                  <tr key={timeIndex}>
                    <td style={thStyle}>{timeSlot}</td>
                    {data[tableIndex] &&
                      data[tableIndex].map((rowData, rowIndex) => (
                        <td key={rowIndex} style={tdStyle}>
                          {rowData[timeIndex + 1]}
                        </td>
                      ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ))}
      </div>
      <div className="table-container">
        {columnHeaders.slice(3).map((tableHeader, tableIndex) => (
          <div key={tableIndex}>
            <h2>{tableHeader}</h2>
            <table style={tableStyle}>
              <thead>
                <tr>
                  <th style={thStyle}></th>
                  {days.map((day, dayIndex) => (
                    <th key={dayIndex} style={thStyle}>
                      {day}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {timeSlots.map((timeSlot, timeIndex) => (
                  <tr key={timeIndex}>
                    <td style={thStyle}>{timeSlot}</td>
                    {data[tableIndex + 3] &&
                      data[tableIndex + 3].map((rowData, rowIndex) => (
                        <td key={rowIndex} style={tdStyle}>
                          {rowData[timeIndex + 1]}
                        </td>
                      ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ))}
      </div>
    </div>
  );
};

export default GoogleSheetsAPI;
