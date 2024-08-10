//update the screen based on the url
import Header from "./components/Header.js";
import CartScreen from "./screens/CartScreen.js";
import Error404Screen from "./screens/Error404Screen.js";
import HomeScreen from "./screens/HomeScreen.js";
import OrderScreen from "./screens/OrderScreen.js";
import PaymentScreen from "./screens/PaymentScreen.js";
import PlaceOrderScreen from "./screens/PlaceOrderScreen.js";
import ProductScreen from "./screens/ProductScreen.js";
import ProfileScreen from "./screens/ProfileScreen.js";
import RegisterScreen from "./screens/RegisterScreen.js";
import ShippingScreen from "./screens/ShippingScreen.js";
import SigninScreen from "./screens/SigninScreen.js";
import { hideLoading, parseRequestUrl, showLoading } from "./utils.js";

const routes = {
  "/": HomeScreen,
  "/product/:id": ProductScreen,
  "/order/:id": OrderScreen,
  '/cart/:id': CartScreen,
  '/cart': CartScreen,
  '/signin': SigninScreen,
  '/register': RegisterScreen,
  '/profile': ProfileScreen,
  '/shipping': ShippingScreen,
  '/payment': PaymentScreen,
  '/placeorder': PlaceOrderScreen,
}

const router = async () => {
  showLoading();
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
  if(screen.after_render) await screen.after_render();
  hideLoading();
}

window.addEventListener("load", router);
window.addEventListener('hashchange', router);
