import { instance } from "./instance"

export const getAllSubjectsByGroupName = async (groupName) => {
    const {data} = await instance.get(`/subject/group/${groupName}`)
    return data
}