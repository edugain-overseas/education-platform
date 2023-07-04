import axios from "axios";
import { serverBaseUrl } from "../constants/server";

export const instance = axios.create({
  baseURL: serverBaseUrl,
  // baseURL: "https://e7d4-91-123-150-130.ngrok-free.app/api/v1",
  headers: {
    "ngrok-skip-browser-warning": "1",
    "Content-Type": "application/x-wwww-form-urlencoded",
  }, //Delete after backend was deployed
});
