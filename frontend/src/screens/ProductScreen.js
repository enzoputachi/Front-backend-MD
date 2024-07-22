import { getProduct } from "../api.js";
import { parseRequestUrl } from "../utils.js";

const ProductScreen = {
    render: async () => {  
        const request = parseRequestUrl();
        const product = await getProduct(request.id);
        return `
        <h1>${product.name}</h1>
        <img src="${product.image}" >
        `
    }
}

export default ProductScreen;