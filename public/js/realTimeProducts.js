// codigo para la vista realTimeProducts.handlebars
/* ### se ve realtime products
{{!-- aqui va el formulario para agregar productos usando los datos del ProductManager --}}

<div class="add-product">
    <form id="add-product-form">
        <input type="text" id="title" placeholder="Nombre">
        <input type="text" id="description" placeholder="Descripción">
        <input type="text" id="price" placeholder="Precio">
        <input type="text" id="stock" placeholder="Stock">
        <input type="text" id="category" placeholder="Categoria">
        <input type="text" id="code" placeholder="Codigo">
        <button type="submit">Agregar</button>
    </form>
</div>
{{!-- aqui va el formulario para eleiminar un producto por su id --}}

<div class="delete-product">
    <form id="delete-product-form">
        <input type="text" id="id" placeholder="Id del producto">
        <button type="submit">Eliminar</button>
    </form>
</div>
{{!-- aqui va el formulario para actualizar un producto por su id --}}

<div class="update-product">
    <form id="update-product-form">
        <input type="text" id="id" placeholder="Id del producto">
        <input type="text" id="title" placeholder="Nombre">
        <input type="text" id="description" placeholder="Descripción">
        <input type="text" id="price" placeholder="Precio">
        <button type="submit">Actualizar</button>
    </form>
</div>



{{!-- aqui van los productos en tiempo real --}}

<h1>Productos</h1>
<div class="box">
{{#each products}}
    <div class="product">
        <h2>Nombre: {{title}}</h2>
        <p>Id: {{id}}</p>
        <p>Descripción: {{description}}</p>
        <p>Precio: {{price}}</p>
        <p>Stock: {{stock}}</p>
        <p>Codigo: {{code}}</p>
        <p>Categoria: {{category}}</p>
        <p>Imagen: {{thumbnails}}</p>

    </div>
{{/each}}
</div>



<script src="socket.io/socket.io.js"></script>
<script src="js/realTimeProducts.js"></script>
``` */

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
  socket.emit("newProduct", {
    title,
    description,
    price,
    stock,
    category,
    code,
  });
} );

deleteProductForm.addEventListener("submit", (e) => {
  e.preventDefault();
  const id = document.getElementById("id").value;
  socket.emit("deleteProduct", id);
} );

updateProductForm.addEventListener("submit", (e) => {
  e.preventDefault();
  const id = document.getElementById("id").value;
  const title = document.getElementById("title").value;
  const description = document.getElementById("description").value;
  const price = document.getElementById("price").value;
  socket.emit("updateProduct", {
    id,
    title,
    description,
    price,
  });
} );

socket.on("newProduct", (data) => {
  console.log("Nuevo producto", data);
} );

socket.on("deleteProduct", (id) => {
  console.log("Producto eliminado", id);
} );

socket.on("updateProduct", (data) => {
  console.log("Producto actualizado", data);
} );

socket.on("products", (data) => {
  console.log("Productos", data);
} );

socket.on("error", (data) => {
  console.error("Error", data);
} );

socket.on("connect", () => {
  console.log("Conectado");
} );

socket.on("disconnect", () => {
  console.log("Desconectado");
}
);



