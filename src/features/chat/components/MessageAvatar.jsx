import styles from "./ChatMessage.module.css";
import ProfilePicture from "./ProfilePicture";

export default function MessageAvatar({ isUser, persona }) {
    const baseUrl = import.meta.env.VITE_APP_API_URL;

    // Determine image path: User -> user.svg, AI -> persona.avatar (or fallback to user.svg)
    const imagePath = (!isUser && persona?.avatar) ? persona.avatar : "/images/user.svg";
    const avatarSrc = `${baseUrl}${imagePath}`;
    const altText = isUser ? "User" : (persona?.name || "AI");

    return (
        <div className={styles.avatarWrapper}>
            <ProfilePicture src={avatarSrc} alt={altText} />
        </div>
    );
}
