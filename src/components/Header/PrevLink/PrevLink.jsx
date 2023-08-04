import React from "react";
import { useNavigate } from "react-router-dom";
import { ReactComponent as ArrowLeft } from "../../../images/icons/arrow-left.svg";
import styles from "./PrevLink.module.scss";

export const PrevLink = () => {
  const navigate = useNavigate();

  return (
    <button className={styles.link} onClick={()=>{navigate(-1)}}>
      <ArrowLeft />
      Prev
    </button>
  );
};
