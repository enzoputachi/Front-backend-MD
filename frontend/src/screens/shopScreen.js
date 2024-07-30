import axios from 'axios';

const ShopScreen = {
    //send an ajax request to the backend to get product details
    render: async () => {
        const response = await axios({
            url: "http://localhost:5000/api/products",
            header: {
                'Content-Type': 'application/json',
            }
        })


        const products = response.data;

        return `
            
        `
    }
}