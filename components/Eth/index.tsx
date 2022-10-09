import React, { useRef, useEffect } from 'react';
import { MdOutlineViewSidebar } from 'react-icons/md';
import styles from './eth.module.css';
import Button from '@mui/material/Button';

function Eth({ id = "", rak_level = "", rak_index = "", columns = 0, clickHandler = (ev) => { }, status, isActive = false, from, panel = { data: [] } }) {
  // console.log("eth",inUsed?.ids.find(item=> item==id));
  // console.log("change",status)
  // console.log("from",from)
  // console.log("from eth",columns,status)
  if (isActive) {
    // console.log("isActive",(isActive?.ids?.find(item=> item==id) && (inUsed?.ids.find(item=> item==id)))?'yellow':"black",inUsed,isActive,id,from)
  }
  // console.log("flex","0 "+(100/columns/2)+"%",columns)
  const ethRef = useRef(null);
  const columnStyle = {
    flexShrink: 1,
    flexBasis: ((from === "splitter") ? (100 / (columns / 2)) : (100 / (columns))) + "%",
    // background:"#6abd7c",
    cursor: status === "used" && (from !== "splitter") ? "pointer" : "auto"
  }
  useEffect(() => {
    ethRef?.current?.setAttribute("data-id", id)
    ethRef?.current?.setAttribute("data-rak", rak_level)
    ethRef?.current?.setAttribute("data-type", from)

  }, [id, rak_level, from])

  const DistributionDetail = ({ props: { data: dataDist } }) => {
    // console.log("dist detail", props)
    // const [{ data: dataDist = [{
    //   id: "",
    //   index: "",
    //   pass_through: "",
    //   status: "",
    //   passive_out: [],
    // }] }] = panel.data.filter(pnl => pnl.rak_level.toString() === rak_level);
    // // console.log('data dist',dataDist.filter(dt=>dt.index.toString()==ev.target.parentNode.getAttribute('data-id')))
    // if (dataDist.filter(dt => dt.index.toString() == id)[0].passive_out || false) {
    const [{ passive_out: [{ name, po_index }] }] = dataDist.filter(dt => dt.index.toString() == id);
    const [{ passive_out: [{ splitter }] }] = dataDist.filter(dt => dt.index.toString() == id);
    // {name,po_index,splitter:{splitter_index}}
    // console.log("distribution port click data",passive_out);
    // alert("ODP Name: " + name + "\n" + "Splitter: " + splitter_index + "\nPassive Out: " + po_index)
    // }
    return <div className={styles.distributionDetail} >
      <div className={styles.title}>{'D' + rak_index + " - " + id}</div>
      <div className={styles.list}>{"ODP Name: " + name.toLocaleUpperCase()}</div>
      <div className={styles.list}>{splitter ? ("Splitter: " + splitter?.splitter_index) : "Splitter: -"}</div>
      <div className={styles.list}>{"Passive Out: " + po_index}</div>
    </div>
  }
  ethRef?.current?.setAttribute("data-from", status === 'used' ? 'bblue' : status === "priority" ? "bpriority" : 'bgray')
  // ethRef?.current?.setAttribute("data-from", status === 'used' ? 'blue' : status === "priority" ? "#ee2d24" : '#75767e')
  // return <div className={`${styles.ethContainer}`} >
  return <div ref={ethRef} onClick={clickHandler} className={`${styles.ethContainer} ${from == "feeder" ? styles.feederPorts : ""}`} style={columnStyle}>
    {/* <div className={`${styles.ethHotspot}`}>
      </div> */}
    <div className={`${styles.portBorder} ${status === 'used' ? styles.bblue : status === "priority" ? styles.bpriority : status === 'broken' ? styles.bblack : styles.bgray}`} >
      {/* <div className={`${styles.portBorder} ${status === 'used' ? styles.bblue : status === "priority" ? styles.bpriority : status === 'broken' ? styles.bblack : styles.bgray}`} style={{ borderColor: status === 'used' ? 'blue' : status === "priority" ? "#ee2d24" : status === 'broken' ? 'black' : '#75767e' }}> */}
      <p>{id}</p>
      {from === "distribution" && (status === 'used' || status === 'priority') && panel.data.filter(pnl => pnl.rak_level === rak_level) && <DistributionDetail props={panel.data.filter(pnl => pnl.rak_level === rak_level)[0]} />}
    </div>
    {/* <MdOutlineViewSidebar fill={status==='used'?'blue':status==='priority'?'#ee2d24':'#75767e'} /> */}
    {/* <MdOutlineViewSidebar fill={((isActive?.ids?.find(item=> item==id) && inUsed?.ids?.find(item=> item==id))|| (from=="distributor" && inUsed?.ids.find(item=> item==id)))?'yellow':inUsed?.ids?.find(item=> item==id)?'blue':'#75767e'} /> */}
  </div>;
}

export default Eth;
