import React, { useEffect, useState } from "react";
import { instance } from "../../../services/instance";
import { useSelector } from "react-redux";
import { getUserGroup } from "../../../redux/user/userSelectors";
import styles from "./StudentRegister.module.scss";

const formatDateString = (dateString) => {
  const date = new Date(dateString);
  const day = date.getDate();
  const month = date.getMonth() + 1;
  const year = date.getFullYear();
  return `${`${day}`.length === 2 ? day : `0${day}`}.${
    `${month}`.length === 2 ? month : `0${month}`
  }.${year}`;
};

const generateRandomScore = () =>
  Math.floor(Math.random() * (200 - 100 + 1)) + 100;

const StudentRegister = () => {
  const [subjectData, setSubjectData] = useState([]);
  const [loading, setLoading] = useState(false);
  const groupName = useSelector(getUserGroup);

  const modules = subjectData.reduce((modules, subject) => {
    if (subject.subjects_lessons) {
      for (let module of subject.subjects_lessons) {
        modules.push(module);
      }
    }
    return modules;
  }, []);

  const lessons = modules.reduce((lessons, module) => {
    if (module.module_lessons) {
      for (let lesson of module?.module_lessons) {
        lessons.push({ ...lesson, score: generateRandomScore() });
      }
    }
    return lessons;
  }, []);

  const dates = [
    ...new Set(
      lessons
        .map((lesson) => lesson.lesson_date)
        .sort((itemA, itemB) => new Date(itemA) - new Date(itemB))
        .map((date) => date.substr(0, 10))
    ),
  ];

  // console.log(lessons);
  // console.log(dates);
  // console.log(subjectData);
  console.log(loading);

  const renderDates = () =>
    dates.map((date) => (
      <div key={date}>
        <span>{formatDateString(date)}</span>
      </div>
    ));

  const renderSubjectsData = () =>
    subjectData.map(({ id, name, subjects_lessons: modules }) => {
      const lessons = modules.reduce((lessons, module) => {
        for (let lesson of module.module_lessons) {
          lessons.push({ ...lesson, score: generateRandomScore() });
        }
        return lessons;
      }, []);
      return (
        <li key={id} className={styles.journalBodyItem}>
          <div>
            <span>{name}</span>
          </div>
          {dates.map((date) => {
            const lessonsInDay = lessons.filter(
              ({ lesson_date }) => lesson_date.substr(0, 10) === date
            );
            return (
              <div key={date} className={styles.dayLessonsWrapper}>
                {lessonsInDay.map(
                  ({ lesson_id: id, lesson_type: type, score }) => (
                    <div className={styles.lessonWrapper} key={id}>
                      <span>{type}:</span>{" "}
                      <span>{type === "lecture" ? "PRES" : score}</span>
                    </div>
                  )
                )}
              </div>
            );
          })}
        </li>
      );
    });

  useEffect(() => {
    const getSubjectData = async () => {
      setLoading(true);
      const { data: subjects } = await instance.get(
        `/subject/group/${groupName}`
      );
      const subjectsWithLessons = await Promise.all(
        subjects.map(async ({ id }) => {
          const { data } = await instance.get(`/subject-tapes/${id}`);
          const res = await instance.get(`/subject/${id}`);
          const name = res.data.title;
          return { id, name, ...data };
        })
      );
      setLoading(false);
      setSubjectData(subjectsWithLessons);
    };
    if (groupName) {
      getSubjectData();
    }
  }, [groupName]);

  return (
    <div className={styles.studentRegisterWrapper}>
      <h1 className={styles.registerTitile}>
        <span>Register</span>
      </h1>
      <div className={styles.journalWrapper}>
        <ul className={styles.journalBody}>
          <li className={styles.journalHeader}>
            <div className={styles.date}>
              <span>subjects</span>
            </div>
            {renderDates()}
          </li>
          {renderSubjectsData()}
        </ul>
      </div>
    </div>
  );
};

export default StudentRegister;
