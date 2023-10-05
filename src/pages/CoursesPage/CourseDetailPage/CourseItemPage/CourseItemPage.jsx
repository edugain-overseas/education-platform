import React, { useEffect, useRef, useState } from "react";
import CoursePageConstructor from "../../../../components/CoursePageConstructor/CoursePageConstructor";
import { ReactComponent as DownloadIcon } from "../../../../images/icons/download.svg";
import { ReactComponent as ArrowUpIcon } from "../../../../images/icons/arrowUp.svg";
import styles from "./CourseItemPage.module.scss";
import { useSelector } from "react-redux";
import {
  getSubjectAbout,
  getSubjectMainInfo,
} from "../../../../redux/subject/subjectSelectors";
import { useParams } from "react-router-dom";
import { serverName } from "../../../../constants/server";
import {
  getIsEdit,
  getIsSubmit,
} from "../../../../redux/config/configSelectors";
import { useDispatch } from "react-redux";
import { setDefault } from "../../../../redux/config/configSlice";
import {
  updateSubjectByIdThunk,
  updateSubjectImageThunk,
  updateSubjectLogoThunk,
} from "../../../../redux/subject/subjectOperations";

export default function CourseItemPage() {
  const [logoFile, setLogoFile] = useState(null);
  const [imageFile, setImageFile] = useState(null);
  const [lectures, setLectures] = useState("");
  const [tests, setTests] = useState("");
  const [seminars, setSeminars] = useState("");
  const [moduls, setModuls] = useState("");

  const logoInput = useRef(null);
  const imageInput = useRef(null);
  const containerRef = useRef(null);

  const { id } = useParams();

  const dispatch = useDispatch();

  const subjectData = useSelector(getSubjectMainInfo).find(
    (item) => `${item.id}` === id
  );

  const isSubmit = useSelector(getIsSubmit);
  const isEdit = useSelector(getIsEdit);

  useEffect(() => {
    if (subjectData) {
      setLectures(subjectData.quantity_lecture);
      setTests(subjectData.quantity_test);
      setSeminars(subjectData.quantity_seminar);
      setModuls(subjectData.quantity_module);
    }
  }, [subjectData]);

  useEffect(() => {
    const handleSumbit = () => {
      const updatedData = {
        quantity_lecture: lectures,
        quantity_seminar: seminars,
        quantity_test: tests,
        quantity_module: moduls,
      };
      dispatch(
        updateSubjectByIdThunk({ subjectId: id, subjectData: updatedData })
      );
      if (imageFile) {
        dispatch(updateSubjectImageThunk({ subjectId: id, file: imageFile }));
      }
      if (logoFile) {
        dispatch(updateSubjectLogoThunk({ subjectId: id, file: logoFile }));
      }
      dispatch(setDefault());
    };
    if (isSubmit) {
      console.log("SUBMIT");
      handleSumbit();
    }
  }, [
    isSubmit,
    id,
    dispatch,
    imageFile,
    lectures,
    logoFile,
    moduls,
    seminars,
    tests,
  ]);

  const handleLogoChange = (e) => {
    setLogoFile(e.target.files[0]);
  };

  const handleImageChange = (e) => {
    setImageFile(e.target.files[0]);
  };

  const onLecturesChange = (e) => {
    setLectures(+e.target.value);
  };

  const onTestsChange = (e) => {
    setTests(+e.target.value);
  };

  const onSeminarsChange = (e) => {
    setSeminars(+e.target.value);
  };

  const onModulsChange = (e) => {
    setModuls(+e.target.value);
  };

  const defaultSubjectData = useSelector(getSubjectAbout).find(
    (subject) => subject.id === 0
  ).data;

  const aboutSubjectData =
    useSelector(getSubjectAbout).find((subject) => subject.id === id)?.data ||
    defaultSubjectData;

  const isDefault = defaultSubjectData === aboutSubjectData;

  const scrollToTop = () => {
    document.getElementById("main").scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  return (
    <div className={styles.mainWrapper} id="main" ref={containerRef}>
      <section className={styles.hero}>
        {subjectData && (
          <img
            src={
              imageFile
                ? URL.createObjectURL(imageFile)
                : `${serverName}${subjectData.image_path}`
            }
            alt="backgroung"
            className={styles.backgroungImage}
          />
        )}
        <div className={styles.heroContainer}>
          <div className={styles.logoWrapper}>
            {subjectData && (
              <img
                src={
                  logoFile
                    ? URL.createObjectURL(logoFile)
                    : `${serverName}${subjectData.logo_path}`
                }
                alt="logo"
                className={styles.logoImage}
              />
            )}
            {isEdit && (
              <button
                className={styles.logoBtn}
                onClick={() => logoInput.current.click()}
              >
                <input
                  ref={logoInput}
                  type="file"
                  accept="image/*"
                  onChange={handleLogoChange}
                  className="hidden"
                />
                <DownloadIcon />
              </button>
            )}
          </div>
          <div className={styles.heroInfoWrapper}>
            <div className={styles.heroInfoTitlesWrapper}>
              <h1>Medicine</h1>
              <h3>Teacher: Doctor Galliy Bogdan Viktorovich</h3>
            </div>
            <ul className={styles.courseItemsList}>
              <li className={styles.courseItem}>
                <div className={styles.itemValue}>
                  {isEdit ? (
                    <input
                      type="number"
                      value={lectures}
                      onChange={onLecturesChange}
                    />
                  ) : (
                    subjectData && <span>{subjectData.quantity_lecture}</span>
                  )}
                </div>
                <p className={styles.itemLabel}>lectures</p>
              </li>
              <li className={styles.courseItem}>
                <div className={styles.itemValue}>
                  {isEdit ? (
                    <input
                      type="number"
                      value={tests}
                      onChange={onTestsChange}
                    />
                  ) : (
                    subjectData && <span>{subjectData.quantity_test}</span>
                  )}
                </div>
                <p className={styles.itemLabel}>test</p>
              </li>
              <li className={styles.courseItem}>
                <div className={styles.itemValue}>
                  {isEdit ? (
                    <input
                      type="number"
                      value={seminars}
                      onChange={onSeminarsChange}
                    />
                  ) : (
                    subjectData && <span>{subjectData.quantity_seminar}</span>
                  )}
                </div>
                <p className={styles.itemLabel}>seminar</p>
              </li>
              <li className={styles.courseItem}>
                <div className={styles.itemValue}>
                  {isEdit ? (
                    <input
                      type="number"
                      value={moduls}
                      onChange={onModulsChange}
                    />
                  ) : (
                    subjectData && <span>{subjectData.quantity_module}</span>
                  )}
                </div>
                <p className={styles.itemLabel}>modul</p>
              </li>
            </ul>
          </div>
          {isEdit && (
            <button
              className={styles.bgBtn}
              onClick={() => imageInput.current.click()}
            >
              <input
                ref={imageInput}
                type="file"
                accept="image/*"
                onChange={handleImageChange}
                className="hidden"
              />
              <span>Change background</span>
              <DownloadIcon />
            </button>
          )}
        </div>
      </section>
      <CoursePageConstructor styles={styles} />
      {(!isDefault || isEdit) && (
        <button onClick={scrollToTop} className={styles.arrowUp}>
          <ArrowUpIcon />
        </button>
      )}
    </div>
  );
}
