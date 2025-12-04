import styles from './LangDropdown.module.css';

/**
 * A dropdown component for selecting the application language.
 * 
 * @component
 * @param {Object} props - The component props.
 * @param {string} props.language - The current selected language.
 * @param {Function} props.setLanguage - State setter for updating the selected language.
 * @returns {JSX.Element} The rendered language dropdown.
 */
export default function LangDropdown({ language, setLanguage }) {
    const languages = ['English', 'French', 'Spanish', 'German'];

    return (
        <select
            value={language}
            onChange={(e) => setLanguage(e.target.value)}
            className={styles.languageSelect}
            aria-label="Select Language"
        >
            {languages.map((lang) => (
                <option key={lang} value={lang}>
                    {lang}
                </option>
            ))}
        </select>
    );
}
