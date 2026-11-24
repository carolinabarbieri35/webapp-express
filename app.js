import "dotenv/config";
import express from "express";
import router from "./Routes/productsRouter.js";
import prisma from "./libs/prismaClient.js";

const app = express();
const port = process.env.APP_PORT || 3000;

app.use(express.json());
app.use("/product", router);

app.get("/", (req, res) => {
  res.send("Buon lavoro!");
});

app.get("/category", async (req, res) => {
  try {
    const category = await prisma.category.findMany();
    res.json(category);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Errore nel recupero delle categorie" });
  }
});

app.listen(port, () =>
  console.log(`Server started on http://localhost: ${port}`)
);
