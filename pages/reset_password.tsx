import React, { useEffect, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import {
  Grid,
  CircularProgress,
  Typography,
  Button,
  Tabs,
  Tab,
  Fade,
  Avatar,
  Paper,
  makeStyles, useTheme, styled, createTheme, MuiThemeProvider
} from "@material-ui/core";
import Box from '@mui/material/Box';
import IconButton from '@mui/material/IconButton';
import Input from '@mui/material/Input';
import correctImg from '../public/img/correct.png';
import InputLabel from '@mui/material/InputLabel';
import InputAdornment from '@mui/material/InputAdornment';
import FormControl from '@mui/material/FormControl';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import { MdOutlineVisibilityOff, MdOutlineVisibility } from 'react-icons/md'
import LockOutlinedIcon from "@material-ui/icons/LockOutlined";
// import styles from './index.module.css';
import styles from './index_evolve.module.css';
import logo from "../public/img/telkom logo.png";
import { connect } from "react-redux";
import { verifyResetCode, resetPassword } from "../components/store/auth/actions"
import telkom_bg from "../public/img/telkom_bg.jpeg";
import logo_paperless from '../public/img/logo_paperless.png';
import main_img from "../public/img/main_img.png";
import { Formik } from 'formik';
import { wrapper } from '../components/store';
import { useRouter } from 'next/router'
import { END } from 'redux-saga';
function Reset_password({ isLoading, checkLogin, isValid, resetPassword, verifyResetCode }) {
  const router = useRouter();
  useEffect(() => {
    console.log("testing")
    const params = new URLSearchParams(location.search)
    verifyResetCode(params.get("code"))
  }, [])
  var [error, setError] = useState({ status: false, msg: "", token: "" });
  // var [activeTabId, setActiveTabId] = useState(0);
  // var [nameValue, setNameValue] = useState("");
  // var [loginValue, setLoginValue] = useState("");
  // var [passwordValue, setPasswordValue] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showRePassword, setShowRePassword] = useState(false);
  var [resetPasswordConfirm, setResetPasswordConfirm] = useState(false);
  const [values, setValues] = useState({
    amount: '',
    password: '',
    weight: '',
    weightRange: '',
    showPassword: false,
  });
  const [valuesConfirm, setValuesConfirm] = useState({
    amount: '',
    password: '',
    weight: '',
    weightRange: '',
    showPassword: false,
  });
  console.log(!resetPasswordConfirm)
  return (
    <div className={styles.containerWrapper}>

      <div className={styles.backdrop}>
        <Image src={telkom_bg} width={1829} height={1100} alt={"background"} />
      </div>
      <div className={`container ${styles.leftSide}`}>
        <div className={styles.logoWrapper}>
          <div className={` ${styles.logoContainer}`}>
            <Image src={logo_paperless} width={230} height={162} alt={"background"} />
          </div>

        </div>
        <div className={styles.primaryGroup}>
          <div className={styles.mainImg}>
            <Image src={main_img} width={752} height={746} alt={"background"} />
          </div>
          <div className={styles.mainTxt}>
            <div className={styles.textGroupOne}>
              <h1>The Ultimate</h1>
              <p>Management Core</p>
            </div>
            <p> <span className={styles.blue}> The Ultimate Reference <br />for</span> <span className={styles.lightBlue}>Deployment</span> <span className={styles.blue}>&</span><br /> <span className={styles.lightBlue}>Maintenance Operation</span><br /> <span className={styles.blue}>with</span> <span className={styles.lightBlue}>Real Layout Mirroring</span></p>
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
          <div className={styles.baloon} style={{ height: isValid ? "500px" : "250px" }}>
            {!resetPasswordConfirm ? <div className={styles.form}>

              <>
                <h2>Ubah password</h2>

                {isValid ? <Formik
                  initialValues={{ repassword: '', password: '' }}
                  initialErrors={{ repassword: "test", password: "" }}
                  validate={values => {
                    const errors = {} as {
                      password: string,
                      repassword: string
                    };
                    // if (!values.email) {
                    //   errors.email = '*Required';
                    // } else if (
                    //   !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(values.email)
                    // ) {
                    //   errors.email = '*Invalid email address';
                    // }
                    if (values.password !== values.repassword) {
                      errors.password = "password tidak sama";
                    }
                    // console.log("errors",errors)
                    return errors;
                  }}
                  // validateOnMount={true}
                  validateOnBlur={false}
                  validateOnChange={false}
                  onSubmit={(values, { setSubmitting }) => {

                    // return errors 
                    resetPassword(router.query.code, values.password, setError, setResetPasswordConfirm)
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
                        {/* <label htmlFor="email" className={styles.inputLabel}>Email</label>
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
                  </span> */}
                        <span className={styles.validationOnSubmit}>
                          {errors.password}
                        </span>
                        <label htmlFor="password" className={styles.inputLabel}>Password</label>
                        <div className={styles.passwordField}>
                          <input
                            className={styles.inputField}
                            type={!showPassword ? "password" : "text"}
                            name="password"
                            onChange={handleChange}
                            onBlur={handleBlur}
                            value={values.password}
                          />
                          {!showPassword ? <div onClick={(e) => setShowPassword(prev => !prev)}><MdOutlineVisibility /></div> : <div onClick={(e) => setShowPassword(prev => !prev)}><MdOutlineVisibilityOff /></div>}
                        </div>
                        {/* <span className={styles.validation}>
                    {errors.password && touched.password && errors.password}
                  </span> */}

                        <label htmlFor="repassword" className={styles.inputLabel}>Konfirmasi password</label>
                        <div className={styles.passwordField}>
                          <input
                            className={styles.inputField}
                            type={!showRePassword ? "password" : "text"}
                            name="repassword"
                            onChange={handleChange}
                            onBlur={handleBlur}
                            value={values.repassword}
                          />
                          {!showRePassword ? <div onClick={(e) => setShowRePassword(prev => !prev)}><MdOutlineVisibility /></div> : <div onClick={(e) => setShowRePassword(prev => !prev)}><MdOutlineVisibilityOff /></div>}
                        </div>
                        {/* <span className={styles.validation}>
                    {errors.repassword && touched.repassword && errors.repassword}
                  </span> */}
                      </div>
                      {/* <button className={styles.submitBtn} type="submit"> */}

                      <button className={styles.submitBtn} type="submit" >
                        {/* <button className={styles.submitBtn} type="submit" disabled={resetPasswordConfirm}> */}
                        Ubah
                      </button>
                    </form>
                  )}
                </Formik> : <h6 className={styles.danger}>link ubah password telah melebihi masa pakai, silahkan reset kembali password anda</h6>}
              </>
            </div> : <div className={styles.confirmationPageWrapper}>
              <div>
                <Image src={correctImg} alt="correctImg" width={50} height={50} />
              </div>
              <div className={styles.confirmGroup}>

                <h3>Password anda telah berhasil di reset</h3>
                <p className={styles.confirmationDetail}>
                  Silahkan kembali untuk melakukan login ulang
                </p>
              </div>
              <Link href={"/"}>
                <a className={styles.decorationNone}>
                  <button className={styles.backBtn} >
                    Kembali
                  </button>
                </a>
              </Link>
            </div>}
          </div>


        </React.Fragment>

      </div>
    </div>
  )
}
export const getServerSideProps = async (props) => wrapper.getServerSideProps(store => async ({ req, res, ...etc }) => {
  // console.log("req res reset password",)
  const myHeaders = new Headers();
  // myHeaders.append('Content-Type', 'application/json');
  const formdata = new FormData();
  formdata.append("code", etc.query.code.toString());
  var requestOptions = {
    method: 'POST',
    headers: myHeaders,
    body: formdata,
    redirect: 'follow'
  } as any;
  const rest = await fetch(`${process.env.NEXT_PUBLIC_API_HOST}/verify-forgot-password`, requestOptions).then(res => res.json());
  console.log("in line reset password", rest)
  if (!etc.query.code)
    return {
      notFound: true
    }
  store.dispatch(verifyResetCode(formdata));
  store.dispatch(END)
  await store.sagaTask.toPromise();
  return {
    props: {
      isValid: store.getState().Auth.isCodeVerify
    }
  }
})(props)


const mapStateToProps = state => ({
  isLoading: state.Auth.loading.login,
});
const mapDispatchToProps = {
  resetPassword,
  verifyResetCode
  // checkLogin,
  // verifyOtp
}
export default connect(mapStateToProps, mapDispatchToProps)(Reset_password)