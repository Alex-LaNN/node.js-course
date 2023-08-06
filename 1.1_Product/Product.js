// Responsible for creating product objects.
class Product {
  constructor(
    name,
    description,
    price,
    brand,
    sizes,
    quantity,
    date,
    reviews,
    images
  ) {
    this.ID = productID++;
    this.name = name;
    this.description = description;
    this.price = price;
    this.brand = brand;
    this.sizes = sizes;
    this.activeSize = sizes.length > 0 ? sizes[0] : null;
    this.quantity = quantity;
    this.date = new Date().toISOString().slice(0, 19).replace("T", " ");
    this.reviews = [];
    this.images = [];
  }
  // Returns the product name.
  getName() {
    return this.name;
  }

  // Returns the product ID.
  getID() {
    return this.ID;
  }
  // Sets a new product 'ID'.
  setID(newID) {
    return (this.ID = newID);
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

  // Returns the brand of the product.
  getBrand() {
    return this.brand;
  }
  // Sets a new value for the brand of the product.
  setBrand(newBrand) {
    this.brand = newBrand;
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

  // Getting a date and time value.
  getDate() {
    return this.date;
  }
  // Fixing the value of the date and time at the present moment.
  setDate(newDate) {
    this.date = new Date(newDate).toISOString().slice(0, 19).replace("T", " ");
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

  // Adding a new size to the list of product sizes.
  addSize(newSize) {
    this.sizes.push(newSize);
  }
  // Removing a specific size from the list of product sizes.
  deleteSize(sizeToDelete) {
    this.sizes = this.sizes.filter((size) => size !== sizeToDelete);
  }

  // Retrieve a product review from the list of reviews by unique review identifier (ID).
  getReviewByID(reviewID) {
    return this.reviews.find((review) => review.ID === reviewID);
  }

  // Add a new review to the list of all products reviews.
  addReview(ID, author, date, comment, rating) {
    const review = {
      ID,
      author,
      date: new Date(date).toISOString().slice(0, 19).replace("T", " "),
      comment,
      rating,
    };
    this.reviews.push(review);
  }

  // Removing a product review from the array of reviews by the given identifier (ID).
  deleteReview(reviewID) {
    this.reviews = this.reviews.filter((review) => review.getID() !== reviewID);
  }

  // Calculate the average rating of a product based on all product reviews.
  getAverageRating() {
    if (this.reviews.length === 0) return "Нет оценок";
    // The sum of all ratings.
    let totalRating = 0;
    // Calculation of the sum of all ratings of the product.
    for (const review of this.reviews) {
      for (const key in review.rating) {
        totalRating += review.rating[key];
      }
    }
    return (
      totalRating /
      (this.reviews.length * Object.keys(this.reviews[0].rating).length)
    ).toFixed(2);
  }

  // Get feedback about a product by its identifier (ID).
  getReviewByID(reviewID) {
    return this.reviews.find((review) => review.getID() === reviewID);
  }

  // Return a link to the product image at the given index.
  getImage(index) {
    // проверить 'index' на 'число'
    if (this.images.length > 0) {
      return this.images[index];
    } else {
      return "Нет доступных изображений.";
    }
  }
}

// Sets the initial value of the unique product identifier (ID).
let productID = 1;

// Check a specific value against 'Float'.
function isFloat(number) {
  // Check: the argument is a floating point number and not NaN.
  return typeof number === "number" && !isNaN(number) && number % 1 !== 0;
}

module.exports = Product;
