import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import {
  Container,
  TextField,
  Button,
  Typography,
  Alert,
  CircularProgress,
} from "@mui/material";
import { faker } from "@faker-js/faker";
import { useNavigate } from "react-router-dom";
import { addUser } from "../redux/slices/waitlistSlice.js";

const inviteCodes = ["austin234", "alvin145", "karthik321"];

const RegistrationPage = () => {
  const dispatch = useDispatch();
  const [name, setName] = useState("");
  const [inviteCode, setInviteCode] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const [randomUserMessage, setRandomUserMessage] = useState(""); // New state for random user alert
  const navigate = useNavigate();

  // Automatically add random users every 10 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      const randomName = faker.person.fullName();
      const randomCode =
        Math.random() > 0.5
          ? inviteCodes[Math.floor(Math.random() * inviteCodes.length)]
          : "";

      // Dispatch the user and set loading
      setLoading(true);
      dispatch(addUser({ name: randomName, inviteCode: randomCode }));
      setLoading(false);

      // Show an alert for the random user addition
      const randomMessage = inviteCodes.includes(randomCode)
        ? `New user added with valid invite code: ${randomCode}`
        : "New user added to the general waitlist.";
      setRandomUserMessage(randomMessage);
    }, 10000); // Run every 10 seconds

    return () => clearInterval(interval); // Clean up on unmount
  }, [dispatch]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!name) {
      setMessage("Name is required");
      return;
    }

    // Set loading as true while adding a user
    setLoading(true);
    dispatch(addUser({ name, inviteCode }));
    setMessage(
      inviteCodes.includes(inviteCode)
        ? "Successfully added with invite code!"
        : "Added to general waitlist."
    );
    setLoading(false); // Set loading to false after dispatching the user

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

      {/* Display message on form submission */}
      {message && (
        <Alert severity={inviteCodes.includes(inviteCode) ? "success" : "info"}>
          {message}
        </Alert>
      )}

      {/* Display random user addition message */}
      {randomUserMessage && <Alert severity="info">{randomUserMessage}</Alert>}

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
          disabled={loading} // Disable button while loading
        >
          {loading ? (
            <CircularProgress size={24} color="secondary" />
          ) : (
            "Join Waitlist"
          )}
        </Button>
      </form>

      <Button
        variant="outlined"
        color="primary"
        fullWidth
        sx={{ mt: 3 }}
        onClick={handleNavigateToWaitlist}
      >
        View Waitlist Status
      </Button>
    </Container>
  );
};

export default RegistrationPage;
