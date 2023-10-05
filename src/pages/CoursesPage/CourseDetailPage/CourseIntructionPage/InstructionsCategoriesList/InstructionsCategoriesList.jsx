import React from "react";
import InstructionsList from "./InstructionsList/InstructionsList";
import { useSelector } from "react-redux";
import { getIsEdit } from "../../../../../redux/config/configSelectors";
import { ReactComponent as PlusIcon } from "../../../../../images/icons/plus.svg";
import { ReactComponent as DetailsIcon } from "../../../../../images/icons/details.svg";
import { ReactComponent as EditIcon } from "../../../../../images/icons/edit.svg";
import { ReactComponent as DragIcon } from "../../../../../images/icons/burger.svg";
import { ReactComponent as DeleteIcon } from "../../../../../images/icons/minus.svg";
import { ReactComponent as DisplayOffIcon } from "../../../../../images/icons/displayOff.svg";
// import { ReactComponent as SubmitIcon } from "../../../../../images/icons/check.svg";
// import { ReactComponent as CancelIcon } from "../../../../../images/icons/cross.svg";
import styles from "./InstructionsCategoriesList.module.scss";

const InstructionsCategoriesList = ({ data }) => {
  const isEdit = useSelector(getIsEdit);

  return (
    <ul className={styles.categoriesList}>
      {data.map((data) => (
        <li key={data.categoryId}>
          <h3>{data.category}</h3>
          <InstructionsList data={data.instructions} />
          {isEdit && (
            <>
              <div className={styles.editPanel}>
                <button>
                  <EditIcon />
                </button>
                <button>
                  <DragIcon />
                </button>
                <button>
                  <DeleteIcon />
                </button>
                <button>
                  <DisplayOffIcon />
                </button>
              </div>
              <div className={styles.detailPanel}>
                <button>
                  <DetailsIcon />
                </button>
              </div>
            </>
          )}
        </li>
      ))}
      {isEdit && (
        <li className={styles.addItem}>
          <button className={styles.addCategoryBtn}>
            <PlusIcon />
          </button>
        </li>
      )}
    </ul>
  );
};

export default InstructionsCategoriesList;
