import axios from 'axios';

// Use Vite environment variable for API base URL in production (Netlify). Fallback to local backend for dev.
const API_BASE = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

const instance = axios.create({
    baseURL: API_BASE,
    withCredentials: true, // allow cookies to be sent between frontend and backend

})

instance.interceptors.request.use(
    (config) => {
        // You can add any headers or modify the request here
        config.headers['Content-Type'] = 'application/json';
        return config;
    },
    (error) => {
        // Handle request error
        return Promise.reject(error);
    }
);

instance.interceptors.response.use(
    (response) => {
        // You can modify the response here if needed
        return response;
    },
    (error) => {
        // Handle response error
        if (error.response && error.response.status === 401) {
            // Handle unauthorized access, e.g., redirect to login
            console.error('Unauthorized access - redirecting to login');
        }
        return Promise.reject(error);
    }
);

export default instance;

