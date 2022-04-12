import React,{useCallback, useState,useEffect, useRef} from 'react';
import styles from './navbar.module.css';
import { MdMenu } from 'react-icons/md';
// import {
//   Button,
// } from "@material-ui/core";
import Image from 'next/image';
import Link from 'next/link';
import {Modal,Box,FormControl,InputLabel,NativeSelect} from '@material-ui/core';
import { 
  styled as styledCustom
} from "@mui/material/styles";
import { connect } from 'react-redux';
import { END} from 'redux-saga';
import { FaBars } from 'react-icons/fa';
import indexStyles from './index.module.css';
import odcStyles from '../../pages/odc/odc.module.css';
import {useRouter} from 'next/router';
import jwt from 'jwt-decode';
import {
Button
} from "@material-ui/core";
import {
  MdOutlineClose,
  MdKeyboardArrowLeft
} from 'react-icons/md';
import {
  IoPersonCircleSharp
} from 'react-icons/io5';
import {
  BsFillFilePersonFill
} from 'react-icons/bs';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import TextField from '@mui/material/TextField';
// import {
//   MdOutlineAddBox,
// } from 'react-icons/md';
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
const CustomTextField = styledCustom(TextField)((props) => ({
  // test:console.log("customText field",props),
  color: props.theme.status.primary,
  '.MuiInputLabel-root.Mui-focused': {
    color: props.theme.status.primary,
  },
  '.MuiInput-root input':{
    textTransform: props.id == "odcName" ? "uppercase" : "none"
  },
  '.MuiOutlinedInput-notchedOutline': {
    border: "none!important",
    // borderColor: theme.status.primary
  },
  '.MuiInput-root::after': {
    borderColor: props.theme.status.primary
  },
}));
const CustomButtonModal = styledCustom(Button)(({ theme, btnType }) => ({
  background: btnType == 'submit' ? '#1ebc51!important':theme.status.primary,
}));
const CustomButtonEdit= styledCustom(Button)(({ theme }) => ({
  borderColor: theme.status.primary,
  color: theme.status.primary,
}));
const CustomButtonStatus= styledCustom(Button)(({ theme }) => ({
  borderColor: theme.status.success,
  color: theme.status.success,
}));
const CustomButtonActivityLog= styledCustom(Button)(({ theme }) => ({
  borderColor: theme.status.warning,
  color: theme.status.warning,
}));
const CustomButtonDownload= styledCustom(Button)(({ theme }) => ({
  borderColor: theme.status.info,
  color: theme.status.info,
}));
const CustomButtonModalGray = styledCustom(Button)(({ theme }) => ({
  background: theme.status.darkgray,
}));
const CustomInputLabel = styledCustom(InputLabel)(({ theme }) => ({
  '&.Mui-focused':{
    color: theme.status.primary,

  }
}));
function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    'aria-controls': `simple-tabpanel-${index}`,
  };
}
/**
 * navbar
 */

function Navbar(props) {
  const odc_edit_modal = useRef(null);
  const { dataClient,odcData } = props;
  // console.log("raw data",dataClient,props)
  const router = useRouter();
  const {odcId,userPath} = router.query;
  const filteredDataclient = (odcId)?dataClient.filter(item=>item.id==odcId[0]):""
  // console.log("query",odcData)
  // console.log("query",userPath,odcId,router)
  const [statMenu,setStatMenu] = useState(false);
  const mainmenuClick = useCallback(event=>{
    setTimeout(()=>{

      setStatMenu(!statMenu)
      event.target.parentNode.parentNode.parentNode.childNodes[event.target.parentNode.parentNode.parentNode.childNodes.length-1].style.opacity="1"
    },333)
    // console.log("event",event.target)
    // console.log(event.target.parentNode.parentNode.parentNode.childNodes)
    event.target.parentNode.parentNode.parentNode.childNodes[event.target.parentNode.parentNode.parentNode.childNodes.length-1].style.display="block"
    if(window.innerWidth<1080){
      event.target.parentNode.parentNode.parentNode.style.transform= statMenu ? "translate3d(0,0,0)": "translate3d(-260px,0,0)";
      if(!statMenu)
        event.target.parentNode.parentNode.parentNode.parentNode.childNodes[0].style.transform=  "none";
      else
        event.target.parentNode.parentNode.parentNode.parentNode.childNodes[0].style.removeProperty('transform');
    }
    // console.log(event.target.parentNode.parentNode.parentNode.childNodes[event.target.parentNode.parentNode.parentNode.childNodes.length-1].style.display="block")
  },[statMenu])

/**
 * modal popup edit
 */
 const [open, setOpen] = React.useState(false);
 const handleOpen = () => setOpen(true);
 const handleClose = () => setOpen(false);
 const [value, setValue] = React.useState(0);
 const handleChange = (event, newValue) => {
   setValue(newValue);
  };
  useEffect(()=>{
    
    console.log("odc",odc_edit_modal.current,document.querySelector('[itemref="testing"]'))
    setTimeout(()=>{
      
      if(document.querySelector('[itemref="testing"]'))
      document.querySelector('[itemref="testing"]').style.top = "50%";
    },50)
  },[open])

  /**
   * modal popup for users page
   */
  const [userModalOpen, setUserModalOpen] = React.useState(false);
  const handleAddUserOpen = () => setUserModalOpen(true);
  const handleAddUserClose = () => setUserModalOpen(false);
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
  const {email,role_name} = jwt(getCookie("token"));
// console.log("odcid",odcId)
  return  <nav id={indexStyles.topBar}>
      {/* <div className='container-fluid'></div> */}
            <div className={indexStyles.navbarBrandBox}>
                  {typeof odcId !== 'object'? 
                  // {typeof odcId !== 'object' || typeof userPath !== 'object'? 
              <Link href={"/"} passHref>
                <a className={indexStyles.logo}>
                    <span className={indexStyles.logoTxt}> {(!odcId)?router.pathname.replace(/(\/.*)?\/(\S+)/,"$2").toUpperCase():odcId[0].toUpperCase()}</span>
                    {/* <span className={indexStyles.logoTxt}> {(!odcId)?router.pathname.replace(/(\/.*)?\/(\S+)/,"$2").toUpperCase():odcId.toUpperCase()}</span> */}
                </a>
              </Link>
             

                :<div>
                  {odcId.reduce((prev, next,idx) => {
                  if(odcId.length-1==idx)
                  return [
                    ...prev.dom,
                      (prev.elm.length === 0) ? [<Link key={"link"+next} href={`/odc/${next}`} passHref>
                        <a className={indexStyles.logo}>
                            <span className={indexStyles.logoTxt}> {next.toUpperCase()}</span>
                        </a>
                        </Link>]:
                      <Link key={"link"+next} href={`/odc/${[...prev.elm,next].join("/")}`} passHref>
                        <a className={indexStyles.logo}>
                            <span className={indexStyles.logoTxt}> {next.toUpperCase()}</span>
                        </a>
                      </Link>
                  ]
                  return {
                    ...prev,
                    dom: [
                      ...prev.dom,
                      (prev.elm.length === 0) ? [<Link href={odcId[odcId.length-2] || ""} key={"arrow"}><a><MdKeyboardArrowLeft /></a></Link>,<Link key={"link"+next} href={`/odc/${next}`} passHref>
                        <a className={indexStyles.logo}>
                            <span className={indexStyles.logoTxt}> {next.toUpperCase()}</span>
                        </a>
                      </Link>,<span key={"p"+next} className={indexStyles.separator}> / </span>]:
                      [<Link key={"link"+next} href={`/odc/${[...prev.elm,next].join("/")}`} passHref>
                        <a className={indexStyles.logo}>
                            <span className={indexStyles.logoTxt}> {next.toUpperCase()}</span>
                        </a>
                        </Link>,<span key={"p"+next} className={indexStyles.separator}> / </span>]
                    ],
                    elm:[
                      ...prev.elm,
                      next
                    ]
                  }
                }
                ,{dom:[],elm:[]})}
                </div>}
                {/* action navbar only show at selected odc */}
                {((odcId || false) && odcId.length==1) ?
                  <div className={indexStyles.odcAction}>
                  <CustomButtonEdit onClick={handleOpen} variant="outlined" color='primary' size="large">
                    {/* <MdOutlineAddBox/>  */}
                    Edit
                  </CustomButtonEdit>


                  {odcData && 
                 <Modal key={odcData.odc_id} open={open} onClose={handleClose} aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description">
                  <div ref={odc_edit_modal}>
                  <div className={odcStyles.closebtn}>
                    <MdOutlineClose/>
                  </div>
                <Box itemRef='testing' sx={{
                  position: "absolute",
                  top: "48%",
                  left: "50%",
                  transition:'all 0.3s ease-out',
                  transform: "translate(-50%, -50%)",
                  border: 0,
                  borderRadius: "6px",
                  color: "#333",
                  width:"90%",
                  maxWidth: "600px",
                  // boxShadow: "0 2px 2px 0 rgb(0 0 0 / 14%), 0 3px 1px -2px rgb(0 0 0 / 20%), 0 1px 5px 0 rgb(0 0 0 / 12%)",
                  // boxShadow: "0 1px 4px 0 rgb(0 0 0 / 14%)",
                }} >
                {/* }} className={` ${open && odcStyles.modalActive}`}> */}
                 
                  <div className={`${odcStyles.card}  ${odcStyles.cardStats}`}>
                    <div className={`${odcStyles.cardHeader} ${odcStyles.cardHeaderPrimary}`}>
                      <h4 className={odcStyles.cardTitle}>{odcData?.odc_id?.toUpperCase()}</h4>
                      <div className={odcStyles.stats}>
                        lengkapi semua isian yang ada
                      </div>
                    </div>
                    <div className={`${odcStyles.cardBody} card-body row`}>
                    <div className={odcStyles.tabLink}>
                      <CustomTabs value={value} onChange={handleChange} aria-label="basic tabs example">
                        <CustomTab label="ODC" {...a11yProps(0)} />
                        <CustomTab label="OA" {...a11yProps(1)} />
                      </CustomTabs>
                    </div>
                    <div className={odcStyles.tabLink}>
                    </div>
                    <div
                      role="tabpanel"
                      hidden={value !== 0}
                      id={`simple-tabpanel-${0}`}
                      aria-labelledby={`simple-tab-${0}`}
                    >
                      {value === 0 && (
                        <div className={`row ${odcStyles.formGap}`}>
                            <div className={`col-lg-6 col-md-12 ${odcStyles.dFlex} ${odcStyles.textFieldContainer}`}>
                              <CustomTextField id="odcName" label="Nama ODC" variant="standard" defaultValue={odcData.odc_id}/>
                            </div>
                            <div className={`col-lg-6 col-md-12 ${odcStyles.dFlex} ${odcStyles.textFieldContainer}`}>
                              <CustomTextField id="standard-basic" label="Kapasitas" variant="standard" defaultValue={odcData.capacity}/>
                            </div>
                            <div className={`col-lg-6 col-md-12 ${odcStyles.dFlex} ${odcStyles.textFieldContainer}`}>
                              <CustomTextField id="standard-basic" label="Merek" variant="standard" defaultValue={odcData.merek}/>
                            </div>
                            <div className={`col-lg-6 col-md-12 ${odcStyles.dFlex} ${odcStyles.textFieldContainer}`}>
                              <CustomTextField id="standard-basic" label="Deployment Date" color='primary'
                                variant="standard" defaultValue={odcData.deployment_date}/>
                            </div>
                        </div>
                      )}
                    </div>
                    <div
                      role="tabpanel"
                      hidden={value !== 1}
                      id={`simple-tabpanel-${1}`}
                      aria-labelledby={`simple-tab-${1}`}
                    >
                      {value === 1 && (
                        <div className={`row ${odcStyles.formGap}`}>
                          <div className={`col-lg-6 col-md-12 ${odcStyles.dFlex} ${odcStyles.textFieldContainer}`}>
                            <CustomTextField id="standard-basic" label="Core Terminasi" variant="standard" defaultValue={odcData.core}/>
                          </div>
                          <div className={`col-lg-6 col-md-12 ${odcStyles.dFlex} ${odcStyles.textFieldContainer}`}>
                            <CustomTextField id="standard-basic" label="Rak OA" variant="standard" defaultValue={odcData.rak_oa}/>
                          </div>
                          <div className={`col-lg-6 col-md-12 ${odcStyles.dFlex} ${odcStyles.textFieldContainer}`}>
                            <CustomTextField id="standard-basic" label="Panel" variant="standard" defaultValue={odcData.panel_oa}/>
                          </div>
                          <div className={`col-lg-6 col-md-12 ${odcStyles.dFlex} ${odcStyles.textFieldContainer}`}>
                            <CustomTextField id="standard-basic" label="Port" color='primary'
                              variant="standard" defaultValue={odcData.port}/>
                          </div>
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
                    {(value>0) && <CustomButtonModal btnType={'submit'} onClick={(ev)=>(value>0)?handleOpen:handleChange(ev,value+1)}  variant="contained" color='primary' size="large">
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
              // })
              }    

                  {/* modal popup container
                  */}

                  
                  <Link href={`/odc/${odcId.join('/')}/status`} passHref>
                  <a>
                    <CustomButtonStatus variant="outlined" color='primary' size="large">
                      {/*
                      <MdOutlineAddBox /> */}
                      Status
                    </CustomButtonStatus>
                  </a>
                  </Link>
                  <Link href={`/odc/${odcId.join('/')}/activity log`} passHref>
                  <a>
                  <CustomButtonActivityLog variant="outlined" color='primary' size="large">
                    {/* <MdOutlineAddBox/>  */}
                    Activity Log
                  </CustomButtonActivityLog>
                  </a>
                  </Link>
                  <CustomButtonDownload variant="outlined" color='primary' size="large">
                    {/* <MdOutlineAddBox/>  */}
                    Download
                  </CustomButtonDownload>

                  </div>:null
                }
                {/* users action options */}
                {(router.asPath=="/users")?
                <div className={indexStyles.odcAction}>
                  <CustomButtonEdit onClick={handleAddUserOpen} variant="outlined" color='primary' size="large">
                    Add New User
                  </CustomButtonEdit>
                  <Modal open={userModalOpen} onClose={handleAddUserClose} aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description">
                  <div>
                  <div className={odcStyles.closebtn}>
                    <MdOutlineClose/>
                  </div>
                  <Box sx={{
                  position: "absolute",
                  top: "50%",
                  left: "50%",
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
                  // boxShadow: "0 1px 4px 0 rgb(0 0 0 / 14%)",
                }}>
                {/* <Box sx={odcStyles.card}> */}
                  <div className={`${odcStyles.card} ${odcStyles.cardStats}`}>
                    <div className={`${odcStyles.cardHeader} ${odcStyles.cardHeaderPrimary}`}>
                      <h4 className={odcStyles.cardTitle}>{`Add New User`}</h4>
                      <div className={odcStyles.stats}>
                        {/*
                        <MdOutlineDateRange width={16} height={"auto"} /> */}
                        lengkapi semua isian yang ada
                      </div>
                    </div>
                    <div className={`${odcStyles.cardBody} card-body row ${odcStyles.customCardBodyUser}`}>
                      <div className={`row ${odcStyles.formGap}`}>
                        {/* <div className={`col-lg-6 col-md-12 ${odcStyles.dFlex} ${odcStyles.textFieldContainer}`}>
                          <CustomTextField id="standard-basic" label="Name" variant="standard" defaultValue={""} />
                        </div> */}
                        <div className={`col-md-12 ${odcStyles.dFlex} ${odcStyles.textFieldContainer}`}>
                          <CustomTextField id="standard-basic" label="Email" variant="standard" defaultValue={""} />
                        </div>
                        <div className={`col-md-12 ${odcStyles.dFlex} ${odcStyles.textFieldContainer}`}>
                          <CustomTextField id="standard-basic" label="Password" variant="standard" defaultValue={""} />
                        </div>
                        <div className={`col-md-12 ${odcStyles.dFlex} ${odcStyles.textFieldContainer}`}>
                        <FormControl key='role' variant="standard" sx={{ m: 1, minWidth: 124 }}>
                        <CustomInputLabel id="demo-simple-select-standard-label">Role</CustomInputLabel>

                        <NativeSelect defaultValue={"user"} inputProps={{
                            name: 'age',
                            id: 'uncontrolled-native',
                            }}>
                              <option key={"role-admin"} value="admin"> Admin </option>
                              <option key={"role-user"} value="user"> User </option>
                        </NativeSelect>
                        </FormControl>
                        </div>
                        
                        {/* <div className={`col-lg-6 col-md-12 ${odcStyles.dFlex} ${odcStyles.textFieldContainer}`}>
                          <CustomTextField id="standard-basic" label="Address" variant="standard" defaultValue={""} />
                        </div>
                        <div className={`col-lg-6 col-md-12 ${odcStyles.dFlex} ${odcStyles.textFieldContainer}`}>
                          <CustomTextField id="standard-basic" label="Status" color='primary' variant="standard"
                            defaultValue={""} />
                        </div> */}
                      </div>
                    <div className={odcStyles.actionContainer}>
                      <div className='col-md-6'>
                        <div className='row'>

                            <div className={`col-md-12 col-lg-4 `}>
                              <CustomButtonModal btnType={'submit'}>
                                {"Submit"}
                              </CustomButtonModal>
                            </div>
                            <div className={`col-md-12 col-lg-4 `}>
                              <CustomButtonModal onClick={()=>handleAddUserClose()}>
                                {"Cancel"}
                              </CustomButtonModal>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  </Box>
                </div>
              </Modal>
                </div>:null}
              {/* {(typeof window !=="undefined" && window.innerWidth<1080 ?  */}
              {/* burger toggle on mobile  */}
              <button type='button' className={`${indexStyles.navbarToggler} ${statMenu && indexStyles.toggled}`} id="closeToggle" onClick={mainmenuClick}> 
                <span className={indexStyles.srOnly}>Toggle navigation</span>
                <span className={`${indexStyles.navbarTogglerIcon} ${indexStyles.iconBar}`} /*class="navbar-toggler-icon icon-bar"*/></span>
                <span  className={`${indexStyles.navbarTogglerIcon} ${indexStyles.iconBar}`}/*class="navbar-toggler-icon icon-bar"*/></span>
                <span className={`${indexStyles.navbarTogglerIcon} ${indexStyles.iconBar}`}/*class="navbar-toggler-icon icon-bar"*/></span>
              </button>
                {/* : null)} */}
            
            </div>
            {(router.asPath=="/odc")&& <div className={styles.userContainer}>
              <div className={styles.userImg}>
                <BsFillFilePersonFill/>
              </div>
              <div className={styles.userDetail}>
                  <h6>{email.replace(/(\w+)@\S+/,"$1")}</h6>
                 <span>{role_name}</span>

              </div>

            </div>}
            
  </nav>
}

const mapStateToProps = state => ({
  dataClient:state?.ODCs?.odcsBox,
})

export default connect(mapStateToProps,{})(Navbar);
