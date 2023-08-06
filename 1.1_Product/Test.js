const Product = require("./Product");
const ProductManager = require("./ProductManager");

// For testing.
function runTests() {
  // Data entry in the corresponding variable about the first product.
  const product1 = new Product(
    "Футболка",
    "Удобная футболка для повседневной носки",
    25.99,
    "Nike",
    ["S", "M", "L"],
    100,
    "2023-07-29 12:30:00",
    [],
    ["image1.jpg", "image2.jpg"]
  );

  // Data entry in the corresponding variable about the second product.
  const product2 = new Product(
    "Рубашка",
    "Элегантная рубашка для офисного стиля",
    49.99,
    "Hugo Boss",
    ["M", "L", "XL"],
    50,
    "2023-07-30 09:15:00",
    [],
    ["image3.jpg", "image4.jpg"]
  );

  // Data entry in the corresponding variable about the third product.
  const product3 = new Product(
    "Носки",
    "Удобные носки для спорта",
    10.59,
    "Adidas",
    ["S", "M", "L"],
    200,
    "2023-07-31 15:30:00",
    [],
    ["image5.jpg"]
  );

  // Data entry in the corresponding variable about the fourth product.
  const product4 = new Product(
    "Штаны",
    "Повседневные джинсы для активного образа жизни",
    59.99,
    "Levi's",
    ["S", "M", "L", "XL"],
    75,
    "2023-08-01 10:00:00",
    [],
    ["image6.jpg", "image7.jpg"]
  );

  // Data entry in the corresponding variable about the fifth product.
  const product5 = new Product(
    "Штанга",
    "Штанга для занятия спортом и укрепления мышц тела",
    149.99,
    "Alex_&_co",
    ["10", "15", "25", "50"],
    15,
    "2023-08-01 10:00:00",
    [],
    ["image6.jpg", "image7.jpg"]
  );

  // Create a new instance of the 'ProductManager' class.
  const productManager = new ProductManager();

  // Add the generated products to an array containing all products.
  productManager.addProduct(product1);
  productManager.addProduct(product2);
  productManager.addProduct(product3);
  productManager.addProduct(product4);
  productManager.addProduct(product5);
  // Add a 'review' object to the 'reviews' array.
  productManager.addReview(
    "Рубашка",
    "Alex",
    "2023-08-01 10:00:00",
    "Рубашка отличного качества, полностью доволен!...",
    "10"
  );
  // Add a 'review' object to the 'reviews' array.
  productManager.addReview(
    "Носки",
    "Alex",
    "2023-08-01 11:00:00",
    "Носки достаточно теплые, покупкой доволен!...",
    "10"
  );

  // Search for a product in the product list by its 'name'.
  searchProductByName();

  // Sort products in the product list by 'price'.
  sortProductsByPrice();

  // Search for a product in the list of products based on its 'ID'.
  findProductById();

  // Removing a product from the product list by its 'ID'.
  removeProductById();

  // Get the last added review from the list of all reviews.
  getLastReview();

  // Get a list of all reviews.
  console.log(`6. Список всех отзывов о продуктах: `, productManager.reviews);

  // Get the last added review from the list of all reviews.
  function getLastReview() {
    const review = productManager.getLastReview();
    console.log(`5. Добавлен новый отзыв: `, review);
  }

  // Removes a product from the list of all products by the given ID.
  function removeProductById() {
    const productId = 3;
    productManager.deleteProduct(productId);
    console.log(
      `4. Оставшиеся продукты в списке продуктов после удаления из него продукта № ${productId}:`,
      productManager.products
    );
  }

  // Search for a product in the list of products based on its 'ID'.
  function findProductById() {
    const numberId = 2;
    const productByID = productManager.getProductByID(numberId);
    console.log(
      `3. Поиск продукта по значению его ID=${numberId}:`,
      productByID
    );
  }

  // Sort products in the product list by 'price'.
  function sortProductsByPrice() {
    const sortByPrice = productManager.sortProducts("price");
    console.log(
      "2. Сортировка продуктов согласно значению их цены - по её возрастанию:",
      sortByPrice
    );
  }

  // Search for a products in the product list by its 'name'.
  function searchProductByName() {
    // Declare a variable used to look up a product.
    const nameOfProductForSearch = "шта";
    // Products search using 'nameOfProductForSearch' value.
    const productList = productManager.products;
    // Get search result.
    const result1 = productManager.searchProducts(
      productList,
      nameOfProductForSearch
    );
    // Output result to console.
    console.log(
      `1. Результаты поиска продуктов по их названию - '${nameOfProductForSearch}':`,
      result1
    );
  }
}

// Launching a method (testing the program).
runTests();
