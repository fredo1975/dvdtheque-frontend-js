import { useCallback, useEffect, useState } from 'react';
import { useKeycloak } from '@react-keycloak/web';


export const useAuth = () => {
  
    const {keycloak, initialized} = useKeycloak();
    
    useEffect(() => {
        if (!initialized) {
          console.log('useAuth !initialized !!!!');
          return;
        }
        if (keycloak.authenticated) {
            console.log('useAuth authenticated !!!!');
          }
        }, [keycloak, initialized]);
        
        const ret = {
          isAuthenticated: !!keycloak.authenticated,
          initialized,
          meta: {
            keycloak,
          },
          token: keycloak.token,
        };
        console.log('ret',ret);
        return ret;
        
};

export default useAuth;