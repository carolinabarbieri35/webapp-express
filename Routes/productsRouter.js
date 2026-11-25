import express from "express";
import prisma from "../libs/prismaClient.js";

const router = express.Router();

// Utilities
const sendError = (res, status, message) =>
  res.status(status).json({
    error: message,
  });

const isStringValid = (value) =>
  typeof value === "string" && value.trim() !== "";

// Index
router.get("/", async (req, res) => {
  const limit = req.query.limit;
  // Select
  const products = await prisma.product.findMany({
    select: {
      id: true,
      name: true,
      price: true,
    },
    where: {
      isActive: true,
    },
  });

  res.json(products);
});

// Show dettaglio di una specifica risorsa
router.get("/:id", async (req, res) => {
  const id = Number(req.params.id);

  // Validazione formato numerico id
  if (!Number.isInteger(id)) {
    return sendError(res, 400, "Invalid product id");
  }
  const product = await prisma.product.findUnique({
    where: {
      id,
    },
    // join e possiamo aggiungere omit se vogliamo escludere delle colonne
    include: {
      category: true,
    },
  });

  // Validazione esistenza prodotto
  if (!product) {
    return sendError(res, 404, "Product not found");
  }

  res.json(product);
});

// Store creazione di un nuovo prodotto
router.post("/", async (req, res) => {
  const { name, description, price, images, isActive, categoryId } = req.body;

  // Validazione campi obbligatori
  if (!isStringValid(name) || !isStringValid(description)) {
    return sendError(res, 400, "Name and description data are required");
  }

  const newProduct = await prisma.product.create({
    data: {
      name,
      description,
      price,
      images,
      isActive,
      categoryId,
    },
  });
  res.status(201).json(newProduct);
});

// Update
router.patch("/:id", (req, res) => {
  const id = Number(req.params.id);
  res.send(`Aggiornamento del prodotto con ${id}`);
});

// Destroy
router.delete("/:id", (req, res) => {
  const id = Number(req.params.id);
  res.send(`Eliminazione del prodotto con ${id}`);
});

export default router;
