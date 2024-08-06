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

export const setUserInfo = ({
  _id = '',
  name = '',
  email = '',
  password = '',
  token = '',
  isAdmin = false,
}) => {
  localStorage.setItem(
    'userInfo', 
    JSON.stringify({
      _id,
      name,
      email,
      password,
      token,
      isAdmin,
    })
  );
}


export const clearUser = () => {
  localStorage.removeItem('userInfo');
}


export const getUserInfo = () => {
  return localStorage.getItem('userInfo')
  ? JSON.parse(localStorage.getItem('userInfo'))
  : {name:'', email:'', password:''}
}

//define func to getShipping
export const getShipping = () => {
  const shipping = localStorage.getItem('shipping')
  ? JSON.parse(localStorage.getItem('shipping'))
  : {
      address: '',
      city:'',
      postalCode: '',
      country: '',
    };
  return shipping;
};

export const setShipping = ({
  address = '',
  city = '',
  postalCode = '',
  country = '',
}) => {
  localStorage.setItem(
    'shipping',
    JSON.stringify(address, city, postalCode, country) 
  );
};