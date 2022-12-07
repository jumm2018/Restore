import {
  Alert,
  AlertTitle,
  Button,
  ButtonGroup,
  Container,
  List,
  ListItem,
  ListItemText,
  Typography,
} from "@mui/material";
import React, { useState } from "react";
import agent from "../../api/agent";

const AboutPage = () => {
  const [validationErrors, setValidationErrors] = useState<string[]>([]);
  const getValidationError = () => {
    agent.testErrors
      .getValidationError()
      .then(() => console.log("shold not see this"))
      .catch((error) => setValidationErrors(error));
  };
  return (
    <Container>
      <Typography gutterBottom variant="h2">
        Error for testing purposes
      </Typography>
      <ButtonGroup fullWidth>
        <Button
          variant="contained"
          onClick={() =>
            agent.testErrors.get400Error().catch((error) => console.log(error))
          }
        >
          {" "}
          Test 400 error
        </Button>
        <Button
          variant="contained"
          onClick={() =>
            agent.testErrors.get401Error().catch((error) => console.log(error))
          }
        >
          {" "}
          Test 401 error
        </Button>
        <Button
          variant="contained"
          onClick={() =>
            agent.testErrors.get404Error().catch((error) => console.log(error))
          }
        >
          {" "}
          Test 404 error
        </Button>
        <Button
          variant="contained"
          onClick={() =>
            agent.testErrors.get500Error().catch((error) => console.log(error))
          }
        >
          {" "}
          Test 500 error
        </Button>
        <Button
          variant="contained"
          onClick={getValidationError}
        >
          {" "}
          Validation error
        </Button>
      </ButtonGroup>
      {validationErrors.length > 0 && (
        <Alert severity="error">
          <AlertTitle>Validation Errors</AlertTitle>
          <List>
            {validationErrors.map((error) => (
              <ListItem key={error}>
                <ListItemText>{error}</ListItemText>
              </ListItem>
            ))}
          </List>
        </Alert>
      )}
    </Container>
  );
};

export default AboutPage;
