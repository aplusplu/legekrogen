import { useEffect, useState } from "react";
import {
  Container,
  Typography,
  Grid,
  Card,
  CardContent,
  Avatar,
  Box,
} from "@mui/material";
import { toast } from "react-toastify";
import { useAuth } from "../context/AuthContext";
import { api } from "../api";

export default function UsersPage() {
  const { token, user } = useAuth();
  const [users, setUsers] = useState([]);

  useEffect(() => {
    if (!token || user?.role !== "admin") return;
    (async () => {
      try {
        const res = await api("/users", { token });
        setUsers(res.users || []);
      } catch (e) {
        toast.error(e.message);
      }
    })();
  }, [token, user]);

  if (!user || user.role !== "admin") {
    return (
      <Container sx={{ py: 6 }}>
        <Typography variant="h6">
          Doar administratorul poate vedea această pagină.
        </Typography>
      </Container>
    );
  }

  return (
    <Container sx={{ py: 4 }}>
      <Typography variant="h4" sx={{ mb: 3, fontWeight: 800 }}>
        Utilizatori
      </Typography>
      <Grid container spacing={2}>
        {users.map((u) => (
          <Grid key={u._id} item xs={12} sm={6} md={4} lg={3}>
            <Card>
              <CardContent>
                <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
                  <Avatar src={u.picture} alt={u.name} />
                  <Box>
                    <Typography variant="subtitle1" fontWeight={700}>
                      {u.name}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      {u.email}
                    </Typography>
                    <Typography variant="caption">role: {u.role}</Typography>
                  </Box>
                </Box>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Container>
  );
}
