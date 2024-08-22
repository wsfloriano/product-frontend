import axios from 'axios';

const API_URL = 'http://localhost:8001/products';

export const getProducts = async (search = '', page = 1, limit = 10) => {
    try {
        const response = await axios.get(API_URL, {
            params: { search, page, limit },
        });
        return response.data.items;
    } catch (error) {
        console.error('Error fetching products:', error);
        return [];
    }
};

export const getProductById = async (id: number) => {
    const response = await axios.get(`${API_URL}/${id}`);
    return response.data;
};

export const createProduct = async (product: FormData) => {
    const response = await axios.post(API_URL, product, {
        headers: { 'Content-Type': 'multipart/form-data' },
    });
    return response.data;
};

export const updateProduct = async (id: number, product: FormData) => {
    const response = await axios.put(`${API_URL}/${id}`, product, {
        headers: { 'Content-Type': 'multipart/form-data' },
    });
    return response.data;
};

export const deleteProduct = async (id: number) => {
    await axios.delete(`${API_URL}/${id}`);
};
