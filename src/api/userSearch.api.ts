import { endPoints } from "../constants/endpoints";
import axiosClient from "../services/axios";

export const userSearch = (searchQuery:string) => {
  return axiosClient.get(endPoints.USER_SEARCH,{
    params: { 
        q: searchQuery 
    },
  });
};
