import { persistor, store } from "@/redux/store/store";
import Api from "./axiosConfig";
import { removeUserInfo } from "@/redux/slice/userSlice";
import { message } from "antd";


Api.interceptors.response.use(
    (response) => response,
    async (error) => {
        const status = error.response?.status;

        if (status === 403) {
            message.error('You have been blocked by the admin. Logging out...');
            document.cookie = 'authToken=; Max-Age=0';
            store.dispatch(removeUserInfo());
            await persistor.purge();
            window.location.href = '/login';
        } else if (status === 401) {
            message.error('Session expired. Please log in again.');
            document.cookie = 'authToken=; Max-Age=0';
            store.dispatch(removeUserInfo());
            await persistor.purge();
            window.location.href = '/login';
        } else {
            console.error('Unexpected error:', status);
        }

        return Promise.reject(error);
    }
);