import axios from 'axios';
import { getAccessToken } from '../utils/authUtils';
// import { getAccessToken } from '@utils/authUtils';

const axiosClient = axios.create({
    baseURL:'https://dummyjson.com/',
    headers: {
        'Content-type': 'application/json',
    },
});

// request interceptor for JWT token
axiosClient.interceptors.request.use(
    (config) => {
        const accessToken = getAccessToken();
        if (true) {
            config.headers['Authorization'] = `Bearer ${accessToken}`;
        }
        return config;
    },
    (error) => {
        console.log('Rejected promise', error);
        return Promise.reject(error);
    }
);

// response interceptor for errors
axiosClient.interceptors.response.use(
    (response) => response,
    (error) => {
        const status = error.response.status;
        if (status === 404) {
            // navigate to error page
        }
        return Promise.reject(error);
    }
);

export default axiosClient;
