import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import SectionItems from "./SectionItems";
import SectionSteps from "./SectionSteps";
import SectionProgram from "./SectionProgram";
import { getSubjectAbout } from "../../redux/subject/subjectSelectors";
import { useParams } from "react-router-dom";
import { setDefault } from "../../redux/config/configSlice";
import { useDispatch } from "react-redux";
import { getIsEdit, getIsSubmit } from "../../redux/config/configSelectors";
import {
  createSubjectAboutThunk,
  updateSubjectAboutThunk,
} from "../../redux/subject/subjectOperations";
import SectionTeachers from "./SectionTeachers";
import { Empty } from "antd";

export default function CoursePageConstructor({ styles }) {
  const dispatch = useDispatch();
  const { id } = useParams();
  const isSubmit = useSelector(getIsSubmit);
  const defaultSubjectData = useSelector(getSubjectAbout).find(
    (subject) => subject.id === 0
  ).data;
  const aboutSubjectData =
    useSelector(getSubjectAbout).find((subject) => subject.id === id)?.data ||
    defaultSubjectData;

  const itemsData = aboutSubjectData.find(
    (section) => section.section_type === "items"
  );
  const stepsData = aboutSubjectData.find(
    (section) => section.section_type === "steps"
  );
  const programData = aboutSubjectData.find(
    (section) => section.section_type === "program"
  );
  const teachersData = aboutSubjectData.find(
    (section) => section.section_type === "teachers"
  );
  const isEdit = useSelector(getIsEdit);

  const isDefault = defaultSubjectData === aboutSubjectData;

  const [itemsSectionData, setItemsSectionData] = useState(itemsData);
  const [stepsSectionData, setStepsSectionData] = useState(stepsData);
  const [programSectionData, setProgramSectionData] = useState(programData);
  const [teachersSectionData, setTeachersSectionData] = useState(teachersData);

  useEffect(() => {
    return () => {
      dispatch(setDefault());
    };
  }, [dispatch]);

  useEffect(() => {
    const handleSumbit = () => {
      const updatedSubjectAbout = [
        itemsSectionData,
        stepsSectionData,
        programSectionData,
        teachersSectionData,
      ];
      dispatch(
        isDefault
          ? createSubjectAboutThunk({ id, updatedSubjectAbout })
          : updateSubjectAboutThunk({ id, updatedSubjectAbout })
      ).then(dispatch(setDefault()));
    };
    if (isSubmit) {
      handleSumbit();
    }
  }, [
    isSubmit,
    isDefault,
    itemsSectionData,
    stepsSectionData,
    programSectionData,
    teachersSectionData,
    id,
    dispatch,
  ]);

  return isDefault ? (
    isEdit ? (
      <>
        <SectionItems
          styles={styles}
          data={itemsData}
          setItemsSectionData={setItemsSectionData}
        />
        <SectionSteps
          styles={styles}
          data={stepsData}
          setStepsSectionData={setStepsSectionData}
        />
        <SectionProgram
          styles={styles}
          data={programData}
          setProgramSectionData={setProgramSectionData}
        />
        <SectionTeachers
          styles={styles}
          data={teachersData}
          setTeachersSectionData={setTeachersSectionData}
        />
      </>
    ) : (
      <Empty />
    )
  ) : (
    <>
      <SectionItems
        styles={styles}
        data={itemsData}
        setItemsSectionData={setItemsSectionData}
      />
      <SectionSteps
        styles={styles}
        data={stepsData}
        setStepsSectionData={setStepsSectionData}
      />
      <SectionProgram
        styles={styles}
        data={programData}
        setProgramSectionData={setProgramSectionData}
      />
      <SectionTeachers
        styles={styles}
        data={teachersData}
        setTeachersSectionData={setTeachersSectionData}
      />
    </>
  );
}
