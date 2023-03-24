import axios from "axios";

const axiosClient = axios.create({
  baseURL: "http://localhost:3001/api",
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
