import * as React from "react";
import { styled } from "@mui/material/styles";
import type { CSSObject, Theme } from "@mui/material/styles";
import Box from "@mui/material/Box";
import MuiDrawer from "@mui/material/Drawer";
import List from "@mui/material/List";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import ChatIcon from "@mui/icons-material/Chat";
import CallIcon from "@mui/icons-material/Call";
import SettingsIcon from "@mui/icons-material/Settings";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import DonutLargeIcon from "@mui/icons-material/DonutLarge";
import Badge from "@mui/material/Badge";
import Tooltip from "@mui/material/Tooltip";
import { getUserDetails } from "../../redux/authSlice";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { logoutUser } from "../../redux/authSlice";
import LogoutIcon from "@mui/icons-material/Logout";

const drawerWidth = 200;

const openedMixin = (theme: Theme): CSSObject => ({
  width: drawerWidth,
  transition: theme.transitions.create("width", {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.enteringScreen,
  }),
  overflowX: "hidden",
});

const closedMixin = (theme: Theme): CSSObject => ({
  transition: theme.transitions.create("width", {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  overflowX: "hidden",
  width: `calc(${theme.spacing(7)} + 1px)`,
  [theme.breakpoints.up("sm")]: {
    width: `calc(${theme.spacing(8)} + 1px)`,
  },
});

const DrawerHeader = styled("div")(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  justifyContent: "flex-end",
  padding: theme.spacing(0, 1),
  // necessary for content to be below app bar
  ...theme.mixins.toolbar,
}));

const Drawer = styled(MuiDrawer, {
  shouldForwardProp: (prop) => prop !== "open",
})(({ theme }) => ({
  width: drawerWidth,
  flexShrink: 0,
  whiteSpace: "nowrap",
  zIndex: 1,
  boxSizing: "border-box",
  "& .MuiDrawer-paper": {
    backgroundColor: "#f0f0f0", // gray background here
    color: "#000", // optional text color
  },
  variants: [
    {
      props: ({ open }) => open,
      style: {
        ...openedMixin(theme),
        "& .MuiDrawer-paper": openedMixin(theme),
      },
    },
    {
      props: ({ open }) => !open,
      style: {
        ...closedMixin(theme),
        "& .MuiDrawer-paper": closedMixin(theme),
      },
    },
  ],
}));

export default function Sidebar() {
  const [open, setOpen] = React.useState(false);

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

  const dispatch = useDispatch<any>();

  const user = useSelector((state: any) => state.auth.user);
  useEffect(() => {
    dispatch(getUserDetails());
  }, [dispatch]);

  const handleLogout = () => {
    dispatch(logoutUser());
  };

  return (
    <Box sx={{ display: "flex" }}>
      <Drawer variant="permanent" open={open} sx={{ zIndex: 100 }}>
        <DrawerHeader>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            onClick={open ? handleDrawerClose : handleDrawerOpen}
            edge="start"
          >
            <MenuIcon />
          </IconButton>
        </DrawerHeader>

        <List>
          {["Chats", "Calls", "Status"].map((text, index) => {
            const IconElement = (() => {
              if (index === 0) {
                return (
                  <Tooltip title="Chats" placement="top" arrow>
                    <Badge badgeContent={1} color="success">
                      <ChatIcon color="action" />
                    </Badge>
                  </Tooltip>
                );
              } else if (index === 1) {
                return (
                  <Tooltip title="Calls" placement="top" arrow>
                    <Badge badgeContent={1} color="success">
                      <CallIcon color="action" />
                    </Badge>
                  </Tooltip>
                );
              } else {
                return (
                  <Tooltip title="Status" placement="top" arrow>
                    <Badge badgeContent={1} color="success">
                      <DonutLargeIcon color="action" />
                    </Badge>
                  </Tooltip>
                );
              }
            })();

            return (
              <ListItem key={text} disablePadding sx={{ display: "block" }}>
                <ListItemButton
                  sx={[
                    {
                      minHeight: 28,
                      px: 2.5,
                    },
                    open
                      ? {
                          justifyContent: "initial",
                        }
                      : {
                          justifyContent: "center",
                        },
                  ]}
                >
                  <ListItemIcon
                    sx={[
                      {
                        minWidth: 0,
                        justifyContent: "center",
                      },
                      open
                        ? {
                            mr: 3,
                          }
                        : {
                            mr: "auto",
                          },
                    ]}
                  >
                    {IconElement}
                  </ListItemIcon>
                  <ListItemText
                    primary={text}
                    sx={[
                      open
                        ? {
                            opacity: 1,
                          }
                        : {
                            opacity: 0,
                          },
                      open && { fontWeight: "bold" },
                    ]}
                  />
                </ListItemButton>
              </ListItem>
            );
          })}
        </List>

        <List sx={{ position: "absolute", bottom: 0, width: "100%" }}>
          {["Setting", `${user?.name}`, "Logout"].map((text, index) => {
            const handleClick = () => {
              if (index === 2) {
                handleLogout();
              }
            };

            return (
              <ListItem key={text} disablePadding sx={{ display: "block" }}>
                <ListItemButton
                  onClick={handleClick}
                  sx={[
                    {
                      minHeight: 48,
                      px: 2.5,
                    },
                    open
                      ? {
                          justifyContent: "initial",
                        }
                      : {
                          justifyContent: "center",
                        },
                  ]}
                >
                  <ListItemIcon
                    sx={[
                      {
                        minWidth: 0,
                        justifyContent: "center",
                      },
                      open
                        ? {
                            mr: 3,
                          }
                        : {
                            mr: "auto",
                          },
                    ]}
                  >
                    {index === 0 && (
                      <Tooltip title="Setting" placement="top" arrow>
                        <SettingsIcon color="action" />
                      </Tooltip>
                    )}
                    {index === 1 && (
                      <Tooltip title={`${user?.name}`} placement="top" arrow>
                        <AccountCircleIcon color="action" />
                      </Tooltip>
                    )}
                    {index === 2 && (
                      <Tooltip title="Logout" placement="top" arrow>
                        <IconButton onClick={handleLogout} color="inherit">
                          <LogoutIcon color="action" />
                        </IconButton>
                      </Tooltip>
                    )}
                  </ListItemIcon>
                  <ListItemText
                    primary={text}
                    sx={[
                      open
                        ? {
                            opacity: 1,
                          }
                        : {
                            opacity: 0,
                          },
                    ]}
                  />
                </ListItemButton>
              </ListItem>
            );
          })}
        </List>
      </Drawer>
    </Box>
  );
}
