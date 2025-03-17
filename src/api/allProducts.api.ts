import { endPoints } from "../constants/endpoints";
import axiosClient from "../services/axios";

export const fetchAllProducts = (sortBy?:string,order?:string) => {
  return axiosClient.get(endPoints.PRODUCTS,{
    params: {
      order: order ??  '',
      sortBy: sortBy ?? '',
    },
  });
};
