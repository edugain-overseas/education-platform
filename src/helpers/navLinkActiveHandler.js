export const navLinkActiveHandler = (isActive, styles) => {
  const classes = [styles.navLink];
  if (isActive) classes.push(styles["navLink--active"]);
  return classes.join(" ");
};
