import { endPoints } from "../constants/endpoints";
import axiosClient from "../services/axios";

export const fetchAllUsers = (searchValue:string,limitValue?:number,skipValue?:number) => {
  return axiosClient.get(endPoints.ALL_USERS,{
    params:{
      limit:limitValue,
      skip:skipValue,
      q:searchValue
    }
  });
};

// export const fetchAllProducts = (sortBy?:string,order?:string) => {
//   return axiosClient.get(endPoints.PRODUCTS,{
//     params: {
//       order: order ??  '',
//       sortBy: sortBy ?? '',
//     },
//   });
// };