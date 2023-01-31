import styles from './Footer.module.scss';

export default function Footer() {
  return (
    <footer className={styles.footer}>
      <span>Created by </span>
      <a href="https://github.com/megyerimarton" target="_blank" rel="noopener noreferrer">
        Marton Megyeri
      </a>
    </footer>
  );
}
