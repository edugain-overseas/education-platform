import React from "react";
import { ReactComponent as LogoutIcon } from "../../images/icons/logout.svg";
import styles from "./LogoutButton.module.scss";
import { useDispatch } from "react-redux";
import { logoutThunk } from "../../redux/user/userOperations";

export const LogoutButton = () => {
  const dispatch = useDispatch();
  const handleLogout = () => {
    console.log('asdasd');
    dispatch(logoutThunk());
  };

  return (
    <button
      className={styles.LogoutButton}
      type="button"
      onClick={handleLogout}
    >
      <LogoutIcon />
      <span>Log out</span>
    </button>
  );
};
