import axios from "axios";


const apiHandler = (error: unknown): void => {
  if(axios.isAxiosError(error)){
    console.error("Axios Error:", error.response?.data || error);
    throw error;
  } else {
    console.error("Unexpected Error:", error);
    throw new Error("An unexpected error occurred");
  }
}

export default apiHandler
