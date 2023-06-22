import React from "react";
import { Box, Stack, Typography } from "@mui/material";
import { useTheme } from "@mui/material/styles";

import { Link, useSearchParams } from "react-router-dom";
import ChatComponent from "./Conversation";
import Chats from "./Chats";
import Contact from "../../sections/Dashboard/Contact";
import NoChat from "../../assets/Illustration/NoChat";
import { useSelector } from "react-redux";
import Media from "../../sections/Dashboard/SharedMessages";
import StarredMessage from "../../sections/Dashboard/StarredMessages";

const GeneralApp = () => {
  const [searchParams] = useSearchParams();
  const theme = useTheme();
  const { sideBar, chat_type, room_id } = useSelector((state) => state.app);
  return (
    <Stack direction={"row"} sx={{ width: "100%" }}>
      {/* Chats */}
      <Chats />

      <Box
        sx={{
          height: "100%",
          width: sideBar ? "calc(100vw - 740px)" : "calc(100vw - 420px)",
          backgroundColor:
            theme.palette.mode === "light"
              ? "#fff"
              : theme.palette.background.paper,
          borderBottom:
            searchParams.get("type") === "individual-chat" &&
            searchParams.get("id")
              ? "0px"
              : "6px solid #0162C4",
        }}
      >
        {room_id !== null && chat_type === "individual" ? (
          <ChatComponent />
        ) : (
          <Stack
            spacing={2}
            sx={{ height: "100%", width: "100%" }}
            alignItems={"center"}
            justifyContent={"center"}
          >
            <NoChat />
            <Typography variant="subtitle2">
              Select a Conversation or start 
              <Link
                style={{
                  color: theme.palette.primary.main,
                  textDecoration: "none",
                }}
                to={"/"}
              >
                 new one
              </Link>
            </Typography>
          </Stack>
        )}
      </Box>
      {/* Contact */}
      {sideBar &&
        (() => {
          switch (sideBar.type) {
            case "CONTACT":
              return <Contact />;
            case "STARRED":
              return <StarredMessage />;
            case "SHARED":
              return <Media />;

            default:
              break;
          }
        })()}
    </Stack>
  );
};

export default GeneralApp;
