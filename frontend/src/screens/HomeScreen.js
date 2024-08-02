import axios from "axios";
import { hideLoading, showLoading } from "../utils.js";

const HomeScreen = {
  render: async () => {
    showLoading();
    // const { products } = data;
    const response = await axios({
      url: "http://localhost:5000/api/products",
      headers: {
        "Content-Type": "application/json",
      },
    });
    hideLoading();

    const products = response.data;

    return `
      <section id="hero">
        <img src="img/MD-banner/banner.jpg" alt="">
      </section>

      <section id="product1" class="section-p1">
        <h2>Featured Product</h2>
        <p>Summer Collection New Maiden Design</p>
        <div class="pro-container">
          ${products
            .map(
              (product) => `
              <div class="pro" data-id="${product._id}">
                <a href="/#/product/${product._id}">
                  <img src="${product.image}" alt="${product.name}">
                </a>
                <div class="des">
                  <span>${product.brand}</span>
                  <h5>${product.name}</h5>
                  <div></div>
                  <h4>$${product.price}</h4>
                </div>
              </div>
            `
            )
            .join("")}

        </div>
      </section>

      <section id="banner" class="section-m1">
        <img src="img/MD-banner/pay4.webp" alt="">
      </section>

      <section id="product1" class="section-p1">
        <h2>Featured Product</h2>
        <p>Summer Collection New Maiden Design</p>
        <div class="pro-container">
          ${products
            .map(
            (product) => `
            <div class="pro" data-id="${product._id}">
              <a href="/#/product/${product._id}">
                <img src="${product.image}" alt="${product.name}">
              </a>
              <div class="des">
                <span>${product.brand}</span>
                <h5>${product.name}</h5>
                <div></div>
                <h4>$${product.price}</h4>
              </div>
            </div>
          `
          ).join("")}
        </div>
      </section>

      <section id="newsletter" class="section-p1 section-m1">
        <div class="newstext">
          <h4>Sign Up for Newsletters</h4>
          <p>Get E-mail updates about our latest shop and <span>special offers</span></p>
        </div>
        <div class="form">
          <input type="text" placeholder="Your email addres">
          <button class="normal">Sign Up</button>
        </div>
      </section>

      <footer class="section-p1">
        <div class="col">
          <img class="logo" src="img/icon.png" alt="">
          <h4>Contact</h4>
          <p><strong>Address</strong>: No4 oshogbo road Miliken</p>
          <p><strong>Phone</strong>: No4 oshogbo road Miliken</p>
          <p><strong>Hours</strong>: No4 oshogbo road Miliken</p>

          <div class="follow">
            <h4>Follow us</h4>
            <div class="icon">
              <i class="fa-brands fa-facebook-f"></i>
              <i class="fa-brands fa-twitter"></i>
              <i class="fa-brands fa-instagram"></i>
              <i class="fa-brands fa-youtube"></i>
              <i class="fa-brands fa-pinterest-p"></i>
            </div>
          </div>
        </div>
        <div class="col">
          <h4>About</h4>
          <a href="#">About Us</a>
          <a href="">Delivery Information</a>
          <a href="">Privacy Policy</a>
          <a href="">terms & Conditions</a>
          <a href="">Contact Us</a>
        </div>

        <div class="col">
          <h4>My Account</h4>
          <a href="#">Sign In</a>
          <a href="">View Cart</a>
          <a href="">My Wishlist</a>
          <a href="">Track My Order</a>
          <a href="">Help</a>
        </div>

        <div class="col install">
          <h4>Install App</h4>
          <p>From app store or Google Play</p>
          <div class="row">
              <!-- <img src="img/pay/app.jpg" alt=""> -->
              <!-- <img src="img/pay/play.jpg" alt=""> -->
          </div>
          <p>Secured Payment Gateways</p>
          <!-- <img src="img/pay/pay.png" alt=""> -->
        </div>

        <div class="copyright">
          <p>@2024, Micah fashion ecommerce store</p>
        </div>
      </footer>
    `;
  },
};

export default HomeScreen;
