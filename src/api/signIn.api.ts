import { endPoints } from "@/constants/endpoints";
import axiosClient from "@/services/axios";

type loginDataTypes = {
  username: string;
  password: string;
  expiresInMins: number;
};

export const userLogin = (loginData: loginDataTypes) => {
  return axiosClient.post(endPoints.LOGIN, loginData);
};
