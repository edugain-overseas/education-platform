import React from "react";
import { ReactComponent as ArchiveIcon } from "../../../../../../images/icons/archive.svg";
import styles from "./InstructionsList.module.scss";
import { NavLink } from "react-router-dom";
import { navLinkActiveHandler } from "../../../../../../helpers/navLinkActiveHandler";

const InstructionsList = ({ data }) => {
  console.log(data);
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
    </ul>
  );
};

export default InstructionsList;
