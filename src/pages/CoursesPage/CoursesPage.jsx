import React from "react";
import { Outlet, useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import { getUserGroup, getUserType } from "../../redux/user/userSelectors";
import NavLinksPanel from "../../components/NavLinksPanel/NavLinksPanel";
import styles from './CoursesPage.module.scss'

export default function CoursesPage() {
  const groupName = useSelector(getUserGroup);
  const userType = useSelector(getUserType)
  const params = useParams()

  const renderStudentLinks = [
    {
      to: groupName,
      content: `courses grup ${groupName}`,
    },
    {
      to: "dopcourses",
      content: "dop courses",
    },
    {
      to: "archive",
      content: "archive",
    },
  ];

  const renderTeacherLinks = [
    {
      to: 'teacher-active-courses',
      content: 'active courses'
    },
    {
      to: "archive",
      content: "archive",
    }
  ]

  const getRenderLinksByUserType = ()=>{
    switch (userType) {
      case 'student':
        return renderStudentLinks
      case 'teacher':
        return renderTeacherLinks
      default:
        return [];
    }
  }

  return (
    params.id ? (
      <div className={styles.courseMainPageWrapper}>
        <Outlet />
      </div>
    ) : (
      <div className={styles.courseMainPageWrapper}>
      <NavLinksPanel renderLinks={getRenderLinksByUserType()}/>
      <Outlet />
    </div>
    )
  );
}
