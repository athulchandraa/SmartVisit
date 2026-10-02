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
    return await axiosService("GET",'/visitors',{})
}

//Delete visitor from Data Base
export const DltVisitor=async(id)=>{
return await axiosService("DELETE",`/visitors/${id}`,{})
}

//Store Accessed Visitores store security field
export const AccessedVisitors=async(id,data)=>{
const response=await axiosService("GET",`/security/${id}`,{})
const updated=[...(response.data.accessed || []),...data]
return await axiosService("PATCH",`/security/${id}`,{accessed:updated})
}

//Change Active/inactive State
export const StatusChange=async(data)=>{
    return await axiosService("PATCH",`/security/${data.id}`,data)
}

//Update Security Data
export const UpdateGuardsData=async(data)=>{
    return await axiosService("PUT",`/security/${data.id}`,data)
}

//Update Checkout Time
export const UpdateCheckOutTimeInServer=async(id,data,checkOutTime)=>{
    const response=await axiosService("GET",`/security/${id}`,{})
    const updated=response.data.accessed.map(item=>item.id==data.id ? {...item,checkout:checkOutTime} : item)
    return await axiosService("PATCH",`/security/${id}`,{accessed:updated})
}