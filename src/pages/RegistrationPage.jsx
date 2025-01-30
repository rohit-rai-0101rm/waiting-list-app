import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { Container, TextField, Button, Typography, Alert } from "@mui/material";
import { faker } from "@faker-js/faker";
import { useNavigate } from "react-router-dom"; // For navigation
import { addUser } from "../redux/slices/waitlistSlice.js";

const inviteCodes = ["austin234", "alvin145", "karthik321"]; // Valid codes

const RegistrationPage = () => {
  const dispatch = useDispatch();
  const [name, setName] = useState("");
  const [inviteCode, setInviteCode] = useState("");
  const [message, setMessage] = useState("");
  const navigate = useNavigate(); // Initialize the navigate function

  // Simulate real-time addition of users every 10 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      const randomName = faker.person.fullName();
      const randomCode =
        Math.random() > 0.5
          ? inviteCodes[Math.floor(Math.random() * inviteCodes.length)]
          : "";
      dispatch(addUser({ name: randomName, inviteCode: randomCode }));
    }, 10000);

    return () => clearInterval(interval);
  }, [dispatch]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!name) {
      setMessage("Name is required");
      return;
    }
    dispatch(addUser({ name, inviteCode }));
    setMessage(
      inviteCodes.includes(inviteCode)
        ? "Successfully added with invite code!"
        : "Added to general waitlist."
    );
    setName("");
    setInviteCode("");
  };

  const handleNavigateToWaitlist = () => {
    navigate("/status");
  };

  return (
    <Container
      maxWidth="sm"
      sx={{
        mt: 5,
        bgcolor: "background.paper",
        p: 3,
        borderRadius: 2,
        boxShadow: 2,
      }}
    >
      <Typography variant="h4" color="primary" gutterBottom>
        Join the Waitlist
      </Typography>

      {message && (
        <Alert severity={inviteCodes.includes(inviteCode) ? "success" : "info"}>
          {message}
        </Alert>
      )}

      <form onSubmit={handleSubmit}>
        <TextField
          fullWidth
          label="Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          margin="normal"
          required
        />
        <TextField
          fullWidth
          label="Invite Code (Optional)"
          value={inviteCode}
          onChange={(e) => setInviteCode(e.target.value)}
          margin="normal"
        />
        <Button
          type="submit"
          variant="contained"
          color="primary"
          fullWidth
          sx={{ mt: 2 }}
        >
          Join Waitlist
        </Button>
      </form>

      <Button
        variant="outlined"
        color="primary"
        fullWidth
        sx={{ mt: 3 }}
        onClick={handleNavigateToWaitlist} // Navigate to waitlist page
      >
        View Waitlist Status
      </Button>
    </Container>
  );
};

export default RegistrationPage;
