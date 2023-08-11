import React from "react";
import CoursePageConstructor from "../../../../components/CoursePageConstructor/CoursePageConstructor";
import { ReactComponent as DownloadIcon } from "../../../../images/icons/download.svg";
import bg from "../../../../images/MedicineBackground.png";
import styles from "./CourseItemPage.module.scss";

export default function CourseItemPage() {
  return (
    <div className={styles.mainWrapper}>
      <section
        className={styles.hero}
        style={{
          backgroundImage: `url(${bg})`,
        }}
      >
        <div className={styles.heroContainer}>
          <div className={styles.logoWrapper}>
            <img
              src="https://www.creativosonline.org/wp-content/uploads/2022/02/Logo-VANS.png"
              alt="logo"
              className={styles.logoImage}
            />
            <button className={styles.logoBtn}>
              <DownloadIcon />
            </button>
          </div>
          <div className={styles.heroInfoWrapper}>
            <div className={styles.heroInfoTitlesWrapper}>
              <h1>Medicine</h1>
              <h3>Teacher: Doctor Galliy Bogdan Viktorovich</h3>
            </div>
            <ul className={styles.courseItemsList}>
              <li className={styles.courseItem}>
                <div className={styles.itemValue}>
                  <span>{86}</span>
                  <input type="number" />
                </div>
                <p className={styles.itemLabel}>lectures</p>
              </li>
              <li className={styles.courseItem}>
                <div className={styles.itemValue}>
                  <span>{86}</span>
                  <input type="number" />
                </div>
                <p className={styles.itemLabel}>test</p>
              </li>
              <li className={styles.courseItem}>
                <div className={styles.itemValue}>
                  <span>{86}</span>
                  <input type="number" />
                </div>
                <p className={styles.itemLabel}>seminar</p>
              </li>
              <li className={styles.courseItem}>
                <div className={styles.itemValue}>
                  <span>{86}</span>
                  <input type="number" />
                </div>
                <p className={styles.itemLabel}>modul</p>
              </li>
            </ul>
          </div>
          <button className={styles.bgBtn}>
            <span>Change background</span>
            <DownloadIcon />
          </button>
        </div>
      </section>
      <CoursePageConstructor styles={styles} />
    </div>
  );
}
