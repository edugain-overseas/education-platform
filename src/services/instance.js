import axios from "axios";

export const instance = axios.create({
  baseURL: "https://e54a-194-44-219-51.ngrok-free.app/api/v1",
  // baseURL: "https://e7d4-91-123-150-130.ngrok-free.app/api/v1",
  headers: {
    "ngrok-skip-browser-warning": "1",
    "Content-Type": "application/x-wwww-form-urlencoded",
  }, //Delete after backend was deployed
});
