const socket = io();

socket.on("products", (data) => {
  renderProducts(data);
});

const renderProducts = (products) => {
  const productsList = document.getElementById("products-list");
  productsList.innerHTML = "";
  products.forEach((product) => {
    const newProduct = document.createElement("li");
    newProduct.textContent = `id: ${product.id}, Title: ${product.title}, Description: ${product.description}, Price: ${product.price}`;
    productsList.appendChild(newProduct);
  });
};

const addProductForm = document.getElementById("add-product-form");

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
  socket.emit("newProduct", product);
});

const deleteProductForm = document.getElementById("delete-product-form");

deleteProductForm.addEventListener("submit", (e) => {
  e.preventDefault();
  const id = document.getElementById("id").value;
  socket.emit("deleteProduct", id);
  // muestro mi listado de productos actualizado
  socket.on("deleteProduct-Server", (products) => {
    const productsList = document.getElementById("products-list");
    productsList.innerHTML = "";
    products.forEach((product) => {
      const newProduct = document.createElement("li");
      newProduct.textContent = `Title: ${product.title}, Description: ${product.description}, Price: ${product.price}`;
      productsList.appendChild(newProduct);
    });
  });
});

/* const updateProductForm = document.getElementById("update-product-form");

updateProductForm.addEventListener("submit", (e) => {
  e.preventDefault();
  const id = document.getElementById("id").value; // id del producto a modificar
  const title = document.getElementById("title").value;
  const description = document.getElementById("description").value;
  const price = document.getElementById("price").value;
  const product = {
    title,
    description,
    price,
  };
  socket.emit("updateProduct", id, product);
}); */
