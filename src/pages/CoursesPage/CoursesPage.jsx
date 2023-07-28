import React from "react";
import { Outlet, useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import { getUserGroup } from "../../redux/user/userSelectors";
import NavLinksPanel from "../../components/NavLinksPanel/NavLinksPanel";

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
      <div>
        <Outlet />
      </div>
    ) : (
      <div>
      <NavLinksPanel renderLinks={renderLinks}/>
      <Outlet />
    </div>
    )
  );
}
