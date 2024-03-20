import { Router } from "express";
import __dirname from "../utils.js";
import { Server } from "socket.io";
import ProductManager from "../managers/ProductManager.js";
// 
const router = Router();

const productManager = new ProductManager("../files/productos.json");

router.get("/", (req, res) => {
  // traigo los productos del archivo y los muestro en la vista
  const products = productManager.getProducts();
  res.render("home", {
    layout: "main",
    products,
    listExists: products.length > 0,
  });
});
// listado de productos en tiempo real usando websockets y el realTimeProducts.handlebars

router.get("/realTimeProducts", (req, res) => {
  const products = productManager.getProducts();
  res.render("realTimeProducts", {
    layout: "main",
    products,
    listExists: products.length > 0,
  });
} );



export const serverIO = new Server(); // creo el servidor de websockets

serverIO.on("connection", (socket) => {
  console.log("New connection", socket.id);
  socket.on("newProduct", (data) => {
    console.log("New product", data);
    serverIO.emit("newProduct", data);
  });
});

export default router;
