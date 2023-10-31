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
import VideoPlayer from "../../VideoPlayer/VideoPlayer";
import DocumentInfoCard from "../../shared/DocumentInfoCard/DocumentInfoCard";
import LinkCard from "../../shared/LinkCard/LinkCard";
import ImageGroup from "../../shared/ImageGroup/ImageGroup";

export default function Lecture({ lessonData }) {
  const [lectureTitle, setLectureTitle] = useState("");
  const [lectureDesc, setLectureDesc] = useState("");
  const [isTitleEdit, setIsTitleEdit] = useState(false);
  const [fullscreen, setFullscreen] = useState(false);
  const { id: lectureId } = lessonData;
  const lectureContent =
    [...lessonData?.data?.lectureInfo].sort(
      (itemA, itemB) => itemA.attributeNumber - itemB.attributeNumber
    ) || null;
  const isEdit = useSelector(getIsEdit);

  const handleOpenModal = (open) => {
    const modalRef = document.querySelector(".ant-modal-wrap.pdfReader");
    const modalBodyRef = modalRef.querySelector(".ant-modal-body");
    const handleClick = (e) => {
      if (e.target === e.currentTarget) {
        setFullscreen(false);
      }
    };
    if (open) {
      modalBodyRef.addEventListener("click", handleClick);
    }
  };

  useEffect(() => {
    if (isEdit) {
      setLectureTitle(lessonData?.data?.lessonTitle);
      setLectureDesc(lessonData?.data?.lessonDescription);
    }
  }, [isEdit, lessonData]);

  const renderLectureContent = () =>
    lectureContent.map((section) => {
      const {
        attributeType: type,
        attributeId: id,
        attributeTitle: title,
        attributeText: text,
        downloadAllowed,
        // fileName,
        // fileSize,
        filePath,
        // hided,
        attributeFiles,
        attributeLinks,
        attributeImages,
      } = section;
      switch (type) {
        case "text":
          // console.log(fileName, fileSize, hided);
          return (
            <section key={id} id={type} className={styles.section}>
              {title && (
                <h3
                  className={styles.sectionTitle}
                  dangerouslySetInnerHTML={{ __html: title }}
                ></h3>
              )}
              {text && (
                <div
                  className={styles.sectionContentWrapper}
                  dangerouslySetInnerHTML={{ __html: text }}
                ></div>
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
              <h3
                className={styles.sectionTitle}
                dangerouslySetInnerHTML={{ __html: title }}
              ></h3>
              <PDFReader
                pdf={`${serverName}${encodedFilePathPresent}`}
                setFullscreen={setFullscreen}
                fullscreen={fullscreen}
              />
              <Modal
                open={fullscreen}
                afterOpenChange={handleOpenModal}
                footer={null}
                mask={false}
                width="100vw"
                wrapClassName="pdfReader"
                destroyOnClose
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
              {text && text !== "" && (
                <div
                  className={styles.sectionContentWrapper}
                  dangerouslySetInnerHTML={{ __html: text }}
                ></div>
              )}
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
              <h3
                className={styles.sectionTitle}
                dangerouslySetInnerHTML={{ __html: title }}
              ></h3>
              <audio
                src={`${serverName}${encodedFilePathAudio}`}
                controls={true}
                width="true"
                height="auto"
                controlsList={downloadAllowed ? "" : "nodownload"}
              ></audio>
              {text && text !== "" && (
                <div
                  className={styles.sectionContentWrapper}
                  dangerouslySetInnerHTML={{ __html: text }}
                ></div>
              )}
            </section>
          );
        case "video":
          const encodedFilePathVideo = filePath?.replace(/ /g, "%20");
          return (
            <section
              key={id}
              id={type}
              className={`${styles.section} ${styles.sectionVideo}`}
            >
              <h3
                className={styles.sectionTitle}
                dangerouslySetInnerHTML={{ __html: title }}
              ></h3>
              <div className={styles.videoWrapper}>
                <VideoPlayer file={{ filePath: encodedFilePathVideo }} />
              </div>
              {text && text !== "" && (
                <div
                  className={styles.sectionContentWrapper}
                  dangerouslySetInnerHTML={{ __html: text }}
                ></div>
              )}
            </section>
          );
        case "file":
          return (
            <section
              key={id}
              id={type}
              className={`${styles.section} ${styles.sectionFiles}`}
            >
              <h3 className={styles.sectionTitle}>{title}</h3>
              {attributeFiles && attributeFiles.length !== 0 && (
                <div className={styles.filesWrapper}>
                  {attributeFiles.map((file) => (
                    <DocumentInfoCard
                      file={file}
                      key={file.fileId}
                      styles={styles}
                    />
                  ))}
                </div>
              )}
              {text && text !== "" && (
                <div
                  className={styles.sectionContentWrapper}
                  dangerouslySetInnerHTML={{ __html: text }}
                ></div>
              )}
            </section>
          );
        case "link":
          return (
            <section
              key={id}
              id={type}
              className={`${styles.section} ${styles.sectionFiles}`}
            >
              <h3 className={styles.sectionTitle}>{title}</h3>
              {attributeLinks && attributeLinks.length !== 0 && (
                <div className={styles.linksWrapper}>
                  {attributeLinks.map(({ linkId, link, anchor }) => (
                    <LinkCard
                      key={linkId}
                      link={link}
                      text={anchor}
                      styles={styles}
                    />
                  ))}
                </div>
              )}
              {text && text !== "" && (
                <div
                  className={styles.sectionContentWrapper}
                  dangerouslySetInnerHTML={{ __html: text }}
                ></div>
              )}
            </section>
          );
        case "picture":
          return (
            <section key={id} id={type} className={styles.section}>
              <h3
                className={styles.sectionTitle}
                dangerouslySetInnerHTML={{ __html: title }}
              ></h3>
              <ImageGroup
                imagesData={attributeImages}
                styles={styles}
                isDesc={true}
              />
            </section>
          );
        default:
          return null;
      }
    });
  // console.log(lectureContent);
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
            <textarea
              className={styles.titleInput}
              type="text"
              value={lectureTitle}
              onChange={(e) => setLectureTitle(e.target.value)}
              rows="auto"
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
            {lectureContent &&
              lectureContent.length !== 0 &&
              renderLectureContent()}
            {isEdit && (
              <LectureConstructor
                lectureId={lectureId}
                lectureContent={lectureContent}
              />
            )}
          </>
        ) : (
          <Empty />
        )}
      </div>
    </div>
  );
}
