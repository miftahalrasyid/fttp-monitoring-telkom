import React,{useState,useCallback,useEffect} from 'react';
import { useRouter } from 'next/router';
import withAuth from '../../components/Auth';
import {END} from 'redux-saga';
import { connect, useDispatch } from 'react-redux';

// import Layout from '../../components/Layout';
// import styles from '../../components/Distributor/distributor.module.css';
import styles from './odc.module.css';
import splitterStyle from '../../components/Splitter/splitter.module.css';
// import styles from '../../components/Feeder/feeder.module.css'
import Splitter from '../../components/Splitter';
import Eth from '../../components/Eth';
import ethStyles from '../../components/Eth/eth.module.css';
import Rak from '../../components/Rak';
import Panel from '../../components/Panel';
import {MdOutlineViewSidebar} from 'react-icons/md';
import Button from '@mui/material/Button';
// import panelStyles from '../../components/panel.module.css';
// import Feeder from '../../components/Feeder';
// import Distributor from '../../components/Distributor';
// import {
//     MdInventory,
//     MdNfc,
//     MdSettingsInputComposite,
//     MdOutlineDateRange,
//     MdOpenInBrowser,
//     MdRemoveRedEye,
//     MdDeleteForever
//   } from 'react-icons/md';
  import { createTheme, MuiThemeProvider,styled } from "@material-ui/core/styles";
  import {createTheme as customCreateTheme, ThemeProvider} from "@mui/material/styles";
  const DynamicMUIDataTable = dynamic(() => import('mui-datatables'),{ ssr: false });
import {
    getOcdSplitpanelStatus,
    setSelectedCoreFeeder,
    deleteSelectedCoreFeeder
} from '../../components/store/odcs/actions';
import {getUserData} from '../../components/store/users/actions';
import { wrapper,makeStore } from "../../components/store";
// import store from '../../components/store'
import Modal from '../../components/Modal';
import {Typography} from '@mui/material';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import dynamic from 'next/dynamic'
import NativeSelect from '@mui/material/NativeSelect';
import { 
    styled as styledCustom
  } from "@mui/material/styles";
import { toast } from 'react-toastify';

// const CustomSelect = styledCustom(Select)(({theme})=>({
//     '.MuiList-root': {
//       display: "flex",
//       flexDirection: "column",
//     },
//   }))

  // const getMuiTheme = () =>
  // createTheme({
  //   CustomButtonActivityLog: {
  //     primary: "#ee2d24!important",
  //     darkgray: "darkgray!important"
  //   },
  //   overrides: {
  //     MuiOutlinedInput:{
  //       root:{
  //         color: "#ee2d24!important"
  //       }
  //     },
  //     MuiTableRow:{
  //       color:"#ee2d24",
  //     },
  //     MuiInput:{
  //       underline:{'&:after':{borderBottomColor:"#ee2d24!important"}}
  //     },
  //     MuiButton:{
  //       textPrimary:{
  //         color: "#ee2d24!important"
  //       }
  //     },
  //     MuiCheckbox:{
  //       colorPrimary:{
  //         color:"#ee2d24!important"
  //       }
  //     },
  //     MUIDataTableToolbar:{
  //       icon:{'&:hover': {color: '#ee2d24'}},
  //       iconActive:{color:'#ee2d24'}
  //     },
  //     MuiPaper:{
  //       root:{
  //         boxShadow:"none!important"
  //       }
  //     },
  //     MUIDataTableBodyCell: {
  //       root: {
  //         whiteSpace: "nowrap"
  //       },
  //     },
  //   },
  // });

  const getMuiTheme = () =>
customCreateTheme({
  status: {
    success: "#009873!important",
    primary: "#B10040!important",
    darkgray: "darkgray!important"
  },
  components:{
    MuiPaper:{
      styleOverrides:{
        root:{
          // margin:"1rem 0",
          // background: 'rgba(255,255,255,0.3)',
          background: 'transparent',
          // padding:'0 1rem',
          boxShadow:"none",
          ".MuiList-root":{
            width: "100%"
          },
          ".MuiMenuItem-root":{
            width: "100%",
            display: "flex",
            paddingTop: "8px",
            paddingBottom: "8px",
          }
        }
      }
    },
      MuiPopover:{
        styleOverrides:{
          paper:{
            background:"white",
            boxShadow:"0px 2px 1px -1px rgb(0 0 0 / 20%), 0px 1px 1px 0px rgb(0 0 0 / 14%), 0px 1px 3px 0px rgb(0 0 0 / 12%)"
          }
        }
      },
    // MuiTable:{
    //   styleOverrides:{
    //     root:{
    //       width: "calc(100% - 2rem)",
    //       marginLeft: "1rem"
    //     }
    //   }
    // },
    MuiOutlinedInput:{
      styleOverrides:{
        root:{
          color: "#ee2d24!important"
        }
      }
    },
    MuiTypography:{
      styleOverrides:{
        root:{
          fontFamily:"'GothamRounded-Book' !important"
        }
      }
    },
    MuiButtonBase:{
      styleOverrides:{
        root:{
          fontFamily:"'GothamRounded-Book' !important"
        }
      }
    },
    MuiTableRow:{
      styleOverrides:{
        root:{
          color:"#ee2d24",
          backgroundColor:"transparent"
          // background:"rgba(255,255,255,0.3)"
        },
        "head":{
          backgroundImage:"linear-gradient(to right,rgba(178,98,98,0.3),rgb(255 228 228 / 30%))",
          backgroundImage:"linear-gradient(to right,rgb(237 167 88 / 30%),rgb(253 243 236 / 30%))",
        },
      }
    },
    MuiTableCell:{
      styleOverrides:{
        root:{
          "span":{
            display:"flex",
            justifyContent:"center",
          },
        },
        head:{
          backgroundColor:"transparent !important",
        }
      }
    },
      MuiMenu:{
        styleOverrides:{
          paper:{
            boxShadow:"0px 2px 1px -1px rgb(0 0 0 / 20%), 0px 1px 1px 0px rgb(0 0 0 / 14%), 0px 1px 3px 0px rgb(0 0 0 / 12%) !important"
          },
          list:{
            background:"white",
          }
        }
      },
    MuiInput:{
      styleOverrides:{
        underline:{'&:after':{borderBottomColor:"#ee2d24!important"}}
      }
    },
    MuiButton:{
      styleOverrides:{
        textPrimary:{
          color: "#ee2d24!important"
        }
      }
    },
    MuiCheckbox:{
      styleOverrides:{
        colorPrimary:{
          color:"#ee2d24!important"
        }
      }
    },
    MuiIconButton:{
      styleOverrides:{
        root:{
          flex:" 0 0 auto !important",
          color: "rgba(0, 0, 0, 0.54) !important",
          padding:" 12px !important",
          overflow: "visible !important",
          fontSize: "1.5rem !important",
          textAlign: "center !important",
          transition: "background-color 150ms cubic-bezier(0.4, 0, 0.2, 1) 0ms !important",
          borderRadius:" 50% !important",
          '&:hover': {color: '#ee2d24 !important'},
          '&[class*="iconActive"]':{
            color: '#ee2d24 !important'
          }
        },
        
      }
    },
    MuiToolbar:{
      styleOverrides:{
        root:{
          
        },
      }
    },
  }
});
function Odc({
    data:ODCData,
    userData,
    viewOdcClient,
    deleteSelectedCoreFeeder,
    token,
    setSelectedCoreFeeder
    }) {
      // console.log("ODC Data",ODCData)
        /**
         * variables for Selected ODC 
         */
        // console.log("data raw [...odcid]",ODCDataClient)
    const dispatch = useDispatch();
      // console.log("focus feeder",feederFocus)
    // choose saga datastream (server || client)
    /**
     * startpoint route /odc/odc-ktm-fs
     */
    const router = useRouter();
    const { odcId } = router.query;
    const {odc_name,capacity,merek,core,rak_oa,panel_oa,port,deployment_date,splitter={splitter:{position:[]},data:[],position:{left:0,top:0}},panel={data:[],position:{left:375,top:0}}} = (viewOdcClient || false)? viewOdcClient:ODCData;
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
            splitter.style.borderColor = "#ffda00";
            const distribution = (currPa.distribution)?document.querySelector(`[data-id="${currPa.distribution.distribution_index}"][data-rak="${currPa.distribution.distribution_level}"]`):null;
            if(currPa.distribution){
              distribution.childNodes[0].style.borderColor = "#ffda00";
            }
            splitter.style.borderColor = "#ffda00";
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
        feederModal[1]({type:"edit",status:"true"});
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
    /**
     * startpoint route /odc/odc-ktm-fs
     */

    /**
     * variables for status page
     * @param {*} values 
     */

    useEffect(()=>{
        // console.log("feeder focus",feederFocus)
    },[feederFocus])
    /**
     * variables for activity log page
     */
     const [datatable, setDatatable] = useState([[]]);
     useEffect(()=>{
      setDatatable(userData.map(item=>([
        item.name,
        item.email,
        item.role,
        // ODCData.deployment_date,
        "Sat Apr 02 2022 22:32:35",
        item.action || "user merubah ODC"
      ])))
      // console.log("re render data",(viewOdcClient || false)?viewOdcClient:ODCData)
    },[ODCData,userData,viewOdcClient])
     /** display odc panel */
    if(odcId.length==1){
        return <div className={`wrapper ${styles.odcIdWrapper}`}>
          { ((viewOdcClient || false)?viewOdcClient:ODCData) &&
          <div className={styles.odcWrapper}>
            <div className={`row ${styles.odcDetail}`}>
              <div>
              <div className='col-lg-3'>
                <div className={styles.alldetailItems}>

                </div>
                <div className={styles.odcDetailItems}>
                  <Typography sx={{ whiteSpace: "nowrap"}}>Nama ODC : </Typography>
                  <Typography sx={{textTransform: "uppercase", whiteSpace: "nowrap"}}>{odc_name}</Typography>
                </div>
                <div className={styles.odcDetailItems}>
                  <Typography>Kapasitas : </Typography>
                  <Typography>{capacity || ""}</Typography>
                </div>

              </div>
              <div className='col-lg-3'>
                <div className={styles.odcDetailItems}>
                  <Typography>Merek : </Typography>
                  <Typography>{merek || ""}</Typography>
                </div>

                <div className={styles.odcDetailItems}>
                  <Typography>Deployment Date : </Typography>
                  <Typography>{deployment_date || ""}</Typography>
                </div>
              </div>
              <div className='col-lg-3'>
                <div className={styles.odcDetailItems}>
                  <Typography>Core : </Typography>
                  <Typography>{core || ""}</Typography>
                </div>
                <div className={styles.odcDetailItems}>
                  <Typography>Rak OA : </Typography>
                  <Typography>{rak_oa || ""}</Typography>
                </div>
              </div>
              <div className='col-lg-3'>
                <div className={styles.odcDetailItems}>
                  <Typography>Panel : </Typography>
                  <Typography>{panel_oa || ""}</Typography>
                </div>
                <div className={styles.odcDetailItems}>
                  <Typography>Port : </Typography>
                  <Typography>{port || ""}</Typography>
                </div>
              </div>
              </div>
              <div className={styles.splitPanelWrapper} style={{height:"1000px"}}>
                <Splitter x={splitter.position.split(" ")[1] == "left" ? "0":""} y={splitter.position.split(" ")[0] == "top" ? "0":""}>
                  {splitter.data.map(s_item=>
                  <Eth from="splitter" key={"sp"+s_item.index} id={s_item.index} status={s_item.status}
                    columns={splitter.data.length} />
                  )}
                </Splitter>
                <Panel x={splitter.position.split(" ")[1] == "left" ? "375":""} y={splitter.position.split(" ")[0] == "top" ? "0":""}>
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
              </div>
              {/* <div className={styles.odcFiles}> */}
                <div className={`${splitterStyle.videoWrapper}`} style={{left: (splitter.position.split(" ")[1]=="left"? "30px":""),top:(splitter.position.split(" ")[0]=="top"? "639px":"")}}>
              {/* <div className={`${splitterStyle.splitWrapper}`} style={{top:"250px",left:"0px"}}> */}
                <div className={`${splitterStyle.card}`}>
                  <div className={`${splitterStyle.cardHeader} ${splitterStyle.cardHeaderBlue}`} style={{zIndex:"1"}}>


                    <h4 className={splitterStyle.cardTitle}>Video</h4>
                  </div>
                  <div className={`${splitterStyle.videoContainer}`}>
                    <iframe frameBorder="0" scrolling="no" marginHeight="0" marginWidth="0" width="315" height="auto"
                      type="text/html"
                      src="https://www.youtube.com/embed/_cAIkgb5I0E?autoplay=0&fs=0&iv_load_policy=3&showinfo=0&rel=0&cc_load_policy=0&start=0&end=0&origin=http://youtubeembedcode.com"></iframe>
                  </div>
                </div>
              {/* </div> */}
              </div>
              <div className={`${splitterStyle.legendWrapper}`} style={{left: (splitter.position.split(" ")[1]=="left"? "30px":""),top:(splitter.position.split(" ")[0]=="top"? "921px":"")}}>
              {/* <div className={`${splitterStyle.splitWrapper}`} style={{top:"250px",left:"0px"}}> */}
                <div className={`${splitterStyle.card}`}>
                  <div className={`${splitterStyle.cardHeader} ${splitterStyle.cardHeaderPurple}`} style={{zIndex:"1"}}>


                    <h4 className={splitterStyle.cardTitle} >Legends</h4>
                  </div>
                  <div className={`${splitterStyle.legendContainer}`}>
                    
                      <div className='col-md-12 col-lg-12'>
                        <div className="row">
                          <div className='col-xs-12 col-sm-12 col-md-6 col-lg-6'>
                            <div className='row'>
                              <div className='col-xs-12 col-sm-12 col-md-6 col-lg-6'>
                                focused
                              </div>
                              <div className='col-xs-12 col-sm-12 col-md-6 col-lg-6'>
                                <div className={styles.portBorder} style={{borderColor:'#ffda00'}}>
                                </div>
                              </div>
                            </div>
                          </div>
                          <div className='col-xs-12 col-sm-12 col-md-6 col-lg-6'>
                            <div className='row'>
                              <div className='col-xs-12 col-sm-12 col-md-6 col-lg-6'>
                                priority
                              </div>
                              <div className='col-xs-12 col-sm-12 col-md-6 col-lg-6'>
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
                            <div className='col-xs-12 col-sm-12 col-md-6 col-lg-6'>
                            used
                            </div>
                            <div className='col-xs-12 col-sm-12 col-md-6 col-lg-6'>
                              {/* <MdOutlineViewSidebar fill='blue'/> */}
                              <div className={styles.portBorder} style={{borderColor:'blue'}}>
                                </div>
                            </div>
                          </div>
                        </div>
                        <div className='col-xs-12 col-sm-12 col-md-6 col-lg-6'>
                          <div className='row'>
                            <div className='col-xs-12 col-sm-12 col-md-6 col-lg-6'>
                            idle
                            </div>
                            <div className='col-xs-12 col-sm-12 col-md-6 col-lg-6'>
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
                            <div className='col-xs-12 col-sm-12 col-md-6 col-lg-6'>
                            broken
                            </div>
                            <div className='col-xs-12 col-sm-12 col-md-6 col-lg-6'>
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
              <Modal token={token} dispatchFn={{setSelectedCoreFeeder,deleteSelectedCoreFeeder}} open={feederModal[0].status} header={"Feeder "+feederFocus.feeder.feeder_index} splitterData={splitter.data} panelData={panel.data} feederModal={feederModal} feederFocus={feederFocus}/>
              {/* <script async src="https://telegram.org/js/telegram-widget.js?18" data-telegram-login="miftah1112_bot"
                data-size="large" data-onauth="onTelegramAuth(user)" data-request-access="write"></script> */}
              <div className={styles.odcFiles}>
                <div className={`${splitterStyle.splitWrapper}`} style={{position:"relative",minWidth:"279px"}}>
                  {/* <div className={`${splitterStyle.splitWrapper}`} style={{top:"250px",left:"0px"}}> */}
                  <div className={`${splitterStyle.card}`}>
                    <div className={`${splitterStyle.cardHeader} ${splitterStyle.cardPinkish}`} style={{zIndex:"1"}}>


                      <h4 className={splitterStyle.cardTitle}>KML Data</h4>
                    </div>
                    <div className={`${splitterStyle.splitContainer}`}>
                      <div className={styles.kmlContainer}>
                        klik disini untuk upload file
                      </div>
                    </div>
                  </div>
                </div>
                <div className={`${splitterStyle.splitWrapper}`} style={{position:"relative",minWidth:"279px"}}>
                  {/* <div className={`${splitterStyle.splitWrapper}`} style={{top:"250px",left:"0px"}}> */}
                  <div className={`${splitterStyle.card}`}>
                    <div className={`${splitterStyle.cardHeader} ${splitterStyle.cardPinkish}`}
                      style={{zIndex:"1"}}>


                      <h4 className={splitterStyle.cardTitle}>MC Data</h4>
                    </div>
                    <div className={`${splitterStyle.splitContainer}`}>
                      <div className={styles.mcContainer}>
                        klik disini untuk upload file
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className={styles.notesContainer}>
                Notes: 
                <textarea name="" id="" cols="30" rows="10"></textarea>
                <Button variant={"outlined"}><a>Edit</a></Button>

              </div>
              
              {/* <Dropzone
                  accept='image/jpeg, image/png'
                  onDrop={acceptedFiles =>
                  handleAcceptedFiles(acceptedFiles)
                  }
              >
                  {({ getRootProps, getInputProps }) => (
                  <div className="dropzone">
                      <div
                      className="dz-message needsclick mt-2"
                      {...getRootProps()}
                      >
                      <input {...getInputProps()} className="form-control"/>
                      <div className="mb-3">
                          <i className="display-4 text-muted ri-upload-cloud-2-line"></i>
                      </div>
                      <h4>Drop files here or click to upload.</h4>
                      </div>
                  </div>
                  )}
              </Dropzone> */}
            </div>
          </div>
            }
        </div>
    }

  /**
   * status
   */
  else if(odcId[1]=="status"){
    return (<div className={styles.mainContent}>
      <div className={`container-fluid ${styles.content}`}>
        <div className='row'>
          <div className="col-lg-12 col-md-12">
            <div className={`${styles.card}`}>
              <div className={`${styles.cardHeader} ${styles.cardHeaderSuccess}`}>
                <h4 className={styles.cardTitle}>{`Panel Status`}</h4>
              </div>
              <div className="card-body table-responsive">
                <div className={styles.splitterStatusContainer}>
                  <Typography> Splitter </Typography>
                  {splitter.data.map(item=><FormControl key={item.id} variant="standard" sx={{ m: 1, minWidth: 124 }}>
                    <InputLabel id="demo-simple-select-standard-label">Splitter {item.index}</InputLabel>

                    <NativeSelect defaultValue={item.status=="used" ? 10:20} inputProps={{
                        name: 'age',
                        id: 'uncontrolled-native',
                        }}>
                          {(item.status=="used" || item.status=="priority") && [{status:"used",value:10},{status:"priority",value:20},{status:"broken",value:30}].map(item=><option key={"sp"+item.status} value={item.value}> {item.status}</option>)}
                          {(item.status=="idle") && ["idle","broken"].map(item=><option key={"sp"+item} value={10}> {item}</option>)}
                    </NativeSelect>
                    </FormControl>
                  )}
                </div>
                <div className={styles.feederStatusContainer}>
              <Typography> Panel </Typography>
              <div>
                  {panel.data.map(item=>(<>
                    {item.data.map(distFeed=>{
                      
                      return <FormControl key={distFeed.index} variant="standard" sx={{ m: 1, minWidth: 89 }}>
                     <InputLabel id="demo-simple-select-standard-label" className={styles.portLabel}> { ((item.rak_level)%2===0)?item.type+item.rak_index+" "+(distFeed.index+12):item.type+item.rak_index+" "+distFeed.index }</InputLabel>
                     {/* <InputLabel id="demo-simple-select-standard-label" className={styles.portLabel}> { ((item.rak_level)%2===0)?item.type+item.rak_index+" "+(distFeed.index+12):item.type+item.rak_index+" "+distFeed.index }</InputLabel> */}
                        {/* {ODCData.panel.data.length}
                        {item.data.length} */}
                       
                     <NativeSelect  defaultValue={distFeed.status=="used" ? 10:20} inputProps={{
                       name: 'age',
                       id: 'uncontrolled-native',
                      }}>
                             {/* (item.status=="used") ? ["used","priority"].map(item=><option key={"sp"+item} value={10}> {item}</option>) : ["idle","broken"].map(item=><option key={"sp"+item} value={10}> {item}</option>) */}
                          {(distFeed.status=="used" || distFeed.status=="priority") && [{status:"used",value:10},{status:"priority",value:20},{status:"broken",value:30}].map(item=><option key={"sp"+item.status} value={item.value}> {item.status}</option>)}
                          {/* {(distFeed.status=="used" || distFeed.status=="priority") && [{status:"used",value:10},{status:"priority",value:20}].map(item=><option key={"sp"+item.status} value={item.value}> {item.status}</option>)} */}
                          {(distFeed.status=="idle") && ["idle","broken"].map(item=><option key={"sp"+item} value={10}> {item}</option>)}
                    </NativeSelect>
                    </FormControl>
                        })}
                    </>)
                  )}
                  </div>
                </div>
              </div>
            </div>
          </div>
          </div>
      </div>
      </div>
    )
  }
/** display user activity log */
  else if(odcId[1]=="activity log"){

    return (
      <div className={styles.mainContent}>
          <div className={`container-fluid`}>
              <div className='row'>
                  <div className="col-lg-12 col-md-12">
                      <div className={`${styles.card}`}>
                          <div className={`${styles.cardHeader} ${styles.cardHeaderWarning}`}>
                              <h4 className={styles.cardTitle}>{`Activity Log`}</h4>
                              {/* <div className={styles.stats}>
                                  <MdOutlineDateRange width={16} height={"auto"} /> Last 24 Hours
                              </div> */}
                          </div>
                              <div className="card-body table-responsive">
                                  {/* <MuiThemeProvider theme={getMuiTheme()}> */}
                                  <ThemeProvider theme={getMuiTheme()}>
                                  {datatable ? <DynamicMUIDataTable 
                                      // title={"Employee List"}
                                      // options={options}
                                      options={{
                                      selectableRows:false,
                                      print: false,
                                      }}
                                      checkboxSelection={false} 
                                      data={datatable}
                                      columns={[{
                                          name: "No",
                                          options:{
                                            customBodyRender:(value, tableMeta, update) => {
                                                // console.log("row render",tableMeta)
                                              let rowIndex = (tableMeta.rowData[1])?Number(tableMeta.rowIndex) + 1: "";
                                              return ( <span>{rowIndex}</span> )
                                            }
                                          }
                                        },{
                                          name: "User",
                                          options:{
                                            customBodyRender:(value, tableMeta, update) => {
                                              let newValue = tableMeta.rowData[0]
                                              return ( <span>{newValue}</span> )
                                            }
                                          }
                                        },{
                                          name: "Email",
                                          options:{
                                            customBodyRender:(value, tableMeta, update) => {
                                              let newValue = tableMeta.rowData[1]
                                              return ( <span>{newValue}</span> )
                                            }
                                          }
                                        },{
                                          name: "Role",
                                          options:{
                                            customBodyRender:(value, tableMeta, update) => {
                                              let newValue = tableMeta.rowData[2]
                                              return ( <span>{newValue}</span> )
                                            }
                                          }
                                        },{
                                          name: "Tanggal",
                                          options:{
                                            customBodyRender:(value, tableMeta, update) => {
                                              let newValue = tableMeta.rowData[3]
                                              return ( <span>{newValue}</span> )
                                            }
                                          }
                                        },{
                                          name: "Aksi",
                                          options:{
                                            customBodyRender:(value, tableMeta, update) => {
                                              let newValue = tableMeta.rowData[4]
                                              return ( <span>{newValue}</span> )
                                            }
                                          }
                                        }]}
                                      />:null}
                                      
                                  </ThemeProvider>
                                  {/* </MuiThemeProvider> */}
                              </div>
                      </div>
                  </div>
              </div>
          </div>
      </div>
  )
  }
}

export const getServerSideProps = async (props) => wrapper.getServerSideProps(store => async ({req, res, ...etc}) => {
    // const { token } = /authUserToken=(?<token>\S+)/g.exec(req.headers.cookie)?.groups || {token: ""} ;
    if(!req.cookies.token)
    return {
      redirect:{
        permanent:false,
        destination: "/"
      }
    }
    const {params:{odcId=[]}} = props;
    console.log("odc id",odcId[0])
    store.dispatch(getOcdSplitpanelStatus(odcId[0],req.cookies.token,toast))
    store.dispatch(getUserData(1,10, {name:"",direction:"asc"},req.cookies.token,null,toast))
    store.dispatch(END)
    await store.sagaTask.toPromise();
    console.log("user data",store.getState().Users)
    // console.log("req test:",req.url,res,etc)
    // console.log("store",store.getState().ODCs.selectedOdcSplitpanelStatus)
    const {ODCs:{selectedOdcSplitpanelStatus}} = store.getState();
    // const {ODCs:{odcsBox=[],splitterData=[],coreFeederData=[]}} = store.getState();
    
    console.log("odc id",odcId,odcId.length)
    // if(odcId.length>1){
      if(selectedOdcSplitpanelStatus==={} && (odcId[1]!=='status' || odcId[1]!=='activity log')){
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
                  userData: store.getState().Users.userData.data,
                  token: req.cookies.token
                },
                // props:{ data: odcsBox,splitterData,coreFeederData},
                // revalidate:60,
            } 

        }
      })(props);

const mapStateToProps = state => ({
    dataClient:state?.ODCs?.odcsBox,
    loading: state.ODCs.loading.get,
    selectedCoreFeeder:state.ODCs.client.selectedCoreFeeder,
    viewOdcClient: state.ODCs.selectedOdcSplitpanelStatus,
    coreFeederDataClient: state.ODCs.client.coreFeederData,
});
const mapFunctionToProps = {
    getOcdSplitpanelStatus,
    setSelectedCoreFeeder,
    deleteSelectedCoreFeeder
}
export default connect(mapStateToProps,mapFunctionToProps)(withAuth(Odc));