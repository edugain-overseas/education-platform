import React from "react";
import { serverName } from "../../../constants/server";

export default function UserAvatar({ imageSrc, userName }) {
  return (
    <>
      {imageSrc ? (
        <img src={`${serverName}${imageSrc}`} alt={`${userName}`} />
      ) : (
        <span>{userName && userName[0]}</span>
      )}
    </>
  );
}
