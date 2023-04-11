import axios from "axios";

const axiosClient = axios.create({
  baseURL: process.env.REACT_APP_BASE_API_URL,
});

export const initAxiosClient = (authToken: string) => {
  if (authToken.length > 0) {
    axiosClient.defaults.headers.common[
      "Authorization"
    ] = `Bearer ${authToken}`;
  } else {
    axiosClient.defaults.headers.common["Authorization"] = ``;
  }
};

export default axiosClient;
