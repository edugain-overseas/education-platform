import React from "react";
import { ReactComponent as LinkIcon } from "../../../images/icons/link.svg";

const LinkCard = ({ link, text, styles }) => {
  return (
    <a
      className={styles.linkWrapper}
      href={link}
      rel="noreferrer noopener"
      target="_blank"
    >
      <LinkIcon />
      <span>{text ? text : link}</span>
    </a>
  );
};

export default LinkCard;
