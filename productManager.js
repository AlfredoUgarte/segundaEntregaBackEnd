const fs = require("fs");
class ProductManager {
  constructor(path) {
    this.path = path;
  }

  addProduct = async (product) => {
    if (
      !product.description ||
      !product.price ||
      !product.title ||
      !product.stock ||
      !product.thumbnail
    ) {
      console.log(
        "Product must have all properties: title, description, price, thumbnail, stock"
      );
    } else {
      product.id = await this.setId().then((id) => id);
      try {
        if (product.id === 1) {
          await fs.promises.writeFile(
            this.path,
            JSON.stringify([product], null, 2)
          );
        } else {
          let products = await this.getProducts().then((data) => data);
          products.push(product);
          await fs.promises.writeFile(
            this.path,
            JSON.stringify(products, null, 2)
          );
          return "Product added successfully";
        }
      } catch (error) {
        return error;
      }
    }
  };

  getProducts = async () => {
    if (!fs.existsSync(this.path)) {
      return -1;
    }
    try {
      let data = await fs.promises.readFile(this.path, "utf-8");
      let products = await JSON.parse(data);
      return products;
    } catch (error) {
      return error;
    }
  };

  getProductById = async (id) => {
    try {
      let data = await this.getProducts().then((data) => data);
      if (data !== -1) {
        let product = data.find((product) => product.id === id);
        return product ? product : "Product not found";
      }
      return -1;
    } catch (error) {
      return error;
    }
  };
  setId = async () => {
    try {
      let data = await this.getProducts().then((data) => data);
      console.log(data);
      if (data === -1) {
        return 1;
      } else {
        let id = data[data.length - 1].id;
        const currentId = id + 1;
        return currentId;
      }
    } catch (error) {
      return error;
    }
  };

  deleteById = async (id) => {
    try {
      let data = await this.getProducts().then((data) => data);
      if (data !== -1) {
        let products = data.filter((product) => product.id !== id);
        if (data.length !== products.length) {
          await fs.promises.writeFile(
            this.path,
            JSON.stringify(products, null, 2)
          );
          return "delete successfully";
        }
        return "Product not found";
      }
      return -1;
    } catch (error) {
      return error;
    }
  };
  updateById = async (id, data) => {
    const products = await this.getProducts().then((products) => products);
    const product = products.find((product) => product.id === id);
    const index = products.indexOf(product);
    if (index === -1) {
      return "Product not found";
    }
    products[index] = { ...products[index], ...data };
    try {
      await fs.promises.writeFile(this.path, JSON.stringify(products, null, 2));
      return "Update successfully";
    } catch (error) {
      return error;
    }
  };
}

module.exports = ProductManager;
