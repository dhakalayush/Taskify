"use client";
import { useState, useEffect } from 'react';
import axios from "/home/ayush/Documents/GitHub/taskifyrs/frontend_taskify/src/app/axiosSetup"; // Import axios setup file // Import axios setup file
import styles from './page.module.css';
import { AiOutlineDelete } from 'react-icons/ai';
import { useRouter } from 'next/navigation';

export default function Profile() {
    const [fullname, setFullName] = useState('');
    const [password, setPassword] = useState('');
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [error, setError] = useState(null);
    const router = useRouter();

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

                if (data.tasks && data.tasks.length > 0) {
                    setFullName(data.tasks[0].Full_Name);
                    setEmail(data.tasks[0].Email);
                    setUsername(data.tasks[0].Username);
                }
            } catch (error) {
                console.error('Error in getting data: ', error);
                setError(error.message);
            }
        }
        fetchData();
    }, []);

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!password.trim()) {
            setError('Please fill in all fields.');
            return;
        }
        try {
            const response = await axios.post('http://localhost:8080/update_password', { password });
            console.log('Password Updated Successfully:', response.data);
            alert("Password Updated Successfully");
            setPassword('');
        } catch (error) {
            console.error('Error updating password:', error);
            setError('Failed to update password.');
        }
    };

    const deleteProfile = async () => {
        try {
            const token = localStorage.getItem('token');
            if (!token) {
                throw new Error('Authentication token not found');
            }

            const response = await axios.put('http://localhost:8080/delete_profile', {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            });
            console.log("Profile Deleted Successfully: ", response.data);
            alert("Profile Deleted Successfully");
            localStorage.removeItem("token");
            router.push('/login');
            
            
        } catch (error) {
            console.error('Error deleting profile: ', error);
            setError('Failed to delete profile.');
        }
    };

    return (
        <div className={styles.container}>
            <div className={styles.details}>
                {username ? (
                    <span className={styles.username}>Username: {username}</span>
                ) : (
                    <span className={styles.username}>Username: Loading...</span>
                )}

                {email ? (
                    <span className={styles.email}>Email: {email}</span>
                ) : (
                    <span className={styles.email}>Email: Loading...</span>
                )}

                {fullname ? (
                    <span className={styles.fullname}>Full Name: {fullname}</span>
                ) : (
                    <span className={styles.fullname}>Full Name: Loading...</span>
                )}
            </div>

            <form className={styles.taskForm} onSubmit={handleSubmit}>
                <label htmlFor="password" className={styles.label}>Password</label>
                <input
                    type="password"
                    id="password"
                    name="password"
                    className={styles.inputField}
                    placeholder="Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                />
                <button type="submit" className={styles.button}>
                    SUBMIT
                </button>
            </form>
            <button 
                onClick={deleteProfile} // Properly invoking the deleteProfile function
                style={{
                    backgroundColor: '#dc3545',
                    color: 'white',
                    border: 'none',
                    margin: "10px",
                    marginLeft: "65px",
                    padding: '10px 180px',
                    borderRadius: '5px',
                    cursor: 'pointer'
                }}

            >
                <AiOutlineDelete /> Delete Profile
            </button>
            {error && <span className={styles.error}>{error}</span>}
        </div>
    );
}
