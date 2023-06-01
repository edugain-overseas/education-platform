import React from "react";
import { Header } from "../Header/Header";
import { SideBar } from "../SIdeBar/SideBar";
import styles from './MainLayout.module.scss'
import { Outlet } from "react-router-dom";

export const MainLayout = () => {
  return (
    <div className={styles.mainWrapper}>
      <SideBar />
      <div className={styles.rightWrapper}>
        <Header />
        <Outlet />
      </div>
    </div>
  );
};
