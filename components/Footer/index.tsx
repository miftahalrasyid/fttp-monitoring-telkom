import React from 'react';
import styles from './footer.module.css';
import Link from 'next/link';

function footer() {
  return <footer className={`wrapper ${styles.footerContainer}`}><div className="container-fluid">
    Copyright ©️2022 ODC Sakti Team Novian - Hardiyan - Risal - Prasetyo - Rudy All Rights Reserved
    {/* Copyright © 2022 Telkom Indonesia, Tbk. Designed & Developed by <Link href={'https://switchbox.id/'}><a style={{ textDecoration: "none" }} target={"_blank"} >SwitchBox</a></Link> */}
  </div></footer>;
}

export default footer;
