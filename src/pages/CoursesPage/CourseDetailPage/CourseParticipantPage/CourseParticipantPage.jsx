import React from "react";
import { useSelector } from "react-redux";
import { getSubjectsParticipants } from "../../../../redux/subject/subjectSelectors";
import styles from "./CourseParticipantPage.module.scss";
import { useParams } from "react-router-dom";
import UserAvatar from "../../../../components/shared/UserAvatar/UserAvatar";

export default function CourseParticipantPage() {
  const { id } = useParams();
  const participantsData = useSelector(getSubjectsParticipants).find(
    (item) => item.id === id
  )?.data;
  console.log(participantsData);

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
              participantsData?.teachers.map((teacher) => (
                <li key={teacher.id} className={styles.teacherItemBody}>
                  <div className={styles.teacherName}>
                    <div className={styles.avatarWrapper}>
                      <UserAvatar
                        imageSrc={teacher.image_path}
                        userName={teacher.name}
                      />
                    </div>
                    {`${teacher.name} ${teacher.surname}`}
                  </div>
                  <div className={styles.teacherEmail}>{teacher.email}</div>
                  <div>
                    {teacher.last_active
                      ? teacher.last_active.replaceAll("-", ".")
                      : "-"}
                  </div>
                </li>
              ))}
            {participantsData?.curator && (
              <li className={styles.teacherItemBody}>
                <div className={styles.teacherName}>
                  <div className={styles.avatarWrapper}>
                    <UserAvatar
                      imageSrc={participantsData?.curator.image_path}
                      userName={participantsData?.curator.name}
                    />
                  </div>
                  {`${participantsData?.curator.name} ${participantsData?.curator.surname}`}
                </div>
                <div className={styles.teacherEmail}>
                  {participantsData.curator.email}
                </div>
                <div>20.08.2023</div>
              </li>
            )}
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
          <div className={styles.studentListWrapper}>
            <ul className={styles.studentsList}>
              <li className={styles.studentsItemHeader}>
                <div>Name</div>
                <div>Email</div>
                <div>Activity</div>
                <div>Progress</div>
                <div>Average rating</div>
                <div>A comment</div>
              </li>
              {participantsData?.students &&
                participantsData?.students.map((student) => (
                  <li key={student.id} className={styles.studentItemBody}>
                    <div className={styles.studentName}>
                      <div className={styles.avatarWrapper}>
                        <UserAvatar imageSrc={student.image_path} userName={student.name}/>
                      </div>
                      {`${student.name} ${student.surname}`}
                    </div>
                    <div className={styles.studentEmail}>{student.email}</div>
                    <div>
                      {student.last_active
                        ? student.last_active.replaceAll("-", ".")
                        : "-"}
                    </div>{" "}
                    <div>67%</div>
                    <div>172 (B)</div>
                    <div>Non comment</div>
                  </li>
                ))}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
