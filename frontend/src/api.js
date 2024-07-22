import { apiUrl } from "./config.js";
import axios from 'axios';

export const getProduct = async (id) => {
    try {
        const url = `${apiUrl}/api/products/${id}`;
        console.log(`fetching from URL: ${url}`)
        const response = await axios({
            url: url,
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            }
        });

        return response.data;

    } catch (error) {
        console.log(error);
        return {error: error.message};
    }
};