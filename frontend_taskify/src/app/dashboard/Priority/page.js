'use client';

import React, { useEffect, useState } from 'react';
import styles from './page.module.css'; // Import the CSS module

const Priority = () => {
  const [responseData, setResponseData] = useState(null);
  const [error, setError] = useState(null);
  const [selectedTask, setSelectedTask] = useState(null);

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

  const handleTaskClick = (task) => {
    setSelectedTask(task);
  };

  const closeModal = () => {
    setSelectedTask(null);
  };

  return (
    <div>
      {error ? (
        <p>Error: {error}</p>
      ) : responseData ? (
        <div className={styles.taskContainer}>
          <ul className={styles.taskList}>
            {responseData.tasks.map((task, index) => (
              <li key={index} className={styles.taskBox} onClick={() => handleTaskClick(task)}>
                <span className={styles.bullet}></span>
                <div className={styles.taskContent}>
                  <span className={styles.taskTitle}><strong>Title:</strong> {task.title}</span>
                  <span className={styles.taskDate}><strong>Date:</strong> {task.date}</span>
                </div>
              </li>
            )).reverse()} {/* Reverse the order to display the latest tasks first */}
          </ul>
          {selectedTask && (
            <div className={styles.modal}>
              <div className={styles.modalContent}>
                <span className={styles.closeButton} onClick={closeModal}>&times;</span>
                <h2 className={styles.title}>Task Details</h2>
                <div className={styles.details}>
                <p><strong>Title:      </strong> {selectedTask.title}</p>
                <p><strong>Description:</strong> {selectedTask.description}</p>
                <p><strong>Date:</strong> {selectedTask.date}</p>
                <p><strong>Status:</strong> {selectedTask.status}</p>
                </div>
              </div>
            </div>
          )}
        </div>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
};

export default Priority;