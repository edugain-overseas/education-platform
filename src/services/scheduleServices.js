import { instance } from "./instance"

export const getSchedule = async (groupName) => {
    const { data } = await instance.get("/student/my/schedule", {
        params: {
            group_name: groupName
        }
    });
    console.log(data);
    return data
}