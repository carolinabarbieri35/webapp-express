import express from "express";
import prisma from "../libs/prismaClient.js";

const router = express.Router();

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
    return res.status(400).json({
      error: "Invalid product id",
    });
  }

  const product = await prisma.product.findUnique({
    where: {
      id,
    },
  });

  // Validazione esistenza prodotto
  if (!product) {
    res.status(404).json({
      error: "Product not found",
    });
    return;
  }

  res.json(product);
});

// Store
router.post("/", (req, res) => {
  const body = req.body;
  res.send("Creazione di un nuovo prodotto");
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
