import React, { useCallback, useEffect, useRef, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import styles from './odc_evolve.module.css';
import Card from '../../components/Card';
import dynamic from 'next/dynamic';
const ApexChart = dynamic(()=>import('react-apexcharts'),{ssr:false}) as any;
// import Chart from "react-apexcharts";
import { connect } from 'react-redux';
import {
  MdOpenInBrowser,
  MdRemoveRedEye,
  MdOutlineClose,
  MdDeleteForever
} from 'react-icons/md';
import SimpleBar from 'simplebar-react';
import 'simplebar/dist/simplebar.min.css';
import jwt from 'jwt-decode'
import {END} from 'redux-saga';
import { wrapper,makeStore } from "../../components/store";
import { 
  getODCsBox, 
  getFeederGraph,
  getDistributionGraph,
  getRegionList,
  getWitelList,
  getDatelList,
  getSTOList,
  getMerekList,
  changeODCPage as IchangeODCPage,
  addODCData,
  updateODCData,
  deleteODCData,
  setTableRowsPerPage as IsetTableRowsPerPage,
  setTableSort,
  setTablePage,
  getDashCard
} from '../../components/store/odcs/actions';
import {otpVerificationSuccessfull} from "../../components/store/auth/actions";
import withAuth from '../../components/Auth';
const DynamicMUIDataTable = dynamic(() => import('mui-datatables'),{ ssr: false }) as any;
import {styled } from '@mui/material/styles';
import {
  Button,
  NativeSelect,
  Box,
  Modal,
  Typography
  } from "@material-ui/core";
import {
  Button as newButton,
  ButtonProps,
  FormControl,InputLabel, InputLabelProps, TabsProps, TextFieldProps
} from '@mui/material'
// import { makeStyles } from '@material-ui/styles';
import { createTheme, MuiThemeProvider,makeStyles } from "@material-ui/core/styles";
import {createTheme as customCreateTheme, ThemeProvider} from "@mui/material/styles";
// import { Select,MenuItem, FormControl, InputLabel, Checkbox, ListItemText } from '@mui/material';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import TextField from '@mui/material/TextField';
import { Formik } from 'formik';
import { toast } from 'react-toastify';
const CustomTextField = styled(TextField)<TextFieldProps>(({ theme }) => ({
  color: theme.status.primary,
  '.MuiInputLabel-root.Mui-focused': {
    color: theme.status.primary,
  },
  '.MuiOutlinedInput-notchedOutline': {
    border: "none!important",
    // borderColor: theme.status.primary
  },
  '.MuiInput-root::after': {
    borderColor: theme.status.primary
  },
}));
const CustomFormControl = styled(FormControl)(({theme})=>({
  width: "100%",
  // width: "calc(100% - 1rem)",
  ".MuiInputLabel-root":{
    transform:"translateY(-7px)"
  },
  ".MuiInputBase-root":{
    padding: "7px 0 0px",
    marginTop: "9px",
  }
}))
const CustomTab = styled(Tab)(({theme})=>({
  color:"gray!important",
  '&.MuiTab-root.Mui-selected': {
    color: "black!important"
  },
}))
const CustomTabs = styled(Tabs)<TabsProps>(({theme})=>({
  '.MuiTabs-indicator': {
    backgroundColor: theme.status.primary,
  },
}))
const CustomButton = styled(Button)<ButtonProps>(({theme,btntype})=>({
  background:btntype=="green"?theme.status.success:"transparent",
  color:"white!important",
  padding:"6px 16px !important",
  borderRadius:"1rem!important"
    // backgroundColor:"#009873!important",
    // color:"white!important",
    // borderRadius:"2rem!important"
}))
export function CustomSelect({defaultValue,data,name,onChange,onBlur}){
    console.log("CUSTOM SELECT",defaultValue)
  return <div className={styles.witel}>
      <select value={defaultValue} onChange={onChange} onBlur={onBlur} name={name}>
        {data.map(item=><option key={name+item.value} value={item.value}>{item.label}</option> )}
      </select>
  </div>
}
const rawData = [{
  id: "odc-ktm-fs",
  capacity:144,
  merek: "samsung",
  deploymentDate: "Mar 1994",
  core:24,
  rakOa:"1.3",
  panelOa:2,
  port:5,
  feeder:{
    idle: 24,
    used:0,
    broken:0
  },
  distribution:{
    idle: 120,
    used:0,
    broken:0
  },

}]
const witel = [
  {label: "WITEL", value:0},
  {label: "Semarang", value:1},
  {label: "Kudus", value:2},
  {label: "Magelang", value:3},
  {label: "Pekalongan", value:4},
  {label: "Solo", value:5},
  {label: "Purwokerto", value:6},
]
const datel = [
  {label: "DATEL", value:0},
  {label: "Brebes", value:1},
  {label: "Tegal", value:2},
  {label: "Pemalang", value:3},
  {label: "Pekalongan", value:4},
  {label: "Batang", value:5},
]
const sto = [
  {label: "STO", value:0},
  {label: "Brebes", value:1},
  {label: "Bulakamba", value:2},
  {label: "Ketanggungan Timur", value:3},
  {label: "Tanjungtegal", value:4},
  {label: "Bumiayu", value:5},
  {label: "Tegal", value:6},
  {label: "Margadana", value:7},
  {label: "Slawi", value:8},
  {label: "Balapulang", value:9},
  {label: "Adiwerna", value:10},
  {label: "Pemalang", value:11},
  {label: "Comal", value:12},
  {label: "Randudongkal", value:13},
  {label: "Pekalongan", value:14},
  {label: "Kedungwuni", value:15},
  {label: "Kajen", value:16},
  {label: "Batang", value:17},
  {label: "Subah", value:18},
  {label: "Bandarsedayu", value:19},
]
function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    'aria-controls': `simple-tabpanel-${index}`,
  };
}
function ODC(props) {
  // if(typeof window !== 'undefined')
  // console.log("cookie",document.cookie.replace(/token=(\w+)/,))
  const {odc_list,
    otpVerificationSuccessfull,
    getFeederGraph,
    getDistributionGraph,
    feederGraph,
    feederGraphClient,
    distributionGraph,
    isUserVerifyLoading,
    distributionGraphClient,
    getRegionList,
    regionList,
    getWitelList,
    witelList,
    updateODCData,
    deleteODCData,
    setTableSort,
    setTablePage,
    getDatelList,
    datelList,
    odc_rowsPerPage,
    getSTOList,
    stoList,
    token,
    odc_list_client,
    deck_value,
    deck_value_client,
    getDashCard,
    odc_page,
    odc_sort
  }= props
  const { setTableRowsPerPage}:{setTableRowsPerPage: typeof IsetTableRowsPerPage} = props
  const {changeODCPage}:{changeODCPage: typeof IchangeODCPage} = props
  console.log("data",odc_list,isUserVerifyLoading)
  // const [open, setOpen] = React.useState(false);
  // const [openDeleteRowModal, setOpenDeleteRowModal] = React.useState(false);
  const [openDeleteRowModal, setOpenDeleteRowModal] = React.useState(odc_list.data.map(item=>({status:false})));


  const deleteRowHandleClose = useCallback((row)=>{
    setOpenDeleteRowModal(prev=>{
      prev[row].status = false;
      return {...prev}
    })
  },[setOpenDeleteRowModal])
  // const deleteRowHandleOpen = () => setOpenDeleteRowModal(true);
  // const deleteRowHandleClose = () => setOpenDeleteRowModal(false);
  const handleOnChange = (event,newValue,setValues) => {
    setValues(prev=>({...prev,tabs: newValue}));
    // handleChange(event,newValue)
  };
  const handleFilterOnChange = (ev,inputid,values,setValues) =>{
    let dmp = {region_id:values.region_id?.toString(),witel_id:values.witel_id?.toString(),datel_id:values.datel_id?.toString(),sto_id:values.sto_id?.toString()};
    [{region_id:['region_id',regionList.data]},{witel_id:['region_id',witelList.data]},{datel_id:['witel_id',datelList.data]},{sto_id:['datel_id',stoList.data]}].forEach(item=>{
      dmp[inputid] = ev.target.value;
      dmp.region_id = regionList.data.find(item=>item.id == dmp.region_id)?.id.toString();
      for (const key1 in item) {
        /**
         * mengubah nilai filter child yang memiliki id parent sesuai dengan opsi yang kita ubah
         */
        if (Object.hasOwnProperty.call(item, key1) && key1!=inputid && key1!='region_id') {
          /** 
           * get the first children for certain parent id on the array 
           * ambil data pertama subitem yang memiliki item id yang sesuai 
           * */
          dmp[key1] = item[key1][1].find(item2=>item2[item[key1][0]] == dmp[item[key1][0]])?.id;
        }
        else{
  
        }
      }
      // return key == inputid
    })
    // console.log("key2",dmp)
    switch (inputid) {
      case "region_id":
        //set witel options
        setWitelListClient(witelList.data.filter(item=>item.region_id.toString()==dmp.region_id))
      case "witel_id":
        //set datel options
        setDatelListClient(datelList.data.filter(item=>item.witel_id==dmp.witel_id))
      case "datel_id":
        //set sto options
        setSTOListClient(stoList.data.filter(item=>item.datel_id.toString()==dmp.datel_id))
      case "sto_id":
        // console.log("values", values)
        setValues(prev=>({...prev,sto_id:ev.target.value}))
        /**
         * set all values
         */
        if( inputid !=="sto_id")
          setValues(prev=>({...prev,...dmp}))
      break;
    
      default:
        break;
    }
  }
  const useStyles = makeStyles(theme => ({
    green: {
        backgroundColor:"#009873!important",
        color:"white!important",
        padding:"6px 16px",
        borderRadius:"1rem!important"
    },
    red: {
        backgroundColor:"#B10040!important",
        color:"white!important",
        width:"170px",
        borderRadius:"1rem!important"
    }
  }));
  const classes = useStyles();
  const regional=[
    {label: "Regional",value:0},
    {label: "4",value:1},
    {label: "2",value:2},
  ]
  const CustomButtonModal = styled(newButton)<ButtonProps>(({ theme, btntype }) => {
    // console.log("custom button modal", theme, etc)
    return {
    background: btntype == 'submit' ? theme.status.success:theme.status.primary,
    color:"white!important",
  }});
  const CustomInputLabel = styled(InputLabel)<InputLabelProps>(({ theme }) => ({
    '&.Mui-focused':{
      color: theme.status.primary,
  
    }
  }));
  const getMuiTheme = () =>
  customCreateTheme({
    status: {
      primary: "#B10040!important",
      warning: "#fb8c00!important",
      // success: "#43a047!important",
      success: "#009873!important",
      darkgray: "darkgray!important",
      info: "#1976d2!important"
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
            '[class*="MUIDataTable-responsiveBase"]':{
              padding: "0 2rem"
            },
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
            // backgroundImage:"linear-gradient(to right,rgba(178,98,98,0.3),rgb(255 228 228 / 30%))",
            backgroundImage:"linear-gradient(to right,rgb(237 167 88 / 30%),rgb(253 243 236 / 30%))",
          },
        }
      },
      MuiTableHead:{
        styleOverrides:{
          root:{
            "div:first-of-type":{
              display:"flex",
              justifyContent:"center",
            }
          }
        }
      },
      MuiTableCell:{
        styleOverrides:{
          root:{
            "span":{
              display:"flex",
              justifyContent:"center",
            }
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
          } as any,
          
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
  // console.log("rows perpage",odc_rowsPerPage)
  const [datatable, setDatatable] = React.useState([[]])
  let timeout = useRef(null);
    React.useEffect(()=>{
      let isTimeoutSubscribed = true;
          
            setTimeout(()=>{
              if (isTimeoutSubscribed) {
                // console.log("odc",document.querySelector('[itemref="odcDetailModal"]'))
                if(document.querySelector('[itemref="odcDetailModal"]'))
                (document.querySelector('[itemref="odcDetailModal"]') as HTMLElement).style.top = "50%";
                if(document.querySelector('[itemref="odcDeleteModal"]'))
                (document.querySelector('[itemref="odcDeleteModal"]') as HTMLElement).style.top = "50%";
              }
            },50)
        // console.log("odc",odc_edit_modal.current,document.querySelector('[itemref="testing"]'))
      setDatatable(odc_list.data.map((item,idx)=>([
        item.row_number,
        item.name,
        item.region,
        item.witel,
        item.datel,
        item.sto,
        item.kapasitas,
        item.port_feeder_terminasi,
        item.core_feeder_idle,
        item.core_feeder_used,
        item.core_feeder_broken,
        item.core_distribution_idle,
        item.core_distribution_used,
        item.core_distribution_broken,
        item.merek,
        item.deployment_date,
        item.rak_OA,
        item.panel,
        item.port,
        item.id,
        item.region_id,
        item.witel_id,
        item.datel_id,
        item.sto_id
      ])));
      return ()=>{
        isTimeoutSubscribed = false;
      }
    },[openDeleteRowModal,odc_list])
    useEffect(()=>{
      // console.log("odc list client use effect",odc_list_client.success,odc_list_client.data)
      if(odc_list_client?.success || false)
      setDatatable(odc_list_client.data.map((item,idx)=>([
        item.row_number,
        item.name,
        item.region,
        item.witel,
        item.datel,
        item.sto,
        item.kapasitas,
        item.port_feeder_terminasi,
        item.core_feeder_idle,
        item.core_feeder_used,
        item.core_feeder_broken,
        item.core_distribution_idle,
        item.core_distribution_used,
        item.core_distribution_broken,
        item.merek,
        item.deployment_date,
        item.rak_OA,
        item.panel,
        item.port,
        item.id,
        item.region_id,
        item.witel_id,
        item.datel_id,
        item.sto_id
      ])))
    },[odc_list_client])
    // },[rawData,open,value,openDeleteRowModal])
    const graph = {
      feeder:{
        series: [{
          name: 'Idle',
          data: feederGraphClient? feederGraphClient.group.iddle : feederGraph.group.iddle
        }, {
          name: 'Used',
          data: feederGraphClient? feederGraphClient.group.used : feederGraph.group.used
        }, {
          name: 'broken',
          data: feederGraphClient? feederGraphClient.group.broken : feederGraph.group.broken
        }],
        options: {
          chart: {
            type: 'bar',
            height: 350,
            stacked: true,
            toolbar: {
              show: true
            },
            zoom: {
              enabled: true
            }
          },
          responsive: [{
            breakpoint: 480,
            options: {
              legend: {
                position: 'bottom',
                offsetX: -10,
                offsetY: 0
              }
            }
          }],
          plotOptions: {
            bar: {
              horizontal: false,
              borderRadius: 10
            },
          },
          xaxis: {
            type: 'category',
            // categories: ['01/01/2011 GMT', '01/02/2011 GMT', '01/03/2011 GMT', '01/04/2011 GMT',
            //   '01/05/2011 GMT', '01/06/2011 GMT'
            // ],
            categories: feederGraphClient? feederGraphClient.xaxis : feederGraph.xaxis,
          },
          legend: {
            position: 'right',
            offsetY: 40
          },
          fill: {
            opacity: 1
          }
        },
      },
      distribution:{
        series: [{
          name: 'Idle',
          data: distributionGraphClient? distributionGraphClient.group.iddle : distributionGraph.group.iddle
        }, {
          name: 'Used',
          data: distributionGraphClient? distributionGraphClient.group.used : distributionGraph.group.used
        }, {
          name: 'broken',
          data: distributionGraphClient? distributionGraphClient.group.broken : distributionGraph.group.broken
        }],
        options: {
          chart: {
            type: 'bar',
            height: 350,
            stacked: true,
            toolbar: {
              show: true
            },
            zoom: {
              enabled: true
            }
          },
          responsive: [{
            breakpoint: 480,
            options: {
              legend: {
                position: 'bottom',
                offsetX: -10,
                offsetY: 0
              }
            }
          }],
          plotOptions: {
            bar: {
              horizontal: false,
              borderRadius: 10
            },
          },
          xaxis: {
            type: 'category',
            // categories: ['01/01/2011 GMT', '01/02/2011 GMT', '01/03/2011 GMT', '01/04/2011 GMT',
            //   '01/05/2011 GMT', '01/06/2011 GMT'
            // ],
            categories: distributionGraphClient? distributionGraphClient.xaxis : distributionGraph.xaxis,
          },
          legend: {
            position: 'right',
            offsetY: 40
          },
          fill: {
            opacity: 1
          }
        },
      }
    }
    const getCookie = (cname)=> {
      let name = cname + "=";
      let decodedCookie = decodeURIComponent(document.cookie);
      let ca = decodedCookie.split(';');
      for(let i = 0; i < ca.length; i++) {
        let c = ca[i];
        while (c.charAt(0) == ' ') {
          c = c.substring(1);
        }
        if (c.indexOf(name) == 0) {
          return c.substring(name.length, c.length);
        }
      }
      return "";
    }
    const [newTableState,setNewTableState] = useState({page:0,rowsPerPage:5,search_text:null,sort:{orderBy:null,direction:null}})
    const [regionListClient,setRegionListClient] = useState("");
    const [submittedFilter,setSubmittedFilter] = useState({ regional: '', witel: '', datel: '', sto: ''});
    const [witelListClient,setWitelListClient] = useState<Array<{id:number,region_id: number,name:string}>>();
    const [datelListClient,setDatelListClient] = useState<Array<{id:number,region_id: number,witel_id: number,name:string}>>();
    const [stoListClient,setSTOListClient] = useState<Array<{id:number,region_id: number,witel_id: number,datel_id: number, name:string}>>();
    const [feederChartName, setFeederChartName] = useState({regional:"",witel:"",datel:"",sto:"null"});
    const [singleConfirmDeletePopup, setSingleConfirmDeletePopup] = useState(false)
    const singleConfirmDeletePopupOpen = (selectedConfirmDeleteValue) => {
      console.log("selectedConfirmDeleteValue",selectedConfirmDeleteValue)
      setSelectedConfirmDeletePopup(selectedConfirmDeleteValue);
      setSingleConfirmDeletePopup(true);
    }
    const singleConfirmDeletePopupClose = () =>{
      setSingleConfirmDeletePopup(false);
    }
    const [selectedConfirmDeletePopup,setSelectedConfirmDeletePopup] = useState({odc_id:"",name:"",rowsPerPage:0});
    const [singleModalPopup,setSingleModalPopup] = useState(false);
    const singleModalPopupOpen = (selectedModalId) => {
      console.log("selectedModalValue",selectedModalId)
      setWitelListClient(witelList.data.filter(item=>item.region_id==selectedModalId.region_id))
      setDatelListClient(datelList.data.filter(item=>item.region_id==selectedModalId.region_id).filter(item=>item.witel_id==selectedModalId.witel_id))
      setSTOListClient(stoList.data.filter(item=>item.region_id==selectedModalId.region_id).filter(item=>item.witel_id==selectedModalId.witel_id).filter(item=>item.datel_id==selectedModalId.datel_id))
      setSelectedModalValue(selectedModalId)
      setSingleModalPopup(true);
    }
    const [selectedModalValue,setSelectedModalValue] = useState({odc_id:"",name:"",region_id:"",witel_id:"",datel_id:"",sto_id:"",deployment_date:"",rak_oa:"",panel:"",port:"",rowsPerPage:0});
    const singleModalPopupClose = () => {
      setSingleModalPopup(false)
    };
    const delay = useRef(null);
    // console.log("selectedModalValue",selectedModalValue)
    const feederChartRef = useRef(null);
    const distribusiChartRef = useRef(null);
    useEffect(()=>{
      console.log(feederChartName)
      console.log("filter change",Object.entries(feederChartName).map(([key,value])=>{
        if(key == "regional" && value!="0")
        return key+" "+regionList?.data.filter(item=>item.id.toString() == value)[0]?.name || ""
        if(key == "witel" && value!="0")
        return key+" "+witelList?.data.filter(item=>item.id.toString() == value)[0]?.name || ""
        if(key == "datel" && value!="0")
        return key+" "+datelList?.data.filter(item=>item.id.toString() == value)[0]?.name || ""
      }))
    },[feederChartName,datelList,regionList,witelList])
    const customHandleChange = (inputid,value,values,setValues) =>{
      // console.log(inputid,value)
      let dmp = {regional:values.regional?.toString(),witel:values.witel?.toString(),datel:values.datel?.toString(),sto:values.sto?.toString()};
      let newsto =[];
      let newdatel =[];
      let newwitel =[];
      switch(inputid){
            case 'regional':
              dmp.regional = value;
              if(dmp.regional==0){
                newwitel = witelList?.data
                setWitelListClient(newwitel);
                newdatel = datelList?.data
                setDatelListClient(newdatel)
                newsto = stoList?.data
                setSTOListClient(newsto)
                
              }
              else{
                newwitel = witelList?.data?.filter(item=>item.region_id.toString() == value)
                setWitelListClient(newwitel);
                newdatel = datelList?.data?.filter(item=>item.region_id.toString() === value)
                setDatelListClient(newdatel)
                newsto = stoList?.data?.filter(item=>item.region_id.toString() === value)
                setSTOListClient(newsto)
              }
              dmp.witel = 0;
                dmp.datel = 0;
                dmp.sto = 0;
              setValues(prev=>({...prev,...dmp}))
            break;
            case 'witel':
              dmp.witel = value;
              if(values.regional==0){
                setRegionListClient(regionList?.data?.filter(item=>item.id==datelList?.data?.find(item=>item.id==value).region_id));
                dmp.regional = regionList?.data?.find(item=>item.id==witelList?.data?.find(item=>item.id==value)?.region_id).id || '0';
              }
              else if(dmp.witel==0){
                setWitelListClient(witelList?.data?.filter(item=>(item.region_id.toString() == dmp.regional)))
                newdatel = datelList?.data?.filter(item=>item.region_id.toString() === dmp.regional)
                setDatelListClient(newdatel)
                newsto = stoList?.data?.filter(item=>item.region_id.toString() === dmp.regional)
                setSTOListClient(newsto)
                dmp.datel = 0;
                dmp.sto = 0;
              }
              else{
                setWitelListClient(witelList?.data?.filter(item=>(item.region_id.toString() == dmp.regional)))
                newdatel = datelList?.data?.filter(item=>(dmp.witel == "0") ? item.witel_id.toString() !== dmp.witel:item.witel_id.toString() === dmp.witel)
                setDatelListClient(newdatel)
                newsto = stoList?.data?.filter(item=>item.witel_id.toString() === dmp.witel)
                setSTOListClient(newsto)
              }
              setValues(prev=>({...prev,...dmp}))
            break;
            case 'datel':
              dmp.datel = value;
              if(values.regional==0){
                setRegionListClient(regionList?.data?.filter(item=>item.id==datelList?.data?.find(item=>item.id==value).region_id));
                dmp.regional = regionList?.data?.find(item=>item.id==datelList?.data?.find(item=>item.id==value)?.region_id).id || '0';
              }
              if(values.witel==0){

                newwitel = witelList?.data?.filter(item=>item.region_id==datelList?.data?.find(item=>item.id==value).region_id)
                setWitelListClient(newwitel);
                dmp.witel = witelList?.data?.find(item=>item.id==datelList?.data?.find(item=>item.id==value)?.witel_id).id || '0';
                newdatel = datelList?.data?.filter(item=>item.witel_id==dmp.witel)
                setDatelListClient(newdatel)
                newsto = stoList?.data?.filter(item=>item.datel_id.toString() === dmp.datel)
                setSTOListClient(newsto)
                dmp.sto = 0
              }
              else if(dmp.datel==0){
                  newsto = stoList?.data?.filter(item=>item.witel_id.toString() === dmp.witel)
                  setSTOListClient(newsto)
                  setDatelListClient(datelList?.data?.filter(item=>item.witel_id==dmp.witel))
                
                dmp.sto = 0;
              }
              else{

                setDatelListClient(datelList?.data?.filter(item=>item.witel_id==dmp.witel))
                newsto = stoList?.data?.filter(item=>item.datel_id.toString() === dmp.datel)
                setSTOListClient(newsto)
              }
             
              
              setValues(prev=>({...prev,...dmp}))

            break;
            case 'sto':
              dmp.sto = value;
              if(values.regional==0){
                setRegionListClient(regionList?.data?.filter(item=>item.id==stoList?.data?.find(item=>item.id==value).region_id));
                dmp.regional = regionList?.data?.find(item=>item.id==stoList?.data?.find(item=>item.id==value)?.region_id).id || '0';
              }
              if(values.witel==0){
                setWitelListClient(witelList?.data?.filter(item=>item.id==stoList?.data?.find(item=>item.id==value).witel_id));
                dmp.witel = witelList?.data?.find(item=>item.id==stoList?.data?.find(item=>item.id==value)?.witel_id).id || '0';
                // dmp.witel =
                // console.log("values witel",value,values,witelList?.data?.find(item=>item.id==datelList?.data?.find(item=>item.id==value)?.witel_id).id)
              }
              if(values.datel==0){
                setDatelListClient(datelList?.data?.filter(item=>item.id==stoList?.data?.find(item=>item.id==value).datel_id));
                dmp.datel = datelList?.data?.find(item=>item.id==stoList?.data?.find(item=>item.id==value)?.datel_id).id || '0';
                console.log("values witel",value,values,datelList?.data?.find(item=>item.id==stoList?.data?.find(item=>item.id==value)?.datel_id).id)
              }
              setSTOListClient(stoList?.data?.filter(item=>item.datel_id==dmp.datel))
              setValues(prev=>({...prev,...dmp}))
            break;
            default:
              console.log("ga masuk")
            break;
          }
    }
    /** get dashboard deck card */
  return (<div className={styles.mainContent}>
          <SimpleBar autoHide={true}>
          <div className={styles.cardWrapper}>
            <Card title='Total ODC' value={deck_value_client?.total_odc || deck_value?.total_odc} unit='unit' primaryFill={"#FF72BE"} secondaryFill={'#006ED3'}/>
            <Card title='Core Feeder Idle' value={deck_value_client?.total_feeder_idle || deck_value?.total_feeder_idle} unit='ports' primaryFill={"#6FB400"} secondaryFill={'#006ED3'}/>
            <Card title='Core Feeder Used' value={deck_value_client?.total_feeder_used || deck_value?.total_feeder_used} unit='ports' primaryFill={"#00C092"} secondaryFill={'#006ED3'}/>
            <Card title='Core Feeder Broken' value={deck_value_client?.total_feeder_broken || deck_value?.total_feeder_broken} unit='ports' primaryFill={"#ABD601"} secondaryFill={'#006ED3'}/>
            <Card title='Core Distribusi Idle' value={deck_value_client?.total_distribution_idle || deck_value?.total_distribution_idle} unit='ports' primaryFill={"#36DBFF"} secondaryFill={'#006ED3'}/>
            <Card title='Core Distribusi Used' value={deck_value_client?.total_distribution_used || deck_value?.total_distribution_used} unit='ports' primaryFill={"#00BBE4"} secondaryFill={'#006ED3'}/>
            <Card title='Core Distribusi Broken' value={deck_value_client?.total_distribution_broken || deck_value?.total_distribution_broken} unit='ports' primaryFill={"#51C0FF"} secondaryFill={'#006ED3'}/>
          </div>
          </SimpleBar>
          <p className={styles.last_update}>Last Update : {deck_value?.last_update}</p>

          <Formik 
          initialValues={{ regional: "0", witel: "0", datel: "0", sto: "0"}}
          validate={(values)=>{
            // Object.entries(values).forEach(([key,value])=>{
            //   console.log("values",key,value);
            //   switch(key){
            //     case 'regional':

            //     break;
            //     case 'witel':

            //     break;
            //     case 'datel':
            //       if(values.witel=='0'){
            //         setWitelListClient(witelList?.data?.filter(item=>item.id==datelList?.data?.find(item=>item.id==value).witel_id));
            //         values.datel = datelList?.data?.find(item=>item.id==value).witel_id;
            //       }
            //       console.log("selected datel",datelList?.data?.find(item=>item.id==value),witelList?.data?.filter(item=>item.id==datelList?.data?.find(item=>item.id==value).witel_id))

            //     break;
            //     case 'sto':

            //     break;
            //     default:
            //       console.log("ga masuk")
            //     break;
            //   }

            // })
            setFeederChartName(values)
            // setWitelListClient(witelList?.data?.filter(item=>(values.regional == "0") ? item.region_id.toString() !== values.regional:item.region_id.toString() === values.regional))
            // setDatelListClient(datelList?.data?.filter(item=>(values.regional == "0") ? item.region_id.toString() !== values.regional:item.region_id.toString() === values.regional)
            // .filter(item=>(values.witel == "0") ? item.witel_id.toString() !== values.witel:item.witel_id.toString() === values.witel))
            // setSTOListClient(stoList?.data?.filter(item=>(values.regional == "0") ? item.region_id.toString() !== values.regional:item.region_id.toString() === values.regional)
            // .filter(item=>(values.witel == "0") ? item.witel_id.toString() !== values.witel:item.witel_id.toString() === values.witel)
            // .filter(item=>(values.datel == "0") ? item.datel_id.toString() !== values.datel:item.datel_id.toString() === values.datel))

            // return values
          }}
          validateOnChange={true}
          onSubmit={(values)=>{
            // console.log("cookie",document.cookie.split(" "))
            
            getFeederGraph(values || { regional: '', witel: '', datel: '', sto: ''},token);
            getDistributionGraph(values || { regional: '', witel: '', datel: '', sto: ''},token);
            changeODCPage({page:1,rowsPerPage:newTableState.rowsPerPage, region:values.regional,witel:values.witel,datel:values.datel,sto:values.sto,sortBy:null,sortOrder:null,name:null},token,toast)
            // changeODCPage({page:1,rowsPerPage:odc_rowsPerPage, region:values.regional,witel:values.witel,datel:values.datel,sto:values.sto,sortBy:null,sortOrder:null,name:null},token,toast)
            getDashCard({region:values.regional,witel:values.witel,datel:values.datel,sto:values.sto},token,toast)
            setSubmittedFilter(values || { regional: '', witel: '', datel: '', sto: ''});


            feederChartRef.current.innerHTML = "Feeder Mapping - "+ Object.entries(feederChartName).map(([key,value])=>{
              if(key == "regional" && value!="0")
              return key+" "+regionList?.data.filter(item=>item.id.toString() == value)[0]?.name || ""
              if(key == "witel" && value!="0")
              return key+" "+witelList?.data.filter(item=>item.id.toString() == value)[0]?.name || ""
              if(key == "datel" && value!="0")
              return key+" "+datelList?.data.filter(item=>item.id.toString() == value)[0]?.name || ""
            }).filter(x=>x!==undefined).join(" - ");
            distribusiChartRef.current.innerHTML = "Distribution Mapping - "+ Object.entries(feederChartName).map(([key,value])=>{
              if(key == "regional" && value!="0")
              return key+" "+regionList?.data.filter(item=>item.id.toString() == value)[0]?.name || ""
              if(key == "witel" && value!="0")
              return key+" "+witelList?.data.filter(item=>item.id.toString() == value)[0]?.name || ""
              if(key == "datel" && value!="0")
              return key+" "+datelList?.data.filter(item=>item.id.toString() == value)[0]?.name || ""
            }).filter(x=>x!==undefined).join(" - ");
          }}
          >
          {({
            values,
            errors,
            touched,
            setValues,
            handleChange,
            handleBlur,
            handleSubmit,
            isSubmitting,
            /* and other goodies */
          }) => (<form onSubmit={handleSubmit}>
                  <div className={styles.toolbar}>
                    <CustomSelect 
                      defaultValue={values.regional} 
                      onChange={(ev)=>customHandleChange('regional',ev.target.value,values,setValues)}
                      onBlur={handleBlur}
                      data={[...[{label:"Regional",value:0}],...regionList?.data?.map(item=>({label:item.name,value:item.id}))] || []} 
                      name='regional'
                      />
                    <CustomSelect 
                      defaultValue={values.witel} 
                      onChange={(ev)=>customHandleChange('witel',ev.target.value,values,setValues)}
                      onBlur={handleBlur}
                      data={[{label:"Witel",value:0}].concat((witelListClient )?witelListClient?.map(item=>({label:item.name,value:item.id})):witelList?.data?.map(item=>({label:item.name,value:item.id}))) || []} 
                      name='witel'
                      />
                    <CustomSelect 
                      defaultValue={values.datel} 
                      onChange={(ev)=>customHandleChange('datel',ev.target.value,values,setValues)}
                      // onChange={handleChange}
                      onBlur={handleBlur}
                      data={[{label:"Datel",value:0}].concat((datelListClient)?datelListClient?.map(item=>({label:item.name,value:item.id})):datelList?.data?.map(item=>({label:item.name,value:item.id}))) || []} 
                      name='datel'
                      />
                    <CustomSelect 
                      defaultValue={values.sto} 
                      onChange={(ev)=>customHandleChange('sto',ev.target.value,values,setValues)}
                      onBlur={handleBlur}
                      data={[{label:"STO",value:0}].concat((stoListClient)?stoListClient?.map(item=>({label:item.name,value:item.id})):stoList?.data?.map(item=>({label:item.name,value:item.id}))) || []} 
                      name='sto'
                    />
                    <CustomButton btntype={"green"} type="submit">Submit</CustomButton>
                    {/* <CustomButton className={classes.green} type="submit" disabled={isSubmitting}>Submit</CustomButton> */}
                </div>
                  </form>
                )}
          </Formik>

        <div className={styles.charts}>
          <div>
            <h4 ref={feederChartRef} style={{textTransform:"capitalize",width:"600px"}}>{`Feeder Mapping `}</h4>
        {((graph.feeder?.series[0]?.data || false) ||  (graph.feeder?.series[0]?.data?.length === 0)) ? <ApexChart
options={graph.feeder.options} series={graph.feeder.series} type="bar" width={600} height={350}
            />: <h2>No Data</h2>}
          </div>
          <div>
            <h4  ref={distribusiChartRef} style={{textTransform:"capitalize",width:"600px"}}>Distribution Mapping</h4>
            {((graph.distribution?.series[0]?.data || false) ||  (graph.distribution?.series[0]?.data?.length === 0)) ? <ApexChart
options={graph.distribution.options} series={graph.distribution.series} type="bar" width={600} height={350}
            />: <h2>No Data</h2>}
          </div>
        </div>
        {/* <MuiThemeProvider theme={getMuiTheme()}> */}
        <div className={styles.table}>
            <ThemeProvider theme={getMuiTheme()}>
            {datatable ? <DynamicMUIDataTable 
              // title={"Employee List"}
              // options={options}
              options={{
                selectableRows:"none",
                print: false,
                // filter: false,
                serverSide:true,
                searchText:newTableState.search_text,
                count: odc_list_client?.count || odc_list?.count,
                page:newTableState.page,
                rowsPerPage: newTableState.rowsPerPage || 5,
                // rowsPerPage: odc_rowsPerPage || 5,
                rowsPerPageOptions:[5,10,25,50,100],
                onTableInit:(test,tableState) =>{
                  // console.log("table init",tableState.rowsPerPage)
                  setTableRowsPerPage(tableState.rowsPerPage)
                  changeODCPage({page:tableState.page+1,rowsPerPage:tableState.rowsPerPage, region:submittedFilter.regional,witel:submittedFilter.witel,datel:submittedFilter.datel,sto:submittedFilter.sto,sortBy:null,sortOrder:null,name:null},token,toast)
                },
                onTableChange: (action, tableState) => {
                  // console.log(action, tableState);
          
                  // a developer could react to change on an action basis or
                  // examine the state as a whole and do whatever they want
                  switch (action) {
                    case 'changeRowsPerPage':
                      // console.log("change rows per page",tableState.rowsPerPage)
                      setTableRowsPerPage(tableState.rowsPerPage)
                      setNewTableState(prev=>({...prev,rowsPerPage:tableState.rowsPerPage}))
                      // setTableRowsPerPage(tableState.rowsPerPage);
                      changeODCPage({page:newTableState.page+1,rowsPerPage:tableState.rowsPerPage, region:submittedFilter.regional,witel:submittedFilter.witel,datel:submittedFilter.datel,sto:submittedFilter.sto,sortBy:newTableState.sort.orderBy,sortOrder:newTableState.sort.direction,name:newTableState.search_text},token,toast)
                    break;
                    case 'changePage':
                      // console.log("on page",newTableState.sort)
                      setNewTableState(prev=>({...prev,page:tableState.page}))
                      // setTablePage(tableState.page);
                      // console.log("change page",tableState.sortOrder)
                      //changeODCPage(limit,offset,region,witel,datel,sto,sortby,direction,token,toast)
                      changeODCPage({page:tableState.page+1,rowsPerPage:newTableState.rowsPerPage, region:submittedFilter.regional,witel:submittedFilter.witel,datel:submittedFilter.datel,sto:submittedFilter.sto,sortBy:newTableState.sort.orderBy,sortOrder:newTableState.sort.direction,name:newTableState.search_text},token,toast)
                      // this.changePage(tableState.page, tableState.sortOrder);
                      break;
                    case "search":
                      console.log("activate search",tableState.searchText)
                      setNewTableState(prev=>({...prev,page:0,search_text:tableState.searchText}))
                      clearTimeout(delay.current);
                      delay.current = setTimeout(()=>{
                        changeODCPage({page:0,rowsPerPage:newTableState.rowsPerPage, region:submittedFilter.regional,witel:submittedFilter.witel,datel:submittedFilter.datel,sto:submittedFilter.sto,sortBy:newTableState.sort.orderBy,sortOrder:newTableState.sort.direction,name:tableState.searchText},token,toast)
                      },500)
                      // setSearch_text(tableState.searchText)
                    break;
                    case 'sort':
                      
                      // console.log("sort",tableState.sortOrder)
                      let sortConvention = "";
                      // console.log("odc name sort",tableState.sortOrder.name.toLocaleLowerCase())
                      switch (tableState.sortOrder.name.toLocaleLowerCase()) {
                        case "no":
                          // console.log("odc name")
                          sortConvention = "row_number"
                          break;
                        case "odc name":
                          // console.log("odc name")
                          sortConvention = "odc.name"
                          break;
                        case "regional":
                          // console.log("odc name")
                          sortConvention = "region.name"
                          break;
                        case "witel":
                          // console.log("odc name")
                          sortConvention = "witel.name"
                          break;
                        case "datel":
                          // console.log("odc name")
                          sortConvention = "datel.name"
                          break;
                        case "sto":
                          // console.log("odc name")
                          sortConvention = "sto.name"
                          break;
                        case "port feeder terminasi":
                          // console.log("odc name")
                          sortConvention = "port_feeder_terminasi"
                          break;
                      
                        default:
                          break;
                      }
                      // console.log("on sort",newTableState.page)
                      setNewTableState(prev=>({...prev,page:0,sort:{orderBy:sortConvention,direction:tableState.sortOrder.direction.toLocaleUpperCase()}}))
                      // setTableSort({sortBy:sortConvention,sortOrder:tableState.sortOrder.direction.toLocaleUpperCase()})
                      changeODCPage({page:0,rowsPerPage:newTableState.rowsPerPage, region:submittedFilter.regional,witel:submittedFilter.witel,datel:submittedFilter.datel,sto:submittedFilter.sto,sortBy:sortConvention,sortOrder:tableState.sortOrder.direction.toLocaleUpperCase(),name:newTableState.search_text},token,toast)
                      // this.sort(tableState.page, tableState.sortOrder);
                      break;
                    default:
                      console.log('action not handled.');
                  }
                },
              }}
              checkboxSelection={false} 
              data={datatable}
              columns={[{
                name: "No",
                options:{
                  customBodyRender:(value, tableMeta, update) => {
                  //   console.log("row render",tableMeta)
                  let newNumber = tableMeta.rowData[0]
                  // let newNumber = tableMeta.rowData[0]+odc_page*odc_rowsPerPage
                  return ( <span>{newNumber}</span> )
                  // },
            //       filterOptions: {
            //         display: (filterList, onChange, index, column) =>   <FormControl variant='standard'>
            //           {console.log("column",column,filterList)}
            //         <InputLabel htmlFor="select-multiple-chip">No</InputLabel>
            //             <Select
            //                 // className ={class1.A}
            //                 multiple
            //                 value={filterList[index]}
            //                 renderValue={(selected) => selected.join(", ")}
            //                 onChange={(event) => {
            //                 filterList[index] = event.target.value;
            //                 onChange(filterList[index], index, column);
            //             }}
            //             >                                                     
            //               <MenuItem key={index} selected={true} value={"All"}  >
            //                    {"All"}
            //                </MenuItem>
            //             {[1,2,3,4,5,6,7,8,9,10,11,12,13].map((name, name2) =>(
            //                 <MenuItem key={index} value={name} >
            //                    {name2}
            //                </MenuItem>
            //            ))}
            //       </Select>
            //  </FormControl>,
            //       },
            //       filterType:"custom",
//                   filterOptions:{
//                     display: (filterList, onChange, index, column) => {
//       return (
//         index
//  )
//                 }
                  }
                }
              },{
                name: "ODC Name",
                options:{
                  customBodyRender:(value, tableMeta, update) => {
                    let newValue = tableMeta.rowData[1]
                    return ( <span style={{whiteSpace:"nowrap",textTransform: 'uppercase'}}>{newValue}</span>)
                  },
                  filter:false
                }
              },{
                name: "Regional",
                options:{
                  customBodyRender:(value, tableMeta, update) => {
                    let newValue = tableMeta.rowData[2]
                    return ( <span>{newValue}</span> )
                  },
                  filter:false
                }
              },{
                name: "WITEL",
                options:{
                  customBodyRender:(value, tableMeta, update) => {
                    let newValue = tableMeta.rowData[3]
                    return ( <span>{newValue}</span> )
                  },
                  filter:false
                }
              },{
                name: "DATEL",
                options:{
                  customBodyRender:(value, tableMeta, update) => {
                    let newValue = tableMeta.rowData[4]
                    return ( <span>{newValue}</span> )
                  },
                  filter:false
                }
              },{
                name: "STO",
                options:{
                  customBodyRender:(value, tableMeta, update) => {
                    let newValue = tableMeta.rowData[5]
                    return ( <span>{newValue}</span> )
                  },
                  filter:false
                }
              },{

                name: "Kapasitas",
                options:{
                  customBodyRender:(value, tableMeta, update) => {
                    let newValue = tableMeta.rowData[6]
                    return ( <span>{newValue}</span> )
                  }
                }
              },{
                name: "Port Feeder Terminasi",
                options:{
                  customBodyRender:(value, tableMeta, update) => {
                    let newValue = tableMeta.rowData[7]
                    return ( <span>{newValue}</span> )
                  },
                }
              },{
                name: "Core Feeder Idle",
                options:{
                  sort:false,
                  customBodyRender:(value, tableMeta, update) => {
                    let newValue = tableMeta.rowData[8]
                    return ( <span>{newValue}</span> )
                  },
                  filter:false
                }
              },{
                name: "Core Feeder Used",
                options:{
                  sort:false,
                  customBodyRender:(value, tableMeta, update) => {
                    let newValue = tableMeta.rowData[9]
                    return ( <span>{newValue}</span> )
                  },
                  filter:false
                }
              },{
                name: "Core Feeder Broken",
                options:{
                  sort:false,
                  customBodyRender:(value, tableMeta, update) => {
                    let newValue = tableMeta.rowData[10]
                    return ( <span>{newValue}</span> )
                  },
                  filter:false
                }
              },{
                name: "Core Distribusi Idle",
                options:{
                  sort:false,
                  customBodyRender:(value, tableMeta, update) => {
                    let newValue = tableMeta.rowData[11]
                    return ( <span>{newValue}</span> )
                  },
                  filter:false
                }
              },{
                name: "Core Distribusi Used",
                options:{
                  sort:false,
                  customBodyRender:(value, tableMeta, update) => {
                    let newValue = tableMeta.rowData[12]
                    return ( <span>{newValue}</span> )
                  },
                  filter:false
                }
              },{
                name: "Core Distribusi Broken",
                options:{
                  sort:false,
                  customBodyRender:(value, tableMeta, update) => {
                    let newValue = tableMeta.rowData[13]
                    return ( <span>{newValue}</span> )
                  },
                  filter:false
                }
              },{
                name: "deployment_date",
                
                options:{
                  customBodyRender:(value, tableMeta, update) => {
                    let newValue = tableMeta.rowData[15]
                    return ( <span>{newValue}</span> )
                  },
                  filter:false,
                  display:false,
                }
              },{
                name: "rak_OA",
                options:{
                  customBodyRender:(value, tableMeta, update) => {
                    let newValue = tableMeta.rowData[16]
                    return ( <span>{newValue}</span> )
                  },
                  filter:false,
                  display:false,
                }
              },{
                name: "panel",
                options:{
                  customBodyRender:(value, tableMeta, update) => {
                    let newValue = tableMeta.rowData[17]
                    return ( <span>{newValue}</span> )
                  },
                  filter:false,
                  display:false,
                }
              },{
                name: "port",
                options:{
                  customBodyRender:(value, tableMeta, update) => {
                    let newValue = tableMeta.rowData[18]
                    return ( <span>{newValue}</span> )
                  },
                  filter:false,
                  display:false,
                }
              },{
                name: "odc_id",
                options:{
                  customBodyRender:(value, tableMeta, update) => {
                    let newValue = tableMeta.rowData[19]
                    return ( <span>{newValue}</span> )
                  },
                  
                  filter:false,
                  display:'excluded',
                }
              },{
                name: "region_id",
                options:{
                  customBodyRender:(value, tableMeta, update) => {
                    // console.log("region_id",tableMeta)
                    let newValue = tableMeta.rowData[20]
                    return ( <span>{newValue}</span> )
                  },
                  filter:false,
                  display:'excluded',
                }
              },{
                name: "witel_id",
                options:{
                  customBodyRender:(value, tableMeta, update) => {
                    // console.log("witel_id",tableMeta.rowData[21])
                    let newValue = tableMeta.rowData[21]
                    return ( <span>{newValue}</span> )
                  },
                  filter:false,
                  display:'excluded',
                }
              },{
                name: "datel_id",
                options:{
                  customBodyRender:(value, tableMeta, update) => {
                    // console.log("datel_id",tableMeta.rowData[22])
                    let newValue = tableMeta.rowData[22]
                    return ( <span>{newValue}</span> )
                  },
                  filter:false,
                  display:'excluded',
                }
              },{
                name: "sto_id",
                options:{
                  customBodyRender:(value, tableMeta, update) => {
                    // console.log("sto_id",tableMeta.rowData[23])
                    let newValue = tableMeta.rowData[23]
                    return ( <span>{newValue}</span> )
                  },
                  filter:false,
                  display:'excluded',
                }
              },{
                name: "Aksi",
                options:{
                  sort:false,
                  customBodyRender:(value, tableMeta, update) => {
                    // console.log("custom aksi ",tableMeta)
                    let newValue = tableMeta.rowData[14]
                    return (         <div key={0} className={styles.tableAction}>
                      <Link href={`/odc/${tableMeta.rowData[19]}`} passHref>
                      <a>
                    <CustomButton>
                        <MdOpenInBrowser fill='#009873' />
                    </CustomButton>
                      </a>
                      </Link>
                    <CustomButton onClick={()=>singleModalPopupOpen(
                      {
                        odc_id:tableMeta.rowData[19],
                        name:  tableMeta.rowData[1],
                        region_id: tableMeta.rowData[20],
                        witel_id: tableMeta.rowData[21],
                        datel_id: tableMeta.rowData[22],
                        sto_id: tableMeta.rowData[23],
                        deployment_date: tableMeta.rowData[15],
                        rak_oa: tableMeta.rowData[16],
                        panel: tableMeta.rowData[17],
                        port: tableMeta.rowData[18],
                        rowsPerPage: tableMeta.tableState.rowsPerPage
                        // region_id: 
                      }
                      )} variant='text'>
                    {/* <CustomButton onClick={()=>handleOpen(tableMeta.rowData[0]-1)} variant='text'> */}
                      <MdRemoveRedEye fill='#3124c1'/>
                    </CustomButton>
                    <CustomButton onClick={()=>singleConfirmDeletePopupOpen({
                      odc_id:tableMeta.rowData[19],
                      name:  tableMeta.rowData[1],
                      rowsPerPage: tableMeta.tableState.rowsPerPage
                    })} variant='text'>
                    {/* <CustomButton onClick={()=>deleteRowHandleOpen(tableMeta.rowData[0]-1)} variant='text'> */}
                      <MdDeleteForever fill='#B10040'/>
                    </CustomButton>
                    {/* <CustomButton onClick={()=>deleteRow(item.id)} variant='text'>
                      <MdDeleteForever />
                    </CustomButton> */}

                  </div> )
                  },
                  filter:false
                }
              }]}
              />:null}
              
            </ThemeProvider>
        </div>
        <Modal open={singleModalPopup} onClose={()=>singleModalPopupClose()} aria-labelledby="modal-modal-title"
                            aria-describedby="modal-modal-description">
                      <div>
                        <div className={styles.closebtn}>
                          <MdOutlineClose/>
                        </div>
                        <Box itemRef='odcDetailModal' sx={{
                          position: "absolute",
                          top: "48%",
                          left: "50%",
                          transition: 'all 0.3s ease-out',
                          transform: "translate(-50%, -50%)",
                          border: 0,
                          /* margin-bottom: 30px;
                          margin-top: 30px; */
                          borderRadius: "6px",
                          color: "#333",
                          // background: "#fff",
                          width:"90%",
                          maxWidth: "600px",
                          // boxShadow: "0 2px 2px 0 rgb(0 0 0 / 14%), 0 3px 1px -2px rgb(0 0 0 / 20%), 0 1px 5px 0 rgb(0 0 0 / 12%)",
                          boxShadow: "0 1px 4px 0 rgb(0 0 0 / 14%)",
                        } as any}>
                            {/* <Box sx={styles.card}> */}
                          <div className={`${styles.card}  ${styles.cardStats}`}>
                            <div className={`${styles.cardHeader} ${styles.cardHeaderPrimary}`}>
                              <h4 className={styles.cardTitle}>{selectedModalValue.name.toUpperCase()}</h4>
                              <div className={styles.stats}>
                                {/* <MdOutlineDateRange width={16} height={"auto"} />  */}
                                lengkapi semua isian yang ada
                              </div>
                            </div>
                              <Formik
                              initialValues={{
                                tabs:0,
                                notes:"",
                                odcId: selectedModalValue.odc_id,
                                nama_odc: selectedModalValue.name.toLocaleUpperCase(),
                                region_id: selectedModalValue.region_id,
                                witel_id: selectedModalValue.witel_id,
                                datel_id: selectedModalValue.datel_id,
                                sto_id: selectedModalValue.sto_id,
                                deployment_date: selectedModalValue.deployment_date,
                                rak_oa: selectedModalValue.rak_oa,
                                panel: selectedModalValue.panel,
                                port: selectedModalValue.port,
                                page: newTableState.page,
                                sort: newTableState.sort,
                                rowsPerPage: newTableState.rowsPerPage
                              }}
                              validateOnChange={true}
                                validate={(value)=>{
                                  // console.log("new value",value.tabs)
                                }}
                                onSubmit={(values,{setSubmitting})=>{
                                  console.log(values)
                                  // console.log(updateODCData)
                                  updateODCData(values.nama_odc,
                                    values.deployment_date,
                                    values.notes,
                                    values.panel,
                                    values.rak_oa,
                                    values.port,
                                    values.nama_odc,
                                    values.region_id,
                                    values.witel_id,
                                    values.datel_id,
                                    values.sto_id
                                    ,values.odcId,token,setSubmitting,singleModalPopupClose,toast,values.page+1,values.rowsPerPage,values.sort)
                                }}
                              >
                                {({
                                  values,
                                  setValues,
                                  handleSubmit,
                                  handleChange,
                                  handleBlur
                                })=>(
                                <form className={styles.form} onSubmit={handleSubmit} >
                                  <div className={`${styles.cardBody} card-body row`}>
                                  <div className={styles.tabLink}>
                                    <CustomTabs value={values.tabs} onChange={(ev,newValue)=>handleOnChange(ev,newValue,setValues)} onBlur={handleBlur} aria-label="basic tabs example">
                                      <CustomTab label="ODC" {...a11yProps(0)} />
                                      <CustomTab label="OA" {...a11yProps(1)} />
                                    </CustomTabs>
                                  </div>
                                  <div
                                    role="tabpanel"
                                    hidden={values.tabs !== 0}
                                    id={`simple-tabpanel-${0}`}
                                    aria-labelledby={`simple-tab-${0}`}
                                    // {...other}
                                  >
                                    {values.tabs === 0 && (
                                      <div className={`row ${styles.formGap}`}>
                                        {/* <Typography> */}
                                          <div className={`col-lg-6 col-md-12 ${styles.dFlex} ${styles.textFieldContainer}`}>
                                            <CustomTextField texttype='uppercase' id="standard-basic" label="Nama ODC" name='nama_odc' onChange={handleChange} value={values.nama_odc} onBlur={handleBlur} variant="standard" />
                                          </div>
                                          <div className={`col-lg-6 col-md-12 ${styles.dFlex} ${styles.textFieldContainer}`}>
                                            <CustomFormControl key='regional' variant="standard" >
                                              <CustomInputLabel id="demo-simple-select-standard-label">Regional</CustomInputLabel>

                                              <NativeSelect value={values.region_id} onChange={(ev)=>handleFilterOnChange(ev,"region_id",values,setValues)} onBlur={handleBlur} inputProps={{
                                              name: 'region_id',
                                              id: 'uncontrolled-native',
                                              }}>
                                                {(regionList?.data?.map(item=>({label:item.name,value:item.id})) || []).map(item=>(
                                                  <option key={"region-"+item.label} value={item.value}>{item.label}</option>
                                                ))}
                                              </NativeSelect>
                                            </CustomFormControl>
                                          </div>
                                          <div className={`col-lg-6 col-md-12 ${styles.dFlex} ${styles.textFieldContainer}`}>
                                            <CustomFormControl key='witel' variant="standard" >
                                              <CustomInputLabel id="demo-simple-select-standard-label">Witel</CustomInputLabel>

                                              <NativeSelect value={values.witel_id} onChange={(ev)=>handleFilterOnChange(ev,"witel_id",values,setValues)} onBlur={handleBlur} inputProps={{
                                              name: 'witel_id',
                                              id: 'uncontrolled-native',
                                              }}>
                                                {((witelListClient || false)?witelListClient?.map(item=>({label:item.name,value:item.id})):witelList?.data?.map(item=>({label:item.name,value:item.id})) || []).map(item=>(
                                                  <option key={"witel-"+item.label} value={item.value}>{item.label}</option>
                                                ))}
                                              </NativeSelect>
                                            </CustomFormControl>
                                          </div>
                                          <div className={`col-lg-6 col-md-12 ${styles.dFlex} ${styles.textFieldContainer}`}>
                                            <CustomFormControl key='datel' variant="standard" >
                                              <CustomInputLabel id="demo-simple-select-standard-label">Datel</CustomInputLabel>

                                              <NativeSelect value={values.datel_id} onChange={(ev)=>handleFilterOnChange(ev,"datel_id",values,setValues)} onBlur={handleBlur} inputProps={{
                                              name: 'datel_id',
                                              id: 'uncontrolled-native',
                                              }}>
                                                {((datelListClient || false)?datelListClient?.map(item=>({label:item.name,value:item.id})):datelList?.data?.map(item=>({label:item.name,value:item.id})) || []).map(item=>(
                                                  <option key={"datel-"+item.label} value={item.value}>{item.label}</option>
                                                ))}
                                              </NativeSelect>
                                            </CustomFormControl>
                                          </div>
                                          <div className={`col-lg-6 col-md-12 ${styles.dFlex} ${styles.textFieldContainer}`}>
                                            <CustomFormControl key='sto' variant="standard" >
                                              <CustomInputLabel id="demo-simple-select-standard-label">STO</CustomInputLabel>

                                              <NativeSelect value={values.sto_id} onChange={(ev)=>handleFilterOnChange(ev,"sto_id",values,setValues)} onBlur={handleBlur} inputProps={{
                                              name: 'sto_id',
                                              id: 'uncontrolled-native',
                                              }}>
                                                {((stoListClient)?stoListClient?.map(item=>({label:item.name,value:item.id})):stoList?.data?.map(item=>({label:item.name,value:item.id})) || []).map(item=>(
                                                  <option key={"sto-"+item.label} value={item.value}>{item.label}</option>
                                                ))}
                                              </NativeSelect>
                                            </CustomFormControl>
                                          </div>
                                          {/* {item.merek} */}
                                          {/* merk
                                            deploymentDate
                                            core
                                            rakOa
                                            panelOa
                                            port */}
                                          <div className={`col-lg-6 col-md-12 ${styles.dFlex} ${styles.textFieldContainer}`}>
                                            <CustomTextField id="standard-basic" label="Deployment Date" color='primary'
                                              variant="standard" onChange={handleChange} onBlur={handleBlur} defaultValue={values.deployment_date}/>
                                          </div>
                                        {/* </Typography> */}
                                      </div>
                                    )}
                                  </div>
                                  <div
                                    role="tabpanel"
                                    hidden={values.tabs !== 1}
                                    id={`simple-tabpanel-${1}`}
                                    aria-labelledby={`simple-tab-${1}`}
                                    // {...other}
                                  >
                                    {values.tabs === 1 && (
                                      <div className={`row ${styles.formGap}`}>
                                      {/* <Typography> */}
                                        <div className={`col-lg-6 col-md-12 ${styles.dFlex} ${styles.textFieldContainer}`}>
                                          <CustomTextField id="standard-basic" onChange={handleChange} onBlur={handleBlur} label="Rak OA" variant="standard" defaultValue={values.rak_oa}/>
                                        </div>
                                        <div className={`col-lg-6 col-md-12 ${styles.dFlex} ${styles.textFieldContainer}`}>
                                          <CustomTextField id="standard-basic" onChange={handleChange} onBlur={handleBlur} label="Panel" variant="standard" defaultValue={values.panel}/>
                                        </div>
                                        <div className={`col-lg-6 col-md-12 ${styles.dFlex} ${styles.textFieldContainer}`}>
                                          <CustomTextField id="standard-basic" onChange={handleChange} onBlur={handleBlur} label="Port" color='primary'
                                            variant="standard" defaultValue={values.port}/>
                                        </div>
                                      {/* </Typography> */}
                                    </div>
                                    )}
                                  </div>
                                  
                                  </div>
                                  <div className={styles.actionContainer}>
                                    <CustomButtonModal btntype={"prev"} onClick={(ev)=>setValues(prev=>({...prev,tabs:values.tabs-1}))}
                                      style={{visibility:(values.tabs<=0)?"hidden":"visible"}} variant="contained" color='primary'
                                      size="medium">
                                      Prev
                                    </CustomButtonModal>
                                    <div className='row'>
                                      <div className='col-md-12 col-lg-6'>
                                        {(values.tabs>0) && <CustomButtonModal btntype={"submit"} type={"submit"} onClick={(ev)=>
                                          (values.tabs>0)?singleModalPopupOpen:setValues(prev=>({...prev,tabs:values.tabs+1}))} variant="contained" color='primary'
                                          size="medium">
                                          Submit
                                        </CustomButtonModal>}
                                      </div>
                                      <div className='col-md-12 col-lg-6'>
                                        {(values.tabs>0) && <CustomButtonModal onClick={()=>singleModalPopupClose()} variant="contained"
                                          color='primary' size="medium">
                                          Cancel
                                        </CustomButtonModal>}
                                      </div>
                                    </div>
                                    <CustomButtonModal style={{visibility: (values.tabs>0)?"hidden":"visible"}} onClick={(ev)=>(values.tabs>0)?singleModalPopupOpen:setValues(prev=>({...prev,tabs:values.tabs+1}))}  variant="contained" color='primary' size="medium">
                                    {(values.tabs<=0)? "Next":""}
                                    </CustomButtonModal>
                                  </div>
                                </form>
                                )}
                              </Formik>
                          </div>
                        </Box>
                      </div>
        </Modal>
        <Modal open={singleConfirmDeletePopup} onClose={singleConfirmDeletePopupClose} >
                    <div>
                          <div className={styles.closebtn}>
                            <MdOutlineClose/>
                          </div>
                            <Box itemRef='odcDeleteModal' sx={{
                              position: "absolute",
                              top: "48%",
                              left: "50%",
                              transition: 'all 0.3s ease-out',
                              transform: "translate(-50%, -50%)",
                              border: 0,
                              /* margin-bottom: 30px;
                              margin-top: 30px; */
                              borderRadius: "6px",
                              color: "#333",
                              // background: "#fff",
                              width:"90%",
                              maxWidth: "480px",
                              // boxShadow: "0 2px 2px 0 rgb(0 0 0 / 14%), 0 3px 1px -2px rgb(0 0 0 / 20%), 0 1px 5px 0 rgb(0 0 0 / 12%)",
                              boxShadow: "0 1px 4px 0 rgb(0 0 0 / 14%)",
                            } as any}>
                              <div className={`${styles.card}  ${styles.cardStats}`}>
                                <div className={`${styles.cardHeader} ${styles.cardHeaderPrimary}`}>
                                  <h4 className={styles.cardTitle}>{"Konfirmasi Delete"}</h4>
                                  <div className={styles.stats}>
                                    proses ini akan menghapus data odc secara permanen. mohon di cek kembali
                                  </div>
                                </div>
                                <div className={`${styles.cardBody} card-body row`}>
                                  <div className={styles.confirmationWrapper}>
                                    <div className={`col-md-12`}>
                                    <Typography variant='h6' className={styles.confirmationTitle}>
                                      Anda yakin akan menghapus {selectedConfirmDeletePopup.name.toLocaleUpperCase()} ?
                                    </Typography>
                                    </div>
                                    <div className={styles.actionContainer}>
        
                                          <div >
                                            <CustomButtonModal btntype={'submit'} onClick={()=>deleteODCData(selectedConfirmDeletePopup.name,selectedConfirmDeletePopup.odc_id,newTableState.page+1,odc_rowsPerPage,newTableState.sort,token,singleConfirmDeletePopupClose,toast)}>
                                              {"Submit"}
                                            </CustomButtonModal>
                                          </div>
                                          <div >
                                            <CustomButtonModal onClick={singleConfirmDeletePopupClose}>
                                              {"Cancel"}
                                            </CustomButtonModal>
                                          </div>
                                    </div>
                                  </div>
        
        
                                
                                </div>
        
                              </div>
                            </Box>
                          </div>
        </Modal>
              {/* </MuiThemeProvider> */}
      <div className={styles.odcBackdrop}>
        <Image src={'/img/backdrop_odc.jpeg'} width={1440} height={1213} alt={"backdrop"}/>
      </div>
    </div>
  )
}
export const getServerSideProps = async (props) => wrapper.getServerSideProps(store => async ({req, res, ...etc}) => {
  if(!req.cookies.token)
  return {
    redirect:{
      permanent:false,
      destination: "/"
    }
  }
  store.dispatch(getODCsBox())
  store.dispatch(getDashCard({region:null,witel:null,datel:null,sto:null},req.cookies.token,toast))
  store.dispatch(IchangeODCPage({page:1,rowsPerPage:5, region:null,witel:null,datel:null,sto:null,sortBy:null,sortOrder:null,name:null},req.cookies.token,toast))
  store.dispatch(getFeederGraph({ regional: '', witel: '', datel: '', sto: ''},req.cookies.token))
  store.dispatch(getDistributionGraph({ regional: '', witel: '', datel: '', sto: ''},req.cookies.token))
  store.dispatch(getRegionList(req.cookies.token))
  store.dispatch(getWitelList(req.cookies.token))
  store.dispatch(getDatelList(req.cookies.token))
  store.dispatch(getSTOList(req.cookies.token))
  store.dispatch(getMerekList(req.cookies.token,toast))
  store.dispatch(END)
  await store.sagaTask.toPromise();
  // console.log("feeder graph",store.getState().ODCs.graph_feeder)
  // console.log("region list",store.getState().ODCs.region_list)
  // console.log("witel list",store.getState().ODCs.witel_list)
  // console.log("datel list",store.getState().ODCs.datel_list)
  // console.log("sto list",store.getState().ODCs.sto_list)
  // console.log("merek list",store.getState().ODCs.sto_list)
  // console.log("odc page",store.getState().ODCs.odc_page)
  // console.log("token",req.cookies.token)
      return {
        props:{
          odc_list:store.getState().ODCs.odc_page || {isLoading: false,page: 1, sortOrder: {name:"",direction:"asc"},data:[],count:0},
          // data:store.getState().ODCs.odcsBox,
          deck_value: store.getState().ODCs.dashboard_card_list,
          token: req.cookies.token,
          email: (jwt(req.cookies.token) as any).email,
          role_name: (jwt(req.cookies.token) as any).role_name,
          feederGraph: store.getState().ODCs.graph_feeder || {group:{idle:[],used:[],broken:[]},xaxis:[]},
          distributionGraph: store.getState().ODCs.graph_distribution || {group:{idle:[],used:[],broken:[]},xaxis:[]},
          regionList: store.getState().ODCs.region_list || [{id:0,name:""}],
          witelList: store.getState().ODCs.witel_list || [{id:0,region_id: 0,name:""}],
          datelList: store.getState().ODCs.datel_list || [{id:0,region_id: 0,witel_id: 0,name:""}],
          stoList: store.getState().ODCs.sto_list || [{id:0,region_id: 0,witel_id: 0,datel_id: 0, name:""}],
          merekList: store.getState().ODCs.merek_list || [{id: "",name: "",splitter_position: "",splitter_capacity: ""}]
        }
      }
    })(props);
const mapStateToProps = state => ({
  isUserVerifyLoading: state.Auth.loading.verifyUser,
  odc_rowsPerPage: state.ODCs.tableRowsPerPage,
  odc_page: state.ODCs.tablePage,
  odc_sort: state.ODCs.tableSort,
  odc_list_client: state.ODCs.odc_page,
  deck_value_client: state.ODCs.dashboard_card_list,
  feederGraphClient: state.ODCs.graph_feeder,
  distributionGraphClient: state.ODCs.graph_distribution,
});
const mapFunctionToProps = {
otpVerificationSuccessfull,
getODCsBox,
getFeederGraph,
getDistributionGraph,
getRegionList,
getWitelList,
getDatelList,
getSTOList,
updateODCData,
changeODCPage:IchangeODCPage,
addODCData,
deleteODCData,
setTableRowsPerPage: IsetTableRowsPerPage,
setTablePage,
setTableSort,
getDashCard
// getDistributionGraph,
}
export default connect(mapStateToProps,mapFunctionToProps)(withAuth(ODC))