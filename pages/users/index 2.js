import React from 'react'
import withAuth from '../../components/Auth';
import {Modal,Box} from '@material-ui/core';
import { createTheme, MuiThemeProvider,styled } from "@material-ui/core/styles";
import dynamic from 'next/dynamic';
import { 
  styled as styledCustom
} from "@mui/material/styles";
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
import {getUserData} from '../../components/store/users/actions'
import { wrapper } from '../../components/store';
import { END } from 'redux-saga';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';

const CustomButtonModal = styledCustom(Button)(({ theme }) => ({
  background: theme.status.primary,
}));

const CustomButton = styled(Button)(({ theme }) => ({
  color: theme.status.primary,
}));
const CustomButtonModalGray = styledCustom(Button)(({ theme }) => ({
  background: theme.status.darkgray,
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
const getMuiTheme = () =>
createTheme({
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
  },
});

function User({data}) {
  const [datatable, setDatatable] = React.useState([[]])
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  React.useEffect(()=>{
  setDatatable(data.map(item=>([
    item.name,item.email,
    item.address,
    item.status,
    <div key={0} className={odcStyles.tableAction}>
        <CustomButton onClick={handleOpen} variant='text'>
          <MdRemoveRedEye />
        </CustomButton>
        <CustomButton onClick={()=>deleteRow(item.id)} variant='text'>
          <MdDeleteForever />
        </CustomButton>
        <Modal open={open} onClose={handleClose} aria-labelledby="modal-modal-title"
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
                      <h4 className={odcStyles.cardTitle}>{`User Details`}</h4>
                      <div className={odcStyles.stats}>
                        {/*
                        <MdOutlineDateRange width={16} height={"auto"} /> */}
                        lengkapi semua isian yang ada
                      </div>
                    </div>
                    <div className={`${odcStyles.cardBody} card-body row ${odcStyles.customCardBodyUser}`}>
                      <div className={`row ${odcStyles.formGap}`}>
                        <div className={`col-lg-6 col-md-12 ${odcStyles.dFlex} ${odcStyles.textFieldContainer}`}>
                          <CustomTextField id="standard-basic" label="Name" variant="standard" defaultValue={item.name} />
                        </div>
                        <div className={`col-lg-6 col-md-12 ${odcStyles.dFlex} ${odcStyles.textFieldContainer}`}>
                          <CustomTextField id="standard-basic" label="Email" variant="standard" defaultValue={item.email} />
                        </div>
                        <div className={`col-lg-6 col-md-12 ${odcStyles.dFlex} ${odcStyles.textFieldContainer}`}>
                          <CustomTextField id="standard-basic" label="Password" type={"password"} variant="standard" defaultValue={item.password} />
                        </div>
                        <div className={`col-lg-6 col-md-12 ${odcStyles.dFlex} ${odcStyles.textFieldContainer}`}>
                          <CustomTextField id="standard-basic" label="Role" color='primary' variant="standard"
                            defaultValue={item.role} />
                        </div>
                        <div className={`col-lg-6 col-md-12 ${odcStyles.dFlex} ${odcStyles.textFieldContainer}`}>
                          <CustomTextField id="standard-basic" label="Address" variant="standard" defaultValue={item.address} />
                        </div>
                        <div className={`col-lg-6 col-md-12 ${odcStyles.dFlex} ${odcStyles.textFieldContainer}`}>
                          <CustomTextField id="standard-basic" label="Status" color='primary' variant="standard"
                            defaultValue={item.status} />
                        </div>
                      </div>
                    </div>
                    <div className={odcStyles.actionContainer}>
                      <div className='col-md-6'>
                        <div className='row'>

                            <div className={`col-md-12 col-lg-4 `}>
                              <CustomButtonModal>
                                {"Submit"}
                              </CustomButtonModal>
                            </div>
                            <div className={`col-md-12 col-lg-4 `}>
                              <CustomButtonModalGray onClick={()=>handleClose()}>
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
},[data,open])
  return (<div className={odcStyles.mainContent}>
    <div className={`container-fluid`}>
      <div className='row'>
        <div className="col-lg-12 col-md-12">
          <div className={`${odcStyles.card}`}>
            <div className={`${odcStyles.cardHeader} ${odcStyles.cardHeaderPrimary}`}>
              <h4 className={odcStyles.cardTitle}>User Management</h4>
              {/* <div className={odcStyles.stats}>
                <MdOutlineDateRange width={16} height={"auto"} /> Last 24 Hours
              </div> */}
            </div>
            
            <div className="card-body table-responsive">
            <MuiThemeProvider theme={getMuiTheme()}>
              {datatable ? <DynamicMUIDataTable 
                options={{
                  selectableRows:false,
                  print: false,
                }} 
                checkboxSelection={false} 
                data={datatable} 
                columns={[{ 
                  name: "No" , 
                  options:{
                    customBodyRender:(value, tableMeta, update)=> {
                      let rowIndex = (tableMeta.rowData[1])?Number(tableMeta.rowIndex) + 1: "";
                      return ( <span>{rowIndex}</span> )
                    }
                  }
                },{
                  name: "Name",
                  options:{
                    customBodyRender:(value, tableMeta, update) => {
                      let newValue = tableMeta.rowData[0]
                      return ( <span>{newValue}</span> )
                    }
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
                  name: "Address",
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
                      let newValue = tableMeta.rowData[4]
                      return ( <span>{newValue}</span> )
                    }
                  }
                }]}
                />:null}

                {/* </ThemeProvider> */}
            </MuiThemeProvider>
            </div>
          </div>
        </div>
      </div>
    </div>
    </div>
  )
}

export const getServerSideProps = async (props) => wrapper.getServerSideProps(store => async ({req, res, ...etc}) => {
  // const {params:{odcId=[]}} = props;
  store.dispatch(getUserData())
  store.dispatch(END)
  await store.sagaTask.toPromise();

  // const {ODCs:{selectedOdcSplitpanelStatus}} = store.getState();
  // if(odcId.length!==0 && selectedOdcSplitpanelStatus==={}){
  //         return {
  //             notFound: true
  //         }
  //     }
  //     else{
          return {
              props:{ data: store.getState().Users.userData},
          } 

      // }
    })(props);

export default withAuth(User)