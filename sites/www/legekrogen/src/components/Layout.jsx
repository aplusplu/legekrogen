import { useState } from "react";
import {
  AppBar,
  Toolbar,
  IconButton,
  Typography,
  Box,
  Drawer,
  List,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Divider,
  Switch,
  Tooltip,
  Avatar,
  Button,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import HomeIcon from "@mui/icons-material/Home";
import InfoIcon from "@mui/icons-material/Info";
import ShoppingBagIcon from "@mui/icons-material/ShoppingBag";
import PeopleIcon from "@mui/icons-material/People";
import Brightness4Icon from "@mui/icons-material/Brightness4";
import Brightness7Icon from "@mui/icons-material/Brightness7";
import { useAuth } from "../context/AuthContext"; // dacă nu folosești context, poți primi user/logout ca props

export default function Layout({
  children,
  mode,
  toggleMode,
  onNavigate,          // (path) => void  ex: "home" | "users"
  current = "home",    // ruta activă (opțional)
}) {
  const [open, setOpen] = useState(false);
  const handleToggle = () => setOpen((o) => !o);

  const { user, logout } = useAuth?.() || { user: null, logout: () => {} };

  const items = [
    { key: "home", text: "Acasă", icon: <HomeIcon /> },
    { key: "products", text: "Produse", icon: <ShoppingBagIcon /> },
    { key: "about", text: "Despre", icon: <InfoIcon /> },
    { key: "users", text: "Utilizatori", icon: <PeopleIcon />, requireAdmin: true },
  ];

  const visibleItems = items.filter(
    (i) => !i.requireAdmin || (user && user.role === "admin")
  );

  return (
    <>
      <AppBar position="sticky" elevation={2}>
        <Toolbar>
          <IconButton edge="start" color="inherit" onClick={handleToggle} sx={{ mr: 1 }}>
            <MenuIcon />
          </IconButton>

          <Typography variant="h6" sx={{ flexGrow: 1, fontWeight: 700 }}>
            Legekrogen
          </Typography>

          <Tooltip title={`Switch to ${mode === "light" ? "dark" : "light"} mode`}>
            <Box sx={{ display: "flex", alignItems: "center", mr: 2 }}>
              {mode === "light" ? <Brightness7Icon /> : <Brightness4Icon />}
              <Switch checked={mode === "dark"} onChange={toggleMode} color="default" />
            </Box>
          </Tooltip>

          {user ? (
            <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
              <Avatar src={user.picture} alt={user.name} />
              <Typography variant="body2" sx={{ display: { xs: "none", sm: "block" } }}>
                {user.name} ({user.role})
              </Typography>
              <Button color="inherit" onClick={logout}>Logout</Button>
            </Box>
          ) : (
            // deschizi un dialog de login din App: setezi un state și îl pasezi aici ca prop dacă preferi
            <Button color="inherit" onClick={() => onNavigate?.("login")}>Login</Button>
          )}
        </Toolbar>
      </AppBar>

      <Drawer anchor="left" open={open} onClose={handleToggle}>
        <Box sx={{ width: 260, p: 1 }} role="presentation" onClick={handleToggle}>
          <Typography variant="h6" sx={{ p: 2, fontWeight: 700 }}>Meniu</Typography>
          <Divider />
          <List>
            {visibleItems.map((i) => (
              <ListItemButton
                key={i.key}
                selected={current === i.key}
                onClick={() => onNavigate?.(i.key)}
              >
                <ListItemIcon>{i.icon}</ListItemIcon>
                <ListItemText primary={i.text} />
              </ListItemButton>
            ))}
          </List>
        </Box>
      </Drawer>

      <Box component="main">{children}</Box>
    </>
  );
}
