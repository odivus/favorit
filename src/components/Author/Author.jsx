import styles from './Author.module.css';

const VACANCY_URL = 'https://hh.ru/vacancy/138619703';
const RESUME_URL = 'https://drive.google.com/file/d/1eZohaJU6w1iBOlNAP8CEGXnaGtoN9Vs6/view?usp=drive_link';
const RECOMMENDATION_URL = 'https://drive.google.com/file/d/1lxxzdjtpp4yDgqTOnEVs5yE5h-Sau1qD/view?usp=sharing';
const TELEGRAM_URL = 'https://t.me/oleg_petko';

function NewWindowIcon() {
  return (
    <svg
      className={styles.icon}
      viewBox="0 0 16 16"
      fill="currentColor"
      aria-hidden="true"
      focusable="false"
    >
      <path
        fillRule="evenodd"
        d="M8.636 3.5a.5.5 0 0 0-.5-.5H1.5A1.5 1.5 0 0 0 0 4.5v10A1.5 1.5 0 0 0 1.5 16h10a1.5 1.5 0 0 0 1.5-1.5V7.864a.5.5 0 0 0-1 0V14.5a.5.5 0 0 1-.5.5h-10a.5.5 0 0 1-.5-.5v-10a.5.5 0 0 1 .5-.5h6.636a.5.5 0 0 0 .5-.5z"
      />
      <path
        fillRule="evenodd"
        d="M16 .5a.5.5 0 0 0-.5-.5h-5a.5.5 0 0 0 0 1h3.793L6.146 9.146a.5.5 0 1 0 .708.708L15 1.707V5.5a.5.5 0 0 0 1 0v-5z"
      />
    </svg>
  );
}

function ExternalLink({ href, children }) {
  return (
    <a href={href} target="_blank" rel="noopener noreferrer">
      {children}
      <NewWindowIcon />
      <span className="visually-hidden"> (откроется в новой вкладке)</span>
    </a>
  );
}

function Author() {
  return (
    <div className="card shadow-sm">
      <div className="card-body">
        <section className={styles.block}>
          <h2 className="card-title h5">Тестовое задание</h2>
          <ExternalLink href={VACANCY_URL}>
            На вакансию Frontend-разработчик (React + вёрстка)
          </ExternalLink>
        </section>

        <section className={styles.block}>
          <p className={styles.line}>Выполнил: разработчик Олег Петько</p>
          <p className={styles.line}>
            <ExternalLink href={RESUME_URL}>Резюме pdf</ExternalLink>
          </p>
          <p className={styles.line}>
            <ExternalLink href={RECOMMENDATION_URL}>Рекомендательное письмо от Сбер</ExternalLink>
          </p>
        </section>

        <section className={styles.block}>
          <p className={styles.line}>
            Почта: <a href="mailto:odivus@gmail.com">odivus@gmail.com</a>
          </p>
          <p className={styles.line}>
            ТГ: <ExternalLink href={TELEGRAM_URL}>@oleg_petko</ExternalLink>
          </p>
        </section>
      </div>
    </div>
  );
}

export default Author;
