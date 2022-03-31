import React,{useEffect,useState} from 'react';
import withAuth from '../../components/Auth';
import Link from 'next/link';
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
import { connect } from 'react-redux';
import {END} from 'redux-saga';
import { wrapper,makeStore } from "../../components/store";
import { getODCsBox } from '../../components/store/odcs/actions'
import dynamic from 'next/dynamic';
const DynamicMUIDataTable = dynamic(() => import('mui-datatables'),{ ssr: false });
// import MUIDataTable from "mui-datatables";
import Button from '@mui/material/Button';
import {Modal,Box, Typography} from '@material-ui/core';
import { createTheme, MuiThemeProvider,styled } from "@material-ui/core/styles";
import { 
  styled as styledCustom
} from "@mui/material/styles";
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';
import Chip from '@mui/material/Chip';
const DynamicChip =dynamic(()=>import('@mui/material/Chip'),{ssr: false});
import Stack from '@mui/material/Stack';
import {otpVerificationSuccessfull} from "../../components/store/login/actions"

// createtheme
import styles from './odc.module.css';

export const odcWrapper = () =>wrapper;
const CustomTab = styledCustom(Tab)(({theme})=>({
  color:"gray!important",
  '&.MuiTab-root.Mui-selected': {
    color: "black!important"
  },
}))
const CustomTabs = styledCustom(Tabs)(({theme})=>({
  '.MuiTabs-indicator': {
    backgroundColor: theme.status.primary,
  },
}))
const CustomAutocomplete = styledCustom(Autocomplete)(({theme})=>({
  '.MuiOutlinedInput-notchedOutline':{
    borderWidth:"0"
  },
  '.MuiOutlinedInput-notchedOutline legend': {
    display: "none",
  },
  '.MuiOutlinedInput-root .MuiAutocomplete-endAdornment':{
    top:"unset"
  }
}))
const CustomTextField = styledCustom(TextField)(({ theme }) => ({
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
const CustomButtonModal = styledCustom(Button)(({ theme }) => ({
  background: theme.status.primary,
}));
const CustomButtonModalGray = styledCustom(Button)(({ theme }) => ({
  background: theme.status.darkgray,
}));
const CustomButton = styled(Button)(({ theme }) => ({
  color: theme.status.primary,
}));
const CustomButtonGray = styled(Button)(({ theme }) => ({
  background: theme.status.darkgray,
}));
// const CustomDynamicMUIDataTable = styled(DynamicMUIDataTable)(({theme})=>({
//     ".MuiPaper-root":{
//       boxShadow: "none"
//     }
// }));
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
console.log("rawdata",rawData[0].merek)
function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    'aria-controls': `simple-tabpanel-${index}`,
  };
}
function Odc(props) {
  const {data,otpVerificationSuccessfull} = props

  const {rawData} = data;
  // console.log("data",data)
  // let MUIDataTable = (typeof window !== 'undefined')? import('mui-datatables'):undefined;


  const SafeHydrate = ({ children }) =>{
    return (
      <div suppressHydrationWarning>
        {typeof window === 'undefined' ? null : children}
      </div>
    )
  }
  // const datatable = [["test","test",'test','test','test']]
  // const options = {
  //   filterType: "checkbox",
  //   rowsPerPage: [3],
  //   rowsPerPageOptions: [1, 3, 5, 6],
  //   jumpToPage: true,
  //   textLabels: {
  //     pagination: {
  //       next: "Next >",
  //       previous: "< Previous",
  //       rowsPerPage: "Total items Per Page",
  //       displayRows: "OF",
  //     },
  //   },
  //   onChangePage(currentPage) {
  //     console.log({ currentPage });
  //   },
  //   onChangeRowsPerPage(numberOfRows) {
  //     console.log({ numberOfRows });
  //   },
  // };
  useEffect(()=>{
    otpVerificationSuccessfull()
  },[])
  const getMuiTheme = () =>
  createTheme({
    // components: {
      
    //   MuiPaper:{
    //     styleOverrides:{
    //       root:{
    //         boxShadow:"none!important"
    //       }
    //     }
    //   },
    //   MUIDataTableBodyCell: {
    //     styleOverrides:{
    //       root: {
    //         whiteSpace: "nowrap"
    //       },
    //     }
    //   },
    //   // MUIDataTablePagination: {
    //   //   root: {
    //   //     backgroundColor: "#000",
    //   //     color: "#fff",
    //   //   },
    //   // },
    // },
    status: {
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
      // MUIDataTablePagination: {
      //   root: {
      //     backgroundColor: "#000",
      //     color: "#fff",
      //   },
      // },
    },
  });
  const [open, setOpen] = React.useState(false);
  const [openDeleteRowModal, setOpenDeleteRowModal] = React.useState(false);
  const [datatable, setDatatable] = React.useState([[]])
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);
    const deleteRowHandleOpen = () => setOpenDeleteRowModal(true);
    const deleteRowHandleClose = () => setOpenDeleteRowModal(false);
    const [value, setValue] = React.useState(0);
    console.log("openDeleteRowModal",openDeleteRowModal)
    const handleChange = (event, newValue) => {
      setValue(newValue);
    };

    React.useEffect(()=>{
    
        // console.log("odc",odc_edit_modal.current,document.querySelector('[itemref="testing"]'))
        setTimeout(()=>{
          // console.log("odc",document.querySelector('[itemref="odcDetailModal"]'))
          if(document.querySelector('[itemref="odcDetailModal"]'))
          document.querySelector('[itemref="odcDetailModal"]').style.top = "50%";
          if(document.querySelector('[itemref="odcDeleteModal"]'))
          document.querySelector('[itemref="odcDeleteModal"]').style.top = "50%";
        },50)
      setDatatable(rawData.map(item=>([
        item.id,item.capacity,
        `idle: ${item.feeder.idle} | used: ${item.feeder.used} | broken: ${item.feeder.broken}`,
        `idle: ${item.distribution.idle} | used: ${item.distribution.used} | broken: ${item.distribution.broken}`,
        <div key={0} className={styles.tableAction}>
              <Link href={`/odc/${item.id}`} passHref>
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
                          <h4 className={styles.cardTitle}>{item.id.toUpperCase()}</h4>
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
                          <CustomButtonModalGray onClick={(ev)=>handleChange(ev,value-1)}
                            style={{visibility:(value<=0)?"hidden":"visible"}} variant="contained" color='primary'
                            size="large">
                            Prev
                          </CustomButtonModalGray>
                          <div className='row'>
                            <div className='col-md-12 col-lg-6'>
                              {(value>0) && <CustomButtonModal onClick={(ev)=>
                                (value>0)?handleOpen:handleChange(ev,value+1)} variant="contained" color='primary'
                                size="large">
                                Submit
                              </CustomButtonModal>}
                            </div>
                            <div className='col-md-12 col-lg-6'>
                              {(value>0) && <CustomButtonGray onClick={()=>handleClose()} variant="contained"
                                color='primary' size="large">
                                Cancel
                              </CustomButtonGray>}
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
                                    <CustomButtonModal>
                                      {"Submit"}
                                    </CustomButtonModal>
                                  </div>
                                  <div >
                                    <CustomButtonModalGray onClick={()=>deleteRowHandleClose()}>
                                      {"Cancel"}
                                    </CustomButtonModalGray>
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
  const [tagPickerValue, setTagPickerValue] = useState([]);
  const onDelete = (title) => () => {
    setTagPickerValue((value) => value.filter((v) => v.title !== title));
  };
  console.log("data transform",datatable)
  return (<div className={styles.mainContent}>
    <div className={`container-fluid`}>
        <div className='row'>
          <div className="col-lg-4 col-md-6 col-sm-6">
            <div className={`${styles.card} ${styles.cardStats}`}>
              <div className={`${styles.cardHeader} ${styles.cardHeaderWarning}  ${styles.cardHeaderIcon}`}>
                <div className={styles.cardIcon}>
                <MdInventory/>
                </div>
                <p className={styles.cardCategory}>Total ODC (unit)</p>
                <h3 className={styles.cardTitle}>250</h3>
              </div>
              <div className={styles.cardFooter}>
                <div className={styles.stats}>
                  <MdOutlineDateRange /> Last 24 Hours
                </div>
              </div>
            </div>
          </div>
          <div className="col-lg-4 col-md-6 col-sm-6">
            <div className={`${styles.card} ${styles.cardStats}`}>
              <div className={`${styles.cardHeader} ${styles.cardHeaderSuccess}  ${styles.cardHeaderIcon}`}>
                <div className={styles.cardIcon}>
                <MdSettingsInputComposite/>
                </div>
                <p className={styles.cardCategory}>Used Feeder (ports)</p>
                <h3 className={styles.cardTitle}>1.2k</h3>
              </div>
              <div className={styles.cardFooter}>
                <div className={styles.stats}>
                  <MdOutlineDateRange /> Last 24 Hours
                </div>
              </div>
            </div>
          </div>
          <div className="col-lg-4 col-md-6 col-sm-6">
            <div className={`${styles.card} ${styles.cardStats}`}>
              <div className={`${styles.cardHeader} ${styles.cardHeaderInfo}  ${styles.cardHeaderIcon}`}>
                <div className={styles.cardIcon}>
                <MdSettingsInputComposite/>
                </div>
                <p className={styles.cardCategory}>Used Distribution (ports)</p>
                <h3 className={styles.cardTitle}>20k</h3>
              </div>
              <div className={styles.cardFooter}>
                <div className={styles.stats}>
                  <MdOutlineDateRange width={16} height={"auto"} /> Last 24 Hours
                </div>
              </div>
            </div>
          </div>
          <div className="col-lg-12 col-md-12">
            <div className={`${styles.card}`}>
              <div className={`${styles.cardHeader} ${styles.cardHeaderPrimary}`}>
                <h4 className={styles.cardTitle}>All ODCs</h4>
                {/* <div className={styles.stats}>
                  <MdOutlineDateRange width={16} height={"auto"} /> Last 24 Hours
                </div> */}
              </div>
              <div className="card-body table-responsive">
                  {/* <Chip label="tauah gelap" /> */}
                {/* autotagcompletion */}
{/* 
                <div className={styles.autoTagContainer}>
                {tagPickerValue.map((v) => (
                  <DynamicChip key={v.title} label={v.title} onDelete={onDelete(v.title)} />
                ))}
                <ThemeProvider theme={tema}>
                <Box sx={{ width: "100%",minWidth: 300 }}>
                <CustomAutocomplete
                  multiple
                  options={top100Films}
                  defaultValue={[top100Films[13]]}
                  getOptionLabel={(option) => option.title}
                  value={tagPickerValue}
                  onChange={(e, newTagPickerValue) => setTagPickerValue(newTagPickerValue)}
                  renderTags={() => null}
                  renderInput={(params) => (
                    <CustomTextField {...params} placeholder="Favorites" />
                  )}
                />
                </Box>
                </ThemeProvider>

                </div> */}


              {/* <SafeHydrate> */}
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

                {/* </SafeHydrate> */}
              </div>
            </div>
          </div>
      </div>
    </div>
  </div>
  )
}
export const getServerSideProps = async (props) => wrapper.getServerSideProps(store => async ({req, res, ...etc}) => {
  // const { token } = /authUserToken=(?<token>\S+)/g.exec(req.headers.cookie)?.groups || {token: ""} ;
  store.dispatch(getODCsBox())
  // store.dispatch(getSplitterData())
  // store.dispatch(getCoreFeederInfo())
  console.log("static props",store.getState())
  store.dispatch(END)
  await store.sagaTask.toPromise();
  // console.log("store",store.getState().ODCs.odcsBox,req,res)
  // const {params:{odcId}} = props;
  // const {ODCs:{odcsBox=[],splitterData=[],coreFeederData=[]}} = store.getState();
  // console.log("store",odcsBox.filter(item=>item?.odc?.id == odcId))
  // console.log("store",splitterData)
  // console.log("core feeder",coreFeederData)
      // if(odcsBox.filter(item=>item?.odc?.id == odcId).length==0){
      //     return {
      //         notFound: true
      //     }
      // }
      // else{
      //     return {
      //         props:{ data: odcsBox,splitterData,coreFeederData},
      //         // revalidate:60,
      //     } 

      // }
      return {
        props:{data:{rawData}}
      }
    })(props);
    const mapStateToProps = state => ({
      // dataClient:state?.ODCs?.odcsBox,
      // loading: state.ODCs.loading.get,
      // selectedCoreFeeder:state.ODCs.client.selectedCoreFeeder,
      // coreFeederDataClient: state.ODCs.client.coreFeederData,
  });
  const mapFunctionToProps = {
    otpVerificationSuccessfull,
    getODCsBox
      // getSplitterData,
      // getCoreFeederInfo,
      // updateCoreFeederInfo,
      // updateSplitterDistributionInfo,
      // getODCsBox,
      // setSelectedCoreFeeder
  }
  const top100Films = [
    { title: 'The Shawshank Redemption', year: 1994 },
    { title: 'The Godfather', year: 1972 },
    { title: 'The Godfather: Part II', year: 1974 },
    { title: 'The Dark Knight', year: 2008 },
    { title: '12 Angry Men', year: 1957 },
    { title: "Schindler's List", year: 1993 },
    { title: 'Pulp Fiction', year: 1994 },
    { title: 'The Lord of the Rings: The Return of the King', year: 2003 },
    { title: 'The Good, the Bad and the Ugly', year: 1966 },
    { title: 'Fight Club', year: 1999 },
    { title: 'The Lord of the Rings: The Fellowship of the Ring', year: 2001 },
    { title: 'Star Wars: Episode V - The Empire Strikes Back', year: 1980 },
    { title: 'Forrest Gump', year: 1994 },
    { title: 'Inception', year: 2010 },
    { title: 'The Lord of the Rings: The Two Towers', year: 2002 },
    { title: "One Flew Over the Cuckoo's Nest", year: 1975 },
    { title: 'Goodfellas', year: 1990 },
    { title: 'The Matrix', year: 1999 },
    { title: 'Seven Samurai', year: 1954 },
    { title: 'Star Wars: Episode IV - A New Hope', year: 1977 },
    { title: 'City of God', year: 2002 },
    { title: 'Se7en', year: 1995 },
    { title: 'The Silence of the Lambs', year: 1991 },
    { title: "It's a Wonderful Life", year: 1946 },
    { title: 'Life Is Beautiful', year: 1997 },
    { title: 'The Usual Suspects', year: 1995 },
    { title: 'Léon: The Professional', year: 1994 },
    { title: 'Spirited Away', year: 2001 },
    { title: 'Saving Private Ryan', year: 1998 },
    { title: 'Once Upon a Time in the West', year: 1968 },
    { title: 'American History X', year: 1998 },
    { title: 'Interstellar', year: 2014 },
    { title: 'Casablanca', year: 1942 },
    { title: 'City Lights', year: 1931 },
    { title: 'Psycho', year: 1960 },
    { title: 'The Green Mile', year: 1999 },
    { title: 'The Intouchables', year: 2011 },
    { title: 'Modern Times', year: 1936 },
    { title: 'Raiders of the Lost Ark', year: 1981 },
    { title: 'Rear Window', year: 1954 },
    { title: 'The Pianist', year: 2002 },
    { title: 'The Departed', year: 2006 },
    { title: 'Terminator 2: Judgment Day', year: 1991 },
    { title: 'Back to the Future', year: 1985 },
    { title: 'Whiplash', year: 2014 },
    { title: 'Gladiator', year: 2000 },
    { title: 'Memento', year: 2000 },
    { title: 'The Prestige', year: 2006 },
    { title: 'The Lion King', year: 1994 },
    { title: 'Apocalypse Now', year: 1979 },
    { title: 'Alien', year: 1979 },
    { title: 'Sunset Boulevard', year: 1950 },
    {
      title:
        'Dr. Strangelove or: How I Learned to Stop Worrying and Love the Bomb',
      year: 1964,
    },
    { title: 'The Great Dictator', year: 1940 },
    { title: 'Cinema Paradiso', year: 1988 },
    { title: 'The Lives of Others', year: 2006 },
    { title: 'Grave of the Fireflies', year: 1988 },
    { title: 'Paths of Glory', year: 1957 },
    { title: 'Django Unchained', year: 2012 },
    { title: 'The Shining', year: 1980 },
    { title: 'WALL·E', year: 2008 },
    { title: 'American Beauty', year: 1999 },
    { title: 'The Dark Knight Rises', year: 2012 },
    { title: 'Princess Mononoke', year: 1997 },
    { title: 'Aliens', year: 1986 },
    { title: 'Oldboy', year: 2003 },
    { title: 'Once Upon a Time in America', year: 1984 },
    { title: 'Witness for the Prosecution', year: 1957 },
    { title: 'Das Boot', year: 1981 },
    { title: 'Citizen Kane', year: 1941 },
    { title: 'North by Northwest', year: 1959 },
    { title: 'Vertigo', year: 1958 },
    { title: 'Star Wars: Episode VI - Return of the Jedi', year: 1983 },
    { title: 'Reservoir Dogs', year: 1992 },
    { title: 'Braveheart', year: 1995 },
    { title: 'M', year: 1931 },
    { title: 'Requiem for a Dream', year: 2000 },
    { title: 'Amélie', year: 2001 },
    { title: 'A Clockwork Orange', year: 1971 },
    { title: 'Like Stars on Earth', year: 2007 },
    { title: 'Taxi Driver', year: 1976 },
    { title: 'Lawrence of Arabia', year: 1962 },
    { title: 'Double Indemnity', year: 1944 },
    { title: 'Eternal Sunshine of the Spotless Mind', year: 2004 },
    { title: 'Amadeus', year: 1984 },
    { title: 'To Kill a Mockingbird', year: 1962 },
    { title: 'Toy Story 3', year: 2010 },
    { title: 'Logan', year: 2017 },
    { title: 'Full Metal Jacket', year: 1987 },
    { title: 'Dangal', year: 2016 },
    { title: 'The Sting', year: 1973 },
    { title: '2001: A Space Odyssey', year: 1968 },
    { title: "Singin' in the Rain", year: 1952 },
    { title: 'Toy Story', year: 1995 },
    { title: 'Bicycle Thieves', year: 1948 },
    { title: 'The Kid', year: 1921 },
    { title: 'Inglourious Basterds', year: 2009 },
    { title: 'Snatch', year: 2000 },
    { title: '3 Idiots', year: 2009 },
    { title: 'Monty Python and the Holy Grail', year: 1975 },
  ];
  export default connect(mapStateToProps,mapFunctionToProps)(withAuth(Odc));