import React from "react";
import { Link, Stack, Typography } from "@mui/material";
import { CaretLeft } from "phosphor-react";
import { Link as RouterLinks } from "react-router-dom";
import NewPasswordForm from "../../sections/auth/NewPasswordForm";

const NewPassword = () => {
  return (
    <>
      <Stack spacing={2} sx={{ mb: 5, position: "relative" }}>
        <Typography variant="h3" paragraph>
          Reset Password
        </Typography>

        <Typography sx={{ color: "text.secondary", mb: 5 }}>
          Please set your new password
        </Typography>
      </Stack>

      {/* NewPasswordForm */}
      <NewPasswordForm />

      <Link
        component={RouterLinks}
        to="/auth/login"
        color={"inherit"}
        variant="subtitle2"
        sx={{ mt: 3, mx: "auto", alignItems: "center", display: "inline-flex" }}
      >
        <CaretLeft size={24} />
        Return to Sign in
      </Link>
    </>
  );
};

export default NewPassword;
