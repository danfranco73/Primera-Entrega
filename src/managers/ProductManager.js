import fs from "fs";

class ProductManager {
  constructor(filePath) {
    this.path = filePath;
    this.products = [];
  }

  // metodo para obtener todos los productos, si coloco un archivo con productos, los lee y los devuelve, si no existe el archivo, devuelve un array vacio

  getProducts() {
    if (fs.existsSync(this.path)) {
      this.products = JSON.parse(fs.readFileSync(this.path, "utf-8"));
    } else {
      fs.writeFileSync(this.path, JSON.stringify(this.products, null, "\t"));
    }
    return this.products;
  }

  getProductById(id) {
    const products = this.getProducts();
    return this.products.find((product) => product.id === parseInt(id));
  }
// metodo para agregar un producto, recibe un producto por parametro, le agrega un id y lo guarda en el archivo, ese id es unico aunque se eleiminen productos, ya que se calcula en base a la cantidad de productos que hay en el archivo y el ultimo id que se le asigno a un producto

  addProduct(product) {
    const products = this.getProducts();
    const maxId = products.reduce(
      (acc, product) => (product.id > acc ? product.id : acc),
      0
    );
    const newProductId = maxId + 1;
    const newProduct = { ...product, id: newProductId };
    products.push(newProduct);
    fs.writeFileSync(this.path, JSON.stringify(products, null, "\t"));
    return newProduct;
  } 

 // metodo para actualizar un producto, recibe un id y un producto por parametro, busca el producto por id, lo actualiza y lo guarda en el archivo

  updateProduct(id, product) {
    const products = this.getProducts();
    const index = products.findIndex((product) => product.id === parseInt(id));
    if (index !== -1) {
      products[index] = { ...products[index], ...product };
      fs.writeFileSync(this.path, JSON.stringify(products, null, "\t"));
      return products[index];
    } else {
      return null;
    }
  }

  // metodo para eliminar un producto, recibe un id por parametro, busca el producto por id, lo elimina y guarda el archivo

  deleteProduct(id) {
    const products = this.getProducts();
    const index = products.findIndex((product) => product.id === parseInt(id));
    if (index !== -1) {
      products.splice(index, 1);
      fs.writeFileSync(this.path, JSON.stringify(products, null, "\t"));
      return true;
    } else {
      return false;
    }
  }

}

export default ProductManager;
