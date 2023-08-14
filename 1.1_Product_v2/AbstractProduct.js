//
class AbstractProduct {
  // Sets the initial value of the unique product identifier (ID).
  static productID = 1;
  constructor(
    name,
    description,
    price,
    brand,
    quantity,
    reviews = [],
    images = []
  ) {
    this.name = name;
    this.ID = this.name === undefined ? 0 : AbstractProduct.productID++;
    this.description = description;
    this.price = price;
    this.brand = brand;
    this.quantity = quantity;
    this.reviews = reviews;
    this.images = images;
    this.date = new Date().toISOString().slice(0, 19).replace("T", " ");
  }

  // Returns the product ID.
  getID() {
    return this.ID;
  }
  // Sets a new product 'ID'.
  setID(newID) {
    return (this.ID = newID);
  }

  // Returns the product name.
  getName() {
    return this.name;
  }
  // Sets the new product name.
  setName(newName) {
    return (this.name = newName);
  }

  // Returns the description of the product.
  getDescription() {
    return this.description;
  }
  // Sets a new product description.
  setDescription(newDescription) {
    return (this.description = newDescription);
  }

  // Returns the price value of the product.
  getPrice() {
    return this.price;
  }
  // Setting a new price value for the product with checking it for correctness.
  setPrice(newPrice) {
    if (isFloat(newPrice) && newPrice >= 0) {
      this.price = newPrice;
    } else console.log("Предлагаемое значение цены является недопустимым!");
  }

  // Retrieve the quantity value of the given product in stock.
  getQuantity() {
    return this.quantity;
  }
  // Sets the value for the quantity of this product in stock.
  setQuantity(newQuantity) {
    if (newQuantity >= 0) {
      this.quantity = newQuantity;
    } else console.log("Количество не может быть отрицательным.");
  }

  // Get a list of all product reviews.
  getReviews() {
    return this.reviews;
  }
  // Set a new list of all product reviews.
  setReviews(newReviews) {
    this.reviews = newReviews;
  }

  // Get the values of all product images.
  getImages() {
    return this.images;
  }
  // Set new values for all images for a product.
  setImages(newImages) {
    if (Array.isArray(newImages)) {
      this.images = newImages;
    }
  }

  // Getting a date and time value.
  getDate() {
    return this.date;
  }
  // Fixing the value of the date and time at the present moment.
  setDate() {
    this.date = new Date().toISOString().slice(0, 19).replace("T", " ");
  }

  // Returns the brand of the product.
  getBrand() {
    return this.brand;
  }
  // Sets a new value for the brand of the product.
  setBrand(newBrand) {
    this.brand = newBrand;
  }

  // 
  getFullInformation() {
    return Object.entries(this)
      .map(([key, value]) => `${key} - ${value}`)
      .join("\n");
  }

  //
  getPriceForQuantity(quantity) {
    const totalPrice = this.price * quantity;
    return `$${totalPrice.toFixed(2)}`;
  }

  //
  universalGetterSetter(property, newValue) {
    if (property in this) {
      if (newValue === undefined) {
        return this[property];
      } else {
        this[property] = newValue;
      }
    } else {
      console.log(`Property '${property}' not found.`);
    }
  }
}

// Sets the initial value of the unique product identifier (ID).
let productID = 1;

module.exports = AbstractProduct;
