import { endPoints } from "../constants/endpoints";
import axiosClient from "../services/axios";

type loginDataProps = {
  username: string;
  password: string;
  expiresInMins: number;
};

export const userLogin = (loginData: loginDataProps) => {
  return axiosClient.post(endPoints.LOGIN, loginData);
};
