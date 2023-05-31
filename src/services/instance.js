import axios from "axios";

export const instance = axios.create({
    baseURL: 'https://a70c-194-44-219-51.ngrok-free.app/api/v1/',
    headers: {'ngrok-skip-browser-warning': '1'} //Delete after backend was deployed
}) 