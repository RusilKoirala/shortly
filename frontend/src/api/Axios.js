import axios from 'axios';

const instance = axios.create({
    baseURL: 'http://localhost:5000/api', 
    withCredentials: true, // LETSSSS EAT SOME COOKIES

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

