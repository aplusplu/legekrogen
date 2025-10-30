import { useState } from "react";
import {
  AppBar,
  Toolbar,
  IconButton,
  Typography,
  Box,
  Drawer,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Divider,
  Switch,
  Tooltip,
  Button,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import HomeIcon from "@mui/icons-material/Home";
import InfoIcon from "@mui/icons-material/Info";
import ShoppingBagIcon from "@mui/icons-material/ShoppingBag";
import Brightness4Icon from "@mui/icons-material/Brightness4";
import Brightness7Icon from "@mui/icons-material/Brightness7";
import LoginDialog from "./LoginDialog.jsx";
import { useAuth } from "../context/AuthContext.jsx";

export default function Layout({ children, mode, toggleMode }) {
  const [open, setOpen] = useState(false);
  const [showLogin, setShowLogin] = useState(false);
  const { user, logout } = useAuth();

  return (
    <>
      <AppBar position="sticky" elevation={2}>
        <Toolbar>
          <IconButton
            edge="start"
            color="inherit"
            onClick={() => setOpen(true)}
          >
            <MenuIcon />
          </IconButton>

          <Typography variant="h6" sx={{ flexGrow: 1, fontWeight: 700 }}>
            Legekrogen
          </Typography>

          {user ? (
            <Button color="inherit" onClick={logout}>
              Logout
            </Button>
          ) : (
            <Button color="inherit" onClick={() => setShowLogin(true)}>
              Login
            </Button>
          )}

          <Tooltip
            title={`Switch to ${mode === "light" ? "dark" : "light"} mode`}
          >
            <Box sx={{ display: "flex", alignItems: "center" }}>
              {mode === "light" ? <Brightness7Icon /> : <Brightness4Icon />}
              <Switch
                checked={mode === "dark"}
                onChange={toggleMode}
                color="default"
              />
            </Box>
          </Tooltip>
        </Toolbar>
      </AppBar>

      <Drawer anchor="left" open={open} onClose={() => setOpen(false)}>
        <Box sx={{ width: 260, p: 1 }}>
          <Typography variant="h6" sx={{ p: 2, fontWeight: 700 }}>
            Meniu
          </Typography>
          <Divider />
          <List>
            {[
              { icon: <HomeIcon />, text: "Acasă" },
              { icon: <ShoppingBagIcon />, text: "Produse" },
              { icon: <InfoIcon />, text: "Despre" },
            ].map((i) => (
              <ListItem key={i.text} button>
                <ListItemIcon>{i.icon}</ListItemIcon>
                <ListItemText primary={i.text} />
              </ListItem>
            ))}
          </List>
        </Box>
      </Drawer>

      <Box component="main">{children}</Box>

      <LoginDialog open={showLogin} onClose={() => setShowLogin(false)} />
    </>
  );
}
