import React, { useCallback, useState, useEffect, useRef } from 'react'
import withAuth from '../../components/Auth';
import { Modal, Box, InputLabel, NativeSelect, Typography } from '@material-ui/core';
import FormControl from '@mui/material/FormControl';
import { createTheme, MuiThemeProvider, styled } from "@material-ui/core/styles";
import { createTheme as customCreateTheme, ThemeProvider } from "@mui/material/styles";
import dynamic from 'next/dynamic';
import jwt from 'jwt-decode';
import {
  styled as styledCustom
} from "@mui/material/styles";
import { ToastContainer, toast } from 'react-toastify';

const DynamicMUIDataTable = dynamic(() => import('mui-datatables'), { ssr: false }) as any;
import {
  MdOutlineDateRange,
  MdOpenInBrowser,
  MdRemoveRedEye,
  MdOutlineClose,
  MdDeleteForever
} from 'react-icons/md';
import { connect } from 'react-redux';
import odcStyles from '../odc/odc.module.css';
import {
  getUserData,
  addNewUser,
  updateUserData,
  deleteUser,
  setTableRowsPerPage as IsetTableRowsPerPage
} from '../../components/store/users/actions'
import {
  getRegionList,
  getWitelList,
  getDatelList,
  getSTOList,
  getMerekList,
  addODCData,
} from '../../components/store/odcs/actions';
import { changePageTo as IchangePageTo } from '../../components/store/layouts/actions';
import { wrapper } from '../../components/store';
import { END } from 'redux-saga';
import {
  Button
} from "@material-ui/core";
// import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import { Formik } from 'formik';
import { ButtonProps, CircularProgress, CircularProgressProps, InputAdornment, InputLabelProps, NativeSelectProps, TextFieldProps } from '@mui/material';
import { Visibility, VisibilityOff } from '@mui/icons-material';

const CustomButtonModal = styledCustom(Button)<ButtonProps>(({ theme, btntype }) => ({
  background: btntype == 'submit' ? theme.status.success : btntype == 'cancel' ? "gray !important" : theme.status.primary,
  color: "white !important",
}));
const CustomCircularProgress = styledCustom(CircularProgress)<CircularProgressProps>(({ theme, btncolor }) => ({
  color: btncolor == "success" ? theme.status.success : theme.status.primary
}))
const CustomButton = styledCustom(Button)<ButtonProps>(({ theme }) => ({
  color: theme.status.primary,
}));
const CustomButtonModalGray = styledCustom(Button)<ButtonProps>(({ theme }) => ({
  background: theme.status.darkgray,
}));
const CustomInputLabel = styledCustom(InputLabel)<InputLabelProps>(({ theme }) => ({
  '&.Mui-focused': {
    color: theme.status.primary,

  }
}));
const CustomTextField = styledCustom(TextField)<TextFieldProps>(({ theme }) => ({
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
const CustomNativeSelect = styledCustom(NativeSelect)<NativeSelectProps>(({ theme }) => ({

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
    components: {
      MuiPaper: {
        styleOverrides: {
          root: {
            // margin:"1rem 0",
            // background: 'rgba(255,255,255,0.3)',
            background: 'transparent',
            // padding:'0 1rem',
            boxShadow: "none",
            ".MuiList-root": {
              width: "100%"
            },
            ".MuiMenuItem-root": {
              width: "100%",
              display: "flex",
              paddingTop: "8px",
              paddingBottom: "8px",
            }
          }
        }
      },
      MuiPopover: {
        styleOverrides: {
          paper: {
            background: "white",
            boxShadow: "0px 2px 1px -1px rgb(0 0 0 / 20%), 0px 1px 1px 0px rgb(0 0 0 / 14%), 0px 1px 3px 0px rgb(0 0 0 / 12%)"
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
      MuiOutlinedInput: {
        styleOverrides: {
          root: {
            color: "#ee2d24!important"
          }
        }
      },
      MuiTypography: {
        styleOverrides: {
          root: {
            fontFamily: "'GothamRounded-Book' !important"
          }
        }
      },
      MuiButtonBase: {
        styleOverrides: {
          root: {
            fontFamily: "'GothamRounded-Book' !important"
          }
        }
      },
      MuiTableRow: {
        styleOverrides: {
          root: {
            color: "#ee2d24",
            backgroundColor: "transparent"
            // background:"rgba(255,255,255,0.3)"
          },
          "head": {
            // backgroundImage:"linear-gradient(to right,rgba(178,98,98,0.3),rgb(255 228 228 / 30%))",
            backgroundImage: "linear-gradient(to right,rgb(237 167 88 / 30%),rgb(253 243 236 / 30%))",
          },
        }
      },
      MuiTableCell: {
        styleOverrides: {
          root: {
            "span": {
              display: "flex",
              justifyContent: "center",
            },
          },
          head: {
            backgroundColor: "transparent !important",
          }
        }
      },
      MuiMenu: {
        styleOverrides: {
          paper: {
            boxShadow: "0px 2px 1px -1px rgb(0 0 0 / 20%), 0px 1px 1px 0px rgb(0 0 0 / 14%), 0px 1px 3px 0px rgb(0 0 0 / 12%) !important"
          },
          list: {
            background: "white",
          }
        }
      },
      MuiInput: {
        styleOverrides: {
          underline: { '&:after': { borderBottomColor: "#ee2d24!important" } }
        }
      },
      MuiButton: {
        styleOverrides: {
          textPrimary: {
            color: "#ee2d24!important"
          }
        }
      },
      MuiCheckbox: {
        styleOverrides: {
          colorPrimary: {
            color: "#ee2d24!important"
          }
        }
      },
      MuiIconButton: {
        styleOverrides: {
          root: {
            flex: " 0 0 auto !important",
            color: "rgba(0, 0, 0, 0.54) !important",
            padding: " 12px !important",
            overflow: "visible !important",
            fontSize: "1.5rem !important",
            textAlign: "center !important",
            transition: "background-color 150ms cubic-bezier(0.4, 0, 0.2, 1) 0ms !important",
            borderRadius: " 50% !important",
            '&:hover': { color: '#ee2d24 !important' },
            '&[class*="iconActive"]': {
              color: '#ee2d24 !important'
            }
          } as any,

        }
      },
      MuiToolbar: {
        styleOverrides: {
          root: {

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
  user_rowsPerPage,
  getUserData_userSaga,
  user_list_client = { success: false, data: [], total_rows: "", count: "" },
  updateUserData,
  setTableRowsPerPage,
  changePageTo
}: {
  user_list: {
    success: boolean,
    count: number,
    data: Array<any>,
    sortOrder: string,
    page: number,
    msg?: string
  },
  user_rowsPerPage: number,
  email: string,
  deleteUser: any,
  token: string,
  getUserData_userSaga: typeof getUserData,
  user_list_client: any,
  updateUserData: any,
  setTableRowsPerPage: typeof IsetTableRowsPerPage,
  changePageTo: typeof IchangePageTo
}) {
  const [datatable, setDatatable] = React.useState([[]]);
  const [newTableState, setNewTableState] = useState({ page: 0, rowsPerPage: 5, search_text: null, sort: { orderBy: null, direction: null }, filter: [] })
  const delay = useRef(null);
  // console.log("rows per page user",user_rowsPerPage)
  /**
   * single modal popup
   */
  const [selectedModalValue, setSelectedModalValue] = useState({
    email: "",
    password: "",
    role: "",
    status: "",
    id: "",
  });
  const [singleModalPopup, setSingleModalPopup] = useState(false);
  const singleModalPopupOpen = (selectedModalId) => {
    // console.log("selectedModalValue",selectedModalId)
    setSelectedModalValue(selectedModalId)
    setSingleModalPopup(true);
  }
  const singleModalPopupClose = () => {
    setSingleModalPopup(false)
  };
  /**
 * single modal delete
 */
  const [singleConfirmDeletePopup, setSingleConfirmDeletePopup] = useState(false);
  const [selectedConfirmDeletePopup, setSelectedConfirmDeletePopup] = useState({ id: "", email: "", rowsPerPage: 0 });
  const singleConfirmDeletePopupOpen = (selectedConfirmDeleteValue) => {
    setSelectedConfirmDeletePopup(selectedConfirmDeleteValue);
    setSingleConfirmDeletePopup(true);
  }
  const singleConfirmDeletePopupClose = () => {
    setSingleConfirmDeletePopup(false);
  }
  // console.log("total rows",user_list)
  var [error, setError] = useState({ status: false, msg: "" });
  const [open, setOpen] = React.useState(user_list.data.map(item => ({ status: false })));


  const [openDeleteRowModal, setOpenDeleteRowModal] = React.useState(user_list.data.map(item => ({ status: false })));


  /** delete user */
  const [deleteSubmitting, setDeleteSubmitting] = useState(false);
  const delete_user = useCallback(() => {
    // console.log("submitting",idx,user_list?.data,user_list?.data[idx])

    deleteUser(selectedConfirmDeletePopup.email,
      selectedConfirmDeletePopup.id,
      token, newTableState.page + 1, newTableState.rowsPerPage, newTableState.sort, setDeleteSubmitting, singleConfirmDeletePopupClose, toast);
  }, [selectedConfirmDeletePopup, setDeleteSubmitting, token, deleteUser, newTableState])
  React.useEffect(() => {
    setTimeout(() => {
      if (document.querySelector('[itemref="userDetailModal"]'))
        (document.querySelector('[itemref="userDetailModal"]') as HTMLElement).style.top = "50%";
      if (document.querySelector('[itemref="userDeleteModal"]'))
        (document.querySelector('[itemref="userDeleteModal"]') as HTMLElement).style.top = "50%";
    }, 50);


  }, [user_list, open, openDeleteRowModal])
  useEffect(() => {
    setDatatable(user_list?.data?.map((item, idx) => ([
      item.row_number,
      item.email,
      item.role_name,
      item.user_status,
      item.role,
      item.status,
      item.id
    ])))
  }, [user_list])

  useEffect(() => {
    if (user_list_client.success) {
      // console.log("fetch new data", user_list_client)
      // setSubmitting(user_list_client.data.map(item=>({status:false})));
      setDatatable(user_list_client?.data?.map((item, idx) => ([
        item.row_number,
        item.email,
        item.role_name,
        item.user_status,
        item.role,
        item.status,
        item.id
      ])))
    }
  }, [
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
  // useEffect(()=>{
  // console.log("new datatable", datatable)
  // },[datatable])
  /** error condition */
  useEffect(() => {
    // console.log("user_liset",user_list)
    if (!user_list.success) {
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
    if (!user_list.success) {
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
    // if(!error.success){
    //   toast.error(user_list.msg, {
    //     position: "top-right",
    //     autoClose: 5000,
    //     hideProgressBar: false,
    //     closeOnClick: true,
    //     pauseOnHover: true,
    //     draggable: true,
    //     progress: undefined,
    //   });
    // }
  }, [user_list, error]);

  const [showPassword, setShowPassword] = useState(false);
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
            selectableRows: "none",
            print: false,
            serverSide: true,
            // filter:false,
            searchText: newTableState.search_text,
            count: user_list_client?.count || user_list?.count,
            page: newTableState.page,
            rowsPerPage: newTableState.rowsPerPage,
            rowsPerPageOptions: [5, 10, 25, 50, 100],
            onTableInit: (test, tableState) => {
              // console.log("table init",tableState.rowsPerPage)
              setTableRowsPerPage(tableState.rowsPerPage)
              getUserData_userSaga({ page: tableState.page + 1, rowsPerPage: tableState.rowsPerPage, sortBy: null, sortOrder: null, email: null, filter: tableState.filterList }, token, null, toast)
            },
            onTableChange: (action, tableState) => {
              // console.log(action, tableState);

              // a developer could react to change on an action basis or
              // examine the state as a whole and do whatever they want

              switch (action) {
                case "changeRowsPerPage":
                  setTableRowsPerPage(tableState.rowsPerPage)
                  setNewTableState(prev => ({ ...prev, rowsPerPage: tableState.rowsPerPage }))
                  getUserData_userSaga({ page: newTableState.page + 1, rowsPerPage: tableState.rowsPerPage, sortBy: newTableState.sort.orderBy, sortOrder: newTableState.sort.direction, email: newTableState.search_text, filter: newTableState.filter }, token, null, toast)
                  break;
                case 'changePage':
                  setNewTableState(prev => ({ ...prev, page: tableState.page }))
                  getUserData_userSaga({ page: tableState.page + 1, rowsPerPage: newTableState.rowsPerPage, sortBy: newTableState.sort.orderBy, sortOrder: newTableState.sort.direction, email: newTableState.search_text, filter: newTableState.filter }, token, null, toast)
                  // this.changePage(tableState.page, tableState.sortOrder);
                  break;
                case "search":
                  // console.log("activate search", tableState.searchText)
                  setNewTableState(prev => ({ ...prev, page: 0, search_text: tableState.searchText }))
                  clearTimeout(delay.current);
                  delay.current = setTimeout(() => {
                    // changeODCPage({page:newTableState.page,rowsPerPage:newTableState.rowsPerPage, region:submittedFilter.regional,witel:submittedFilter.witel,datel:submittedFilter.datel,sto:submittedFilter.sto,sortBy:newTableState.sort.orderBy,sortOrder:newTableState.sort.direction,name:tableState.searchText},token,toast)
                    getUserData_userSaga({ page: 0, rowsPerPage: newTableState.rowsPerPage, sortBy: newTableState.sort.orderBy, sortOrder: newTableState.sort.direction, email: tableState.searchText, filter: newTableState.filter }, token, null, toast)
                  }, 500)
                  // setSearch_text(tableState.searchText)
                  break;
                // case 'propsUpdate':
                // getUserData(tableState.page+1,tableState.rowsPerPage, tableState.sortOrder,token)
                // break;
                case 'sort':
                  // console.log("odc name sort",tableState.sortOrder?.name?.toLocaleLowerCase())
                  let sortConvention = "";
                  switch (tableState.sortOrder?.name?.toLocaleLowerCase() || "") {
                    case "no":
                      // console.log("odc name")
                      sortConvention = "row_number"
                      break;
                    case "email":
                      // console.log("odc name")
                      sortConvention = "email"
                      break;
                    case "role":
                      // console.log("odc name")
                      sortConvention = "role_name"
                      break;
                    case "status":
                      // console.log("odc name")
                      sortConvention = "user_status"
                      break;

                    default:
                      break;
                  }
                  setNewTableState(prev => ({ ...prev, page: 0, sort: { orderBy: sortConvention, direction: tableState.sortOrder.direction.toLocaleUpperCase() } }))
                  getUserData_userSaga({ page: 0, rowsPerPage: newTableState.rowsPerPage, sortBy: sortConvention, sortOrder: tableState.sortOrder.direction, email: newTableState.search_text, filter: newTableState.filter }, token, null, toast)
                  // this.sort(tableState.page, tableState.sortOrder);
                  break;
                case 'filterChange':
                  // console.log("user filter", tableState.filterList)
                  setNewTableState(prev => ({ ...prev, page: 0, filter: tableState.filterList }))
                  getUserData_userSaga({ page: 0, rowsPerPage: newTableState.rowsPerPage, sortBy: newTableState.sort.orderBy, sortOrder: newTableState.sort.direction, email: newTableState.search_text, filter: tableState.filterList }, token, null, toast)
                  break;
                default:
                  // console.log('action not handled.');
                  break;
              }
            },
          }}
          checkboxSelection={false}
          data={datatable}
          columns={[{
            name: "No",
            options: {
              customBodyRender: (value, tableMeta, update) => {
                // console.log("table meta",tableMeta)
                // let rowIndex = (tableMeta.rowData[1])?Number(tableMeta.rowIndex) + 1: "";
                // let newValue = tableMeta.rowData[0]
                let newNumber = tableMeta.rowData[0]
                // return ( <span>{rowIndex}</span> )
                return (<span>{newNumber}</span>)
              },
              filter: false
            }
          }, {
            name: "Email",
            options: {
              customBodyRender: (value, tableMeta, update) => {
                let newValue = tableMeta.rowData[1]
                return (<span>{newValue}</span>)
              },
              filter: false
            }
          }, {
            name: "Role",
            options: {
              customBodyRender: (value, tableMeta, update) => {
                let newValue = tableMeta.rowData[2]
                return (<span>{newValue}</span>)
              },
              filter: true,
              // filterOptions: 'Admin User'
              filterOptions: {
                names: ['Admin', 'User']
              }
            }
          }, {
            name: "Status",
            options: {
              customBodyRender: (value, tableMeta, update) => {
                let newValue = tableMeta.rowData[3]
                return (<span>{newValue}</span>)
              },
              filter: true,
              filterOptions: {
                names: ['Active', 'Suspend']
              }
              // filterOptions: 'Active Suspend'
            }
          }, {
            name: "Status Id",
            options: {
              customBodyRender: (value, tableMeta, update) => {
                let newValue = tableMeta.rowData[3]
                return (<span>{newValue}</span>)
              },
              display: 'excluded',
              filter: false
            }
          }, {
            name: "id",
            options: {
              customBodyRender: (value, tableMeta, update) => {
                let newValue = tableMeta.rowData[6]
                return (<span>{newValue}</span>)
              },
              display: 'excluded',
              filter: false
            }
          },
          {
            name: "Aksi",
            options: {
              sort: false,
              customBodyRender: (value, tableMeta, update) => {
                // console.log("aksi",tableMeta.rowData[3])
                let newValue = tableMeta.rowData[4]
                return (<div key={0} className={odcStyles.tableAction}>
                  <CustomButton onClick={() => singleModalPopupOpen(
                    {
                      email: tableMeta.rowData[1],
                      password: "",
                      role: tableMeta.rowData[4] || "",
                      status: tableMeta.rowData[5],
                      id: tableMeta.rowData[6]
                      // region_id: 
                    }
                  )} variant='text'>
                    <MdRemoveRedEye fill='#3124c1' />
                  </CustomButton>
                  <CustomButton onClick={() => singleConfirmDeletePopupOpen({
                    email: tableMeta.rowData[1],
                    id: tableMeta.rowData[6],
                  })} variant='text'>
                    <MdDeleteForever fill='#B10040' />
                  </CustomButton>

                </div>)
              },
              filter: false
            },
          }]}
        /> : null}

        {/* </ThemeProvider> */}
      </ThemeProvider>
    </div>
    <Modal open={singleModalPopup} onClose={() => singleModalPopupClose()} aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description">
      <div>
        <div className={odcStyles.closebtn}>
          <MdOutlineClose />
        </div>
        <Box itemRef='userDetailModal' sx={{
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
          width: "90%",
          maxWidth: "600px",
          // boxShadow: "0 2px 2px 0 rgb(0 0 0 / 14%), 0 3px 1px -2px rgb(0 0 0 / 20%), 0 1px 5px 0 rgb(0 0 0 / 12%)",
          // boxShadow: "0 1px 4px 0 rgb(0 0 0 / 14%)",
        } as any}>
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
                  email: selectedModalValue.email,
                  password: selectedModalValue.password,
                  role: selectedModalValue.role,
                  status: selectedModalValue.status,
                  id: selectedModalValue.id,
                  page: newTableState.page,
                  rowsPerPage: newTableState.rowsPerPage,
                  sort: newTableState.sort,
                }}
                validate={values => {
                  const errors = {} as {
                    email: string
                  };
                  if (!values.email) {
                    errors.email = '*Wajib diisi';
                  } else if (
                    !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(values.email)
                  ) {
                    errors.email = '*Invalid email address';
                  }
                  return errors;
                }}
                onSubmit={(values, { setSubmitting }) => {
                  // console.log(values)
                  updateUserData(
                    values.email,
                    values.password,
                    values.role,
                    values.status,
                    values.id,
                    token,
                    values.page + 1,
                    values.rowsPerPage,
                    values.sort,
                    setSubmitting,
                    singleModalPopupClose,
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
                }) => (
                  <form className={odcStyles.form} onSubmit={handleSubmit}>
                    {/* {tableMeta.rowData[5]} */}
                    <div className={`row ${odcStyles.formGap}`}>
                      {/* <div className={`col-lg-6 col-md-12 ${odcStyles.dFlex} ${odcStyles.textFieldContainer}`}>
                                                <CustomTextField id="standard-basic" label="Name" variant="standard" defaultValue={item.name} />
                                              </div> */}
                      <div className={`col-md-12 ${odcStyles.dFlex} ${odcStyles.textFieldContainer}`}>
                        <CustomTextField name='email' label="Email" variant="standard" onChange={handleChange} onBlur={handleBlur} defaultValue={values.email} />
                      </div>
                      <div className={`col-md-12 ${odcStyles.dFlex} ${odcStyles.textFieldContainer}`}>
                        <CustomTextField
                          name='password' label="Password"
                          type={showPassword ? "text" : "password"}
                          size="small"
                          variant="standard"
                          onChange={handleChange}
                          onBlur={handleBlur}
                          value={values.password}
                          InputProps={
                            {
                              endAdornment: (
                                <InputAdornment position="end"> {
                                  showPassword ? (
                                    <Visibility
                                      onClick={() =>
                                        setShowPassword(prev => !prev)
                                      }
                                    />
                                  ) : (
                                    <VisibilityOff onClick={
                                      () =>
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
                        {/* <CustomTextField id="standard-basic" name='password' label="Password" type={"password"} onChange={handleChange} onBlur={handleBlur} variant="standard" defaultValue={values.password} /> */}
                      </div>
                      <div className={`col-md-12 ${odcStyles.dFlex} ${odcStyles.textFieldContainer}`}>
                        <FormControl key='role' variant="standard" sx={{ minWidth: 124 } as any}>
                          <CustomInputLabel id="demo-simple-select-standard-label">Role</CustomInputLabel>
                          <CustomNativeSelect onChange={handleChange} onBlur={handleBlur} value={values.role} inputProps={{
                            name: 'role',
                            id: 'uncontrolled-native-role',
                          }}>
                            <option key={"role-admin"} value="1"> Admin </option>
                            <option key={"role-user"} value="2"> User </option>
                          </CustomNativeSelect>
                        </FormControl>
                      </div>

                      <div className={`col-md-12 ${odcStyles.dFlex} ${odcStyles.textFieldContainer}`}>
                        <FormControl key={"status"} variant="standard" sx={{ minWidth: 124 }}>
                          <CustomInputLabel id="demo-simple-select-status-label">Status</CustomInputLabel>
                          <CustomNativeSelect onChange={handleChange} onBlur={handleBlur} defaultValue={values.status.toString()} inputProps={{
                            name: 'status',
                            id: 'uncontrolled-native-status',
                          }}>
                            <option key={"status-active"} value={"true"}> Active </option>
                            <option key={"status-suspend"} value={"false"}> Suspend </option>
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

                            {!isSubmitting ?
                              (<CustomButtonModal btntype={"submit"} type={"submit"} disabled={isSubmitting}>
                                {"Submit"}
                              </CustomButtonModal>)
                              : <CustomCircularProgress btncolor={"success"} size={24} style={{ position: 'relative', top: 4, display: "flex", margin: "auto" }} />
                            }
                          </div>
                          <div className={`col-md-12 col-lg-4 `}>
                            <CustomButtonModal btntype={"cancel"} onClick={() => singleModalPopupClose()}>
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
    <Modal open={singleConfirmDeletePopup} onClose={() => singleConfirmDeletePopupClose} >
      <div>
        <div className={odcStyles.closebtn}>
          <MdOutlineClose />
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
          width: "90%",
          maxWidth: "480px",
          // boxShadow: "0 2px 2px 0 rgb(0 0 0 / 14%), 0 3px 1px -2px rgb(0 0 0 / 20%), 0 1px 5px 0 rgb(0 0 0 / 12%)",
          boxShadow: "0 1px 4px 0 rgb(0 0 0 / 14%)",
        } as any}>
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
                    Anda yakin akan menghapus user {selectedConfirmDeletePopup.email} ?
                  </Typography>
                </div>
                <div className={odcStyles.actionContainer}>

                  <div >
                    {!deleteSubmitting ?
                      (<CustomButtonModal onClick={delete_user}>
                        {"Delete"}
                      </CustomButtonModal>)
                      : <CustomCircularProgress size={24} style={{ position: 'relative', top: 4, display: "flex", margin: "auto" }} />
                    }
                  </div>
                  <div >
                    <CustomButtonModal btntype={"cancel"} onClick={() => singleConfirmDeletePopupClose()} >
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
    {/* </div>
        </div>
      </div>
    </div> */}
  </div>
  )
}

export const getServerSideProps = async (props) => wrapper.getServerSideProps(store => async ({ req, res, ...etc }) => {
  // const {params:{odcId=[]}} = props;
  // console.log("token value",jwt(req.cookies.token))
  if (!req.cookies.token)
    return {
      notFound: true
    }
  // redirect:{
  //   permanent:false,
  //   destination: "/"
  // }
  const { role } = jwt(req.cookies.token) as any;
  // store.dispatch(getUserData({ page: 1, rowsPerPage: 5, sortBy: null, sortOrder: null, email: null, filter: [] }, req.cookies.token, null, toast))
  store.dispatch(getUserData({ page: 1, rowsPerPage: 5, sortBy: null, sortOrder: null, email: '', filter: null }, req.cookies.token, null, toast))
  /**
   * untuk button add odc pada page users
   */
  store.dispatch(getRegionList(req.cookies.token))
  store.dispatch(getWitelList(req.cookies.token))
  store.dispatch(getDatelList(req.cookies.token))
  store.dispatch(getSTOList(req.cookies.token))
  store.dispatch(getMerekList(req.cookies.token, toast))
  store.dispatch(END)
  await store.sagaTask.toPromise();
  // console.log("get user data",store.getState().Users.userData)
  // const {ODCs:{selectedOdcSplitpanelStatus}} = store.getState();
  // if(odcId.length!==0 && selectedOdcSplitpanelStatus==={}){
  if (role !== 1) {

    return {
      notFound: true
    }
  }
  //     }
  //     else{
  // console.log("user list",store.getState()?.Users?.userData)
  return {
    props: {
      user_list: store.getState()?.Users?.userData || { success: false, count: 0, data: [], sortOrder: "", page: 0 },
      user_list_loading: store.getState()?.Users?.loading?.getUser || false,
      /**
       * untuk button add odc pada page users
       */
      regionList: store.getState().ODCs.region_list || [{ id: 0, name: "" }],
      witelList: store.getState().ODCs.witel_list || [{ id: 0, region_id: 0, name: "" }],
      datelList: store.getState().ODCs.datel_list || [{ id: 0, region_id: 0, witel_id: 0, name: "" }],
      stoList: store.getState().ODCs.sto_list || [{ id: 0, region_id: 0, witel_id: 0, datel_id: 0, name: "" }],
      merekList: store.getState().ODCs.merek_list || [{ id: "", name: "", splitter_position: "", splitter_capacity: "" }],
      token: req.cookies.token,
    },
  }

  // }
})(props);
const mapStateToProps = state => ({
  user_list_client: state.Users.userData,
  user_rowsPerPage: state.Users.tableRowsPerPage,
  gotopageLoading: state.Layout.page_loading
})

const mapDispatchToProps = {
  changePageTo: IchangePageTo,
  addNewUser,
  getUserData_userSaga: getUserData,
  updateUserData,
  deleteUser,
  setTableRowsPerPage: IsetTableRowsPerPage
}
export default connect(mapStateToProps, mapDispatchToProps)(withAuth(User))