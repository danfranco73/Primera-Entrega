import express from "express";
import __dirname from "./utils.js";
import productsRouter from "./routes/productsRouter.js";
import cartsRouter from "./routes/cartsRouter.js";
import handlebars from "express-handlebars";
import viewsRouter from "./views/viewsRouter.js";
import { Server } from "socket.io";
const PORT = 8080;
const app = express();

app.engine("handlebars",handlebars.engine())
app.set("views", __dirname + "/views");
app.set("view engine", "handlebars");


app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(express.static(`${__dirname}/public`));

app.use("/", viewsRouter);

app.use("/api/products", productsRouter);
app.use("/api/carts", cartsRouter);

const httpServer = app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});

const socketServer = new Server(httpServer);

socketServer.on("connection", (socket) => {
  console.log("New connection", socket.id);
  socket.on("newProduct", (data) => {
    console.log("New product", data);
    socketServer.emit("newProduct", data);
  });
}
);

export default app;

