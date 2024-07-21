import data from "../../../backend/data";

const HomeScreen = {
  render: () => {
    const { products } = data;
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
          ).join("")}

        </div>
      </section>

      <section id="banner" class="section-m1">
        <img src="img/MD-banner/pay4.webp" alt="">
      </section>

      <section id="product1" class="section-p1">
        <h2>Hot arrivals</h2>
        <p>Danshiki Collection New Maiden Design</p>
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
    `;
  },
};

export default HomeScreen;
