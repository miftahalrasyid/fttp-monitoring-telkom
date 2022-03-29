import React from 'react';
import styles from './panel.module.css';

function Panel({x,y,children}) {
// console.log("panel child",children)
// console.log("panel",x,y)
// children[1].props = {...children[1].props,from:"panel"}
return <div className={`${styles.panelWrapper}`} style={{top:y+"px",left:x+"px"}}>
  <div className={`${styles.card}`}>
    <div className={`${styles.cardHeader} ${styles.cardHeaderSuccess}`}>


      <h4 className={styles.cardTitle}>Panel</h4>
    </div>
    <div className={`${styles.panelContainer}`}>
      {children}
    </div>
  </div>
</div>;
}

export default Panel;