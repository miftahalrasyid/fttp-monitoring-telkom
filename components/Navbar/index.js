import React from 'react';
import styles from './navbar.module.css';
import { MdMenu } from 'react-icons/md'
import Image from 'next/image';

function Navbar() {
  return <div className={`${styles.navWrapper}`}>
    <div className={`${styles.navContainer}`}>
      <div className={`${styles.logoWrapper}`}>
        <h3>Telkom Indonesia </h3>
        <div className={`${styles.logoContainer}`}>
          <Image src='/img/telkom logo.png' width={45} height={40} alt='logo'/>
        </div>
      </div>
        <MdMenu />
    </div>
  </div>;
}

export default Navbar;
