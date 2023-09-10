// Disappearing a square using CSS (display: none).
function hideByCSS(elementId) {
  document.getElementById(elementId).classList.add("hidden");
}
// Disappearing a square using the JS method (removing an element).
function hideByJS(elementId) {
  const element = document.getElementById(elementId);
  element.parentNode.removeChild(element);
}
// Disappearing a square using the CSS+JS method.
let clickCount1 = 0;
function hideByCSSJS(elementId) {
  const element = document.getElementById(elementId);
  element.classList.add("hidden");
  //  )))...
  clickCount1++;
  if (clickCount1 === 1) {
    setTimeout(() => {
      element.classList.remove("hidden");
    }, 2000);
  } else if (clickCount1 === 2) {
    element.parentNode.removeChild(element);
  }
}

// 2. Disappearance and appearance of a block when a certain button is pressed.
function toggleVisibility(elementId) {
  const element = document.getElementById(elementId);
  if (element.classList.contains("hidden")) {
    element.classList.remove("hidden");
  } else {
    element.classList.add("hidden");
  }
}

// 3. Hide/appear a block consisting of all 5 elements using a specific button.
function toggleSquares() {
  const squares = document.querySelectorAll(".black-square");
  squares.forEach((square) => {
    square.classList.toggle("hidden");
  });
}

// 4. Simultaneously control the display of elements obtained using the entered values of their CSS selectors from the input.
function toggleElementsBySelector() {
  // Get CSS selector values from input.
  const selector = document.getElementById("selectorInput").value;
  // Retrieving a list of elements matching the entered selectors.
  const elements = document.querySelectorAll(selector);
  // Simultaneously switch the "hidden" class for selected elements.
  elements.forEach((element) => {
    element.classList.toggle("hidden");
  });
}

// 5. Logic for processing clicks on the yellow square.
let clickCount2 = 0;
function showGreeting(element) {
  clickCount2++;
  if (clickCount2 === 1) {
    alert("Привет");
  } else if (clickCount2 === 2) {
    element.classList.add("hidden");
    clickCount2 = 0;
  }
}

// 6. Logic used for the red square.
const hoverButton = document.getElementById("hoverButton");
const redSquare = document.getElementById("square7");
// The initial state is hiding the element.
redSquare.classList.add("hidden");
// An object appears when you hover over a specific button.
hoverButton.addEventListener("mouseenter", () => {
  redSquare.classList.remove("hidden");
});
// Hiding an object when the cursor leaves the button.
hoverButton.addEventListener("mouseleave", () => {
  redSquare.classList.add("hidden");
});

// 7. Logic used for the green square.
const focusInput = document.getElementById("selectorInput");
const greenRectangle = document.getElementById("rectangle");
greenRectangle.classList.add("hidden");
// Input focus event listener.
focusInput.addEventListener("focus", () => {
  greenRectangle.classList.remove("hidden");
});
// Listener for the text input event in the input.
focusInput.addEventListener("input", (event) => {
  // If text input is started in the input -> hide the green rectangle.
  if (event.target.value.trim() !== "") {
    greenRectangle.style.display = "none";
  }
});

// 8. Input with the ability to enter a link to an image and preview it.
function showImage() {
  // Getting the image URL from the input.
  const imageUrl = document.getElementById("imageInput").value;
  // Gets the container for the image.
  const imageContainer = document.getElementById("imageContainer");
  // Creates an 'img' element for an image.
  const imgElement = document.createElement("img");
  imgElement.src = imageUrl;
  imgElement.classList.add("image-preview");
  // Clearing the container and adding an image.
  imageContainer.innerHTML = "";
  imageContainer.appendChild(imgElement);
}

// 9. Input with the ability to enter several links to images (each on a new line) and preview them.
function showImagesFromTextarea() {
  // Getting image URLs from input.
  const imageUrls = document.getElementById("imageTextarea").value.split("\n");
  // Getting the container for the image.
  const imagesContainer = document.getElementById("imagesContainer");
  // Emptying the contents of the container.
  imagesContainer.innerHTML = "";

  // Create an 'img' element for each image from the resulting list.
  imageUrls.forEach((url) => {
    const imgElement = document.createElement("img");
    imgElement.src = url;
    imgElement.classList.add("image-preview");
    imagesContainer.appendChild(imgElement);
  });
}

// 10. Receiving and displaying the actual cursor coordinates in the browser.
document.addEventListener("mousemove", (event) => {
  const cursorCoordinates = document.getElementById("cursorCoordinates");
  const x = event.clientX;
  const y = event.clientY;
  cursorCoordinates.textContent = `X: ${x}, Y: ${y}`;
});

// 11. Get and display the preferred language value in the browser.
const languageInfo = document.getElementById("languageInfo");
const browserLanguage = navigator.language;
languageInfo.textContent = `Language: ${browserLanguage}`;

// 12. Receiving and displaying user coordinates.
const locationInfo = document.getElementById("locationInfo");
navigator.geolocation.getCurrentPosition((position) => {
  const coordinates = {
    latitude: position.coords.latitude.toFixed(3),
    longitude: position.coords.longitude.toFixed(3),
  };
  // Filling a block with information.
  locationInfo.textContent = `Location: Latitude: ${coordinates.latitude}, Longitude: ${coordinates.longitude}`;
});

// 13.
// Saving entered data in localStorage.
const localStorageBlock = document.getElementById("localStorageBlock");
localStorageBlock.textContent = localStorage.getItem("localStorageData") || "";
localStorageBlock.addEventListener("input", function () {
  localStorage.setItem("localStorageData", this.textContent);
});
// Saving entered data in cookies.
const cookiesBlock = document.getElementById("cookiesBlock");
cookiesBlock.textContent = getCookie("cookiesData") || "";
cookiesBlock.addEventListener("input", function () {
  const cookieText = this.textContent;
  if (cookieText) {
    const cookiesData = getCookie("cookiesData");
    if (cookiesData) {
      // Delete the old cookie.
      document.cookie = `cookiesData=;expires=${new Date().toUTCString()};path=/`;
    }
    // Set a new cookie.
    setCookie("cookiesData", cookieText, 365);
  }
});
// Saving entered data in sessionStorage.
const sessionStorageBlock = document.getElementById("sessionStorageBlock");
sessionStorageBlock.textContent =
  sessionStorage.getItem("sessionStorageData") || "";
sessionStorageBlock.addEventListener("input", function () {
  sessionStorage.setItem("sessionStorageData", this.textContent);
});
// Function for getting cookies by name.
function getCookie(name) {
  const value = `; ${document.cookie}`;
  const parts = value.split(`; ${name}=`);
  if (parts.length === 2) return parts.pop().split(";").shift();
  return "";
}
// Function to set a cookie.
function setCookie(name, value, days) {
  const date = new Date();
  date.setTime(date.getTime() + days * 24 * 60 * 60 * 1000);
  const expires = `expires=${date}`;
  document.cookie = `${name}=${value}; ${expires}; path=/`;
}

// 14. Button to go to the top of the page.
const scrollToTopButton = document.getElementById("scrollToTopButton");

// Add a listener for the window scroll event.
window.addEventListener("scroll", () => {
  // Check if the vertical scroll position is greater than 100 pixels.
  if (window.scrollY > 100) {
    // Displays a button to scroll the window up.
    scrollToTopButton.classList.remove("hidden");
  } else {
    // Continue hiding the button.
    scrollToTopButton.classList.add("hidden");
  }
});

// Function for scrolling the page up with smooth animation.
function scrollToTop() {
  window.scrollTo({
    top: 0, // Scrolls the page up to the top of the browser window.
    behavior: "smooth", // Add smooth animation.
  });
}

// 15. Two blocks: one inside the other, causing 'alert'.
// Function to display a popup window with a message.
function showAlert(message) {
  alert(message);
}
// Function to stop event propagation.
function stopPropagation(event) {
  event.stopPropagation();
}

// 16. Prohibition of page scrolling.
const overlay = document.getElementById("overlay");
const showOverlayButton = document.getElementById("showOverlayButton");
// Add a "click" event listener for the "showOverlayButton" button.
showOverlayButton.addEventListener("click", () => {
  // Remove the "hidden" class from the "overlay" element to display it.
  overlay.classList.remove("hidden");
  // Freeze page scrolling.
  document.body.style.overflow = "hidden";
});
// Function to hide the overlay and restore page scrolling.
function hideOverlay() {
  // Add a "hidden" class to the "overlay" element to hide it.
  overlay.classList.add("hidden");
  // Restore page scrolling.
  document.body.style.overflow = "auto";
}

// 18. Stylish input.
// Function to handle file selection.
function handleFileSelect(event) {
  // Get the selected file from the event.
  const file = event.target.files[0];
}
