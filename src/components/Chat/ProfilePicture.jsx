import styles from "./ProfilePicture.module.css";

const ProfilePicture = ({ src, alt }) => {
  return (
    <img className={styles.profilePic} src={src} alt={alt} />
  );
};

export default ProfilePicture;