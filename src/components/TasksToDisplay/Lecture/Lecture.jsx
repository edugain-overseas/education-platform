import React, { useState } from "react";
import PDFReader from "../../shared/PDFReader/PDFReader";
import { serverName } from "../../../constants/server";
import { Empty, Modal } from "antd";
import "./ant.css";
import styles from "./Lecture.module.scss";

export default function Lecture({ lessonData }) {
  const [fullscreen, setFullscreen] = useState(false);
  const { id: lectureId } = lessonData;
  const lectureContent = lessonData?.data?.lectureInfo || null;

  const renderLectureContent = () =>
    lectureContent.map((section) => {
      const {
        attributeType: type,
        attributeNumber: id,
        attributeTitle: title,
        value: content,
      } = section;
      switch (type) {
        case "text":
          return (
            <section key={id} id={type} className={styles.section}>
              <h3 className={styles.sectionTitle}>{title}</h3>
              <div className={styles.sectionContentWrapper}>{content}</div>
            </section>
          );
        case "pdf":
          const encodedFilePath = content.replace(/ /g, "%20");
          console.log(`${serverName}${encodedFilePath}`);
          return (
            <section
              key={id}
              id={type}
              className={`${styles.section} ${styles.sectionPDF}`}
            >
              <h3 className={styles.sectionTitle}>{title}</h3>
              <PDFReader
                pdf={`${serverName}${encodedFilePath}`}
                setFullscreen={setFullscreen}
                fullscreen={fullscreen}
              />
              <Modal
                open={fullscreen}
                footer={null}
                closeIcon={null}
                mask={false}
                width="100vw"
                style={{
                  inset: 0,
                  height: "100vh",
                  padding: 0,
                  maxWidth: "initial",
                }}
                bodyStyle={{
                  padding: "20rem 0",
                  width: "100vw",
                  height: "100vh",
                  background: "rgba(0,0,0, 0.5)",
                  display: "flex",
                  alignItems: "center",
                }}
              >
                <PDFReader
                  pdf={`${serverName}${encodedFilePath}`}
                  setFullscreen={setFullscreen}
                />
              </Modal>
            </section>
          );

        default:
          return null;
      }
    });

  return (
    <div className={styles.lectureContainer}>
      <div className={styles.lectureContent}>
        <div className={styles.titleWrapper}>
          <h2>
            <span>Theme: </span>
            {lessonData.data.lessonTitle}
          </h2>
          <h2>
            <span>Lecture №:</span>
            {lectureId}
          </h2>
        </div>
        {lectureContent && lectureContent.length !== 0 ? (
          renderLectureContent()
        ) : (
          <Empty />
        )}
      </div>
    </div>
  );
}
