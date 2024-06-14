"use client";
import { useState } from 'react';
import axios from 'axios'; // Import axios if not already imported
import styles from './page.module.css';
import {useRouter} from 'next/navigation';
export default function AddTask() {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [status, setStatus] = useState('To Do'); // Default status
  const [error, setError] = useState('');
  const router = useRouter();
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!title.trim() || !description.trim()) {
      setError('Please fill in all fields.');
      return;
    }
    const date = new Date().toISOString().slice(0, 10); // Get current date in ISO format
    try {
      const response = await axios.post("http://localhost:8080/add_tasks", { title, description, date, status });
      console.log('Task added successfully:', response.data);
      setTitle('');
      setDescription('');
      router.push('/dashboard/activities');
    } catch (error) {
      console.error('Error adding task:', error);
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.test}>
        Add Task
      </div>
      
      <form className={styles.taskForm} onSubmit={handleSubmit}>
        <label htmlFor="title" className={styles.label}>Title</label>
        <input
          type="text"
          id="title"
          name="title"
          className={styles.inputField}
          placeholder="Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
        />

        <label htmlFor="description" className={styles.label}>Description</label>
        <input
          type="text"
          id="description"
          name="description"
          className={styles.inputField}
          placeholder="Description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          required
        />

        <label htmlFor="status" className={styles.label}>Status</label>
        <select
          id="status"
          name="status"
          className={styles.selectField}
          value={status}
          onChange={(e) => setStatus(e.target.value)}
        >
          <option value="To Do">To Do</option>
          <option value="In Progress">In Progress</option>
          <option value="Completed">Completed</option>
        </select>

        <button type="submit" className={styles.button}>
          SUBMIT
        </button>
      </form>
      {error && <p className={styles.error}>{error}</p>}
    </div>
  );
}
