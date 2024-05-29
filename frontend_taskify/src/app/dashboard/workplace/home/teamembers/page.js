// pages/team-members.js
'use client'
import { useEffect, useState } from 'react';
import axios from 'axios';

export default function TeamMembers() {
  const [teamMembers, setTeamMembers] = useState([]);

  useEffect(() => {
    const fetchTeamMembers = async () => {
      try {
        const response = await axios.get('/home/teamembers');
        setTeamMembers(response.data.data);
      } catch (error) {
        console.error('Error fetching team members:', error);
      }
    };

    fetchTeamMembers();
  }, []);

  return (
    <div>
      <h1>Team Members</h1>
      {teamMembers.length === 0 ? (
        <p>No team members found.</p>
      ) : (
        <ul>
          {teamMembers.map((member) => (
            <li key={member._id}>
              <p>Name: {member.name}</p>
              <p>Email: {member.email}</p>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
