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

  // Validazione id categoria
  // Select * from category where id = categoryId
  const category = await prisma.category.findUnique({
    where: {
      id: categoryId,
    },
  });
  if (!category) {
    return sendError(res, 400, "Category id not valid");
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

// Update aggiornare una risorsa
router.patch("/:id", async (req, res) => {
  const id = Number(req.params.id);

  // validazione id
  if (!Number.isInteger(id)) {
    return res.status(400).json({
      error: "Invalid product id",
    });
  }

  const { name, description, price, images, isActive, categoryId } = req.body;

  // Validazione esistenza prodotte da modificare
  const product = await prisma.product.findUnique({
    where: {
      id,
    },
  });
  if (!product) {
    return sendError(res, 404, "Product not found");
  }

  // Validazione se la categoria esiste
  if (categoryId !== undefined) {
    const category = await prisma.category.findUnique({
      where: {
        id: categoryId,
      },
    });
    if (!category) {
      return sendError(res, 400, "Category id not valid");
    }
  }

  const updatedProduct = await prisma.product.update({
    where: {
      id,
    },
    data: {
      name,
      description,
      price,
      images,
      isActive,
      categoryId,
    },
  });
  res.json(updatedProduct);
});

// Destroy
router.delete("/:id", async (req, res) => {
  const id = Number(req.params.id);

  // Validazione id
  if (!Number.isInteger(id)) {
    return sendError(res, 400, "Invalid product id");
  }
  // Validazione esistenza prodotto
  const product = await prisma.product.findUnique({
    where: {
      id,
    },
  });
  if (!product) {
    return sendError(res, 404, "Product not found");
  }

  await prisma.product.delete({
    where: {
      id,
    },
  });

  res.sendStatus(204);
});

export default router;
