import React, { useState,useCallback,useEffect } from 'react';
import Navbar from '../Navbar';
import Sidebar from '../Sidebar';
// import Sidebar from '../Sidebar';
import Footer from '../Footer';
import styles from './layout.module.css';

export default function Layout(props) {
    // const LayoutDiv = (pageProps) =>{
    //     return <div className='container'>
    //         <Navbar/>
    //         <Sidebar/>
    //         <Component {...pageProps}/>
    //         <Footer/>
    //     </div>
    // }
    const {
        children,
        data,
        getSTOList,
        email,
        role_name,
        token,
        updateODCData,
        ODCdetailData,
        ODCdetailDataClient,
        odc_rowsPerPage,
        regionList,
        witelList,
        datelList,
        stoList,
        merekList,
        user_rowsPerPage
    } = props;
    // console.log("email",regionList)

    const [closeState,setCloseState] = useState(true);
    const closeMenu = useCallback(event=>{
        setCloseState(!closeState);
        // console.log(event.target.parentNode.querySelector("#closeToggle"));
        event.target.parentNode.querySelector("#closeToggle").click();
        event.target.style.opacity = "0";
        setTimeout(()=>{
            event.target.style.display = "none";

        },333)
    },[closeState])
    // console.log("option list", regionList,witelList,datelList,stoList,merekList)
    const [ODCdetail,setODCdetail] = useState(ODCdetailData);
    useEffect(()=>{
        // console.log("layout odcdetaildata",ODCdetailDataClient)
        if(ODCdetailDataClient?.length!==0)
        setODCdetail(ODCdetailDataClient)
    },[ODCdetailDataClient])
    return <div className={styles.layoutWrapper}>
        <Sidebar odcProps={{regionList,witelList,datelList,stoList,merekList,odc_rowsPerPage}} token={token}/>
        <div className={styles.topGap}>
            <Navbar odcProps={{regionList,witelList,datelList,stoList,merekList,ODCdetail}} user_rowsPerPage={user_rowsPerPage} odcDispatch={{updateODCData}} odcData={data} email={email} role_name={role_name} token={token}/>

            {children}
            <div className={styles.overlay} onClick={closeMenu}></div>
        </div>
        <Footer/>
    </div>;
    // return LayoutDiv;
}
