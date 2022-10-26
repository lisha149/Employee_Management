import React from "react";
import Alert from "@mui/material/Alert";
import AlertTitle from "@mui/material/AlertTitle";
import { Stack } from "@mui/material";

const Error = ({ children }) => {
  return (
    <Stack sx={{ width: "100%" }} spacing={2}>
      <Alert severity="error" style={{ fontSize: 20 }}>
        <AlertTitle>Error</AlertTitle>
        <strong>{children}</strong>
      </Alert>
    </Stack>
  );
};

export default Error;
