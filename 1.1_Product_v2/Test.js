const Clothes = require("./Clothes");
const Electronics = require("./Electronics");
// Test function.
function runTests() {
  const clothes = new Clothes();
  const electronics = new Electronics();
  const clothes1 = new Clothes(
    "Тельняшка",
    "Удобная нательная рубашка с рукавами для повседневной носки",
    25.99,
    "Armour-Lux",
    ["S", "M", "L"],
    100,
    [],
    ["image1.jpg", "image2.jpg"],
    "Хлопок",
    "Синий с белым"
  );

  const clothes2 = new Clothes(
    "Куртка зимняя",
    "Удобная, теплая куртка  для зимнего времени",
    125.99,
    "Regatta",
    ["L", "XL", "XXL"],
    55,
    [],
    ["image3.jpg", "image4.jpg"],
    "Наполнитель: Холлофайбер",
    "Черный"
  );

  const clothes3 = new Clothes(
    "Джинсы",
    "Комфортные джинсы для свободного времени",
    39.99,
    "Levi's",
    ["M", "L", "XL", "XXL"],
    80,
    [],
    ["image5.jpg"],
    "Деним",
    "Синий"
  );

  const electronics1 = new Electronics(
    "Телефон",
    "Мощный смартфон с хорошей камерой",
    599.99,
    "Samsung",
    50,
    [],
    ["image6.jpg", "image7.jpg"],
    2,
    10
  );

  const electronics2 = new Electronics(
    "Ноутбук",
    "Легкий и мощный ноутбук для работы",
    899.99,
    "HP",
    30,
    [],
    ["image8.jpg", "image9.jpg"],
    1,
    100
  );

  const electronics3 = new Electronics(
    "Телевизор",
    "Большой телевизор с отличным качеством изображения",
    349.99,
    "Sony",
    100,
    [],
    ["image10.jpg"],
    1,
    150
  );

  // Add the generated products to an array containing all products.
  clothes.addProduct(clothes1);
  clothes.addProduct(clothes2);
  clothes.addProduct(clothes3);
  // Add the generated products to an array containing all products.
  electronics.addProduct(electronics1);
  electronics.addProduct(electronics2);
  electronics.addProduct(electronics3);

  // Add a 'review' object to the 'reviews' array.
  clothes.addReview(
    "Куртка зимняя",
    "Alex",
    "2023-08-01 10:00:00",
    "Куртка отличного качества, теплая, полностью доволен!...",
    "10"
  );
  // Add a 'review' object to the 'reviews' array.
  clothes.addReview(
    "Джинсы",
    "Alex",
    "2023-08-01 11:25:00",
    "Отлично сидят на мне, свобоны в движении, носятся хорошо.",
    "10"
  );
  // Add a 'review' object to the 'reviews' array.
  electronics.addReview(
    "Ноутбук",
    "Alex",
    "2023-08-02 12:05:00",
    "Работает тихо. Тянет все мои игры. Немного греется, но не глючит.",
    "9"
  );
  // Add a 'review' object to the 'reviews' array.
  electronics.addReview(
    "Телевизор",
    "Alex",
    "2023-08-02 15:43:00",
    "Яркая, сочная картинка. Не ожидал такого. Отличный телик.",
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

  // Get all recently added reviews from the review lists of all product groups.
  getLastReview();

  // Get a list of all reviews.
  console.log(
    `6. Список всех отзывов о продуктах: `,
    clothes.reviews,
    electronics.reviews
  );

  // Testing the method 'universalGetterSetter()'.
  testUniversalGetterSetter();

  // Generic method testing function.
  function testUniversalGetterSetter() {
    // Selecting a product to test a method.
    const product = clothes1;
    // Retrieve a specific property of a product.
    console.log(
      `7. У продукта '${
        product.name
      }' получено значение его поля 'brand': '${product.universalGetterSetter(
        "brand"
      )}'`
    );
    // Reassigning a specific product property.
    product.universalGetterSetter("brand", "Adidas");
    console.log(
      `8. У этого же продукта '${product.name}' новое измененное значение поля 'brand': '${product.brand}'`
    );
  }

  // Get the last added review from the list of all reviews.
  function getLastReview() {
    const lastClothesReview = clothes.getLastReview();
    const lastElectronicsReview = electronics.getLastReview();
    console.log(
      `5. Добавленные последние отзывы, полученные из каждой группы: `,
      lastClothesReview,
      lastElectronicsReview
    );
  }

  // Removes a product from the list of all products by the given ID.
  function removeProductById() {
    const productIdToDelete = 5;
    clothes.deleteProduct(productIdToDelete);
    electronics.deleteProduct(productIdToDelete);
    console.log(
      `4. Оставшиеся продукты в списке продуктов после удаления продукта № ${productIdToDelete}:`,
      clothes.products,
      electronics.products
    );
  }

  // Search for a product in the list of products based on its 'ID'.
  function findProductById() {
    const productIdToFind = 5;
    const productFoundedByIDFromClothes =
      clothes.getProductByID(productIdToFind);
    const productFoundedByIDFromElectronics =
      electronics.getProductByID(productIdToFind);
    console.log(
      `3. Поиск продукта по значению его ID=${productIdToFind}:`,
      productFoundedByIDFromClothes,
      productFoundedByIDFromElectronics
    );
  }

  // Sort products in the product list by 'price'.
  function sortProductsByPrice() {
    const sortClothesByPrice = clothes.sortProducts("price");
    const sortElectronicsByPrice = electronics.sortProducts("price");
    console.log(
      "2. Сортировка продуктов каждой группы товаров согласно значению их цены - по её возрастанию:",
      sortClothesByPrice,
      sortElectronicsByPrice
    );
  }

  // Search for a products in the product list by its 'name'.
  function searchProductByName() {
    // Declare a variable used to look up a product.
    const nameOfProductForSearch = "Тел";
    // Products search using 'nameOfProductForSearch' value.
    const clothesProductList = clothes.products;
    const electronicsProductList = electronics.products;
    // Get search result.
    const result1 = clothes.searchProducts(
      clothesProductList,
      nameOfProductForSearch
    );
    const result2 = electronics.searchProducts(
      electronicsProductList,
      nameOfProductForSearch
    );
    // Output result to console.
    console.log(
      `1. Результаты поиска продуктов по их названию - '${nameOfProductForSearch}':`,
      result1,
      result2
    );
  }
}

runTests();
