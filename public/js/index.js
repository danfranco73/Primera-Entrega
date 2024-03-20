// aqui estará o código javascript que será executado na página index.html
// manejara lo que aparece en la pantalla desde el index.handlebars

const socket = io();

socket.on("newProduct", (data) => {
    console.log("New product", data);
    const newProduct = document.createElement("p");
    newProduct.textContent = `New product: ${data.title}`;
    document.body.appendChild(newProduct);
    }
);

const form = document.querySelector("form");
const input = document.querySelector("input");

form.addEventListener("submit", (e) => {
    e.preventDefault();
    const title = input.value;
    socket.emit("newProduct", { title });
    input.value = "";
}
);

// Path: public/js/productDetail.js