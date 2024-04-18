"use client"; // This is a client component


import { useEffect } from 'react';
import { isAuthenticated } from '../(auth)/auth.js';
import { useRouter } from 'next/navigation';

export default function Dashboard() {
  const router = useRouter(); 
  useEffect(() => {
    // Check if the user is authenticated, if not, redirect to login page
    if (!isAuthenticated()) {
      router.push('/login'); // Redirect to the login page
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("token"); // Remove the token from localStorage
    router.push('/login'); // Redirect to the login page after logout
  };


  return (
    <div>
      <h1>Welcome to the Dashboard</h1>
      <button onClick={handleLogout}>Logout</button>
    </div>
  );
};





