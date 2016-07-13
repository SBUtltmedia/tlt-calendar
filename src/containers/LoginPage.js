import { LinkContainer } from 'react-router-bootstrap';
import { Button } from 'react-bootstrap';
import styles from './LoginPage.scss';

export default () => (
  <div className={styles.container}>
    <LinkContainer to={{ pathname: '/student'}}>
      <Button className="button">Student login</Button>
    </LinkContainer>
    <LinkContainer to={{ pathname: '/admin'}}>
      <Button className="button">Admin login</Button>
    </LinkContainer>
  </div>
);
