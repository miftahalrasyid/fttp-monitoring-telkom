import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import sidebar_img from '../../public/img/sidebarImg.png';
import SimpleBar from 'simplebar-react';
import 'simplebar/dist/simplebar.min.css';
import odcStyles from '../../pages/odc/odc.module.css';
import home from '../../public/img/Home.png';
import { connect } from "react-redux";
import { MdOutlineClose } from 'react-icons/md';
import { IoPersonCircleOutline } from 'react-icons/io5';
import { CustomSelect } from '../../pages/odc';
import {
  getRegionList,
  getWitelList,
  getDatelList,
  getSTOList,
  getMerekList,
  addODCData,
} from '../store/odcs/actions';
import {
  changePageTo as IchangePageTo
} from '../store/layouts/actions'
import { Formik } from 'formik';
import styles from './sidebar_evolve.module.css';
import { createTheme, ThemeProvider, styled } from '@mui/material/styles';
import jwt from 'jwt-decode';
import {
  NativeSelect,
  Button,
  Box,
  Modal
} from "@material-ui/core";
import { useRouter } from 'next/router';
import { makeStyles } from '@material-ui/styles';
import {
  FormControl,
  InputLabel,
  Tabs,
  Tab,
  TextField,
  InputLabelProps,
  TextFieldProps,
  TabsProps,
  ButtonProps,
} from '@mui/material';
import { toast } from 'react-toastify';
const CustomInputLabel = styled(InputLabel)<InputLabelProps>(({ theme }) => ({
  transform: "translate(0, -1.5px) scale(0.75) !important",
  '&.Mui-focused': {
    color: theme.status.primary,

  },
  '.MuiInput-underline:after': {
    borderBottomColor: theme.status.primary
  }
}));
const CustomTextField = styled(TextField)<TextFieldProps>(({ theme, texttype }) => ({
  width: "100%",
  color: theme.status.primary,
  '.MuiInputLabel-root.Mui-focused': {
    color: theme.status.primary,
  },
  '.MuiInputBase-input': {
    textTransform: texttype
  },
  '.MuiInput-root::after': {
    borderColor: theme.status.primary
  },
}));
const CustomTab = styled(Tab)(({ theme }) => ({
  color: "gray!important",
  '&.MuiTab-root.Mui-selected': {
    color: "black!important"
  },
}))
const CustomTabs = styled(Tabs)<TabsProps>(({ theme }) => ({
  '.MuiTabs-indicator': {
    backgroundColor: theme.status.primary,
  },
}))
const CustomFormControl = styled(FormControl)(({ theme }) => ({
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
const CustomButton = styled(Button)<ButtonProps>(({ theme, btntype }) => ({
  background: btntype == "green" ? theme.status.success : theme.status.primary,
  color: "white!important",
  width: "170px",
  borderRadius: "1rem!important"
  // backgroundColor:"#009873!important",
  // color:"white!important",
  // borderRadius:"2rem!important"
}))
const CustomButtonModal = styled(Button)<ButtonProps>(({ theme, btntype }) => ({
  background: btntype == 'submit' ? theme.status.success : btntype == 'cancel' ? "gray !important" : theme.status.primary,
}));
function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    'aria-controls': `simple-tabpanel-${index}`,
  };
}
function Index_evolve({ odcProps, token, addODCData, ...etc }) {
  // console.log("odc props",odcProps,etc)
  const {
    regionList,
    witelList,
    datelList,
    stoList,
    merekList,
    odc_rowsPerPage,
  } = odcProps
  const {
    getRegionList,
    getWitelList,
    getDatelList,
    getSTOList,
    getMerekList,
    gotopage,
    gotopageLoading
  } = etc;
  const { changePageTo } = etc
  // console.log("goto",gotopage)
  const router = useRouter();
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const [value, setValue] = React.useState(0);
  const handleChange = (event, newValue) => {
    setValue(newValue);
  };
  const handleLogout = () => {
    // document.cookie = 'token=; Max-Age=0; path=/; domain=' + location.hostname
    // document.cookie = 'token=; Path=/;  Domain=' + location.host +  '; Expires=Thu, 01 Jan 1970 00:00:01 GMT; SameSite=None; Secure'
    document.cookie = "token=; expires=Thu, 01 Jan 1970 00:00:00 UTC;";
    console.log("logout", document.cookie);
    // document.cookie = 'token=; Max-Age=0'
    router.push("/")
    // router.push(location.pathname)
  }
  const useStyles = makeStyles(theme => ({
    green: {
      backgroundColor: "#009873!important",
      color: "white!important",
      width: "170px",
      borderRadius: "1rem!important"
    },
    red: {
      backgroundColor: "#B10040!important",
      color: "white!important",
      width: "170px",
      borderRadius: "1rem!important"
    }
  }));
  const classes = useStyles();
  useEffect(() => {

    // console.log("odc",odc_edit_modal.current,document.querySelector('[itemref="testing"]'))
    setTimeout(() => {
      // console.log("odc",document.querySelector('[itemref="addOdcSidbarModal"]'))
      if (document.querySelector('[itemref="addOdcSidbarModal"]'))
        (document.querySelector('[itemref="addOdcSidbarModal"]') as HTMLElement).style.top = "50%";
    }, 50)
  }, [open])
  // const getCookie = (cname)=> {
  //   let name = cname + "=";
  //   let decodedCookie = (typeof window !== "undefined") ? decodeURIComponent(document.cookie) : "";
  //   let ca = decodedCookie.split(';');
  //   for(let i = 0; i < ca.length; i++) {
  //     let c = ca[i];
  //     while (c.charAt(0) == ' ') {
  //       c = c.substring(1);
  //     }
  //     if (c.indexOf(name) == 0) {
  //       return c.substring(name.length, c.length);
  //     }
  //   }
  //   return "";
  // }
  // if(typeof window !== 'undefined' && typeof document !== 'undefined'){
  //   console.log("document",typeof document)

  //   console.log("token",document.cookie)
  // }
  const [role_name, setRole] = useState("")
  useEffect(() => {
    // console.log("token sidebar",token)
    setRole((jwt(token) as any).role_name)
    getRegionList(token)
    getWitelList(token)
    getDatelList(token)
    getSTOList(token)
    getMerekList(token)
  }, [getRegionList,
    getWitelList,
    getDatelList,
    getSTOList,
    getMerekList, token])

  // const {role_name} = (typeof window !== 'undefined') ? jwt(getCookie("token")): { role_name: ""}
  // const {role_name} = jwt(getCookie("token"));

  /** tambah ODC use state */
  const [regionListClient, setRegionListClient] = useState("");
  const [witelListClient, setWitelListClient] = useState(witelList?.data || []);
  const [datelListClient, setDatelListClient] = useState(datelList?.data || []);
  const [stoListClient, setSTOListClient] = useState(stoList?.data || []);
  // console.log("region list",regionList.data,witelListClient)
  useEffect(() => {

  }, [witelListClient, datelListClient, stoListClient, regionList, witelList])
  const handleOnChange = (event, newValue, setValues) => {
    setValues(prev => ({ ...prev, tabs: newValue }));
    // handleChange(event,newValue)
  };
  /**
   * select option rule
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
          /** dmp berisi seluruh values select option yang otomatis dipilih */
          setValues(prev => ({ ...prev, ...dmp }))
        break;

      default:
        break;
    }
  }
  useEffect(() => {
    setWitelListClient(witelList?.data?.filter(item => item.region_id.toString() === regionList.data[0].id.toString()))
    setDatelListClient(datelList?.data?.filter(item => item.region_id.toString() === regionList.data[0].id.toString())
      .filter(item => item.witel_id.toString() == witelList?.data?.filter(item => item.region_id.toString() === regionList.data[0].id.toString())[0].id.toString()))
    setSTOListClient(stoList?.data?.filter(item => item.region_id.toString() === regionList.data[0].id.toString())
      .filter(item => item.witel_id.toString() == witelList?.data?.filter(item => item.region_id.toString() === regionList.data[0].id.toString())[0].id.toString())
      .filter(item => item.datel_id.toString() == datelList?.data?.filter(item => item.region_id.toString() === regionList.data[0].id.toString())
        .filter(item => item.witel_id.toString() == witelList?.data?.filter(item => item.region_id.toString() === regionList.data[0].id.toString())[0].id.toString())[0].id.toString()))
  }, [])
  const onUsersClick = () => {
    changePageTo("/users")
    // console.log("refetch",gotopage,gotopageLoading)
  }
  const onODCsClick = () => {
    changePageTo("/odc")
    // console.log("refetch",gotopage,gotopageLoading)
  }
  useEffect(() => {
    changePageTo(location.pathname)
  }, [])
  return (
    <div className={`${styles.verticalMenu}`}>
      <div className={styles.sidebarLogo}>
        <div className={styles.navbarBrandBox}>
          <Link href={"/"} passHref>
            <a className={styles.logo}>
              <span className={styles.logoLg}>
                <span className={styles.logoImg}>
                  <Image src="/img/odc sakti.png" alt="logo" width={2247} height={1312} />
                  {/* <img src="/img/logo_paperless.png" alt="logo" width={156} height={110}/> */}
                </span>
              </span>
            </a>
          </Link>
        </div>
      </div>
      {/* <SimpleBar className={styles.simplebar}> */}
      {/* <SimpleBar className={styles.h100}> */}

      <div id={styles.sidebarMenu}>
        <ul>
          <li>
            <Link href={"/odc"}>
              <a onClick={onODCsClick}>
                <div className={styles.menuList}>
                  <div className={styles.menuIcon}>
                    <Image src={home} width={27} height={27} alt={"home"} />
                    {/* <img src={"/img/Home.png"} width={27} height={27} alt={"home"}/> */}
                  </div>
                  <p>Home</p>
                </div>
                <div className={/\/odc/.test(router.asPath) ? styles.bullet : ""}></div>
              </a>
            </Link>
          </li>
          {(role_name === "Admin") && <li>
            <Link href="/users" >
              <a onClick={onUsersClick}>
                <div className={styles.menuList}>
                  <div className={styles.menuIcon}>
                    <IoPersonCircleOutline className={styles.sidebarSvg} />
                  </div>
                  <p>Users</p>
                </div>
                <div className={/\/users/.test(router.asPath) ? styles.bullet : ""}></div>
              </a>
            </Link>
          </li>}

        </ul>
      </div>
      {/* </SimpleBar> */}
      <div className={styles.action}>
        <div className={styles.sidebarImage}>
          <Image src={sidebar_img} priority width={180} height={210} alt={'sidebar_img'} />
          {/* <img src={"/img/sidebarImg.png"} width={180} height={210} alt={'sidebar_img'}/> */}
        </div>
        <p>Action</p>
        <div className={styles.actionBtn}>

          <p>

            <CustomButton btntype={"green"} onClick={handleOpen} variant='contained'>Tambah ODC</CustomButton>
            <Modal open={open} onClose={handleClose} aria-labelledby="modal-modal-title"
              aria-describedby="modal-modal-description">
              <div>
                <div className={styles.closebtn}>
                  <MdOutlineClose />
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
                  width: "90%",
                  maxWidth: "600px",
                  // boxShadow: "0 2px 2px 0 rgb(0 0 0 / 14%), 0 3px 1px -2px rgb(0 0 0 / 20%), 0 1px 5px 0 rgb(0 0 0 / 12%)",
                  // boxShadow: "0 1px 4px 0 rgb(0 0 0 / 14%)",
                } as any}>
                  {/* <Box sx={styles.card}> */}
                  <div className={`${styles.card}`}>
                    <div className={`${styles.cardHeader} ${styles.cardHeaderPrimary}`}>
                      <h4 className={styles.cardTitle}>Tambah ODC</h4>
                      <div className={styles.stats}>
                        {/* <MdOutlineDateRange width={16} height={"auto"} />  */}
                        lengkapi semua isian yang ada
                      </div>
                    </div>
                    {(regionList?.data && witelList?.data && datelList?.data && stoList?.data) &&
                      <Formik
                        initialValues={{
                          tabs: 0,
                          name: "ODC",
                          merek_id: (merekList) ? merekList?.data[0].id.toString() : "",
                          port_feeder_terminasi: "24",
                          deployment_date: "mar-2022",
                          capacity: 144,
                          panel_oa: "2",
                          rak_oa: "2",
                          port: "2",
                          region_id: regionList?.data[0].id.toString(),
                          // test: console.log("witel id",witelList.data.filter(item=>item.region_id.toString() === regionList.data[0].id.toString())[0].id.toString()),
                          witel_id: witelList?.data?.filter(item => item.region_id.toString() === regionList.data[0].id.toString())[0].id.toString(),
                          datel_id: datelList?.data?.filter(item => item.region_id.toString() === regionList.data[0].id.toString())
                            .filter(item => item.witel_id.toString() == witelList?.data?.filter(item => item.region_id.toString() === regionList.data[0].id.toString())[0].id.toString())[0].id.toString(),
                          sto_id: stoList?.data?.filter(item => item.region_id.toString() === regionList.data[0].id.toString())
                            .filter(item => item.witel_id.toString() == witelList?.data?.filter(item => item.region_id.toString() === regionList.data[0].id.toString())[0].id.toString())
                            .filter(item => item.datel_id.toString() == datelList?.data?.filter(item => item.region_id.toString() === regionList.data[0].id.toString())
                              .filter(item => item.witel_id.toString() == witelList?.data?.filter(item => item.region_id.toString() === regionList.data[0].id.toString())[0].id.toString())[0].id.toString())[0].id.toString()
                        }}
                        validateOnChange={true}
                        validateOnMount={true}
                        validate={(values) => {
                          /** set regioin witel datel sto options based on initial values */

                        }}
                        onSubmit={(values, { setSubmitting }) => {
                          // console.log("on submit",values)
                          addODCData(values.name, values.merek_id, values.port_feeder_terminasi, values.deployment_date, values.capacity, null, values.panel_oa, values.rak_oa, values.port, values.name, values.region_id, values.witel_id, values.datel_id, values.sto_id, token, setSubmitting, handleClose, toast, odc_rowsPerPage)
                        }}
                      >
                        {({
                          errors,
                          values,
                          touched,
                          setValues,
                          handleSubmit,
                          handleChange,
                          handleBlur,
                          isSubmitting
                        }) => (
                          <form className={styles.form} onSubmit={handleSubmit}>
                            <div className={`${styles.cardBody} card-body row`}>
                              <div className={styles.tabLink}>
                                <CustomTabs value={values.tabs} onChange={(ev, newValue) => handleOnChange(ev, newValue, setValues)} onBlur={handleBlur} aria-label="basic tabs example">
                                  <CustomTab label="ODC" {...a11yProps(0)} />
                                  <CustomTab label="OA" {...a11yProps(1)} />
                                </CustomTabs>
                              </div>

                              <div
                                className={styles.spacer}
                                role="tabpanel"
                                hidden={values.tabs !== 0}
                                id={`simple-tabpanel-${0}`}
                                aria-labelledby={`simple-tab-${0}`}
                              // {...other}
                              >

                                {values.tabs === 0 && (
                                  <div className='row'>
                                    {/* <Typography> */}
                                    <div className={`col-lg-6 col-md-12 ${styles.dFlex} ${styles.textFieldContainer}`}>
                                      <CustomTextField texttype="uppercase" id="standard-basic" name='name' value={values.name} onChange={handleChange} onBlur={handleBlur} label="Nama ODC" variant="standard" />
                                    </div>
                                    <div className={`col-lg-6 col-md-12 ${styles.dFlex} ${styles.textFieldContainer}`}>
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
                                    <div className={`col-lg-6 col-md-12 ${styles.dFlex} ${styles.textFieldContainer}`}>
                                      {/* <CustomTextField id="standard-basic" onChange={handleChange} onBlur={handleBlur} label="WITEL" variant="standard" /> */}
                                      <CustomFormControl key='witel' variant="standard" >
                                        <CustomInputLabel id="demo-simple-select-standard-label">Witel</CustomInputLabel>

                                        <NativeSelect value={values.witel_id} onChange={(ev) => handleFilterOnChange(ev, "witel_id", values, setValues)} onBlur={handleBlur} inputProps={{
                                          name: 'witel_id',
                                          id: 'uncontrolled-native',
                                        }}>
                                          {/* <option key={"witel-"+0} value={0}></option> */}
                                          {((witelListClient || false) ? witelListClient?.map(item => ({ label: item.name, value: item.id })) : witelList?.data?.map(item => ({ label: item.name, value: item.id })) || []).map(item => (
                                            <option key={"witel-" + item.label} value={item.value}>{item.label}</option>
                                          ))}
                                        </NativeSelect>
                                      </CustomFormControl>
                                    </div>
                                    <div className={`col-lg-6 col-md-12 ${styles.dFlex} ${styles.textFieldContainer}`}>
                                      {/* <CustomTextField id="standard-basic" onChange={handleChange} onBlur={handleBlur} label="DATEL" variant="standard" /> */}
                                      <CustomFormControl key='datel' variant="standard" >
                                        <CustomInputLabel id="demo-simple-select-standard-label">Datel</CustomInputLabel>

                                        <NativeSelect value={values.datel_id} onChange={(ev) => handleFilterOnChange(ev, "datel_id", values, setValues)} onBlur={handleBlur} inputProps={{
                                          name: 'datel_id',
                                          id: 'uncontrolled-native',
                                        }}>
                                          {((datelListClient) ? datelListClient?.map(item => ({ label: item.name, value: item.id })) : datelList?.data?.map(item => ({ label: item.name, value: item.id })) || []).map(item => (
                                            <option key={"datel-" + item.label} value={item.value}>{item.label}</option>
                                          ))}
                                        </NativeSelect>
                                      </CustomFormControl>
                                    </div>
                                    <div className={`col-lg-6 col-md-12 ${styles.dFlex} ${styles.textFieldContainer}`}>
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
                                    <div className={`col-lg-6 col-md-12 ${styles.dFlex} ${styles.textFieldContainer}`}>
                                      {/* <CustomTextField id="standard-basic" name='capacity' value={values.capacity} onChange={handleChange} onBlur={handleBlur} label="Kapasitas" variant="standard" /> */}
                                      <CustomFormControl key='capacity' variant="standard" >
                                        <CustomInputLabel id="demo-simple-select-standard-label">Kapasitas</CustomInputLabel>

                                        <NativeSelect value={values.capacity} onChange={(ev) => {
                                          setValues(prev => ({ ...prev, capacity: parseInt(ev.target.value), port_feeder_terminasi: (ev.target.value == "144" ? "24" : "48") }))
                                          console.log(values.capacity)
                                        }} onBlur={handleBlur} inputProps={{
                                          name: 'capacity',
                                          id: 'uncontrolled-native',
                                        }}>
                                          {[{ value: 144, label: "144" }, { value: 288, label: "288" }].map(item => <option key={"capacity-" + item.label} value={item.value}>{item.label}</option>)}

                                        </NativeSelect>
                                      </CustomFormControl>
                                    </div>
                                    <div className={`col-lg-6 col-md-12 ${styles.dFlex} ${styles.textFieldContainer}`}>
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
                                    <div className={`col-lg-6 col-md-12 ${styles.dFlex} ${styles.textFieldContainer}`}>
                                      <CustomTextField id="standard-basic" name='deployment_date' value={values.deployment_date} onChange={handleChange} onBlur={handleBlur} label="Deployment Date" color='primary'
                                        variant="standard" />
                                    </div>
                                    {/* </Typography> */}
                                  </div>
                                )}
                              </div>
                              <div
                                className={styles.spacer}
                                role="tabpanel"
                                hidden={values.tabs !== 1}
                                id={`simple-tabpanel-${1}`}
                                aria-labelledby={`simple-tab-${1}`}
                              // {...other}
                              >
                                {values.tabs === 1 && (
                                  <div className='row'>
                                    {/* <Typography> */}
                                    <div className={`col-lg-6 col-md-12 ${styles.dFlex} ${styles.textFieldContainer}`}>
                                      <CustomTextField style={{ pointerEvents: "none" }} id="standard-basic" name='port_feeder_terminasi' value={values.port_feeder_terminasi} onChange={handleChange} onBlur={handleBlur} label="Port Feeder Terminasi" variant="standard" />
                                    </div>
                                    <div className={`col-lg-6 col-md-12 ${styles.dFlex} ${styles.textFieldContainer}`}>
                                      <CustomTextField id="standard-basic" name='rak_oa' value={values.rak_oa} onChange={handleChange} onBlur={handleBlur} label="Rak OA" variant="standard" />
                                    </div>
                                    <div className={`col-lg-6 col-md-12 ${styles.dFlex} ${styles.textFieldContainer}`}>
                                      <CustomTextField id="standard-basic" name='panel_oa' value={values.panel_oa} onChange={handleChange} onBlur={handleBlur} label="Panel" variant="standard" />
                                    </div>
                                    <div className={`col-lg-6 col-md-12 ${styles.dFlex} ${styles.textFieldContainer}`}>
                                      <CustomTextField id="standard-basic" name='port' value={values.port} onChange={handleChange} onBlur={handleBlur} label="Port" color='primary'
                                        variant="standard" />
                                    </div>
                                    {/* </Typography> */}
                                  </div>
                                )}
                              </div>



                            </div>
                            <div className={odcStyles.actionContainer}>
                              <CustomButtonModal onClick={(ev) => handleOnChange(ev, values.tabs - 1, setValues)} style={{ visibility: (values.tabs <= 0) ? "hidden" : "visible" }} variant="contained" color='primary' size="large">
                                Prev
                              </CustomButtonModal>
                              <div className='row'>
                                <div className='col-md-12 col-lg-6'>
                                  {(values.tabs > 0) && <CustomButtonModal btntype={"submit"} type={"submit"} onClick={(ev) => (values.tabs > 0) ? handleOpen : handleOnChange(ev, values.tabs + 1, setValues)} variant="contained" color='primary' size="large" disabled={isSubmitting}>
                                    Submit
                                  </CustomButtonModal>}
                                </div>
                                <div className='col-md-12 col-lg-6'>
                                  {(values.tabs > 0) && <CustomButtonModal btntype='cancel' onClick={() => handleClose()} variant="contained" color='primary' size="large">
                                    Cancel
                                  </CustomButtonModal>}
                                </div>
                              </div>
                              <div>

                                <CustomButtonModal style={{ visibility: (values.tabs > 0) ? "hidden" : "visible" }} onClick={(ev) => (values.tabs > 0) ? handleOpen : handleOnChange(ev, values.tabs + 1, setValues)} variant="contained" color='primary' size="large">
                                  {(values.tabs <= 0) ? "Next" : ""}
                                </CustomButtonModal>
                              </div>
                            </div>
                          </form>
                        )}
                      </Formik>
                    }
                  </div>
                </Box>
              </div>
            </Modal>
          </p>
          <p>
            <CustomButton onClick={handleLogout} variant='contained' > Sign Out</CustomButton>
          </p>
        </div>
      </div>
      <div className={styles.footer}>
        {/* <p>© 2022 Telkom Indonesia, Tbk. All rights reserved</p> */}
      </div>
      {/* <div className={styles.sidebarBackground}></div> */}
    </div>
  )
}
const mapStateToProps = state => ({
  gotopage: state.Layout.goto,
  gotopageLoading: state.Layout.page_loading
  // regionList: state.ODCs.region_list,
  // witelList: state.ODCs.witel_list,
  // datelList: state.ODCs.datel_list,
  // stoList: state.ODCs.sto_list,
  // merekList: state.ODCs.merek_list
});
const mapDispatchToProps = {
  changePageTo: IchangePageTo,
  addODCData,
  getRegionList,
  getWitelList,
  getDatelList,
  getSTOList,
  getMerekList,
};

export default connect(mapStateToProps, mapDispatchToProps)(Index_evolve)