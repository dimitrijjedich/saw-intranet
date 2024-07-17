import axios from 'axios';

const APIEndpoint = axios.create({
    baseURL: 'http://localhost:8000/api',
});

export const getAllUsers = async () => {
    const response = await APIEndpoint.get('/users');
    return response.data;
};
