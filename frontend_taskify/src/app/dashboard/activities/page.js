"use client"
import styles from "./page.module.css";
import { useEffect } from "react";

import { BsThreeDots } from "react-icons/bs";
const todobox=[
  {ttile:"Nike a " ,date:"21 march"},
  {ttile:"Nike v " ,date:"21 march"},
  {ttile:"Nike b " ,date:"21 march"},
  {ttile:"Nike d " ,date:"21 march"},
 
]
const ongoingbox=[
  {ttile:"Nike 1 " ,date:"21 march"},
  {ttile:"Nike 2 " ,date:"21 march"},

 
]
const completedbox=[
  {ttile:"Nike 6 " ,date:"21 march"},
 
 
]
export default function Activities() {
  
 
  useEffect(() => {
    const todo = document.getElementById("todo");
    const progress = document.getElementById("progress");
    const completed = document.getElementById("completed");

    const buttons = document.getElementsByTagName("button");
    let selected = null;

    const handleDragStart = (e) => {
      selected = e.target;
    };

    const handleDragOver = (e) => {
      e.preventDefault();
    };

    const handleDrop = (container) => (e) => {
      e.preventDefault();
      if (selected && container) {
        container.appendChild(selected);
        selected = null;
      }
    };

    // Add event listeners to buttons
    for (const button of buttons) {
        button.addEventListener("dragstart", handleDragStart);
      }
    // Add event listeners to containers
    if (todo) {
      todo.addEventListener("dragover", handleDragOver);
      todo.addEventListener("drop", handleDrop(todo));
    }

    if (progress) {
      progress.addEventListener("dragover", handleDragOver);
      progress.addEventListener("drop", handleDrop(progress));
    }
    if (completed) {
      completed.addEventListener("dragover", handleDragOver);
      completed.addEventListener("drop", handleDrop(completed));
    }


    // Cleanup event listeners on unmount
    return () => {
        for (const button of buttons) {
            button.addEventListener("dragstart", handleDragStart);
          }

      if (todo) {
        todo.removeEventListener("dragover", handleDragOver);
        todo.removeEventListener("drop", handleDrop(todo));
      }

      if (progress) {
        progress.removeEventListener("dragover", handleDragOver);
        progress.removeEventListener("drop", handleDrop(progress));
      }
      if (completed) {
        completed.removeEventListener("dragover", handleDragOver);
        completed.removeEventListener("drop", handleDrop(completed));
      }
    };
  }, []);
 
  return(
    <div>
      <div className={styles.test}>
        Activities
      <span className={styles.dots}><BsThreeDots /></span>
      </div>
      <div className={styles.gridcontainer}>
            <div className={styles.flexcontainer}>
                <div className={styles.title2}>To do
     
                </div>
                <div 
                className={styles.content} 
                id="todo"
                >
                    
                        
                        {todobox.map((boox,index)  =>(
                          <button 
                          className={styles.button} 
                         draggable="true"
                          >
                              {boox.ttile}
                          <br />
                          {boox.date}
                          </button>
                           
                        ))}


                    </div>

            </div>
            <div className={styles.flexcontainer}>
                <div className={styles.title2}>In progress
   
                
                </div>
                <div 
                className={styles.content}
                id="progress"
                >
                          
                {ongoingbox.map((boox,index)  =>(
                          <button 
                          className={styles.button}
                          draggable="true"
                          >  
                          {boox.ttile}
                          <br />
                          {boox.date}
                          </button>
                           
                        ))}


                    </div>

            </div>
            <div className={styles.flexcontainer}>
                <div className={styles.title2}>Completed
   
                </div>
                <div 
                className={styles.content} 
                id="completed"
                >
                          
                        {completedbox.map((boox,index)  =>(
                          <button 
                          draggable="true"
                          className={styles.button}
                          > 
                           {boox.ttile}
                          <br />
                          {boox.date}
                          </button>
                           
                        ))}


                    </div>

            </div>
          
      </div>
      </div>
    )
  }