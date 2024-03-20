import { Router } from "express";
import upload from "../utilMulter.js";
import fs from "fs";
import __dirname from "../utils.js";
import path from "path";
import ProductManager from "../managers/ProductManager.js";

const filePath = path.resolve(__dirname, "./files/productos.json");

console.log(filePath); // chequeo que la ruta sea correcta

const productManager = new ProductManager(filePath);

const router = Router();

let products = [];

// uso el metodo getProducts del manager

router.get("/", (req, res) => {
  const limit = req.query.limit;
  if (limit) {
    products = productManager.getProducts().slice(0, limit);
    res.json(products);
  } else {
    const products = JSON.parse(fs.readFileSync(filePath, "utf-8"));
    res.json(products);
  }
});

// uso el metodo getProductById del manager

router.get("/:pid", (req, res) => {
  const id = req.params.pid;
  const product = productManager.getProductById(id);
  if (product) {
    res.json(product);
  } else {
    res.status(404).json({ error: "Producto no encontrado" });
  }
} );

// uso el metodo addProduct del manager con todos los datos que vienen en el body de la peticion 

router.post("/", upload.single("image"), (req, res) => {
  const { title, description, code, price, stock, category } = req.body;
  const newProduct = {
    title,
    description,
    code,
    price,
    stock,
    category,
    image: req.file.filename,
  };
  const product = productManager.addProduct(newProduct);
  res.json(product);
} );


// uso el metodo updateProduct del manager, con el id que viene en la url y todos los datos que vienen en el body de la peticion

router.put("/:pid", upload.single("image"), (req, res) => {
  const id = req.params.pid;
  const { title, description, code, price, stock, category } = req.body;
  const updatedProduct = {
    title,
    description,
    code,
    price,
    stock,
    category,
    image: req.file.filename,
  };
  const product = productManager.updateProduct(id, updatedProduct);
  if (product) {
    res.json(product);
  } else {
    res.status(404).json({ error: "Producto no encontrado" });
  }
} );

// uso el metodo deleteProduct del manager, con el id que viene en la url

router.delete("/:pid", (req, res) => {
  const id = req.params.pid;
  const deleted = productManager.deleteProduct(id);
  if (deleted) {
    res.json({ success: "Producto eliminado" });
  } else {
    res.status(404).json({ error: "Producto no encontrado" });
  }
} );

export default router;
