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

app.engine(
  "handlebars",
  handlebars.engine());
app.set("views", __dirname + "/views");
app.set("view engine", "handlebars");

const serverIO = new Server(httpServer);

serverIO.on("connection", (socket) => {
  console.log("New connection", socket.id);
  socket.on("newProduct", (data) => {
    console.log("New product", data);
    serverIO.emit("newProduct", data);
  });
});

// recibo el update y lo paso a los managers para que se actualicen los productos
serverIO.on("connection", (socket) => {
  console.log("New connection", socket.id);
  socket.on("update", () => {
    console.log("Update");
    serverIO.emit("update");
  });
});

app.use("/", viewsRouter);
app.use("/api/products", productsRouter);
app.use("/api/carts", cartsRouter);

// recibo el evento "newProduct" y lo emito a todos los clientes y lo guardo en la base de datos





export default serverIO;
