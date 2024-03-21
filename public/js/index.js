
const updateProducts = document.getElementById("update-products");

updateProducts.addEventListener("click", async () => {
  const response = await fetch("/api/products");
  const products = await response.json();
  const productsContainer = document.getElementById("products-container");
  productsContainer.innerHTML = "";
  products.forEach((product) => {
    const div = document.createElement("div");
    div.innerHTML = `
      <h3>${product.title}</h3>
      <p>${product.description}</p>
      <p>${product.price}</p>
      <p>${product.stock}</p>
      <p>${product.category}</p>
      <p>${product.code}</p>
    `;
    productsContainer.appendChild(div);
  });
});
