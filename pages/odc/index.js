import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import styles from './odc_evolve.module.css';
import Card from '../../components/Card';
import dynamic from 'next/dynamic';
const ApexChart = dynamic(()=>import('react-apexcharts'),{ssr:false});
// import Chart from "react-apexcharts";
import { connect } from 'react-redux';
import {
  MdInventory,
  MdNfc,
  MdSettingsInputComposite,
  MdOutlineDateRange,
  MdOpenInBrowser,
  MdRemoveRedEye,
  MdOutlineClose,
  MdDeleteForever
} from 'react-icons/md';
import {END} from 'redux-saga';
import { wrapper,makeStore } from "../../components/store";
import { getODCsBox } from '../../components/store/odcs/actions';
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
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import TextField from '@mui/material/TextField';
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
function CustomSelect({data,name}){
  return <div className={styles.witel}>
      <select>
        {data.map(item=><option key={name+item.value}>{item.label}</option> )}
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
  const {data,otpVerificationSuccessfull} = props
  const [open, setOpen] = React.useState(false);
  const [openDeleteRowModal, setOpenDeleteRowModal] = React.useState(false);
  const [value, setValue] = React.useState(0);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const deleteRowHandleOpen = () => setOpenDeleteRowModal(true);
  const deleteRowHandleClose = () => setOpenDeleteRowModal(false);
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
    {label: "Regional",value:1}
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

          backgroundColor:"transparent"
          // backgroundColor:"linear-gradient(rgba(178,98,98,0.3),rgba(255,255,255,0.3))"
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
      setDatatable(data.map(item=>([
        item.name,item.capacity,
        `idle: ${item.core_feeder_idle} | used: ${item.core_feeder_used} | broken: ${item.core_feeder_broken}`,
        `idle: ${item.core_distribusi_idle} | used: ${item.core_distribusi_used} | broken: ${item.core_distribusi_broken}`,
        <div key={0} className={styles.tableAction}>
              <Link href={`/odc/${item.name}`} passHref>
              <a>
            <CustomButton>
                <MdOpenInBrowser />
            </CustomButton>
              </a>
              </Link>
            <CustomButton onClick={handleOpen} variant='text'>
              <MdRemoveRedEye />
            </CustomButton>
            <CustomButton onClick={deleteRowHandleOpen} variant='text'>
              <MdDeleteForever />
            </CustomButton>
            {/* <CustomButton onClick={()=>deleteRow(item.id)} variant='text'>
              <MdDeleteForever />
            </CustomButton> */}
            <Modal open={open} onClose={handleClose} aria-labelledby="modal-modal-title"
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
                            <CustomTab label="OLT" {...a11yProps(0)} />
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
                                  <CustomTextField id="standard-basic" label="ID" variant="standard" defaultValue={item.id}/>
                                </div>
                                <div className={`col-lg-6 col-md-12 ${styles.dFlex} ${styles.textFieldContainer}`}>
                                  <CustomTextField id="standard-basic" label="Kapasitas" variant="standard" defaultValue={item.capacity}/>
                                </div>
                                <div className={`col-lg-6 col-md-12 ${styles.dFlex} ${styles.textFieldContainer}`}>
                                  <CustomTextField id="standard-basic" label="Merek" variant="standard" defaultValue={item.merek}/>
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
                                <CustomTextField id="standard-basic" label="Core" variant="standard" defaultValue={item.core}/>
                              </div>
                              <div className={`col-lg-6 col-md-12 ${styles.dFlex} ${styles.textFieldContainer}`}>
                                <CustomTextField id="standard-basic" label="Rak OA" variant="standard" defaultValue={item.rakOa}/>
                              </div>
                              <div className={`col-lg-6 col-md-12 ${styles.dFlex} ${styles.textFieldContainer}`}>
                                <CustomTextField id="standard-basic" label="Panel" variant="standard" defaultValue={item.panelOa}/>
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
                              {(value>0) && <CustomButtonModal onClick={()=>handleClose()} variant="contained"
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
            <Modal open={openDeleteRowModal} onClose={deleteRowHandleClose} >
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
                              Anda yakin akan menghapus {item.id} ?
                            </Typography>
                            </div>
                            <div className={styles.actionContainer}>

                                  <div >
                                    <CustomButtonModal btnType={'submit'}>
                                      {"Submit"}
                                    </CustomButtonModal>
                                  </div>
                                  <div >
                                    <CustomButtonModal onClick={()=>deleteRowHandleClose()}>
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

    React.useEffect(()=>{

    },[datatable])
    const state = {
          
      series: [{
        name: 'PRODUCT A',
        data: [44, 55, 41, 67, 22, 43]
      }, {
        name: 'PRODUCT B',
        data: [13, 23, 20, 8, 13, 27]
      }, {
        name: 'PRODUCT C',
        data: [11, 17, 15, 15, 21, 14]
      }, {
        name: 'PRODUCT D',
        data: [21, 7, 25, 13, 22, 8]
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
          categories: ['01/01/2011 GMT', '01/02/2011 GMT', '01/03/2011 GMT', '01/04/2011 GMT',
            '01/05/2011 GMT', '01/06/2011 GMT'
          ],
          categories: ['STO data', '01/02/2011 GMT', '01/03/2011 GMT', '01/04/2011 GMT',
            '01/05/2011 GMT', '01/06/2011 GMT'
          ],
        },
        legend: {
          position: 'right',
          offsetY: 40
        },
        fill: {
          opacity: 1
        }
      },
    
    
    };
    console.log("odc data",data)
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

        <div className={styles.toolbar}>
          <CustomSelect data={regional} name='regional'/>
          <CustomSelect data={witel} name='witel'/>
          <CustomSelect data={datel} name='datel'/>
          <CustomSelect data={sto} name='sto'/>
          <CustomButton className={classes.green}>Submit</CustomButton>
        </div>
        <div className={styles.charts}>
          <div>
            <h2>Feeder Chart</h2>
        <ApexChart
options={state.options} series={state.series} type="bar" width={600} height={350}
            />
          </div>
          <div>
            <h2>Distribution Chart</h2>
        <ApexChart
options={state.options} series={state.series} type="bar" width={600} height={350}
            />
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
                    customBodyRender:(value, tableMeta, update) => {
                      console.log("row render",tableMeta)
                      let rowIndex = (tableMeta.rowData[0])?Number(tableMeta.rowIndex) + 1: "";
                      return ( <span>{rowIndex}</span> )
                    },
                    filter
                  }
                },{
                  name: "ODC ID",
                  options:{
                    customBodyRender:(value, tableMeta, update) => {
                      let newValue = tableMeta.rowData[0]
                      return ( <span>{newValue}</span> )
                    }
                  }
                },{
                  name: "ODC ID",
                  options:{
                    customBodyRender:(value, tableMeta, update) => {
                      let newValue = tableMeta.rowData[0]
                      return ( <span>{newValue}</span> )
                    }
                  }
                },{
                  name: "Kapasitas",
                  options:{
                    customBodyRender:(value, tableMeta, update) => {
                      let newValue = tableMeta.rowData[1]
                      return ( <span>{newValue}</span> )
                    }
                  }
                },{
                  name: "Feeder",
                  options:{
                    customBodyRender:(value, tableMeta, update) => {
                      let newValue = tableMeta.rowData[2]
                      return ( <span>{newValue}</span> )
                    }
                  }
                },{
                  name: "Distribusi",
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
  store.dispatch(END)
  await store.sagaTask.toPromise();
  console.log("static props",store.getState())
      return {
        props:{data:store.getState().ODCs.odcsBox}
      }
    })(props);
const mapStateToProps = state => ({
});
const mapFunctionToProps = {
otpVerificationSuccessfull,
getODCsBox
}
export default connect(mapStateToProps,mapFunctionToProps)(withAuth(ODC))