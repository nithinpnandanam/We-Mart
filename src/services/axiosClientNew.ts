import axios from 'axios';
import { getAccessToken } from '@/utils/authUtils';
import { navigateTo } from '@/utils/navigationHelper';
// import { getAccessToken } from '@utils/authUtils';

const axiosClientNew = axios.create({
    baseURL:'http://localhost:7777/',
    headers: {
        'Content-type': 'application/json',
    },
});

// request interceptor for JWT token
axiosClientNew.interceptors.request.use(
    (config) => {
        const accessToken = getAccessToken();
        if (accessToken) {
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
axiosClientNew.interceptors.response.use(
    (response) => response,
    async (error) => {
      const originalRequest = error.config;
      if (error.response?.status === 401 && !originalRequest._retry) {
        originalRequest._retry = true;
  
        const refreshToken = localStorage.getItem("refreshToken");
        if (refreshToken) {
          try {
            const res = await axios.post("api for getting refresh token", {
              refreshToken,
            });
  
            const newAccessToken = res.data.accessToken;
  
            localStorage.setItem("accessToken", newAccessToken);
            originalRequest.headers.Authorization = `Bearer ${newAccessToken}`;
  
            return axiosClientNew(originalRequest); // Retry with new token
          } catch (refreshError) {
            console.error("Refresh token expired. Logging out.");
            localStorage.clear(); 
            navigateTo("/login");
            return Promise.reject(refreshError);
          }
        }
      }
  
      return Promise.reject(error);
    }
  );
  
  export default axiosClientNew;

  

