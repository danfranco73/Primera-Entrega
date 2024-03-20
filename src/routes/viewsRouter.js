// este router de vistas, lo importo en el entry point de la app y lo uso en app.use para que se ejecute en funcion a la ruta que se pida en el navegador y renderice la vista correspondiente en el servidor

import { Router } from "express";
import __dirname from "../utils.js";
import { Server } from "socket.io";
import path from "path";
import ProductManager from "../managers/ProductManager.js";


const filePath = path.resolve(__dirname, "./files/productos.json");

const productManager = new ProductManager(filePath);
const products = productManager.getProducts();

const router = Router();

export const serverIO = new Server(); // creo el servidor de websockets

serverIO.on("connection", (socket) => {
  console.log("New connection", socket.id);
  socket.on("newProduct", (data) => {
    console.log("New product", data);
    serverIO.emit("newProduct", data);
  });
} );


// recibo el update y lo paso a los managers para que se actualicen los productos
serverIO.on("connection", (socket) => {
  console.log("New connection", socket.id);
  socket.on("update", () => {
    console.log("Update");
    serverIO.emit("update");
  });
});


router.get("/", (req, res) => {
  res.render("home", {
    layout: "main",
    products: products,
    style: "style.css"
  });
} );


router.get("/realTimeProducts", (req, res) => {
  res.render("realTimeProducts", {
    layout: "main",
    products: products,
    style: "style.css"
  });
} );

export default router;