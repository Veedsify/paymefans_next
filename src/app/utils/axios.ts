import axios from "axios";

export const axiosServer = axios.create({
  baseURL: process.env.NEXT_SERVER_URL,
});
