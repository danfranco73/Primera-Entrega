const socket = io();

socket.emit("newProduct", { name: "Product 1", price: 1000 });