"use client";
import React from "react";
import styles from "./page.module.css";
import Link from "next/link";
import { useEffect, useState } from 'react';

export default function Workplace(){
  const [responseData, setResponseData] = useState(null);
  const [error, setError] = useState(null); 

  useEffect(() => {
    const fetchData = async () => {
      try {
        const token = localStorage.getItem('token');
        if (!token) {
          throw new Error('Authentication token not found');
        }

        const response = await fetch('http://localhost:8080/see_workplace', {
          method: 'GET',
          headers: {
            'Authorization': `Bearer ${token}`
          }
        });

        if (!response.ok) {
          throw new Error('No data');
        }

        const data = await response.json();
        console.log('API response data:', data); // Debugging log
        setResponseData(data);
      } catch (error) {
        console.error('Error fetching data:', error);
        setError(error.message);
      }
    };

    fetchData();
  }, []);   

  return(
    <div className={styles.container1}>
      <div className={styles.title}>
        <p>Workplace</p>
      </div>
      <div className={styles.container2}>
        <Link href="/dashboard/workplace/home" className={styles.workplace1}>Workplace 1</Link>
      </div>
      <div className={styles.container3}>
        <Link href="/dashboard/workplace/home" className={styles.workplace2}>Workplace 2</Link>
      </div>
      {error ? (
        <p>Error: {error}</p>
      ) : responseData ? (
        <div>
          <ul>
            <li>
              <strong>Title:</strong> {responseData.title} <br />
              <strong>Description:</strong> {responseData.description} <br />
              <strong>Team Members:</strong> {responseData.team_members} <br />
              <strong>ID:</strong> {responseData.id}
            </li>
          </ul>
        </div>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
}
