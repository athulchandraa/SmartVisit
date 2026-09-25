import axiosInstance from "./AxiosInstance";

const axiosService=async(httppReq,url,reqBody)=>{
    try{
        const response=await axiosInstance({
            method:httppReq,
            url,
            data:reqBody
        })
        return response
    }catch(err){
        throw (err)
    }
}

export default axiosService