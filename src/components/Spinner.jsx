import React from 'react';
import styles from '../styles/Spinner.module.css';

const Spinner = () => {
  return (
    <div className={styles.spinner}>
      <div className={styles.loading}></div>
    </div>
  );
};

export default Spinner;
