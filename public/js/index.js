
document.addEventListener("DOMContentLoaded", () => {
  const socket = io();
  const updateButton = document.getElementById("update");
  const productsContainer = document.getElementById("productsContainer");

// codigo para el boton de actualizar
  if (updateButton) {
    updateButton.addEventListener("click", () => {
      socket.emit("update");
    });
  } 

  if (productsContainer) {
    socket.on("newProduct", (product) => {
      productsContainer.innerHTML += `
        <div class="product">

          <h2>${product.title}</h2>
          <p>${product.description}</p>
          <p>${product.price}</p>
          <p>${product.stock}</p>
          <p>${product.category}</p>
          <p>${product.id}</p>
          <img src="/img/${product.image}" alt="${product.name}" />

        </div>
      `;
    });
  }
} );

