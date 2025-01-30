import React, { useState } from "react";
import UserForm from "../components/UserForm";
import { useDispatch } from "react-redux";

import { useNavigate } from "react-router-dom";
import { addUser } from "../redux/slices/waitlistSlice.js";

const RegistrationPage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleAddUser = (name, inviteCode) => {
    dispatch(addUser({ name, inviteCode }));
  };

  return (
    <div>
      <UserForm addUser={handleAddUser} />
      <button onClick={() => navigate("/status")}>View Waitlist Status</button>
    </div>
  );
};

export default RegistrationPage;
