import React,{useRef,useEffect} from 'react';
import {MdOutlineViewSidebar} from 'react-icons/md';
import styles from './eth.module.css';
import Button from '@mui/material/Button';

function Eth({id="",key="",rak_level="",columns=0,clickHandler=(ev)=>{},status,isActive=false,from}) {
  // console.log("eth",inUsed?.ids.find(item=> item==id));
  // console.log("change",status)
  // console.log("from",from)
  // console.log("from eth",columns,status)
  if(isActive){
    // console.log("isActive",(isActive?.ids?.find(item=> item==id) && (inUsed?.ids.find(item=> item==id)))?'yellow':"black",inUsed,isActive,id,from)
  }
  // console.log("flex","0 "+(100/columns/2)+"%",columns)
  const ethRef = useRef(null);
  const columnStyle = {
      flexShrink: 1,
      flexBasis: ((from==="splitter")?(100/(columns/3)):(100/(columns)))+"%",
      // background:"#6abd7c",
      cursor:status==="used"&&(from!=="splitter")?"pointer":"auto"
  }
  useEffect(()=>{
    ethRef?.current?.setAttribute("data-id",id)
    ethRef?.current?.setAttribute("data-rak",rak_level)
    ethRef?.current?.setAttribute("data-type",from)
  },[id,rak_level,from])
  ethRef?.current?.setAttribute("data-from",status ==='used'?'blue':status ==="priority"?"#ee2d24":'#75767e')
  // return <div className={`${styles.ethContainer}`} >
  return <div ref={ethRef} onClick={clickHandler} className={`${styles.ethContainer} ${from=="feeder"? styles.feederPorts : ""}`} style={columnStyle}>
      {/* <div className={`${styles.ethHotspot}`}>
      </div> */}
        <div className={styles.portBorder} style={{borderColor:status ==='used'?'blue':status ==="priority"?"#ee2d24":'#75767e'}}>
          <p>{id}</p>
        </div>
      {/* <MdOutlineViewSidebar fill={status==='used'?'blue':status==='priority'?'#ee2d24':'#75767e'} /> */}
      {/* <MdOutlineViewSidebar fill={((isActive?.ids?.find(item=> item==id) && inUsed?.ids?.find(item=> item==id))|| (from=="distributor" && inUsed?.ids.find(item=> item==id)))?'yellow':inUsed?.ids?.find(item=> item==id)?'blue':'#75767e'} /> */}
    </div>;
}

export default Eth;
