
document.addEventListener("DOMContentLoaded", () => {
  const socket = io();
  const addProductForm = document.getElementById("add-product-form");
  const deleteProductForm = document.getElementById("delete-product-form");
  const updateProductForm = document.getElementById("update-product-form");
  const productsContainer = document.querySelector(".products");

  if (addProductForm) {
    addProductForm.addEventListener("submit", (e) => {
      e.preventDefault();
      const name = document.getElementById("name").value;
      const description = document.getElementById("description").value;
      const price = document.getElementById("price").value;
      socket.emit("newProduct", {
        name,
        description,
        price,
      });
    });
  }

  if (deleteProductForm) {
    deleteProductForm.addEventListener("submit", (e) => {
      e.preventDefault();
      const id = document.getElementById("id").value;
      socket.emit("deleteProduct", id);
    });
  }

  if (updateProductForm) {
    updateProductForm.addEventListener("submit", (e) => {
      e.preventDefault();
      const id = document.getElementById("id").value;
      const name = document.getElementById("name").value;
      const description = document.getElementById("description").value;
      const price = document.getElementById("price").value;
      socket.emit("updateProduct", {
        id,
        name,
        description,
        price,
      });
    });
  }

  if (productsContainer) {
    socket.on("newProduct", (product) => {
      productsContainer.innerHTML += `
        <div class="product">
          <h2>${product.name}</h2>
          <p>${product.description}</p>
          <p>${product.price}</p>
        </div>
      `;
    });
  }
} );

