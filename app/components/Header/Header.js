import styles from './Header.module.scss';

export default function Header() {
  return (
    <header className={styles.header}>
   
      <nav className={styles.navbar}>
        <div className={styles.logo}>
          Fit<span>Zone</span>
        </div>

        <ul className={styles.menu}>
          <li >Home</li>
          <li>Classes</li>
          <li>Trainers</li>
          <li>Pricing</li>
          <li>Contact</li>
        </ul>

        <button className={styles.joinBtn}>Join Now</button>
      </nav>

      {/* Hero */}
      <div className={styles.hero}>
        <h1 className={styles.heroTitle}>
          Build Your <span>Strength</span><br />
          Transform Your Life
        </h1>
        <p className={styles.heroSubtitle}>
          Join FitZone - where champions are made.<br />
          Professional trainers, modern equipment, 24/7 access.
        </p>
      </div>
    </header>
  );
}