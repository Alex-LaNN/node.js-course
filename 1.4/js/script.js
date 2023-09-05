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
