import React, { useState, useEffect } from "react";
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
  CircularProgress,
} from "@mui/material";

const StatusPage = () => {
  const users = useSelector((state) => state.waitlist.users);
  const usersPerPage = 5;
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);

  const startIndex = (page - 1) * usersPerPage;
  const currentPageUsers = users.slice(startIndex, startIndex + usersPerPage);

  const estimatedWaitTime = (index) => {
    return `${index + 1} day${index + 1 > 1 ? "s" : ""}`;
  };

  const handlePageChange = (event, value) => {
    setPage(value);
  };

  useEffect(() => {
    setLoading(false); // Stop loading when the list is ready
  }, [users]);

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

      {loading ? (
        <Box sx={{ display: "flex", justifyContent: "center", mt: 5 }}>
          <CircularProgress color="secondary" />
        </Box>
      ) : (
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
                    } | Estimated Wait Time: ${estimatedWaitTime(
                      startIndex + index
                    )}`}
                  />
                </ListItem>
              </CardContent>
            </Card>
          ))}
        </List>
      )}

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
