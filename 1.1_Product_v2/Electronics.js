const AbstractProduct = require("./AbstractProduct");
//
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
    super(name, description, price, brand, quantity, reviews, images);
    this.warranty = warranty;
    this.power = power;
  }
}

module.exports = Electronics;
