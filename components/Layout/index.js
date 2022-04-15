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
    const {children,data,getSTOList,email,role_name} = props;
    console.log("email",email)

    const [closeState,setCloseState] = useState(true);
    const closeMenu = useCallback(event=>{
        setCloseState(!closeState);
        console.log(event.target.parentNode.querySelector("#closeToggle"));
        event.target.parentNode.querySelector("#closeToggle").click();
        event.target.style.opacity = "0";
        setTimeout(()=>{
            event.target.style.display = "none";

        },333)
    },[closeState])
  
    return <div className={styles.layoutWrapper}>
        <Sidebar odcProps={getSTOList}/>
        <div className={styles.topGap}>
            <Navbar odcData={data} email={email} role_name={role_name}/>

            {children}
            <div className={styles.overlay} onClick={closeMenu}></div>
        </div>
        <Footer/>
    </div>;
    // return LayoutDiv;
}
