import axios from 'axios';

const API = axios.create({
    baseURL: 'http://localhost:5000',
});

// Automatically add the Access Token to every request
API.interceptors.request.use((req) => {
    const token = localStorage.getItem('accessToken');
    if (token) {
        req.headers.Authorization = `Bearer ${token}`;
    }
    return req;
});

export const login = (formData) => API.post('/auth/login', formData);
export const fetchCases = () => API.get('/cases');