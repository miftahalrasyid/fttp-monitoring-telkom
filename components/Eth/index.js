import React,{useRef,useEffect} from 'react';
import {MdOutlineViewSidebar} from 'react-icons/md';
import styles from './eth.module.css';

function Eth({id,columns,inUsed,isActive,from}) {
  // console.log("eth",inUsed?.ids.find(item=> item==id));
  // console.log("from",from)
  if(isActive){
    // console.log("isActive",(isActive?.ids?.find(item=> item==id) && (inUsed?.ids.find(item=> item==id)))?'yellow':"black",inUsed,isActive,id,from)
  }
  if(inUsed){
    // console.log("inUsed",inUsed)
  }
  // console.log("flex","0 "+(100/columns/2)+"%",columns)
  const ethRef = useRef(null);
  const columnStyle = {
      flexShrink: 1,
      flexBasis: ((from==="splitter")?(100/(columns/3)):(100/(columns/2)))+"%",
      background:"#6abd7c"
  }
  useEffect(()=>{
    ethRef?.current?.setAttribute("data-id",id)
  },[])
  // return <div className={`${styles.ethContainer}`} >
  return <div ref={ethRef} className={`${styles.ethContainer}`} style={columnStyle}>
      {/* <div className={`${styles.ethHotspot}`}>
      </div> */}
        <p>{(id%columns===0)?columns:id%columns}</p>
      <MdOutlineViewSidebar fill={((isActive?.ids?.find(item=> item==id) && inUsed?.ids?.find(item=> item==id)))?'yellow':inUsed?.ids?.find(item=> item==id)?'blue':'#75767e'} />
      {/* <MdOutlineViewSidebar fill={((isActive?.ids?.find(item=> item==id) && inUsed?.ids?.find(item=> item==id))|| (from=="distributor" && inUsed?.ids.find(item=> item==id)))?'yellow':inUsed?.ids?.find(item=> item==id)?'blue':'#75767e'} /> */}
    </div>;
}

export default Eth;
