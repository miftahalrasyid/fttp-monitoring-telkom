import React from 'react';
import styles from './feeder.module.css';
import Label from '../Label';
const Feeder = ({children,clickhandler,columns,datalen}) => {
  // console.log("ref",ref)
  // feedref?.current?.addEventListener("click",function(){
  //   console.log("testing")
  // });
  const feederlabel = new Array(columns/12)
  for (let index = 0; index < feederlabel.length; index++) {
    feederlabel[index] = {id:(index+1)}
  }
  return <div className={`${styles.feederDivider}`}>
    <div onClick={clickhandler} className={`${styles.feederWrapper}`}>
        {children}
    </div>
    <div className={`${styles.feederLabel}`}>
      {feederlabel.map(item1=><Label from="feeder" key={"feeder"+item1.id} id={item1.id} columns={datalen}/>)}
    </div>
  </div>;
}

export default Feeder;
