import { instance } from "./instance"

export const attachFileToMessage = async (file) => {
    instance.defaults.headers["Content-Type"] = "multipart/form-data";
    const {data} = await instance.post('/group-chat/attachment-file', file);
    instance.defaults.headers["Content-Type"] = "multipart/form-data";
    console.log(data);
    return data
}