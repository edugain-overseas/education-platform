import { instance } from "./instance";

export const login = async (credentials) => {
    const {data} = await instance.post('authorization', credentials);
    return data
}