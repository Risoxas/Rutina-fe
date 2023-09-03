import axios from 'axios';

const axiosInstance = axios.create({
    baseURL: process.env.BACKEND_URL || 'default_backend_url_here',
    timeout: 5000, // Optional: set a timeout limit for requests
    headers: {
        'Content-Type': 'application/json'
    }
});

export default axiosInstance;
