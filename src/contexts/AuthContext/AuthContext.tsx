import { createContext, useContext, useState,FC } from 'react';
import { checkAccessToken, removeAccessToken} from '../../utils/authUtils';
import { AuthContextType,AuthProviderProps } from './AuthContext.types';

// Create the context with an empty default value
const authContext = createContext<AuthContextType | undefined>(undefined);

// Create a Provider component
export const AuthProvider:FC<AuthProviderProps> = ({children}) => {
    const [isLoggedIn, setIsLoggedIn] = useState<boolean>(() => {
        return checkAccessToken();
    });

    // login
    const login = () => {
        const token = checkAccessToken();
        if (token) setIsLoggedIn(true);
    };

    // log out
    const logout = () => {
        setIsLoggedIn(false);
        removeAccessToken();
    };


    const contextValue = {
        isLoggedIn,
        login,
        logout,
    };

    return (
        <authContext.Provider value={contextValue}>
            {children}
        </authContext.Provider>
    );
};

/* 

<authContext.Provider value={{"isLoggedIn":isLoggedIn,"login":fn defenition,"logout":n defenition}}>
    {children}
</authContext.Provider> 
    
- for making it easier we just provide the keys 
*/

export const useAuthContext = ():AuthContextType => {
    const context = useContext(authContext);

    if (!context) {
        throw new Error('Use authcontext within auth context provider');
    }

    return context;
};
