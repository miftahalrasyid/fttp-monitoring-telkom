import React,{useCallback, useState, useEffect} from 'react'
import withAuth from '../../components/Auth';
import {Modal,Box,FormControl,InputLabel,NativeSelect, Typography} from '@material-ui/core';
import { createTheme, MuiThemeProvider,styled } from "@material-ui/core/styles";
import {createTheme as customCreateTheme, ThemeProvider} from "@mui/material/styles";
import dynamic from 'next/dynamic';
import jwt from 'jwt-decode';
import { 
  styled as styledCustom
} from "@mui/material/styles";
import {ToastContainer, toast } from 'react-toastify';

const DynamicMUIDataTable = dynamic(() => import('mui-datatables'),{ ssr: false });
import {
  MdOutlineDateRange,
  MdOpenInBrowser,
  MdRemoveRedEye,
  MdOutlineClose,
  MdDeleteForever
} from 'react-icons/md';
import {connect} from 'react-redux';
import odcStyles from '../odc/odc.module.css';
import {
  getUserData,
  addNewUser,
  updateUserData,
  deleteUser
} from '../../components/store/users/actions'
import { wrapper } from '../../components/store';
import { END } from 'redux-saga';
import {
  Button
  } from "@material-ui/core";
// import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import { Formik } from 'formik';
import { CircularProgress } from '@mui/material';

const CustomButtonModal = styledCustom(Button)(({ theme, btntype }) => ({
  background: btntype == 'submit' ? theme.status.success: btntype == 'cancel'? "gray !important":theme.status.primary,
  color:"white !important",
}));
const CustomCircularProgress = styledCustom(CircularProgress)(({theme,btncolor})=>({
  color: btncolor== "success" ? theme.status.success: theme.status.primary
}))
const CustomButton = styledCustom(Button)(({ theme }) => ({
  color: theme.status.primary,
}));
const CustomButtonModalGray = styledCustom(Button)(({ theme }) => ({
  background: theme.status.darkgray,
}));
const CustomInputLabel = styledCustom(InputLabel)(({ theme }) => ({
  '&.Mui-focused':{
    color: theme.status.primary,

  }
}));
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
const CustomNativeSelect = styledCustom(NativeSelect)(({ theme }) => ({

  '&::after': {
    borderColor: theme.status.primary
  },
}));
const getMuiTheme = () =>
customCreateTheme({
  status: {
    success: "#009873!important",
    primary: "#B10040!important",
    darkgray: "darkgray!important"
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
          backgroundImage:"linear-gradient(to right,rgba(178,98,98,0.3),rgb(255 228 228 / 30%))",
          backgroundImage:"linear-gradient(to right,rgb(237 167 88 / 30%),rgb(253 243 236 / 30%))",
        },
      }
    },
    MuiTableCell:{
      styleOverrides:{
        root:{
          "span":{
            display:"flex",
            justifyContent:"center",
          },
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
        },
        
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

function User({
  user_list,
  email,
  deleteUser,
  token,
  getUserData,
  user_list_client={success:false,data:[],total_rows:""},
  updateUserData
}) {
  const [datatable, setDatatable] = React.useState([[]]);
  // console.log("total rows",user_list)
  var [error, setError] = useState({status:false,msg:""});
  const [open, setOpen] = React.useState(user_list.data.map(item=>({status:false})));
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

  const [openDeleteRowModal, setOpenDeleteRowModal] = React.useState(user_list.data.map(item=>({status:false})));
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

  /** delete user */
const [submitting,setSubmitting] = useState(user_list.data.map(item=>({status:false})));
  useEffect(()=>{
  },[submitting])
  const delete_user = useCallback((idx)=>{
      // console.log("submitting",idx,user_list?.data,user_list?.data[idx])
      setSubmitting(prev=>{
        prev[idx].status = true;
        return {...prev}
      })

      deleteUser(user_list_client.success ? user_list_client.data[idx].email: user_list?.data[idx].email,
        idx,
        user_list_client.success ? user_list_client.data[idx].id: user_list?.data[idx].id,
        token,setSubmitting,deleteRowHandleClose,toast);
    },[setSubmitting,token,user_list?.data,deleteUser,deleteRowHandleClose,user_list_client?.data,user_list_client?.success])
  React.useEffect(()=>{
    setTimeout(()=>{
      if(document.querySelector('[itemref="userDetailModal"]'))
      document.querySelector('[itemref="userDetailModal"]').style.top = "50%";
      if(document.querySelector('[itemref="userDeleteModal"]'))
      document.querySelector('[itemref="userDeleteModal"]').style.top = "50%";
    },50);
if(!user_list_client.success)
  setDatatable(user_list?.data?.map((item,idx)=>([
    idx+1,
    item.email,
    item.role_name,
    item.user_status,
    item.role,
    item.status,
])))

},[user_list?.data,open,openDeleteRowModal,user_list_client?.success])
useEffect(()=>{
  if(user_list_client.success){
    console.log("fetch new data", user_list_client)
    setOpen(user_list_client.data.map(item=>({status:false})));
    setOpenDeleteRowModal(user_list_client.data.map(item=>({status:false})));
    setSubmitting(user_list_client.data.map(item=>({status:false})));
    setDatatable(user_list_client?.data?.map((item,idx)=>([
      idx+1,
      item.email,
      item.role_name,
      item.user_status,
      item.role,
      item.status,

    ])))
  }
},[
  user_list_client,
  // deleteRowHandleClose,
  // deleteRowHandleOpen,
  // delete_user,
  // handleClose,
  // handleOpen,
  // open,
  // openDeleteRowModal,
  // submitting
])
useEffect(()=>{
  console.log("new datatable", datatable)
},[datatable])
/** error condition */
useEffect(()=>{
  // console.log("user_liset",user_list)
  if(!user_list.success){
    // console.log(user_list.msg)
    // console.log(toast)
    toast.error(user_list.msg, {
      position: "top-right",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
    });
  }
  /** if offline */
  if(!user_list.success){
    toast.error("Anda tidak terhubung dengan internet", {
      position: "top-right",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
    });
  }
  if(!error.success){
    toast.error(user_list.msg, {
      position: "top-right",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
    });
  }
},[user_list,error]);


  return (<div className={odcStyles.mainContent}>
    {/* <ToastContainer/> */}
    {/* <div className={`container-fluid`}>
      <div className='row'>
        <div className="col-lg-12 col-md-12">
          <div className={`${odcStyles.card}`}> */}
            {/* <div className={`${odcStyles.cardHeader} ${odcStyles.cardHeaderPrimary}`}>
              <h4 className={odcStyles.cardTitle}>User Management</h4>
            </div> */}
            
            <div className="card-body table-responsive">
            <ThemeProvider theme={getMuiTheme()}>
              {datatable ? <DynamicMUIDataTable 
                options={{
                  selectableRows:"none",
                  print: false,
                  serverSide:true,
                  count:user_list_client?.count || user_list?.count,
                  onTableChange: (action, tableState) => {
                    console.log(action, tableState);
            
                    // a developer could react to change on an action basis or
                    // examine the state as a whole and do whatever they want
            
                    switch (action) {
                      case 'changePage':
                        getUserData(tableState.page+1,tableState.rowsPerPage, tableState.sortOrder,token)
                        // this.changePage(tableState.page, tableState.sortOrder);
                        break;
                      case 'propsUpdate':
                        // getUserData(tableState.page+1,tableState.rowsPerPage, tableState.sortOrder,token)
                        // break;
                      case 'sort':
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
                  name: "No" , 
                  options:{
                    customBodyRender:(value, tableMeta, update)=> {
                      console.log("table meta",tableMeta)
                      // let rowIndex = (tableMeta.rowData[1])?Number(tableMeta.rowIndex) + 1: "";
                      // let newValue = tableMeta.rowData[0]
                      let newNumber = tableMeta.tableState.page*tableMeta.tableState.rowsPerPage+tableMeta.rowData[0]
                      // return ( <span>{rowIndex}</span> )
                      return ( <span>{newNumber}</span> )
                    },
                    
                  }
                },{
                  name: "Email",
                  options:{
                    customBodyRender:(value, tableMeta, update) => {
                      let newValue = tableMeta.rowData[1]
                      return ( <span>{newValue}</span> )
                    }
                  }
                },{
                  name: "Role",
                  options:{
                    customBodyRender:(value, tableMeta, update) => {
                      let newValue = tableMeta.rowData[2]
                      return ( <span>{newValue}</span> )
                    }
                  }
                },{
                  name: "Status",
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
                      // console.log("aksi",tableMeta.rowData[3])
                      let newValue = tableMeta.rowData[4]
                      return (       <div key={0} className={odcStyles.tableAction}>
                        <CustomButton onClick={()=>handleOpen(tableMeta.rowData[0]-1)} variant='text'>
                          <MdRemoveRedEye fill='#3124c1'/>
                        </CustomButton>
                        <CustomButton onClick={()=>deleteRowHandleOpen(tableMeta.rowData[0]-1)} variant='text'>
                           <MdDeleteForever fill='#B10040'/>
                        </CustomButton>
                        <Modal open={open[tableMeta.rowData[0]-1]?.status} onClose={()=>handleClose(tableMeta.rowData[0]-1)} aria-labelledby="modal-modal-title"
                                aria-describedby="modal-modal-description">
                                                  <div>
                              <div className={odcStyles.closebtn}>
                                <MdOutlineClose/>
                              </div>
                                <Box itemRef='userDetailModal'  sx={{
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
                                  // boxShadow: "0 1px 4px 0 rgb(0 0 0 / 14%)",
                                }}>
                                {/* <Box sx={odcStyles.card}> */}
                                  <div className={`${odcStyles.card} ${odcStyles.cardStats}`}>
                                    <div className={`${odcStyles.cardHeader} ${odcStyles.cardHeaderPrimary}`}>
                                      <h4 className={odcStyles.cardTitle}>{`User Details`}</h4>
                                      <div className={odcStyles.stats}>
                                        {/*
                                        <MdOutlineDateRange width={16} height={"auto"} /> */}
                                        lengkapi semua isian yang ada
                                      </div>
                                    </div>
                                    <div className={`${odcStyles.cardBody} card-body row ${odcStyles.customCardBodyUser}`}>
                                      <Formik
                                        initialValues={{
                                          email:tableMeta.rowData[1],
                                          password:"",
                                          role:tableMeta.rowData[4] || "",
                                          status:tableMeta.rowData[5] ? true:false,
                                        }}
                                        validate={values => {
                                          const errors = {};
                                          if (!values.email) {
                                            errors.email = '*Wajib diisi';
                                          } else if (
                                            !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(values.email)
                                          ) {
                                            errors.email = '*Invalid email address';
                                          }
                                          return errors;
                                        }}
                                        onSubmit={(values,{setSubmitting})=>{
                                          console.log(values)
                                          updateUserData(
                                            values.email,
                                            values.password,
                                            values.role,
                                            values.status,
                                            tableMeta.rowData[0]-1,
                                            user_list_client.success ? user_list_client.data[tableMeta.rowData[0]-1].id: user_list?.data[tableMeta.rowData[0]-1].id,
                                            token,
                                            setSubmitting,
                                            handleClose,
                                            toast);
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
                                        })=>(
                                          <form className={odcStyles.form} onSubmit={handleSubmit}>
                                            {tableMeta.rowData[5]}
                                            <div className={`row ${odcStyles.formGap}`}>
                                              {/* <div className={`col-lg-6 col-md-12 ${odcStyles.dFlex} ${odcStyles.textFieldContainer}`}>
                                                <CustomTextField id="standard-basic" label="Name" variant="standard" defaultValue={item.name} />
                                              </div> */}
                                              <div className={`col-md-12 ${odcStyles.dFlex} ${odcStyles.textFieldContainer}`}>
                                                <CustomTextField id="standard-basic" name='email' label="Email" variant="standard" onChange={handleChange} onBlur={handleBlur} defaultValue={values.email} />
                                              </div>
                                              <div className={`col-md-12 ${odcStyles.dFlex} ${odcStyles.textFieldContainer}`}>
                                                <CustomTextField id="standard-basic" name='password' label="Password" type={"password"} onChange={handleChange} onBlur={handleBlur} variant="standard" defaultValue={values.password} />
                                              </div>
                                              <div className={`col-md-12 ${odcStyles.dFlex} ${odcStyles.textFieldContainer}`}>
                                              <FormControl key='role' variant="standard" sx={{ m: 1, minWidth: 124 }}>
                                              <CustomInputLabel id="demo-simple-select-standard-label">Role</CustomInputLabel>
                      
                                              <CustomNativeSelect onChange={handleChange} onBlur={handleBlur} defaultValue={values.role} inputProps={{
                                                  name: 'role',
                                                  id: 'uncontrolled-native',
                                                  }}>
                                                    <option key={"role-admin"} value="1"> Admin </option>
                                                    <option key={"role-user"} value="2"> User </option>
                                              </CustomNativeSelect>
                                              </FormControl>
                                              </div>
                                              
                                              <div className={`col-md-12 ${odcStyles.dFlex} ${odcStyles.textFieldContainer}`}>
                                              <FormControl key={"status"} variant="standard" sx={{ m: 1, minWidth: 124 }}>
                                              <CustomInputLabel  id="demo-simple-select-standard-label">Status</CustomInputLabel>
                      
                                              <CustomNativeSelect onChange={handleChange} onBlur={handleBlur} defaultValue={values.status} inputProps={{
                                                  name: 'status',
                                                  id: 'uncontrolled-native',
                                                  }}>
                                                    <option key={"status-active"} value={true}> Active </option>
                                                    <option key={"status-suspend"} value={false}> Suspend </option>
                                              </CustomNativeSelect>
                                              </FormControl>
                                              </div>
                                              {/* <div className={`col-lg-6 col-md-12 ${odcStyles.dFlex} ${odcStyles.textFieldContainer}`}>
                                                <CustomTextField id="standard-basic" label="Address" variant="standard" defaultValue={item.address} />
                                              </div> */}
                                              {/* <div className={`col-lg-6 col-md-12 ${odcStyles.dFlex} ${odcStyles.textFieldContainer}`}>
                                                <CustomTextField id="standard-basic" label="Status" color='primary' variant="standard"
                                                  defaultValue={item.status} />
                                              </div> */}
                                            </div>
                                            <div className={odcStyles.actionContainer}>
                                      <div className='col-md-6'>
                                        <div className='row'>
                
                                            <div className={`col-md-12 col-lg-4 `}>

                                              {!submitting[tableMeta.rowData[0]-1]?.status ? 
                                                (<CustomButtonModal btntype={"submit"} type={"submit"} disabled={isSubmitting}>
                                                {"Submit"}
                                              </CustomButtonModal>) 
                                                :<CustomCircularProgress btncolor={"success"} size={24} style={{ position: 'relative', top: 4,display:"flex",margin:"auto"}} /> 
                                                }
                                            </div>
                                            <div className={`col-md-12 col-lg-4 `}>
                                              <CustomButtonModal btntype={"cancel"} onClick={()=>handleClose(tableMeta.rowData[0]-1)}>
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
                        <Modal open={openDeleteRowModal[tableMeta.rowData[0]-1]?.status} onClose={()=>deleteRowHandleClose(tableMeta.rowData[0]-1)} >
                        <div>
                              <div className={odcStyles.closebtn}>
                                <MdOutlineClose/>
                              </div>
                              
                                <Box itemRef='userDeleteModal' sx={{
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
                                  <div className={`${odcStyles.card}  ${odcStyles.cardStats}`}>
                                    <div className={`${odcStyles.cardHeader} ${odcStyles.cardHeaderPrimary}`}>
                                      <h4 className={odcStyles.cardTitle}>{"Konfirmasi Delete"}</h4>
                                      <div className={odcStyles.stats}>
                                        proses ini akan menghapus user secara permanen. mohon di cek kembali
                                      </div>
                                    </div>
                                    <div className={`${odcStyles.cardBody} card-body row`}>
                                      <div className={odcStyles.confirmationWrapper}>
                                        <div className={`col-md-12`}>
                                        <Typography variant='h6' className={odcStyles.confirmationTitle}>
                                          Anda yakin akan menghapus user {tableMeta.rowData[1]} ?
                                        </Typography>
                                        </div>
                                        <div className={odcStyles.actionContainer}>
                
                                              <div >
                                                {!submitting[tableMeta.rowData[0]-1]?.status ? 
                                                (<CustomButtonModal onClick={()=>delete_user(tableMeta.rowData[0]-1)}>
                                                  {"Delete"}
                                                </CustomButtonModal>) 
                                                :<CustomCircularProgress size={24} style={{ position: 'relative', top: 4,display:"flex",margin:"auto"}} /> 
                                                }
                                              </div>
                                              <div >
                                                <CustomButtonModal btntype={"cancel"} onClick={()=>deleteRowHandleClose(tableMeta.rowData[0]-1)} >
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
                    </div> )
                    },
                    filter:false
                  },
                }]}
                />:null}

                {/* </ThemeProvider> */}
            </ThemeProvider>
            </div>
          {/* </div>
        </div>
      </div>
    </div> */}
    </div>
  )
}

export const getServerSideProps = async (props) => wrapper.getServerSideProps(store => async ({req, res, ...etc}) => {
  // const {params:{odcId=[]}} = props;
  const {role} = jwt(req.cookies.token);
  console.log("token value",jwt(req.cookies.token))
  if(!req.cookies.token || role!==1)
  return {
    redirect:{
      permanent:false,
      destination: "/"
    }
  }
  store.dispatch(getUserData(1,10, {name:"",direction:"asc"},req.cookies.token,null,toast))
  store.dispatch(END)
  await store.sagaTask.toPromise();

  // const {ODCs:{selectedOdcSplitpanelStatus}} = store.getState();
  // if(odcId.length!==0 && selectedOdcSplitpanelStatus==={}){
    if(role!==1){

              return {
                  notFound: true
              }
    }
  //     }
  //     else{
    console.log("user list",store.getState()?.Users?.userData)
          return {
              props:{ 
                user_list: store.getState()?.Users?.userData || {success:false,data:[],count:0,sortOrder:{name:"",direction:"asc"},page:1},
                user_list_loading: store.getState()?.Users?.loading?.getUser || false,
                token: req.cookies.token
              },
          } 

      // }
    })(props);
const mapStateToProps = state =>({
  user_list_client: state.Users.userData,
})

const mapDispatchToProps = {
  addNewUser,
  getUserData,
  updateUserData,
  deleteUser,
}
export default connect(mapStateToProps,mapDispatchToProps)(withAuth(User))