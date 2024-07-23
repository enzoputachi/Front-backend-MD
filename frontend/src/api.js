import { apiUrl } from "./config.js";
import axios from 'axios';

export const getProduct = async (id) => {
    try {
        //send an ajax request to the backend to get product
        const url = `${apiUrl}/api/products/${id}`;
        const response = await axios({
            url: url,
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            }
        });

        if (response.statusText !== 'OK') {
            throw new Error(response.data.message);
        }

        return response.data;

    } catch (err) {
        console.log(err);
        return {error: err.response.data.message || err.message};
    }
};