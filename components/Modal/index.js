import { Formik, Form, Field } from 'formik';
import React,{useState,useCallback,useEffect} from 'react';
import {MdClose} from 'react-icons/md'
import styles from './modal.module.css';

function Modal({modalTitle="Feeder",title="172.29.237.121/FIBERHOME",onSubmit,capacity,visible,fields,inputOrder=fields ? Object.keys(fields):[],gpon="",modul="",port="",core=""}) {
    // console.log("data modal ",fields)

    // console.log("modal order ",inputOrder)

    // const modalTitle = "feeder 2";
    // const title = "";
    const [updateField,setUpdateField] = useState(inputOrder?.reduce((newarr,currArr)=>({...newarr,[currArr]:""}),{}));
    const [editState, setEditState] = useState(true);
    const [availablePort,setAvailablePort] = useState(capacity)
    const unusedPort = new Array(capacity);
    for (let index = 0; index < unusedPort.length; index++) {
        unusedPort[index] = (index+1);
    }
    const editToggle = useCallback(()=>{
        // console.log("click",editState)
        setEditState(state=>!state)
    },[editState]);
    const exitClick = useCallback(()=>{
        visible[1](state=>!state);
        setEditState(true)
    },[visible])
    const propagation = (ev) =>{
        ev.stopPropagation();
    }
    // console.log("unused",fields?.splitter?.default,unusedPort.filter(unused=>(unused==fields.default || (fields?.splitter?.options?.findIndex(exist=>exist==unused)==-1))))
    const checkNested = () =>{

    };
    console.log("available port",availablePort)
    useEffect(()=>{
        setAvailablePort(Object.entries(capacity).reduce((prev,[key,value])=>{
            const unusedPort = new Array(value);
            for (let index = 0; index < unusedPort.length; index++) {
                unusedPort[index] = (index+1);
            }
            return {...prev,[key]:unusedPort}
        },{}))
    },[])
    useEffect(()=>{
        if(fields || false){
            setUpdateField(Object.entries(fields).reduce((newarr,...idx)=>{
                // console.log("modal order",Object.entries(fields).find((item)=>item[0]==inputOrder[idx[1]]))
                const [newKey,newVal] = Object.entries(fields).find((item)=>item[0]==inputOrder[idx[1]]) || ["",""];
                const {type=""} = newVal;
                if(type == 'select')
                return {...newarr,[newKey+"-select"]:newVal.default}
                if(newVal.nested){
                    const {id} = newVal;
                    // Object.entries(newVal).forEach(([key, value]) => );
                    console.log("entries", newKey,newVal,Object.entries(newVal),id)
                    const [newtype,nested,odpName,passiveId,dsId] =  Object.entries(newVal);
                    console.log("passive id",passiveId)
                    
                    if(passiveId[1].type == "select")
                    return {...newarr,[newKey]:newVal.name,["passive_out"+"_"+passiveId[1].default+"-select"]:passiveId[1].default}
                    // return {...newarr}
                }
                if(newKey){
                    return {...newarr,[newKey]:newVal.name}
                }
                // if(newKey && newVal)
                

                return newarr
            },{}))
        }
        // setUpdateField({gpon,modul,port,core})
    },[fields,inputOrder])
  return <div className={`${styles.modalWrapper}`} style={{visibility:visible[0]?"visible":"hidden",opacity:visible[0]?"1":"0"}} onClick={exitClick}>
      <div className={`${styles.modalContainer}`} style={{transform:"translateY("+(visible[0]?"0px":"-11px")+")"}} onClick={propagation}>
          <MdClose onClick={exitClick} fontSize={"1.3rem"}/>
          <h4>{("Feeder "+modalTitle).replace(/\w+ (\d) \/ (\w+ \d+) \d+/,"Distributor $1 $2")}</h4>
          <h3>{title}</h3>
          <Formik enableReinitialize initialValues={updateField} onSubmit={(state)=>onSubmit({...state,id:parseInt(modalTitle.replace(/(\d) \/ (\w+ \d+) (\d+)/,"$3"))})}>
              <Form className={`${styles.form}`}>
                  {(updateField || false) && Object.entries(updateField).map(([key,value])=>{
                        // console.log("fields",fields,key.replace(/(\w+)-select/,"$1"),fields[key.replace(/(\w+)-select/,"$1")])
                        // console.log("fielsd",key.replace(/(\w+)(-)?(\w+)?-select/,"$1"),fields[key.replace(/(\w+)(-)?(\w+)?-select/,"$1")]?.ds,key)
                        if(/(\w+)-select/.test(key))
                            return <div key={key} className={`${styles.field}`}>
                            <label htmlFor={key}>{key.replace(/(\w+)-select/,"$1").toUpperCase()}</label>
                            <Field name={key} disabled={editState}  as="select" >
                                {availablePort.splitter.filter(unused=>(unused==fields[key.replace(/(\w+)-select/,"$1")]?.default || (fields[key.replace(/(\w+)(-)?(\w+)?-select/,"$1")]?.options?.findIndex(exist=>exist==unused)==-1 || fields[key.replace(/(\w+)(-)?(\w+)?-select/,"$1")]?.ds?.options?.findIndex(exist=>exist==unused)==-1))).map(option=>{
                                    // console.log(option,option==value.default)
                                    // if(option===3){
                                    //     return (option)?<option key={key+"_"+option} selected value={option}>{option}</option>:null
                                    // }
                                    return (option)?<option key={key+"_"+option} value={option}>{option}</option>:null
                                })}
                            </Field>
      
                        </div>
                        return <div key={key} className={`${styles.field}`}>
                        <label htmlFor={key}>{key.toUpperCase()}</label>
                        <Field id={key} name={key} placeholder={"-"} disabled={editState} style={{pointerEvents:(editState)?"none":"all"}} />
  
                    </div>
                    })}
                  {/* <div className={`${styles.field}`}>
                      <label htmlFor="gpon">GPON :</label>
                      <Field id="gpon" name="gpon" placeholder="Jane"  disabled={editState} />

                  </div>
                  <div className={`${styles.field}`}>
                      <label htmlFor="modul">Modul :</label>
                      <Field id="modul" name="modul" placeholder="Doe" disabled={editState} />

                  </div>
                  <div className={`${styles.field}`}>
                      <label htmlFor="port">Port :</label>
                      <Field id="port" name="port" placeholder="jane@acme.com" disabled={editState} />

                  </div>
                  <div className={`${styles.field}`}>

                      <label htmlFor="core">Core :</label>
                      <Field id="core" name="core" placeholder="jane@acme.com"  disabled={editState} />
                  </div> */}
                  <div className={`${styles.field} ${styles.edit}`} onClick={editToggle}>
                      {editState?"edit":"cancel"}
                  </div>
                  <div className={`${styles.field} ${styles.submitBtn}`} style={{display:editState?"none":"block"}} onClick={exitClick}>
                    <button type="submit">Submit</button>
                  </div>
              </Form>
          </Formik>
      </div>
  </div>;
}

export default Modal;
