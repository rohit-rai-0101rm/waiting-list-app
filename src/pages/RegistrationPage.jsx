import React, { useState } from "react";
import UserForm from "../components/UserForm";
import { useNavigate } from "react-router-dom";

const RegistrationPage = () => {
  const [users, setUsers] = useState([]);
  const navigate = useNavigate();

  const addUser = (name, inviteCode, isValidCode) => {
    const newUser = {
      id: name + Math.random().toString(36).substr(2, 9),
      name,
      inviteCode,
      position: isValidCode
        ? users.filter((user) => user.inviteCode).length + 1
        : users.length + 1,
      isInvited: isValidCode,
    };

    setUsers([...users, newUser]);
  };

  const handleViewStatus = () => {
    navigate("/status", { state: { users } });
  };

  return (
    <div>
      <UserForm addUser={addUser} />
      <button onClick={handleViewStatus}>View Waitlist Status</button>
    </div>
  );
};

export default RegistrationPage;
