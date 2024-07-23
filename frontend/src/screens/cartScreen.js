import { getProduct } from "../api.js";
import { getCartItems, setCartItems } from "../localStorage.js";
import { parseRequestUrl } from "../utils.js";

//add tocart function
const addToCart = (item, forceUpdate = false) => {
  let cartItems = getCartItems();
  const existItem = cartItems.find(
    (cartItem) => cartItem.product === item.product
  );

  if (existItem) {
    cartItems = cartItems.map((cartItem) =>
      cartItem.product === existItem.product ? item : cartItem
    );
  } else {
    cartItems = [...cartItems, item];
  }

  setCartItems(cartItems);
};

const CartScreen = {
  after_render: () => {},

  render: async () => {
    //use parseRequestUrl to access the request parameters
    const request = parseRequestUrl();

    //get product from the backend
    if (request.id) {
      const product = await getProduct(request.id);
      addToCart({
        product: product._id,
        name: product.name,
        image: product.image,
        price: product.price,
        countInStock: product.countInStock,
        qty: 1,
      });
    }

    return `<div>Cart Scre</div><div>${getCartItems().length}</div>`;
  },
};

export default CartScreen;
