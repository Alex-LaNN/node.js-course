const AbstractProduct = require("./AbstractProduct");
//
class Clothes extends AbstractProduct {
  constructor(
    name,
    description,
    price,
    quantity,
    reviews,
    images,
    date,
    brand,
    sizes,
    activeSize,
    material,
    color
  ) {
    super(name, description, price, quantity, reviews, images, date, brand);
    this.sizes = [];
    this.activeSize = this.sizes[0];
    this.products = [];
    this.reviews = [];
    this.material = material;
    this.color = color;
  }

  // Retrieve all sizes of a product that are in stock.
  getSizes() {
    return this.sizes;
  }
  // A record of all dimensions of a product that are in stock.
  setSizes(newSizes) {
    this.sizes = newSizes;
  }

  // Get the default product size value.
  getActiveSize() {
    return this.activeSize;
  }
  // Set a new default product size value.
  setActiveSize(newActiveSize) {
    if (this.sizes.includes(newActiveSize)) {
      this.activeSize = newActiveSize;
    } else
      console.log(
        `Данный размер: ${newActiveSize} в списке размеров отсутствует!`
      );
  }

  //
  getProducts() {
    return this.products;
  }
  //
  setProducts(newProducts) {
    return this.products = newProducts;
  }

  //
  getMaterial() {
    return this.material;
  }
  //
  setMaterial(newMaterial) {
    return (this.material = newMaterial);
  }

  //
  getColor() {
    return this.color;
  }
  //
  setColor(newColor) {
    return (this.color = newColor);
  }

  //
  addProduct(product) {
    this.products.push(product);
  }

  // Removes a product from the list of all products by the given ID.
  deleteProduct(productID) {
    this.products = this.products.filter(
      (product) => product.getID() !== productID
    );
  }

  //
  getName() {
    return super.getName;
  }
}



module.exports = Clothes;
