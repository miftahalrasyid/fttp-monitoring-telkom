import React,{useState,useCallback,useEffect} from 'react';
import { useRouter } from 'next/router';
import withAuth from '../../components/Auth';
import {END} from 'redux-saga';
import { connect, useDispatch } from 'react-redux';

import Layout from '../../components/Layout';
// import styles from '../../components/Distributor/distributor.module.css';
import styles from './odc.module.css';
import splitterStyle from '../../components/Splitter/splitter.module.css';
// import styles from '../../components/Feeder/feeder.module.css'
import Splitter from '../../components/Splitter';
import Eth from '../../components/Eth';
import Rak from '../../components/Rak';
import Panel from '../../components/Panel';
// import panelStyles from '../../components/panel.module.css';
import Feeder from '../../components/Feeder';
import Distributor from '../../components/Distributor';
import {
    MdInventory,
    MdNfc,
    MdSettingsInputComposite,
    MdOutlineDateRange,
    MdOpenInBrowser,
    MdRemoveRedEye,
    MdDeleteForever
  } from 'react-icons/md';
  import { createTheme, MuiThemeProvider,styled } from "@material-ui/core/styles";
  const DynamicMUIDataTable = dynamic(() => import('mui-datatables'),{ ssr: false });
import {
    getOcdSplitpanelStatus
} from '../../components/store/odcs/actions';
import { wrapper,makeStore } from "../../components/store";
import store from '../../components/store'
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

// const CustomSelect = styledCustom(Select)(({theme})=>({
//     '.MuiList-root': {
//       display: "flex",
//       flexDirection: "column",
//     },
//   }))

  const getMuiTheme = () =>
  createTheme({
    CustomButtonActivityLog: {
      primary: "#ee2d24!important",
      darkgray: "darkgray!important"
    },
    overrides: {
      MuiOutlinedInput:{
        root:{
          color: "#ee2d24!important"
        }
      },
      MuiTableRow:{
        color:"#ee2d24",
      },
      MuiInput:{
        underline:{'&:after':{borderBottomColor:"#ee2d24!important"}}
      },
      MuiButton:{
        textPrimary:{
          color: "#ee2d24!important"
        }
      },
      MuiCheckbox:{
        colorPrimary:{
          color:"#ee2d24!important"
        }
      },
      MUIDataTableToolbar:{
        icon:{'&:hover': {color: '#ee2d24'}},
        iconActive:{color:'#ee2d24'}
      },
      MuiPaper:{
        root:{
          boxShadow:"none!important"
        }
      },
      MUIDataTableBodyCell: {
        root: {
          whiteSpace: "nowrap"
        },
      },
    },
  });
function Odc({
    data:ODCData,
    }) {
      console.log("ODC Data",ODCData)
        /**
         * variables for Selected ODC 
         */
        // console.log("data raw [...odcid]",ODCDataClient)
    const dispatch = useDispatch();

    // choose saga datastream (server || client)
    /**
     * startpoint route /odc/odc-ktm-fs
     */
    const router = useRouter();
    const { odcId } = router.query;
    const {splitter={data:[],position:{left:0,top:0}},panel={data:[],position:{left:375,top:0}}} = ODCData;
    const feederModal = useState(false);
    // const [feederFocus,setFeederFocus] = useState(false); 
    const [feederFocus,setFeederFocus] = useState(
      {
        feederElm:null,
        splitterElm:null,
        distributionElm:null,
        feeder:{
          feeder_id:null,
          feeder_index:null,
          feeder_level:null
        },
        distribution:{
          distribution_id:null,
          distribution_index:null,
          distribution_level:null
        },
        splitter:{
          splitter_id:null,
          splitter_index:null,
          splitter_level:null
        }
      }); 
    
    const panelClickHandler = useCallback((ev)=>{
      /**
       * on feeder click start
       */
      /**if the feeder are idle */
      if(ev.target.children[1].getAttribute("fill")=="#75767e"){
        feederModal[1](true);
        if(feederFocus && (ev.target.children[1]!==feederFocus)){
          feederFocus.feederElm?.setAttribute("fill","blue");
          feederFocus.splitterElm?.setAttribute("fill","blue");
          feederFocus.distributionElm?.forEach(item=>{
            if(item)
            item.setAttribute("fill","blue");
          })
        }
        setFeederFocus({
          feederElm:null,
          splitterElm:null,
          distributionElm:null,
          feeder:{
            feeder_id:null,
            feeder_index:null,
            feeder_level:null
          },
          distribution:{
            distribution_id:null,
            distribution_index:null,
            distribution_level:null
          },
          splitter:{
            splitter_id:null,
            splitter_index:null,
            splitter_level:null
          }
        })
      }
      /**if the feeder are used */
      // console.log(ev.target.children[1].getAttribute("fill"))
      else if(ev.target.children[1].getAttribute("fill")=="blue" && ev.target.getAttribute("data-type")=="feeder"){
        
        setFeederFocus(()=>{

          /* ketika klik feeder used lainnya*/
          if(feederFocus && (ev.target.children[1]!==feederFocus)){
            feederFocus.feederElm?.setAttribute("fill","blue");
            feederFocus.splitterElm?.setAttribute("fill","blue");
            feederFocus.distributionElm?.forEach(item=>{
              if(item)
              item.setAttribute("fill","blue");
            })
          }
          const [{data=[{
            id:"",
            index:"",
            pass_through:"",
            status:"",
            passive_out:[],
          }],rak_index}] = panel.data.filter(pnl=>pnl.rak_level.toString()==ev.target.getAttribute('data-rak'));

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
            ,pass_through,index:feederIndex}] = data.filter(rpnl=>rpnl.index.toString() === ev.target.getAttribute('data-id'));
            return passive_out.reduce((prevPa,currPa)=>{
          // return passive_out.reduce(pa=>{
            // console.log("rak children",document.querySelector(`[data-id="${pa.splitter.splitter_index}"][data-type="splitter"]`))
            /** change color from used to focused with pass_through condition for splitter*/
            /** kondisi jika tidak passthrough */
            const splitter = (!pass_through)?document.querySelector(`[data-id="${currPa.splitter.splitter_index}"][data-type="splitter"]`).children[1]:null;
            if(!pass_through)
            splitter.setAttribute("fill","#ffda00");
            const distribution = (currPa.distribution)?document.querySelector(`[data-id="${currPa.distribution.distribution_index}"][data-rak="${currPa.distribution.distribution_level}"]`).children[1]:null;
            if(currPa.distribution)
            distribution.setAttribute("fill","#ffda00");
            ev.target.children[1].setAttribute("fill","#ffda00");

            // console.log("prev pa",prevPa,currPa)
            return {
              /** assign new data to either remove or add focused status */
              splitterElm:splitter,
              feederElm: ev.target.children[1],
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
      else if(ev.target.children[1].getAttribute("fill")=="#ffda00" && ev.target.getAttribute("data-type")=="feeder"){
        feederModal[1](true);
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
        console.log("feeder focus",feederFocus)
    },[feederFocus])
    /**
     * variables for activity log page
     */
     const [datatable, setDatatable] = useState([[]])
    if(odcId.length==1){
        return <div className={`wrapper ${styles.odcIdWrapper}`}>
          { ODCData &&
          <div className={styles.odcWrapper}>
            <div className={`row ${styles.odcDetail}`}>
              <div className='col-lg-3'>
                <div className={styles.odcDetailItems}>
                  <Typography>ID : </Typography>
                  <Typography>{ODCData.odc_id}</Typography>
                </div>
                <div className={styles.odcDetailItems}>
                  <Typography>Kapasitas : </Typography>
                  <Typography>{ODCData.capacity || ""}</Typography>
                </div>

              </div>
              <div className='col-lg-3'>
                <div className={styles.odcDetailItems}>
                  <Typography>Merek : </Typography>
                  <Typography>{ODCData.mrek || ""}</Typography>
                </div>

                <div className={styles.odcDetailItems}>
                  <Typography>Deployment Date : </Typography>
                  <Typography>{ODCData.deployment_date || ""}</Typography>
                </div>
              </div>
              <div className='col-lg-3'>
                <div className={styles.odcDetailItems}>
                  <Typography>Core : </Typography>
                  <Typography>{ODCData.core || ""}</Typography>
                </div>
                <div className={styles.odcDetailItems}>
                  <Typography>Rak OA : </Typography>
                  <Typography>{ODCData.rak_oa || ""}</Typography>
                </div>
              </div>
              <div className='col-lg-3'>
                <div className={styles.odcDetailItems}>
                  <Typography>Panel : </Typography>
                  <Typography>{ODCData.panel_oa || ""}</Typography>
                </div>
                <div className={styles.odcDetailItems}>
                  <Typography>Port : </Typography>
                  <Typography>{ODCData.port || ""}</Typography>
                </div>
              </div>

              <div className={styles.splitPanelWrapper} style={{height:"1000px"}}>
                <Splitter x={splitter.position.left} y={splitter.position.top}>
                  {splitter.data.map(s_item=>
                  <Eth from="splitter" key={"sp"+s_item.index} id={s_item.index} status={s_item.status}
                    columns={splitter.data.length} />
                  )}
                </Splitter>
                <Panel x={panel.position.left} y={panel.position.top}>
                {panel.data.map((r_item,idx)=>{
                    return <Rak key={'r'+r_item.rak_level} /*last_feeder={panel.data.filter(item=>item.type==="feeder").length} */level={r_item.rak_index} type={r_item.type} datalen={12}>
                      {r_item.data.map(p_item=>
                      /** odd even to define 13-24 */
                        <Eth from={r_item.type} clickHandler={panelClickHandler} key={"port"+p_item.index} rak_level={r_item.rak_level} id={((idx+1)%2===0)?(p_item.index+12):p_item.index} status={p_item.status}
                        columns={r_item.data.length} />
                      )}
                    </Rak>
                
                })}
                </Panel>
              </div>
              <Modal open={feederModal[0]} header={"Feeder "+feederFocus.splitter.splitter_index} splitterData={splitter.data} panelData={panel.data} feederModal={feederModal} feederFocus={feederFocus}/>
              {/* <script async src="https://telegram.org/js/telegram-widget.js?18" data-telegram-login="miftah1112_bot"
                data-size="large" data-onauth="onTelegramAuth(user)" data-request-access="write"></script> */}
              <div className={styles.odcFiles}>
              <div className={`${splitterStyle.splitWrapper}`} style={{position:"relative",minWidth:"279px"}}>
              {/* <div className={`${splitterStyle.splitWrapper}`} style={{top:"250px",left:"0px"}}> */}
                <div className={`${splitterStyle.card}`}>
                  <div className={`${splitterStyle.cardHeader} ${splitterStyle.cardHeaderWarning}`} style={{zIndex:"1"}}>


                    <h4 className={splitterStyle.cardTitle} >KML Data</h4>
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
                    <div className={`${splitterStyle.cardHeader} ${splitterStyle.cardHeaderWarning}`}
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
      <div className={`container-fluid`}>
        <div className='row'>
          <div className="col-lg-12 col-md-12">
            <div className={`${styles.card}`}>
              <div className={`${styles.cardHeader} ${styles.cardHeaderSuccess}`}>
                <h4 className={styles.cardTitle}>{`Panel Status`}</h4>
              </div>
              <div className="card-body table-responsive">
                <div className={styles.splitterStatusContainer}>
                  <Typography> Splitter </Typography>
                  {ODCData.splitter.data.map(item=><FormControl key={item.id} variant="standard" sx={{ m: 1, minWidth: 120 }}>
                    <InputLabel id="demo-simple-select-standard-label">Splitter {item.index}</InputLabel>

                    <NativeSelect defaultValue={20} inputProps={{
                        name: 'age',
                        id: 'uncontrolled-native',
                        }}>
                          {(item.status=="used") && ["used","priority"].map(item=><option key={"sp"+item} value={10}> {item}</option>)}
                          {(item.status=="idle") && ["idle","broken"].map(item=><option key={"sp"+item} value={10}> {item}</option>)}
                    </NativeSelect>
                    </FormControl>
                  )}
                </div>
                <div className={styles.feederStatusContainer}>
              <Typography> Panel </Typography>
              <div>
                  {ODCData.panel.data.map(item=>(<>
                    {item.data.map(distFeed=>{
                     return <FormControl key={distFeed.index} variant="standard" sx={{ m: 1, minWidth: 87 }}>
                     <InputLabel id="demo-simple-select-standard-label" className={styles.portLabel}> { ((item.rak_level)%2===0)?item.type+item.rak_index+" "+(distFeed.index+12):item.type+item.rak_index+" "+distFeed.index }</InputLabel>
                        {/* {ODCData.panel.data.length}
                        {item.data.length} */}
                     <NativeSelect  defaultValue={20} inputProps={{
                        name: 'age',
                        id: 'uncontrolled-native',
                        }}>
                             {/* (item.status=="used") ? ["used","priority"].map(item=><option key={"sp"+item} value={10}> {item}</option>) : ["idle","broken"].map(item=><option key={"sp"+item} value={10}> {item}</option>) */}
                          {(distFeed.status=="used") && ["used","priority"].map(item=><option key={"sp"+item} value={10}> {item}</option>)}
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
                                  <MuiThemeProvider theme={getMuiTheme()}>
                                  {/* <ThemeProvider theme={getMuiTheme()}> */}
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
                                                console.log("row render",tableMeta)
                                              let rowIndex = (tableMeta.rowData[1])?Number(tableMeta.rowIndex) + 1: "";
                                              return ( <span>{rowIndex}</span> )
                                            }
                                          }
                                        },{
                                          name: "Nama",
                                          options:{
                                            customBodyRender:(value, tableMeta, update) => {
                                              let newValue = tableMeta.rowData[0]
                                              return ( <span>{newValue}</span> )
                                            }
                                          }
                                        },{
                                          name: "Role",
                                          options:{
                                            customBodyRender:(value, tableMeta, update) => {
                                              let newValue = tableMeta.rowData[1]
                                              return ( <span>{newValue}</span> )
                                            }
                                          }
                                        },{
                                          name: "Tanggal",
                                          options:{
                                            customBodyRender:(value, tableMeta, update) => {
                                              let newValue = tableMeta.rowData[2]
                                              return ( <span>{newValue}</span> )
                                            }
                                          }
                                        },{
                                          name: "Aksi",
                                          options:{
                                            customBodyRender:(value, tableMeta, update) => {
                                              let newValue = tableMeta.rowData[3]
                                              return ( <span>{newValue}</span> )
                                            }
                                          }
                                        }]}
                                      />:null}
                                      
                                  {/* </ThemeProvider> */}
                                  </MuiThemeProvider>
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
    const {params:{odcId=[]}} = props;
    store.dispatch(getOcdSplitpanelStatus(odcId[0]))
    store.dispatch(END)
    await store.sagaTask.toPromise();
    // console.log("req test:",req.url,res,etc)
    // console.log("store",store.getState().ODCs.selectedOdcSplitpanelStatus)

    const {ODCs:{selectedOdcSplitpanelStatus}} = store.getState();
    // console.log("selected odc",selectedOdcSplitpanelStatus)
    // const {ODCs:{odcsBox=[],splitterData=[],coreFeederData=[]}} = store.getState();

    if(odcId.length!==0 && selectedOdcSplitpanelStatus==={}){
    // if(odcId.length!==0 && odcsBox.filter(item=>item?.odc?.id == odcId[0]).length==0){
            return {
                notFound: true
            }
        }
        else{
            return {
                props:{ data: selectedOdcSplitpanelStatus},
                // props:{ data: odcsBox,splitterData,coreFeederData},
                // revalidate:60,
            } 

        }
      })(props);

const mapStateToProps = state => ({
    dataClient:state?.ODCs?.odcsBox,
    loading: state.ODCs.loading.get,
    selectedCoreFeeder:state.ODCs.client.selectedCoreFeeder,
    coreFeederDataClient: state.ODCs.client.coreFeederData,
});
const mapFunctionToProps = {
    getOcdSplitpanelStatus
}
export default connect(mapStateToProps,mapFunctionToProps)(withAuth(Odc));
