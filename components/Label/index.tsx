import React from 'react';
import styles from './label.module.css';
import {MdLabelOutline,MdOutlineViewSidebar} from 'react-icons/md';
function Label({id,key,columns,children,from}:{id:number,key?: string, columns: number,children?: any,from?: string}) {
  return <div className={`${styles.labelWrapper}`}>
      <p>{(from!=="feeder")?(id%columns===0)?'D24':"D"+id%columns:"F"}</p>
      <MdLabelOutline />
      {/* <MdOutlineViewSidebar className={`${styles.backdrop}`}/> */}
  </div>;
}

export default Label;
