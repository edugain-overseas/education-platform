import React from "react";
import { UserInfoPanel } from "../../components/UserInfoPanel/UserInfoPanel";
import { SchedulePanel } from "../../components/SchedulePanel/SchedulePanel";
import { Chat } from "../../components/Chat/Chat";
import { useSelector } from "react-redux";
import { getUserType } from "../../redux/user/userSelectors";
import SubjectChatsCollection from "../../components/SubjectChatsCollection/SubjectChatsCollection";
import { getGroupChatData } from "../../redux/groupChat/groupChatSelectors";
import styles from "./HomePage.module.scss";

export function HomePage() {
  const userType = useSelector(getUserType);
  const groupChatData = useSelector(getGroupChatData);
  return (
    <div className={styles.mainWrapper}>
      <UserInfoPanel />
      <SchedulePanel />
      {userType === "student" ? (
        <Chat chatData={groupChatData} />
      ) : (
        <SubjectChatsCollection />
      )}
    </div>
  );
}
