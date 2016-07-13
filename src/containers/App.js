import styles from './App.scss';
import NavBar from '../components/NavBar';

export default ({children}) => (
  <div className={styles.container}>
    <NavBar />
    <div className='children'>{children}</div>
  </div>
);
