"use client"
import styles from "./page.module.css"
import React, { useEffect, useState } from 'react';

export default function Chart() {
    const [responseData, setResponseData] = useState(null);
    const [error, setError] = useState(null);

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
        </div>
    );
}
