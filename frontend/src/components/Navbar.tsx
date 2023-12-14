import React, { useState } from "react";
import {
  LightModeOutlined,
  DarkModeOutlined,
  Menu as MenuIcon,
  Search,
  SettingsOutlined,
  ArrowDropDownOutlined,
} from "@mui/icons-material";
import FlexBetween from "components/FlexBetween";
import profileImage from "assets/profile.jpeg";
import {
  AppBar,
  Button,
  Box,
  Typography,
  IconButton,
  InputBase,
  Toolbar,
  Menu,
  MenuItem,
  useTheme,
} from "@mui/material";
import { useAppDispatch } from "store/hooks";
import { User } from "types";
import { asyncToggleTheme } from "store/global";

interface NavbarProps {
  user: User | Record<string, never>;
  isSidebarOpen: boolean;
  setIsSidebarOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

type AnchorEl = (EventTarget & HTMLButtonElement) | null;

const Navbar: React.FC<NavbarProps> = ({
  user,
  isSidebarOpen,
  setIsSidebarOpen,
}) => {
  const dispatch = useAppDispatch();
  const theme = useTheme();

  const [anchorEl, setAnchorEl] = useState<AnchorEl>(null);
  const isOpen = Boolean(anchorEl);
  const handleClick = (
    event: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => setAnchorEl(null);

  return (
    <AppBar
      sx={{
        position: "static",
        background: "none",
        boxShadow: "none",
      }}
    >
      <Toolbar
        sx={{
          justifyContent: "space-between",
          alignItems: "center",
          gap: {
            default: "0.5rem",
            sm: "1rem",
          },
          px: {
            default: "16px",
            sm: "32px",
          },
        }}
      >
        {/* LEFT SIDE */}
        <FlexBetween
          sx={{
            gap: {
              default: "0.5rem",
              sm: "1rem",
            },
          }}
        >
          <IconButton
            sx={{
              display: {
                sm: "none",
                width: "contents",
                height: "contents",
                flexShrink: "none",
              },
            }}
            onClick={() => setIsSidebarOpen(!isSidebarOpen)}
          >
            <MenuIcon sx={{ fontSize: "25px" }} />
          </IconButton>
          <FlexBetween
            style={{
              backgroundColor: theme.palette.background.alt,
            }}
            borderRadius="9px"
            gap="1rem"
            p="0.1rem 1rem"
          >
            <InputBase placeholder="Search..." />
            <IconButton>
              <Search />
            </IconButton>
          </FlexBetween>
        </FlexBetween>

        {/* RIGHT SIDE */}
        <FlexBetween
          sx={{
            gap: {
              default: "0.5rem",
              sm: "1rem",
            },
          }}
        >
          <IconButton onClick={() => dispatch(asyncToggleTheme())}>
            {theme.palette.mode === "dark" ? (
              <DarkModeOutlined sx={{ fontSize: "25px" }} />
            ) : (
              <LightModeOutlined sx={{ fontSize: "25px" }} />
            )}
          </IconButton>

          <IconButton
            sx={{
              display: {
                sm: "none",
                md: "block",
              },
            }}
          >
            <SettingsOutlined sx={{ fontSize: "25px" }} />
          </IconButton>

          <FlexBetween
            sx={{
              display: {
                default: "none",
                lg: "block",
              },
            }}
          >
            <Button
              onClick={handleClick}
              sx={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                textTransform: "none",
                gap: "1rem",
              }}
            >
              <Box
                component="img"
                alt="profile"
                src={profileImage}
                height="32px"
                width="32px"
                borderRadius="50%"
                sx={{ objectFit: "cover" }}
              />
              <Box textAlign="left">
                <Typography
                  fontWeight="bold"
                  fontSize="0.85rem"
                  sx={{ color: theme.palette.secondary[100] }}
                >
                  {user.name}
                </Typography>
                <Typography
                  fontSize="0.75rem"
                  sx={{ color: theme.palette.secondary[200] }}
                >
                  {user.occupation}
                </Typography>
              </Box>
              <ArrowDropDownOutlined
                sx={{ color: theme.palette.secondary[300], fontSize: "25px" }}
              />
            </Button>
            <Menu
              anchorEl={anchorEl}
              open={isOpen}
              onClose={handleClose}
              anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
            >
              <MenuItem onClick={handleClose}>Log Out</MenuItem>
            </Menu>
          </FlexBetween>
        </FlexBetween>
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;
