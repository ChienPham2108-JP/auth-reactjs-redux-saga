import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {
  AppBar,
  Box,
  Card,
  CardContent,
  Divider,
  IconButton,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Menu,
  MenuItem,
  Toolbar,
  Typography,
} from "@mui/material";

import { useAppDispatch, useAppSelector } from "app/hooks";
import { authActions } from "features/auth/authSlice";

interface UserPageProps {}

const UserPage = (props: UserPageProps) => {
  const dispatch = useAppDispatch();
  const selector = useAppSelector;
  const status = selector((state) => state.auth.status);
  const authState = selector((state) => state.auth);
  const navigate = useNavigate();
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);

  const handleLogOutClick = () => {
    dispatch(authActions.logOut(authState));
  };

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  useEffect(() => {
    if (status === "success" || status === "failue") {
      navigate("/login");
      dispatch(authActions.updateSatus(""));
    }
  }, [status, navigate, dispatch]);

  return (
    <>
      <Box sx={{ flexGrow: 1 }}>
        <AppBar
          position="static"
          sx={{ maxWidth: "1440px", padding: "0 24px" }}
        >
          <Toolbar
            variant="dense"
            sx={{
              justifyContent: "space-between",
              maxWidth: "1140px",
              width: "100%",
              display: "flex",
              margin: "0 auto",
            }}
          >
            <Typography variant="h6" color="inherit" component="div">
              My Dashboard
            </Typography>
            <IconButton
              size="large"
              aria-label="account of current user"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              onClick={handleClick}
              color="inherit"
              sx={{}}
            >
              <svg
                style={{ width: "24px", height: "24px", fill: "#fff" }}
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 448 512"
              >
                <path d="M224 256c70.7 0 128-57.3 128-128S294.7 0 224 0S96 57.3 96 128s57.3 128 128 128zm-45.7 48C79.8 304 0 383.8 0 482.3C0 498.7 13.3 512 29.7 512H418.3c16.4 0 29.7-13.3 29.7-29.7C448 383.8 368.2 304 269.7 304H178.3z" />
              </svg>
            </IconButton>
            <Menu
              id="basic-menu"
              anchorEl={anchorEl}
              open={open}
              onClose={handleClose}
              MenuListProps={{
                "aria-labelledby": "basic-button",
              }}
            >
              <MenuItem onClick={handleClose}>Profile</MenuItem>
              <Divider />
              <MenuItem onClick={handleLogOutClick}>Logout</MenuItem>
            </Menu>
          </Toolbar>
        </AppBar>
        <Box
          sx={{
            overflow: "hidden",
            display: "flex",
            maxWidth: "1140px",
            margin: "0 auto",
          }}
        >
          <Toolbar />
          <Divider />
          <List>
            {["My dashboard", "Notes", "Calendar", "Attendance"].map(
              (text, index) => (
                <ListItem key={text} disablePadding>
                  <ListItemButton>
                    <ListItemIcon>
                      {index % 2 === 0 ? (
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          viewBox="0 0 512 512"
                          width="24px"
                        >
                          <path d="M0 96C0 60.7 28.7 32 64 32H448c35.3 0 64 28.7 64 64V416c0 35.3-28.7 64-64 64H64c-35.3 0-64-28.7-64-64V96zm64 64V416H224V160H64zm384 0H288V416H448V160z" />
                        </svg>
                      ) : (
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          viewBox="0 0 512 512"
                          width="24px"
                        >
                          <path d="M64 112c-8.8 0-16 7.2-16 16v22.1L220.5 291.7c20.7 17 50.4 17 71.1 0L464 150.1V128c0-8.8-7.2-16-16-16H64zM48 212.2V384c0 8.8 7.2 16 16 16H448c8.8 0 16-7.2 16-16V212.2L322 328.8c-38.4 31.5-93.7 31.5-132 0L48 212.2zM0 128C0 92.7 28.7 64 64 64H448c35.3 0 64 28.7 64 64V384c0 35.3-28.7 64-64 64H64c-35.3 0-64-28.7-64-64V128z" />
                        </svg>
                      )}
                    </ListItemIcon>
                    <ListItemText primary={text} />
                  </ListItemButton>
                </ListItem>
              )
            )}
          </List>
          <Divider />
          <Box
            component="main"
            sx={{
              flexGrow: 1,
              pt: 2,
              display: "flex",
              gap: "20px",
              "& .MuiPaper-root": {
                minWidth: "200px",
              },
              flexWrap: "wrap",
            }}
          >
            <Card>
              <CardContent>
                <Typography
                  sx={{ fontSize: 14 }}
                  color="text.secondary"
                  gutterBottom
                >
                  Attendance Day
                </Typography>
                <Typography variant="h2">0/7</Typography>
              </CardContent>
            </Card>
            <Card>
              <CardContent>
                <Typography
                  sx={{ fontSize: 14 }}
                  color="text.secondary"
                  gutterBottom
                >
                  Hours log work
                </Typography>
                <Typography variant="h2">0</Typography>
              </CardContent>
            </Card>
            <Card>
              <CardContent>
                <Typography
                  sx={{ fontSize: 14 }}
                  color="text.secondary"
                  gutterBottom
                >
                  My devices
                </Typography>
                <Typography variant="h2">0</Typography>
              </CardContent>
            </Card>
          </Box>
        </Box>
      </Box>
    </>
  );
};

export default UserPage;
