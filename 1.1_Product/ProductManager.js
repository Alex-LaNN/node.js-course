const Product = require("./Product");
// Responsible for all the logic of possible work with 'Product'.
class ProductManager {
  constructor(name, description, price, brand, quantity) {
    this.name = name;
    this.description = description;
    this.price = price;
    this.brand = brand;
    this.quantity = quantity;
    this.sizes = [];
    this.activSize = this.sizes[0];
    this.products = [];
    this.reviews = [];

    // Adds a new product to the list of all products.
    this.addProduct = function (product) {
      this.products.push(product);
    };

    // Removes a product from the list of all products by the given ID.
    this.deleteProduct = function (productID) {
      this.products = this.products.filter(
        (product) => product.getID() !== productID
      );
    };

    // Returns the product name.
    this.getName = function () {
      return this.name;
    };

    // Finds and returns a product from a list of all products with the given ID.
    this.getProductByID = function (productID) {
      return this.products.find((product) => product.getID() === productID);
    };

    /* 
    Searches for a product in the list of all products according to its name or description.
    */
    this.searchProducts = function (products, search) {
      /* 
      The ability to search by the list of products passed in the parameters, 
      or the general list of   all products.
      */
      const productList = products.length > 0 ? products : this.products;
      return productList.filter((product) => {
        const nameMatch = product
          .getName()
          .toLowerCase()
          .includes(search.toLowerCase());
        const descriptionMatch = product
          .getDescription()
          .toLowerCase()
          .includes(search.toLowerCase());
        return nameMatch || descriptionMatch;
      });
    };

    // Sorts products according to the given rule (price, name or ID).
    this.sortProducts = function (sortRule) {
      return this.products.sort((a, b) => {
        if (sortRule === "price") {
          return a.getPrice() - b.getPrice();
        } else if (sortRule === "name") {
          return a.getName().localeCompare(b.getName());
        } else if (sortRule === "id") {
          return a.getID() - b.getID();
        } else {
          console.log("Invalid sort rule!");
          return 0;
        }
      });
    };

    // Adding a new review to the list of product reviews.
    this.addReview = function (name, author, date, comment, rating) {
      const ID = this.reviews.length > 0 ? (this.reviews.length + 1) : 1;
//      const ID = this.searchProducts(this.products, name).getID;
      // Create a new review.
      const review = {
        ID,
        name,
        author,
        date: new Date(date).toISOString().slice(0, 19).replace("T", " "),
        comment,
        rating,
      };
      // Add new review to the list of all reviews.
      this.reviews.push(review);
    };

    // Get the latest review from the list of product reviews.
    this.getLastReview = function () {
      if (this.reviews.length > 0) {
        return this.reviews.find(
          (review) => review.ID === this.reviews.length - 1
        );
      } else return null;
    };
  }
}

// Creates a new object that inherits the 'Product' class's prototype.
ProductManager.prototype = Object.create(Product.prototype);
// Override reference to native constructor for 'ProductManager' class instances.
ProductManager.prototype.constructor = ProductManager;

module.exports = ProductManager;
