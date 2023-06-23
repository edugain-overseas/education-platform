import React from "react";
import { Header } from "../Header/Header";
import { SideBar } from "../SIdeBar/SideBar";
import styles from "./MainLayout.module.scss";
import { Outlet } from "react-router-dom";
import { HomePage } from "../../pages/HomePage/HomePage";
import { SchedulePage } from "../../pages/SchedulePage/SchedulePage";

export const MainLayout = () => {
  return (
    <div className={styles.mainWrapper}>
      <SideBar />
      <div className={styles.rightWrapper}>
        <Header />
        <main className={styles.main}>
          {/* <Outlet /> */}
          <HomePage />
          <SchedulePage/>
        </main>
      </div>
    </div>
  );
};
