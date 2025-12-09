import { API_URL } from "@/utils/baseUrl";
import axios from "axios";

export default axios.create({
  baseURL: API_URL,
});
