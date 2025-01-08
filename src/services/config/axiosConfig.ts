import axios,{AxiosInstance} from "axios";

const backendUrl = import.meta.env.VITE_BACKEND_URL

const Api:AxiosInstance = axios.create({
    baseURL: backendUrl,
    withCredentials: true
})

export default Api