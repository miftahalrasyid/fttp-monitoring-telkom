import React from 'react';
import Image from 'next/image';
import bgImage from '../public/img/404-bg-effect-01.png';
import Image404 from '../public/img/404_img.png';
import styles from './index.module.css';
import {useRouter} from 'next/router';
import { 
    styled as styledCustom
  } from "@mui/material/styles";
  import {
  Button
  } from "@material-ui/core";
  const CustomButtonEdit= styledCustom(Button)(({ theme }) => ({
    borderColor: theme.status.primary,
    color: theme.status.primary,
  }));
function Page404() {
    const router = useRouter();
  return (
    <div className={styles.page404wrapper}>

        <div className={styles.page404bgImg}>

            <Image src={bgImage} alt={"bg_image"} width={962} height={464}/>
        </div>
        <div className={styles.page404Img}>
            <Image src={Image404} alt={"404_image"} width={371} height={132}/>
            <p>  opps! Halaman tidak ditemukan! </p>

            <CustomButtonEdit onClick={() => router.back()} variant="outlined" color='primary' size="large">
                Go Back
            </CustomButtonEdit>
        </div>
    </div>
  )
}

export default Page404