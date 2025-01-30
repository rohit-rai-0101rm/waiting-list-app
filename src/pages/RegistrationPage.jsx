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
  const [randomUserMessage, setRandomUserMessage] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const interval = setInterval(() => {
      const randomName = faker.person.fullName();
      const randomCode =
        Math.random() > 0.5
          ? inviteCodes[Math.floor(Math.random() * inviteCodes.length)]
          : "";

      setLoading(true);
      dispatch(addUser({ name: randomName, inviteCode: randomCode }));
      setLoading(false);

      const randomMessage = inviteCodes.includes(randomCode)
        ? `New user added with valid invite code: ${randomCode}`
        : "New user added to the general waitlist.";
      setRandomUserMessage(randomMessage);

      setTimeout(() => {
        setRandomUserMessage("");
      }, 3000);
    }, 10000);

    return () => clearInterval(interval);
  }, [dispatch]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!name) {
      setMessage("Name is required");
      return;
    }

    setLoading(true);
    dispatch(addUser({ name, inviteCode }));
    setMessage(
      inviteCodes.includes(inviteCode)
        ? "Successfully added with invite code!"
        : "Added to general waitlist."
    );
    setLoading(false);

    setName("");
    setInviteCode("");

    setTimeout(() => {
      setMessage("");
    }, 3000);
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
          disabled={loading}
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
