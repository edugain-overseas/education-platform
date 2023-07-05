import { instance } from "./instance"

export const getSchedule = async() => {
    const { data } = await instance.get("/student/my/schedule", {
        params: {
            group_name: 'Fil23'
        }
    });
    console.log(data);
    return data
}