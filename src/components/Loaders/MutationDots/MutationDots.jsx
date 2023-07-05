import React from "react";
import { MutatingDots } from "react-loader-spinner";
import styles from './MutationDots.module.scss'

export default function MutationDots() {
  return (
    <MutatingDots
      height="100"
      width="100"
      color="#001C54"
      secondaryColor="#00c808"
      radius="10"
      ariaLabel="mutating-dots-loading"
      wrapperStyle={{}}
      wrapperClass={styles.loaderWrapper}
      visible={true}
    />
  );
}

