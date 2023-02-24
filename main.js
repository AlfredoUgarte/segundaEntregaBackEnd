const ProductManager = require("./productManager.js");

let products = [
  {
    description: "descripcion 1",
    stock: 10,
    title: "Escuadra",
    price: 123.45,
    thumbnail: "pendiente",
  },
  {
    description: "descripcion 2",
    stock: 45,
    title: "Calculadora",
    price: 234.56,
    thumbnail: "pendiente",
  },
  {
    description: "descripcion 3",
    stock: 1000,
    title: "Globo Terráqueo",
    price: 345.67,
    thumbnail: "pendiente",
  },
];

const productManager = new ProductManager("./products.json");

function guardar(product) {
  productManager.addProduct(product).then((result) => console.log(result));
}

function obtenerPorId(id) {
  productManager.getProductById(id).then((result) => console.log(result));
}

function obtenerTodos() {
  productManager.getProducts().then((result) => console.table(result));
}

function borrarPorId(id) {
  productManager.deleteById(id).then((result) => console.log(result));
}

function actualizarPorId(id, info) {
  productManager.updateById(id, info).then((result) => console.log(result));
}

setTimeout(guardar, 50, products[0]);
setTimeout(guardar, 100, products[1]);
setTimeout(guardar, 150, products[2]);

setTimeout(obtenerPorId, 200, 2);
setTimeout(obtenerTodos, 250);

setTimeout(borrarPorId, 300, 2);
setTimeout(obtenerTodos, 350);

setTimeout(actualizarPorId, 400, 1, { title: "Calculadora" });
setTimeout(obtenerTodos, 450);
