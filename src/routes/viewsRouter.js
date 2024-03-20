// este router de vistas, lo importo en el entry point de la app y lo uso en app.use para que se ejecute en funcion a la ruta que se pida en el navegador y renderice la vista correspondiente en el servidor

import { Router } from "express";
import __dirname from "../utils.js";
import { Server } from "socket.io";
import productsRouter from "./productsRouter.js";
import fs from "fs";
import path from "path";

const filePath = path.resolve(__dirname, "./files/productos.json");

const products = JSON.parse(fs.readFileSync(filePath, "utf-8"));

const router = Router();

export const serverIO = new Server(); // creo el servidor de websockets

serverIO.on("connection", (socket) => {
  console.log("New connection", socket.id);
  socket.on("newProduct", (data) => {
    console.log("New product", data);
    serverIO.emit("newProduct", data);
  });
} );

// como hago para que en la vista home me aparezcan todos los productos en mi products.json?
// uso el metodo getProducts del manager

router.get("/", (req, res) => {
  res.render("home", {
    layout: "main",
    products: products,
    style: "style.css"
  });
} );

//
// como hago para que en la vista realTimeProducts me aparezcan todos los productos en mi products.json?



router.get("/realTimeProducts", (req, res) => {
  res.render("realTimeProducts", {
    layout: "main",
    products: products,
    style: "style.css"
  });
} );

export default router;