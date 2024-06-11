"use client";
import { useState } from 'react';
import axios from 'axios';
import styles from './page.module.css';

export default function AddWorkplace() {
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [error, setError] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!title.trim() || !description.trim()) {
            setError('Please fill in all fields');
            return;
        }

        try {
            setError(''); // Clear any previous error
            const response = await axios.post("http://localhost:8080/add_workplace", {
                title, 
                description
            });
            console.log('Workplace Added Successfully', response.data);
        } catch (error) {
            console.error('Error adding workplace: ', error);
            setError('Failed to add workplace');
        }
    };

    return (
        <div className={styles.container}>
            <div className={styles.test}>
                Add Workplace
            </div>
            {error && <p className={styles.error}>{error}</p>}
            <form className={styles.taskForm} onSubmit={handleSubmit}>
                <label htmlFor='title' className={styles.label}>Title</label>
                <input 
                    type="text"
                    id="title"
                    name="title"
                    className={styles.inputField}
                    placeholder='Title'
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    required
                />
                <label htmlFor='description' className={styles.label}>Description</label>
                <input 
                    type="text"
                    id="description"
                    name="description"
                    className={styles.inputField}
                    placeholder='Description'
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    required
                />
                <button type="submit" className={styles.button}>
                    SUBMIT
                </button>
            </form>
        </div>
    );
}