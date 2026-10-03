import axios from "axios";

const axiosInstance=axios.create({
    baseURL:"https://smartvisitserver.onrender.com"
},5000)

// AxiosInterceptor

export default axiosInstance