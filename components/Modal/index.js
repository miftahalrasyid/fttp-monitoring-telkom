import { Formik, Form, Field } from 'formik';
import React,{useState,useCallback,useEffect} from 'react';
import {MdClose} from 'react-icons/md'
import styles from './modal.module.css';

function Modal({modalTitle="Feeder",title="172.29.237.121/FIBERHOME",onSubmit,visible,gpon="",modul="",port="",core=""}) {
    // console.log("data modal ",gpon)
    // const modalTitle = "feeder 2";
    // const title = "";
    const [updateField,setUpdateField] = useState();
    const [editState, setEditState] = useState(true);
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
    useEffect(()=>{
        setUpdateField({gpon,modul,port,core})
    },[gpon,modul,port,core])
  return <div className={`${styles.modalWrapper}`} style={{visibility:visible[0]?"visible":"hidden",opacity:visible[0]?"1":"0"}} onClick={exitClick}>
      <div className={`${styles.modalContainer}`} style={{transform:"translateY("+(visible[0]?"0px":"-11px")+")"}} onClick={propagation}>
          <MdClose onClick={exitClick} fontSize={"1.3rem"}/>
          <h4>{"Feeder "+modalTitle}</h4>
          <h3>{title}</h3>
          <Formik enableReinitialize initialValues={updateField} onSubmit={(state)=>onSubmit({...state,id:modalTitle})}>
              <Form className={`${styles.form}`}>
                  <div className={`${styles.field}`}>
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
                  </div>
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
