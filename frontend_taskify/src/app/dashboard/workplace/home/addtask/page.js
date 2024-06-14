"use client";
import React, { useState } from "react";
import styles from "./page.module.css";
import { MdDelete, MdFileUpload } from "react-icons/md";
import axios from "axios"; // Import Axios for making HTTP requests

export default function Workplace1({ workplaceId }) {
    const [tasks, setTasks] = useState([]);
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [status, setStatus] = useState('To Do');
    const [error, setError] = useState('');

    const addTask = () => {
        if (title && description) {
            setTasks([{ title, description }, ...tasks]);
        }
    };

    const deleteTask = (index) => {
        setTasks(tasks.filter((_, i) => i !== index));
    };

    function addwtask(wId, newStatus) {
        const token = localStorage.getItem('token');
        if (!token) {
            alert('Authentication token not found');
            return;
        }
        const date = new Date().toISOString().slice(0, 10);// Get current date in ISO format
        wId = 20;
        const payload = JSON.stringify({ title: title, description: description, status: newStatus, date, workplace_id: wId });
        console.log('Adding tasks with payload:', payload);

        axios
            .post('http://localhost:8080/add_workplace_tasks', payload, {
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json'
                }
            })
            .then((response) => {
                console.log(`Tasks is added to workplace id: ${wId}`);
                setTitle("");
                setDescription("");
            })
            .catch((error) => {
                if (error.response && error.response.data && error.response.data.error) {
                    alert(error.response.data.error); // Show alert for error message from backend
                } else {
                    alert('Failed to update task status'); // Generic error alert
                }
            });
    }

    return (
        <div className={styles.title}>
            <div className={styles.title2}>
                <p>Workplace {workplaceId}</p>
            </div>
            <div className={styles.container}>
                <h1 className={styles.header}>New Task</h1>
                <div className={styles.taskForm}>
                    <input
                        className={styles.input}
                        type="text"
                        placeholder="Task Title"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        required
                    />
                    <textarea
                        className={styles.input}
                        placeholder="Description"
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                        required
                        rows={4}
                        style={{ resize: "vertical" }}
                    />
                    <button onClick={addTask} className={styles.button}>Add Task</button>
                </div>
                <div className={styles.tasksContainer}>
                    <h1 className={styles.header}>Task to be Provided</h1>
                    {tasks.length === 0 ? (
                        <p>No tasks to Assign</p>
                    ) : (
                        tasks.map((task, index) => (
                            <div key={index} className={styles.task}>
                                <h4 className={styles.taskTitle}>{task.title}</h4>
                                <p className={styles.taskDescription}>{task.description}</p>
                                <div className={styles.md}>
                                    <button onClick={() => deleteTask(index)} className={styles.deleteButton}><MdDelete /></button>
                                    <button className={styles.uploadbtn} onClick={() => addwtask(workplaceId, 'To Do')}> <MdFileUpload /></button>
                                </div>
                            </div>
                        ))
                    )}
                </div>
            </div>
        </div>
    );
}
