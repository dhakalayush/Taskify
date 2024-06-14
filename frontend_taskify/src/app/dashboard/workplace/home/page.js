"use client";
import React, { useEffect, useState } from 'react';

import styles from "./page.module.css";

export default function Workplace() {
    const [responseData, setResponseData] = useState(null);
    const [error, setError] = useState(null);
    const [modalIsOpen, setModalIsOpen] = useState(false);
    const [selectedTask, setSelectedTask] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const token = localStorage.getItem('token');
                if (!token) {
                    throw new Error('Authentication token not found');
                }

                const response = await fetch('http://localhost:8080/see_workplace_tasks', {
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

    const openModal = (task) => {
        setSelectedTask(task);
        setModalIsOpen(true);
    };

    const closeModal = () => {
        setModalIsOpen(false);
        setSelectedTask(null);
    };

    return (
        <div className={styles.container}>
             <div className={styles.heading}>
             <h1>Tasks</h1>
             </div>
            {error ? (
                <p>Error: {error}</p>
            ) : responseData ? (
                <div className={styles.body}>
                    <ul>
                        {responseData.tasks.map((task, index) => (
                            <li key={index} className={styles.container1}>
                                <button className={styles.tt} onClick={() => openModal(task)}>
                                    {task.title}
                                </button>
                            </li>
                        ))}
                    </ul>
                   
                        {selectedTask && (
                            <div className={styles.overlay}>
                                <div className={styles.details}>
                                <h2 className={styles.title}>{selectedTask.title}</h2>
                                <div className={styles.des}>
                                <p><strong>Description:</strong> {selectedTask.description}</p>
                                <p><strong>Status:</strong> {selectedTask.status}</p>
                                <p><strong>Date:</strong> {selectedTask.date}</p>
                                </div>
                                <button onClick={closeModal}>Close</button>
                                
                            </div>
                            </div>
                        )}
                
                </div>
            ) : (
                <p>Loading...</p>
            )}
        </div>
    );
}
