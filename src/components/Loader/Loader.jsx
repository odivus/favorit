import styles from './Loader.module.css';

function Loader({ label = 'Загрузка…' }) {
  return (
    <div className={styles.loader} role="status" aria-live="polite">
      <div className="spinner-border text-primary" aria-hidden="true" />
      <span className="text-secondary">{label}</span>
    </div>
  );
}

export default Loader;
