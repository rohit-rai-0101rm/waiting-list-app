import React, { useState, useEffect } from "react";
import UserForm from "../components/UserForm";
import { useNavigate } from "react-router-dom";

const validInviteCodes = ["austin234", "alvin145", "karthik321"];

const RegistrationPage = () => {
  const navigate = useNavigate();

  // Load users from localStorage
  const [users, setUsers] = useState(() => {
    const storedUsers = localStorage.getItem("waitingList");
    return storedUsers ? JSON.parse(storedUsers) : [];
  });

  const addUser = (name, inviteCode) => {
    const isValidCode = validInviteCodes.includes(inviteCode);

    const newUser = {
      id: name + Math.random().toString(36).substr(2, 9),
      name,
      inviteCode: isValidCode ? inviteCode : null, // Store only valid codes
      isInvited: isValidCode,
    };

    // Separate invited and general users
    const invitedUsers = users.filter((user) => user.isInvited);
    const generalUsers = users.filter((user) => !user.isInvited);

    // Add user to the correct list
    if (isValidCode) {
      invitedUsers.push(newUser);
    } else {
      generalUsers.push(newUser);
    }

    // Merge both lists (invited first, general second)
    const updatedUsers = [...invitedUsers, ...generalUsers];

    setUsers(updatedUsers);
    localStorage.setItem("waitingList", JSON.stringify(updatedUsers));
  };

  return (
    <div>
      <UserForm addUser={addUser} />
      <button onClick={() => navigate("/status")}>View Waitlist Status</button>
    </div>
  );
};

export default RegistrationPage;
