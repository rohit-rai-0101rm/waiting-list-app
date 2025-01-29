import React from "react";
import { Typography, List, ListItem, ListItemText } from "@mui/material";
import { useLocation } from "react-router-dom";

const StatusPage = () => {
  const { state } = useLocation();
  const { users } = state;

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
              secondary={`Position: ${user.position}, Estimated Wait: ${user.position} day(s)`}
            />
          </ListItem>
        ))}
      </List>
    </div>
  );
};

export default StatusPage;
