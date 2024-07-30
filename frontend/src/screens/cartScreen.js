import { getProduct } from "../api.js";
import { getCartItems, setCartItems } from "../localStorage.js";
import { parseRequestUrl, rerender } from "../utils.js";

//ADD TO CART//
const addToCart = (item, forceUpdate = false) => {
  let cartItems = getCartItems();
  const existItem = cartItems.find(
    (cartItem) => cartItem.product === item.product
  );

  if (existItem) {
    if (forceUpdate) {
      cartItems = cartItems.map((cartItem) =>
        cartItem.product === existItem.product ? item : cartItem
      );
    }
  } else {
    cartItems = [...cartItems, item];
  }

  setCartItems(cartItems);

  if(forceUpdate) {
    rerender(CartScreen);
  }

};

//*****************//
//REMOVE FROM CART//
//***************//
const removeFromCart = (id) => {
  //get item but filter out the id of deleted item
  setCartItems(getCartItems().filter((x) => x.product !== id));
  if (id === parseRequestUrl().id) {
    //redirect user to CartScreen
    document.location.hash = '/cart';
  } else {
    rerender(CartScreen);
  }
};

//*******************//
//DEFINE CART SCREEN//
//*****************//
const CartScreen = {
  after_render: () => {
    document.querySelectorAll('.qty-select').forEach(qtySelect => {
      qtySelect.addEventListener('change', (e) => {
        const item = getCartItems().find((x) => x.product === qtySelect.id);
        addToCart({ ...item, qty: Number(e.target.value) }, true);
      });
    });

    // add event listener to the remove buttons
    document.querySelectorAll('.delete-button').forEach(removeButton => {
      removeButton.addEventListener('click', () => {
        removeFromCart(removeButton.id);
      });
    });

    document.getElementById("checkout-button").addEventListener("click", () => {
      document.location.hash = '/signin'
    })
  },

  render: async () => {
    // use parseRequestUrl to access the request parameters
    const request = parseRequestUrl();

    // get product from the backend
    if (request.id) {
      try {
        const product = await getProduct(request.id);
        addToCart({
          product: product._id,
          name: product.name,
          image: product.image,
          price: product.price,
          countInStock: product.countInstock,
          qty: 1,
        });
      } catch (error) {
        console.log('Error fetching product:', error);
      }
    }

    const cartItems = getCartItems();

    return `
      <section id="page-header"></section>
      <div class="cart">
        <div class="cart-list">
          <ul class="cart-list-container">
            <li>
              <h3>Shopping Cart</h3>
            </li>
            ${
              cartItems.length === 0?
              '<div>Cart is empty. <a href="/#/">Go shopping</a>':
              cartItems.map(item => `
                <li>
                  <div class="cart-image">
                    <img src="${item.image}" alt="${item.name}" />
                  </div>
                  <div class="cart-name">
                    <div>
                      <a href="/#/product/${item.product}">
                        ${item.name}
                      </a>
                    </div>
                    <div>
                      Qty: <select class="qty-select" id="${item.product}">
                        ${[...Array(item.countInStock).keys()].map((x) => 
                          item.qty === x + 1 
                          ? `<option selected value="${x + 1}">${x + 1}</option>`
                          :`<option value="${x + 1}">${x + 1}</option>`
                          ).join('')}
                      </select>
                      <button type="button" class="white delete-button" id="${item.product}">
                        Delete
                      </button>
                    </div>
                  </div>
                  <div class="cart-price">
                    $${item.price}
                  </div>
                </li>
              `).join('')
            }
          </ul>
        </div>
        <div class="cart-action">
          <h3>
            Subtotal (${cartItems.reduce((a, c) => a +c.qty, 0)} item(s))
            : 
            $${cartItems.reduce((a, c) => a + c.price * c.qty, 0)}
          </h3>
          <br>
          <button id="checkout-button" class="white fw">
            Proceed to Checkout
          </button>
        </div>
      </div> 
    `;
  },
};

export default CartScreen;
