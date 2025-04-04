import { FormInputTypes } from "../components/AddUser/UserValidations";
import { endPoints } from "../constants/endpoints";
import axiosClient from "../services/axios";


type userDataTypes = FormInputTypes

export const addUser = (userData: userDataTypes) => {
  return axiosClient.post(endPoints.ADD_USER,userData);
};
