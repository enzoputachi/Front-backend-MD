import { getProduct } from "../api.js";
import { hideLoading, parseRequestUrl, showLoading } from "../utils.js";

const ProductScreen = {
  render: async () => {
    const request = parseRequestUrl();
    showLoading();
    const product = await getProduct(request.id);
    if (product.error) {
      return `<div>${product.error}</div>`;
    }
    hideLoading();
    
    return `
        <section id="prodetails" class="section-p1">
            <div class="single-pro-image">
                <img src="${product.image}" width="100%" id="MainImg" alt="${product.name}">
            </div>
            <div class="single-pro-details">
            <h6>${product.brand}</h6>
            <h4>${product.name}</h4>
            <h2>$${product.price}</h2>
            <select name="" id="">
                <option value="">Select Size</option>
                <option value="">XL</option>
                <option value="">XXL</option>
                <option value="">Small</option>
                <option value="">Large</option>
            </select>
            <input type="number" value="1" min="0">
            <button class="normal" id="add-to-cart">Add To Cart</button>
            <h4>Product Details</h4>
            <span>
                Lorem ipsum, dolor sit amet consectetur adipisicing elit.
                Similique eum alias sequi provident et voluptatem labore
                dolorum necessitatibus perspiciatis. Ullam quisquam nihil porro!
                Accusamus, nesciunt voluptas. Omnis quaerat
                voluptatibus sapiente?
            </span>
        </div>
        </section>
        `;
  },

  after_render: () => {
    const request = parseRequestUrl();
    document.getElementById("add-to-cart").addEventListener("click", () => {
      document.location.hash = `/cart/${request.id}`;
    });
  },
};

export default ProductScreen;
