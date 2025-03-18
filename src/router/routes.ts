const ROOT_PATH = '/';
const LOGIN_PATH = '/login';
const SIGNUP_PATH = '/sign-up';
const ERROR_PATH = '/error';
const USER_LIST = '/user-list'


const paths = {
    ROOT_PATH,
    LOGIN_PATH,
    SIGNUP_PATH,
    ERROR_PATH,
    USER_LIST
} as const;

export default paths;

// Without as const ts infers
// {
//     ROOT_PATH: string;
//     LOGIN_PATH: string;
//     ERROR_PATH: string;
// }
// Since it's inferred as string, someone could modify the values


// if we use ts
// {
//     readonly ROOT_PATH: "/";
//     readonly LOGIN_PATH: "/login";
//     readonly ERROR_PATH: "/error";
// }