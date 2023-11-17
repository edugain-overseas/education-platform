import React, { useEffect, useRef, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Empty, Image, Popconfirm } from "antd";
import { ReactComponent as PrevIcon } from "../../../../../images/icons/prev.svg";
import { ReactComponent as NextIcon } from "../../../../../images/icons/next.svg";
import { ReactComponent as DetailsIcon } from "../../../../../images/icons/details.svg";
import { ReactComponent as LinkIcon } from "../../../../../images/icons/link.svg";
import { ReactComponent as TrashIcon } from "../../../../../images/icons/trashRounded.svg";
import { ReactComponent as LinkCreateIcon } from "../../../../../images/icons/mediaTypesIcons/link.svg";
import { ReactComponent as FileIcon } from "../../../../../images/icons/mediaTypesIcons/file.svg";
import { ReactComponent as PictureIcon } from "../../../../../images/icons/mediaTypesIcons/picture.svg";
import { ReactComponent as AudioIcon } from "../../../../../images/icons/mediaTypesIcons/audio.svg";
import { useSelector } from "react-redux";
import { getSubjectInstructions } from "../../../../../redux/subject/subjectSelectors";
import {
  getIsEdit,
  getIsSubmit,
} from "../../../../../redux/config/configSelectors";
import SuperInput from "../../../../../components/shared/SuperInput/SuperInput";
import { useDispatch } from "react-redux";
import {
  attachFilesToInstructionThunk,
  attachLinkToInstructionThunk,
  deleteFileFromInstructionThunk,
  deleteLinkFromInstructionThunk,
  updateSubjectInstructionThunk,
} from "../../../../../redux/subject/subjectOperations";
import { setDefault } from "../../../../../redux/config/configSlice";
import {
  audioFormats,
  documentsFormats,
  imageFormats,
} from "../../../../../constants/fileFormats";
import styles from "./InstructionContent.module.scss";
import DocumentInfoCard from "../../../../../components/shared/DocumentInfoCard/DocumentInfoCard";
import { serverName } from "../../../../../constants/server";

const InstructionContent = () => {
  const [instructions, setInstructions] = useState(null);
  const [newLink, setNewLink] = useState("");
  const [popupLoading, setPopupLoading] = useState(false);
  const { id, instructionId } = useParams();
  const isEdit = useSelector(getIsEdit);
  const isSubmit = useSelector(getIsSubmit);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const fileRef = useRef();
  const imageRef = useRef();
  const audioRef = useRef();

  const subjectInstructions = useSelector(getSubjectInstructions)?.find(
    (instructionsData) => instructionsData.id === id
  )?.data;

  const instructionsData = subjectInstructions?.reduce(
    (result, category) => [...result, ...category.instructions],
    []
  );

  const instructionData =
    instructions?.find(
      (instruction) => instruction.instructionId === +instructionId
    ) || null;

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

  const renderAttachedContent = (attachedData) => {
    const documents = attachedData.filter(({ fileType }) =>
      documentsFormats.includes(fileType)
    );
    const links = attachedData.filter((file) => file.link);
    const images = attachedData.filter(({ fileType }) =>
      imageFormats.includes(fileType)
    );
    const audios = attachedData.filter(({ fileType }) =>
      audioFormats.includes(fileType)
    );
    return (
      <>
        {documents.length !== 0 && (
          <div className={styles.documentsWrapper}>
            {documents.map((file, index) => (
              <DocumentInfoCard
                file={file}
                styles={styles}
                key={index}
                handleDelete={handleDeleteFile}
              />
            ))}
          </div>
        )}
        {links.length !== 0 && (
          <div className={styles.linksWrapper}>
            {links.map((link, index) => (
              <div className={styles.linkWrapper} key={link.linkId}>
                <a
                  href={link.link}
                  rel="noreferrer noopener"
                  target="_blank"
                  className={styles.attachedLink}
                  key={index}
                >
                  <LinkIcon />
                  <span>{link.link}</span>
                </a>
                {isEdit && (
                  <button
                    className={styles.deleteBtn}
                    onClick={() => handleDeleteLink(link.linkId)}
                  >
                    <TrashIcon />
                  </button>
                )}
              </div>
            ))}
          </div>
        )}
        {images.length !== 0 && (
          <div className={styles.imagesWrapper}>
            <div className={styles.imagesIcon}>
              <PictureIcon />
            </div>
            <div className={styles.images}>
              <Image.PreviewGroup>
                {images.map((file, index) => (
                  <div className={styles.imageWrapper} key={index}>
                    <Image
                      src={`${serverName}${file.filePath}`}
                      alt={file.fileName}
                      className={styles.image}
                    />
                    {isEdit && (
                      <button
                        className={styles.deleteBtn}
                        onClick={() => handleDeleteFile(file)}
                      >
                        <TrashIcon />
                      </button>
                    )}
                  </div>
                ))}
              </Image.PreviewGroup>
            </div>
          </div>
        )}
        {audios.length !== 0 && (
          <div className={styles.audiosWrapper}>
            {audios.map((file, index) => (
              <div className={styles.audioWrapper} key={index}>
                <audio
                  src={`${serverName}${file.filePath}`}
                  controls
                  controlsList="nodownload"
                />
                {isEdit && (
                  <button
                    className={styles.deleteBtn}
                    onClick={() => handleDeleteFile(file)}
                  >
                    <TrashIcon />
                  </button>
                )}
              </div>
            ))}
          </div>
        )}
      </>
    );
  };

  const handleSubTitleChange = (value) => {
    setInstructions((prev) => {
      const updatedState = prev.map((instr) => {
        if (instr.instructionId === +instructionId) {
          return { ...instr, subTitle: value };
        }
        return instr;
      });
      return updatedState;
    });
  };

  const handleTextChange = (value) => {
    setInstructions((prev) => {
      const updatedState = prev.map((instr) => {
        if (instr.instructionId === +instructionId) {
          return { ...instr, text: value };
        }
        return instr;
      });
      return updatedState;
    });
  };

  const handleUploadFile = (e) => {
    const fileToUpload = e.target.files;
    const filesAmount = files.filter(({ fileType }) =>
      documentsFormats.includes(fileType)
    ).length;
    dispatch(
      attachFilesToInstructionThunk({
        instrId: +instructionId,
        files: fileToUpload,
        filesAmount: filesAmount,
        subjectId: +id,
      })
    );
  };

  const handleAttachLink = () => {
    if (newLink === "") {
      return;
    }
    setPopupLoading(true);
    const linkData = [
      {
        subject_instruction_id: +instructionId,
        link: newLink,
        number: 1,
      },
    ];
    dispatch(
      attachLinkToInstructionThunk({
        subjectId: +id,
        instructionId: +instructionId,
        linkData,
      })
    ).then(() => {
      setPopupLoading(false);
      setNewLink("");
    });
  };

  const handleDeleteFile = (file) => {
    dispatch(
      deleteFileFromInstructionThunk({
        subjectId: +id,
        instructionId: +instructionId,
        file,
      })
    );
  };

  const handleDeleteLink = (linkId) => {
    dispatch(
      deleteLinkFromInstructionThunk({
        subjectId: +id,
        instructionId: +instructionId,
        linkId,
      })
    );
  };

  useEffect(() => {
    if (!isEdit) {
      return;
    }
    if (isSubmit) {
      Promise.all(
        instructionsData.map((instr) => {
          if (
            instr.subTitile !==
              instructions.find(
                ({ instructionId }) => instr.instructionId === instructionId
              ).subTitle ||
            instr.text !==
              instructions.find(
                ({ instructionId }) => instr.instructionId === instructionId
              ).text
          ) {
            return dispatch(
              updateSubjectInstructionThunk({
                instrId: instr.instructionId,
                updatedData: {
                  subtitle: instructions.find(
                    ({ instructionId }) => instructionId === instr.instructionId
                  ).subTitle,
                  text: instructions.find(
                    ({ instructionId }) => instructionId === instr.instructionId
                  ).text,
                },
              })
            );
          }
          return null;
        })
      ).then(() => dispatch(setDefault()));
    }
    // eslint-disable-next-line
  }, [isSubmit]);

  useEffect(() => {
    setInstructions(instructionsData);
    // eslint-disable-next-line
  }, [subjectInstructions]);

  return (
    <>
      {instructionData ? (
        <>
          <div className={styles.instructionHeader}>
            <div className={styles.navBtnsWrapper}>
              <button
                disabled={+instructionId === 1}
                onClick={handlePrevInstructionClick}
              >
                <PrevIcon />
              </button>
              <button
                onClick={handleNextInstructionClick}
                disabled={+instructionId === instructionsData?.length}
              >
                <NextIcon />
              </button>
            </div>
            <h3 className={styles.instructionTitle} title={title}>
              {title}
            </h3>
            <button>
              <DetailsIcon />
            </button>
          </div>
          <div className={styles.instructionBody}>
            <div className={styles.textInfoWrapper}>
              {/* <h3 className={styles.instructionTitle}>{title}</h3> */}
              {!isEdit ? (
                <div className={styles.instructionSubTitleWrapper}>
                  <h4>{subTitle}</h4>
                </div>
              ) : (
                <div className={styles.instructionSubTitleWrapper}>
                  <input
                    type="text"
                    placeholder="Please write your subtitle here..."
                    value={subTitle || ""}
                    onChange={(e) => handleSubTitleChange(e.target.value)}
                  />
                </div>
              )}
              {!isEdit ? (
                <p
                  className={styles.instructionText}
                  dangerouslySetInnerHTML={{ __html: text }}
                ></p>
              ) : (
                <SuperInput
                  styles={styles}
                  placeholder="Please write your text here..."
                  state={text || ""}
                  setState={handleTextChange}
                  bordered={true}
                />
              )}
            </div>
            {attachedData && (
              <div className={styles.instructionFiles}>
                {renderAttachedContent(attachedData)}
              </div>
            )}
            {isEdit && (
              <div className={styles.addComponentPanel}>
                <button onClick={() => fileRef.current.click()}>
                  <FileIcon />
                  <input
                    ref={fileRef}
                    type="file"
                    multiple
                    accept=".pdf,.doc,.docx,.xls,.xlsx,.ppt,.pptx"
                    onChange={handleUploadFile}
                  />
                  <span>File</span>
                </button>
                <Popconfirm
                  title={null}
                  icon={null}
                  onConfirm={handleAttachLink}
                  okButtonProps={{ loading: popupLoading }}
                  description={
                    <div className={styles.linkPopconfirm}>
                      <LinkIcon />
                      <input
                        value={newLink}
                        onChange={(e) => setNewLink(e.target.value)}
                        placeholder="Write your link here please..."
                      />
                    </div>
                  }
                >
                  <button>
                    <LinkCreateIcon />
                    <span>Link</span>
                  </button>
                </Popconfirm>
                <button onClick={() => imageRef.current.click()}>
                  <PictureIcon />
                  <input
                    ref={imageRef}
                    type="file"
                    multiple
                    accept=".png, .jpg, .jpeg, .svg, .webp"
                    onChange={handleUploadFile}
                  />
                  <span>Pictures</span>
                </button>
                <button onClick={() => audioRef.current.click()}>
                  <AudioIcon />
                  <input
                    ref={audioRef}
                    type="file"
                    multiple={false}
                    accept=".mp3, .mpeg3, .wav"
                    onChange={handleUploadFile}
                  />
                  <span>Audio</span>
                </button>
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
