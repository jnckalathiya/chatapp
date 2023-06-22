import { Divider, IconButton, Stack } from "@mui/material";
import { GithubLogo, GoogleLogo, TwitterLogo } from "phosphor-react";
import React from "react";

const AuthSocial = () => {
  const handleGoogleLogin = async () => {};

  const handleGithubLogin = async () => {};

  const handleTwitterLogin = async () => {};

  return (
    <div>
      <Divider
        sx={{
          my: 2.5,
          typography: "overline",
          color: "text.disabled",
          "&::beforre, ::after": {
            borderTopStyle: "dashed",
          },
        }}
      >
        OR
      </Divider>
      <Stack direction={"row"} justifyContent={"center"} spacing={2}>
        <IconButton onClick={handleGoogleLogin}>
          <GoogleLogo color="#Df3e30" />
        </IconButton>
        <IconButton color="inherit" onClick={handleGithubLogin}>
          <GithubLogo />
        </IconButton>
        <IconButton onClick={handleTwitterLogin}>
          <TwitterLogo color="#1c9cea" />
        </IconButton>
      </Stack>
    </div>
  );
};

export default AuthSocial;
