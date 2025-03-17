import { endPoints } from "../constants/endpoints";
import axiosClient from "../services/axios";

export const productSearch = (searchQuery:string) => {
  return axiosClient.get(endPoints.PRODUCT_SEARCH,{
    params: { 
        q: searchQuery 
    },
  });
};
