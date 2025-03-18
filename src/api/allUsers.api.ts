import { endPoints } from "../constants/endpoints";
import axiosClient from "../services/axios";

export const fetchAllUsers = () => {
  return axiosClient.get(endPoints.ALL_USERS);
};
