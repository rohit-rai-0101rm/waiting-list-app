import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import {
  Container,
  TextField,
  Button,
  Typography,
  Alert,
  List,
  ListItem,
  ListItemText,
  Card,
  CardContent,
} from "@mui/material";
import { faker } from "@faker-js/faker";
import { addUser } from "../redux/slices/waitlistSlice.js";

const inviteCodes = ["austin234", "alvin145", "karthik321"]; // Valid codes

const RegistrationPage = () => {
  const dispatch = useDispatch();
  const users = useSelector((state) => state.waitlist.users);
  const [name, setName] = useState("");
  const [inviteCode, setInviteCode] = useState("");
  const [message, setMessage] = useState("");

  useEffect(() => {
    const interval = setInterval(() => {
      const randomName = faker.person.fullName();
      const randomCode =
        Math.random() > 0.5
          ? inviteCodes[Math.floor(Math.random() * inviteCodes.length)]
          : "";
      dispatch(addUser({ name: randomName, inviteCode: randomCode }));
    }, 10000); // Add new user every 10 seconds

    return () => clearInterval(interval); // Cleanup on unmount
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

      <Typography variant="h6" sx={{ mt: 4 }}>
        Current Waitlist
      </Typography>
      <List>
        {users.map((user, index) => (
          <Card key={index} sx={{ mb: 2 }}>
            <CardContent>
              <ListItem>
                <ListItemText
                  primary={`${user.name} (${
                    user.inviteCode ? "Invited" : "General"
                  })`}
                  secondary={`Position: ${index + 1}`}
                />
              </ListItem>
            </CardContent>
          </Card>
        ))}
      </List>
    </Container>
  );
};

export default RegistrationPage;
