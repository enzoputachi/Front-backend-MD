import { apiUrl } from "./config.js";
import axios from 'axios';
import { getUserInfo } from "./localStorage.js";

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

    } catch (error) {
        console.log(error);
        return {error: error.response.data.message || error.message};
    }
};

// Sign in function
export const signin = async ({ email, password }) => {
    try {
        const response = await axios({
            url: `${apiUrl}/api/users/signin`,
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            data: {
                email,
                password,
            },
        });

        if(response.statusText !== 'OK') {
            throw new Error(response.data.message);
        }

        return response.data;

    } catch (error) {
        console.log(error);
        return { error: error.response?.data?.message || error.message }
    }
}

// Register function
export const register = async ({ name, email, password }) => {
    
    //Send HTTP request using Axios
    try {
        const response = await axios({
            url: `${apiUrl}/api/users/register`,
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            data: { name, email, password, },
        });

        if(response.statusText !== 'OK') {
            throw new Error(response.data.message);
        }

        return response.data;

    } catch (error) {
        console.log(error);
        return { error: error.response?.data?.message || error.message }
    }
}

export const update = async ({ name, email, password }) => {
    
    //Send HTTP request using Axios
    try {
        const {_id, token} = getUserInfo();

        const response = await axios({
            url: `${apiUrl}/api/users/${_id}`,
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${token}`,
            },
            data: { name, email, password, },
        });

        if(response.statusText !== 'OK') {
            throw new Error(response.data.message);
        }

        return response.data;

    } catch (error) {
        console.log(error);
        return { error: error.response?.data?.message || error.message }
    }
}