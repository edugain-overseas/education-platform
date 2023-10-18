import React from "react";
import { useSelector } from "react-redux";
import { NavLink } from "react-router-dom";
import { navLinkActiveHandler } from "../../../../../../helpers/navLinkActiveHandler";
import { getIsEdit } from "../../../../../../redux/config/configSelectors";
import { ReactComponent as ArchiveIcon } from "../../../../../../images/icons/archive.svg";
import { ReactComponent as PlusIcon } from "../../../../../../images/icons/plus.svg";
import styles from "./InstructionsList.module.scss";

const InstructionsList = ({ data }) => {
  console.log(data);
  const isEdit = useSelector(getIsEdit);

  const handleAddInstruction = () => {

  }

  return (
    <ul className={styles.instructionsList}>
      {[...data]
        .sort((itemA, itemB) => itemA.number - itemB.number)
        .map(({ instructionId, title }) => (
          <li key={instructionId}>
            <NavLink
              to={`${instructionId}`}
              className={({ isActive }) =>
                navLinkActiveHandler(isActive, styles)
              }
            >
              <ArchiveIcon />
              {title && <h4>{title}</h4>}
            </NavLink>
          </li>
        ))}
      {isEdit && (
        <li className={styles.addItem}>
          <button className={styles.addCategoryBtn} onClick={handleAddInstruction}>
            <PlusIcon />
          </button>
        </li>
      )}
    </ul>
  );
};

export default InstructionsList;
