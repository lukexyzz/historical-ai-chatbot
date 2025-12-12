import styles from "./ChatMessage.module.css";
import ProfilePicture from "./ProfilePicture";

/**
 * Displays the avatar for a chat message.
 * Renders the user's avatar or the specific persona's avatar based on the sender.
 *
 * @component
 * @param {Object} props - The component props.
 * @param {boolean} props.isUser - Whether the message is from the user.
 * @param {Object} [props.persona] - The persona object associated with the chat.
 * @param {string} [props.persona.avatar] - The relative URL path to the persona's avatar image.
 * @param {string} [props.persona.name] - The name of the persona.
 * @returns {JSX.Element} The rendered avatar component.
 */
export default function MessageAvatar({ isUser, persona }) {
    // 1. Determine image source (User fallback logic included)
    const avatarSrc = (!isUser && persona?.avatar) ? persona.avatar : "/icons/user.svg";

    // 2. Determine alt text
    const altText = isUser ? "User" : (persona?.name || "AI");

    return (
        <div className={styles.avatarWrapper}>
            <ProfilePicture src={avatarSrc} alt={altText} />
        </div>
    );
}
