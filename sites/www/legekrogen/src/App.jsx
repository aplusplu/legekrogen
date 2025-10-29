import { useEffect, useMemo, useState, useCallback } from "react";
import {
  ThemeProvider,
  CssBaseline,
  Container,
  Grid,
  Box,
  TextField,
  InputAdornment,
  CircularProgress,
  Typography,
} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { getTheme } from "./theme";
import Layout from "./components/Layout.jsx";
import ProductCard from "./components/ProductCard.jsx";

const API_URL = import.meta.env.VITE_API_URL || "http://localhost:5000";
console.log("API_URL =", API_URL);

export default function App() {
  const [mode, setMode] = useState(
    window.matchMedia &&
      window.matchMedia("(prefers-color-scheme: dark)").matches
      ? "dark"
      : "light"
  );
  const theme = useMemo(() => getTheme(mode), [mode]);
  const toggleMode = useCallback(
    () => setMode((m) => (m === "light" ? "dark" : "light")),
    []
  );

  const [products, setProducts] = useState([]);
  const [q, setQ] = useState("");
  const [loading, setLoading] = useState(true);

  // Fetch products
  useEffect(() => {
    let mounted = true;
    (async () => {
      try {
        setLoading(true);
        const res = await fetch(`${API_URL}/api/products`);
        if (!res.ok) throw new Error(`Server responded ${res.status}`);
        const data = await res.json();
        if (mounted) {
          setProducts(Array.isArray(data) ? data : []);
          toast.success(`Am încărcat ${data.length} produse`);
        }
      } catch (err) {
        toast.error(`Eroare la încărcare: ${err.message}`);
      } finally {
        mounted && setLoading(false);
      }
    })();
    return () => {
      mounted = false;
    };
  }, []);

  // Search (client-side)
  const filtered = useMemo(() => {
    const s = q.trim().toLowerCase();
    if (!s) return products;
    return products.filter(
      (p) =>
        p.name?.toLowerCase().includes(s) ||
        p.description?.toLowerCase().includes(s)
    );
  }, [q, products]);

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Layout mode={mode} toggleMode={toggleMode}>
        <Box
          sx={{
            py: { xs: 3, md: 5 },
            background:
              mode === "light"
                ? "linear-gradient(180deg,#fafbff, #eef2ff)"
                : "linear-gradient(180deg,#0f1117,#121826)",
          }}
        >
          <Container>
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                mb: 3,
                gap: 2,
                flexWrap: "wrap",
              }}
            >
              <Typography variant="h4" sx={{ fontWeight: 800, flexGrow: 1 }}>
                Produse
              </Typography>

              <TextField
                size="medium"
                placeholder="Caută produse…"
                value={q}
                onChange={(e) => setQ(e.target.value)}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <SearchIcon />
                    </InputAdornment>
                  ),
                }}
                sx={{ width: { xs: "100%", sm: 360 } }}
              />
            </Box>

            {loading ? (
              <Box sx={{ py: 8, display: "flex", justifyContent: "center" }}>
                <CircularProgress />
              </Box>
            ) : filtered.length === 0 ? (
              <Box sx={{ py: 6, textAlign: "center" }}>
                <Typography variant="h6" gutterBottom>
                  Niciun rezultat
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Încearcă alt termen de căutare sau verifică dacă backendul
                  rulează.
                </Typography>
              </Box>
            ) : (
              <Grid container spacing={2}>
                {filtered.map((p) => (
                  <Grid key={p._id || p.name} item xs={12} sm={6} md={4} lg={3}>
                    <ProductCard product={p} />
                  </Grid>
                ))}
              </Grid>
            )}
          </Container>
        </Box>
      </Layout>

      {/* Toastify container */}
      <ToastContainer
        position="bottom-right"
        autoClose={2500}
        hideProgressBar={false}
        newestOnTop
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme={mode} // se sincronizează cu dark/light
      />
    </ThemeProvider>
  );
}
