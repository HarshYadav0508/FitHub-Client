import { useMemo } from 'react';
import axios from 'axios';

const useAxiosFetch = () => {
    // Create a stable axios instance
    const axiosInstance = useMemo(() => {
        const instance = axios.create({
            baseURL: 'https://fithub-r8lw.onrender.com',
        });

        // Interceptors setup
        instance.interceptors.request.use(
            (config) => {
                // Do something before request is sent
                return config;
            },
            (error) => {
                // Do something with request error
                return Promise.reject(error);
            }
        );

        instance.interceptors.response.use(
            (response) => {
                // Do something with response data
                return response;
            },
            (error) => {
                // Do something with response error
                return Promise.reject(error);
            }
        );

        return instance;
    }, []); // Empty dependency array ensures it is created only once

    return axiosInstance;
};

export default useAxiosFetch;
