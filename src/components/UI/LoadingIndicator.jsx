import styles from "./LoadingIndicator.module.css";
import messageStyles from "../../features/chat/components/ChatMessage.module.css";

/**
 * A visual indicator displayed while the AI is generating a response.
 *
 * @component
 * @param {Object} props - The component props.
 * @param {string} props.persona - The name of the persona generating the response.
 * @returns {JSX.Element} The rendered loading indicator.
 */
export default function LoadingIndicator({ persona }) {
  return (
    <div className={messageStyles.apiMessageContainer}>
      <small className={messageStyles.apiName}>{persona}</small>

      <div className={styles.loadingBubble}>
        <div className={styles.loadingDot}></div>
        <div className={styles.loadingDot}></div>
        <div className={styles.loadingDot}></div>
      </div>
    </div>
  );
}
