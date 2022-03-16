import React,{useCallback, useState} from 'react';
import styles from './navbar.module.css';
import { MdMenu } from 'react-icons/md';
// import {
//   Button,
// } from "@material-ui/core";
import Image from 'next/image';
import Link from 'next/link';
import { FaBars } from 'react-icons/fa';
import indexStyles from './index.module.css';

function Navbar() {
  const [statMenu,setStatMenu] = useState(false);
  const mainmenuClick = useCallback(event=>{
    setTimeout(()=>{

      setStatMenu(!statMenu)
      event.target.parentNode.parentNode.parentNode.childNodes[event.target.parentNode.parentNode.parentNode.childNodes.length-1].style.opacity="1"
    },333)
    // console.log("event",event.target)
    console.log(event.target.parentNode.parentNode.parentNode.childNodes)
    event.target.parentNode.parentNode.parentNode.childNodes[event.target.parentNode.parentNode.parentNode.childNodes.length-1].style.display="block"
    if(window.innerHeight<911){
      event.target.parentNode.parentNode.parentNode.style.transform= statMenu ? "translate3d(0,0,0)": "translate3d(-260px,0,0)";
      if(!statMenu)
        event.target.parentNode.parentNode.parentNode.parentNode.childNodes[0].style.transform=  "none";
      else
        event.target.parentNode.parentNode.parentNode.parentNode.childNodes[0].style.removeProperty('transform');
    }
    // console.log(event.target.parentNode.parentNode.parentNode.childNodes[event.target.parentNode.parentNode.parentNode.childNodes.length-1].style.display="block")
  },[statMenu])
  // return <div className={`${styles.navWrapper}`}>
  //   <div className={`${styles.navContainer}`}>
  //     <div className={`${styles.logoWrapper}`}>
  //       <h3>Telkom Indonesia </h3>
  //       <div className={`${styles.logoContainer}`}>
  //         <Image src='/img/telkom logo.png' width={45} height={40} alt='logo'/>
  //       </div>
  //     </div>
  //       <MdMenu />
  //   </div>
  // </div>;

  return <nav id={indexStyles.topBar}>
      <div className='container-fluid'></div>
      {/* <div className={indexStyles.navbarHeader}> */}
          {/* <div className={indexStyles.dFlex}> */}
            <div className={indexStyles.navbarBrandBox}>
              <Link href={"/"} passHref>
                <a className={indexStyles.logo}>
                  {/* <span className={indexStyles.logoSm}>
                    <span className={indexStyles.logoImg}>
                      <Image src="/img/telkom logo.png" alt="logo" width={35} height={35}/>
                    </span>
                  </span> */}
                  {/* <span className={indexStyles.logoLg}> 
                    <span className={indexStyles.logoImg}>
                      <Image src="/img/telkom logo.png" alt="logo" width={35} height={35}/>
                    </span>*/}
                    <span className={indexStyles.logoTxt}> Dashboard</span>
                  {/* </span> */}
                </a>
              </Link>
            {/* <Button className={`${indexStyles.navbarToggler} ${statMenu && indexStyles.toggled}`} id="closeToggle" onClick={mainmenuClick}>  */}
            <button type='button' className={`${indexStyles.navbarToggler} ${statMenu && indexStyles.toggled}`} id="closeToggle" onClick={mainmenuClick}> 
              <span className={indexStyles.srOnly}>Toggle navigation</span>
              <span className={`${indexStyles.navbarTogglerIcon} ${indexStyles.iconBar}`} /*class="navbar-toggler-icon icon-bar"*/></span>
              <span  className={`${indexStyles.navbarTogglerIcon} ${indexStyles.iconBar}`}/*class="navbar-toggler-icon icon-bar"*/></span>
                <span className={`${indexStyles.navbarTogglerIcon} ${indexStyles.iconBar}`}/*class="navbar-toggler-icon icon-bar"*/></span>
                </button>
            {/* <button type='button' className='btn btn-sm px-3 header-item' id={indexStyles.verticalMenuBtn}>
              <FaBars/>
            </button> */}
            </div>
          {/* </div> */}
          {/* <div className={indexStyles.dFlex}></div> */}
      {/* </div> */}
  </nav>
}

export default Navbar;
