import React, { useEffect, useState } from "react";
import PDFReader from "../../shared/PDFReader/PDFReader";
import { serverName } from "../../../constants/server";
import { Empty, Modal } from "antd";
import "./ant.css";
import { useSelector } from "react-redux";
import { getIsEdit } from "../../../redux/config/configSelectors";
import { ReactComponent as EditIcon } from "../../../images/icons/edit.svg";
import LectureConstructor from "./LectureContructor./LectureConstructor";
import styles from "./Lecture.module.scss";

export default function Lecture({ lessonData }) {
  const [lectureTitle, setLectureTitle] = useState("");
  const [lectureDesc, setLectureDesc] = useState("");
  const [isTitleEdit, setIsTitleEdit] = useState(false);
  const [fullscreen, setFullscreen] = useState(false);
  const { id: lectureId } = lessonData;
  const lectureContent = lessonData?.data?.lectureInfo || null;
  const isEdit = useSelector(getIsEdit);
  console.log(isTitleEdit);

  useEffect(() => {
    if (isEdit) {
      setLectureTitle(lessonData?.data?.lessonTitle);
      setLectureDesc(lessonData?.data?.lessonDescription);
    }
  }, [isEdit, lessonData]);

  const renderLectureContent = () =>
    [...lectureContent]
      .sort((itemA, itemB) => itemA.attributeNumber - itemB.attributeNumber)
      .map((section) => {
        const {
          attributeType: type,
          attributeNumber: id,
          attributeTitle: title,
          // attributeSubTitle: subTitle,
          attributeValue: content,
          downloadAllowed,
          fileName,
          fileSize,
          filePath,
        } = section;
        switch (type) {
          case "text":
            console.log(fileName, fileSize);
            return (
              <section key={id} id={type} className={styles.section}>
                {title && <h3 className={styles.sectionTitle}>{title}</h3>}
                {/* {subTitle && (
                <h4 className={styles.sectionSubTitle}>{subTitle}</h4>
              )} */}
                {content && (
                  <div className={styles.sectionContentWrapper}>{content}</div>
                )}
              </section>
            );
          case "present":
            const encodedFilePathPresent = filePath?.replace(/ /g, "%20");
            return (
              <section
                key={id}
                id={type}
                className={`${styles.section} ${styles.sectionPDF}`}
              >
                <h3 className={styles.sectionTitle}>{title}</h3>
                <PDFReader
                  pdf={`${serverName}${encodedFilePathPresent}`}
                  setFullscreen={setFullscreen}
                  fullscreen={fullscreen}
                />
                <Modal
                  open={fullscreen}
                  footer={null}
                  closeIcon={null}
                  mask={false}
                  width="100vw"
                  wrapClassName="pdfReader"
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
                    pdf={`${serverName}${encodedFilePathPresent}`}
                    setFullscreen={setFullscreen}
                    fullscreen={fullscreen}
                  />
                </Modal>
              </section>
            );
          case "audio":
            const encodedFilePathAudio = filePath?.replace(/ /g, "%20");
            return (
              <section
                key={id}
                id={type}
                className={`${styles.section} ${styles.sectionAudio}`}
              >
                <h3 className={styles.sectionTitle}>{title}</h3>
                <audio
                  src={`${serverName}${encodedFilePathAudio}`}
                  controls={true}
                  width="true"
                  height="auto"
                  controlsList={downloadAllowed ? "" : "nodownload"}
                ></audio>
              </section>
            );
          default:
            return null;
        }
      });
  console.log(lectureContent);
  return (
    <div className={styles.lectureContainer}>
      <div className={styles.lectureContent}>
        <div
          className={
            isEdit
              ? `${styles.titleWrapper} ${styles.titleWrapperBordered}`
              : styles.titleWrapper
          }
        >
          {isEdit && isTitleEdit ? (
            <input
              className={styles.titleInput}
              type="text"
              value={lectureTitle}
              onChange={(e) => setLectureTitle(e.target.value)}
            />
          ) : (
            <h2>
              <span>Theme: </span>
              {lessonData?.data?.lessonTitle}
            </h2>
          )}
          {isEdit && isTitleEdit ? (
            <input
              className={styles.titleInput}
              type="text"
              value={lectureDesc}
              onChange={(e) => setLectureDesc(e.target.value)}
            />
          ) : (
            <h2>
              <span>Description: </span>
              {lessonData?.data?.lessonDescription}
            </h2>
          )}
          <h2>
            <span>Lecture №:</span>
            {lectureId}
          </h2>
          {isEdit && (
            <button
              type="button"
              onClick={() => setIsTitleEdit((prev) => !prev)}
            >
              <EditIcon />
            </button>
          )}
        </div>
        {(lectureContent && lectureContent.length !== 0) || isEdit ? (
          <>
            {renderLectureContent()}
            {isEdit && <LectureConstructor />}
          </>
        ) : (
          <Empty />
        )}
      </div>
    </div>
  );
}
