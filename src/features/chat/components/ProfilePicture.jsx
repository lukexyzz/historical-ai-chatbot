import styles from "./ProfilePicture.module.css";

/**
 * A component that displays a profile picture.
 * 
 * @component
 * @param {Object} props - The component props.
 * @param {string} props.src - The source URL of the image.
 * @param {string} props.alt - The alt text for the image.
 * @returns {JSX.Element} The rendered profile picture.
 */
const ProfilePicture = ({ src, alt }) => {
  return (
    <img className={styles.profilePic} src={src} alt={alt} />
  );
};

export default ProfilePicture;