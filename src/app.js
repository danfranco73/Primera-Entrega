import express from "express";
import __dirname from "./utils.js";
import productsRouter from "./routes/productsRouter.js";
import cartsRouter from "./routes/cartsRouter.js";
import handlebars from "express-handlebars";
import viewsRouter from "./routes/viewsRouter.js";
import { Server } from "socket.io";

const PORT = 8080;
const app = express();

const httpServer = app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static("public"));

app.engine("handlebars", handlebars.engine());
app.set("views", __dirname + "/views");
app.set("view engine", "handlebars");

app.use("/", viewsRouter);
app.use("/api/products", productsRouter);
app.use("/api/carts", cartsRouter);

import ProductManager from "./managers/ProductManager.js";
const productManager = new ProductManager("./file/productos.json");

const serverIO = new Server(httpServer);

serverIO.on("connection", (socket) => {
  console.log("New connection", socket.id);
  socket.emit("products", productManager.getProducts());
  socket.on("newProduct", async (data) => {
    await productManager.addProduct(data);
    serverIO.emit("products", await productManager.getProducts());
  });

  serverIO.on("connection", (socket) => {
    console.log("New connection", socket.id);
    socket.emit;
    socket.on("update", () => {
      console.log("Update");
      serverIO.emit("update");
    });
  });
});

export default serverIO;
