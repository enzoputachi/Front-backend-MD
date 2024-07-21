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
    (request.resource ? `/${request.resource}` : '/') +
    (request.id ? '/:id': '') +
    (request.action ? `/${request.resource}` : '')

  const screen = routes[parseUrl] ? routes[parseUrl] : Error404Screen;
  
  const main = document.getElementById("main");
  main.innerHTML = screen.render();
}

window.addEventListener("load", router);
window.addEventListener('hashchange', router);
