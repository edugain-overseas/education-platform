import { instance } from "./instance"

export const attachFileToMessage = async (file) => {
    const {data} = await instance.post('/group-chat/attachment-file', file);
    console.log(data);
    return data
}