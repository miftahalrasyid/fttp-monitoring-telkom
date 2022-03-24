import React,{useState,useEffect} from 'react';
import { useRouter } from 'next/router';
import withAuth from '../../components/Auth';
import {END} from 'redux-saga';
import { connect, useDispatch } from 'react-redux';

import Layout from '../../components/Layout';
// import styles from '../../components/Distributor/distributor.module.css';
import styles from './odc.module.css';
// import styles from '../../components/Feeder/feeder.module.css'
import Splitter from '../../components/Splitter';
import Eth from '../../components/Eth';
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
    getCoreFeederInfo,
    updateCoreFeederInfo,
    updateSplitterDistributionInfo,
    getODCsBox,
    getSplitterData,
    setSelectedCoreFeeder
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
    dataClient:ODCDataClient,
    getODCsBox,
    loading,
    coreFeederData,
    coreFeederDataClient,
    splitterData,
    updateCoreFeederInfo,
    selectedCoreFeeder,
    setSelectedCoreFeeder
    }) {
        /**
         * variables for Selected ODC 
         */
        // console.log("data raw [...odcid]",ODCDataClient)
    const dispatch = useDispatch();

    const router = useRouter();
    const { odcId } = router.query;
    // choose saga datastream (server || client)
    const selectedODC = (ODCDataClient[0]?.id?ODCDataClient:ODCData).filter(dt=>dt.id==odcId[0])

    const [{feeder,distributor,splitter}] = selectedODC;
    // trigger rerender when previous odc data in string doesn't match current odc data
    let onDataUpdate = JSON.stringify(selectedODC[0]?.feeder?.data || []);

    const [{feeder:getfeeder,distributor:getdistributor,splitter:getsplitter}={feeder:{},distributor:{},splitter:{}}] = selectedODC|| {getfeeder:[],getdistributor:[]};
    const wholeCapacity = {feeder:getfeeder?.capacity,distributor:getdistributor?.capacity,splitter:getsplitter?.capacity}
    // console.log([...data.filter(dt=>dt.id==odcId)],odcId,getdistributor.data)
    const [feederState,setFeederState] = useState({inUsed:{ids:[]},isActive:{ids:[],elm:""}});
    // const [parkinglot, setParkinglot] = useState()
    const [feederDetail,setFeederDetail] = useState({splitter:"",passive_out_1:"",passive_out_2:"",passive_out_3:"",passive_out_4:""})
    const [distributeState,setDistributeState] = useState({inUsed:{ids:[]},isActive:{ids:[],elm:""},isOnClick:{ids:[],index:""}});
    const [splitterState,setSplitterState] = useState({inUsed:{ids:[]},isActive:{ids:[]}});
    const showFeederModal = useState(false);
    // const showDistributorModal = useState(false);

        /**
         * variables for status page
         * @param {*} values 
         */
         const [age, setAge] = React.useState('');

         const handleChange = (event) => {
           setAge(event.target.value);
         };

    const onFeederUpdate = async(values) => {
        
        const data = await values;
        const {["splitter-select"]:splitter,passive_out_1,passive_out_2,passive_out_3,passive_out_4} = data;
        // console.log(getfeeder.data.findIndex(feed=>feed.splitter==feederDetail.splitter.default))
        const distributorIndexes = getdistributor.data.reduce((newdist,curdist,idx)=>{

            if(curdist.splitter==feederDetail.splitter.default){
                console.log("newdist",newdist,curdist);
                let passive_out = [];
                switch (idx) {
                    case 0:
                        passive_out = passive_out_1;
                        break;
                    case 1:
                        passive_out = passive_out_2;
                        break;
                    case 2:
                        passive_out = passive_out_3;
                        break;
                    case 3:
                        passive_out = passive_out_4;
                        break;
                
                    default:
                        break;
                }
                // console.log(curdist.splitter,feederDetail.splitter.default,feederDetail.splitter.default==curdist.splitter,idx)

                return [...newdist,{[idx]:passive_out}]
            }
            return newdist
        },[])
        // console.log("dist",newdata)
        // console.log("dist2",newdata)
        // console.log(JSON.stringify({splitter,passive_out_1,passive_out_2,passive_out_3,passive_out_4})==JSON.stringify({...feederDetail,splitter:feederDetail.splitter.default}),JSON.stringify({splitter,passive_out_1,passive_out_2,passive_out_3,passive_out_4}),JSON.stringify({...feederDetail,splitter:feederDetail.splitter.default}))
        // console.log("on submit",data,getfeeder.data.findIndex(feed=>feed.id==feederState.isActive.ids[0]))
        if(JSON.stringify({splitter,passive_out_1,passive_out_2,passive_out_3,passive_out_4})!==JSON.stringify({...feederDetail,splitter:feederDetail.splitter.default})){

            // console.log("prevdist",prevDistributorData)
            const feederIndex = getfeeder.data.findIndex(feed=>feed.splitter==feederDetail.splitter.default)
            updateCoreFeederInfo({...data,["splitter-select"]:parseInt(splitter),feederIndex,distributorIndexes,odcIndex:ODCData.findIndex(dt=>dt.id==odcId)})
        }
    }
    if(typeof window !== 'undefined'){
        console.log("teste")
        window.onTelegramAuth= (user) =>{
            console.log(user)
        }
    }
    useEffect(()=>{
        getODCsBox();
        // console.log("selected core feeder",selectedCoreFeeder)
        const [{splitter:splitterId,id:feederId}={splitterId:null,feederId:null}] = getfeeder?.data?.filter(feed=>feed.id == selectedCoreFeeder);
        // setSplitterState((prev)=>({...prev,isActive:{ids:[splitterId]}}))
        // console.log("rendered","splitterid"+splitterId,feederState,(getfeederClient?.data || false)?getfeederClient:getfeeder,(getfeederClient?.data || false))
        // let feederData = (onDataUpdate!=="[]" && JSON.stringify(getfeeder?.data)!==onDataUpdate)?onDataUpdate?.data:getfeederClient?.data;
        // render feeder
        // if(JSON.stringify(getfeeder?.data)!=onDataUpdate)
        // // on update
        // else{
        //     setFeederState((prev)=>({...prev,inUsed:{ids:getfeeder?.data?.map(item=>{
        //         return item.id
        //     })}}))
        // }
        setFeederState((prev)=>({...prev,inUsed:{ids:getfeeder?.data?.map(item=>{
            return item.id
        })}}))
        // render splitter by the feeder
        setSplitterState((prev)=>({...prev,isActive:{ids:(feederState?.isActive?.ids[0]||false)?[splitterId]:[]},inUsed:{ids:getfeeder?.data?.map(item=>{
            return item.splitter
        })}}))
        // render distributor
        setDistributeState((prev)=>({...prev,inUsed:{ids:getdistributor?.data?.map(item=>{
            return item.id
        })}}))
    },[onDataUpdate])
    /**
     * variables for activity log page
     */
     const [datatable, setDatatable] = React.useState([[]])
    if(odcId.length==1)
  return <div className={`wrapper ${styles.odcIdWrapper}`}>
      {/* <h1>Paperless Management ODC</h1> */}
  {selectedODC?.map(
      item=>{

        const splitter = new Array(item?.splitter?.capacity);
        const feeder = new Array(item?.odc?.feeder?.capacity);
        
        const distributor = new Array(item?.odc?.distributor?.capacity);
        for (let index = 0; index < splitter.length; index++) {
            splitter[index] = {id:(index+1)}
        }
        for (let index = 0; index < feeder.length; index++) {
            feeder[index] = {id:(index+1)}
        }
        const arr = [];
        item?.odc?.odp?.forEach(item=>item?.distribution?.map(item2=>{
            if(arr.indexOf(item2.id)==-1){
                arr.push(item2.id)
                return arr
            }
            return false
        }))
        for (let index = 0; index < distributor.length; index++) {
            distributor[index] = {id:(index+1), arr}
        }
        // console.log("distributor",distributor)
        const feederClickHandler = async(ev) =>{
            localStorage.setItem("telkom-monitoring-feeder-id",ev.target.parentNode.getAttribute("data-id"));
            setSelectedCoreFeeder(parseInt(ev.target.parentNode.getAttribute("data-id")))
             const [{splitter:splitterId,id:feederId}={splitterId:null,feederId:null}] = getfeeder?.data?.filter(feed=>feed.id == parseInt(ev.target.parentNode.getAttribute("data-id")));
            // console.log("splitter",splitterId);
            const distributorObj = getdistributor?.data?.filter(distribute=>distribute.splitter == splitterId);
            // console.log("distributor",distributorObj);
            // set all distributor to active color sign
            setDistributeState((prev)=>({...prev,isActive:{...prev.isActive,ids:distributorObj.map(dist=>dist.id)}}));
            // set all feeder to active color sign
            setFeederState((prev)=>({...prev,isActive:{ids:[feederId],elm:ev.target.parentNode}}))
            // set all splitter to active color sign
            setSplitterState((prev)=>({...prev,isActive:{ids:[splitterId]}}))
            const feederDataTemp = distributorObj.reduce((newarr,curarr,idx)=>{
                if(idx==distributorObj.length-1 && idx<getfeeder?.splitTo){
                    const element = new Array(getfeeder?.splitTo-1-idx || 0);
                    for (let index = idx; index < getfeeder?.splitTo-1; index++) {
                        // console.log((2+index),curarr.passive_out,getfeeder?.splitTo,distributorObj)
                        element["passive_out_"+(2+index)]="";
                        // console.log("element",element)
                    }
                    return {...newarr,splitter:{type:"select",default:curarr.splitter,options:splitterState?.inUsed?.ids},["passive_out_"+curarr.passive_out]:{type:"text",nested:true,name:curarr.name,ds:{type:"select",default:curarr.passive_out,options:distributeState?.inUsed?.ids,dsId:curarr.id,capacity:getdistributor?.capacity}},...element}
                }
                // console.log(idx,curarr.passive_out,getfeeder?.splitTo,distributorObj)
                return {...newarr,splitter:{default:curarr.splitter,options:splitterState?.inUsed?.ids},["passive_out_"+curarr.passive_out]:{type:"text",nested:true,name:curarr.name,ds:{type:"select",default:curarr.passive_out,options:distributeState?.inUsed?.ids,dsId:curarr.id}}}
            },{});
            // set onClick feederdetails
            setFeederDetail(feederDataTemp)
            console.log("feeder data temp",feederDataTemp)
            // console.log("feeder state",feederState?.isActive?.ids[0])
            if(ev.target.parentNode === feederState.isActive.elm){
                showFeederModal[1](true);
            }
        }
        const distributorClickHandler = async(ev) => {
            // console.log("distri", distributeState?.isActive?.ids?.filter(item=>item==ev.target.parentNode.getAttribute("data-id")).length!==0)
            // const checkdistributeState = splitterData?.findIndex(item=>item.id==parseInt(ev.target.parentNode.getAttribute("data-id"))%24 && item.ds==Math.ceil(parseInt(ev.target.parentNode.getAttribute("data-id"))/24));
            // // console.log("data onclick",splitterData?.findIndex(item=>item.id==parseInt(ev.target.parentNode.getAttribute("data-id"))%24 && item.ds==Math.ceil(parseInt(ev.target.parentNode.getAttribute("data-id"))/24)))
            // if(ev.target.parentNode.getAttribute("data-id") && distributeState?.isActive?.ids?.findIndex(item=>item==ev.target.parentNode.getAttribute("data-id"))!==-1){
            //     // console.log("data onclick",splitterData[distributeState?.isOnClick?.ids[0]])
            //     setDistributeState((prev)=>({...prev,isOnClick:{ids:[parseInt(ev.target.parentNode.getAttribute("data-id"))],index:checkdistributeState}}))
            //     showDistributorModal[1](true);
            // }
            // else 
            if(ev.target.parentNode.getAttribute("data-id")){
                const id = parseInt(ev.target.parentNode.getAttribute("data-id"))
                // console.log("translate",ev.target.parentNode.getAttribute("data-id"))
                const {name,splitter,passive_out} = splitterData?.filter(item=>item.id==id%24 && item.ds==Math.ceil(id/24))[0] || {name:"",splitter:"",passive_out:""}
                if(name && splitter && passive_out)
                alert(`ODP : ${name} \nSPLITTER : ${splitter} \nPASSIF OUT : ${passive_out}`)
                
            }
        }

        // console.log("feeder",feederRef)

      return <div key={"odc"+item.id} className={styles.odcWrapper}>
        <div className={`row ${styles.odcDetail}`}>
            <div className='col-lg-3'>
                <div className={styles.odcDetailItems}>
                    <Typography>ID : </Typography>
                    <Typography>{odcId[0]}</Typography>
                </div>
                <div className={styles.odcDetailItems}>
                    <Typography>Kapasitas : </Typography>
                    <Typography>{item?.capacity || ""}</Typography>
                </div>
                
            </div>
            <div className='col-lg-3'>
                <div className={styles.odcDetailItems}>
                    <Typography>Merk : </Typography>
                    <Typography>{item?.merek || ""}</Typography>
                </div>
                
                <div className={styles.odcDetailItems}>
                    <Typography>Deployment Date : </Typography>
                    <Typography>{item?.deploymentDate || ""}</Typography>
                </div>
            </div>
            <div className='col-lg-3'>
                <div className={styles.odcDetailItems}>
                    <Typography>Core : </Typography>
                    <Typography>{item?.core || ""}</Typography>
                </div>
                <div className={styles.odcDetailItems}>
                    <Typography>Rak OA : </Typography>
                    <Typography>{item?.rakOa || ""}</Typography>
                </div>
            </div>
            <div className='col-lg-3'>
                <div className={styles.odcDetailItems}>
                    <Typography>Panel : </Typography>
                    <Typography>{item?.panelOa || ""}</Typography>
                </div>
                <div className={styles.odcDetailItems}>
                    <Typography>Port : </Typography>
                    <Typography>{item?.port || ""}</Typography>
                </div>
            </div>

        </div>
      <div key={"dist"+item.id} className={styles.splitPanelWrapper} style={{height:"1000px"}}>
        <Splitter key={"s"+item.id} x={0} y={0}>
            {splitter.map(item1=><Eth from="splitter" inUsed={splitterState.inUsed} isActive={splitterState.isActive} key={"splitter"+item1.id} id={item1.id} columns={item?.splitter?.capacity}/>)}
        </Splitter>
        <Panel key={"p"+item.id} x={375} y={0}>
                <Feeder clickhandler={feederClickHandler} columns={item?.odc?.feeder?.capacity}>
                    {feeder.map(item1=><Eth from={"feeder"} inUsed={feederState.inUsed} isActive={feederState.isActive} key={"feeder"+item1.id} id={item1.id} columns={item?.odc?.feeder?.capacity}/>)}
                </Feeder>

                <Distributor clickhandler={distributorClickHandler} columns={distributor.length} trayName={arr}>
                    {distributor.map(item1=><Eth from="distributor" inUsed={distributeState.inUsed} isActive={distributeState.isActive} key={"distributor"+item1.id} id={item1.id} columns={24}/>)}
                </Distributor>
        </Panel>
        </div>
        <script async src="https://telegram.org/js/telegram-widget.js?18" data-telegram-login="miftah1112_bot" data-size="large" data-onauth="onTelegramAuth(user)" data-request-access="write"></script>

        </div>
      }
      )}
      <Modal onSubmit={onFeederUpdate} modalTitle={feederState?.isActive?.ids[0]?.toString()} capacity={wholeCapacity} fields={feederDetail} inputOrder={["splitter","passive_out_1","passive_out_2","passive_out_3","passive_out_4"]} visible={showFeederModal}/>
      {/* <Modal onSubmit={onFeederUpdate} modalTitle={feederState?.isActive?.ids[0]} fields={(JSON.stringify(coreFeederData)!==JSON.stringify(coreFeederDataClient))? coreFeederDataClient[feederState?.isActive?.ids[0]]:coreFeederData[feederState?.isActive?.ids[0]]} inputOrder={["gpon","modul","port","core"]} visible={showFeederModal}/> */}
      {/* <Modal onSubmit={onDistributorUpdate} modalTitle={Math.ceil(distributeState?.isOnClick?.ids[0]/24)+" / Port "+distributeState?.isOnClick?.ids[0]%24+" "+distributeState?.isOnClick?.index} fields={splitterData.filter(item=>item.id==distributeState?.isOnClick?.ids[0]%24 && item.ds==Math.ceil(distributeState?.isOnClick?.ids[0]/24))[0]} inputOrder={["name","splitter","passive_out"]} visible={showDistributorModal}/> */}
  </div>;
  /**
   * status
   */
  else if(odcId[1]=="status")
    return (<div className={styles.mainContent}>
        <div className={`container-fluid`}>
            <div className='row'>
                <div className="col-lg-12 col-md-12">
                    <div className={`${styles.card}`}>
                        <div className={`${styles.cardHeader} ${styles.cardHeaderSuccess}`}>
                            <h4 className={styles.cardTitle}>{`Panel Status`}</h4>
                        {/* <div className={styles.stats}>
                            <MdOutlineDateRange width={16} height={"auto"} /> Last 24 Hours
                        </div> */}
                    </div>
                    <div className="card-body table-responsive">
                        <div className={styles.feederStatusContainer}>
                            <Typography> Feeder </Typography>
                            {selectedODC?.map(item=>{
                                const feederArray = new Array(item?.feeder?.capacity || 0);
                                for (let index = 0; index < feederArray.length; index++) {
                                    feederArray[index] = {id:(index+1)}
                                }

                            return feederArray.map((item1,idx)=><FormControl key={item.id} variant="standard" sx={{ m: 1, minWidth: 120 }}>
                                <InputLabel id="demo-simple-select-standard-label">Feeder {idx+1}</InputLabel>
                               
                                <NativeSelect
                                    defaultValue={20}
                                    inputProps={{
                                    name: 'age',
                                    id: 'uncontrolled-native',
                                    }}
                                >
                                    <option value={10}>Priority</option>
                                    <option value={20}>Idle</option>
                                    <option value={30}>Used</option>
                                    <option value={40}>Broken</option>
                                </NativeSelect>
                                {/* <NativeSelect
                                labelId="demo-simple-select-standard-label"
                                id="demo-simple-select-standard"
                                value={age}
                                onChange={handleChange}
                                label={"Feeder"}
                                >
                                <MenuItem value="">
                                    <em>None</em>
                                </MenuItem>
                                <MenuItem value={10}>Priority</MenuItem>
                                <MenuItem value={20}>Idle</MenuItem>
                                <MenuItem value={30}>Used</MenuItem>
                                <MenuItem value={30}>Broken</MenuItem>
                                </NativeSelect> */}
                            </FormControl>)
                            })}
                        </div>
                        <div className={styles.splitterStatusContainer}>
                        <Typography> Splitter </Typography>
                            {selectedODC?.map(item=>{
                                const splitterArray = new Array(item?.splitter?.capacity || 0);
                                for (let index = 0; index < splitterArray.length; index++) {
                                    splitterArray[index] = {id:(index+1)}
                                }

                            return splitterArray.map((item1,idx)=><FormControl key={item.id} variant="standard" sx={{ m: 1, minWidth: 120 }}>
                                <InputLabel id="demo-simple-select-standard-label">Splitter {idx+1}</InputLabel>
                                
                                <NativeSelect
                                    defaultValue={20}
                                    inputProps={{
                                    name: 'age',
                                    id: 'uncontrolled-native',
                                    }}
                                >
                                    <option value={10}>Priority</option>
                                    <option value={20}>Idle</option>
                                    <option value={30}>Used</option>
                                    <option value={40}>Broken</option>
                                </NativeSelect>
                                {/* <NativeSelect
                                labelId="demo-simple-select-standard-label"
                                id="demo-simple-select-standard"
                                value={age}
                                onChange={handleChange}
                                label="Splitter"
                                >
                                <MenuItem value="">
                                    <em>None</em>
                                </MenuItem>
                                <MenuItem value={10}>Priority</MenuItem>
                                <MenuItem value={20}>Idle</MenuItem>
                                <MenuItem value={30}>Used</MenuItem>
                                <MenuItem value={30}>Broken</MenuItem>
                                </NativeSelect> */}
                            </FormControl>)
                            })}
                        </div>
                        <div className={styles.distributionStatusContainer}>
                        <Typography> Distribution </Typography>
                            {selectedODC?.map(item=>{
                                const distributorArray = new Array(item?.distributor?.capacity || 0);
                                for (let index = 0; index < distributorArray.length; index++) {
                                    distributorArray[index] = {id:(index+1)}
                                }

                            return distributorArray.map((item1,idx)=><FormControl key={item.id} variant="standard" sx={{ m: 1, minWidth: 120 }}>
                                <InputLabel id="demo-simple-select-standard-label">D{parseInt((idx)/24)+1+" "+(idx%24+1)}</InputLabel>

                                <NativeSelect
                                    defaultValue={20}
                                    inputProps={{
                                    name: 'age',
                                    id: 'uncontrolled-native',
                                    }}
                                >
                                    <option value={10}>Priority</option>
                                    <option value={20}>Idle</option>
                                    <option value={30}>Used</option>
                                    <option value={40}>Broken</option>
                                </NativeSelect>
                                {/* <NativeSelect
                                labelId="demo-simple-select-standard-label"
                                id="demo-simple-select-standard"
                                defaultValue={30}
                                inputProps={{
                                name: 'distributor',
                                id: 'uncontrolled-native',
                                value={age}
                                onChange={handleChange}
                                label="Splitter"
                                }}
                                >
                                <MenuItem value="">
                                    <em>None</em>
                                </MenuItem>
                                <MenuItem value={10}>Priority</MenuItem>
                                <MenuItem value={20}>Idle</MenuItem>
                                <MenuItem value={30}>Used</MenuItem>
                                <MenuItem value={30}>Broken</MenuItem>
                                </NativeSelect> */}
                            </FormControl>)
                            })}
                        </div>
                    </div>
                  </div>
                </div>
            </div>
        </div>
    </div>)
    else {
        /**
         * activity log
         */
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
// const getStore = async () => {
//     store = makeStore();
//     store.dispatch(getODCsBox())
//     store.dispatch(getCoreFeederInfo())
//     store.dispatch(END)
//     await store.sagaTask.toPromise();
//     return store.getState();
// }
// export const getStaticPaths = async() => {
//     store = makeStore();
//     store.dispatch(getODCsBox())

//     store.dispatch(getCoreFeederInfo())
//     store.dispatch(END)
//     await store.sagaTask.toPromise();
//     const paths = store.getState().ODCs.odcsBox.map(item=>{
//         return { params:{odcId: item?.odc?.id}}})
//     return {
//         paths,
//         fallback:'blocking',
//     }
// }
// export const getStaticProps = async (props) => wrapper.getStaticProps(store => async ({req, res, ...etc}) => {
//     // const { token } = /authUserToken=(?<token>\S+)/g.exec(req.headers.cookie)?.groups || {token: ""} ;
//     store.dispatch(getODCsBox())
//     store.dispatch(getSplitterData())
//     store.dispatch(getCoreFeederInfo())
//     store.dispatch(END)
//     await store.sagaTask.toPromise();
//     console.log("static props",store.getState())
//     // console.log("store",store.getState().ODCs.odcsBox,req,res)
//     const {params:{odcId}} = props;
//     const {ODCs:{odcsBox=[],splitterData=[],coreFeederData=[]}} = store.getState();
//     // console.log("store",odcsBox.filter(item=>item?.odc?.id == odcId))
//     // console.log("store",splitterData)
//     // console.log("core feeder",coreFeederData)
//         if(odcsBox.filter(item=>item?.odc?.id == odcId).length==0){
//             return {
//                 notFound: true
//             }
//         }
//         else{
//             return {
//                 props:{ data: odcsBox.filter(item=>item?.odc?.id == odcId),splitterData,coreFeederData},
//                 revalidate:60,
//             } 

//         }
//       })(props);
export const getServerSideProps = async (props) => wrapper.getServerSideProps(store => async ({req, res, ...etc}) => {
    // const { token } = /authUserToken=(?<token>\S+)/g.exec(req.headers.cookie)?.groups || {token: ""} ;
    store.dispatch(getODCsBox())
    store.dispatch(getSplitterData())
    store.dispatch(getCoreFeederInfo())
    store.dispatch(END)
    await store.sagaTask.toPromise();
    console.log("req test:",req.url,res,etc)
    // console.log("static props",store.getState())
    // console.log("store",store.getState().ODCs.odcsBox,req,res)
    const {params:{odcId=[]}} = props;
    const {ODCs:{odcsBox=[],splitterData=[],coreFeederData=[]}} = store.getState();
    // console.log("odcid props",odcId,odcsBox.filter(item=>item?.odc?.id == odcId[1]))
    // console.log("store",odcsBox.filter(item=>item?.odc?.id == odcId))
    // console.log("store",splitterData)
    // console.log("core feeder",coreFeederData)
    if(odcId.length!==0 && odcsBox.filter(item=>item?.odc?.id == odcId[0]).length==0){
            // console.log("odcid props after filter",odcId,odcsBox.filter(item=>{console.log("item",item?.odc?.id,odcId[0]); return item?.odc?.id == odcId[0]}))
            return {
                notFound: true
            }
        }
        else{
            return {
                props:{ data: odcsBox,splitterData,coreFeederData},
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
    getSplitterData,
    getCoreFeederInfo,
    updateCoreFeederInfo,
    updateSplitterDistributionInfo,
    getODCsBox,
    setSelectedCoreFeeder
}
export default connect(mapStateToProps,mapFunctionToProps)(withAuth(Odc));
