import React from "react";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { loginThunk } from "../../redux/user/userOperations";
import styles from "./LoginPage.module.scss";
import { getIsLoading } from "../../redux/user/userSelectors";
import { MutatingDots } from "react-loader-spinner";

export const LoginPage = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const isLoading = useSelector(getIsLoading);

  const dispatch = useDispatch();

  const onLoginChange = (e) => {
    const value = e.target.value;
    setUsername(value);
  };

  const onPasswordChange = (e) => {
    const value = e.target.value;
    setPassword(value);
  };

  const handleLogin = (e) => {
    e.preventDefault();
    console.log(username, password);
    const data = new FormData();
    data.append("username", username);
    data.append("password", password);
    dispatch(loginThunk(data));
  };

  return (
    <div className={styles.mainWrapper}>
      <div className={styles.formWrapper}>
        <p className={styles.logo}>LOGO</p>
        <form action="" onSubmit={handleLogin} className={styles.form}>
          <label htmlFor="login" className={styles.label}>
            <span>Login</span>
            <input
              type="text"
              name="login"
              value={username}
              onChange={onLoginChange}
              className={styles.input}
              placeholder="Login"
            />
          </label>
          <label htmlFor="password" className={styles.label}>
            <span>Password</span>
            <input
              type="password"
              name="password"
              value={password}
              onChange={onPasswordChange}
              className={styles.input}
              placeholder="Password"
            />
          </label>
          {isLoading ? (
            <MutatingDots
              height="100"
              width="100"
              color="#001C54"
              secondaryColor="#fff"
              radius="10"
              ariaLabel="mutating-dots-loading"
              wrapperStyle={{}}
              wrapperClass={styles.loaderWrapper}
              visible={true}
            />
          ) : (
            <button
              type="submit"
              className={styles.button}
            >
              Login
            </button>
          )}
        </form>
      </div>
    </div>
  );
};
