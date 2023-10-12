import React, { useEffect, useState } from "react";
import { Segmented, ConfigProvider } from "antd";
import { useSelector } from "react-redux";
import { getAllChats } from "../../redux/chats/chatsSelectors";
import { getTeacherSubjects } from "../../redux/user/userSelectors";
import { serverName } from "../../constants/server";
import { Chat } from "../Chat/Chat";
import styles from "./SubjectChatsCollection.module.scss";
import "./Segmented.css";

const customTheme = {
  components: {
    Segmented: {
      itemColor: "#718da7",
      itemHoverColor: "#fff",
      itemActiveBg: "#718DA7",
      itemSelectedBg: "#718DA7",
      itemHoverBg: "rgba(0,0,0,0.1)",
    },
  },
};

const SubjectChatsCollection = () => {
  const chatsData = useSelector(getAllChats);
  const subjectsData = useSelector(getTeacherSubjects);
  const [activeChatId, setActiveChatId] = useState(1);

  useEffect(() => {
    if (chatsData.length === 1) {
      setActiveChatId(chatsData[0].subjectId);
    }
  }, [chatsData]);

  const options = chatsData.map(({ subjectId }) => {
    const imagePath = subjectsData?.find(
      ({ subject_id }) => subjectId === subject_id
    )?.image_path;
    const subjectTitle = subjectsData?.find(
      ({ subject_id }) => subjectId === subject_id
    )?.subject_title;
    const subjectGroupName = subjectsData?.find(
      ({ subject_id }) => subjectId === subject_id
    )?.group_name;

    return {
      label: (
        <div className={styles.chatBtnWrapper}>
          {imagePath && (
            <div
              className={styles.imageWrapper}
              style={{
                transition:
                  "transform 300ms cubic-bezier(0.645, 0.045, 0.355, 1)",
                position: activeChatId === subjectId ? "static" : "absolute",
                opacity: activeChatId === subjectId ? 1 : 0,
                pointerEvents: "none",
                transform:
                  activeChatId === subjectId
                    ? "translateY(0)"
                    : "translateY(50rem)",
              }}
            >
              <img src={`${serverName}${imagePath}`} alt={subjectTitle} />
            </div>
          )}
          <h4 className={styles.groupName}>
            {activeChatId !== subjectId && "Chat"} {subjectGroupName}
          </h4>
        </div>
      ),
      value: subjectId,
    };
  });

  return (
    <div className={styles.chatsCollectionWrapper}>
      {chatsData.length !== 0 && (
        <>
          <ConfigProvider theme={customTheme}>
            <Segmented
              options={options}
              className={styles.chatsControlPanel}
              onChange={(value) => setActiveChatId(value)}
              defaultValue={chatsData[0]?.subjectId}
            />
          </ConfigProvider>
          <div className={styles.chatWrapper}>
            <Chat
              chatData={chatsData.find(
                ({ subjectId }) => subjectId === activeChatId
              )}
            />
          </div>
        </>
      )}
    </div>
  );
};

export default SubjectChatsCollection;
