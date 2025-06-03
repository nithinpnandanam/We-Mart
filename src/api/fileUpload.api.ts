import { endPoints } from "@/constants/endpoints";
import axiosClientNew from "@/services/axiosClientNew";

export const fileUpload = () =>{
    return axiosClientNew.post(endPoints.FILE_UPLOAD)
}