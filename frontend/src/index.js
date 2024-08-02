//update the screen based on the url
import Header from "./components/Header.js";
import CartScreen from "./screens/CartScreen.js";
import Error404Screen from "./screens/Error404Screen.js";
import HomeScreen from "./screens/HomeScreen.js";
import ProductScreen from "./screens/ProductScreen.js";
import SigninScreen from "./screens/SigninScreen.js";
import { parseRequestUrl } from "./utils.js";

const routes = {
  "/": HomeScreen,
  "/product/:id": ProductScreen,
  '/cart/:id': CartScreen,
  '/cart': CartScreen,
  '/signin': SigninScreen,
}

const router = async () => {
  const request = parseRequestUrl();
  console.log('parsed request:', request)
  const parseUrl = 
    (request.resource ? `/${request.resource}` : '/') +
    (request.id ? '/:id' : '') +
    (request.action ? `${request.action}` : '')
    console.log('parsed url:', parseUrl);

  const screen = routes[parseUrl] ? routes[parseUrl] : Error404Screen;

  // Header
  const header = document.getElementById('header-container');
  header.innerHTML = await Header.render();
  await Header.after_render();

  // Main
  const main = document.getElementById("main");
  main.innerHTML = await screen.render();

  if (typeof screen.after_render === 'function') {
    await screen.after_render();
  } else {
    console.warn('after_render is not a function for this screen.');
  }
}

window.addEventListener("load", router);
window.addEventListener('hashchange', router);
