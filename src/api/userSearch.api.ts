// export const userSearch = (searchQuery:string) => {
//   return axiosClient.get(endPoints.USER_SEARCH,{
//     params: { 
//         q: searchQuery,
//         limit:10
//     },
//   });
// };

import { endPoints } from "@/constants/endpoints";
import axiosClient from "@/services/axios";

type SearchParamsType = {
  q: string;
  limit?: number;
}
export const userSearch = (searchQuery: string) => {
  const params: SearchParamsType = { q: searchQuery };

  // if we are searching with an empty string only 10 results must be there
  // else how many results are there all those resulsts mudt be shown
  if (searchQuery.trim() === "") {
    params.limit = 10;
  }

  return axiosClient.get(endPoints.USER_SEARCH, {
    params
  });
};

