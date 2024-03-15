import { Router } from "express";
import upload from "../../utilMulter.js";
import fs from "fs";
import __dirname from "../../utils.js";
import path from "path";
import ProductManager from "../managers/ProductManager.js";

const filePath = path.resolve(__dirname, "./src/files/productos.json");

const router = Router();

let products = [];

router.get("/", (req, res) => {
    let products = JSON.parse(fs.readFileSync(filePath, "utf-8"));
    const {limit} = req.query
    if(limit){
        const limitProducts = products.slice(0,limit)
        res.json(limitProducts)
    } else {
        res.json(products);
    }
});


router.get("/:id", (req, res) => {
    const products = JSON.parse(fs.readFileSync(filePath, "utf-8"));
  const id = req.params.id;
  const product = products.find((product) => product.id === parseInt(id));
  if (product) {
    res.json(product);
  } else {
    res.status(404).json({ error: "Producto no encontrado" });
  }
});

router.post("/", upload.array("thumbnails", 5), (req, res) => {
    const products = JSON.parse(fs.readFileSync(filePath, "utf-8"));
    const maxId = products.reduce((acc, product) => (product.id > acc ? product.id : acc), 0);
    const newProductId = maxId +1;
    const { title, description, code, price, stock, category } = req.body;
    const newProduct = {
        title,
        description,
        code,
        price,
        stock,
        category,
        status: true,
        id: newProductId,
        thumbnails: req.files.map((file) => file.path),
    };
    products.push(newProduct);
    fs.writeFileSync(filePath, JSON.stringify(products));
    res.json(newProduct);
    res.status(201);
}
);


router.put("/:pid", (req, res) => {
  const products = JSON.parse(fs.readFileSync(filePath, "utf-8"));
  const id = req.params.pid;
  const index = products.findIndex((product) => product.id === parseInt(id));
  if (index !== -1) {
    const { title, description, code, price, stock, category } = req.body;
    products[index] = {
      ...products[index],
      title,
      description,
      code,
      price,
      stock,
      category,
    };
    fs.writeFileSync(filePath, JSON.stringify(products));
    res.json(products[index]);
  } else {
    res.status(404).json({ error: "Producto no encontrado" });
  }
});


router.delete("/:pid", (req, res) => {
  let products = JSON.parse(fs.readFileSync(filePath, "utf-8"));
  const id = req.params.pid;
  const index = products.findIndex((product) => product.id === parseInt(id));
  if (index !== -1) {
    products = products.filter((product) => product.id !== parseInt(id));
    fs.writeFileSync(filePath, JSON.stringify(products));
    res.json({ message: "Producto eliminado" });
  } else {
    res.status(404).json({ error: "Producto no encontrado" });
  }
});

export default router;
