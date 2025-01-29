import React, { useState } from "react";
import { TextField, Button, Typography } from "@mui/material";

const UserForm = ({ addUser }) => {
  const [name, setName] = useState("");
  const [inviteCode, setInviteCode] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    const validCodes = ["austin234", "alvin145", "karthik321"];
    const isValidCode = validCodes.includes(inviteCode);

    if (inviteCode && !isValidCode) {
      setErrorMessage(
        "Invalid invite code. You have been placed at the back of the general waitlist."
      );
      setInviteCode(""); // Use setInviteCode to clear the inviteCode state
    }

    // Proceed with adding the user (even if the inviteCode is invalid, it will be an empty string)
    addUser(name, inviteCode, isValidCode);
    setName(""); // Clear the name field after submission
    setInviteCode(""); // Clear the invite code field after submission
    setErrorMessage(""); // Clear the error message after submission
  };

  return (
    <form onSubmit={handleSubmit} style={{ maxWidth: "400px", margin: "auto" }}>
      <Typography variant="h4">Register for the Waiting List</Typography>
      <TextField
        label="Your Name"
        variant="outlined"
        fullWidth
        margin="normal"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />
      <TextField
        label="Invite Code (Optional)"
        variant="outlined"
        fullWidth
        margin="normal"
        value={inviteCode}
        onChange={(e) => setInviteCode(e.target.value)}
      />
      {errorMessage && <Typography color="error">{errorMessage}</Typography>}
      <Button variant="contained" color="primary" type="submit">
        Add to Waitlist
      </Button>
    </form>
  );
};
``;

export default UserForm;
