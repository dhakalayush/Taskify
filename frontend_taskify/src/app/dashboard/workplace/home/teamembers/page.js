'use client';
import { useEffect, useState } from 'react';
import axios from 'axios';
import { FaPlus } from 'react-icons/fa';
import Modal from 'react-modal';
import styles from "./page.module.css";

export default function TeamMembers() {
  const [responseData, setResponseData] = useState(null);
  const [error, setError] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [getData, setGetData] = useState(null);
  const [selectedMemberId, setSelectedMemberId] = useState('');

  useEffect(() => {
    const fetchData = async () => {
      try {
        const token = localStorage.getItem('token');
        if (!token) {
          throw new Error('Authentication token not found');
        }

        const response = await fetch('http://localhost:8080/see_members', {
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

  const handleModalToggle = () => {
    setIsModalOpen(!isModalOpen);
    if (!getData) {
      getalldata();
    }
  };

  const getalldata = async () => {
    try {
      const token = localStorage.getItem('token');
      if (!token) {
        throw new Error('Authentication token not found');
      }
      
      const response = await fetch('http://localhost:8080/getalldata', {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });
  
      if (!response.ok) {
        throw new Error('No data');
      }
  
      const data = await response.json();
      console.log("Get all data: ", data); // Display the data in console
      setGetData(data);
    } catch (error) {
      console.error('Error fetching data:', error);
      setError(error.message);
    }
  };

  const addmember = (memberId) => {
    const token = localStorage.getItem('token');
    if (!token) {
      alert('Authentication token not found');
      return;
    }
    const payload = JSON.stringify({ member_id: memberId });
    console.log('Adding member with payload:', payload);
    axios
      .post('http://localhost:8080/add_members', payload, {
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        }
      })
      .then((response) => {
        console.log(`Member ${memberId} is added`);
      })
      .catch((error) => {
        if (error.response && error.response.data && error.response.data.error) {
          alert(error.response.data.error); // Show alert for error message from backend
        } else {
          alert('Failed to update task status'); // Generic error alert
        }
      });
  };

  const handleSelectChange = (event) => {
    const selectedName = event.target.value;
    const selectedMember = getData.tasks.find(task => task.Full_Name === selectedName);
    if (selectedMember) {
      setSelectedMemberId(selectedMember.id); // Assuming the ID field is 'id'
    }
  };

  const handleSubmit = () => {
    if (selectedMemberId) {
      addmember(selectedMemberId);
      handleModalToggle();
    } else {
      alert('Please select a member');
    }
  };

  return (
    <div className={styles.container}>
      <h1>Team Members</h1>
      <div className={styles.plusIcon} onClick={handleModalToggle}>
        <FaPlus size={16} />
      </div>
      <Modal isOpen={isModalOpen} onRequestClose={handleModalToggle} className={styles.modal}>
        <h2>Add Members</h2>
        {error ? (
          <p>Error: {error}</p>
        ) : getData ? (
          <div>
            <select onChange={handleSelectChange}>
              <option value="" disabled selected>Select</option>
              {getData.tasks.map((task, index) => (
                <option key={index} value={task.Full_Name}>{task.Full_Name}</option>
              ))}
            </select>
          </div>
        ) : (
          <p>Loading...</p>
        )}
        <button onClick={handleSubmit}>Submit</button>
        <button onClick={handleModalToggle}>Close</button>
      </Modal>
      {error ? (
        <p>Error: {error}</p>
      ) : responseData ? (
        <div className={styles.box}>
          <table className={styles.table}>
            <thead>
              <tr>
                <th>Name</th>
                <th>Email</th>
                <th>Username</th>
              </tr>
            </thead>
            <tbody>
              {responseData.tasks.map((task, index) => (
                <tr key={index}>
                  <td>{task.Full_Name}</td>
                  <td>{task.Email}</td>
                  <td>{task.Username}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
}
