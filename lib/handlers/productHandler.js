// Importerer produkter fra JSON-fil
const products = require("../../data/products.json");
// Importerer Product modellen fra MongoDB
const Product = require("../models/Product");

// Get alle produkter
const getProducts = async (req, res) => {
  const allProducts = await Product.find({});
  res.json(allProducts);
};

// Get produkt via ID
const getProductById = async (req, res) => {
  const product = await Product.findById(req.params.id);
  if (product) res.json(product);
  else res.status(404).json({ message: "Produkt ikke fundet" });
};

// POST importer produkter fra JSON-fil
const importProducts = async (req, res) => {
  // Sletter alle eksisterende produkter
  await Product.deleteMany();
  // Indsætter alle produkter fra JSON-filen
  const created = await Product.insertMany(products);
  res.status(201).json(created);
};

// POST opret et nyt produkt
const createProduct = async (req, res) => {
  const { name, price, description, image } = req.body;
  // Opretter nyt produkt baseret på request body
  const newProduct = new Product({ name, price, description, image });
  // Gemmer produktet i databasen
  const saved = await newProduct.save();
  res.status(201).json(saved);
};

// PUT opdater produkt
const updateProduct = async (req, res) => {
  // Finder og opdaterer produkt med ID fra request, returnerer den opdaterede version
  const updated = await Product.findByIdAndUpdate(req.params.id, req.body, {
    new: true, // Returner den opdaterede version
  });
  if (updated) res.json(updated);
  else res.status(404).json({ message: "Produkt ikke fundet" });
};

// DELETE produkt
const deleteProduct = async (req, res) => {
  // Finder produkt med ID
  const product = await Product.findById(req.params.id);
  if (product) {
    // Hvis produkt findes, slet det
    await product.remove();
    res.json({ message: "Produkt slettet" });
  } else res.status(404).json({ message: "Produkt ikke fundet" });
};

// Eksporterer alle funktioner som modul (CommonJS)
module.exports = {
  getProducts,
  getProductById,
  importProducts,
  createProduct,
  updateProduct,
  deleteProduct,
};
