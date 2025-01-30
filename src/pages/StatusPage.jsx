import React, { useState, useEffect } from "react";
import { Typography, List, ListItem, ListItemText } from "@mui/material";

const StatusPage = () => {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    const storedUsers = localStorage.getItem("waitingList");
    if (storedUsers) {
      setUsers(JSON.parse(storedUsers));
    }
  }, []);

  return (
    <div style={{ padding: "20px" }}>
      <Typography variant="h4">Current Waiting List</Typography>
      <List>
        {users.map((user, index) => (
          <ListItem key={user.id}>
            <ListItemText
              primary={`${user.name} (${
                user.isInvited ? "Invited" : "General"
              })`}
              secondary={`Position: ${index + 1}, Estimated Wait: ${
                index + 1
              } day(s)`}
            />
          </ListItem>
        ))}
      </List>
    </div>
  );
};

export default StatusPage;
