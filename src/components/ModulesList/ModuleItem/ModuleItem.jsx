import React, { useState } from "react";
import LessonsCardList from "./LessonsCardList/LessonsCardList";
import { Collapse, Popconfirm } from "antd";
import { useSelector } from "react-redux";
import { getIsEdit } from "../../../redux/config/configSelectors";
// import {ReactComponent as AddIcon} from '../../../images/icons/plus.svg'
import styles from "./ModuleItem.module.scss";
import { useDispatch } from "react-redux";
import { addNewModuleThunk } from "../../../redux/subject/subjectOperations";
import { useParams } from "react-router-dom";
import { getSubjectData } from "../../../redux/subject/subjectSelectors";

export default function ModuleItem({ module }) {
  const [isAddModuleBtn, setIsAddModuleBtn] = useState(false);
  const [openDialog, setOpenDialog] = useState(false);
  const [newTitle, setNewTitle] = useState("");
  const [newDesc, setNewDesc] = useState("");
  const [confirmLoading, setConfirmLoading] = useState(false);

  const { id: subjectId } = useParams();
  const isEdit = useSelector(getIsEdit);
  const subjectModules = useSelector(getSubjectData).find(
    (subject) => `${subject.id}` === subjectId
  )?.subjects_lessons;
  const dispatch = useDispatch();

  const item = [
    {
      key: module.module_id,
      label: (
        <div className={styles.moduleTitleWrapper}>
          <h3 className={styles.moduleTitle}>
            <span>Module {module.module_number}: </span>
            {module.module_name}
          </h3>
          <p className={styles.moduleDescription}>
            {module.module_desc && `Description: ${module.module_desc}`}
          </p>
        </div>
      ),
      children: module.module_lessons && (
        <LessonsCardList lessons={module.module_lessons} />
      ),
      showArrow: false,
    },
  ];

  const addModuleForm = (
    <div className={styles.addModuleForm}>
      <input
        type="text"
        placeholder="Please write module title here..."
        value={newTitle}
        onChange={(e) => setNewTitle(e.target.value)}
      />
      <input
        type="text"
        placeholder="Please write module description here..."
        value={newDesc}
        onChange={(e) => setNewDesc(e.target.value)}
      />
    </div>
  );

  const handleOpenDialog = () => {
    setOpenDialog(true);
  };

  const handleCancelDialog = () => {
    setNewTitle("");
    setNewDesc("");
    setOpenDialog(false);
  };

  const handleOkDialog = () => {
    if (newTitle === "") {
      return;
    }

    setConfirmLoading(true);

    const moduleDataWithDesc = {
      number: subjectModules.length + 1,
      name: newTitle,
      description: newDesc,
      subject_id: +subjectId,
    };

    const moduleDataWithoutDesc = {
      number: subjectModules.length + 1,
      name: newTitle,
      subject_id: +subjectId,
    };

    dispatch(
      addNewModuleThunk(
        newDesc === "" ? moduleDataWithoutDesc : moduleDataWithDesc
      )
    ).then(() => {
      setConfirmLoading(false);
      setNewTitle("");
      setNewDesc("");
      setOpenDialog(false);
    });
  };

  return (
    <li className={styles.moduleItem}>
      <p className={styles.moduleSimestr}>1 cours - 1 simestr</p>
      <div
        onMouseEnter={() => setIsAddModuleBtn(true)}
        onMouseLeave={() => setIsAddModuleBtn(false)}
      >
        <Collapse
          defaultActiveKey={module.module_id}
          items={item}
          ghost={true}
          className={styles.antCollapse}
        />
        {isAddModuleBtn && isEdit && (
          <Popconfirm
            arrow={false}
            title={
              <span className={styles.dialogTitle}>Create new module</span>
            }
            open={openDialog}
            description={addModuleForm}
            // icon={<AddIcon/>}
            icon={null}
            onCancel={handleCancelDialog}
            onConfirm={handleOkDialog}
            okButtonProps={{
              loading: confirmLoading,
            }}
          >
            <button className={styles.addModuleBtn} onClick={handleOpenDialog}>
              +
            </button>
          </Popconfirm>
        )}
      </div>
    </li>
  );
}
