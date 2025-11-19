import styles from "./ProfilePicture.module.css";
import React from "react";

const ProfilePicture = ({ src, alt }) => {
  return (
    <img className={styles.profilePic} src={src} alt={alt} />
  );
};

export default ProfilePicture;