import { Paper, Typography } from "@mui/material";
import { Container } from "@mui/system";
import React from "react";

const ServerError = () => {
  return (
    <Container component={Paper}>
      <Typography variant="h5" gutterBottom>
        Server error
      </Typography>
    </Container>
  );
};

export default ServerError;
