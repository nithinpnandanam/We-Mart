import { endPoints } from "../constants/endpoints";
import axiosClient from "../services/axios";

export const fetchAllCategories = () =>{
  return axiosClient.get(endPoints.CATEGORIES)
}