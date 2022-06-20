import React,{useState,useCallback} from 'react'
import { wrapper } from '../../components/store'
import {Typography} from '@mui/material';
import Splitter from '../../components/Splitter';
import Eth from '../../components/Eth';
import Rak from '../../components/Rak';
import Panel from '../../components/Panel';
import Modal from '../../components/Modal';
import Button from '@mui/material/Button';
import Dropzone from 'react-dropzone';
import { BsDownload } from 'react-icons/bs';
import { AiOutlineFile } from 'react-icons/ai';
import styles from '../odc/odc.module.css';
import ethStyles from '../../components/Eth/eth.module.css';
import splitterStyle from '../../components/Splitter/splitter.module.css';
import { 
  styled as styledCustom
} from "@mui/material/styles";
import {ButtonProps} from "@mui/material"
import { END } from 'redux-saga';
import { 
  getRegionList,
  getWitelList,
  getDatelList,
  getSTOList,
  getMerekList,
  getPublicViewODC,
  getOcdSplitpanelDetail,
  updateODCData,
  setSelectedCoreFeeder,
  deleteSelectedCoreFeeder,
  upsertODCFile
} from '../../components/store/odcs/actions';
import {getUserData} from '../../components/store/users/actions';
import { toast } from 'react-toastify';
const CustomButton = styledCustom(Button)<ButtonProps>(({theme,itemType})=>({
  position: itemType =="floating"? "absolute !important":itemType=="download" ? "absolute !important":"unset !important",
  bottom: itemType =="floating" ? "17%":itemType == 'download' ? "10%":"",
  backgroundColor:"#C7417F !important",
  color: "white !important"
} as any))
function Viewonly_ODC({
  data:ODCData,
  userData,
  viewOdcClient,
  deleteSelectedCoreFeeder,
  token,
  setSelectedCoreFeeder,
  upsertODCFile
}) {
  const {
    odc_name,
    capacity,
    merek,
    port_feeder_terminasi,
    rak_oa,
    panel_oa,
    kml_name,
    kml_size,
    kml_file,
    mc_name,
    mc_size,
    mc_file,
    port,
    deployment_date,
    region_name,
    witel_name,
    datel_name,
    sto_name,
    splitter={splitter:{position:[]},data:[],position:"top left"},panel={data:[],position:"top left"}} = ODCData;
    const feederModal = useState({type:"",status:false});
    
    // const [feederFocus,setFeederFocus] = useState(false); 
    const [feederFocus,setFeederFocus] = useState(
      {
        distribution: [
          {distribution_id: "",
          distribution_index: null,
          distribution_level: null,
          distribution_level_id: null
        }, {
          distribution_id: "",
          distribution_index: null,
          distribution_level: null,
          distribution_level_id: null
        }, {
          distribution_id: "",
          distribution_index: null,
          distribution_level: null,
          distribution_level_id: null
        }, {
          distribution_id: "",
          distribution_index: null,
          distribution_level: null,
          distribution_level_id: null
        }],
        
        distributionElm: [null, null, null, null],
        feeder: {feeder_id: '', feeder_index: null, feeder_level: null},
        feederElm: null,
        odpName: ['', '', '', ''],
        splitter: {splitter_id: '', splitter_index: null},
        splitterElm: null
      }); 
      function hexToRgb(hex) {
        var result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);

        return `rgb(${parseInt(result[1],16)}, ${parseInt(result[2],16)}, ${parseInt(result[3],16)})`
      }
      const panelClickHandler = useCallback((ev)=>{
        /**
         * on feeder click start
         */
        /**if the feeder are idle */
        // console.log(ev.target.style.borderColor,hexToRgb("#75767e"), ev.target.parentNode.getAttribute("data-type")=="feeder")
        if(ev.target.style.borderColor==hexToRgb("#75767e")){
        // if(ev.target.children[1].getAttribute("fill")=="#75767e"){
          feederModal[1]({type:"add",status:true});
          if(feederFocus && (ev.target!==feederFocus.feederElm)){
            
            if(feederFocus.feederElm?.style)
            feederFocus.feederElm.style.borderColor="blue";
            if(feederFocus.splitterElm?.style)
            feederFocus.splitterElm.style.borderColor="blue";
            // feederFocus.splitterElm?.style.borderColor = "blue";
            feederFocus.distributionElm?.forEach(item=>{
              // console.log("fill",feederFocus,item?.style || "")
              if(item)
              item.childNodes[0].style.borderColor = "blue";
            })
          }
          console.log("feederFocus",feederFocus)
          setFeederFocus(()=>{
            const [{data=[{
              id:"",
              index:"",
              pass_through:"",
              status:"",
              passive_out:[],
            }],rak_index}] = panel.data.filter(pnl=>pnl.rak_level.toString()==ev.target.parentNode.getAttribute('data-rak'));
              console.log("feeder detail",data.filter(item=>item.index == ev.target.parentNode.getAttribute('data-id')))
            const [{id:feeder_id,index:feeder_index,rak_level:feeder_level}] = data.filter(item=>item.index == ev.target.parentNode.getAttribute('data-id'))
          return {
            distribution: [
              {distribution_id: "",
              distribution_index: null,
              distribution_level: null,
              distribution_level_id: null
            }, {
              distribution_id: "",
              distribution_index: null,
              distribution_level: null,
              distribution_level_id: null
            }, {
              distribution_id: "",
              distribution_index: null,
              distribution_level: null,
              distribution_level_id: null
            }, {
              distribution_id: "",
              distribution_index: null,
              distribution_level: null,
              distribution_level_id: null
            }],
            
            distributionElm: [null, null, null, null],
            feeder: {feeder_id, feeder_index, feeder_level},
            feederElm: null,
            odpName: ['', '', '', ''],
            splitter: {splitter_id: '', splitter_index: null},
            splitterElm: null
          }})
        }
  
        /**if the feeder are used */
        // console.log(ev.target.children[1].getAttribute("fill"))
        else if(ev.target.style.borderColor=="blue" && ev.target.parentNode.getAttribute("data-type")=="feeder"){
        // else if(ev.target.children[1].getAttribute("fill")=="blue" && ev.target.getAttribute("data-type")=="feeder"){
          
          setFeederFocus(()=>{
  
            /* ketika klik feeder used lainnya*/
            if(feederFocus && (ev.target.children[1]!==feederFocus)){
              
              if(feederFocus.feederElm?.style){
                feederFocus.feederElm.parentNode.classList.remove(ethStyles.active)
                feederFocus.feederElm.style.borderColor="blue";
              }
              if(feederFocus.splitterElm?.style)
                feederFocus.splitterElm.style.borderColor="blue";
                feederFocus.distributionElm?.forEach(item=>{
                if(item)
                  item.childNodes[0].style.borderColor = "blue";
                })
            }
            const [{data=[{
              id:"",
              index:"",
              pass_through:"",
              status:"",
              passive_out:[],
            }],rak_index}] = panel.data.filter(pnl=>pnl.rak_level.toString()==ev.target.parentNode.getAttribute('data-rak'));
  
            /**
             * data
             * {
             * id,
             * index,
             * passthrough,
             * passive_out:{
             *   distribution:{}
             *   feeder:{}
            *   name:
            *   po_index:
            *   splitter:{
            *     splitter_id:
            *     splitter_index
            * 
          *     }
             *   }
             * }
             */
  
            /** simpan data splitter,feeder, dan distributor didalam state setFeederFocus jika belum ada nilai data yang di fokus*/
            const [{
              passive_out = [{
                distribution:{
                  distribution_id:"",
                  distribution_index:"",
                  distribution_level:""
                },
                feeder:{
                  feeder_id:"",
                  feeder_index:"",
                  feeder_level:""
                },
                splitter:{
                  splitter_id:"",
                  splitter_index:"",
                  splitter_level:""
                }
              }]
              ,pass_through,status,index:feederIndex}] = data.filter(rpnl=>rpnl.index.toString() === ev.target.parentNode.getAttribute('data-id'));
              return passive_out.reduce((prevPa,currPa)=>{
                // console.log("feeder on focus",status,prevPa)
            // return passive_out.reduce(pa=>{
              // console.log("rak children",document.querySelector(`[data-id="${pa.splitter.splitter_index}"][data-type="splitter"]`))
              /** change color from used to focused with pass_through condition for splitter*/
              /** kondisi jika tidak passthrough */
              const splitter = (!pass_through)?document.querySelector(`[data-id="${currPa.splitter.splitter_index}"][data-type="splitter"]`).children[0]:null;
              if(!pass_through)
              (splitter as HTMLElement).style.borderColor = "#ffda00";
              const distribution = (currPa.distribution)?document.querySelector(`[data-id="${currPa.distribution.distribution_index}"][data-rak="${currPa.distribution.distribution_level}"]`):null;
              if(currPa.distribution){
                (distribution.childNodes[0] as HTMLElement).style.borderColor = "#ffda00";
              }
              (splitter as HTMLElement).style.borderColor = "#ffda00";
              console.log("ethstyles",ethStyles)
              ev.target.parentNode.classList.add(ethStyles.active)
              ev.target.style.borderColor = "#ffda00";
  
              // console.log("prev pa",prevPa,currPa)
              // console.log("feeder elm",splitter,distribution)
              return {
                /** assign new data to either remove or add focused status */
                splitterElm:splitter,
                feederElm: ev.target,
                distributionElm: [...prevPa.distributionElm,distribution],
                /** input all passive out data for later Modal popup */
                odpName: [...prevPa.odpName,currPa.name],
                splitter: currPa.splitter,
                feeder: currPa.feeder,
                distribution: [...prevPa.distribution,currPa.distribution],
              }
            },{splitterElm:null,feederElm:null,odpName:[],distributionElm:[],distribution:[]});
            /**
             * set splitter focused
             */
            //  document.querySelector(`[data-id="${splitter.splitter_index}"]`).children[1].style.fill="#ffda00"
            // console.log("selected feeder",passive_out,splitter,document.querySelector(`[data-id="${splitter.splitter_index}"]`))
          });
        }
        /**if the feeder already focused */
        else if(ev.target.style.borderColor==hexToRgb("#ffda00") && ev.target.parentNode.getAttribute("data-type")=="feeder"){
        // else if(ev.target.children[1].getAttribute("fill")=="#ffda00" && ev.target.getAttribute("data-type")=="feeder"){
          feederModal[1]({type:"edit",status:true});
        }
        else if( ev.target.parentNode.getAttribute("data-type")=="distribution"){
          
        // else if(ev.target.children[1].getAttribute("fill")=="blue" && ev.target.getAttribute("data-type")=="distribution"){
          const [{data:dataDist=[{
            id:"",
            index:"",
            pass_through:"",
            status:"",
            passive_out:[], 
          }]}] = panel.data.filter(pnl=>pnl.rak_level.toString()===ev.target.parentNode.getAttribute('data-rak'));
          const [{passive_out:[{name,po_index,splitter:{splitter_index}}]}] = dataDist.filter(dt=>dt.index.toString()==ev.target.parentNode.getAttribute('data-id'));
          // {name,po_index,splitter:{splitter_index}}
          // console.log("distribution port click data",passive_out);
          alert("ODP Name: "+name+"\n"+"Splitter: "+splitter_index+"\nPassive Out: "+po_index)
        }
        
        /**
         * on feeder click end
         */
        // console.log(ev.target)
        //   console.log("feeder click",feederModal[0])
      },[feederModal,feederFocus,panel.data])
      const handleMCDownload = async() => {
        fetch(mc_file).then(response => response.blob())
         .then(blob => {
             var url = window.URL.createObjectURL(blob);
             var a = document.createElement('a');
             a.href = url;
             a.download = mc_name;
             document.body.appendChild(a); // we need to append the element to the dom -> otherwise it will not work in firefox
             a.click();    
             a.remove();  //afterwards we remove the element again         
         });
       }
      const handleKmlDownload = async() => {
       fetch(kml_file).then(response => response.blob())
        .then(blob => {
            var url = window.URL.createObjectURL(blob);
            var a = document.createElement('a');
            a.href = url;
            a.download = kml_name;
            document.body.appendChild(a); // we need to append the element to the dom -> otherwise it will not work in firefox
            a.click();    
            a.remove();  //afterwards we remove the element again         
        });
      }
  return (
    <div className={`wrapper ${styles.odcIdWrapper} ${styles.publicView}`}>
          { ODCData &&
          <div className={styles.odcWrapper}>
          <div className={`odcdetail row ${styles.odcDetail}`}>
              <div className={`row ${styles.alldetailItems}`}>
                <div className={`${styles.odcItem} col-12 col-md-6 col-sm-12`}>
                  <Typography sx={{ whiteSpace: "nowrap"}}>Nama ODC : </Typography>
                  <Typography sx={{textTransform: "uppercase", whiteSpace: "nowrap"}}>{odc_name}</Typography>
                </div>
                   <hr className={`${styles.hr}`}/>
                <div className={`${styles.odcItem} col-12 col-md-6 col-sm-12`}>
                  <Typography>Kapasitas : </Typography>
                  <Typography>{capacity || ""}</Typography>
                </div>
               <div className={`${styles.odcItem} col-12 col-md-6 col-sm-12`}>
                  <Typography>Merek : </Typography>
                  <Typography>{merek || ""}</Typography>
                </div>
                  <hr className={`${styles.hr}`}/>
                <div className={`${styles.odcItem} col-12 col-md-6 col-sm-12`}>
                  <Typography>Deployment Date : </Typography>
                  <Typography>{deployment_date || ""}</Typography>
                </div>
                 <div className={`${styles.odcItem} col-12 col-md-6 col-sm-12`}>
                  <Typography>Port feeder terminasi : </Typography>
                  <Typography>{port_feeder_terminasi || ""}</Typography>
                </div>
                  <hr className={`${styles.hr}`}/>
                <div className={`${styles.odcItem} col-12 col-md-6 col-sm-12`}>
                  <Typography>Rak OA : </Typography>
                  <Typography>{rak_oa || ""}</Typography>
                </div>
                <div className={`${styles.odcItem} col-12 col-md-6 col-sm-12`}>
                  <Typography>Panel : </Typography>
                  <Typography>{panel_oa || ""}</Typography>
                </div>
                  <hr className={`${styles.hr}`}/>
                <div className={`${styles.odcItem} col-12 col-md-6 col-sm-12`}>
                  <Typography>Port : </Typography>
                  <Typography>{port || ""}</Typography>
                </div>
                <div className={`${styles.odcItem} col-12 col-md-6 col-sm-12`}>
                  <Typography>Regional : </Typography>
                  <Typography>{region_name || ""}</Typography>
                </div>
                  <hr className={`${styles.hr}`}/>
                <div className={`${styles.odcItem} col-12 col-md-6 col-sm-12`}>
                  <Typography>Witel : </Typography>
                  <Typography>{witel_name || ""}</Typography>
                </div>
                <div className={`${styles.odcItem} col-12 col-md-6 col-sm-12`}>
                  <Typography>Datel : </Typography>
                  <Typography>{datel_name || ""}</Typography>
                </div>
                  <hr className={`${styles.hr}`}/>
                <div className={`${styles.odcItem} col-12 col-md-6 col-sm-12`}>
                  <Typography>STO : </Typography>
                  <Typography>{sto_name || ""}</Typography>
                </div> 
              </div>
            <div>
          </div>
            
          </div>
          <div className='odcpanel row'>
          <div className={styles.splitPanelWrapper} style={{height:"1000px"}}>
                <Splitter x={splitter.position?(splitter.position.split(" ")[1] == "left" ? "0":""):""} y={splitter.position.split(" ")[0] == "top" ? "0":""}>
                  {splitter.data.map(s_item=>
                  <Eth from="splitter" key={"sp"+s_item.index} id={s_item.index} status={s_item.status}
                    columns={splitter.data.length} />
                  )}
                </Splitter>
                <Panel x={splitter?.position.split(" ")[1] == "left" ? "375":""} y={splitter.position.split(" ")[0] == "top" ? "0":""}>
                {/* <Panel x={panel.position.left} y={panel.position.top}> */}
                {panel.data.map((r_item,idx)=>{
                  // console.log("odc data panel",r_item.rak_index)
                    return <Rak key={'r'+r_item.rak_level} distributor_level_id={r_item.rak_index} last_feeder={panel.data.filter(item=>item.type==="feeder").length} level={r_item.rak_level} type={r_item.type} datalen={12}>
                      {r_item.data.map(p_item=>
                      /** odd even to define 13-24 */
                        <Eth from={r_item.type} clickHandler={panelClickHandler} key={"port"+p_item.index} rak_level={r_item.rak_level} id={p_item.index} status={p_item.status}
                        // <Eth from={r_item.type} clickHandler={panelClickHandler} key={"port"+p_item.index} rak_level={r_item.rak_level} id={((idx+1)%2===0)?(p_item.index+12):p_item.index} status={p_item.status}
                        columns={r_item.data.length} />
                      )}
                    </Rak>
                
                })}
                </Panel>
                <div className={`${splitterStyle.videoWrapper}`} style={{left: (splitter.position.split(" ")[1]=="left"? "0px":""),top:(splitter.position.split(" ")[0]=="top"? "320px":"")}}>
              {/* <div className={`${splitterStyle.splitWrapper}`} style={{top:"250px",left:"0px"}}> */}
                <div className={`${splitterStyle.card}`}>
                  <div className={`${splitterStyle.cardHeader} ${splitterStyle.cardHeaderBlue}`} style={{zIndex:"1"}}>


                    <h4 className={splitterStyle.cardTitle}>Video</h4>
                  </div>
                  <div className={`${splitterStyle.videoContainer}`}>
                    <iframe frameBorder="0" scrolling="no" marginHeight={0} marginWidth={0} width="315" height="auto"
                      // type="text/html"
                      src="https://www.youtube.com/embed/_cAIkgb5I0E?autoplay=0&fs=0&iv_load_policy=3&showinfo=0&rel=0&cc_load_policy=0&start=0&end=0&origin=http://youtubeembedcode.com"></iframe>
                  </div>
                </div>
              {/* </div> */}
              </div>
              <div className={`${splitterStyle.legendWrapper}`} style={{left: (splitter.position.split(" ")[1]=="left"? "0px":""),top:(splitter.position.split(" ")[0]=="top"? "600px":"")}}>
              {/* <div className={`${splitterStyle.splitWrapper}`} style={{top:"250px",left:"0px"}}> */}
                <div className={`${splitterStyle.card}`}>
                  <div className={`${splitterStyle.cardHeader} ${splitterStyle.cardHeaderPurple}`} style={{zIndex:"1"}}>


                    <h4 className={splitterStyle.cardTitle} >Legends</h4>
                  </div>
                  <div className={`${splitterStyle.legendContainer}`}>
                    
                      <div className='col-md-12 col-lg-12'>
                        <div className="row">
                          <div className='col-sm-12 col-md-6 col-lg-6'>
                            <div className='row'>
                              <div className='col-6 col-sm-6 col-md-6 col-lg-6'>
                                focused
                              </div>
                              <div className='col-6 col-sm-6 col-md-6 col-lg-6'>
                                <div className={styles.portBorder} style={{borderColor:'#ffda00'}}>
                                </div>
                              </div>
                            </div>
                          </div>
                          <div className='col-sm-12 col-md-6 col-lg-6'>
                            <div className='row'>
                              <div className='col-6 col-sm-6 col-md-6 col-lg-6'>
                                priority
                              </div>
                              <div className='col-6 col-sm-6 col-md-6 col-lg-6'>
                              {/* <MdOutlineViewSidebar fill='#ee2d24'/> */}
                              <div className={styles.portBorder} style={{borderColor:'#ee2d24'}}>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      {/* </div> */}
                      {/* <div className='col-xs-12 col-sm-12 col-md-6 col-lg-6'> */}
                      <div className="row">
                        <div className='col-xs-12 col-sm-12 col-md-6 col-lg-6'>
                          <div className='row'>
                            <div className='col-6 col-sm-6 col-md-6 col-lg-6'>
                            used
                            </div>
                            <div className='col-6 col-sm-6 col-md-6 col-lg-6'>
                              {/* <MdOutlineViewSidebar fill='blue'/> */}
                              <div className={styles.portBorder} style={{borderColor:'blue'}}>
                                </div>
                            </div>
                          </div>
                        </div>
                        <div className='col-xs-12 col-sm-12 col-md-6 col-lg-6'>
                          <div className='row'>
                            <div className='col-6 col-sm-6 col-md-6 col-lg-6'>
                            idle
                            </div>
                            <div className='col-6 col-sm-6 col-md-6 col-lg-6'>
                              {/* <MdOutlineViewSidebar /> */}
                              <div className={styles.portBorder} style={{borderColor:'gray'}}>
                                </div>
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className="row">
                      <div className='col-xs-12 col-sm-12 col-md-6 col-lg-6'>
                          <div className='row'>
                            <div className='col-6 col-sm-6 col-md-6 col-lg-6'>
                            broken
                            </div>
                            <div className='col-6 col-sm-6 col-md-6 col-lg-6'>
                              {/* <MdOutlineViewSidebar fill='black'/> */}
                              <div className={styles.portBorder} style={{borderColor:'black'}}>
                                </div>
                            </div>
                          </div>
                        </div>
                      </div>
                      </div>
                  </div>
                  </div>
                </div>
              </div>
              {/* <div className={styles.odcFiles}> */}
              <Modal token={token} dispatchFn={{setSelectedCoreFeeder,deleteSelectedCoreFeeder}} open={feederModal[0].status} header={"Feeder "+feederFocus.feeder.feeder_index} splitterData={splitter.data} panelData={panel.data} feederModal={feederModal} feederFocus={feederFocus}/>
              {/* <script async src="https://telegram.org/js/telegram-widget.js?18" data-telegram-login="miftah1112_bot"
                data-size="large" data-onauth="onTelegramAuth(user)" data-request-access="write"></script> */}


          </div>
          <div className={`download_upload_file row`}>
          {/* <div className={`download_upload_file row ${styles.odcFiles}`}> */}

                <div className={`col-6 col-md-6 col-sm-12 ${styles.uploadContainer}`} style={{position:"relative",minWidth:"370px"}}>
                  {/* <div className={`${splitterStyle.splitWrapper}`} style={{top:"250px",left:"0px"}}> */}
                  <div className={`${splitterStyle.card} ${styles.filesCard}`}>
                    <div className={`${splitterStyle.cardHeader} ${splitterStyle.cardPinkish} ${splitterStyle.uploadCardStyle}`} style={{zIndex:"1"}}>


                      <h4 className={splitterStyle.cardTitle}>KML Data</h4>
                    </div>
                    <div className={`${splitterStyle.splitContainer} ${splitterStyle.kmlCardContainer}`}>
                      <div className={styles.uploadFileWrapper}>
                      {/* <a target="_blank" href="https://icons8.com/icon/111876/xls">XLS</a> icon by <a target="_blank" href="https://icons8.com">Icons8</a> */}
                        
                        <Dropzone
                  disabled
              >
                  {({ getRootProps, getInputProps }) => (
                  <div className={`dropzone ${styles.dropzoneCustom}`} style={ {paddingBottom: "3rem"}}>
                      <div
                      className="dz-message needsclick"
                      // className="dz-message needsclick mt-2"
                      {...getRootProps()}
                      >
                      <div className={styles.dropzoneHotspot}>
                        <input {...getInputProps()} className="form-control"/>
                        {/* <div className="mb-3">
                            <i className="display-4 text-muted ri-upload-cloud-2-line"></i>
                        </div> */}
                        {(kml_name || false) && [<div key={"fileSelected"} className={styles.fileSelected}>
                        <AiOutlineFile  />
                      </div>, <div className={styles.fileDetail} key={"saved_kml"}>
                          <span >{kml_name}</span>
                          <span> {kml_size}</span>
                        </div>]
                        }
                      </div>
                      
                      </div>
                  </div>
                  )}
              </Dropzone>
              {(kml_name) && <CustomButton itemType='download' variant={'standard' as any} onClick={handleKmlDownload}>Unduh</CustomButton>}
              
                      </div>
                    </div>
                  </div>
                </div>
                <div className={`col-6 col-md-6 col-sm-12 ${styles.uploadContainer}`} style={{position:"relative",minWidth:"370px"}}>
                {/* <div className={`col-6 col-sm-12 ${splitterStyle.splitWrapper}`} style={{position:"relative",minWidth:"279px"}}> */}
                  {/* <div className={`${splitterStyle.splitWrapper}`} style={{top:"250px",left:"0px"}}> */}
                  <div className={`${splitterStyle.card} ${styles.filesCard}`}>
                    <div className={`${splitterStyle.cardHeader} ${splitterStyle.cardPinkish} ${splitterStyle.uploadCardStyle}`}
                      style={{zIndex:"1"}}>


                      <h4 className={splitterStyle.cardTitle}>MC Data</h4>
                    </div>
                    <div className={`${splitterStyle.splitContainer} ${splitterStyle.kmlCardContainer}`}>
                      <div className={styles.uploadFileWrapper}>
                      <Dropzone
                  disabled
              >
                  {({ getRootProps, getInputProps }) => (
                  <div className={`dropzone ${styles.dropzoneCustom}`} style={ {paddingBottom: "3rem"}}>
                      <div
                      className="dz-message needsclick"
                      // className="dz-message needsclick mt-2"
                      {...getRootProps()}
                      >
                      <div className={styles.dropzoneHotspot}>

                        <input {...getInputProps()} className="form-control"/>
                        {/* <div className="mb-3">
                            <i className="display-4 text-muted ri-upload-cloud-2-line"></i>
                        </div> */}
                        {(mc_name || false) && [<div key={"fileSelected"} className={styles.fileSelected}>
                        <AiOutlineFile  />
                      </div>, <div className={styles.fileDetail} key={"saved_mc"}>
                          <span >{mc_name}</span>
                          <span> {mc_size}</span>
                        </div>]
                        }
                        
                      </div>
                      
                      </div>
                  </div>
                  )}
              </Dropzone>
              {( mc_name) && <CustomButton itemType='download' variant={'standard' as any} onClick={handleMCDownload}>Unduh</CustomButton>}
                      </div>
                    </div>
                  </div>
                </div>
          </div>
          <div className={`row`}>
            <div className={`${styles.notesContainer}`}>
              Notes: 
              <textarea name="" id="" cols={30} rows={10}></textarea>
              <Button variant={"outlined"}><a>Edit</a></Button>

            </div>
          </div>
          </div>
            }
        </div>
  )
}
export const getServerSideProps = async(props) => wrapper.getServerSideProps(store=>async({req,res,...etc})=>{
  const {params:{odcId=[]}} = props;
  // console.log("odc id req",req)
  // console.log("odc id",odcId[0])
  store.dispatch(getPublicViewODC(odcId[0],toast));
  // store.dispatch(getOcdSplitpanelDetail(odcId[0],req.cookies.token,toast));
  // store.dispatch(getUserData(1,10, {name:"",direction:"asc"},req.cookies.token,null,toast))
  // store.dispatch(getRegionList(req.cookies.token))
  // store.dispatch(getWitelList(req.cookies.token))
  // store.dispatch(getDatelList(req.cookies.token))
  // store.dispatch(getSTOList(req.cookies.token))
  // store.dispatch(getMerekList(req.cookies.token,toast)),
  store.dispatch(END)
  await store.sagaTask.toPromise();
  // console.log("user data",store.getState().Users)
  // console.log("req test:",req.url,res,etc)
  console.log("store",store.getState().ODCs.selectedOdcSplitpanelStatus)
  const {ODCs:{selectedOdcSplitpanelStatus}} = store.getState();
  // const {ODCs:{odcsBox=[],splitterData=[],coreFeederData=[]}} = store.getState();
  
  console.log("odc id",odcId,odcId.length,selectedOdcSplitpanelStatus)
  // if(odcId.length>1){
    if(selectedOdcSplitpanelStatus==={} && (odcId[1]!=='status' || odcId[1]!=='activity log') || !store.getState().ODCs.selectedOdcSplitpanelStatus.success){
      console.log("selected odc",selectedOdcSplitpanelStatus)
  // if(odcId.length!==0 && odcsBox.filter(item=>item?.odc?.id == odcId[0]).length==0){
          return {
              notFound: true
          }
      }
      else{
          return {
              props:{ 
                data: selectedOdcSplitpanelStatus, 
                // ODCdetailData: store.getState().ODCs.selectedOdcSplitpanelDetail.data,
                // userData: store.getState().Users.userData.data || [{id:0,name:""}],
                // regionList: store.getState().ODCs.region_list || [{id:0,name:""}],
                // witelList: store.getState().ODCs.witel_list || [{id:0,region_id: 0,name:""}],
                // datelList: store.getState().ODCs.datel_list || [{id:0,region_id: 0,witel_id: 0,name:""}],
                // stoList: store.getState().ODCs.sto_list || [{id:0,region_id: 0,witel_id: 0,datel_id: 0, name:""}],
                // merekList: store.getState().ODCs.merek_list || [{id: "",name: "",splitter_position: "",splitter_capacity: ""}],
                // token: req.cookies.token
              },
              // props:{ data: odcsBox,splitterData,coreFeederData},
              // revalidate:60,
          } 

      }
})(props);

export default Viewonly_ODC