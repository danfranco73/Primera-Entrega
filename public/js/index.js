
document.addEventListener("DOMContentLoaded", () => {
  const socket = io();
  const updateButton = document.getElementById("update");
  const productsContainer = document.getElementById("productsContainer");

  if (updateButton) {
    updateButton.addEventListener("click", () => {
      socket.emit("newProduct", {
        name: "Nuevo producto",
        description: "Descripción del nuevo producto",
        price: 1000,
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

