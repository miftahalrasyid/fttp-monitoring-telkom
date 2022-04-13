import React,{useEffect,useState} from 'react';
import Link from 'next/link';
import Image from 'next/image';
import sidebar_img from '../../public/img/sidebarImg.png';
import SimpleBar from 'simplebar-react';
import 'simplebar/dist/simplebar.min.css';
import odcStyles from '../../pages/odc/odc.module.css';
import home from '../../public/img/Home.png';
import {MdOutlineClose} from 'react-icons/md';
import {IoPersonCircleOutline} from 'react-icons/io5';
import styles from './sidebar_evolve.module.css';
import { createTheme, ThemeProvider, styled } from '@mui/material/styles';
import jwt from 'jwt-decode';
import {
  NativeSelect,
  InputLabel,
  Button,
  Box,
  Modal
  } from "@material-ui/core";
  import {useRouter} from 'next/router';
import { makeStyles } from '@material-ui/styles';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import TextField from '@mui/material/TextField';
const CustomTextField = styled(TextField)(({ theme }) => ({
    color: theme.status.primary,
    '.MuiInputLabel-root.Mui-focused': {
      color: theme.status.primary,
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
    // backgroundColor:"#009873!important",
    // color:"white!important",
    // borderRadius:"2rem!important"
}))
const CustomButtonModal = styled(Button)(({ theme, btnType }) => ({
    background: btnType == 'submit' ? '#1ebc51!important':theme.status.primary,
  }));
  function a11yProps(index) {
    return {
      id: `simple-tab-${index}`,
      'aria-controls': `simple-tabpanel-${index}`,
    };
  }
function Index_evolve() {
    const router = useRouter();
    const [open, setOpen] = useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);
    const [value, setValue] = React.useState(0);
    const handleChange = (event, newValue) => {
        setValue(newValue);
      };
      
    const useStyles = makeStyles(theme => ({
        green: {
            backgroundColor:"#009873!important",
            color:"white!important",
            width:"170px",
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
      useEffect(()=>{
    
        // console.log("odc",odc_edit_modal.current,document.querySelector('[itemref="testing"]'))
        setTimeout(()=>{
          console.log("odc",document.querySelector('[itemref="addOdcSidbarModal"]'))
          if(document.querySelector('[itemref="addOdcSidbarModal"]'))
          document.querySelector('[itemref="addOdcSidbarModal"]').style.top = "50%";
        },50)
      },[open])
      const getCookie = (cname)=> {
        let name = cname + "=";
        let decodedCookie = (typeof window !== "undefined") ? decodeURIComponent(document.cookie) : "";
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
      if(typeof window !== 'undefined' && typeof document !== 'undefined'){
        console.log("document",typeof document)

        console.log("token",document.cookie)
      }
      const {role_name} = (typeof window !== 'undefined') ? jwt(getCookie("token")): { role_name: ""}
      // const {role_name} = jwt(getCookie("token"));
  return (
    <div className={`${styles.verticalMenu}`}>
    <div className={styles.sidebarLogo}>
    <div className={styles.navbarBrandBox}>
          <Link href={"/"} passHref>
            <a className={styles.logo}>
              <span className={styles.logoLg}>
                <span className={styles.logoImg}>
                  <Image src="/img/logo_paperless.png" alt="logo" width={156} height={110}/>
                </span>
              </span>
            </a>
          </Link>
        </div>    
    </div>
    <SimpleBar className={styles.simplebar}>
    {/* <SimpleBar className={styles.h100}> */}

      <div id={styles.sidebarMenu}>
        <ul>
            <li>
                <Link href={"/odc"}>
                    <a>
                        <div className={styles.menuList}>
                            <div className={styles.menuIcon}>
                                <Image src={home} width={27} height={27} alt={"home"}/>
                            </div>
                            <p>Home</p>
                        </div>
                        <div className={/\/odc/.test(router.asPath)?styles.bullet:""}></div>
                    </a>
                </Link>
            </li>
            {(role_name==="Admin") && <li>
              <Link href="/users">
                <a>
                  <div className={styles.menuList}>
                    <div className={styles.menuIcon}>
                      <IoPersonCircleOutline className={styles.sidebarSvg} />
                    </div>
                    <p>Users</p>
                  </div>
                  <div className={/\/users/.test(router.asPath)?styles.bullet:""}></div>
                </a>
              </Link>
            </li>}
            
        </ul>
      </div>
    </SimpleBar>
      <div className={styles.action}>
          <div className={styles.sidebarImage}>
              <Image src={sidebar_img} width={180} height={210} alt={'sidebar_img'}/>
          </div>
          <p>Action</p>
          <div className={styles.actionBtn}>

          <p>

            <CustomButton className={classes.green} onClick={handleOpen} variant='contained' > Tambah ODC</CustomButton>
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
                          <CustomTab label="ODC" {...a11yProps(0)} />
                          <CustomTab label="OA" {...a11yProps(1)} />
                        </CustomTabs>
                      </div>
                      <div
                        className={styles.spacer}
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
                                  <CustomTextField id="standard-basic" label="Nama ODC" variant="standard" />
                                </div>
                                <div className={`col-lg-6 col-md-12 ${styles.dFlex} ${styles.textFieldContainer}`}>
                                  <CustomTextField id="standard-basic" label="Regional" variant="standard" />
                                </div>
                                <div className={`col-lg-6 col-md-12 ${styles.dFlex} ${styles.textFieldContainer}`}>
                                  <CustomTextField id="standard-basic" label="WITEL" variant="standard" />
                                </div>
                                <div className={`col-lg-6 col-md-12 ${styles.dFlex} ${styles.textFieldContainer}`}>
                                  <CustomTextField id="standard-basic" label="DATEL" variant="standard" />
                                </div>
                                <div className={`col-lg-6 col-md-12 ${styles.dFlex} ${styles.textFieldContainer}`}>
                                  <CustomTextField id="standard-basic" label="STO" variant="standard" />
                                </div>
                                <div className={`col-lg-6 col-md-12 ${styles.dFlex} ${styles.textFieldContainer}`}>
                                  <CustomTextField id="standard-basic" label="Kapasitas" variant="standard" />
                                </div>
                                <div className={`col-lg-6 col-md-12 ${styles.dFlex} ${styles.textFieldContainer}`}>
                                  <CustomTextField id="standard-basic" label="Merek" variant="standard" />
                                </div>
                                <div className={`col-lg-6 col-md-12 ${styles.dFlex} ${styles.textFieldContainer}`}>
                                <InputLabel variant="standard" htmlFor="uncontrolled-native">
                                    Splitter Position
                                  </InputLabel>
                                  <NativeSelect
                                    defaultValue={10}
                                    inputProps={{
                                      name: 'age',
                                      id: 'uncontrolled-native',
                                    }}
                                  >
                                    <option value={10}>top left</option>
                                    <option value={20}>top right</option>
                                    <option value={30}>top center</option>
                                    <option value={40}>bottom center</option>
                                    <option value={50}>bottom left</option>
                                    <option value={60}>bottom right</option>
                                  </NativeSelect>
                                  {/* <CustomTextField id="standard-basic" label="Splitter Position" variant="standard" /> */}
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
                                    variant="standard" />
                                </div>
                            {/* </Typography> */}
                          </div>
                        )}
                      </div>
                      <div
                        className={styles.spacer}
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
                                <CustomTextField id="standard-basic" label="Port Feeder Terminasi" variant="standard" />
                              </div>
                              <div className={`col-lg-6 col-md-12 ${styles.dFlex} ${styles.textFieldContainer}`}>
                                <CustomTextField id="standard-basic" label="Rak OA" variant="standard" />
                              </div>
                              <div className={`col-lg-6 col-md-12 ${styles.dFlex} ${styles.textFieldContainer}`}>
                                <CustomTextField id="standard-basic" label="Panel" variant="standard" />
                              </div>
                              <div className={`col-lg-6 col-md-12 ${styles.dFlex} ${styles.textFieldContainer}`}>
                                <CustomTextField id="standard-basic" label="Port" color='primary'
                                  variant="standard"/>
                              </div>
                          {/* </Typography> */}
                        </div>
                        )}
                      </div>
                      
                      </div>
                      <div className={odcStyles.actionContainer}>
                    <CustomButtonModal onClick={(ev)=>handleChange(ev,value-1)} style={{visibility:(value<=0)?"hidden":"visible"}} variant="contained" color='primary' size="large">
                    Prev
                  </CustomButtonModal>
                  <div className='row'>
                    <div className='col-md-12 col-lg-6'> 
                    {(value>0) && <CustomButtonModal btnType={"submit"} onClick={(ev)=>(value>0)?handleOpen:handleChange(ev,value+1)}  variant="contained" color='primary' size="large">
                      Submit
                      </CustomButtonModal>}
                    </div>
                    <div className='col-md-12 col-lg-6'> 
                    {(value>0) && <CustomButtonModal onClick={()=>handleClose()}  variant="contained" color='primary' size="large">
                        Cancel
                        </CustomButtonModal>}
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
        </p>
        <p>
            <CustomButton className={classes.red} onClick={()=>{
                    router.push("/")
                    }} variant='contained' > Sign Out</CustomButton>
        </p>
          </div>
      </div>
      <div className={styles.footer}>
        <p>© 2022 Telkom Indonesia, Tbk. All rights reserved</p>
      </div>
    {/* <div className={styles.sidebarBackground}></div> */}
</div>
  )
}

export default Index_evolve