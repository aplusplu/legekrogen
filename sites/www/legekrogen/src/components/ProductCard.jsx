import { memo } from "react";
import {
  Card,
  CardActionArea,
  CardContent,
  CardMedia,
  Typography,
  Box,
} from "@mui/material";
import { motion } from "framer-motion";

function ProductCard({ product }) {
  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 20, scale: 0.98 }}
      whileInView={{ opacity: 1, y: 0, scale: 1 }}
      whileHover={{ y: -4 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.35 }}
      style={{ height: "100%" }}
    >
      <Card sx={{ height: "100%" }} elevation={3}>
        <CardActionArea sx={{ height: "100%" }}>
          {product.image && (
            <CardMedia
              component="img"
              height="180"
              image={product.image}
              alt={product.name}
              loading="lazy"
            />
          )}
          <CardContent>
            <Typography variant="h6" gutterBottom noWrap>
              {product.name}
            </Typography>
            <Typography
              variant="body2"
              color="text.secondary"
              sx={{ minHeight: 48 }}
            >
              {product.description}
            </Typography>
            <Box sx={{ mt: 2, fontWeight: 700 }}>
              {Number(product.price).toLocaleString("da-DK")} kr.
            </Box>
          </CardContent>
        </CardActionArea>
      </Card>
    </motion.div>
  );
}

export default memo(ProductCard);
