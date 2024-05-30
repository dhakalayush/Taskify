'use client';

import React, { useEffect, useState } from 'react';

const Priority = () => {
  const [responseData, setResponseData] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const token = localStorage.getItem('token');
        if (!token) {
          throw new Error('Authentication token not found');
        }

        const response = await fetch('http://localhost:8080/see_tasks', {
          method: 'GET',
          headers: {
            'Authorization': `Bearer ${token}`
          }
        });

        if (!response.ok) {
          throw new Error('No data');
        }

        const data = await response.json();
        setResponseData(data);
      } catch (error) {
        console.error('Error fetching data:', error);
        setError(error.message);
      }
    };

    fetchData();
  }, []);

  return (
    <div>
  
    {error ? (
      <p>Error: {error}</p>
    ) : responseData ? (
      <div>
        
        <ul>
          {responseData.tasks.map((task, index) => (
            <li key={index}>
              <strong>Title:</strong> {task.title} <br />
              <strong>Date:</strong> {task.date}
            </li>
          ))}
        </ul>
      </div>
    ) : (
      <p>Loading...</p>
    )}
  </div>
);
};
 

export default Priority;
