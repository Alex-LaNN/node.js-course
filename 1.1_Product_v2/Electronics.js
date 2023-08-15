const AbstractProduct = require("./AbstractProduct");
// The Electronics class is inherited from the abstract class.
class Electronics extends AbstractProduct {
  constructor(
    name,
    description,
    price,
    brand,
    quantity,
    reviews,
    images,
    warranty,
    power
  ) {
    // Call the constructor of the parent class.
    super(name, description, price, brand, quantity, reviews, images);
    this.warranty = warranty;
    this.power = power;
    this.products = [];
  }
}

// Definition of methods in the prototype of the 'Electronics' object.
Object.assign(Electronics.prototype, {
  // Get the value of the 'warranty' field of an object.
  getWarranty() {
    return this.warranty;
  },
  // Establishes a new warranty for the product.
  setWarranty(newWarranty) {
    return (this.warranty = newWarranty);
  },

  // Get the value of the 'power' field of an object.
  getPower() {
    return this.power;
  },
  // Establishes a new power for the product.
  setPower(newPower) {
    return (this.power = newPower);
  },

  // Get a list of all products.
  getProducts() {
    return this.products;
  },
  // Set a new list of all products.
  setProducts(newProducts) {
    return (this.products = newProducts);
  },

  // Adds a new product to the list of all products.
  addProduct(product) {
    return this.products.push(product);
  },

  // Removes a product from the list of all products by the given ID.
  deleteProduct(productID) {
    this.products = this.products.filter(
      (product) => product.getID() !== productID
    );
  },

  // Returns the product name.
  getName() {
    return this.name;
  },

  // Finds and returns a product from a list of all products with the given ID.
  getProductByID(productID) {
    return this.products.find((product) => product.getID() === productID);
  },

  /* 
    Searches for a product in the list of all products according to its name or description.
    */
  searchProducts(products, search) {
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
  },

  // Sorts products according to the given rule (price, name or ID).
  sortProducts(sortRule) {
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
  },

  // Finds and returns a product from a list of all products with the given ID.
  getProductByID(productID) {
    return this.products.find((product) => product.getID() === productID);
  },

  // Adding a new review to the list of product reviews.
  addReview(name, author, date, comment, rating) {
    const ID = this.reviews.length > 0 ? this.reviews.length + 1 : 1;
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
  },

  // Get the latest review from the list of product reviews.
  getLastReview() {
    if (this.reviews.length > 0) {
      return this.reviews.find((review) => review.ID === this.reviews.length);
    } else return null;
  },

  // Receive all product reviews.
  getAllReviews(products) {
    const reviews = [];
    products.forEach((product) => {
      reviews.push(...product.reviews);
    });
    return reviews;
  },
});

module.exports = Electronics;
