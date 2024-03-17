import express from "express";
import fs from "fs";
import __dirname from "../utils.js";
import path from "path";
const filePath = path.resolve(__dirname, "./files/carrito.json");
const filePathProducts = path.resolve(__dirname, "./files/productos.json");
const router = express.Router();

let carts = [];

router.get("/", (req, res) => {
  let carts = JSON.parse(fs.readFileSync(filePath, "utf-8"));
  res.json(carts);
});

router.get("/:cid", (req, res) => {
  const carts = JSON.parse(fs.readFileSync(filePath, "utf-8"));
  const id = req.params.cid;
  const cart = carts.find((cart) => cart.cid === parseInt(id));
  if (cart) {
    res.json(cart);
  } else {
    res.status(404).json({ error: "Carrito no encontrado" });
  }
});

router.post("/", (req, res) => {
  const carts = JSON.parse(fs.readFileSync(filePath, "utf-8"));
  const maxId = carts.reduce(
    (acc, cart) => (cart.cid > acc ? cart.cid : acc),
    0
  );
  const newCartId = maxId + 1;
  const newCart = {
    cid: newCartId,
    products: [],
  };
  carts.push(newCart);
  fs.writeFileSync(filePath, JSON.stringify(carts));
  res.json(newCart);
  res.status(201);
});

router.post("/:cid/product/:pid", (req, res) => {
    const carts = JSON.parse(fs.readFileSync(filePath, "utf-8")); 
    const id = req.params.cid; 
    const productId = req.params.pid; 
    const cart = carts.find((cart) => cart.cid === parseInt(id)); 
    const products = JSON.parse(fs.readFileSync(filePathProducts, "utf-8")); 
    const productToAdd = products.find((product) => product.pid === parseInt(productId)); 
    if (cart) 
    {
        const product = cart.products.find((product) => product.pid === parseInt(productId)); 
        if (product) 
        {
            product.quantity += 1;
        }
        else
        {
            cart.products.push({pid: parseInt(productId), quantity: 1}); 
        }
        fs.writeFileSync(filePath, JSON.stringify(carts)); 
        res.status(201).json(cart); 
    }
    else 
    {
        res.status(404).json({ error: "Carrito no encontrado" });
    }
});

export default router;
