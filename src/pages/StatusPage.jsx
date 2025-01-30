import React, { useState } from "react";
import { useSelector } from "react-redux";
import {
  Container,
  Typography,
  List,
  ListItem,
  ListItemText,
  Card,
  CardContent,
  Pagination,
  Box,
} from "@mui/material";

const StatusPage = () => {
  const users = useSelector((state) => state.waitlist.users); // Get users from Redux store
  const usersPerPage = 5; // Number of users per page
  const [page, setPage] = useState(1); // Current page state

  // Calculate the index range for users on the current page
  const startIndex = (page - 1) * usersPerPage;
  const currentPageUsers = users.slice(startIndex, startIndex + usersPerPage);

  const handlePageChange = (event, value) => {
    setPage(value);
  };

  return (
    <Container
      maxWidth="md"
      sx={{
        mt: 5,
        bgcolor: "background.paper",
        p: 3,
        borderRadius: 2,
        boxShadow: 2,
      }}
    >
      <Typography variant="h4" color="primary" gutterBottom>
        Current Waitlist
      </Typography>

      <List>
        {currentPageUsers.map((user, index) => (
          <Card key={index} sx={{ mb: 2 }}>
            <CardContent>
              <ListItem>
                <ListItemText
                  primary={`${user.name} (${
                    user.inviteCode ? "Invited" : "General"
                  })`}
                  secondary={`Position: ${
                    startIndex + index + 1
                  } | Estimated Wait Time: ${startIndex + index + 1} days`}
                />
              </ListItem>
            </CardContent>
          </Card>
        ))}
      </List>

      {/* Pagination Component */}
      <Box sx={{ display: "flex", justifyContent: "center", mt: 3 }}>
        <Pagination
          count={Math.ceil(users.length / usersPerPage)}
          page={page}
          onChange={handlePageChange}
          color="primary"
        />
      </Box>
    </Container>
  );
};

export default StatusPage;
