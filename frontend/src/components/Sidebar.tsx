import {
  Box,
  Divider,
  useTheme,
  IconButton,
  Typography,
  ListItemIcon,
  ListItemText,
  ListItemButton,
  Tooltip,
  Fade,
} from "@mui/material";
import {
  HomeOutlined,
  TodayOutlined,
  PublicOutlined,
  Groups2Outlined,
  SettingsOutlined,
  PieChartOutlined,
  TrendingUpOutlined,
  ReceiptLongOutlined,
  PointOfSaleOutlined,
  ChevronRightOutlined,
  ShoppingCartOutlined,
  CalendarMonthOutlined,
  AdminPanelSettingsOutlined,
} from "@mui/icons-material";
import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import FlexBetween from "./FlexBetween";
import profileImage from "assets/profile.jpeg";
import { User } from "types";

import KeyboardDoubleArrowLeftIcon from "@mui/icons-material/KeyboardDoubleArrowLeft";
import KeyboardDoubleArrowRightIcon from "@mui/icons-material/KeyboardDoubleArrowRight";
import { Sidebar as ProSidebar, MenuItem, Menu } from "react-pro-sidebar";
import { visuallyHidden } from "@mui/utils";

const navItems = [
  {
    text: "Dashboard",
    icon: <HomeOutlined />,
  },
  {
    text: "Client Facing",
    icon: null,
  },
  {
    text: "Products",
    icon: <ShoppingCartOutlined />,
  },
  {
    text: "Customers",
    icon: <Groups2Outlined />,
  },
  {
    text: "Transactions",
    icon: <ReceiptLongOutlined />,
  },
  {
    text: "Geography",
    icon: <PublicOutlined />,
  },
  {
    text: "Sales",
    icon: null,
  },
  {
    text: "Overview",
    icon: <PointOfSaleOutlined />,
  },
  {
    text: "Daily",
    icon: <TodayOutlined />,
  },
  {
    text: "Monthly",
    icon: <CalendarMonthOutlined />,
  },
  {
    text: "Breakdown",
    icon: <PieChartOutlined />,
  },
  {
    text: "Management",
    icon: null,
  },
  {
    text: "Admin",
    icon: <AdminPanelSettingsOutlined />,
  },
  {
    text: "Performance",
    icon: <TrendingUpOutlined />,
  },
];

// Record<string, never> mean string object / "{}"
interface SidebarProps {
  user: User | Record<string, never>;
  isSidebarOpen: boolean;
  setIsSidebarOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

const Sidebar: React.FC<SidebarProps> = ({
  user,
  isSidebarOpen,
  setIsSidebarOpen,
}) => {
  const { pathname } = useLocation();
  const [active, setActive] = useState("");
  const navigate = useNavigate();
  const theme = useTheme();

  useEffect(() => {
    setActive(pathname.substring(1));
  }, [pathname]);

  return (
    <Box
      height="100%"
      position="sticky"
      top="0"
      sx={{
        width: {
          default: isSidebarOpen ? undefined : 0,
          sm: "unset",
        },
        zIndex: {
          default: "9999",
          sm: "unset",
        },
        "& .ps-sidebar-root": {
          border: "none",
          "& .ps-sidebar-container": {
            background: `${theme.palette.background.alt} !important`,
            height: "100vh",
            overflow: "hidden",
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-between",
            "& .ps-menu-button": {
              height: "unset !important",
            },
            "& .ps-menu-button:hover": {
              backgroundColor: "transparent",
            },
            "& .ps-menu-icon": {
              width: "100%",
              margin: 0,
            },
            "& .ps-menu-root": {
              "& ul": {
                position: "relative",
                overflowY: "auto",
                overflowX: "hidden",
              },
            },
          },
        },
      }}
    >
      <ProSidebar
        collapsed={!isSidebarOpen}
        style={{
          height: "100vh",
        }}
        toggled={isSidebarOpen}
        customBreakPoint="599px"
        onBackdropClick={() => setIsSidebarOpen(!isSidebarOpen)}
      >
        <Menu
          style={{
            flex: 1,
            overflowY: "auto",
          }}
        >
          {/* LOGO AND Left Arrow ICON */}
          <MenuItem
            icon={
              isSidebarOpen ? undefined : (
                <Tooltip
                  arrow
                  title={<Typography fontSize={14}>Open</Typography>}
                  placement="right"
                >
                  <IconButton onClick={() => setIsSidebarOpen(!isSidebarOpen)}>
                    <KeyboardDoubleArrowRightIcon />
                  </IconButton>
                </Tooltip>
              )
            }
            style={{
              padding: "1.5rem 0",
              color: theme.palette.secondary.main,
              cursor: "default",
            }}
          >
            <Fade in={isSidebarOpen} unmountOnExit>
              <Box
                display="flex"
                alignItems="center"
                justifyContent="space-between"
                gap="0.5rem"
                width="100%"
                px="1rem"
                position="relative"
              >
                <Typography
                  ml="2rem"
                  variant="h4"
                  fontWeight="bold"
                  display="inline"
                  sx={{
                    cursor: "text",
                  }}
                >
                  DashboardX
                </Typography>

                <IconButton onClick={() => setIsSidebarOpen(!isSidebarOpen)}>
                  <KeyboardDoubleArrowLeftIcon />
                </IconButton>
              </Box>
            </Fade>
            <Box sx={visuallyHidden}>Open Sidebar</Box>
          </MenuItem>

          <Divider sx={{ display: isSidebarOpen ? "none" : undefined }} />

          {navItems.map(({ text, icon }) => {
            if (!icon) {
              if (!isSidebarOpen) return <Divider />;
              return (
                <Typography key={text} sx={{ m: "2.25rem 0 1rem 3rem" }}>
                  {text}
                </Typography>
              );
            }
            const lcText = text.toLowerCase();

            return (
              <MenuItem
                key={text}
                icon={
                  isSidebarOpen ? undefined : (
                    <Tooltip
                      arrow
                      title={<Typography fontSize={14}>{text}</Typography>}
                      placement="right"
                    >
                      <IconButton
                        onClick={() => {
                          navigate(`/${lcText}`);
                          setActive(lcText);
                        }}
                        sx={{
                          backgroundColor:
                            active === lcText
                              ? theme.palette.secondary[300]
                              : "transparent",
                          color:
                            active === lcText
                              ? theme.palette.primary[600]
                              : theme.palette.secondary[100],
                          "&:hover *": {
                            color: theme.palette.secondary[100],
                          },
                        }}
                      >
                        {icon}
                      </IconButton>
                    </Tooltip>
                  )
                }
                style={{
                  color: theme.palette.secondary.main,
                  cursor: "default",
                  padding: "0",
                  margin: !isSidebarOpen ? "1rem" : undefined,
                }}
              >
                <Fade in={isSidebarOpen} unmountOnExit>
                  <ListItemButton
                    onClick={() => {
                      navigate(`/${lcText}`);
                      setActive(lcText);
                    }}
                    sx={{
                      backgroundColor:
                        active === lcText
                          ? theme.palette.secondary[300]
                          : "transparent",
                      color:
                        active === lcText
                          ? theme.palette.primary[600]
                          : theme.palette.secondary[100],
                      "&:hover *": {
                        color: theme.palette.secondary[100],
                      },
                    }}
                  >
                    <ListItemIcon
                      sx={{
                        ml: "2rem",
                        color:
                          active === lcText
                            ? theme.palette.primary[600]
                            : theme.palette.secondary[200],
                      }}
                    >
                      {icon}
                    </ListItemIcon>
                    <ListItemText primary={text} />
                    {active === lcText && (
                      <ChevronRightOutlined sx={{ mr: "0.5rem" }} />
                    )}
                  </ListItemButton>
                </Fade>
                <Box sx={visuallyHidden}>{lcText}</Box>
              </MenuItem>
            );
          })}
        </Menu>

        <Box
          sx={{
            width: "100%",
            paddingBottom: "2rem",
            backgroundColor: theme.palette.background.alt,
          }}
        >
          <Divider
            sx={{
              mb: "2rem",
            }}
          />
          <FlexBetween
            textTransform="none"
            gap="1rem"
            overflow={"hidden"}
            display="flex"
            width={"100%"}
            sx={{
              justifyContent: "center !important",
            }}
            px="1rem"
          >
            <Box
              component="img"
              alt="profile"
              src={profileImage}
              height="40px"
              width="40px"
              borderRadius="50%"
              sx={{
                objectFit: "cover",
                width: "40px",
                height: "40px",
                flexShrink: "0",
              }}
            />
            <Fade in={isSidebarOpen} unmountOnExit>
              <Box
                textAlign="left"
                sx={{
                  flexShrink: "1",
                  overflow: "hidden",
                  textOverflow: "ellipsis",
                  whiteSpace: "nowrap ",
                }}
              >
                <Typography
                  fontWeight="bold"
                  fontSize="0.9rem"
                  sx={{ color: theme.palette.secondary[100] }}
                >
                  {user.name}
                </Typography>
                <Typography
                  display="inline"
                  fontSize="0.8rem"
                  sx={{
                    color: theme.palette.secondary[200],
                  }}
                >
                  {user.occupation} skalsalksalkskal
                </Typography>
              </Box>
            </Fade>
            <Fade in={isSidebarOpen} unmountOnExit>
              <IconButton>
                <SettingsOutlined
                  sx={{
                    flexShrink: "0",
                    color: theme.palette.secondary[300],
                    fontSize: "25px ",
                    width: "25px",
                  }}
                />
              </IconButton>
            </Fade>
          </FlexBetween>
        </Box>
      </ProSidebar>
    </Box>
  );
};

export default Sidebar;
