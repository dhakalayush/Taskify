"use client";
import styles from "./page.module.css";
import { LineChart, Line, XAxis, YAxis, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import React, { useEffect, useState } from 'react';
import axios from "/home/ayush/Documents/GitHub/taskifyrs/frontend_taskify/src/app/axiosSetup"; // Import axios setup file

export default function Chart() {
  const [responseData, setResponseData] = useState(null);
  const [error, setError] = useState(null);
  const[res, setRes] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const token = localStorage.getItem('token');
        if (!token) {
          throw new Error('Authentication token not found');
        }

        const response = await fetch('http://localhost:8080/put_data', {
          method: 'GET',
          headers: {
            'Authorization': `Bearer ${token}`
          }
        });

        if (!response.ok) {
          throw new Error('No data');
        }

        const data = await response.json();
        console.log("Getting from backend: ", data);
        setResponseData(data);
      } catch (error) {
        console.error('Error fetching data:', error);
        setError(error.message);
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const token = localStorage.getItem('token');
        if (!token) {
          throw new Error('Authentication token not found');
        }

        const res = await fetch('http://localhost:8080/see_data', {
          method: 'GET',
          headers: {
            'Authorization': `Bearer ${token}`
          }
        });

        if (!res.ok) {
          throw new Error('No data');
        }

        const data = await res.json();
        console.log("Getting from backend12345: ", data);
        setRes(data);
      } catch (error) {
        console.error('Error fetching data:', error);
        setError(error.message);
      }
    };

    fetchData();
  }, []);
  // Prepare chart data from responseData
  const chartData = res ? res.tasks.map(task => ({
    name: task.date,
    todo: parseInt(task.numberoftodo, 10),
    ongoing: parseInt(task.numberofinprogress, 10),
    completed: parseInt(task.numberofcompleted, 10)
})) : [];


  return (
    <div>
      <div className={styles.titlebox}>
        <span className={styles.title}>Charts</span>
      </div>
      <div className={styles.carditems}>
        {error ? (
          <p>Error: {error}</p>
        ) : responseData ? (
          <>
            <div className={styles.card}>
              <span className={styles.details}>To Do Lists
                <span className={styles.number}>{responseData.counts.numOfTodoTasks}</span>
              </span>
            </div>
            <div className={styles.card}>
              <span className={styles.details}>Ongoing
                <span className={styles.number}>{responseData.counts.numOfInProgressTasks}</span>
              </span>
            </div>
            <div className={styles.card}>
              <span className={styles.details}>Completed
                <span className={styles.number}>{responseData.counts.numOfCompletedTasks}</span>
              </span>
            </div>
          </>
        ) : (
          <p>Loading...</p>
        )}
      </div>
      <div className={styles.bar}>
        <ResponsiveContainer width="100%" height={500}>
          <LineChart
            data={chartData}
            margin={{
              top: 5,
              right: 30,
              left: 20,
              bottom: 5,
            }}
          >
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Line type="monotone" dataKey="todo" stroke="#8884d8" activeDot={{ r: 8 }} />
            <Line type="monotone" dataKey="ongoing" stroke="#82ca9d" />
            <Line type="monotone" dataKey="completed" stroke="#82ca9e" />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}