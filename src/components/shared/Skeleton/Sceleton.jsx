import React from "react";
import styles from "./Skeleton.module.scss";

const Sceleton = ({ style }) => {
  return <div className={styles.sceleton} style={style}></div>;
};

export default Sceleton;
