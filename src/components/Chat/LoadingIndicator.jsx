import styles from './LoadingIndicator.module.css';
import messageStyles from './ChatMessage.module.css'; // Import shared message styles for alignment

export default function LoadingIndicator() {
    // We use messageStyles.apiMessageContainer for correct alignment (left-aligned)
    return (
        <div className={messageStyles.apiMessageContainer}>
            <small className={messageStyles.apiName}>Historical Figure</small>
            
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