import HomeScreen from "./src/screens/HomeScreen";

const router = () => {
  const main = document.querySelectorAll(".pro-container");
  if (main.length > 0) {
    main.forEach((element) => {
      element.innerHTML = HomeScreen.render();
    });
  } else {
    console.log("Element with class pro-container not found");
  }
};

window.addEventListener("load", router);
