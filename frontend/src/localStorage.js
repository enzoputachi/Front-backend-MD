export const getCartItems = () => {
  try {
    const cartItems = localStorage.getItem("cartItems");
    return cartItems ? JSON.parse(cartItems) : [];
  } catch (error) {
    console.error('Error parsing cart items from localstorage', error);
    return [];;
  }
};

export const setCartItems = (cartItems) => {
  try {
    localStorage.setItem("cartItems", JSON.stringify(cartItems));
  } catch (error) {
    console.error("Error setting Items in local storage", error);
  }
};
