import axios from "axios";

export const instance = axios.create({
  baseURL: "https://f941-194-44-219-51.ngrok-free.app/api/v1/",
  headers: {
    "ngrok-skip-browser-warning": "1",
    "Content-Type": "application/x-wwww-form-urlencoded",
  }, //Delete after backend was deployed
});
