import { Router } from "express";
import __dirname from "../utils.js";
import path from "path";
import ProductManager from "../managers/ProductManager.js";

const filePath = path.resolve(__dirname, "./files/productos.json");

const productManager = new ProductManager(filePath);
const products = productManager.getProducts();

const router = Router();

router.get("/", (req, res) => {
  res.render("home", {
    layout: "main",
    products: products,
    style: "style.css",
  });
});

router.get("/realTimeProducts", (req, res) => {
  res.render("realTimeProducts", {
    layout: "main",
    products: products,
    style: "style.css",
  });
});

export default router;
