import React, { useState } from "react";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import * as XLSX from "xlsx";
import { Checkbox } from "antd";
import UserAvatar from "../../../../components/shared/UserAvatar/UserAvatar";
import { getSubjectsParticipants } from "../../../../redux/subject/subjectSelectors";
import { getIsEdit } from "../../../../redux/config/configSelectors";
import { ReactComponent as FilterIcon } from "../../../../images/icons/filter.svg";
import { ReactComponent as DownloadIcon } from "../../../../images/icons/download.svg";
import { ReactComponent as PlusIcon } from "../../../../images/icons/plus.svg";
import { ReactComponent as SearchIcon } from "../../../../images/icons/search.svg";
import { ReactComponent as RemoveIcon } from "../../../../images/icons/minus.svg";
import styles from "./CourseParticipantPage.module.scss";
import { getUserType } from "../../../../redux/user/userSelectors";

export default function CourseParticipantPage() {
  const { id } = useParams();

  const userType = useSelector(getUserType);
  const isEdit = useSelector(getIsEdit);
  const participantsData = useSelector(getSubjectsParticipants).find(
    (item) => item.id === id
  )?.data;

  const [query, setQuery] = useState("");
  const [students, setStudents] = useState(participantsData?.students);
  const [checked, setChecked] = useState([]);

  const handleSearchChange = (e) => {
    const value = e.target.value;
    setQuery(value);
    setStudents(
      participantsData?.students?.filter(({ name, surname }) => {
        const fullName = name + surname;
        return fullName
          .trim()
          .toLowerCase()
          .includes(value.trim().toLowerCase());
      })
    );
  };

  const handleCheckboxCheck = (id) => {
    if (checked.includes(id)) {
      const newData = checked.filter((studentId) => studentId !== id);
      setChecked(newData);
      return;
    }
    setChecked((prev) => [...prev, id]);
  };

  const generateExcel = (data) => {
    const ws = XLSX.utils.json_to_sheet(data);
    const wb = { Sheets: { data: ws }, SheetNames: ["data"] };
    const excelBuffer = XLSX.write(wb, { bookType: "xlsx", type: "array" });
    const dataUrl = new Blob([excelBuffer], {
      type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
    });
    const url = URL.createObjectURL(dataUrl);

    const link = document.createElement("a");
    link.href = url;
    const date = new Date().toLocaleDateString("en-GB");
    link.download = `students${date}.xlsx`;
    link.click();

    URL.revokeObjectURL(url);
  };

  const handleDownload = () => {
    const { students } = participantsData;
    const chosenStudents = students.filter((student) =>
      checked.includes(student.id)
    );
    console.log(chosenStudents);
    const arrayForXLSX = chosenStudents.map(
      ({ name, surname, email, last_active, participant_comment }) => ({
        Name: `${name} ${surname}`,
        Email: email,
        Activity: last_active,
        Progress: "67%",
        "Avarage rating": "172(B)",
        Comment: Array.isArray(participant_comment)
          ? "Non Comment"
          : participant_comment,
      })
    );

    console.log(arrayForXLSX);
    generateExcel(arrayForXLSX);
  };

  const renderTeachers = (teachers) =>
    teachers.map((teacher) => (
      <li key={teacher.id} className={styles.teacherItemBody}>
        <div className={styles.teacherName}>
          <div className={styles.avatarWrapper}>
            <UserAvatar imageSrc={teacher.image_path} userName={teacher.name} />
          </div>
          {`${teacher.name} ${teacher.surname}`}
        </div>
        <div className={styles.teacherEmail}>{teacher.email}</div>
        <div>
          {teacher.last_active ? teacher.last_active.replaceAll("-", ".") : "-"}
        </div>
      </li>
    ));

  const renderCurator = (curator) => (
    <li className={styles.teacherItemBody}>
      <div className={styles.teacherName}>
        <div className={styles.avatarWrapper}>
          <UserAvatar imageSrc={curator.image_path} userName={curator.name} />
        </div>
        {`${curator.name} ${curator.surname}`}
      </div>
      <div className={styles.teacherEmail}>{curator.email}</div>
      <div>
        {curator.last_active ? curator.last_active.replaceAll("-", ".") : "-"}
      </div>
    </li>
  );

  const renderStudents = (students) =>
    students.map((student) => (
      <li
        key={student.id}
        className={
          isEdit
            ? `${styles.studentItemBodyFull} ${styles.itemEdit} ${styles.studentItemBody}`
            : userType === "student"
            ? styles.studentItemBody
            : `${styles.studentItemBodyFull} ${styles.studentItemBody}`
        }
      >
        <div className={styles.studentName}>
          <div className={styles.avatarWrapper}>
            <UserAvatar imageSrc={student.image_path} userName={student.name} />
          </div>
          {`${student.name} ${student.surname}`}
        </div>
        <div className={styles.studentEmail}>{student.email}</div>
        <div>
          {student.last_active ? student.last_active.replaceAll("-", ".") : "-"}
        </div>{" "}
        {userType !== "student" && (
          <>
            <div>67%</div>
            <div>172 (B)</div>
            <div>
              {!Array.isArray(student.participant_comment)
                ? student.participant_comment
                : "Non comment"}
            </div>
            <Checkbox
              onChange={() => handleCheckboxCheck(student.id)}
              checked={checked.includes(student.id)}
              className={styles.checkbox}
            />
          </>
        )}
      </li>
    ));

  return (
    <div className={styles.pageWrapper}>
      <div className={styles.container}>
        <h1 className={styles.pageTitle}>participants</h1>
        <div className={styles.teachersWrapper}>
          <div className={styles.headerWrapper}>
            <span>Teachers and curators</span>
            <span>
              {participantsData?.teachers &&
                `(${
                  participantsData.teachers.length +
                  (participantsData.curator ? 1 : 0)
                })`}
              Teachers and curators
            </span>
          </div>
          <ul className={styles.teacherList}>
            <li className={styles.teachersItemHeader}>
              <div>Name</div>
              <div>Email</div>
              <div>Activity</div>
            </li>
            {participantsData?.teachers &&
              renderTeachers(participantsData?.teachers)}
            {participantsData?.curator &&
              renderCurator(participantsData?.curator)}
          </ul>
        </div>
        <div className={styles.studentsWrapper}>
          <div className={styles.headerWrapper}>
            <span>Students</span>
            <span>
              {participantsData?.students &&
                `(${participantsData.students.length})`}
              Students
            </span>
          </div>
          {userType !== "student" && (
            <div className={styles.editPanelWrapper}>
              <button className={styles.filterBtn}>
                <span>Add filter</span>
                <FilterIcon />
              </button>
              <div className={styles.searchWrapper}>
                <input
                  type="text"
                  placeholder="Search..."
                  value={query}
                  onChange={handleSearchChange}
                />
                <SearchIcon />
              </div>
              <button className={styles.downloadBtn} onClick={handleDownload}>
                <span>Download</span>
                <DownloadIcon />
              </button>
              {isEdit && userType === "moder" && (
                <>
                  <button className={styles.addStudentBtn}>
                    <span>Add student</span>
                    <PlusIcon />
                  </button>
                  <button className={styles.removeStudentBtn}>
                    <span>Delete student</span>
                    <RemoveIcon />
                  </button>
                </>
              )}
            </div>
          )}

          <div className={styles.studentListWrapper}>
            <ul className={styles.studentsList}>
              <li
                className={
                  userType === "student"
                    ? styles.studentsItemHeader
                    : `${styles.studentItemBodyFull} ${styles.studentsItemHeader}`
                }
              >
                <div>Name</div>
                <div>Email</div>
                <div>Activity</div>
                {userType !== "student" && (
                  <>
                    <div>Progress</div>
                    <div>Average rating</div>
                    <div>A comment</div>
                  </>
                )}
              </li>
              {students && renderStudents(students)}
              {students && renderStudents(students)}
              {students && renderStudents(students)}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
