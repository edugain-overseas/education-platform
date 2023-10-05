import { instance } from "./instance";

export const login = async (credentials) => {
  const { data } = await instance.post("auth/token", credentials);
  return data;
};

export const getUserInfo = async (userType) => {
  const { data } = await instance.get(`/${userType}/info/me`);
  return data;
};

export const changeAvatar = async (file) => {
  const { data } = await instance.put("/student/update/photo", file);
  return data;
};

export const changeTeacherAvatar = async (file) => {
  const { data } = await instance.put("/teacher/update-image", file);
  return data;
};

export const logout = async () => {
  const { data } = await instance.get("/logout");
  return data;
};

/* {
  "info": {
    "student_id": 2,
    "student_name": "Nikolai",
    "student_surname": "Smirnov",
    "image_path": null,
    "student_educational_program": "Physician",
    "student_qualification": "Bachelor degrees",
    "student_subject_area": "Medicine",
    "field_of_study": "Health",
    "course_number": 1,
    "semester_number": 1,
    "group_name": "Med-23-1",
    "group_id": 3
  }

{
  "teacher_id": 1,
  "teacher_name": "Adalberto",
  "teacher_surname": "Runolfsson",
  "image_path": null,
  "teacher_email": "adalberto@gmail.com",
  "subject_info": [
    {
      "subject_id": 1,
      "subject_title": "Анатомия человека",
      "image_path": "static/images/subject-photo/Анатомия человека-anatomiya.jpeg",
      "group_id": 3,
      "group_name": "Med-23-1"
    },
    {
      "subject_id": 2,
      "subject_title": "Физиология",
      "image_path": "static/images/subject-photo/Физиология-fiziologiya.jpeg",
      "group_id": 3,
      "group_name": "Med-23-1"
    }
  ]
}
*/
