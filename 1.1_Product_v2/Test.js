const AbstractProduct = require("./AbstractProduct");
const Clothes = require("./Clothes");
const Electronics = require("./Electronics");

//
function runTests() {
  //
  const product1 = new AbstractProduct(
    "Футболка",
    "Удобная футболка для повседневной носки",
    25.99,
    100,
    [],
    ["image1.jpg", "image2.jpg"],
    "2023-07-29 12:30:00",
    "Nike",
    ["S", "M", "L"],
    "",
    "Хлопок",
    "Зеленый"
  );

  //
  const product2 = new AbstractProduct(
    "Куртка зимняя",
    "Удобная, теплая куртка  для зимнего времени",
    125.99,
    55,
    [],
    ["image3.jpg", "image4.jpg"],
    "2023-05-23 17:33:00",
    "Regatta",
    ["L", "XL", "XXL"],
    "",
    "Наполнитель: Холлофайбер",
    "Черный"
  );

  // Create a new instance of the 'ProductManager' class.
  const clothes = new Clothes();

}

// Launching a method (testing the program).
runTests();
