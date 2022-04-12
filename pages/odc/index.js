import React, { useCallback, useEffect, useRef, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import styles from './odc_evolve.module.css';
import Card from '../../components/Card';
import dynamic from 'next/dynamic';
const ApexChart = dynamic(()=>import('react-apexcharts'),{ssr:false});
// import Chart from "react-apexcharts";
import { connect } from 'react-redux';
import {
  MdOpenInBrowser,
  MdRemoveRedEye,
  MdOutlineClose,
  MdDeleteForever
} from 'react-icons/md';
import {END} from 'redux-saga';
import { wrapper,makeStore } from "../../components/store";
import { getODCsBox, getFeederGraph,getDistributionGraph } from '../../components/store/odcs/actions';
import {otpVerificationSuccessfull} from "../../components/store/login/actions";
import withAuth from '../../components/Auth';
const DynamicMUIDataTable = dynamic(() => import('mui-datatables'),{ ssr: false });
import {styled } from '@mui/material/styles';
import {
  Button,
  Box,
  Modal,
  Typography
  } from "@material-ui/core";
// import { makeStyles } from '@material-ui/styles';
import { createTheme, MuiThemeProvider,makeStyles } from "@material-ui/core/styles";
import { Select,MenuItem, FormControl, InputLabel, Checkbox, ListItemText } from '@mui/material';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import TextField from '@mui/material/TextField';
import { Formik } from 'formik';
const CustomTextField = styled(TextField)(({ theme }) => ({
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
const CustomTab = styled(Tab)(({theme})=>({
  color:"gray!important",
  '&.MuiTab-root.Mui-selected': {
    color: "black!important"
  },
}))
const CustomTabs = styled(Tabs)(({theme})=>({
  '.MuiTabs-indicator': {
    backgroundColor: theme.status.primary,
  },
}))
const CustomButton = styled(Button)(({theme})=>({
    // backgroundColor:"#00C092!important",
    // padding: "6px 16px!important",
    // color:"white!important",
    // borderRadius:"2rem!important"
}))
function CustomSelect({defaultValue,data,name,onChange,onBlur}){
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
  const {data,otpVerificationSuccessfull,getFeederGraph,getDistributionGraph,feederGraph,feederGraphClient,distributionGraph,distributionGraphClient} = props
  console.log("data",data)
  const [open, setOpen] = React.useState(data.map(item=>({status:false})));
  // const [open, setOpen] = React.useState(false);
  console.log("modal edit",open)
  // const [openDeleteRowModal, setOpenDeleteRowModal] = React.useState(false);
  const [openDeleteRowModal, setOpenDeleteRowModal] = React.useState(data.map(item=>({status:false})));
  const [value, setValue] = React.useState(0);

  const handleOpen = useCallback((row)=>{
    setOpen(prev=>{
      prev[row].status = true;
      return {...prev}
    });
  },[setOpen])
  const handleClose = useCallback((row)=>{
    setOpen(prev=>{
      prev[row].status = false;
      return {...prev}
    });
  },[setOpen])
  const deleteRowHandleOpen = useCallback((row)=>{
    setOpenDeleteRowModal(prev=>{
      prev[row].status = true;
      return {...prev}
    })
  },[setOpenDeleteRowModal])
  const deleteRowHandleClose = useCallback((row)=>{
    setOpenDeleteRowModal(prev=>{
      prev[row].status = false;
      return {...prev}
    })
  },[setOpenDeleteRowModal])
  // const deleteRowHandleOpen = () => setOpenDeleteRowModal(true);
  // const deleteRowHandleClose = () => setOpenDeleteRowModal(false);
  const handleChange = (event, newValue) => {
    setValue(newValue);
  };
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
  const CustomButtonModal = styled(Button)(({ theme, btnType }) => ({
    background: btnType == 'submit' ? '#1ebc51!important':theme.status.primary,
  }));
  const getMuiTheme = () =>
  createTheme({
    status: {
      primary: "#ee2d24!important",
      darkgray: "darkgray!important"
    },
    overrides: {
      MUIDataTable:{
        paper:{
          // position:'relative',
          // top:"250px",
          margin:"1rem 0",
          // background: 'rgba(255,255,255,0.3)',
          background: 'transparent',
          padding:'0 1rem',
          // background: 'black'
        }
      },

      MuiOutlinedInput:{
        root:{
          color: "#ee2d24!important"
        }
      },
      MuiTypography:{
        root:{

          fontFamily:"'GothamRounded-Book' !important"
        }
      },
      MuiButtonBase:{
        root:{
          fontFamily:"'GothamRounded-Book' !important"

        }
      },
      MuiTableRow:{
        color:"#ee2d24",
        root:{
          backgroundColor:"transparent"
          // background:"rgba(255,255,255,0.3)"
        }
      },
      MUIDataTableHeadRow:{
        root:{
          backgroundImage:"linear-gradient(to right,rgba(178,98,98,0.3),rgb(255 228 228 / 30%))",
          backgroundImage:"linear-gradient(to right,rgb(237 167 88 / 30%),rgb(253 243 236 / 30%))",
        }
      },
      MUIDataTableHeadCell:{
        fixedHeader:{
          // backgroundImage:"linear-gradient(to right,rgba(178,98,98,0.3),rgba(255,255,255,0.3))"

          backgroundColor:"transparent",
          // backgroundColor:"linear-gradient(rgba(178,98,98,0.3),rgba(255,255,255,0.3))"
        },
        toolButton:{
          justifyContent:"center"

        }
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
  const [datatable, setDatatable] = React.useState([[]])
    React.useEffect(()=>{
    
        // console.log("odc",odc_edit_modal.current,document.querySelector('[itemref="testing"]'))
        setTimeout(()=>{
          // console.log("odc",document.querySelector('[itemref="odcDetailModal"]'))
          if(document.querySelector('[itemref="odcDetailModal"]'))
          document.querySelector('[itemref="odcDetailModal"]').style.top = "50%";
          if(document.querySelector('[itemref="odcDeleteModal"]'))
          document.querySelector('[itemref="odcDeleteModal"]').style.top = "50%";
        },50)
      setDatatable(data.map((item,idx)=>([
        idx+1,
        item.name,item.regional,item.witel,item.datel,item.sto,
        item.kapasitas,
        item.port_feeder_terminasi,
        item.core_feeder_idle,
        item.core_feeder_used,
        item.core_feeder_broken,
        item.core_distribusi_idle,
        item.core_distribusi_used,
        item.core_distribusi_broken,
        <div key={0} className={styles.tableAction}>
              <Link href={`/odc/${item.name}`} passHref>
              <a>
            <CustomButton>
                <MdOpenInBrowser fill='#009873' />
            </CustomButton>
              </a>
              </Link>
            <CustomButton onClick={()=>handleOpen(idx)} variant='text'>
              <MdRemoveRedEye fill='#3124c1'/>
            </CustomButton>
            <CustomButton onClick={()=>deleteRowHandleOpen(idx)} variant='text'>
              <MdDeleteForever fill='#B10040'/>
            </CustomButton>
            {/* <CustomButton onClick={()=>deleteRow(item.id)} variant='text'>
              <MdDeleteForever />
            </CustomButton> */}
            <Modal open={open[idx].status} onClose={()=>handleClose(idx)} aria-labelledby="modal-modal-title"
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
                      boxShadow: "0 2px 2px 0 rgb(0 0 0 / 14%), 0 3px 1px -2px rgb(0 0 0 / 20%), 0 1px 5px 0 rgb(0 0 0 / 12%)",
                      boxShadow: "0 1px 4px 0 rgb(0 0 0 / 14%)",
                    }}>
                    {/* <Box sx={styles.card}> */}
                      <div className={`${styles.card}  ${styles.cardStats}`}>
                        <div className={`${styles.cardHeader} ${styles.cardHeaderPrimary}`}>
                          <h4 className={styles.cardTitle}>{item.name.toUpperCase()}</h4>
                          <div className={styles.stats}>
                            {/* <MdOutlineDateRange width={16} height={"auto"} />  */}
                            lengkapi semua isian yang ada
                          </div>
                        </div>
                        <div className={`${styles.cardBody} card-body row`}>
                        <div className={styles.tabLink}>
                          <CustomTabs value={value} onChange={handleChange} aria-label="basic tabs example">
                            <CustomTab label="ODC" {...a11yProps(0)} />
                            <CustomTab label="OA" {...a11yProps(1)} />
                          </CustomTabs>
                        </div>
                        <div className={styles.tabLink}>
                        </div>
                        <div
                          role="tabpanel"
                          hidden={value !== 0}
                          id={`simple-tabpanel-${0}`}
                          aria-labelledby={`simple-tab-${0}`}
                          // {...other}
                        >
                          {value === 0 && (
                            <div className={`row ${styles.formGap}`}>
                              {/* <Typography> */}
                                <div className={`col-lg-6 col-md-12 ${styles.dFlex} ${styles.textFieldContainer}`}>
                                  <CustomTextField id="standard-basic" label="Nama ODC" variant="standard" defaultValue={item.name}/>
                                </div>
                                <div className={`col-lg-6 col-md-12 ${styles.dFlex} ${styles.textFieldContainer}`}>
                                  <CustomTextField id="standard-basic" label="Regional" variant="standard" defaultValue={item.regional}/>
                                </div>
                                <div className={`col-lg-6 col-md-12 ${styles.dFlex} ${styles.textFieldContainer}`}>
                                  <CustomTextField id="standard-basic" label="WITEL" variant="standard" defaultValue={item.witel}/>
                                </div>
                                <div className={`col-lg-6 col-md-12 ${styles.dFlex} ${styles.textFieldContainer}`}>
                                  <CustomTextField id="standard-basic" label="DATEL" variant="standard" defaultValue={item.datel}/>
                                </div>
                                <div className={`col-lg-6 col-md-12 ${styles.dFlex} ${styles.textFieldContainer}`}>
                                  <CustomTextField id="standard-basic" label="STO" variant="standard" defaultValue={item.sto}/>
                                </div>
                                <div className={`col-lg-6 col-md-12 ${styles.dFlex} ${styles.textFieldContainer}`}>
                                  <CustomTextField id="standard-basic" label="Kapasitas" variant="standard" defaultValue={item.kapasitas}/>
                                </div>
                                <div className={`col-lg-6 col-md-12 ${styles.dFlex} ${styles.textFieldContainer}`}>
                                  <CustomTextField id="standard-basic" label="Merek" variant="standard" defaultValue={item.merk}/>
                                </div>
                                <div className={`col-lg-6 col-md-12 ${styles.dFlex} ${styles.textFieldContainer}`}>
                                  <CustomTextField id="standard-basic" label="Splitter Position" variant="standard" defaultValue={item.merk}/>
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
                                    variant="standard" defaultValue={item.deploymentDate}/>
                                </div>
                              {/* </Typography> */}
                            </div>
                          )}
                        </div>
                        <div
                          role="tabpanel"
                          hidden={value !== 1}
                          id={`simple-tabpanel-${1}`}
                          aria-labelledby={`simple-tab-${1}`}
                          // {...other}
                        >
                          {value === 1 && (
                            <div className={`row ${styles.formGap}`}>
                            {/* <Typography> */}
                              <div className={`col-lg-6 col-md-12 ${styles.dFlex} ${styles.textFieldContainer}`}>
                                <CustomTextField id="standard-basic" label="Port Feeder Terminasi" variant="standard" defaultValue={item.port_feeder_terminasi}/>
                              </div>
                              <div className={`col-lg-6 col-md-12 ${styles.dFlex} ${styles.textFieldContainer}`}>
                                <CustomTextField id="standard-basic" label="Rak OA" variant="standard" defaultValue={item.rak_OA}/>
                              </div>
                              <div className={`col-lg-6 col-md-12 ${styles.dFlex} ${styles.textFieldContainer}`}>
                                <CustomTextField id="standard-basic" label="Panel" variant="standard" defaultValue={item.panel}/>
                              </div>
                              <div className={`col-lg-6 col-md-12 ${styles.dFlex} ${styles.textFieldContainer}`}>
                                <CustomTextField id="standard-basic" label="Port" color='primary'
                                  variant="standard" defaultValue={item.port}/>
                              </div>
                            {/* </Typography> */}
                          </div>
                          )}
                        </div>
                        
                        </div>
                        <div className={styles.actionContainer}>
                          <CustomButtonModal onClick={(ev)=>handleChange(ev,value-1)}
                            style={{visibility:(value<=0)?"hidden":"visible"}} variant="contained" color='primary'
                            size="large">
                            Prev
                          </CustomButtonModal>
                          <div className='row'>
                            <div className='col-md-12 col-lg-6'>
                              {(value>0) && <CustomButtonModal btnType={"submit"} onClick={(ev)=>
                                (value>0)?handleOpen:handleChange(ev,value+1)} variant="contained" color='primary'
                                size="large">
                                Submit
                              </CustomButtonModal>}
                            </div>
                            <div className='col-md-12 col-lg-6'>
                              {(value>0) && <CustomButtonModal onClick={()=>handleClose(idx)} variant="contained"
                                color='primary' size="large">
                                Cancel
                              </CustomButtonModal>}
                            </div>
                          </div>
                          <CustomButtonModal style={{visibility: (value>0)?"hidden":"visible"}} onClick={(ev)=>(value>0)?handleOpen:handleChange(ev,value+1)}  variant="contained" color='primary' size="large">
                          {(value<=0)? "Next":""}
                          </CustomButtonModal>
                        </div>
                      </div>
                    </Box>
                  </div>
                  </Modal>
            <Modal open={openDeleteRowModal[idx].status} onClose={()=>deleteRowHandleClose(idx)} >
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
                      boxShadow: "0 2px 2px 0 rgb(0 0 0 / 14%), 0 3px 1px -2px rgb(0 0 0 / 20%), 0 1px 5px 0 rgb(0 0 0 / 12%)",
                      boxShadow: "0 1px 4px 0 rgb(0 0 0 / 14%)",
                    }}>
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
                              Anda yakin akan menghapus {item.name} ?
                            </Typography>
                            </div>
                            <div className={styles.actionContainer}>

                                  <div >
                                    <CustomButtonModal btnType={'submit'}>
                                      {"Submit"}
                                    </CustomButtonModal>
                                  </div>
                                  <div >
                                    <CustomButtonModal onClick={()=>deleteRowHandleClose(idx)}>
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
          </div>
      ])))
    },[rawData,open,value,openDeleteRowModal])
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
    const state = {
          
     
    
    
    };
    console.log("state",state)
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

  return (<div className={styles.mainContent}>
          <div className={styles.cardWrapper}>
            <Card title='Total ODC' value='18.669' unit='unit' primaryFill={"#FF72BE"} secondaryFill={'#006ED3'}/>
            <Card title='Core Feeder Idle' unit='ports' primaryFill={"#6FB400"} secondaryFill={'#006ED3'}/>
            <Card title='Core Feeder Used' unit='ports' primaryFill={"#00C092"} secondaryFill={'#006ED3'}/>
            <Card title='Core Feeder Broken' unit='ports' primaryFill={"#ABD601"} secondaryFill={'#006ED3'}/>
            <Card title='Core Distribusi Idle' unit='ports' primaryFill={"#36DBFF"} secondaryFill={'#006ED3'}/>
            <Card title='Core Distribusi Used' unit='ports' primaryFill={"#00BBE4"} secondaryFill={'#006ED3'}/>
            <Card title='Core Distribusi Broken' unit='ports' primaryFill={"#51C0FF"} secondaryFill={'#006ED3'}/>
          </div>
          <p className={styles.last_update}>Last Update : Minggu, 03 April 2022 - 14.30 WIB</p>

          <Formik 
          initialValues={{ regional: '', witel: '', datel: '', sto: ''}}
          onSubmit={(values)=>{
            console.log("on filter submit",values)
            // console.log("cookie",document.cookie.split(" "))
            getFeederGraph(values || { regional: '', witel: '', datel: '', sto: ''},getCookie("token"))
            getDistributionGraph(values || { regional: '', witel: '', datel: '', sto: ''},getCookie("token"))
          }}>
          {({
            values,
            errors,
            touched,
            handleChange,
            handleBlur,
            handleSubmit,
            isSubmitting,
            /* and other goodies */
          }) => (<form onSubmit={handleSubmit}>
                  <div className={styles.toolbar}>
                    <CustomSelect 
                      defaultValue={values.regional} 
                      onChange={handleChange}
                      onBlur={handleBlur}
                      data={regional} 
                      name='regional'
                    />
                    <CustomSelect 
                      defaultValue={values.witel} 
                      onChange={handleChange}
                      onBlur={handleBlur}
                      data={witel} 
                      name='witel'
                    />
                    <CustomSelect 
                      defaultValue={values.datel} 
                      onChange={handleChange}
                      onBlur={handleBlur}
                      data={datel} 
                      name='datel'
                    />
                    <CustomSelect 
                      defaultValue={values.sto} 
                      onChange={handleChange}
                      onBlur={handleBlur}
                      data={sto} 
                      name='sto'
                    />
                    <CustomButton className={classes.green} type="submit">Submit</CustomButton>
                    {/* <CustomButton className={classes.green} type="submit" disabled={isSubmitting}>Submit</CustomButton> */}
                </div>
                  </form>
                )}
          </Formik>

        <div className={styles.charts}>
          <div>
            <h2>Feeder Chart</h2>
        {((graph.feeder?.series[0]?.data || false) ||  (graph.feeder?.series[0]?.data?.length === 0)) ? <ApexChart
options={graph.feeder.options} series={graph.feeder.series} type="bar" width={600} height={350}
            />: <h2>No Data</h2>}
          </div>
          <div>
            <h2>Distribution Chart</h2>
            {((graph.distribution?.series[0]?.data || false) ||  (graph.distribution?.series[0]?.data?.length === 0)) ? <ApexChart
options={graph.distribution.options} series={graph.distribution.series} type="bar" width={600} height={350}
            />: <h2>No Data</h2>}
          </div>
        </div>
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
                    // customBodyRender:(value, tableMeta, update) => {
                    //   console.log("row render",tableMeta)
                    //   let rowIndex = (tableMeta.rowData[0])?Number(tableMeta.rowIndex) + 1: "";
                    //   return ( <span>{rowIndex}</span> )
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
  //                   }
                  }
                },{
                  name: "ODC Name",
                  options:{
                    customBodyRender:(value, tableMeta, update) => {
                      let newValue = tableMeta.rowData[1]
                      return ( <span>{newValue}</span> )
                    }
                  }
                },{
                  name: "Regional",
                  options:{
                    customBodyRender:(value, tableMeta, update) => {
                      let newValue = tableMeta.rowData[2]
                      return ( <span>{newValue}</span> )
                    }
                  }
                },{
                  name: "WITEL",
                  options:{
                    customBodyRender:(value, tableMeta, update) => {
                      let newValue = tableMeta.rowData[3]
                      return ( <span>{newValue}</span> )
                    }
                  }
                },{
                  name: "DATEL",
                  options:{
                    customBodyRender:(value, tableMeta, update) => {
                      let newValue = tableMeta.rowData[4]
                      return ( <span>{newValue}</span> )
                    }
                  }
                },{
                  name: "STO",
                  options:{
                    customBodyRender:(value, tableMeta, update) => {
                      let newValue = tableMeta.rowData[5]
                      return ( <span>{newValue}</span> )
                    }
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
                    }
                  }
                },{
                  name: "Core Feeder Idle",
                  options:{
                    customBodyRender:(value, tableMeta, update) => {
                      let newValue = tableMeta.rowData[8]
                      return ( <span>{newValue}</span> )
                    }
                  }
                },{
                  name: "Core Feeder Used",
                  options:{
                    customBodyRender:(value, tableMeta, update) => {
                      let newValue = tableMeta.rowData[9]
                      return ( <span>{newValue}</span> )
                    }
                  }
                },{
                  name: "Core Feeder Broken",
                  options:{
                    customBodyRender:(value, tableMeta, update) => {
                      let newValue = tableMeta.rowData[10]
                      return ( <span>{newValue}</span> )
                    }
                  }
                },{
                  name: "Core Distribusi Idle",
                  options:{
                    customBodyRender:(value, tableMeta, update) => {
                      let newValue = tableMeta.rowData[11]
                      return ( <span>{newValue}</span> )
                    }
                  }
                },{
                  name: "Core Distribusi Used",
                  options:{
                    customBodyRender:(value, tableMeta, update) => {
                      let newValue = tableMeta.rowData[12]
                      return ( <span>{newValue}</span> )
                    }
                  }
                },{
                  name: "Core Distribusi Broken",
                  options:{
                    customBodyRender:(value, tableMeta, update) => {
                      let newValue = tableMeta.rowData[13]
                      return ( <span>{newValue}</span> )
                    }
                  }
                },{
                  name: "Aksi",
                  options:{
                    customBodyRender:(value, tableMeta, update) => {
                      let newValue = tableMeta.rowData[14]
                      return ( <span>{newValue}</span> )
                    }
                  }
                }]}
                />:null}
                
              {/* </ThemeProvider> */}
              </MuiThemeProvider>
      <div className={styles.odcBackdrop}>
        <Image src={'/img/backdrop_odc.jpeg'} width={1440} height={1213} alt={"backdrop"}/>
      </div>
    </div>
  )
}
export const getServerSideProps = async (props) => wrapper.getServerSideProps(store => async ({req, res, ...etc}) => {
  store.dispatch(getODCsBox())
  store.dispatch(getFeederGraph({ regional: '', witel: '', datel: '', sto: ''},req.cookies.token))
  store.dispatch(getDistributionGraph({ regional: '', witel: '', datel: '', sto: ''},req.cookies.token))
  store.dispatch(END)
  await store.sagaTask.toPromise();
  console.log("feeder graph",store.getState().ODCs.graph_feeder)
  console.log("token",req.cookies.token)
      return {
        props:{data:store.getState().ODCs.odcsBox,
          feederGraph: store.getState().ODCs.graph_feeder || {group:{idle:[],used:[],broken:[]},xaxis:[]},
          distributionGraph: store.getState().ODCs.graph_distribution || {group:{idle:[],used:[],broken:[]},xaxis:[]}
        }
      }
    })(props);
const mapStateToProps = state => ({
  feederGraphClient: state.ODCs.graph_feeder,
  distributionGraphClient: state.ODCs.graph_distribution,
});
const mapFunctionToProps = {
otpVerificationSuccessfull,
getODCsBox,
getFeederGraph,
getDistributionGraph,
// getDistributionGraph,
}
export default connect(mapStateToProps,mapFunctionToProps)(withAuth(ODC))