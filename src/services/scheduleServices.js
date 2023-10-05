import { instance } from "./instance";

export const getSchedule = async (groupName) => {
  const { data } = await instance.get("/student/my/schedule", {
    params: {
      group_name: groupName,
    },
  });
  return data;
};

export const getTeacherSchedule = async (teacherId) => {
  const { data } = await instance.get("/teacher/my/schedule", {
    params: {
      teacher_id: teacherId,
    },
  });
  return data
};
