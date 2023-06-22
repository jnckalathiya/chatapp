import React from "react";
import { Link as RouterLink } from "react-router-dom";
import { Link, Stack, Typography } from "@mui/material";
import RegisterFrom from "../../sections/auth/RegisterFrom";
import AuthSocial from "../../sections/auth/AuthSocial";

const register = () => {
  return (
    <>
      <Stack spacing={2} sx={{ mb: 5, position: "relative" }}>
        <Typography variant="h4">Get Started with Tawk</Typography>

        <Stack direction={"row"} spacing={0.5}>
          <Typography variant="body2">Already have an account?</Typography>
          <Link component={RouterLink} to="/auth/login" variant="subtitle2">
            Sign in
          </Link>
        </Stack>
        {/* Register Form */}
        <RegisterFrom />
        <Typography
          component={"div"}
          sx={{
            color: "text.secondary",
            mt: 3,
            typography: "caption",
            textAlign: "center",
          }}
        >
          {"By signing up, i agree to "}
          <Link underline="always" color="text.primary">
            Terms of service
          </Link>
          {" and "}
          <Link underline="always" color="text.primary">
            Privacy Policy
          </Link>
          .
        </Typography>
        <AuthSocial />
      </Stack>
    </>
  );
};

export default register;
