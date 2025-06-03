import axios from 'axios';
import { getAccessToken } from '@/utils/authUtils';
import { navigateTo } from '@/utils/navigationUtils';
import paths from '@/router/routes';
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
axiosClient.interceptors.response.use(
    (response) => response,
    async (error) => {
      const originalRequest = error.config;
  
      // Access token expired (usually 401)
      // In Axios, when a request fails (e.g., due to an expired token), the error object contains the config for the request that was sent.
      // error.config refers to the configuration of the original request — i.e., the URL, headers, method, etc.
      // originalRequest._retry : This is a custom flag (not built into Axios). You manually attach it to avoid infinite loops.
      // If you don't set this flag, and your refresh token also returns a 401, the logic might call the refresh API again and again endlessly, causing an infinite retry loop.
      // So setting _retry = true helps Axios know this request has already been retried once.
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
  
            return axiosClient(originalRequest); // Retry with new token
          } catch (refreshError) {
            console.error("Refresh token expired. Logging out.");
            localStorage.clear(); 
            navigateTo(paths.LOGIN_PATH);
            return Promise.reject(refreshError);
          }
        }
      }
  
      return Promise.reject(error);
    }
  );
  
  export default axiosClient;

// Without _retry, this can happen:
// Access token is expired → interceptor kicks in.
// Interceptor tries to refresh the token.
// Refresh token is also invalid or expired → 401 again.
// Your interceptor catches the second 401... and tries to refresh again.
// This results in an infinite retry loop if you're not careful.
  

