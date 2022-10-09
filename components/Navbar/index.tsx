import React, { useCallback, useState, useEffect, useRef, ReactNode } from 'react';
import styles from './navbar.module.css';
import { MdMenu } from 'react-icons/md';
// import {
//   Button,
// } from "@material-ui/core";
import Image from 'next/image';
import Link from 'next/link';
// import {Modal,Box,FormControl,InputLabel,NativeSelect, CircularProgress,Backdrop} from '@material-ui/core';
import { Modal, Box, FormControl, InputLabel, NativeSelect, CircularProgress, Backdrop, TabsProps, TextFieldProps, ButtonProps, CircularProgressProps, InputLabelProps, InputAdornment } from '@mui/material'
import {
  styled as styledCustom
} from "@mui/material/styles";
import { connect } from 'react-redux';
import { END } from 'redux-saga';
import { FaBars } from 'react-icons/fa';
import indexStyles from './index.module.css';
import odcStyles from '../../pages/odc/odc.module.css';
import { useRouter } from 'next/router';
import { ToastContainer, toast } from 'react-toastify';
import { Formik } from 'formik';
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
import Tab, { TabProps } from '@mui/material/Tab';
import TextField from '@mui/material/TextField';
import {
  addNewUser as IaddNewUser
} from '../store/users/actions';
import {
  changePageTo as IchangePageTo
} from '../store/layouts/actions'
import { Visibility, VisibilityOff } from '@mui/icons-material';
import { exportODCDataFn as IexportODCDataFn } from '../store/odcs/actions';
// import {
//   MdOutlineAddBox,
// } from 'react-icons/md';
const rawData = [{
  id: "odc-ktm-fs",
  capacity: 144,
  merek: "samsung",
  deploymentDate: "Mar 1994",
  core: 24,
  rakOa: "1.3",
  panelOa: 2,
  port: 5,
  feeder: {
    idle: 24,
    used: 0,
    broken: 0
  },
  distribution: {
    idle: 120,
    used: 0,
    broken: 0
  },

}]
const CustomTab = styledCustom(Tab)<TabProps>(({ theme }) => ({
  color: "gray!important",
  '&.MuiTab-root.Mui-selected': {
    color: "black!important"
  },
}))
const CustomTabs = styledCustom(Tabs)<TabsProps>(({ theme }) => ({
  '.MuiTabs-indicator': {
    backgroundColor: theme.status.primary,
  },
}))
const CustomFormControl = styledCustom(FormControl)(({ theme }) => ({
  width: "100%",
  // width: "calc(100% - 1rem)",
  ".MuiInputLabel-root": {
    transform: "translateY(-7px)"
  },
  ".MuiInputBase-root": {
    padding: "7px 0 0px",
    marginTop: "9px",
  }
}))
const CustomTextField = styledCustom(TextField)<TextFieldProps>((props) => ({
  // test:console.log("customText field",props),
  color: props.theme.status.primary,
  '.MuiInputLabel-root.Mui-focused': {
    color: props.theme.status.primary,
  },
  '.MuiInput-root input': {
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
const CustomButtonModal = styledCustom(Button)<ButtonProps>(({ theme, btntype }) => ({
  background: btntype == 'submit' ? theme.status.success : btntype == 'cancel' ? "gray !important" : theme.status.primary,
  // background: btntype == 'submit' ? '#1ebc51!important':theme.status.primary,
}));
const CustomButtonEdit = styledCustom(Button)<ButtonProps>(({ theme }) => ({
  borderColor: theme.status.primary,
  color: theme.status.primary,
}));
const CustomCircularProgress = styledCustom(CircularProgress)<CircularProgressProps>(({ theme }) => ({
  color: theme.status.success
}))
const CustomButtonStatus = styledCustom(Button)<ButtonProps>(({ theme }) => ({
  borderColor: theme.status.success,
  color: theme.status.success,
}));
const CustomButtonActivityLog = styledCustom(Button)<ButtonProps>(({ theme }) => ({
  borderColor: theme.status.warning,
  color: theme.status.warning,
}));
const CustomButtonDownload = styledCustom(Button)<ButtonProps>(({ theme }) => ({
  borderColor: theme.status.info,
  color: theme.status.info,
}));
// const CustomButtonModalGray = styledCustom(Button)<ButtonProps>(({ theme }) => ({
//   background: theme.status.darkgray,
// }));
const CustomInputLabel = styledCustom(InputLabel)<InputLabelProps>(({ theme }) => ({
  '&.Mui-focused': {
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
  const { odcProps = { regionList: { data: [] }, witelList: "", datelList: "", stoList: "", merekList: "" }, odcDispatch, dataClient, odcData, email, role_name, add_user_confirmation, token, user_rowsPerPage, gotopage, gotopageLoading } = props;
  const { addNewUser }: { addNewUser: typeof IaddNewUser } = props
  const { changePageTo }: { changePageTo: typeof IchangePageTo } = props
  const { exportODCDataFn }: { exportODCDataFn: typeof IexportODCDataFn } = props
  // console.log("odc props",user_rowsPerPage)
  // useEffect(()=>{
  // useEffect(()=>{
  //   console.log("data client",dataClient)

  // },[dataClient])
  // },[odcProps.regionList])
  const { regionList, witelList, datelList, stoList, merekList, ODCdetail: ODCdetailData } = odcProps
  const { updateODCData } = odcDispatch;
  // console.log("raw data",ODCdetailData)
  const { odc_name } = odcData || { odc_name: '' };
  const router = useRouter();
  const { odcId, userPath } = router.query;
  // const filteredDataclient = (odcId)?dataClient.filter(item=>item.id==odcId[0]):""
  const filteredDataclient = dataClient
  // console.log("query",odcData)
  // console.log("query",userPath,odcId,router)
  const [statMenu, setStatMenu] = useState(false);
  const mainmenuClick = useCallback(event => {
    setTimeout(() => {

      setStatMenu(!statMenu)
      event.target.parentNode.parentNode.parentNode.childNodes[event.target.parentNode.parentNode.parentNode.childNodes.length - 1].style.opacity = "1"
    }, 333)
    // console.log("event",event.target)
    // console.log(event.target.parentNode.parentNode.parentNode.childNodes)
    event.target.parentNode.parentNode.parentNode.childNodes[event.target.parentNode.parentNode.parentNode.childNodes.length - 1].style.display = "block"
    if (window.innerWidth < 1080) {
      event.target.parentNode.parentNode.parentNode.style.transform = statMenu ? "translate3d(0,0,0)" : "translate3d(-260px,0,0)";
      if (!statMenu)
        event.target.parentNode.parentNode.parentNode.parentNode.childNodes[0].style.transform = "none";
      else
        event.target.parentNode.parentNode.parentNode.parentNode.childNodes[0].style.removeProperty('transform');
    }
    // console.log(event.target.parentNode.parentNode.parentNode.childNodes[event.target.parentNode.parentNode.parentNode.childNodes.length-1].style.display="block")
  }, [statMenu])

  /**
   * modal popup edit
   */
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const [value, setValue] = React.useState(0);
  const [regionListClient, setRegionListClient] = useState(regionList?.data || []);
  const [witelListClient, setWitelListClient] = useState(witelList?.data || []);
  const [datelListClient, setDatelListClient] = useState(datelList?.data || []);
  const [stoListClient, setSTOListClient] = useState(stoList?.data || []);
  //  const [witelListClient,setWitelListClient] = useState(witelList?.data || []);
  //  const [datelListClient,setDatelListClient] = useState(datelList?.data || []);
  //  const [stoListClient,setSTOListClient] = useState(stoList?.data || []);
  // console.log("witel list",witelListClient,witelList,ODCdetailData?.witel_id || "")
  useEffect(() => {

    // console.log("odc",odc_edit_modal.current,document.querySelector('[itemref="testing"]'))
    setTimeout(() => {

      if (document.querySelector('[itemref="testing"]'))
        (document.querySelector('[itemref="testing"]') as HTMLElement).style.top = "50%";
    }, 50)
    if (typeof odcId === 'object') {
      setWitelListClient(witelList.data.filter(item => item.region_id == ODCdetailData.region_id))
      setDatelListClient(datelList.data.filter(item => item.region_id == ODCdetailData.region_id).filter(item => item.witel_id == ODCdetailData.witel_id))
      setSTOListClient(stoList.data.filter(item => item.region_id == ODCdetailData.region_id).filter(item => item.witel_id == ODCdetailData.witel_id).filter(item => item.datel_id == ODCdetailData.datel_id))
    }
  }, [open, datelList, ODCdetailData, odcId, stoList, witelList])
  // console.log("sto id",witelListClient)
  /**
   * modal popup for users page
   */
  const [userModalOpen, setUserModalOpen] = React.useState(false);
  const handleAddUserOpen = () => setUserModalOpen(true);
  const handleAddUserClose = () => setUserModalOpen(false);

  /** add users confirmation */
  const [error, setError] = useState();
  // useEffect(()=>{
  //   console.log("error",error,add_user_confirmation)
  // if(!error?.success)
  // toast.error(error?.msg, {
  //   position: "top-right",
  //   autoClose: 5000,
  //   hideProgressBar: false,
  //   closeOnClick: true,
  //   pauseOnHover: true,
  //   draggable: true,
  //   progress: undefined,
  // });
  // if(add_user_confirmation.success){
  //   toast.success(add_user_confirmation.msg, {
  //     position: "top-right",
  //     autoClose: 5000,
  //     hideProgressBar: false,
  //     closeOnClick: true,
  //     pauseOnHover: true,
  //     draggable: true,
  //     progress: undefined,
  //   });
  // }
  // document.body.append(<ToastContainer style={{zIndex:"99999999999"}}/>)
  // },[error])
  // const {email,role_name} = (typeof window !== "undefined") ? jwt(getCookie("token")) : {email:"",role_name:""};
  // console.log("odcid",odcId)
  // console.log("odc props", odcData)
  const handleOnChange = (ev, newValues, setValues) => {
    console.log("on change")
    setValues(prev => ({ ...prev, tabs: newValues }))
  }

  /**
   * select option with filter
   */
  const handleFilterOnChange = (ev, inputid, values, setValues) => {
    let dmp = { region_id: values.region_id?.toString(), witel_id: values.witel_id?.toString(), datel_id: values.datel_id?.toString(), sto_id: values.sto_id?.toString() };
    [{ region_id: ['region_id', regionList.data] }, { witel_id: ['region_id', witelList.data] }, { datel_id: ['witel_id', datelList.data] }, { sto_id: ['datel_id', stoList.data] }].forEach(item => {
      dmp[inputid] = ev.target.value;
      dmp.region_id = regionList.data.find(item => item.id == dmp.region_id)?.id.toString();
      for (const key1 in item) {
        /**
         * mengubah nilai filter child yang memiliki id parent sesuai dengan opsi yang kita ubah
         */
        if (Object.hasOwnProperty.call(item, key1) && key1 != inputid && key1 != 'region_id') {
          /** 
           * get the first children for certain parent id on the array 
           * ambil data pertama subitem yang memiliki item id yang sesuai 
           * */
          dmp[key1] = item[key1][1].find(item2 => item2[item[key1][0]] == dmp[item[key1][0]])?.id;
        }
        else {

        }
      }
      // return key == inputid
    })
    // console.log("key2",dmp)
    switch (inputid) {
      case "region_id":
        //set witel options
        setWitelListClient(witelList.data.filter(item => item.region_id.toString() == dmp.region_id))
      case "witel_id":
        //set datel options
        setDatelListClient(datelList.data.filter(item => item.witel_id == dmp.witel_id))
      case "datel_id":
        //set sto options
        setSTOListClient(stoList.data.filter(item => item.datel_id.toString() == dmp.datel_id))
      case "sto_id":
        // console.log("values", values)
        setValues(prev => ({ ...prev, sto_id: ev.target.value }))
        /**
         * set all values
         */
        if (inputid !== "sto_id")
          setValues(prev => ({ ...prev, ...dmp }))
        break;

      default:
        break;
    }
  }
  useEffect(() => {
    // console.log("layout pathname",gotopage,location.pathname)
    changePageTo(location.pathname)
  }, [odcId])
  /** handle change page to  */
  const handleOdcActions = (pathname) => {
    changePageTo(pathname)
  }
  const [showPassword, setShowPassword] = useState(false);
  /** handle download */
  // console.log("odc id navbar",odc_name, global.location.pathname)
  // console.log("odc id navbar",odcId[0],odc_name, global.location)
  const handleODCDownload = () => {
    exportODCDataFn(odc_name, odcId[0], token, toast)
  }
  return <nav id={indexStyles.topBar}>
    {/* <ToastContainer style={{zIndex:"99999999999"}}/> */}
    {/* <div className='container-fluid'></div> */}
    <div className={indexStyles.navbarBrandBox}>
      {typeof odcId !== 'object' ?
        // {typeof odcId !== 'object' || typeof userPath !== 'object'? 
        <Link href={global.location?.pathname || ""} passHref>
          <a className={indexStyles.logo}>
            {(!odcId && router.pathname.replace(/(\/.*)?\/(\S+)/, "$2") === "odc") ?
              <span className={indexStyles.logoTxtOdc}> {`Hello, ${email.replace(/(\w+)?@\S+/, "$1")}`}</span> :
              // <span className={indexStyles.logoTxtOdc}> {`Hello, ${email.replace(/(\w{0,5})(.*)?@\S+/,"$1")}`}</span>:
              // <span className={indexStyles.logoTxt}> {(!odcId)?gotopage.replace(/(\/.*)?\/(\S+)/,"$2").toUpperCase():odcId[0].toUpperCase()}</span>
              <span className={indexStyles.logoTxt}> {(!odcId) ? router.pathname.replace(/(\/.*)?\/(\S+)/, "$2").toUpperCase() : odcId[0].toUpperCase()}</span>
            }
            {/* <span className={indexStyles.logoTxt}> {(!odcId)?router.pathname.replace(/(\/.*)?\/(\S+)/,"$2").toUpperCase():odcId.toUpperCase()}</span> */}
          </a>
        </Link>


        : <div>
          {odcId.reduce((prev, next, idx) => {
            if (odcId.length - 1 == idx)
              return [
                ...prev.dom,
                (prev.elm.length === 0) ? [<Link key={"link" + next} href={`/odc/${next}`} passHref>
                  <a className={indexStyles.logo}>
                    <span className={indexStyles.logoTxt}> {filteredDataclient?.odc_name || odc_name?.toUpperCase()}</span>
                  </a>
                </Link>] :
                  <Link key={"link" + next} href={`/odc/${[...prev.elm, next].join("/")}`} passHref>
                    <a className={indexStyles.logo}>
                      <span className={indexStyles.logoTxt}> {next.toUpperCase()}</span>
                    </a>
                  </Link>
              ]
            return {
              ...prev,
              dom: [
                ...prev.dom,
                (prev.elm.length === 0) ? [<Link href={'/odc/' + odcId[odcId.length - 2] || ""} key={"arrow"}><a><MdKeyboardArrowLeft /></a></Link>, <Link key={"link" + next} href={`/odc/${next}`} passHref>
                  <a className={indexStyles.logo}>
                    <span className={indexStyles.logoTxt}> {odc_name?.toUpperCase()}</span>
                  </a>
                </Link>, <span key={"p" + next} className={indexStyles.separator}> / </span>] :
                  [<Link key={"link" + next} href={`/odc/${[...prev.elm, next].join("/")}`} passHref>
                    <a className={indexStyles.logo}>
                      <span className={indexStyles.logoTxt}> {next.toUpperCase()}</span>
                    </a>
                  </Link>, <span key={"p" + next} className={indexStyles.separator}> / </span>]
              ],
              elm: [
                ...prev.elm,
                next
              ]
            }
          }
            , { dom: [], elm: [] }) as ReactNode}
        </div>}
      {/* action navbar only show at selected odc */}
      {((odcId || false) && odcId.length == 1) ?
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
                  <MdOutlineClose />
                </div>
                <Box itemRef='testing' sx={{
                  position: "absolute",
                  top: "48%",
                  left: "50%",
                  transition: 'all 0.3s ease-out',
                  transform: "translate(-50%, -50%)",
                  border: 0,
                  borderRadius: "6px",
                  color: "#333",
                  width: "90%",
                  maxWidth: "600px",
                  // boxShadow: "0 2px 2px 0 rgb(0 0 0 / 14%), 0 3px 1px -2px rgb(0 0 0 / 20%), 0 1px 5px 0 rgb(0 0 0 / 12%)",
                  // boxShadow: "0 1px 4px 0 rgb(0 0 0 / 14%)",
                }} >
                  {/* }} className={` ${open && odcStyles.modalActive}`}> */}
                  <Formik
                    initialValues={{
                      tabs: 0,
                      notes: "",
                      name: filteredDataclient?.odc_name || ODCdetailData.name,
                      merek_id: ODCdetailData.merek_id,
                      port_feeder_terminasi: ODCdetailData.port_feeder_terminasi,
                      deployment_date: ODCdetailData.deployment_date,
                      capacity: ODCdetailData.capacity,
                      panel_oa: ODCdetailData.panel_oa,
                      rak_oa: ODCdetailData.rak_oa,
                      port: ODCdetailData.port,
                      region_id: ODCdetailData.region_id,
                      // test: console.log("witel id",witelList.data.filter(item=>item.region_id.toString() === regionList.data[0].id.toString())[0].id.toString()),
                      witel_id: ODCdetailData.witel_id,
                      datel_id: ODCdetailData.datel_id,
                      sto_id: ODCdetailData.sto_id || stoListClient[0]?.id || ""
                    }}
                    validateOnChange={true}
                    validate={(values) => {
                      console.log("validate", values.deployment_date)
                    }}
                    onSubmit={(values, { setSubmitting }) => {
                      // console.log(values)
                      // console.log(updateODCData)
                      updateODCData({
                        name: values.name,
                        deployment_date: values.deployment_date,
                        merek_id: values.merek_id,
                        notes: values.notes,
                        panel_oa: values.panel_oa,
                        rak_oa: values.rak_oa,
                        port: values.port,
                        odc_code: values.name,
                        region_id: values.region_id,
                        witel_id: values.witel_id,
                        datel_id: values.datel_id,
                        sto_id: values.sto_id,
                        odc_id: odcId,
                      }, token, setSubmitting, handleClose, toast)
                    }}

                  >
                    {({
                      values,
                      setValues,
                      handleSubmit,
                      handleChange,
                      handleBlur,
                      isSubmitting
                    }) => (
                      <form className={odcStyles.form} onSubmit={handleSubmit}>
                        <div className={`${odcStyles.card}  ${odcStyles.cardStats}`}>
                          <div className={`${odcStyles.cardHeader} ${odcStyles.cardHeaderPrimary}`}>
                            <h4 className={odcStyles.cardTitle}>{odcData?.odc_name?.toUpperCase()}</h4>
                            <div className={odcStyles.stats}>
                              ubah bagian yang ingin di update
                            </div>
                          </div>
                          <div className={`${odcStyles.cardBody} card-body row`}>
                            <div className={odcStyles.tabLink}>
                              <CustomTabs value={values.tabs} onChange={(ev, newValue) => handleOnChange(ev, newValue, setValues)} onBlur={handleBlur} aria-label="basic tabs example">
                                <CustomTab label="ODC" {...a11yProps(0)} />
                                <CustomTab label="OA" {...a11yProps(1)} />
                              </CustomTabs>
                            </div>
                            <div className={odcStyles.tabLink}>
                            </div>

                            <div
                              role="tabpanel"
                              hidden={values.tabs !== 0}
                              id={`simple-tabpanel-${0}`}
                              aria-labelledby={`simple-tab-${0}`}
                            >
                              {values.tabs === 0 && (
                                <div className={`row ${odcStyles.formGap}`}>
                                  <div className={`col-lg-6 col-md-12 ${odcStyles.dFlex} ${odcStyles.textFieldContainer}`}>
                                    <CustomTextField id="odcName" name='name' label="Nama ODC" variant="standard" onChange={handleChange} onBlur={handleBlur} value={values.name} />
                                  </div>
                                  <div className={`col-lg-6 col-md-12 ${odcStyles.dFlex} ${odcStyles.textFieldContainer}`}>
                                    {/* <CustomTextField id="standard-basic" onChange={handleChange} onBlur={handleBlur} value={values.name} label="Regional" variant="standard" /> */}
                                    <CustomFormControl key='regional' variant="standard" >
                                      <CustomInputLabel id="demo-simple-select-standard-label">Regional</CustomInputLabel>

                                      <NativeSelect value={values.region_id} onChange={(ev) => handleFilterOnChange(ev, "region_id", values, setValues)} onBlur={handleBlur} inputProps={{
                                        name: 'region_id',
                                        id: 'uncontrolled-native',
                                      }}>
                                        {(regionList?.data?.map(item => ({ label: item.name, value: item.id })) || []).map(item => (
                                          <option key={"region-" + item.label} value={item.value}>{item.label}</option>
                                        ))}
                                      </NativeSelect>
                                    </CustomFormControl>
                                  </div>
                                  <div className={`col-lg-6 col-md-12 ${odcStyles.dFlex} ${odcStyles.textFieldContainer}`}>
                                    {/* <CustomTextField id="standard-basic" onChange={handleChange} onBlur={handleBlur} label="WITEL" variant="standard" /> */}
                                    <CustomFormControl key='witel' variant="standard" >
                                      <CustomInputLabel id="demo-simple-select-standard-label">Witel</CustomInputLabel>

                                      <NativeSelect value={values.witel_id} onChange={(ev) => handleFilterOnChange(ev, "witel_id", values, setValues)} onBlur={handleBlur} inputProps={{
                                        // <NativeSelect value={values.witel_id} onChange={handleChange} onBlur={handleBlur} inputProps={{
                                        name: 'witel_id',
                                        id: 'uncontrolled-native',
                                      }}>
                                        {((witelListClient || false) ? witelListClient?.map(item => ({ label: item.name, value: item.id })) : witelList?.data?.map(item => ({ label: item.name, value: item.id })) || []).map(item => (
                                          <option key={"witel-" + item.label} value={item.value}>{item.label}</option>
                                        ))}
                                      </NativeSelect>
                                    </CustomFormControl>
                                  </div>
                                  <div className={`col-lg-6 col-md-12 ${odcStyles.dFlex} ${odcStyles.textFieldContainer}`}>
                                    {/* <CustomTextField id="standard-basic" onChange={handleChange} onBlur={handleBlur} label="DATEL" variant="standard" /> */}
                                    <CustomFormControl key='datel' variant="standard" >
                                      <CustomInputLabel id="demo-simple-select-standard-label">Datel</CustomInputLabel>

                                      <NativeSelect value={values.datel_id} onChange={(ev) => handleFilterOnChange(ev, "datel_id", values, setValues)} onBlur={handleBlur} inputProps={{
                                        name: 'datel_id',
                                        id: 'uncontrolled-native',
                                      }}>
                                        {((datelListClient || false) ? datelListClient?.map(item => ({ label: item.name, value: item.id })) : datelList?.data?.map(item => ({ label: item.name, value: item.id })) || []).map(item => (
                                          <option key={"datel-" + item.label} value={item.value}>{item.label}</option>
                                        ))}
                                      </NativeSelect>
                                    </CustomFormControl>
                                  </div>
                                  <div className={`col-lg-6 col-md-12 ${odcStyles.dFlex} ${odcStyles.textFieldContainer}`}>
                                    {/* <CustomTextField id="standard-basic" onChange={handleChange} onBlur={handleBlur} label="STO" variant="standard" /> */}
                                    <CustomFormControl key='sto' variant="standard" >
                                      <CustomInputLabel id="demo-simple-select-standard-label">STO</CustomInputLabel>

                                      <NativeSelect value={values.sto_id} onChange={(ev) => handleFilterOnChange(ev, "sto_id", values, setValues)} onBlur={handleBlur} inputProps={{
                                        name: 'sto_id',
                                        id: 'uncontrolled-native',
                                      }}>
                                        {((stoListClient) ? stoListClient?.map(item => ({ label: item.name, value: item.id })) : stoList?.data?.map(item => ({ label: item.name, value: item.id })) || []).map(item => (
                                          <option key={"sto-" + item.label} value={item.value}>{item.label}</option>
                                        ))}
                                      </NativeSelect>
                                    </CustomFormControl>
                                  </div>
                                  <div className={`col-lg-6 col-md-12 ${odcStyles.dFlex} ${odcStyles.textFieldContainer}`}>
                                    {/* <CustomTextField id="standard-basic" onChange={handleChange} onBlur={handleBlur} label="Merek" variant="standard" /> */}
                                    <CustomFormControl key='merek' variant="standard" >
                                      <CustomInputLabel id="demo-simple-select-standard-label">Merek</CustomInputLabel>

                                      <NativeSelect value={values.merek_id} onChange={handleChange} onBlur={handleBlur} inputProps={{
                                        name: 'merek_id',
                                        id: 'uncontrolled-native',
                                      }}>
                                        {(merekList.data || []).map(item => ({ label: item.name, value: item.id })).map(item => (
                                          <option key={"merek-" + item.label} value={item.value}>{item.label}</option>
                                        ))}
                                      </NativeSelect>
                                    </CustomFormControl>

                                  </div>
                                  {/* <div className={`col-lg-6 col-md-12 ${odcStyles.dFlex} ${odcStyles.textFieldContainer}`}>
                                  <CustomTextField id="standard-basic" label="Kapasitas" variant="standard" defaultValue={odcData.capacity}/>
                                </div> */}
                                  {/* <div className={`col-lg-6 col-md-12 ${odcStyles.dFlex} ${odcStyles.textFieldContainer}`}>
                                  <CustomTextField id="standard-basic" label="Merek" variant="standard" defaultValue={odcData.merek}/>
                                </div> */}

                                  {/* <div className={`col-lg-6 col-md-12 ${styles.dFlex} ${styles.textFieldContainer}`}>
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
                                    </div> */}

                                  {/* <CustomTextField id="standard-basic" label="Splitter Position" variant="standard" /> */}
                                  {/* {item.merek} */}
                                  {/* merk
                                      deploymentDate
                                      core
                                      rakOa
                                      panelOa
                                      port */}
                                  <div className={`col-lg-6 col-md-12 ${odcStyles.dFlex} ${odcStyles.textFieldContainer}`}>
                                    <CustomTextField id="standard-basic" name='deployment_date' label="Deployment Date" color='primary'
                                      variant="standard" onChange={handleChange} onBlur={handleBlur} value={values.deployment_date} />
                                  </div>

                                </div>
                              )}
                            </div>
                            <div
                              role="tabpanel"
                              hidden={values.tabs !== 1}
                              id={`simple-tabpanel-${1}`}
                              aria-labelledby={`simple-tab-${1}`}
                            >
                              {values.tabs === 1 && (
                                <div className={`row ${odcStyles.formGap}`}>
                                  {/* <div className={`col-lg-6 col-md-12 ${styles.dFlex} ${styles.textFieldContainer}`}>
                                <CustomTextField id="standard-basic" label="Port Feeder Terminasi" variant="standard" defaultValue={odcData.core}/>
                              </div> */}
                                  <div className={`col-lg-6 col-md-12 ${odcStyles.dFlex} ${odcStyles.textFieldContainer}`}>
                                    <CustomTextField id="standard-basic" name='rak_oa' label="Rak OA" variant="standard" onChange={handleChange} onBlur={handleBlur} value={values.rak_oa} />
                                  </div>
                                  <div className={`col-lg-6 col-md-12 ${odcStyles.dFlex} ${odcStyles.textFieldContainer}`}>
                                    <CustomTextField id="standard-basic" name='panel_oa' label="Panel" variant="standard" onChange={handleChange} onBlur={handleBlur} value={values.panel_oa} />
                                  </div>
                                  <div className={`col-lg-6 col-md-12 ${odcStyles.dFlex} ${odcStyles.textFieldContainer}`}>
                                    <CustomTextField id="standard-basic" name='port' label="Port" color='primary'
                                      variant="standard" onChange={handleChange} onBlur={handleBlur} value={values.port} />
                                  </div>
                                </div>
                              )}
                            </div>
                          </div>
                          <div className={odcStyles.actionContainer}>
                            <CustomButtonModal onClick={(ev) => handleOnChange(ev, values.tabs - 1, setValues)} style={{ visibility: (values.tabs <= 0) ? "hidden" : "visible" }} variant="contained" color='primary' size="medium">
                              Prev
                            </CustomButtonModal>
                            <div style={{ display: 'flex', gap: "0.5rem" }}>
                              {/* <div className='row'>
                              <div className='col-md-12 col-lg-6'> */}
                              {(values.tabs > 0) && (isSubmitting ? <CustomCircularProgress size={24} style={{ position: 'relative', top: 4, display: "flex", margin: "auto" }} />
                                :
                                <CustomButtonModal btntype={'submit'} type={"submit"} onClick={(ev) => (values.tabs > 0) ? handleOpen : (ev, newValue) => handleOnChange(ev, values.tabs + 1, setValues)} variant="contained" color='primary' size="medium">
                                  Submit
                                </CustomButtonModal>)}

                              {/* </div>
                              <div className='col-md-12 col-lg-6'> */}
                              {(values.tabs > 0) && <CustomButtonModal btntype='cancel' onClick={() => handleClose()} variant="contained" color='primary' size="medium">
                                Cancel
                              </CustomButtonModal>}
                              {/* </div> */}
                            </div>
                            <div>

                              <CustomButtonModal style={{ visibility: (values.tabs > 0) ? "hidden" : "visible" }} onClick={(ev) => (values.tabs > 0) ? handleOpen : handleOnChange(ev, values.tabs + 1, setValues)} variant="contained" color='primary' size="medium">
                                {(values.tabs <= 0) ? "Next" : ""}
                              </CustomButtonModal>
                            </div>
                          </div>
                        </div>
                      </form>
                    )}
                  </Formik>
                </Box>
              </div>
            </Modal>
            // })
          }

          {/* modal popup container
                  */}


          <Link href={`/odc/${(odcId as any).join('/')}/status`} passHref>
            <a onClick={() => handleOdcActions(`/odc/${(odcId as any).join('/')}/status`)}>
              <CustomButtonStatus variant="outlined" color='primary' size="large">
                {/*
                      <MdOutlineAddBox /> */}
                Status
              </CustomButtonStatus>
            </a>
          </Link>
          <Link href={`/odc/${(odcId as any).join('/')}/activity log`} passHref>
            <a onClick={() => handleOdcActions(`/odc/${(odcId as any).join('/')}/activity%20log`)}>
              <CustomButtonActivityLog variant="outlined" color='primary' size="large">
                {/* <MdOutlineAddBox/>  */}
                Activity Log
              </CustomButtonActivityLog>
            </a>
          </Link>
          <CustomButtonDownload variant="outlined" color='primary' size="large" onClick={handleODCDownload}>
            {/* <MdOutlineAddBox/>  */}
            Download
          </CustomButtonDownload>

        </div> : null
      }
      {/* users action options */}
      {/* {(gotopage=="/users")? */}
      {(router.asPath == "/users") ?
        <div className={indexStyles.odcAction}>
          <CustomButtonEdit onClick={handleAddUserOpen} variant="outlined" color='primary' size="large">
            Add New User
          </CustomButtonEdit>
          <Modal open={userModalOpen} onClose={handleAddUserClose} aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description">
            <div>
              <div className={odcStyles.closebtn}>
                <MdOutlineClose />
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
                width: "90%",
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
                    <Formik
                      initialValues={{ email: '', password: '', role: '2' }}
                      validate={values => {
                        const errors = {} as {
                          email: string,
                          password: string
                        };
                        if (!values.email) {
                          errors.email = '*Wajib diisi';
                        } else if (
                          !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(values.email)
                        ) {
                          errors.email = '*Invalid email address';
                        }
                        if (!values.password) {
                          errors.password = '*Wajib diisi'
                        }
                        return errors;
                      }}
                      onSubmit={(values, { setSubmitting }) => {
                        addNewUser(values.email, values.password, values.role, token, user_rowsPerPage, setSubmitting, handleAddUserClose, toast)
                      }}
                    >
                      {({
                        values,
                        errors,
                        touched,
                        handleChange,
                        handleBlur,
                        handleSubmit,
                        isSubmitting,
                        /* and other goodies */
                      }) => (
                        <form className={styles.form} onSubmit={handleSubmit}>
                          <div className={`row ${odcStyles.formGap}`}>
                            <div className={`col-md-12 ${odcStyles.dFlex} ${odcStyles.textFieldContainer}`}>
                              <CustomTextField
                                id="standard-basic"
                                label="Email"
                                onChange={handleChange}
                                onBlur={handleBlur}
                                name='email'
                                variant="standard"
                                placeholder='example@domain.com'
                                value={values.email}
                                error={errors.email ? true : false}
                                helperText={errors.email && touched.email && errors.email}
                              />
                            </div>
                            <div className={`col-md-12 ${odcStyles.dFlex} ${odcStyles.textFieldContainer}`}>
                              <CustomTextField name='password' label="Password" type={showPassword ? "text" : "password"}
                                size="small" variant="standard" onChange={handleChange} onBlur={handleBlur} value={
                                  values.password} InputProps={{
                                    endAdornment: (<InputAdornment position="end"> {
                                      showPassword ? (
                                        <Visibility onClick={() =>
                                          setShowPassword(prev => !prev)
                                        }
                                        />
                                      ) : (
                                        <VisibilityOff onClick={() =>
                                          setShowPassword(prev => !prev)
                                        }
                                        />
                                      )
                                    }
                                    </InputAdornment>
                                    ),
                                  }
                                  }
                              />
                              {/*
                              <CustomTextField id="standard-basic" name='password' label="Password" type={"password"}
                                onChange={handleChange} onBlur={handleBlur} variant="standard"
                                defaultValue={values.password} /> */}
                            </div>
                            {/* <div className={`col-md-12 ${odcStyles.dFlex} ${odcStyles.textFieldContainer}`}>
                        <CustomTextField
                        id="standard-basic" 
                        label="Password" 
                        onChange={handleChange}
                        type={"password"}
                        onBlur={handleBlur} 
                        name="password" 
                        variant="standard" 
                        value={values.password} 
                        error={errors.password ? true:false}
                        helperText={errors.password && touched.password && errors.password}/>
                      </div> */}
                            <div className={`col-md-12 ${odcStyles.dFlex} ${odcStyles.textFieldContainer}`}>
                              <FormControl key='role' variant="standard" sx={{ m: 1, minWidth: 124 }}>
                                <CustomInputLabel id="demo-simple-select-standard-label">Role</CustomInputLabel>

                                <NativeSelect value={values.role} onChange={handleChange} onBlur={handleBlur} inputProps={{
                                  name: 'role',
                                  id: 'uncontrolled-native',
                                }}>
                                  <option key={"role-admin"} value="1"> Admin </option>
                                  <option key={"role-user"} value="2"> User </option>
                                </NativeSelect>
                              </FormControl>
                            </div>
                          </div>

                          <div className={odcStyles.actionContainer}>
                            <div className='col-md-6'>
                              <div className='row'>

                                <div className={`col-md-12 col-lg-4 `}>
                                  {isSubmitting ?
                                    <CustomCircularProgress size={24} style={{ position: 'relative', top: 4, display: "flex", margin: "auto" }} />
                                    :
                                    <CustomButtonModal btntype={'submit'} type={"submit"} disabled={isSubmitting}>
                                      {"Submit"}
                                    </CustomButtonModal>
                                  }
                                </div>
                                <div className={`col-md-12 col-lg-4 `}>
                                  <CustomButtonModal btntype='cancel' onClick={() => handleAddUserClose()} >
                                    {"Cancel"}
                                  </CustomButtonModal>
                                </div>
                              </div>
                            </div>
                          </div>
                        </form>
                      )}
                    </Formik>
                  </div>
                </div>
              </Box>
            </div>
          </Modal>
        </div> : null}
      {/* {(typeof window !=="undefined" && window.innerWidth<1080 ?  */}
      {/* burger toggle on mobile  */}
      <button type='button' className={`${indexStyles.navbarToggler} ${statMenu && indexStyles.toggled}`} id="closeToggle" onClick={mainmenuClick}>
        <span className={indexStyles.srOnly}>Toggle navigation</span>
        <span className={`${indexStyles.navbarTogglerIcon} ${indexStyles.iconBar}`} /*class="navbar-toggler-icon icon-bar"*/></span>
        <span className={`${indexStyles.navbarTogglerIcon} ${indexStyles.iconBar}`}/*class="navbar-toggler-icon icon-bar"*/></span>
        <span className={`${indexStyles.navbarTogglerIcon} ${indexStyles.iconBar}`}/*class="navbar-toggler-icon icon-bar"*/></span>
      </button>
      {/* : null)} */}

    </div>
    {/* {(gotopage=="/odc")&& <div className={styles.userContainer}> */}
    {(router.asPath == "/odc") && <div className={styles.userContainer}>
      <div className={styles.userImg}>
        <BsFillFilePersonFill />
      </div>
      <div className={styles.userDetail}>
        <h6>{email?.replace(/(\w+)@\S+/, "$1")}</h6>
        <span>{role_name}</span>

      </div>

    </div>}

  </nav>
}

const mapStateToProps = state => ({
  dataClient: state?.ODCs?.selectedOdcSplitpanelStatus,
  add_user_confirmation: state.Users.add_user,
  gotopageLoading: state.Layout.page_loading,
  gotopage: state.Layout.goto,
  // gotopageLoading: state.Layout.page_loading

})
const mapDispatchToProps = {
  addNewUser: IaddNewUser,
  exportODCDataFn: IexportODCDataFn,
  changePageTo: IchangePageTo
}

export default connect(mapStateToProps, mapDispatchToProps)(Navbar);
