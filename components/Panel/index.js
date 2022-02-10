import React from 'react';
import styles from './panel.module.css';

function Panel({x,y,children}) {
  // console.log("panel child",children)
  // children[1].props = {...children[1].props,from:"panel"}
  return <div className={`${styles.panelWrapper}`} style={{top:y+"vh",left:x+"vw"}}>
    <h2>Panel</h2>
      <div className={`${styles.panelContainer}`}>
        {children}
      </div>
  </div>;
}

export default Panel;
