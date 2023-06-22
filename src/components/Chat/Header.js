import React from "react";
import {
  Avatar,
  Box,
  IconButton,
  Stack,
  Typography,
  Divider,
  Menu,
  Fade,
  MenuItem,
} from "@mui/material";
import { CaretDown, MagnifyingGlass, Phone, VideoCamera } from "phosphor-react";
import { faker } from "@faker-js/faker";
import StyledBadge from "../StyledBadge";
import { useTheme } from "@mui/material/styles";
import { ToggleSidebar } from "../../redux/slices/app";
import { useDispatch, useSelector } from "react-redux";
import useResponsive from "../../hooks/useResponsive";
import { StartAudioCall } from "../../redux/slices/audioCall";
import { StartVideoCall } from "../../redux/slices/videoCall";

const Conversation_Menu = [
  {
    title: "Contact info",
  },
  {
    title: "Mute notifications",
  },
  {
    title: "Clear message",
  },
  {
    title: "Delete chat",
  },
];
const user_id = window.localStorage.getItem("user_id");
const ChatHeader = () => {
  const theme = useTheme();
  const dispatch = useDispatch();
  const isMobile = useResponsive("between", "md", "xs", "sm");

  const { current_conversation } = useSelector(
    (state) => state.conversation.direct_chat
  );

  const [conversationMenuAnchorEl, setConversationMenuAnchorEl] =
    React.useState(null);
  const openConersationMenu = Boolean(conversationMenuAnchorEl);
  const handleClickConversationMenu = (event) => {
    setConversationMenuAnchorEl(event.currentTarget);
  };
  const handleCloseConversationMenu = () => {
    setConversationMenuAnchorEl(null);
  };
  return (
    <>
      <Box
        p={2}
        width={"100%"}
        sx={{
          backgroundColor:
            theme.palette.mode === "light"
              ? "#f8faff"
              : theme.palette.background.paper,
          boxShadow: "0px 0px 2px rgba(0,0,0, 0.25)",
        }}
      >
        <Stack
          alignItems={"center"}
          direction={"row"}
          justifyContent={"space-between"}
          sx={{ width: "100%", height: "100%" }}
        >
          <Stack
            onClick={() => {
              dispatch(ToggleSidebar());
            }}
            direction={"row"}
            spacing={2}
          >
            <Box>
              <StyledBadge
                overlap="circular"
                anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
                variant="dot"
              >
                <Avatar
                  alt={current_conversation?.name}
                  src={current_conversation?.img}
                />
              </StyledBadge>
            </Box>
            <Stack spacing={0.2}>
              <Typography variant="subtitle2">
                {current_conversation?.name}
              </Typography>
              <Typography variant="caption">Online</Typography>
            </Stack>
          </Stack>
          <Stack
            direction={"row"}
            alignItems={"center"}
            spacing={isMobile ? 1 : 3}
          >
            <IconButton
              onClick={() => {
                dispatch(StartVideoCall(current_conversation.user_id));
              }}
            >
              <VideoCamera />
            </IconButton>
            <IconButton
              onClick={() => {
                dispatch(StartAudioCall(current_conversation.user_id));
              }}
            >
              <Phone />
            </IconButton>
            {!isMobile && (
              <IconButton>
                <MagnifyingGlass />
              </IconButton>
            )}

            <Divider orientation="vertical" flexItem />
            <IconButton
              id="conversation-positioned-button"
              aria-controls={
                openConersationMenu ? "conversation-positioned-menu" : undefined
              }
              aria-haspopup="true"
              aria-expanded={openConersationMenu ? "true" : undefined}
              onClick={handleClickConversationMenu}
            >
              <CaretDown />
            </IconButton>
            <Menu
              MenuListProps={{
                "aria-labelledby": "fade-button",
              }}
              TransitionComponent={Fade}
              id="conversation-positioned-menu"
              aria-labelledby="conversation-positioned-button"
              anchorEl={conversationMenuAnchorEl}
              open={openConersationMenu}
              onClose={handleCloseConversationMenu}
              anchorOrigin={{
                vertical: "bottom",
                horizontal: "right",
              }}
              transformOrigin={{
                vertical: "top",
                horizontal: "right",
              }}
            >
              <Box p={1}>
                <Stack spacing={1}>
                  {Conversation_Menu.map((el) => (
                    <MenuItem key={el.title} onClick={handleCloseConversationMenu}>
                      <Stack
                        sx={{ minWidth: 100 }}
                        direction={"row"}
                        alignItems={"center"}
                        justifyContent={"space-between"}
                      >
                        <span>{el.title}</span>
                      </Stack>
                    </MenuItem>
                  ))}
                </Stack>
              </Box>
            </Menu>
          </Stack>
        </Stack>
      </Box>
    </>
  );
};

export default ChatHeader;
