const socket = io();

const addProductForm = document.getElementById("add-product-form");
const deleteProductForm = document.getElementById("delete-product-form");
const updateProductForm = document.getElementById("update-product-form");

addProductForm.addEventListener("submit", (e) => {
  e.preventDefault();
  const title = document.getElementById("title").value;
  const description = document.getElementById("description").value;
  const price = document.getElementById("price").value;
  const stock = document.getElementById("stock").value;
  const category = document.getElementById("category").value;
  const code = document.getElementById("code").value;
  const product = {
    title,
    description,
    price,
    stock,
    category,
    code,
  };
  socket.emit("newProduct", {
    product,
  });
});

deleteProductForm.addEventListener("submit", (e) => {
  e.preventDefault();
  const id = document.getElementById("id").value;
  socket.emit("deleteProduct", id);
});

updateProductForm.addEventListener("submit", (e) => {
  e.preventDefault();
  const id = document.getElementById("id").value;
  const title = document.getElementById("title").value;
  const description = document.getElementById("description").value;
  const price = document.getElementById("price").value;
  const product = {
    id,
    title,
    description,
    price,
  };
  socket.emit("updateProduct", {
    product,
  });
});
