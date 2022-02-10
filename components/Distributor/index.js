import React from 'react';
import styles from './distributor.module.css';
import Label from '../Label';
function Distributor({children,clickhandler,columns,trayName}) {
  console.log("datalen",trayName)
  const distributorlabel = new Array(columns/12)
  var spacer = 0;
  var mor = 0;
  for (let index = 0; index <= Math.floor(distributorlabel.length); index++) {
    if(index%Math.floor(distributorlabel.length)==0 && index<Math.floor(distributorlabel.length))
    spacer++;
      if(index%2==0 && index>0 && trayName.indexOf(index-mor)>-1){
        distributorlabel[index*spacer-1] = {id:index-mor}
      }
      else if(index>0 && trayName.indexOf(index-mor)>-1){
        distributorlabel[index*spacer-1] = {id:index-mor}
        mor++
      }
  }
  return <div className={`${styles.distributorDivider}`}>
    <div className={`${styles.distributorWrapper}`} onClick={clickhandler}>
        {children}
    </div>
    <div className={`${styles.distributorLabel}`}>
      {distributorlabel.map((item1,idx)=><Label key={"distrilabel"+idx} id={item1.id} columns={columns}/>)}
    </div>
  </div>;
}

export default Distributor;