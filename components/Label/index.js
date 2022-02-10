import React from 'react';
import styles from './label.module.css';
import {MdLabelOutline,MdOutlineViewSidebar} from 'react-icons/md';
function Label({id,columns,children,from}) {
  return <div className={`${styles.labelWrapper}`}>
      <p>{(from!=="feeder")?(id%columns===0)?'D24':"D"+id%columns:"F"}</p>
      <MdLabelOutline />
      {/* <MdOutlineViewSidebar className={`${styles.backdrop}`}/> */}
  </div>;
}

export default Label;
