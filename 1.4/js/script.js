// Исчезновение квадрата при помощи способа CSS (display: none).
function hideByCSS(elementId) {
  document.getElementById(elementId).classList.add("hidden");
}
// Исчезновение квадрата при помощи способа JS (удаление элемента).
function hideByJS(elementId) {
  const element = document.getElementById(elementId);
  element.parentNode.removeChild(element);
}
// Исчезновение квадрата при помощи способа CSS+JS.
function hideByCSSJS(elementId) {
  const element = document.getElementById(elementId);
  element.classList.add("hidden");
  setTimeout(() => {
    element.classList.remove("hidden");
  }, 1000);
}

// 2. Исчезновение и появление блока при нажатии на определенной кнопки.
function toggleVisibility(elementId) {
  const element = document.getElementById(elementId);
  if (element.classList.contains("hidden")) {
    element.classList.remove("hidden");
  } else {
    element.classList.add("hidden");
  }
}

// 3. Скрытие/появление блока, состоящего из 5ти элементов с использованием определенной кнопки.
function toggleSquares() {
  const squares = document.querySelectorAll(".black-square");
  squares.forEach((square) => {
    square.classList.toggle("hidden");
  });
}

// 4. Одновременное управление отображением элементов, полученных при помощи введенных значений CSS-селекторов из инпута.
function toggleElementsBySelector() {
  // Получение значений CSS-селекторов из инпута.
  const selector = document.getElementById("selectorInput").value;

  // Получение списка элементов, соответствующих введенным селекторам.
  const elements = document.querySelectorAll(selector);

  // Одновременное переключение класса "hidden" для каждого элемента.
  elements.forEach((element) => {
    element.classList.toggle("hidden");
  });
}

// 5. Логика обработки нажатий на желтый квадрат.
let clickCount = 0;
function showGreeting(element) {
  clickCount++;
  if (clickCount === 1) {
    alert("Привет");
  } else if (clickCount === 2) {
    element.classList.add("hidden");
    clickCount = 0;
  }
}

// 6. Логика красного квадрата.
const hoverButton = document.getElementById("hoverButton");
const redSquare = document.getElementById("square7");
// Изначальное состояние - скрытие элемента.
redSquare.classList.add("hidden");
// Появление объекта, при наведении на определенную кнопку.
hoverButton.addEventListener("mouseenter", () => {
  redSquare.classList.remove("hidden");
});
// Скрытие объекта, при покидании курсором кнопки.
hoverButton.addEventListener("mouseleave", () => {
  redSquare.classList.add("hidden");
});

// 7. Логика зеленого прямоугольника.
const focusInput = document.getElementById("selectorInput");
const greenRectangle = document.getElementById("rectangle");
greenRectangle.classList.add("hidden");
// Слушатель события фокусировки на инпуте.
focusInput.addEventListener("focus", () => {
  greenRectangle.classList.remove("hidden");
});
// Слушатель события ввода текста в инпуте.
focusInput.addEventListener("input", (event) => {
  // Если в инпуте начат ввод текста -> скрытие зеленого прямоугольника.
  if (event.target.value.trim() !== "") {
    greenRectangle.style.display = "none";
  }
});

// 8. Инпут с возможностью введения ссылки на изображение и его предпросмотра.
function showImage() {
  // Получение URL изображения из инпута.
  const imageUrl = document.getElementById("imageInput").value;
  // Получение контейнера для изображения.
  const imageContainer = document.getElementById("imageContainer");
  // Создание элемента 'img' для изображения.
  const imgElement = document.createElement("img");
  imgElement.src = imageUrl;
  imgElement.classList.add("image-preview");
  // Очищаем контейнер и добавляем изображение.
  imageContainer.innerHTML = "";
  imageContainer.appendChild(imgElement);
}

// 9. Инпут с возможностью введения нескольких ссылок (каждая в новой строке) и их предпросмотра.
function showImagesFromTextarea() {
  // Получение URL изображений из инпута.
  const imageUrls = document.getElementById("imageTextarea").value.split("\n");
  // Получение контейнера для изображения.
  const imagesContainer = document.getElementById("imagesContainer");
  imagesContainer.innerHTML = "";

  imageUrls.forEach((url) => {
    // Создание элемента 'img' для изображения.
    const imgElement = document.createElement("img");
    imgElement.src = url;
    imgElement.classList.add("image-preview");
    imagesContainer.appendChild(imgElement);
  });
}

// 10. Получение и вывод фактических координат курсора в браузере.
document.addEventListener("mousemove", (event) => {
  const cursorCoordinates = document.getElementById("cursorCoordinates");
  const x = event.clientX;
  const y = event.clientY;
  cursorCoordinates.textContent = `X: ${x}, Y: ${y}`;
});

// 11. Получение и вывод значения предпочтительного языка в браузере.
const languageInfo = document.getElementById("languageInfo");
const browserLanguage = navigator.language;
languageInfo.textContent = `Language: ${browserLanguage}`;

// 12. Получение и вывод координат пользователя.
const locationInfo = document.getElementById("locationInfo");
navigator.geolocation.getCurrentPosition((position) => {
  const coordinates = {
    latitude: position.coords.latitude.toFixed(3),
    longitude: position.coords.longitude.toFixed(3),
  };
  // Заполнение блока информацией.
  locationInfo.textContent = `Location: Latitude: ${coordinates.latitude}, Longitude: ${coordinates.longitude}`;
});

// 13
// Сохранение введенных данных в localStorage
const localStorageBlock = document.getElementById("localStorageBlock");
localStorageBlock.textContent = localStorage.getItem("localStorageData") || "";
localStorageBlock.addEventListener("input", function () {
  localStorage.setItem("localStorageData", this.textContent);
});
// Сохранение введенных данных в cookies
const cookiesBlock = document.getElementById("cookiesBlock");
cookiesBlock.textContent = getCookie("cookiesData") || "";
cookiesBlock.addEventListener("input", function () {
  const cookieText = this.textContent;
  if (cookieText) {
    const cookiesData = getCookie("cookiesData");
    console.log("cookieText: " + cookieText);
    console.log("cookiesData: " + cookiesData);
    if (cookiesData) {
      // Удаляем старую куку
      document.cookie = `cookiesData=;expires=${new Date().toUTCString()};path=/`;
    }
    // Устанавливаем новую куку
    setCookie("cookiesData", cookieText, 365);
    console.log("++++++++++++++++");
  }
});
// Сохранение введенных данных в sessionStorage
const sessionStorageBlock = document.getElementById("sessionStorageBlock");
sessionStorageBlock.textContent =
  sessionStorage.getItem("sessionStorageData") || "";
sessionStorageBlock.addEventListener("input", function () {
  sessionStorage.setItem("sessionStorageData", this.textContent);
});
// Функция для получения cookie по имени
function getCookie(name) {
  const value = `; ${document.cookie}`;
  const parts = value.split(`; ${name}=`);
  if (parts.length === 2) return parts.pop().split(";").shift();
  return "";
}
// Функция для установки cookie
function setCookie(name, value, days) {
  const date = new Date();
  date.setTime(date.getTime() + days * 24 * 60 * 60 * 1000);
  const expires = `expires=${date}`;
  document.cookie = `${name}=${value}; ${expires}; path=/`;
}

