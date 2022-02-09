import React from 'react';
import styles from './splitter.module.css';

function Splitter({children,x,y}) {

  return <div className={`${styles.splitWrapper}`} style={{top:y+"vh",left:x+"vw"}}>
    <h2>Splitter</h2>
      <div className={`${styles.splitContainer}`}>
          {children}
      </div>
  </div>;
}

export default Splitter;
