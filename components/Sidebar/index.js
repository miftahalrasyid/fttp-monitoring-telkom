import React,{useRef,useEffect} from 'react';
import SimpleBar from 'simplebar-react';
import 'simplebar/dist/simplebar.min.css';
import {
  Modal,
  Box,
Typography,
Button
} from "@material-ui/core";
// import { createTheme } from '@material-ui/core/styles';
import dynamic from 'next/dynamic';

import MetisMenu from '@metismenu/react';
import 'metismenujs/dist/metismenujs.css';
import Link from 'next/link';
import {NavLink} from './components/NavLink';
import Image from 'next/image';
import {useRouter} from 'next/router'

// import MetisMenu css
import odcStyles from '../../pages/odc/odc.module.css';
import styles from './sidebar.module.css';
import home from './home.svg';
import {
  MdDashboard,
  MdPerson,
  MdOutlineAddBox,
  MdOutlineClose,
  MdExitToApp
} from 'react-icons/md';
import TextField from '@mui/material/TextField';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
// import Button from '@mui/material/Button';
import { createTheme, ThemeProvider, styled } from '@mui/material/styles';
const CustomTab = styled(Tab)(({theme})=>({
  color:"gray!important",
  '&.MuiTab-root.Mui-selected': {
    color: "black!important"
  },
}))
const CustomButtonModal = styled(Button)(({ theme }) => ({
  background: theme.status.primary,
}));
const CustomTabs = styled(Tabs)(({theme})=>({
  '.MuiTabs-indicator': {
    backgroundColor: theme.status.primary,
  },
}))
function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 3 }}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}
function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    'aria-controls': `simple-tabpanel-${index}`,
  };
}
const CustomTextField = styled(TextField)(({ theme }) => ({
  color: theme.status.primary,
  '.MuiInputLabel-root.Mui-focused': {
    color: theme.status.primary,
  },
  '.MuiInput-root::after': {
    borderColor: theme.status.primary
  },
}));
const CustomButton = styled(Button)(({ theme }) => ({
  background: theme.status.primary,
}));
const CustomButtonGray = styled(Button)(({ theme }) => ({
  background: theme.status.darkgray,
}));

const theme = createTheme({
  status: {
    primary: "#ee2d24!important",
    darkgray: "darkgray!important"
  },
});
// const theme = responsiveFontSizes(base);
// console.log("theme",theme, CustomTextField)
function Sidebar() {
  const [value, setValue] = React.useState(0);
  const handleChange = (event, newValue) => {
    setValue(newValue);
  };
  const router = useRouter();
  console.log("sidebar", router.asPath)
  const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
  };
    const [open, setOpen] = React.useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);
    const mm = useRef();
    useEffect(()=>{
        mm.current.el.classList.add("list-unstyled")
        mm.current.el.id = "side-menu"
    },[])
    useEffect(()=>{
    
      // console.log("odc",odc_edit_modal.current,document.querySelector('[itemref="testing"]'))
      setTimeout(()=>{
        console.log("odc",document.querySelector('[itemref="addOdcSidbarModal"]'))
        if(document.querySelector('[itemref="addOdcSidbarModal"]'))
        document.querySelector('[itemref="addOdcSidbarModal"]').style.top = "50%";
      },50)
    },[open])
  return (
    <div className={`${styles.verticalMenu}`}>
        <div className={styles.sidebarLogo}>
        <div className={styles.navbarBrandBox}>
              <Link href={"/"} passHref>
                <a className={styles.logo}>
                  <span className={styles.logoLg}>
                    <span className={styles.logoImg}>
                      <Image src="/img/telkom logo.png" alt="logo" width={35} height={35}/>
                    </span>
                    <span className={styles.logoTxt}> Telkom Indonesia</span>
                  </span>
                </a>
              </Link>
            </div>    
        </div>
        <SimpleBar className={styles.h100}>
          <div id={styles.sidebarMenu}>
            <MetisMenu ref={mm}>
              <li className={styles.menuTitle} data-key="t-menu">Menu</li>
              <li>
                <Link href="/odc" exact passHref>
                <a className={/\/odc/.test(router.asPath)?styles.active:""}>
                  <MdDashboard className={styles.sidebarSvg} />
                  <span data-key="t-dashboard">Dashboard</span>
                </a>
                </Link>
              </li>
              <li>
                <Link href="/users" exact passHref>
                <a className={/\/users/.test(router.asPath)?styles.active:""}>
                  <MdPerson className={styles.sidebarSvg} />
                  <span data-key="t-dashboard">Users</span>
                </a>
                </Link>
              </li>
              <li className={styles.menuTitle} data-key="t-action">Action</li>
              <li>
                <div className={styles.action}>
                  <Button onClick={handleOpen} variant="outlined" color='primary' size="large">
                    <MdOutlineAddBox/> Tambah ODC
                  </Button>
                </div>
              </li>
              <Modal open={open} onClose={handleClose} aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description">
                 <div>
                  <div className={styles.closebtn}>
                    <MdOutlineClose/>
                  </div>
                  <Box itemRef='addOdcSidbarModal' sx={{
                    position: "absolute",
                    top: "48%",
                    left: "50%",
                    transform: "translate(-50%, -50%)",
                    border: 0,
                    /* margin-bottom: 30px;
                    margin-top: 30px; */
                    borderRadius: "6px",
                    color: "#333",
                    background: "#fff",
                    transition: "all 0.3s ease-out",
                    width:"90%",
                    maxWidth: "600px",
                    // boxShadow: "0 2px 2px 0 rgb(0 0 0 / 14%), 0 3px 1px -2px rgb(0 0 0 / 20%), 0 1px 5px 0 rgb(0 0 0 / 12%)",
                    // boxShadow: "0 1px 4px 0 rgb(0 0 0 / 14%)",
                  }}>
                  {/* <Box sx={styles.card}> */}
                    <div className={`${styles.card}`}>
                      <div className={`${styles.cardHeader} ${styles.cardHeaderPrimary}`}>
                        <h4 className={styles.cardTitle}>Tambah ODC</h4>
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
                      <div
                        role="tabpanel"
                        hidden={value !== 0}
                        id={`simple-tabpanel-${0}`}
                        aria-labelledby={`simple-tab-${0}`}
                        // {...other}
                      >
                        {value === 0 && (
                          <div className='row'>
                            {/* <Typography> */}
                              <div className={`col-lg-6 col-md-12 ${styles.dFlex} ${styles.textFieldContainer}`}>
                                <CustomTextField id="standard-basic" label="ID" variant="standard" />
                              </div>
                              <div className={`col-lg-6 col-md-12 ${styles.dFlex} ${styles.textFieldContainer}`}>
                                <CustomTextField id="standard-basic" label="Kapasitas" variant="standard" />
                              </div>
                              <div className={`col-lg-6 col-md-12 ${styles.dFlex} ${styles.textFieldContainer}`}>
                                <CustomTextField id="standard-basic" label="Merek" variant="standard" />
                              </div>
                              <div className={`col-lg-6 col-md-12 ${styles.dFlex} ${styles.textFieldContainer}`}>
                                <CustomTextField id="standard-basic" label="Deployment Date" color='primary'
                                  variant="standard" />
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
                          <div className='row'>
                          {/* <Typography> */}
                            <div className={`col-lg-6 col-md-12 ${styles.dFlex} ${styles.textFieldContainer}`}>
                              <CustomTextField id="standard-basic" label="Core" variant="standard" />
                            </div>
                            <div className={`col-lg-6 col-md-12 ${styles.dFlex} ${styles.textFieldContainer}`}>
                              <CustomTextField id="standard-basic" label="Rak OA" variant="standard" />
                            </div>
                            <div className={`col-lg-6 col-md-12 ${styles.dFlex} ${styles.textFieldContainer}`}>
                              <CustomTextField id="standard-basic" label="Panel" variant="standard" />
                            </div>
                            <div className={`col-lg-6 col-md-12 ${styles.dFlex} ${styles.textFieldContainer}`}>
                              <CustomTextField id="standard-basic" label="Port" color='primary'
                                variant="standard" />
                            </div>
                          {/* </Typography> */}
                        </div>
                        )}
                      </div>
                      
                      </div>
                      <div className={odcStyles.actionContainer}>
                    <CustomButtonGray onClick={(ev)=>handleChange(ev,value-1)} style={{visibility:(value<=0)?"hidden":"visible"}} variant="contained" color='primary' size="large">
                    Prev
                  </CustomButtonGray>
                  <div className='row'>
                    <div className='col-md-12 col-lg-6'> 
                    {(value>0) && <CustomButtonModal onClick={(ev)=>(value>0)?handleOpen:handleChange(ev,value+1)}  variant="contained" color='primary' size="large">
                      Submit
                      </CustomButtonModal>}
                    </div>
                    <div className='col-md-12 col-lg-6'> 
                    {(value>0) && <CustomButtonGray onClick={()=>handleClose()}  variant="contained" color='primary' size="large">
                        Cancel
                        </CustomButtonGray>}
                    </div>
                  </div>
                  <div>

                   <CustomButtonModal style={{visibility: (value>0)?"hidden":"visible"}} onClick={(ev)=>(value>0)?handleOpen:handleChange(ev,value+1)}  variant="contained" color='primary' size="large">
                   {(value<=0)? "Next":""}
                  </CustomButtonModal>
                  </div>
                    </div>
                    </div>
                  </Box>
                </div>
              </Modal>
              <li className={styles.logout}>
                <div className={styles.logoutDiv}>
                  <Button onClick={()=>{
                    router.push("/")
                    }}
                    variant="outlined"
                    
                    color='primary'
                    size="large">
                    <MdExitToApp/> Sign Out
                  </Button>
                </div>
              </li>

            </MetisMenu>
          </div>
        </SimpleBar>
        <div className={styles.sidebarBackground}></div>
    </div>
  )
}

export default Sidebar