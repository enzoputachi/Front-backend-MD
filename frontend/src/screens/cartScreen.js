import { getProduct } from "../api.js";
import { getCartItems, setCartItems } from "../localStorage.js";
import { parseRequestUrl, rerender } from "../utils.js";

// add to cart function
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
  if (forceUpdate) {
    rerender(CartScreen);
  }
};

const removeFromCart = (id) => {
  setCartItems(getCartItems().filter((x) => x.product !== id));
  if (id === parseRequestUrl().id) {
    document.location.hash = '/cart';
  } else {
    rerender(CartScreen);
  }
};

const CartScreen = {
  after_render: () => {
    document.querySelectorAll('.qty-select').forEach(qtySelect => {
      qtySelect.addEventListener('change', (e) => {
        const item = getCartItems().find((x) => x.product === qtySelect.id);
        addToCart({ ...item, qty: Number(e.target.value) }, true);
      });
    });

    // add event listener to the remove buttons
    document.querySelectorAll('.remove-btn').forEach(removeButton => {
      removeButton.addEventListener('click', () => {
        removeFromCart(removeButton.id);
      });
    });
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
          countInStock: product.countInStock,
          qty: 1,
        });
      } catch (error) {
        console.log('Error fetching product:', error);
      }
    }

    const cartItems = getCartItems();

    return `
      <section id="page-header"></section>
      <section id="cart" class="section-p1">
        <table width="100%">
          <thead>
            <tr>
              <td>Remove</td>
              <td>Images</td>
              <td>Product</td>
              <td>Price</td>
              <td>Quantity</td>
              <td>Subtotal</td>
            </tr>
          </thead>
          <tbody>
            ${
              cartItems.length === 0
                ? `<tr><td colspan="6">Cart is empty.</td></tr>`
                : cartItems.map(item => `
                  <tr>
                    <td><button class="remove-btn" id="${item.product}"><i class="fa-regular fa-circle-xmark"></i></button></td>
                    <td><img src="${item.image}" alt="${item.name}"></td>
                    <td>${item.name}</td>
                    <td>$${item.price}</td>
                    <td>
                      <input type="number" class="qty-select" id="${item.product}" value="${item.qty}" min="1" max="${item.countInStock}">
                    </td>
                    <td>$${item.price * item.qty}</td>
                  </tr>
                `).join('\n')
            }
          </tbody>
        </table>
      </section>
    `;
  },
};

export default CartScreen;
