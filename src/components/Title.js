import styles from './Title.scss';

export default ({icon, name}) => (
  <div className={styles.container}>
    <div className="icon">{icon}</div>
    <span className="name">{name}</span>
  </div>
);
