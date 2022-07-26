import React,{useState} from 'react';
import Image from 'next/image';
import Link from 'next/link';
import {
    Grid,
    CircularProgress,
    Typography,
    Button,
    Tabs,
    Tab,
    TextField,
    Fade,
    Avatar,
    Paper,
    makeStyles, useTheme, styled, createTheme,MuiThemeProvider
  } from "@material-ui/core";
  import { useRouter } from 'next/router';
  import LockOutlinedIcon from "@material-ui/icons/LockOutlined";
  // import styles from './index.module.css';
  import styles from './index_evolve.module.css';
  import { Formik } from 'formik';
  import logo from "../public/img/telkom logo.png";
  import { connect } from "react-redux";
  import telkom_bg from "../public/img/telkom_bg.jpeg";
  import logo_paperless from '../public/img/logo_paperless.png';
import main_img from "../public/img/main_img.png";
  import { checkLogin, verifyOtp,requestForgotPassword,forgotPageClosed} from "../components/store/auth/actions";
  import correctImg from '../public/img/correct.png';

import { 
  styled as styledCustom 
} from "@mui/material/styles";
import { wrapper } from '../components/store';
import { END } from 'redux-saga';
import { ButtonProps } from '@mui/material';
const CustomButton = styledCustom(Button)<ButtonProps>(({ theme }) => ({
  borderColor: theme.status.primary,
  color:theme.status.primary,
  textDecoration: "none",
}));

function Forgot_password({requestForgotPassword,isRequestConfirm,forgotPageClosed}) {
  const router = useRouter();
    var [error, setError] = useState(null);
    var [activeTabId, setActiveTabId] = useState(0);
    var [nameValue, setNameValue] = useState("");
    var [loginValue, setLoginValue] = useState("admin@telkom.com");
    var [passwordValue, setPasswordValue] = useState("password");
    console.log("openconfirmation page",isRequestConfirm)

  return (
    <div className={styles.containerWrapper}>
      <div className={styles.backdrop}>
        <Image src={telkom_bg} width={1829} height={1100} alt={"background"} />
      </div>
      <div className={`container ${styles.leftSide}`}>
        <div className={styles.logoWrapper}>
          <div className={` ${styles.logoContainer}`}>
            <Image src={logo_paperless} width={230} height={162} alt={"background"}/>
          </div>

        </div>
        <div className={styles.primaryGroup}>
          <div className={styles.mainImg}>
            <Image src={main_img} width={752} height={746} alt={"background"}/>
          </div>
          <div className={styles.mainTxt}>
            <div className={styles.textGroupOne}>
              <h1>The Ultimate</h1>
              <p>Management Core</p>
            </div>
            <p> <span className={styles.blue}> The Ultimate Reference <br/>for</span> <span className={styles.lightBlue}>Deployment</span> <span className={styles.blue}>&</span><br/> <span className={styles.lightBlue}>Maintenance Operation</span><br/> <span className={styles.blue}>with</span> <span className={styles.lightBlue}>Real Layout Mirroring</span></p>
          </div>
        </div>
        <div className={styles.footer}>
          <p>© 2022 Telkom Indonesia, Tbk. All rights reserved</p>
        </div>
      </div>
        <div className={`container ${styles.rightSide}`}>
      
      {/* <Tabs value={activeTabId} onChange={(e, id)=> setActiveTabId(id)}
        indicatorColor="primary"
        textColor="primary"
        centered
        >
        <Tab label="Login" classes={{ root: styles.tab }} />
        <Tab label="New User" classes={{ root: styles.tab }} />
      </Tabs> */}
      {/* {activeTabId === 0 && ( */}
      <React.Fragment>
      <div className={styles.baloon}>
        {!isRequestConfirm ? 
    <div className={styles.form}>
        <>
        <h2>Ajukan ganti password</h2>
        <p>Silahkan masukkan email anda</p>

            {/* <Button size="large" className={styles.googleButton}>
              <img src={google} alt="google" className={styles.googleIcon} />
              &nbsp;Sign in with Google
            </Button> */}
            {/* <div className={styles.formDividerContainer}>
              <div className={styles.formDivider} />
              <Typography className={styles.formDividerWord}>or</Typography>
              <div className={styles.formDivider} />
            </div> */}
            <Formik 
            initialValues={{ email: '', password: '' }}
            validate={values => {
              const errors= {} as {
                email:string,
              };
              if (!values.email) {
                errors.email = '*Required';
              } else if (
                !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(values.email)
              ) {
                errors.email = '*Invalid email address';
              }
              return errors;
            }}
            onSubmit={(values, { setSubmitting }) => {
              requestForgotPassword(values.email)
              // setTimeout(() => {
              //   alert(JSON.stringify(values, null, 2));
              //   setSubmitting(false);
              // }, 400);
            }}
          >
            {({
              values,
              errors,
              touched,
              handleChange,
              handleBlur,
              handleSubmit,
              isSubmitting,
              /* and other goodies */
            }) => (
              <form className={styles.form} onSubmit={handleSubmit}>
                <div className={styles.groupInputField}>
                <label htmlFor="email" className={styles.inputLabel}>Email</label>
                  <input
                  className={styles.inputField}
                    type="email"
                    name="email"
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={values.email}
                  />
                  <span className={styles.validation}>
                  {errors.email && touched.email && errors.email}
                  </span>
                </div>
                <p className={styles.goToLogin}>
                  {'Remember? '}
                <Link href={'/'}>
                  <a className={styles.decorationNone} style={{color:"blue"}}>
                    Sign In
                  </a>
                </Link>
                </p>
                {isRequestConfirm ? (
                <CircularProgress size={35} className={styles.loginLoader} />
                  ) : (
                    <button className={styles.submitBtn} disabled={ loginValue.length===0 ||
                      passwordValue.length===0 
                        
                      }>
                      Submit
                  </button>
                )}
              </form>
            )}
          </Formik>
           
        </>
        
    </div>
    :<div className={styles.confirmationPageWrapper}>
      <div>
    <Image src={correctImg} alt="correctImg" width={50} height={50}/>
        </div>
        <div className={styles.confirmGroup}>
        
    <h3>Permintaan anda telah kami proses</h3>
    <p className={styles.confirmationDetail}>
      Link reset password akan segera dikirimkan ke telegram anda  
    </p>
        </div>
    <Link href={"/"}>
      <a className={styles.decorationNone} onClick={forgotPageClosed}>
      <button className={styles.backBtn} >
      Kembali
      </button>
      </a>
    </Link>
  </div>
        }
  </div>
      </React.Fragment>
      
        </div>
    </div>
  )
}



const mapStateToProps = state =>({
    isRequestConfirm: state.Auth.openConfirmationPage,
  });
  const mapDispatchToProps = {
    requestForgotPassword,
    forgotPageClosed
  }
export default connect(mapStateToProps,mapDispatchToProps)(Forgot_password)