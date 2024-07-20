import data from "../../data";

const HomeScreen = {
  render: () => {
    const { products } = data;
    return `
      <div class="pro-container">
          ${products
            .map(
              (product) => `
              <div class="pro" data-id="${product._id}">
                <img src="${product.image}" alt="${product.name}">
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
    `;
  },
};

export default HomeScreen;
