import React from "react";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { loginThunk } from "../../redux/user/userOperations";
import styles from './LoginPage.module.scss'

export const LoginPage = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

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
    dispatch(loginThunk({
        username,
        password
    }))
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
              type='password'
              name="password"
              value={password}
              onChange={onPasswordChange}
              className={styles.input}
              placeholder="Password"
            />
          </label>
          <button type="submit" className={styles.button}>Login</button>
        </form>
      </div>
    </div>
  );
};
