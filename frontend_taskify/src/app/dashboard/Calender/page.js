import React, { useState } from "react";
import styles from "./page.module.css";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import { MdDelete } from "react-icons/md";

const CalendarComponent = () => {
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [events, setEvents] = useState([]);
  const [eventInput, setEventInput] = useState("");

  const handleDateChange = (date) => {
    setSelectedDate(date);
  };

  const handleEventInputChange = (e) => {
    setEventInput(e.target.value);
  };

  const handleAddEvent = () => {
    if (eventInput.trim() === "") return; // Don't add empty events

    // Create a new event object
    const newEvent = {
      date: selectedDate,
      description: eventInput,
    };

    // Add the new event to the events array
    setEvents([...events, newEvent]);

    // Clear the event input field
    setEventInput("");
  };

  const handleDeleteEvent = (index) => {
    // Remove the event at the specified index from the events array
    const updatedEvents = [...events];
    updatedEvents.splice(index, 1);
    setEvents(updatedEvents);
  };

  return (
    <div>
      <Calendar
        className={styles.calencon}
        onChange={handleDateChange}
        value={selectedDate}
      />
      <div>
        <input
          type="text"
          value={eventInput}
          className={styles.input}
          onChange={handleEventInputChange}
          placeholder="Add Events"
        />
        <button className={styles.btn} onClick={handleAddEvent}>
          + Event
        </button>
      </div>
      <div>
        {/* Rendering added events in a separate section */}
        <AddedEvents events={events} onDeleteEvent={handleDeleteEvent} />
      </div>
    </div>
  );
};

const AddedEvents = ({ events, onDeleteEvent }) => (
  <div>
    <h2>    Events:</h2>
    <ul>
      {events.map((event, index) => (
        <li key={index}>
          <strong>{event.date.toDateString()}:</strong> {event.description}
          <button onClick={() => onDeleteEvent(index)}><MdDelete /></button>
        </li>
      ))}
    </ul>
  </div>
);

export default CalendarComponent;
