import "dotenv/config";
import express from "express";
import productRouter from "./Routes/productsRouter.js";
import errorsHandler from "./middlewares/errorsHandler.js";
import notFound from "./middlewares/notFound.js";
import categoryRoutes from "./Routes/categoryRoutes.js";

// Setup
const app = express();
const port = process.env.APP_PORT || 3000;

// Middleware di Setup
app.use(express.json());

// Routes
app.get("/", (req, res) => {
  res.send("Buon lavoro!");
});

app.use("/product", productRouter);
app.use("/category", categoryRoutes);

// Middleware
app.use(errorsHandler);
app.use(notFound);

// Start server
app.listen(port, () =>
  console.log(`Server started on http://localhost: ${port}`)
);
