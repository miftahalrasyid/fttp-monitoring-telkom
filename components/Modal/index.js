import { Formik, Form, Field } from 'formik';
import React,{useState,useCallback,useEffect,useRef} from 'react';
import {MdClose} from 'react-icons/md';
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
import { CircularProgress, FormControl,FormHelperText,InputLabel } from '@mui/material';
import TextField from '@mui/material/TextField';
import NativeSelect from '@mui/material/NativeSelect';
import { toast } from 'react-toastify';
import { useRouter } from 'next/router';
const CustomButtonModal = styledCustom(Button)(({ theme, btntype }) => ({
    background: btntype == 'submit' ? theme.status.success: btntype == 'delete' ? theme.status.primary: btntype == 'canceldelete' ? theme.status.darkgray: theme.status.primary,
}));
const CustomCircularProgress = styledCustom(CircularProgress)(({theme, svgtype})=>({
  "svg":{
    color: svgtype == 'delete' ? theme.status.primary : theme.status.success
  }
}))
// const CustomButtonModalGray = styledCustom(Button)(({ theme }) => ({
//     background: theme.status.darkgray,
// }));
const CustomNativeSelect = styledCustom(NativeSelect)(({theme})=>({
  ".MuiNativeSelect-select":{
    textIndent:"0.5rem !important"
  }
  // color: theme.status.primary,
}))
const CustomFormControl = styledCustom(FormControl)(({theme,label})=>({
  width: "100%",
  ".MuiInputLabel-root":{
    transform:"translateY(-7px)"
  },
  ".MuiInput-root":{
    marginLeft: label=="splitter"?"7px !important":"0px !important",
  },
  ".MuiInputBase-root":{
    padding: "7px 0 0px",
    marginTop: "9px",
  }
}))
const CustomInputLabel = styledCustom(InputLabel)(({ theme }) => ({
  transform: "translate(0, -1.5px) scale(0.75) !important",
  '&.Mui-focused':{
    color: theme.status.primary,

  }
}));
const CustomTextField = styledCustom(TextField)(({ theme, label }) => ({
  color: theme.status.primary,
  '.MuiInputLabel-root.Mui-focused': {
    color: theme.status.primary,
  },
  '.MuiInput-root input':{
    textTransform: /ODP Name/.test(label) ? "uppercase" : "none"
  },
  '&.MuiFormControl-root':{
    width: "100%"
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
      token,
      passive_out,
      feederModal,
      dispatchFn:{setSelectedCoreFeeder,deleteSelectedCoreFeeder},
      feederFocus= {
        distribution: [
        {
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
    const router = useRouter();
    const {odcId} = router.query;
    // console.log("feeder modal", feederModal,odcId)
    const [availDistribution,setAvailDistribution] = useState(panelData.filter(pn=>pn.type==='distribution').map(ds=>{
      
      return ds.data.map(dsit=>({id: dsit.id,index:dsit.index ,status:dsit.status,rak_index:ds.rak_index,rak_level:ds.rak_level}))
    }) || [])
    useEffect(()=>{
      // console.log("avail dist",availDistribution)
    },[availDistribution])

const [distributionOnChange,setDistributionOnChange] = useState([
  {mapped:availDistribution,selected:{id: "",index:"" ,status:"",rak_index:"",rak_level:""}},
  {mapped:availDistribution,selected:{id: "",index:"" ,status:"",rak_index:"",rak_level:""}},
  {mapped:availDistribution,selected:{id: "",index:"" ,status:"",rak_index:"",rak_level:""}},
  {mapped:availDistribution,selected:{id: "",index:"" ,status:"",rak_index:"",rak_level:""}},
]);
const onchg1 = useCallback((ev,poid,setValues)=>{
  // console.log("dist on change",availDistribution,)
  // console.log(ev.target)
  // switch (poid) {
  //   case 0:
      let selectedDist = distributionOnChange[poid];
      // let selectedIndex = distributionOnChange[poid].index
      setValues(prev=>({...prev,["dist_port_"+(poid+1)]:ev.target.value}))
      // console.log("avail dist on change",poid,distributionOnChange[0])
      /**
       * change available option value on each distribution input when one or more input was selected
       */
      if(distributionOnChange[poid].selected.id!==""){
        // console.log("avail splice",(distributionOnChange[0].selected.rak_index)*(distributionOnChange[0].selected.index-1))
        setAvailDistribution(prev=>((prev
          .map((rak,idx)=>{
            if((selectedDist.selected.rak_index)==(idx+1))
              rak.splice((selectedDist.selected.rak_index)*(selectedDist.selected.index-1),0,selectedDist.selected)
            return rak
            .filter((elm)=>{
              // if(elm.id==ev.target.value)  
              // prev.splice((distributionOnChange[0].selected.rak_index)*(distributionOnChange[0].selected.index-1),0,distributionOnChange[0].selected)
              return elm.id!==ev.target.value
            })
            .map(dsit=>{
              
              return {id: dsit.id,index:dsit.index ,status:dsit.status,rak_index:dsit.rak_index,rak_level:dsit.rak_level}
            })
            
          }
          ))
        ));
        setDistributionOnChange(prev=>prev.map((item,idx)=>{
          if(idx!==poid){
            // console.log("set avail",availDistribution)
            return {mapped:item.mapped.map((rak,idx1)=>{
              // console.log("dist fil",rak.filter(elm=>elm.id!==ev.target.value))
              if((selectedDist.selected.rak_index)==(idx1+1) && selectedDist.selected.rak_level==(idx+2)){
                rak.splice((selectedDist.selected.rak_index)*(selectedDist.selected.index-1),0,selectedDist.selected)
                // console.log("avail masup",rak.filter((value,index,self)=>self.indexOf(value)===index),selectedDist.selected.rak_level)
              }
              return rak.filter((elm)=>{
                if(elm.id==ev.target.value){
                  // console.log("filter dist",elm.id==ev.target.value)
                }
                return elm.id!==ev.target.value
              }).filter((value,index,self)=>self.indexOf(value)===index).map(dsit=>({id: dsit.id,index:dsit.index ,status:dsit.status,rak_index:dsit.rak_index,rak_level:dsit.rak_level}))
            }),selected:(ev.target.value==0)?{id: "",index:"" ,status:"",rak_index:"",rak_level:""}:item.selected}
          }
          else {
            /** add selected option value*/
            return {mapped:item.mapped,selected:(ev.target.value==0)?{id: "",index:"" ,status:"",rak_index:"",rak_level:""}:item.mapped.map(rak=>{
              return rak.filter((elm)=>elm.id==ev.target.value)
            }).filter(fl=>fl).flat()[0]}
          }
        }))
      }
      /**
       * get selected value on first distribution input and adjust available option
       */
      else{

        setAvailDistribution(prev=>((prev
          .map(rak=>rak
            .filter((elm)=>elm.id!==ev.target.value)
            .map(dsit=>({id: dsit.id,index:dsit.index ,status:dsit.status,rak_index:dsit.rak_index,rak_level:dsit.rak_level}))
          ))
        ));
        setDistributionOnChange(prev=>prev.map((item,idx)=>{
          if(idx!==poid){
            // console.log("set avail",availDistribution)
            return {mapped:item.mapped.map(rak=>{
              // console.log("dist fil",rak.filter(elm=>elm.id!==ev.target.value))
              return rak.filter((elm)=>{
                if(elm.id==ev.target.value){
                  // console.log("filter dist",elm.id==ev.target.value)
                }
                return elm.id!==ev.target.value
              }).map(dsit=>({id: dsit.id,index:dsit.index ,status:dsit.status,rak_index:dsit.rak_index,rak_level:dsit.rak_level}))
            }),selected:(ev.target.value==0)?{id: "",index:"" ,status:"",rak_index:"",rak_level:""}:item.selected}
          }
          else {
            /** add selected option value*/
            return {mapped:item.mapped,selected:(ev.target.value==0)?{id: "",index:"" ,status:"",rak_index:"",rak_level:""}:item.mapped.map(rak=>{
              return rak.filter((elm)=>elm.id==ev.target.value)
            }).filter(fl=>fl).flat()[0]}
          }
        }))
      }
  //     break;
  
  //   default:
  //     break;
  // }
},[availDistribution])

    const [feed=false,setFeed] = feederModal || [];
    const handleClose = () => setFeed(prev=>({...prev,status:false}));
    const [openDeleteRowModal, setOpenDeleteRowModal] = React.useState(false);
    const [formError,setFormError] = useState({status:false,text:"*semua port distribusi kosong, silahkan pilih salah satu"});
    const deleteRowHandleOpen = () => setOpenDeleteRowModal(true);
    const deleteRowHandleClose = () => setOpenDeleteRowModal(false);
    const passiveOut2Ref = useRef(null);
    const passiveOut3Ref = useRef(null);
    const passiveOut4Ref = useRef(null);
    // console.log("openDeleteRowModal",openDeleteRowModal)
    useEffect(()=>{
    
      // console.log("odc",odc_edit_modal.current,document.querySelector('[itemref="testing"]'))
      setTimeout(()=>{
        // console.log("odc",document.querySelector('[itemref="detailFeederModal"]'))
        if(document.querySelector('[itemref="detailFeederModal"]'))
        document.querySelector('[itemref="detailFeederModal"]').style.top = "50%";
        if(document.querySelector('[itemref="detailFeederDeleteModal"]'))
        document.querySelector('[itemref="detailFeederDeleteModal"]').style.top = "50%";
      },50)
    },[feed,openDeleteRowModal])
    // useEffect(()=>{
    //   console.log("dist on change",distributionOnChange)
    // },[distributionOnChange[0].changed,distributionOnChange[0].id,JSON.stringify(availDistribution)])

    /**
     * splitter change
     */
    const handleSplitterChange = (ev,setValues) => {
      if(ev.target.value == ""){
        setValues(prev=>({...prev,dist_port_1:""}))
        setValues(prev=>({...prev,dist_port_2:""}))
        setValues(prev=>({...prev,dist_port_3:""}))
        passiveOut2Ref.current.style.display = "none";
        passiveOut3Ref.current.style.display = "none";
        passiveOut4Ref.current.style.display = "none";
      }
      else{
        passiveOut2Ref.current.style.display = "flex";
        passiveOut3Ref.current.style.display = "flex";
        passiveOut4Ref.current.style.display = "flex";
      }
      setValues(prev=>({...prev,splitter:ev.target.value}))
    }

    /**
     * delete feeder
     */
    const [deleteLoading,setDeleteLoading] = useState(false);
    const deleteFeederHandler = () => {
      console.log("deleteonclick",feederFocus, feederFocus.feeder.feeder_id)
      deleteSelectedCoreFeeder(odcId,feederFocus.feeder.feeder_index,feederFocus.feeder.feeder_id,[handleClose,deleteRowHandleClose],token,setDeleteLoading,toast,router)
    };
    return (
        <MUIModal key={header} open={feed.status} onClose={handleClose} className={`${styles.modalWrapper}`} aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description">
                  <div>
                  <div className={odcStyles.closebtn}>
                    <MdOutlineClose/>
                  </div>
                  <MetisMenu>
                <Box itemRef='detailFeederModal' sx={{
                  // position: "absolute",
                  top: "48%",
                  "div":{
                      margin:0
                  }
                }} className={odcStyles.modalBox}>
                 
                  <div className={`${odcStyles.card}  ${odcStyles.cardStats}`}>
                    <div className={`${odcStyles.cardHeader} ${odcStyles.cardHeaderPrimary}`}>
                      <h4 className={odcStyles.cardTitle}>{("Feeder "+feederFocus.feeder.feeder_index).toUpperCase()}</h4>
                      <div className={odcStyles.stats}>
                        atur koneksi feeder ke splitter dan distribusi
                      </div>
                    </div>
                    <Formik
                      initialValues={{
                        splitter: feederFocus.splitter.splitter_id?feederFocus.splitter.splitter_id:splitterData?.filter(item=>item.status==="idle")[0]?.id,
                        odp_name_1: (feederFocus.odpName)?feederFocus.odpName[0] : "",
                        odp_name_2: (feederFocus.odpName)?feederFocus.odpName[1] : "",
                        odp_name_3: (feederFocus.odpName)?feederFocus.odpName[2] : "",
                        odp_name_4: (feederFocus.odpName)?feederFocus.odpName[3] : "",
                        dist_port_1: feederFocus?.distribution[0]?.distribution_id?feederFocus?.distribution[0]?.distribution_id:"",
                        dist_port_2: feederFocus?.distribution[1]?.distribution_id?feederFocus?.distribution[1]?.distribution_id:"",
                        dist_port_3: feederFocus?.distribution[2]?.distribution_id?feederFocus?.distribution[2]?.distribution_id:"",
                        dist_port_4: feederFocus?.distribution[3]?.distribution_id?feederFocus?.distribution[3]?.distribution_id:"",
                      }}
                      validate={(values)=>{
                        var errors = {}
                        
                        if(values.odp_name_1!==""){
                          errors.dist_port_1_stat = "port dist 1 tidak boleh kosong";
                          
                        }
                        if(values.odp_name_1=="" || values.dist_port_1!==""){
                          errors.dist_port_1_stat = "";
                        }

                        if(values.odp_name_2!==""){
                          errors.dist_port_2_stat = "port dist 2 tidak boleh kosong";
                        }
                        if(values.odp_name_2=="" || values.dist_port_2!==""){
                          errors.dist_port_2_stat = "";
                        }

                        if(values.odp_name_3!==""){
                          errors.dist_port_3_stat = "port dist 3 tidak boleh kosong";
                        }
                        if(values.odp_name_3=="" || values.dist_port_3!==""){
                          errors.dist_port_3_stat = "";
                        }

                        if(values.odp_name_4!==""){
                          errors.dist_port_4_stat = "port dist 4 tidak boleh kosong";
                        }
                        if(values.odp_name_4=="" || values.dist_port_4!==""){
                          errors.dist_port_4_stat = "";
                        }
                        // console.log("errors",Object.values(errors).some(itm=>itm!=""))
                        return Object.values(errors).some(itm=>itm!="")?errors:false
                        // return values
                      }}
                      // validateOnBlur={true}
                      validateOnChange={true}
                      onSubmit={(values,{setSubmitting})=>{
                        // console.log(values)
                        let dist_value = [
                          {
                            po_index:"1",
                            name:values.odp_name_1.toString(),
                            distribution_id: values.dist_port_1.toString()
                          },
                          {
                            po_index:"2",
                            name:values.odp_name_2.toString(),
                            distribution_id: values.dist_port_2.toString()
                          },
                          {
                            po_index:"3",
                            name:values.odp_name_3.toString(),
                            distribution_id: values.dist_port_3.toString()
                          },
                          {
                            po_index:"4",
                            name:values.odp_name_4.toString(),
                            distribution_id: values.dist_port_4.toString()
                          },
                        ];
                        // console.log("add distribution value",dist_value.filter(itm=>itm!==""))
                        console.log("dist port",dist_value.some(itm=>(itm.distribution_id=="" && itm.name!=="")),dist_value.filter(itm=>itm.distribution_id!=="").length)
                        if(dist_value.filter(itm=>itm.distribution_id!=="").length==0){
                          setSubmitting(false)
                          setFormError(prev=>({...prev,status:true}))
                        }
                        else{
                          setFormError(prev=>({...prev,status:false}))
                          setSelectedCoreFeeder(odcId,feederModal[0].type,feederFocus.feeder.feeder_index,feederFocus.feeder.feeder_id,values.splitter,dist_value,handleClose,token,setSubmitting,toast,router)
                        }


                      }}
                    >
                      {({
                        values,
                        errors,
                        isValid,
                        isSubmitting,
                        setValues,
                        handleChange,
                        handleBlur,
                        handleSubmit
                      })=>(
                        <form className={odcStyles.form} onSubmit={handleSubmit}>
                        <div className={`${odcStyles.cardBody} card-body row`}>
                          <div className={`row ${odcStyles.formGap}`}>
                            {/* <div className={`col-lg-12 col-md-12 ${styles.textFieldContainer}`}> */}
                              <div className={`row ${odcStyles.formGap}`}>
                                <div className={`col-lg-3 col-md-6 ${styles.textFieldContainer}`}>
                                  <p>Splitter</p>

                                </div>
                                <div className={`col-lg-9 col-md-6 ${styles.textFieldContainer} ${styles.splitter}`}>
                                <CustomFormControl label={"splitter"} key='splitter' variant="standard" >
                                  <CustomNativeSelect 
                                    value={values.splitter} 
                                    onChange={(ev)=>handleSplitterChange(ev,setValues)}
                                    onBlur={handleBlur}
                                    inputProps={{
                                      name: 'splitter',
                                      id: 'uncontrolled-native',
                                    }} className={`col-lg-12 ${styles.splitterGap}`}>
                                      <option value={""}>Empty</option>
                                      {
                                        feederFocus.splitter.splitter_id && 
                                        <option key={"splitter"+feederFocus.splitter.splitter_index} value={feederFocus.splitter.splitter_id}>{feederFocus?.splitter?.splitter_index}</option>
                                        // <option key={"splitter"+feederFocus.splitter.splitter_index} value={"sp"+feederFocus.splitter.splitter_id}>{feederFocus?.splitter?.splitter_index}</option>
                                      }
                                      {splitterData?.filter(item=>item.status==="idle").map(item=><option key={"splitter"+item.index} value={item.id}>{item.index}</option>
                                      // {splitterData?.filter(item=>item.status==="idle").map(item=><option key={"splitter"+item.index} value={"sp"+item.id}>{item.index}</option>
                                    )}
                                  </CustomNativeSelect>
                                </CustomFormControl>
                                </div>
                              </div>
                            {/* <CustomTextField id="standard-basic" label="Splitter" variant="standard" className={`col-lg-12 ${styles.splitterGap}`}/> */}
                            {/* </div> */}
                            {/* <div className={`col-lg-12 col-md-12 ${styles.textFieldContainer}`}> */}
                              <div className={`row ${odcStyles.formGap}`}>
                                <div className={`col-lg-3 col-md-12 ${styles.textFieldContainer}`}>
                                  <p>Passive Out 1</p>
                                </div>
                                <div className={`col-lg-5 col-md-12  ${styles.textFieldContainer}`}>
                                  <CustomTextField id="standard-basic" name='odp_name_1' label="ODP Name 1" value={values.odp_name_1} onChange={handleChange} onBlur={handleBlur} variant="standard" />
                                </div>
                                <div className={`col-lg-4 col-md-12 ${styles.textFieldContainer}`}>
                                {/* {feederFocus.distribution[0].distribution_index} */}
                                <CustomFormControl key='dpo1' error={errors.dist_port_1_stat?true:false} variant="standard" >
                                    <CustomInputLabel id="demo-simple-select-standard-label">Distribusi PO1</CustomInputLabel>
                                  <NativeSelect /*onChange={po1ClickHandler}*/ onChange={(ev)=>onchg1(ev,0,setValues)} onBlur={handleBlur} value={values.dist_port_1} inputProps={{
                                        name: 'dist_port_1',
                                        id: 'uncontrolled-native',
                                        }} className={`col-lg-12 ${styles.splitterGap}`}>
                                          <option value={""}>Empty</option>
                                          {
                                            feederFocus.distribution[0].distribution_id && 
                                            <option key={"dist_po1"+feederFocus.distribution[0].distribution_index} value={feederFocus.distribution[0].distribution_id}>{(feederFocus?.distribution[0].distribution_level%2==0)?"D"+feederFocus?.distribution[0]?.distribution_level_id+"-"+(feederFocus.distribution[0].distribution_index+12):"D"+feederFocus?.distribution[0]?.distribution_level_id+"-"+feederFocus.distribution[0].distribution_index}</option>
                                          }
                                          {distributionOnChange[0].mapped.map((item,idx)=>{
                                            //level rak
                                            // console.log("ds",item)
                                          
                                          return  item.map((dsitem,idx1)=>{
                                            // level port
                                            // console.log("dsiteman",dsitem)
                                            // console.log("dsitem",(dsitem.rak_level%2==0)?"D"+dsitem.rak_index+"-"+(dsitem.index+13):"D"+dsitem.rak_index+"-"+dsitem.index)
                                              if(dsitem.status!=="used"){
                                                return <option key={"dist_po1"+"D"+dsitem.rak_index+"_"+dsitem.index} value={dsitem.id}>{"D"+dsitem.rak_index+"-"+dsitem.index}</option>
                                              }
                                          })
                                          })}
                                  </NativeSelect>
                                  <FormHelperText aria-labelledby='dpo1-helper'> {errors.dist_port_1_stat} </FormHelperText>
                                  </CustomFormControl>
                                </div>
                              </div>
                            {/* </div> */}
                            {/* <div className={`col-lg-12 col-md-12 ${styles.textFieldContainer}`}> */}
                              <div ref={passiveOut2Ref} className={`row ${odcStyles.formGap}`}>
                              <div className={`col-lg-3 col-md-12 ${styles.textFieldContainer}`}>
                                  <p>Passive Out 2</p>
                                </div>
                                  <div className={`col-lg-5 col-md-12 ${styles.textFieldContainer}`}>
                                    <CustomTextField id="standard-basic" name="odp_name_2" label="ODP Name 2" value={values.odp_name_2} onChange={handleChange} onBlur={handleBlur} variant="standard" />
                                  </div>
                                  <div className={`col-lg-4 col-md-12 ${styles.textFieldContainer}`}>
                                  <CustomFormControl key='dpo2' error={errors.dist_port_2_stat?true:false} variant="standard" >
                                    <CustomInputLabel id="demo-simple-select-standard-label">Distribusi PO2</CustomInputLabel>
                                    <NativeSelect onChange={(ev)=>onchg1(ev,1,setValues)} onBlur={handleBlur} value={values.dist_port_2} inputProps={{
                                          name: 'dist_port_2',
                                          id: 'uncontrolled-native',
                                          }} className={`col-lg-12 ${styles.splitterGap}`}>
                                            <option value={""}>Empty</option>
                                            {
                                              feederFocus?.distribution[1]?.distribution_id && 
                                              <option key={"dist_po2"+feederFocus.distribution[1].distribution_index} value={feederFocus?.distribution[1]?.distribution_id}>{(feederFocus?.distribution[1].distribution_level%2==0)?"D"+feederFocus?.distribution[1]?.distribution_level_id+"-"+(feederFocus.distribution[1].distribution_index+12):"D"+feederFocus?.distribution[1]?.distribution_level_id+"-"+feederFocus.distribution[1].distribution_index}</option>
                                            }
                                            {distributionOnChange[1].mapped.map((item,idx)=>{
                                              // console.log("ds",item)
                                            
                                            return  item.map(dsitem=>{
                                              // console.log("dsiteman",dsitem)
                                              // console.log("dsitem",(dsitem.rak_level%2==0)?"D"+dsitem.rak_index+"-"+(dsitem.index+13):"D"+dsitem.rak_index+"-"+dsitem.index)
                                                if(dsitem.status!=="used")
                                              return <option key={"dist_po2"+"D"+dsitem.rak_index+"_"+dsitem.index} value={dsitem.id}>{"D"+dsitem.rak_index+"-"+dsitem.index}</option>
                                              // return <option key={"dist_po2"+"D"+dsitem.rak_index+"_"+dsitem.index} value={dsitem.id}>{(dsitem.rak_level%2==0)?"D"+dsitem.rak_index+"-"+(dsitem.index+12):"D"+dsitem.rak_index+"-"+dsitem.index}</option>
                                            })
                                            })}
                                    </NativeSelect>
                                    <FormHelperText aria-labelledby='dpo1-helper'> {errors.dist_port_2_stat} </FormHelperText>
                                  </CustomFormControl>
                                  </div>
                                  </div>
                            {/* </div> */}
                            {/* <div className={`col-lg-12 col-md-12  ${styles.textFieldContainer}`}> */}
                              <div ref={passiveOut3Ref} className={`row ${odcStyles.formGap}`}>
                              <div className={`col-lg-3 col-md-12  ${styles.textFieldContainer}`}>
                                  <p>Passive Out 3</p>
                                </div>
                                  <div className={`col-lg-5 col-md-12 ${styles.textFieldContainer}`}>
                                    <CustomTextField id="standard-basic" name="odp_name_3" label="ODP Name 3" value={values.odp_name_3} onChange={handleChange} onBlur={handleBlur} variant="standard" />
                                  </div>
                                  <div className={`col-lg-4 col-md-12 ${styles.textFieldContainer}`}>
                                  <CustomFormControl key='dpo3' error={errors.dist_port_3_stat?true:false} variant="standard" >
                                    <CustomInputLabel id="demo-simple-select-standard-label">Distribusi PO3</CustomInputLabel>
                                  <NativeSelect onChange={(ev)=>onchg1(ev,2,setValues)} onBlur={handleBlur} value={values.dist_port_3} inputProps={{
                                        name: 'dist_port_3',
                                        id: 'uncontrolled-native',
                                        }} className={`col-lg-12 ${styles.splitterGap}`}>
                                          <option value={""}>Empty</option>
                                          {
                                            feederFocus?.distribution[2]?.distribution_id && 
                                            <option key={"dist_po3"+feederFocus.distribution[2].distribution_index} value={feederFocus?.distribution[2]?.distribution_id}>{(feederFocus?.distribution[1].distribution_level%2==0)?"D"+feederFocus?.distribution[2]?.distribution_level_id+"-"+(feederFocus.distribution[2].distribution_index+12):"D"+feederFocus?.distribution[2]?.distribution_level_id+"-"+feederFocus.distribution[2].distribution_index}</option>
                                          }
                                          {distributionOnChange[2].mapped.map((item,idx)=>{
                                            // console.log("ds",item)
                                          
                                          return  item.map(dsitem=>{
                                            // console.log("dsiteman",dsitem)
                                            // console.log("dsitem",(dsitem.rak_level%2==0)?"D"+dsitem.rak_index+"-"+(dsitem.index+13):"D"+dsitem.rak_index+"-"+dsitem.index)
                                              if(dsitem.status!=="used")
                                            return <option key={"dist_po3"+"D"+dsitem.rak_index+"_"+dsitem.index} value={dsitem.id}>{"D"+dsitem.rak_index+"-"+dsitem.index}</option>
                                          })
                                          })}
                                  </NativeSelect>
                                  <FormHelperText aria-labelledby='dpo1-helper'> {errors.dist_port_3_stat} </FormHelperText>
                                  </CustomFormControl>
                                  </div>
                                </div>
                            {/* </div> */}
                            {/* <div className={`col-lg-12 col-md-12  ${styles.textFieldContainer}`}> */}
                              <div ref={passiveOut4Ref} className={`row ${odcStyles.formGap}`}>
                              <div className={`col-lg-3 col-md-12 ${styles.textFieldContainer}`}>
                                  <p>Passive Out 4</p>
                                </div>
                                  <div className={`col-lg-5 col-md-12  ${styles.textFieldContainer}`}>
                                    <CustomTextField id="standard-basic" name="odp_name_4" label="ODP Name 4" value={values.odp_name_4} onChange={handleChange} onBlur={handleBlur} variant="standard" />
                                  </div>
                                  <div className={`col-lg-4 col-md-12 ${styles.textFieldContainer}`}>
                                  <CustomFormControl key='dpo4' error={errors.dist_port_4_stat?true:false} variant="standard" >
                                    <CustomInputLabel id="demo-simple-select-standard-label">Distribusi PO4</CustomInputLabel>
                                    <NativeSelect value={values.dist_port_4} onChange={(ev)=>onchg1(ev,3,setValues)} onBlur={handleBlur} inputProps={{
                                          name: 'dist_port_4',
                                          id: 'uncontrolled-native',
                                          }} className={`col-lg-12 ${styles.splitterGap}`}>
                                            <option value={""}>Empty</option>
                                            {
                                              feederFocus?.distribution[3]?.distribution_id && 
                                              <option key={"dist_po4"+feederFocus.distribution[3].distribution_index} value={feederFocus?.distribution[3]?.distribution_id}>{(feederFocus?.distribution[1].distribution_level%2==0)?"D"+feederFocus?.distribution[3]?.distribution_level_id+"-"+(feederFocus.distribution[3].distribution_index+12):"D"+feederFocus?.distribution[3]?.distribution_level_id+"-"+feederFocus.distribution[3].distribution_index}</option>
                                            }
                                            {distributionOnChange[3].mapped.map((item,idx)=>{
                                              // console.log("ds",item)
                                            
                                            return  item.map(dsitem=>{
                                              // console.log("dsiteman",dsitem)
                                              // console.log("dsitem",(dsitem.rak_level%2==0)?"D"+dsitem.rak_index+"-"+(dsitem.index+13):"D"+dsitem.rak_index+"-"+dsitem.index)
                                                if(dsitem.status!=="used")
                                              return <option key={"dist_po4"+"D"+dsitem.rak_index+"_"+dsitem.index} value={dsitem.id}>{"D"+dsitem.rak_index+"-"+dsitem.index}</option>
                                            })
                                            })}
                                    </NativeSelect>
                                    <FormHelperText aria-labelledby='dpo1-helper'> {errors.dist_port_4_stat} </FormHelperText>
                                  </CustomFormControl>
                                  </div>
                                </div>
                              </div>
                          {/* </div> */}
                          {formError.status && 
                          
                          <div className={`col-lg-12 col-md-12  
                            ${odcStyles.deleteFeeder}`}>
                              <span className={odcStyles.errorText}>{formError.text}</span>
                          </div>
                          }
                        <div className={`col-lg-12 col-md-12  
                          ${odcStyles.deleteFeeder}`}>
                          <div className={`row `}>
                            <div className={`col-md-12 col-lg-6 `}>
                              <div className={odcStyles.actionContainer}>
                                {/* <div className={`col-md-12 col-lg-6 `}> */}
                                {isSubmitting ? <div>
                                  <CustomCircularProgress size={22} sx={{ "svg":{transform:"scale(1.2)"} , position: 'relative', top: 7,display:"inline-block",margin:"0 15px 0 20px"}}/></div>
                                  : <CustomButtonModal btntype={"submit"} type={"submit"}>
                                  {"Submit"}
                                </CustomButtonModal>
                                }
                                 
                                {/* </div>
                                <div className={`col-md-12 col-lg-6 `}> */}
                                  <CustomButtonModal onClick={()=>handleClose()}>
                                    {"Cancel"}
                                  </CustomButtonModal>
                                {/* </div> */}
                              </div>
                            </div>
                            
                            <div className={`col-md-12 col-lg-6 ${styles.deleteFeeder} ${styles.textFieldContainer}`}>
                            {feederModal[0].type=="edit" && 
                            
                              <Button onClick={deleteRowHandleOpen}>

                                <MdOutlineDeleteForever />delete feeder
                              </Button>
                            }
                              <MUIModal open={openDeleteRowModal} onClose={deleteRowHandleClose} >
                            <div>
                          <div className={styles.closebtn}>
                            <MdOutlineClose/>
                          </div>
                        <Box itemRef='detailFeederDeleteModal' sx={{
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
                                    {deleteLoading ? <div>
                                      <CustomCircularProgress svgtype={"delete"} size={22} sx={{ "svg":{transform:"scale(1.2)"} , position: 'relative', top: 7,display:"inline-block",margin:"0 15px 0 20px"}}/></div>
                                      :<CustomButtonModal btntype={'delete'} onClick={deleteFeederHandler}>
                                        {"Submit"}
                                      </CustomButtonModal>
                                    }
                                  </div>
                                  <div >
                                    <CustomButtonModal btntype={'canceldelete'} onClick={()=>deleteRowHandleClose()}>
                                      {"Cancel"}
                                    </CustomButtonModal>
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
                        </form>
                      )}
                    
                    </Formik>
                  </div>
                </Box>
                </MetisMenu>
                </div>
              </MUIModal>
    )
}

export default Modal;
