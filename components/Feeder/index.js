import React from 'react';
import styles from './feeder.module.css';
const Feeder = ({children,clickhandler}) => {
  // console.log("ref",ref)
  // feedref?.current?.addEventListener("click",function(){
  //   console.log("testing")
  // });
  return <div onClick={clickhandler} className={`${styles.feederWrapper}`}>
      {children}
  </div>;
}

export default Feeder;
