"use client";
import styles from "./page.module.css";

import { useState, useEffect } from "react";
import { useRouter } from 'next/navigation'; // Import useRouter for redirection

export default function Header() {
  const [username, setUsername] = useState(null);
  const [error, setError] = useState(null);
  const router = useRouter(); // Initialize useRouter

  useEffect(() => {
    const fetchData = async () => {
      try {
        const token = localStorage.getItem('token');
        if (!token) {
          throw new Error('Authentication token not found');
        }

        const response = await fetch('http://localhost:8080/see_details', {
          method: 'GET',
          headers: {
            'Authorization': `Bearer ${token}`
          }
        });
        if (!response.ok) {
          throw new Error('Failed to fetch data');
        }

        const data = await response.json();
        console.log("Fetched data: ", data);

        // Assuming the data from backend is an array of users
        if (data.tasks && data.tasks.length > 0) {
          setUsername(data.tasks[0].Username);
        } else {
          throw new Error('No user data found');
        }
      } catch (error) {
        console.error('Error in getting data: ', error);
        setError(error.message);
      }
    };

    fetchData();
  }, []);

  const handleProfileClick = () => {
    router.push('/dashboard/profile');
  };

  return (
    <div className={styles.container}>

      <div className={styles.profile} onClick={handleProfileClick}>
        <img
          className={styles.userimg}
          src="/img/user.jpg"
          alt=""
          height={45}
          width={45}
        />
        {username ? (
          <span className={styles.title}>Hi {username}</span>
        ) : (
          <span className={styles.title}>Loading...</span>
        )}
        {error && <span className={styles.error}>{error}</span>}
      </div>
    </div>
  );
}
