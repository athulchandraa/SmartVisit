import axiosService from "./AxiosService";


//GetAdmin Data
export const GetAdminData=async()=>{
    return await axiosService("GET",'/admin',{})
}

//Post Security Details
export const PostSecurity=async(data)=>{
    return await axiosService("POST",'/security',data)
}

//Get Security Details for Login
export const GetSecurity=async()=>{
    return await axiosService("GET",'/security',{})
}

//Delete Security from Admin
export const DltGuard=async(id)=>{
    return await axiosService("DELETE",`/security/${id}`,{})
}

//Post Visitor Data
export const PostVisitors=async(data)=>{
    return await axiosService("POST",'/visitors',data)
}

//Get Visitor Data
export const VisitorsList=async()=>{
    return axiosService("GET",'/visitors',{})
}
