import express from "express";
import fs from "fs";
import __dirname from "../../utils.js";
import path from "path";
const filePath = path.resolve(__dirname, "./src/files/carrito.json");
const filePathProducts = path.resolve(__dirname, "./src/files/productos.json");
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

/* La ruta POST  /:cid/product/:pid deberá agregar el producto al arreglo “products” del carrito seleccionado, agregándose como un objeto bajo el siguiente formato:
product: SÓLO DEBE CONTENER EL ID DEL PRODUCTO A AGREGAR.
quantity: debe contener el número de ejemplares de dicho producto. El producto, se agregará de uno en uno, si un pid ya existe, incrementar el campo quantity de dicho producto.  */


router.post("/:cid/product/:pid", (req, res) => {
    const carts = JSON.parse(fs.readFileSync(filePath, "utf-8"));
    const products = JSON.parse(fs.readFileSync(filePathProducts, "utf-8"));
    const cartId = req.params.cid;
    const productId = req.params.pid;
    const cart = carts.find((cart) => cart.cid === parseInt(cartId));
    const product = products.find((product) => product.pid === parseInt(productId));
    if (cart && product) {
        const productInCart = cart.products.find(
        (product) => product.pid === parseInt(productId)
        );
        if (productInCart) {
        productInCart.quantity++;
        } else {
        cart.products.push({ pid: parseInt(productId), quantity: 1 });
        }
        fs.writeFileSync(filePath, JSON.stringify(carts));
        res.json(cart);
    } else {
        res.status(404).json({ error: "Carrito o producto no encontrado" });
    }
});

export default router;
