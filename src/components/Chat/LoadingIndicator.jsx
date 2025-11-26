import styles from './LoadingIndicator.module.css';
import messageStyles from './ChatMessage.module.css';

export default function LoadingIndicator({ persona }) {

    return (
        <div className={messageStyles.apiMessageContainer}>
            <small className={messageStyles.apiName}>{persona}</small>

            <div
                className={styles.loadingBubble}
            >
                <div className={styles.loadingDot}></div>
                <div className={styles.loadingDot}></div>
                <div className={styles.loadingDot}></div>
            </div>
        </div>
    );
}