import Error404Screen from "./src/screens/Error404Screen";
import HomeScreen from "./src/screens/HomeScreen";
import ProductScreen from "./src/screens/ProductScreen";
import { parseRequestUrl } from "./utils";

const routes = {
  "/": HomeScreen,
  "/product/:id": ProductScreen,
}

const router = () => {
  const request = parseRequestUrl();
  const parseUrl =
    (request.resource ? `/${request.resource}` : `/`) +
    (request.id ? '/:id' : '') + 
    (request.verb ? `/${request.verb}` : '')

  console.log('The parseUrl: ', parseUrl)
  const screen = routes[parseUrl] ? routes[parseUrl] : Error404Screen;

  const main = document.getElementById("main");
  main.innerHTML = screen.render();
  // if (main.length > 0) {
  //   main.forEach((element) => {
  //     element.innerHTML = screen.render();
  //   });
  // } else {
  //   console.log("Element with class pro-container not found");
  // }
};

window.addEventListener("load", router);
window.addEventListener('hashchange', router);
