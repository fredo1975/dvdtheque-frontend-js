import axios from "axios";
import { useAuth } from "../helpers/auth-hook";
import { useEffect, useState } from 'react';

export const useAxios = () => {
    const { token, isAuthenticated, meta } = useAuth();
    const [initialized, setInitialized] = useState(false);
    const [axiosInstance, setAxiosInstance] = useState({});
    const [axiosBatchInstance, setAxiosBatchInstance] = useState({});
    const [axiosAllocineInstance, setAxiosAllocineInstance] = useState({});
    useEffect(() => {
        if(isAuthenticated){
            //console.log('useAxios isAuthenticated');
        }else{
            //console.log('useAxios !isAuthenticated');
            return;
        }
        const instance = axios.create({
            baseURL: import.meta.env.VITE_BACKEND_URL,
            timeout: 5000,
            headers: {
                Authorization: isAuthenticated ? `Bearer ${meta.keycloak.token}` : undefined,
            },
        })
        const batch_instance = axios.create({
            baseURL: import.meta.env.VITE_BACKEND_BATCH_URL,
            timeout: 5000,
            headers: {
                Authorization: isAuthenticated ? `Bearer ${meta.keycloak.token}` : undefined,
            },
        })
        const allocine_instance = axios.create({
            baseURL: import.meta.env.VITE_BACKEND_ALLOCINE_URL,
            timeout: 5000,
            headers: {
                Authorization: isAuthenticated ? `Bearer ${meta.keycloak.token}` : undefined,
            },
        })
        //console.log('useAxios instance',instance);
        setAxiosInstance({ instance })
        setAxiosBatchInstance({ batch_instance })
        setAxiosAllocineInstance({ allocine_instance })
        setInitialized(true);
        return () => {
            //console.log('useAxios return');
            setAxiosInstance({})
            setAxiosBatchInstance({})
            setAxiosAllocineInstance({})
            setInitialized(false);
        }
    }, [isAuthenticated,initialized])

    return { initialized,axiosInstance, axiosBatchInstance,axiosAllocineInstance};
}

export default useAxios;