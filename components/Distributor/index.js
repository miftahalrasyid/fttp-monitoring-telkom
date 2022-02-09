import React from 'react';
import styles from './distributor.module.css';
function Distributor({children,clickhandler}) {
  return <div className={`${styles.distributorWrapper}`} onClick={clickhandler}>
      {children}
  </div>;
}

export default Distributor;