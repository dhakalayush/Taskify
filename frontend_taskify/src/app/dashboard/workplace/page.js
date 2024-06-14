"use client";
import React, { useEffect, useState } from "react";
import styles from "./page.module.css";
import Link from "next/link";

export default function Workplace() {
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
        setResponseData(data);
      } catch (error) {
        console.error('Error fetching data:', error);
        setError(error.message);
      }
    };

    fetchData();
  }, []);

  return (
    <div className={styles.container1}>
      <div className={styles.title}>
        <p>Workplace</p>
      </div>
      {error ? (
        <p>Error: {error}</p>
      ) : responseData ? (
        <div className={styles.container2}>
          <p className={styles.additionalText}> Are You trying to Work?</p>
          <ul>
            {responseData.workplaces.map((workplace, index) => (
              <li key={index}>
                <Link href={`/dashboard/workplace/home`} passHref>
                  <span className={styles.workplace1}>{workplace.title}</span>
                </Link>
                <br />
              </li>
            ))}
          </ul>
        </div>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
}
