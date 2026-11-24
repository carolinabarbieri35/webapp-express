import express from "express";
import prisma from "../libs/prismaClient.js";

const router = express.Router();

router.get("/", async (req, res) => {
  try {
    const category = await prisma.category.findMany();
    res.json(category);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Errore nel recupero delle categorie" });
  }
});

export default router;
