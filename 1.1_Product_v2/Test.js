const Clothes = require("./Clothes");
const Electronics = require("./Electronics");

function runTests() {
  const clothes = new Clothes();
  const electronics = new Electronics();

  const clothes1 = new Clothes(
    "Футболка",
    "Удобная футболка для повседневной носки",
    25.99,
    "Nike",
    ["S", "M", "L"],
    100,
    [],
    ["image1.jpg", "image2.jpg"],
    "Хлопок",
    "Синий"
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

  clothes.addProduct(clothes1);
  clothes.addProduct(clothes2);
  clothes.addProduct(clothes3);

  // electronics.addProduct(electronics1);
  // electronics.addProduct(electronics2);
  // electronics.addProduct(electronics3);

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
  console.log(`6. Список всех отзывов о продуктах: `, clothes.reviews);

  // Тестирование метода 'universalGetterSetter()'.
  testUniversalGetterSetter();

  // Функция тестирования.
  function testUniversalGetterSetter() {
    // Выбор продукта для тестирования метода.
    const product = clothes1;
    // Получение определенного свойства продукта.
    console.log(`7. У продукта '${product.name}' получаем значение его поля 'brand': '${product.universalGetterSetter("brand")}'`);
    // Переназначение определенного свойства продукта.
    product.universalGetterSetter("brand", "Adidas");
    //
    console.log(
      `8. После замены, у этого же продукта '${product.name}' новое значение поля 'brand': '${product.brand}'`
    );
  }

  // Get the last added review from the list of all reviews.
  function getLastReview() {
    const review = clothes.getLastReview();
    console.log(`5. Добавлен новый отзыв: `, review);
  }

  // Removes a product from the list of all products by the given ID.
  function removeProductById() {
    const productId = 3;
    clothes.deleteProduct(productId);
    console.log(
      `4. Оставшиеся продукты в списке продуктов после удаления продукта № ${productId}:`,
      clothes.products
    );
  }

  // Search for a product in the list of products based on its 'ID'.
  function findProductById() {
    const productId = 2;
    const productByID = clothes.getProductByID(productId);
    console.log(
      `3. Поиск продукта по значению его ID=${productId}:`,
      productByID
    );
  }

  // Sort products in the product list by 'price'.
  function sortProductsByPrice() {
    const sortByPrice = clothes.sortProducts("price");
    console.log(
      "2. Сортировка продуктов согласно значению их цены - по её возрастанию:",
      sortByPrice
    );
  }

  // Search for a products in the product list by its 'name'.
  function searchProductByName() {
    // Declare a variable used to look up a product.
    const nameOfProductForSearch = "Кур";
    // Products search using 'nameOfProductForSearch' value.
    const productList = clothes.products;
    // Get search result.
    const result1 = clothes.searchProducts(productList, nameOfProductForSearch);
    // Output result to console.
    console.log(
      `1. Результаты поиска продуктов по их названию - '${nameOfProductForSearch}':`,
      result1
    );
  }
}

runTests();
