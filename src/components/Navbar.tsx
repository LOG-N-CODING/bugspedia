import MenuIcon from "@mui/icons-material/Menu";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import React from "react";
import { Link as RouterLink, useNavigate } from "react-router-dom";

import { useAuth } from "../contexts/AuthContext";

const Navbar: React.FC = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);

  const handleMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleLogout = async () => {
    handleClose();
    await logout();
    navigate("/login");
  };

  const menuLinks = [
    { name: "Main", path: "/" },
    { name: "Quiz", path: "/quiz" },
    { name: "Encyclopedia", path: "/encyclopedia" },
    { name: "Leaderboard", path: "/leaderboard" },
  ];

  return (
    <AppBar
      position="sticky"
      enableColorOnDark
      sx={{
        background:
          "linear-gradient(to right,rgb(129, 172, 131),rgb(51, 108, 58))",
      }}
    >
      <Toolbar>
        <Typography
          variant="h6"
          component={RouterLink}
          to="/"
          sx={{
            flexGrow: 1,
            textDecoration: "none",
            color: "inherit",
            display: "flex",
            alignItems: "center",
            gap: "10px",
          }}
        >
          <span>
            <img
              src="/bugs.png"
              alt="Beetle"
              style={{ height: 28, verticalAlign: "middle" }}
            />
          </span>
          <span>BugsPedia</span>
        </Typography>

        <Box sx={{ display: { xs: "none", sm: "flex" }, gap: 2 }}>
          {menuLinks.map((link) => (
            <Button
              key={link.name}
              component={RouterLink}
              to={link.path}
              color="inherit"
            >
              {link.name}
            </Button>
          ))}
          {user ? (
            <Button onClick={handleLogout} color="inherit">
              Logout
            </Button>
          ) : (
            <>
              <Button component={RouterLink} to="/login" color="inherit">
                Login
              </Button>
              {/* <Button component={RouterLink} to="/signup" color="inherit">
                Signup
              </Button> */}
            </>
          )}
        </Box>

        <Box sx={{ display: { xs: "flex", sm: "none" } }}>
          <IconButton
            size="large"
            edge="start"
            color="inherit"
            onClick={handleMenu}
          >
            <MenuIcon />
          </IconButton>
          <Menu
            anchorEl={anchorEl}
            open={open}
            onClose={handleClose}
            transformOrigin={{ vertical: "top", horizontal: "right" }}
          >
            {menuLinks.map((link) => (
              <MenuItem
                key={link.name}
                component={RouterLink}
                to={link.path}
                onClick={handleClose}
              >
                {link.name}
              </MenuItem>
            ))}
            {user ? (
              <MenuItem onClick={handleLogout}>Logout</MenuItem>
            ) : (
              <>
                <MenuItem
                  component={RouterLink}
                  to="/login"
                  onClick={handleClose}
                >
                  Login
                </MenuItem>
                <MenuItem
                  component={RouterLink}
                  to="/signup"
                  onClick={handleClose}
                >
                  Signup
                </MenuItem>
              </>
            )}
          </Menu>
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;
