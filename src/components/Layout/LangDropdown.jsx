import styles from './LangDropdown.module.css';

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
