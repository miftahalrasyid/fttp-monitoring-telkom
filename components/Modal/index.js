import { Formik, Form, Field } from 'formik';
import React,{useState,useCallback,useEffect} from 'react';
import {MdClose} from 'react-icons/md'
import styles from './modal.module.css';
import { 
    styled as styledCustom 
} from "@mui/material/styles";
import {
    Button,
    Typography
} from "@material-ui/core";
import {
    MdOutlineClose,
    MdOutlineDeleteForever
} from 'react-icons/md';
import MetisMenu from '@metismenu/react';
import 'metismenujs/dist/metismenujs.css';
import odcStyles from '../Sidebar/sidebar.module.css';
import {Modal as MUIModal,Box} from '@material-ui/core';
import TextField from '@mui/material/TextField';
import NativeSelect from '@mui/material/NativeSelect';
const CustomButtonModal = styledCustom(Button)(({ theme }) => ({
    background: theme.status.primary,
}));
const CustomButtonModalGray = styledCustom(Button)(({ theme }) => ({
    background: theme.status.darkgray,
}));
const CustomNativeSelect = styledCustom(NativeSelect)(({theme})=>({
  // color: theme.status.primary,
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
function Modal(props) {
    const {
      header="feeder 2",
      splitter,
      passive_out,
      feederModal,
      feederFocus= {
        distribution: [
          {distribution_id: "",
          distribution_index: null,
          distribution_level: null,
          distribution_level_id: null
        }, {
          distribution_id: "",
          distribution_index: null,
          distribution_level: null,
          distribution_level_id: null
        }, {
          distribution_id: "",
          distribution_index: null,
          distribution_level: null,
          distribution_level_id: null
        }, {
          distribution_id: "",
          distribution_index: null,
          distribution_level: null,
          distribution_level_id: null
        }],
        
        distributionElm: [null, null, null, null],
        feeder: {feeder_id: '', feeder_index: null, feeder_level: null},
        feederElm: null,
        odpName: ['', '', '', ''],
        splitter: {splitter_id: '', splitter_index: null},
        splitterElm: null
      },
      splitterData,
      panelData=[{type:""}]
    } = props;
   
    // const { distribution:distributionData, feeder:feederData} = panelData
    // console.log("panelData",panelData)
    // console.log("feederFocus",feederFocus.distribution)
    // console.log("feedermodal",panelData.filter(pn=>pn.type==='distribution').map(ds=>{

    //   return ds.data.map(dsit=>({index:dsit.index ,status:dsit.status,rak:ds.rak_index}))
    // }))
    const availDistribution = panelData.filter(pn=>pn.type==='distribution').map(ds=>{

      return ds.data.map(dsit=>({index:dsit.index ,status:dsit.status,rak_index:ds.rak_index,rak_level:ds.rak_level}))
    }) || [];
    // console.log("availDistribution",availDistribution)
    // console.log("feederfokus",feederFocus)
    const [feed=false,setFeed] = feederModal || [];
    const handleClose = () => setFeed(false);
    const [openDeleteRowModal, setOpenDeleteRowModal] = React.useState(false);
    const deleteRowHandleOpen = () => setOpenDeleteRowModal(true);
    const deleteRowHandleClose = () => setOpenDeleteRowModal(false);
    // console.log("openDeleteRowModal",openDeleteRowModal)
    return (
        <MUIModal key={header} open={feed} onClose={handleClose} className={`${styles.modalWrapper}`} aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description">
                  <div>
                  <div className={odcStyles.closebtn}>
                    <MdOutlineClose/>
                  </div>
                  <MetisMenu>
                <Box sx={{
                  position: "absolute",
                  top: "50%",
                  left: "50%",
                  transform: "translate(-50%, -50%)",
                  border: 0,
                  borderRadius: "6px",
                  color: "#333",
                  width:"90%",
                  maxWidth: "600px",
                  boxShadow: "0 2px 2px 0 rgb(0 0 0 / 14%), 0 3px 1px -2px rgb(0 0 0 / 20%), 0 1px 5px 0 rgb(0 0 0 / 12%)",
                  boxShadow: "0 1px 4px 0 rgb(0 0 0 / 14%)",
                  "div":{
                      margin:0
                  }
                }}>
                 
                  <div className={`${odcStyles.card}  ${odcStyles.cardStats}`}>
                    <div className={`${odcStyles.cardHeader} ${odcStyles.cardHeaderPrimary}`}>
                      <h4 className={odcStyles.cardTitle}>{header.toUpperCase()}</h4>
                      <div className={odcStyles.stats}>
                        atur koneksi feeder ke splitter dan distribusi
                      </div>
                    </div>
                    <div className={`${odcStyles.cardBody} card-body row`}>
                      <div className={`row ${odcStyles.formGap}`}>
                        {/* <div className={`col-lg-12 col-md-12 ${styles.textFieldContainer}`}> */}
                          <div className={`row ${odcStyles.formGap}`}>
                            <div className={`col-lg-4 col-md-6 ${styles.textFieldContainer}`}>
                              <p>Splitter</p>

                            </div>
                            <div className={`col-lg-8 col-md-6 ${styles.textFieldContainer} ${styles.splitter}`}>
                            <CustomNativeSelect defaultValue={feederFocus.splitter.splitter_id?"sp"+feederFocus.splitter.splitter_id:"0"} inputProps={{
                                    name: 'Splitter',
                                    id: 'uncontrolled-native',
                                    }} className={`col-lg-12 ${styles.splitterGap}`}>
                                      <option value={0}>Empty</option>
                                      {
                                        feederFocus.splitter.splitter_id && 
                                        <option key={"splitter"+feederFocus.splitter.splitter_index} value={"sp"+feederFocus.splitter.splitter_id}>{feederFocus?.splitter?.splitter_index}</option>
                                      }
                                      {splitterData?.filter(item=>item.status==="idle").map(item=><option key={"splitter"+item.index} value={"sp"+item.id}>{item.index}</option>
                                      )}
                              </CustomNativeSelect>
                            </div>
                          </div>
                        {/* <CustomTextField id="standard-basic" label="Splitter" variant="standard" className={`col-lg-12 ${styles.splitterGap}`}/> */}
                        {/* </div> */}
                        <div className={`col-lg-12 col-md-12 ${styles.textFieldContainer}`}>
                          <div className={`row ${odcStyles.formGap}`}>
                            <div className={`col-lg-4 col-md-12 ${styles.textFieldContainer}`}>
                              <p>Passive Out 1</p>
                            </div>
                            <div className={`col-lg-4 col-md-12  ${styles.textFieldContainer}`}>
                              <CustomTextField id="standard-basic" label="ODP Name 1" defaultValue={(feederFocus.odpName)?feederFocus.odpName[0] : null} variant="standard" />
                            </div>
                            <div className={`col-lg-4 col-md-12 ${styles.textFieldContainer}`}>
                            {/* {feederFocus.distribution[0].distribution_index} */}
                              <NativeSelect /*onChange={po1ClickHandler}*/ defaultValue={feederFocus.distribution[0].distribution_id?"dist_po1"+feederFocus.distribution[0].distribution_id:null} inputProps={{
                                    name: 'Distribusi PO1',
                                    id: 'uncontrolled-native',
                                    }} className={`col-lg-12 ${styles.splitterGap}`}>
                                      <option value={0}>Empty</option>
                                      {
                                        feederFocus.distribution[0].distribution_id && 
                                        <option key={"dist_po1"+feederFocus.distribution[0].distribution_index} value={"dist_po1"+feederFocus.distribution[0].distribution_id}>{(feederFocus?.distribution[0].distribution_level%2==0)?"D"+feederFocus?.distribution[0]?.distribution_level_id+"-"+(feederFocus.distribution[0].distribution_index+12):"D"+feederFocus?.distribution[0]?.distribution_level_id+"-"+feederFocus.distribution[0].distribution_index}</option>
                                      }
                                      {availDistribution.map((item,idx)=>{
                                        // console.log("ds",item)
                                       
                                      return  item.map(dsitem=>{
                                        // console.log("dsiteman",dsitem)
                                        // console.log("dsitem",(dsitem.rak_level%2==0)?"D"+dsitem.rak_index+"-"+(dsitem.index+13):"D"+dsitem.rak_index+"-"+dsitem.index)
                                          if(dsitem.status!=="used")
                                        return <option key={"dist_po1"+"D"+dsitem.rak_index+"_"+dsitem.index} value={0}>{(dsitem.rak_level%2==0)?"D"+dsitem.rak_index+"-"+(dsitem.index+12):"D"+dsitem.rak_index+"-"+dsitem.index}</option>
                                      })
                                      })}
                              </NativeSelect>
                            </div>
                          </div>
                        </div>
                        <div className={`col-lg-12 col-md-12 ${styles.textFieldContainer}`}>
                          <div className={`row ${odcStyles.formGap}`}>
                          <div className={`col-lg-4 col-md-12 ${styles.textFieldContainer}`}>
                              <p>Passive Out 2</p>
                            </div>
                              <div className={`col-lg-4 col-md-12 ${styles.textFieldContainer}`}>
                                <CustomTextField id="standard-basic" label="ODP Name 2" defaultValue={(feederFocus.odpName)?feederFocus.odpName[1] : null} variant="standard" />
                              </div>
                              <div className={`col-lg-4 col-md-12 ${styles.textFieldContainer}`}>
                              <NativeSelect defaultValue={feederFocus?.distribution[1]?.distribution_id?"dist_po2"+feederFocus?.distribution[1]?.distribution_id:null} inputProps={{
                                    name: 'Distribusi PO2',
                                    id: 'uncontrolled-native',
                                    }} className={`col-lg-12 ${styles.splitterGap}`}>
                                      <option value={0}>Empty</option>
                                      {
                                        feederFocus?.distribution[1]?.distribution_id && 
                                        <option key={"dist_po2"+feederFocus.distribution[1].distribution_index} value={"dist_po2"+feederFocus?.distribution[1]?.distribution_id}>{(feederFocus?.distribution[1].distribution_level%2==0)?"D"+feederFocus?.distribution[1]?.distribution_level_id+"-"+(feederFocus.distribution[1].distribution_index+12):"D"+feederFocus?.distribution[1]?.distribution_level_id+"-"+feederFocus.distribution[1].distribution_index}</option>
                                      }
                                      {availDistribution.map((item,idx)=>{
                                        // console.log("ds",item)
                                       
                                      return  item.map(dsitem=>{
                                        // console.log("dsiteman",dsitem)
                                        // console.log("dsitem",(dsitem.rak_level%2==0)?"D"+dsitem.rak_index+"-"+(dsitem.index+13):"D"+dsitem.rak_index+"-"+dsitem.index)
                                          if(dsitem.status!=="used")
                                        return <option key={"dist_po2"+"D"+dsitem.rak_index+"_"+dsitem.index} value={0}>{(dsitem.rak_level%2==0)?"D"+dsitem.rak_index+"-"+(dsitem.index+12):"D"+dsitem.rak_index+"-"+dsitem.index}</option>
                                      })
                                      })}
                              </NativeSelect>
                              </div>
                              </div>
                        </div>
                        <div className={`col-lg-12 col-md-12  ${styles.textFieldContainer}`}>
                          <div className={`row ${odcStyles.formGap}`}>
                          <div className={`col-lg-4 col-md-12  ${styles.textFieldContainer}`}>
                              <p>Passive Out 3</p>
                            </div>
                              <div className={`col-lg-4 col-md-12 ${styles.textFieldContainer}`}>
                                <CustomTextField id="standard-basic" label="ODP Name 3" defaultValue={(feederFocus.odpName)?feederFocus.odpName[2] : null} variant="standard" />
                              </div>
                              <div className={`col-lg-4 col-md-12 ${styles.textFieldContainer}`}>
                              <NativeSelect defaultValue={feederFocus?.distribution[2]?.distribution_id?"dist_po3"+feederFocus?.distribution[2]?.distribution_id:null} inputProps={{
                                    name: 'Distribusi PO3',
                                    id: 'uncontrolled-native',
                                    }} className={`col-lg-12 ${styles.splitterGap}`}>
                                      <option value={0}>Empty</option>
                                      {
                                        feederFocus?.distribution[2]?.distribution_id && 
                                        <option key={"dist_po3"+feederFocus.distribution[2].distribution_index} value={"dist_po3"+feederFocus?.distribution[2]?.distribution_id}>{(feederFocus?.distribution[1].distribution_level%2==0)?"D"+feederFocus?.distribution[2]?.distribution_level_id+"-"+(feederFocus.distribution[2].distribution_index+12):"D"+feederFocus?.distribution[2]?.distribution_level_id+"-"+feederFocus.distribution[2].distribution_index}</option>
                                      }
                                      {availDistribution.map((item,idx)=>{
                                        // console.log("ds",item)
                                       
                                      return  item.map(dsitem=>{
                                        // console.log("dsiteman",dsitem)
                                        // console.log("dsitem",(dsitem.rak_level%2==0)?"D"+dsitem.rak_index+"-"+(dsitem.index+13):"D"+dsitem.rak_index+"-"+dsitem.index)
                                          if(dsitem.status!=="used")
                                        return <option key={"dist_po3"+"D"+dsitem.rak_index+"_"+dsitem.index} value={0}>{(dsitem.rak_level%2==0)?"D"+dsitem.rak_index+"-"+(dsitem.index+12):"D"+dsitem.rak_index+"-"+dsitem.index}</option>
                                      })
                                      })}
                              </NativeSelect>
                              </div>
                            </div>
                        </div>
                        <div className={`col-lg-12 col-md-12  ${styles.textFieldContainer}`}>
                          <div className={`row ${odcStyles.formGap}`}>
                          <div className={`col-lg-4 col-md-12 ${styles.textFieldContainer}`}>
                              <p>Passive Out 4</p>
                            </div>
                              <div className={`col-lg-4 col-md-12  ${styles.textFieldContainer}`}>
                                <CustomTextField id="standard-basic" label="ODP Name 4" defaultValue={(feederFocus.odpName)?feederFocus.odpName[3] : null} variant="standard" />
                              </div>
                              <div className={`col-lg-4 col-md-12 ${styles.textFieldContainer}`}>
                              <NativeSelect defaultValue={feederFocus?.distribution[3]?.distribution_id?"dist_po4"+feederFocus?.distribution[3]?.distribution_id:null} inputProps={{
                                    name: 'Distribusi PO4',
                                    id: 'uncontrolled-native',
                                    }} className={`col-lg-12 ${styles.splitterGap}`}>
                                      <option value={0}>Empty</option>
                                      {
                                        feederFocus?.distribution[3]?.distribution_id && 
                                        <option key={"dist_po4"+feederFocus.distribution[3].distribution_index} value={"dist_po4"+feederFocus?.distribution[3]?.distribution_id}>{(feederFocus?.distribution[1].distribution_level%2==0)?"D"+feederFocus?.distribution[3]?.distribution_level_id+"-"+(feederFocus.distribution[3].distribution_index+12):"D"+feederFocus?.distribution[3]?.distribution_level_id+"-"+feederFocus.distribution[3].distribution_index}</option>
                                      }
                                      {availDistribution.map((item,idx)=>{
                                        // console.log("ds",item)
                                       
                                      return  item.map(dsitem=>{
                                        // console.log("dsiteman",dsitem)
                                        // console.log("dsitem",(dsitem.rak_level%2==0)?"D"+dsitem.rak_index+"-"+(dsitem.index+13):"D"+dsitem.rak_index+"-"+dsitem.index)
                                          if(dsitem.status!=="used")
                                        return <option key={"dist_po4"+"D"+dsitem.rak_index+"_"+dsitem.index} value={0}>{(dsitem.rak_level%2==0)?"D"+dsitem.rak_index+"-"+(dsitem.index+12):"D"+dsitem.rak_index+"-"+dsitem.index}</option>
                                      })
                                      })}
                              </NativeSelect>
                              </div>
                            </div>
                          </div>
                      </div>
                    <div className={`col-lg-12 col-md-12  
                      ${odcStyles.deleteFeeder}`}>
                      <div className={`row `}>
                        <div className={`col-md-12 col-lg-6 `}>
                          <div className={odcStyles.actionContainer}>
                            <div className={`col-md-12 col-lg-6 `}>
                              <CustomButtonModal>
                                {"Submit"}
                              </CustomButtonModal>
                            </div>
                            <div className={`col-md-12 col-lg-6 `}>
                              <CustomButtonModalGray onClick={()=>handleClose()}>
                                {"Cancel"}
                              </CustomButtonModalGray>
                            </div>
                          </div>
                        </div>
                        <div className={`col-md-12 col-lg-6 ${styles.deleteFeeder} ${styles.textFieldContainer}`}>
                          <Button onClick={deleteRowHandleOpen}>

                            <MdOutlineDeleteForever />delete feeder
                          </Button>
                          <MUIModal open={openDeleteRowModal} onClose={deleteRowHandleClose} >
            <div>
                  <div className={styles.closebtn}>
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
                      maxWidth: "480px",
                      boxShadow: "0 2px 2px 0 rgb(0 0 0 / 14%), 0 3px 1px -2px rgb(0 0 0 / 20%), 0 1px 5px 0 rgb(0 0 0 / 12%)",
                      boxShadow: "0 1px 4px 0 rgb(0 0 0 / 14%)",
                    }}>
                      <div className={`${odcStyles.card}  ${odcStyles.cardStats}`}>
                        <div className={`${odcStyles.cardHeader} ${odcStyles.cardHeaderPrimary}`}>
                          <h4 className={odcStyles.cardTitle}>{"Konfirmasi Delete"}</h4>
                          <div className={odcStyles.stats}>
                            proses ini akan menghapus data feeder secara permanen. mohon di cek kembali
                          </div>
                        </div>
                        <div className={`${odcStyles.cardBody} card-body row`}>
                          <div className={odcStyles.confirmationWrapper}>
                            <div className={`col-md-12`}>
                            <Typography variant='h6' className={odcStyles.confirmationTitle}>
                              Anda yakin akan menghapus {header} ?
                            </Typography>
                            </div>
                            <div className={odcStyles.actionContainer}>

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
            </MUIModal>
                        </div>
                      </div>
                    </div>
                    </div>
                    
                  </div>
                </Box>
                </MetisMenu>
                </div>
              </MUIModal>
    )
}

export default Modal;
