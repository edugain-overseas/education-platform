import React from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Empty } from "antd";
import { ReactComponent as PrevIcon } from "../../../../../images/icons/prev.svg";
import { ReactComponent as NextIcon } from "../../../../../images/icons/next.svg";
import { ReactComponent as DetailsIcon } from "../../../../../images/icons/details.svg";
import { ReactComponent as LinkIcon } from "../../../../../images/icons/link.svg";
import { useSelector } from "react-redux";
import { getSubjectInstructions } from "../../../../../redux/subject/subjectSelectors";
import { attachedFileToInstruction } from "../../../../../helpers/attachedFileToInstruction";
import styles from "./InstructionContent.module.scss";

const InstructionContent = () => {
  const { id, instructionId } = useParams();
  const navigate = useNavigate();

  const subjectInstructions = useSelector(getSubjectInstructions)?.find(
    (instructionsData) => instructionsData.id === id
  )?.data;

  const instructionData =
    subjectInstructions
      ?.reduce((result, category) => [...result, ...category.instructions], [])
      ?.find((instruction) => instruction.instructionId === +instructionId) ||
    null;
  console.log(instructionData);

  const { title, subTitle, text, files, links } = instructionData || {};

  const attachedData =
    files && links
      ? [...files, ...links].sort((itemA, itemB) => itemA.number - itemB.number)
      : [];

  const handlePrevInstructionClick = () => {
    navigate(`/courses/${id}/instructions/${+instructionId - 1}`);
  };

  const handleNextInstructionClick = () => {
    navigate(`/courses/${id}/instructions/${+instructionId + 1}`);
  };
  const renderAttachedContent = (contentData) => {
    console.log(contentData);
    if (contentData.link) {
      return (
        <a
          href={contentData.link}
          rel="noreferrer noopener"
          target="_blank"
          className={styles.attachedLink}
          key={contentData.number}
        >
          <LinkIcon />
          <span>{contentData.link}</span>
        </a>
      );
    }
    return attachedFileToInstruction(contentData, styles);
  };

  return (
    <>
      {instructionData ? (
        <>
          <div className={styles.instructionHeader}>
            <div className={styles.navBtnsWrapper}>
              <button
                disabled={instructionId === "1"}
                onClick={handlePrevInstructionClick}
              >
                <PrevIcon />
              </button>
              <button
                onClick={handleNextInstructionClick}
                disabled={instructionId === "2"}
              >
                <NextIcon />
              </button>
            </div>
            <button>
              <DetailsIcon />
            </button>
          </div>
          <div className={styles.instructionBody}>
            <div className={styles.textInfoWrapper}>
              <h3 className={styles.instructionTitle}>{title}</h3>
              {subTitle && (
                <h4 className={styles.instructionSubTitle}>{subTitle}</h4>
              )}
              {text && <p className={styles.instructionText}>{text}</p>}
            </div>
            {attachedData && (
              <div className={styles.instructionFiles}>
                {attachedData.map((contentData) =>
                  renderAttachedContent(contentData)
                )}
              </div>
            )}
          </div>
        </>
      ) : (
        <div className={styles.emptyWrapper}>
          <Empty />
        </div>
      )}
    </>
  );
};

export default InstructionContent;
