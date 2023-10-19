import axios from "axios";
import { useKeycloak } from "@react-keycloak/web";
import { useAuth } from "../helpers/auth-hook";
import { useCallback, useEffect, useState } from 'react';

const baseURL = 'http://' + import.meta.env.VITE_BACKEND_URL

export const useAxios = () => {
    const { token, isAuthenticated, meta } = useAuth();
    const [initialized, setInitialized] = useState(false);
    const [axiosInstance, setAxiosInstance] = useState({});
    useEffect(() => {
        if(isAuthenticated){
            //console.log('useAxios isAuthenticated');
        }else{
            //console.log('useAxios !isAuthenticated');
            return;
        }
        const instance = axios.create({
            baseURL: baseURL,
            timeout: 1000,
            headers: {
                Authorization: isAuthenticated ? `Bearer ${meta.keycloak.token}` : undefined,
            },
        })
        //console.log('useAxios instance',instance);
        setAxiosInstance({ instance })
        setInitialized(true);
        return () => {
            //console.log('useAxios return');
            setAxiosInstance({})
            setInitialized(false);
        }
    }, [isAuthenticated,initialized])

    return { initialized,axiosInstance };
}

export default useAxios;