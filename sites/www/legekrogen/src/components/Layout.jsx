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
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import HomeIcon from "@mui/icons-material/Home";
import InfoIcon from "@mui/icons-material/Info";
import ShoppingBagIcon from "@mui/icons-material/ShoppingBag";
import Brightness4Icon from "@mui/icons-material/Brightness4";
import Brightness7Icon from "@mui/icons-material/Brightness7";

export default function Layout({ children, mode, toggleMode }) {
  const [open, setOpen] = useState(false);
  const handleToggle = () => setOpen((o) => !o);

  return (
    <>
      <AppBar position="sticky" elevation={2}>
        <Toolbar>
          <IconButton
            edge="start"
            color="inherit"
            onClick={handleToggle}
            sx={{ mr: 1 }}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" sx={{ flexGrow: 1, fontWeight: 700 }}>
            Legekrogen
          </Typography>
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

      <Drawer anchor="left" open={open} onClose={handleToggle}>
        <Box
          sx={{ width: 260, p: 1 }}
          role="presentation"
          onClick={handleToggle}
        >
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
              <ListItem key={i.text} button="true">
                <ListItemIcon>{i.icon}</ListItemIcon>
                <ListItemText primary={i.text} />
              </ListItem>
            ))}
          </List>
        </Box>
      </Drawer>

      <Box component="main">{children}</Box>
    </>
  );
}
