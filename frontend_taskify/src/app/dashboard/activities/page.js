"use client";
import styles from "./page.module.css";
import { useState, useEffect } from "react";
import { BsThreeDots } from "react-icons/bs";
import { useRouter } from 'next/navigation';
import Modal from 'react-modal'; // Import react-modal
import { AiOutlineDelete } from 'react-icons/ai';
import axios from "/home/ayush/Documents/GitHub/taskifyrs/frontend_taskify/src/app/axiosSetup"; // Import axios setup file
Modal.setAppElement('#root'); // Set the app element for react-modal

export default function Activities() {
  const [tasks, setTasks] = useState({ todo: [], inProgress: [], completed: [] });
  const [error, setError] = useState(null);
  const [draggedTask, setDraggedTask] = useState(null);
  const [showDropdown, setShowDropdown] = useState(false);
  const [selectedTask, setSelectedTask] = useState(null);
  const [status, setStatus] = useState('To Do'); // Default status

  const router = useRouter();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const token = localStorage.getItem('token');
        if (!token) {
          throw new Error('Authentication token not found');
        }

        const response = await fetch('http://localhost:8080/see_tasks', {
          method: 'GET',
          headers: {
            'Authorization': `Bearer ${token}`
          }
        });

        if (!response.ok) {
          throw new Error('Failed to fetch data');
        }

        const data = await response.json();
        console.log("Fetched data:", data);

        if (!data.tasks || !Array.isArray(data.tasks)) {
          throw new Error('Invalid data format');
        }

        const categorizedTasks = {
          todo: [],
          inProgress: [],
          completed: []
        };

        data.tasks.forEach(task => {
          if (task.status === 'To Do') {
            categorizedTasks.todo.push(task);
          } else if (task.status === 'In Progress') {
            categorizedTasks.inProgress.push(task);
          } else if (task.status === 'Completed') {
            categorizedTasks.completed.push(task);
          }
        });

        setTasks(categorizedTasks);
      } catch (error) {
        console.error('Error fetching data:', error);
        setError(error.message);
      }
    };

    fetchData();
  }, []);

  const handleActivitiesClick = () => {
    setShowDropdown(!showDropdown);
  };

  const handleAddTaskClick = () => {
    router.push('/dashboard/addtask');
    setShowDropdown(false);
  };

  const handleTaskClick = (task) => {
    console.log(task);
    setSelectedTask(task); // Set selected task to show details in modal
  };

  const closeModal = () => {
    setSelectedTask(null); // Close modal by setting selected task to null
  };

  const handleDragStart = (task, category) => () => {
    setDraggedTask({ ...task, category });
  };

  const handleDragOver = (e) => {
    e.preventDefault();
  };

  const handleDrop = (newCategory) => async (e) => {
    e.preventDefault();
    if (draggedTask) {
      const { category: oldCategory, ...task } = draggedTask;

      const statusMap = {
        todo: 'To Do',
        inProgress: 'In Progress',
        completed: 'Completed'
      };

      if (!statusMap[newCategory]) {
        console.error(`Unknown category: ${newCategory}`);
        return;
      }

      setTasks(prevTasks => {
        const newTasks = { ...prevTasks };
        newTasks[oldCategory] = newTasks[oldCategory].filter(t => t.id !== task.id);
        if (!newTasks[newCategory]) {
          newTasks[newCategory] = [];
        }
        newTasks[newCategory].push(task);
        return newTasks;
      });

      await updateTaskStatus(task.id, statusMap[newCategory]);

      setDraggedTask(null);
    }
  };

  function updateTaskStatus(taskId, newStatus) {
    const token = localStorage.getItem('token');
    if (!token) {
      alert('Authentication token not found');
      return;
    }
  
    const payload = JSON.stringify({ tasks_id: taskId, status: newStatus });
    console.log('Updating task status with payload:', payload);
  
    axios
      .post('http://localhost:8080/update_status', payload, {
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        }
      })
      .then((response) => {
        console.log(`Task ${taskId} status updated to ${newStatus}`);
        router.push('/dashboard/activities');
      })
      .catch((error) => {
        if (error.response && error.response.data && error.response.data.error) {
          alert(error.response.data.error); // Show alert for error message from backend
        } else {
          alert('Failed to update task status'); // Generic error alert
        }
      });
  }
  
  function deleteTask(taskId) {
    const token = localStorage.getItem('token');
    if (!token) {
      alert('Authentication token not found');
      return;
    }
  
   const payload = JSON.stringify({ tasks_id: taskId });
    console.log('Deleting task with payload:', payload);
  
    axios
      .post('http://localhost:8080/delete_tasks', payload, {
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        }
      })
      .then((response) => {
        console.log(`Task ${taskId} deleted successfully`);
        router.push('/dashboard/activities');
        setSelectedTask(null); // Close the modal after deletion

      })
      .catch((error) => {
        if (error.response && error.response.data && error.response.data.error) {
          alert(error.response.data.error); // Show alert for error message from backend
        } else {
          alert('Failed to delete task'); // Generic error alert
        }
      });
  }
  
  

  return (
    <div>
      <div className={styles.test}>
        Activities
        <span className={styles.dots} onClick={handleActivitiesClick}><BsThreeDots /></span>
        {showDropdown && (
          <button onClick={handleAddTaskClick} className={styles.dropdownBtn}>Add Task</button>
        )}
      </div>
      <div className={styles.gridcontainer}>
        <div className={styles.flexcontainer}>
          <div className={styles.title2}>To do</div>
          <div className={styles.content} id="todo" onDragOver={handleDragOver} onDrop={handleDrop('todo')}>
            {tasks.todo.map((task, index) => (
              <button key={index} className={styles.button} draggable="true" onDragStart={handleDragStart(task, 'todo')} onClick={() => handleTaskClick(task)}>
                {task.title}
                <br />
                {task.date}
              </button>
            ))}
          </div>
        </div>
        <div className={styles.flexcontainer}>
          <div className={styles.title2}>In progress</div>
          <div className={styles.content} id="progress" onDragOver={handleDragOver} onDrop={handleDrop('inProgress')}>
            {tasks.inProgress.map((task, index) => (
              <button key={index} className={styles.button} draggable="true" onDragStart={handleDragStart(task, 'inProgress')} onClick={() => handleTaskClick(task)}>
                {task.title}
                <br />
                {task.date}
              </button>
            ))}
          </div>
        </div>
        <div className={styles.flexcontainer}>
          <div className={styles.title2}>Completed</div>
          <div className={styles.content} id="completed" onDragOver={handleDragOver} onDrop={handleDrop('completed')}>
            {tasks.completed.map((task, index) => (
              <button key={index} className={styles.button} draggable="true" onDragStart={handleDragStart(task, 'completed')} onClick={() => handleTaskClick(task)}>
                {task.title}
                <br />
                {task.date}
              </button>
            ))}
          </div>
        </div>
      </div>

      {selectedTask && (
        <Modal
          isOpen={true}
          onRequestClose={closeModal}
          contentLabel="Task Details"
          style={{
            content: {
              position: 'absolute',
              top: '50%',
              left: '50%',
              transform: 'translate(-50%, -50%)',
              backgroundColor: 'white',
              padding: '20px',
              borderRadius: '10px',
              boxShadow: '0 5px 15px rgba(0, 0, 0, 0.3)',
              width: '80%',
              maxWidth: '450px',
              textAlign: 'center'
            },
            overlay: {
              position: 'fixed',
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
              backgroundColor: 'rgba(0, 0, 0, 0.5)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center'
            }
          }}
        >
          <h2>{selectedTask.title}</h2>
          <p>Description:  {selectedTask.description}</p>
          <p>Date: {selectedTask.date}</p>
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
          </select>  <br/>   <br/>  <br/>
          <button onClick={() => { closeModal(); updateTaskStatus(selectedTask.id, status); }} style={{            backgroundColor: '#007bff',
            color: 'white',
            border: 'none',
            padding: '10px 20px',
            borderRadius: '5px',
            cursor: 'pointer',
            marginRight: '10px'
          }}>Close</button>
          <button onClick={() => {deleteTask(selectedTask.id); console.log(selectedTask.id)}} style={{
            backgroundColor: '#dc3545',
            color: 'white',
            border: 'none',
            padding: '10px 20px',
            borderRadius: '5px',
            cursor: 'pointer'
          }}><AiOutlineDelete /> Delete Task</button>
        </Modal>
      )}
    </div>
  );
}
