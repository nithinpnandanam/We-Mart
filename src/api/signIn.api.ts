import { endPoints } from "../constants/endpoints";
import { post } from "../utils/apiUtils";

type loginDataProps = {
    username: string;
    password: string;
    expiresInMins: number;
  };



export const UserLogin = (loginData: loginDataProps) => {
  return post(loginData, endPoints.LOGIN);
};
