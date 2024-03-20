const socket = io();

const list = document.getElementById("list");
const addProduct = document.getElementById("addProduct");
const delProduct = document.getElementById("deleteProduct");


const updateList = (data) => {
  list.innerHTML = "";
  data.forEach((product) => {
    const li = document.createElement("li");
    li.textContent = `Title: ${product.title} - Price: ${product.price}`;
    list.appendChild(li);
  });
};

socket.on("connect", () => {
  console.log("Connected!");
});

socket.on("disconnect", () => {
  console.log("Disconnected!");
});

socket.on("sendProducts", (data) => {
  updateList(data);
});

const data = []; // I use this to store the products

addProduct.addEventListener("submit", (e) => {
  e.preventDefault();
  const title = document.getElementById("title").value;
  const description = document.getElementById("description").value;
  const code = document.getElementById("code").value;
  const stock = document.getElementById("stock").value;
  const status = document.getElementById("status").value;
  const price = document.getElementById("price").value;
  const category = document.getElementById("category").value;
  const thumbnails = document.getElementById("thumbnails").value;
  socket.emit("newProduct", {
    title,
    description,
    stock,
    price,
    category,
    code,
    status,
    thumbnails,
  });
  form.reset();
  updateList(data);
});

const formDel = document.getElementById("deleteProduct");
formDel.addEventListener("submit", (e) => {
  e.preventDefault();
  const id = document.getElementById("id").value;
  socket.emit("deleteProduct", id);
  formDel.reset();
  updateList(data);
});

// delete product
socket.on("deleteProduct", (id) => {
  const productToDelete = data.find((product) => product.id === id);
  if (productToDelete) {
    data.splice(data.indexOf(productToDelete), 1);
  }
  updateList(data);
});
