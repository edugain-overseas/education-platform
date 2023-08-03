import React from "react";
import { Outlet, useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import { getUserGroup } from "../../redux/user/userSelectors";
import NavLinksPanel from "../../components/NavLinksPanel/NavLinksPanel";
import styles from './CoursesPage.module.scss'

export default function CoursesPage() {
  const groupName = useSelector(getUserGroup);
  const params = useParams()

  const renderLinks = [
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

  return (
    params.id ? (
      <div className={styles.courseMainPageWrapper}>
        <Outlet />
      </div>
    ) : (
      <div className={styles.courseMainPageWrapper}>
      <NavLinksPanel renderLinks={renderLinks}/>
      <Outlet />
    </div>
    )
  );
}
