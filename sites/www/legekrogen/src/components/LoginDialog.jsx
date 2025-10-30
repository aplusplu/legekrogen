import { useState } from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  TextField,
  DialogActions,
  Button,
} from "@mui/material";
import { useAuth } from "../context/AuthContext.jsx";
import { toast } from "react-toastify";

export default function LoginDialog({ open, onClose }) {
  const { login } = useAuth();
  const [email, setEmail] = useState("admin@mediacollege.dk");
  const [password, setPassword] = useState("admin123");

  const handleSubmit = async () => {
    const res = await login(email, password);
    if (res.status === "ok") {
      toast.success("✅ Logat cu succes!");
      onClose();
    } else {
      toast.error(res.message || "❌ Login failed");
    }
  };

  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>Autentificare</DialogTitle>
      <DialogContent sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
        <TextField
          label="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <TextField
          label="Parolă"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>Anulează</Button>
        <Button onClick={handleSubmit} variant="contained">
          Login
        </Button>
      </DialogActions>
    </Dialog>
  );
}
