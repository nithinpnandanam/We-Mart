import { endPoints } from "../constants/endpoints";
import axiosClient from "../services/axios";

export const fetchProductByCategory = (product:string) => {       
  const endPoint = endPoints.PRODUCTS_BY_CATEGORY + product
  return axiosClient.get(endPoint);
};
