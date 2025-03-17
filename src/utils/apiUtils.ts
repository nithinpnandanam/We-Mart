import axiosClient from '../services/axios';

export const post = (data: Record<string, unknown>, endpoint: string) => {
    return axiosClient.post(endpoint, data);
};

export const get = (endpoint: string) => {
    return axiosClient.get(endpoint);
};


// data:Record<string, unknown>
// This TypeScript type means that data is an object with
// Keys as string (e.g., "username", "email").
// Values as unknown (any type)