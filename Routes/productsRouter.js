import express from "express";
import {
  destroy,
  index,
  show,
  store,
  update,
} from "../controllers/productsController.js";

const router = express.Router();

// Utilities
const sendError = (res, status, message) =>
  res.status(status).json({
    error: message,
  });

const isStringValid = (value) =>
  typeof value === "string" && value.trim() !== "";

// Index
router.get("/", index);

// Show dettaglio di una specifica risorsa
router.get("/:id", show);

// Store creazione di un nuovo prodotto
router.post("/", store);

// Update aggiornare una risorsa
router.patch("/:id", update);

// Destroy
router.delete("/:id", destroy);

export default router;
