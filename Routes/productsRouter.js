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

// Show
router.get("/:id", (req, res) => {
  const id = Number(req.params.id);
  res.send(`Dettaglio prodotto ${id}`);
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
