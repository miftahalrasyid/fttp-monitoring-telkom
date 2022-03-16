import React from 'react';
import styles from './footer.module.css';

function footer() {
  return <footer className={`wrapper ${styles.footerContainer}`}><div className="container-fluid">
      design by SwitchBox
  </div></footer>;
}

export default footer;
