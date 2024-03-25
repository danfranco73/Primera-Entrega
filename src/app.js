import express from "express";
import __dirname from "./utils.js";
import productsRouter from "./routes/productsRouter.js";
import cartsRouter from "./routes/cartsRouter.js";
import handlebars from "express-handlebars";
import viewsRouter from "./routes/viewsRouter.js";
import { Server as socket } from "socket.io";

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
const productManager = new ProductManager("src/files/productos.json");

const io = new socket(httpServer);

io.on("connection", async (socket) => {
  console.log("New connection", socket.id); //

  const products = await productManager.getProducts();

  socket.emit("products", products);

  socket.on("newProduct", async (product) => {
    await productManager.addProduct(product);
    io.sockets.emit("products", await productManager.getProducts());
  });

  socket.on("deleteProduct", async (id) => {
    await productManager.deleteProduct(id);
    io.sockets.emit("products", await productManager.getProducts());
  });

  socket.on("updateProduct", async (id, product) => {
    await productManager.updateProduct(id, product);
    io.sockets.emit("products", await productManager.getProducts());
  });
});

export default io;
