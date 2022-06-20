import React from 'react';
import styles from './splitter.module.css';

function Splitter({children,x,y}) {
  
  return <div className={`${styles.splitWrapper}`} style={{top:y+"vh",left:x+"vw"}}>
    <div className={`${styles.card}`}>
      <div className={`${styles.cardHeader} ${styles.cardHeaderWarning}`}>


        <h4 className={styles.cardTitle}>Splitter</h4>
      </div>
        <div className={`${styles.splitContainer}`}>
          {children}
        </div>
    </div>
  </div>;
}

export default Splitter;
