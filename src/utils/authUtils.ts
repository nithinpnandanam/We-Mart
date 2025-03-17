import { jwtDecode, JwtPayload } from 'jwt-decode';

export type CustomJwtPayload = JwtPayload & {
    role?: string;
};

export const checkAccessToken = () => {
    const accessToken = localStorage.getItem('accessToken');

    if (accessToken) {
        const decodedToken: CustomJwtPayload = jwtDecode(accessToken);

        if (decodedToken && checkTokenExpiry(decodedToken)) {
            return true;
        } else return false;
    } else return false;
};

// get access token
export const getAccessToken = () => {
    const accessToken = localStorage.getItem('accessToken');

    if (accessToken) {
        return accessToken;
    } else return null;
};

// check token expiry
const checkTokenExpiry = (decodedToken: CustomJwtPayload): boolean => {
    if (decodedToken) {
        // exp in decodedToken is an optional parameter so just making a check
        if (!decodedToken || typeof decodedToken.exp === 'undefined') {
            return false; 
        }
        // Date.now() → Gets the current time in milliseconds.
        // Date.now() / 1000 → Converts it to seconds for correct comparison.
        // In JWTs (JSON Web Tokens), the exp (expiration) field is a Unix timestamp 
        // this exp will be in seconds corresponding to a time say 9.am in dec 26 2025
        const currentTime = Date.now() / 1000;

        if (decodedToken['exp'] > currentTime) {
            return true;
        } else return false;
    } else return false;
};

// remove access token for logout
export const removeAccessToken = () => {
    localStorage.removeItem('accessToken');
};
