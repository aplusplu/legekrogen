import { useState } from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Button,
} from "@mui/material";
import { toast } from "react-toastify";
import { useAuth } from "../context/AuthContext";

export default function LoginDialog({ open, onClose }) {
  const { login } = useAuth();
  const [email, setEmail] = useState("admin@mediacollege.dk");
  const [password, setPassword] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await login(email, password);
      toast.success("Autentificare reușită");
      onClose?.();
    } catch (err) {
      toast.error(err.message || "Login eșuat");
    }
  };

  return (
    <Dialog open={open} onClose={onClose} fullWidth maxWidth="xs">
      <DialogTitle>Login</DialogTitle>
      <form onSubmit={handleSubmit}>
        <DialogContent>
          <TextField
            label="Email"
            type="email"
            fullWidth
            margin="normal"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <TextField
            label="Parolă"
            type="password"
            fullWidth
            margin="normal"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={onClose}>Anulează</Button>
          <Button type="submit" variant="contained">
            Intră
          </Button>
        </DialogActions>
      </form>
    </Dialog>
  );
}
