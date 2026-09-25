import axios from "axios";

const axiosInstance=axios.create({
    baseURL:"http://localhost:3000"
},5000)

// AxiosInterceptor

export default axiosInstance