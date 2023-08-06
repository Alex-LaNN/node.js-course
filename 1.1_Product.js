class Product {
  constructor(
    ID,
    name,
    description,
    price,
    brand,
    sizes,
    activeSize,
    quantity
  ) {
    this.ID = Product.getNextID;
    this.name = name;
    this.description = description;
    this.price = price;
    this.brand = brand;
    this.sizes = ["XS", "S", "M", "L", "XL", "XXL"];
    this.activeSize = this.sizes[0];
    this.quantity = quantity;
    this.date = new Date().toISOString().slice(0, 19).replace("T", " ");
    this.reviews = [];
    this.images = [];

    // +++
    this.getDate = function () {
      return new Date().toISOString().slice(0, 19).replace("T", " ");
    };
    this.setDate = function () {
      return this.date.setDate;
    };

    // +++
    this.getID = function () {
      return this.ID;
    };
    this.setID = function (newID) {
      this.ID = newID;
    };

    // +++
    this.getName = function () {
      return this.name;
    };
    this.setName = function (newName) {
      this.name = newName;
    };

    // +++
    this.getDescription = function () {
      return description;
    };
    this.setDescription = function (newDescription) {
      this.description = newDescription;
    };

    // +++
    this.getPrice = function () {
      this.price = price;
    };
    this.setPrice = function (newPrice) {
      if (newPrice > 0 && isFloat(newPrice)) {
        this.price = newPrice;
      } else console.log(`Некорректное значение 'price'`);
    };

    // +++
    this.getBrand = function () {
      return this.brand;
    };
    this.setBrand = function (newBrand) {
      this.brand = newBrand;
    };

    this.getSizes = function () {
      return;
    };

    // ---
    this.getActiveSize = function () {
      return this.activeSize;
    };
    this.setActivesize = function (newActiveSize) {
      if (this.sizes.includes(newActiveSize)) {
        this.activeSize = newActiveSize;
      } else console.log(`Данный размер в списке размеров отсутствует!`);
    };
  }

  productInformation() {
    console.log(
      "ID: " +
        this.ID +
        ", name: " +
        this.name +
        ", description: " +
        this.description +
        ", price: " +
        this.price +
        ", brand: " +
        this.brand +
        ", activeSize: " +
        this.activeSize +
        ", date: " +
        this.date
    );
  }
}

// проверка значения на 'Float'
function isFloat(number) {
  // проверка: является ли аргумент числом с плавающей точкой и не является ли он NaN
  return typeof number === "number" && !isNaN(number) && number % 1 !== 0;
}

let auto1 = new Product(1, "Opel", "machine", 10000, "GM");
let auto2 = new Product(2, "Ford", "machine", 8000, "Ford");
let auto3 = new Product(3, "Mersedes", "machine", "12000", "Mersedes");
let auto4 = new Product();

auto4.productInformation();
auto1.productInformation();
auto2.productInformation();
auto3.productInformation();


