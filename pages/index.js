import React,{useState,useEffect,useCallback} from 'react';
import Image from 'next/image';
import Link from 'next/link';
import Visibility from '@mui/icons-material/Visibility';
import {MdOutlineVisibilityOff,MdOutlineVisibility} from 'react-icons/md'
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import teleLogo from '../public/img/telegram.svg';
import logo_paperless from '../public/img/logo_paperless.png';
import telkom_bg from "../public/img/telkom_bg.jpeg";
import main_img from "../public/img/main_img.png";
import styles from './index_evolve.module.css';
import Head from 'next/head';
import { Formik } from 'formik';
// import '../public/fonts/GothamRounded-Medium.otf';
// import {
//   Grid,
//   CircularProgress,
//   Typography,
//   Button,
//   Tabs,
//   Tab,
//   TextField,
//   Fade,
//   Avatar,
//   Paper,
//   makeStyles, useTheme, styled, createTheme,MuiThemeProvider
// } from "@material-ui/core";
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
  Paper, useTheme, styled, createTheme,MuiThemeProvider
} from "@mui/material"
import {
  makeStyles
} from "@mui/styles"
import LockOutlinedIcon from "@material-ui/icons/LockOutlined";
import { withRouter } from "next/router";
import { 
  styled as styledCustom 
} from "@mui/material/styles";
import OtpInput from "react-otp-input";
import { connect } from "react-redux";
import { checkLogin, verifyOtp,forgotPageClosed} from "../components/store/auth/actions"
const CustomButton = styledCustom(Button)(({ theme }) => ({
  borderColor: theme.status.primary,
  color:theme.status.primary,
  textDecoration: "none",
  typography: {
    fontFamily: 'GothamRounded-Book',
  },
}));
const theme = createTheme();
function Index_evolve(props) {
  const useStyles = makeStyles((theme) => {
    console.log("use styles",theme)
    return {
    
    grid: {
      backgroundColor: "grey",
      height: "46vh",
      textAlign: "center"
    },
    avatar: {
      // margin: theme.spacing(1),
      backgroundColor: "#ee2e24 !important"
    },
    submit: {
      // margin: theme.spacing(3, 0, 2),
      backgroundColor: "#ee2e24"
    },
    paper: {
      // marginTop: theme.spacing(8),
      display: "flex",
      flexDirection: "column",
      alignItems: "center"
    },
    gridmargin:{
      marginLeft: "-0.5rem"
    },
    gridmargin_verify:{
      margin: '3rem 0 0 !important'
    },
    paperroot:{
      // backgroundColor: "#fafafa"
    }
  }});
  const classes = useStyles();
  const {checkLogin,router,history,isLoading,isOtpVerify,verifyOtp,isOtpLoading, isUserVerify,isUserVerifyLoading,forgotPageClosed, telegramToken} = props;
console.log("is user verify",isUserVerify)
  const [isImageReady, setIsImageReady] = useState(false);
  var [error, setError] = useState({status:false,msg:"",token:""});
  var [loginValue, setLoginValue] = useState("admin@telkom.com");
  var [passwordValue, setPasswordValue] = useState("password");
  const [showPassword, setShowPassword] = useState(false);
  const [otp,setOtp] = useState(null);
  const otpHandleChange = React.useCallback((value)=>{
    setOtp(value)
    console.log(value)
  },[setOtp])
  const logoLoadCallback = useCallback((ev)=>{
    setIsImageReady(true)
    typeof onLoad === "function" && onLoad(e)
  },[setIsImageReady])
  useEffect(()=>{
    logoLoadCallback()
  },[isImageReady,logoLoadCallback])
  return (<div className={styles.containerWrapper}>
    <div className={styles.backdrop}>
      <Image src={telkom_bg} width={1829} height={1100} alt={"background"}/>
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
        <div className={styles.form}>
            {isUserVerifyLoading || ((error.status || false) && error.token =="" ) ?
            <>
            <h2>Login</h2>

                <Formik 
                initialValues={{ email: '', password: ''}}
                initialErrors={{email:"test",password: "tes"}}
                validate={values => {
                  const errors = {};
                  if (!values.email) {
                    errors.email = '*Required';
                  } else if (
                    !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(values.email)
                  ) {
                    errors.email = '*Invalid email address';
                  }
                  return errors;
                }}
                validateOnMount={true}
                onSubmit={(values, { setSubmitting }) => {
                  checkLogin(
                    values.email,
                    values.password,
                    router,
                    setError,
                    setSubmitting
                  )
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
                    <span className={styles.validationOnSubmit}>
                      {error.msg}
                    </span>
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
                      <label htmlFor="password" className={styles.inputLabel}>Password</label>
                      <div className={styles.passwordField}>
                      <input
                      className={styles.inputField}
                        type={!showPassword?"password":"text"}
                        name="password"
                        onChange={handleChange}
                        onBlur={handleBlur}
                        value={values.password}
                      />
                      {!showPassword ? <div onClick={(e)=>setShowPassword(prev=>!prev)}><MdOutlineVisibility /></div>: <div onClick={(e)=>setShowPassword(prev=>!prev)}><MdOutlineVisibilityOff/></div>}
                      </div>
                      <span className={styles.validation}>
                        {errors.password && touched.password && errors.password}
                      </span>
                      <div className={styles.anchorWrapper}>

                      <Link href={'/forgot_password'}>
                        <a className={styles.decorationNone}>
                            Forgot Password?
                        </a>
                      </Link>
                      </div>
                    </div>
                    {/* <button className={styles.submitBtn} type="submit"> */}
                    
                    <button className={styles.submitBtn} type="submit" disabled={isSubmitting}>
                      Sign In
                    </button>
                  </form>
                )}
              </Formik>
                {/* <Fade in={error.status}>
                  <Typography color="secondary" className={styles.errorMessage}>
                    {error.msg}
                  </Typography>
                </Fade>

                <TextField id="email" InputProps={{
                  classes: {
                    underline: styles.textFieldUnderline,
                    input: styles.textField,
                  },
                }} defaultValue={loginValue} onChange={e=> setLoginValue(e.target.value)}
                  margin="normal"
                  placeholder="Email Adress"
                  type="email"
                  fullWidth
                  />
                  <TextField id="password" InputProps={{
                  classes: {
                    underline: styles.textFieldUnderline,
                    input: styles.textField,
                  },
                }} defaultValue={passwordValue} onChange={e=> setPasswordValue(e.target.value)}
                    margin="normal"
                    placeholder="Password"
                    type="password"
                    fullWidth
                    />
                    <div className={styles.formButton}>
                      {isLoading ? (
                      <CircularProgress size={26} className={styles.loginLoader} />
                      ) : (
                      <Button className={styles.loginbtn} disabled={ loginValue.length===0 || passwordValue.length===0 }
                        onClick={()=>
                        checkLogin(
                        loginValue,
                        passwordValue,
                        router,
                        setError,
                        )
                        }
                        variant="outlined"
                        color="primary"
                        size="large"
                        >
                        Login
                      </Button>
                      )} */}
                      {/* <Link href={'/forgot_password'}>
                        <a className={styles.decorationNone}>
                          <Button color="primary" size="large" className={styles.forgetButton}>
                            Forgot Password
                          </Button>
                        </a>
                      </Link> */}
                    {/* </div> */}
            </>
            :
             isUserVerify ? <div className={styles.telegramWrapper}>
              <Image src={"/img/telegram.svg"} alt="telegram logo" width={50} height={50} />
              <Typography Typography variant="h6" className={styles.telegramTitle}>
                Integrasi dengan Telegram
              </Typography>
              <Typography variant="subtitle2" className={styles.telegramSubTitle}>
                untuk menyambungkan akun anda dengan telegram, silahkan ikuti langkah berikut:
              </Typography>
              <ol>
                <li>
                  klik token dibawah untuk menyalin ke clipboard
                </li>
                <div className={styles.tooltip}>
                  <span className={styles.tooltiptext} id="myTooltip">Salin token</span>
                  <Button className={styles.telegramToken}>
                    <span onClick={(ev)=>{myTooltip.innerHTML = "token disalin"; setTimeout(()=>{myTooltip.style.visibility = "hidden"},1000); navigator.clipboard.writeText(ev.target.innerHTML)}}>{error.token}</span>
                  </Button>
                </div>
                <li>
                  buka link dibawah, lalu masukkan token ke dalam chat
                </li>
                <Link href={"https://t.me/yoga_test01bot"}>
                <a >
                <Typography variant="body1" className={styles.telegramToken}>
                  https://t.me/yoga_test01bot
                </Typography>
                </a>
                </Link>
                
              </ol>
                <CustomButton variant="outlined" onClick={()=>router.reload(window.location.pathname)}>
                        Kembali
                </CustomButton>
             </div>
            : 
            <div className={classes.paper}>
            <Grid container style={{ backgroundColor: "white" }} // style={{ backgroundColor: "#fafafa" }}
              className={classes.grid} justify="center" alignItems="center" spacing={3}>
              <Grid item container justify="center">
                <Grid item container alignItems="center" direction="column">
                  <Grid item>
                    <Avatar className={classes.avatar}>
                      <LockOutlinedIcon />
                    </Avatar>
                  </Grid>
                  <Grid item>
                  <h3>

                      Verification Code
                  </h3>
                  </Grid>
                </Grid>
              </Grid>
              <Grid item xs={12} textAlign="center">
                <Paper elevation={0} className={classes.paperroot}>
                  <p>

                    Please enter the verification code sent to your telegram
                  </p>
                </Paper>
              </Grid>
              <Grid item xs={12} container justify="center" alignItems="center" direction="column" >
                <Grid item spacing={3} justify="center" className={classes.gridmargin}>
                  <OtpInput separator={ <span>
                    <strong>.</strong>
                    </span>
                    }
                    numInputs={6}
                    value={otp}
                    onChange={(ev)=>otpHandleChange(ev)}
                    inputStyle={{
                width: "2rem",
                height: "2rem",
                margin: "0 0.5rem",
                fontSize: "1rem",
                borderRadius: 4,
                border: "1px solid rgba(0,0,0,0.3)"
              }}
                    />
                </Grid>
                {/* <MuiThemeProvider theme={theme}> */}
                  <Grid item className={classes.gridmargin_verify}>
                    <div className={styles.formButtons}>
                      {isOtpLoading ? (
                      <CircularProgress size={26} className={styles.loginLoader} />
                      ) : (
                        <button className={styles.submitBtn} type="submit" onClick={()=>
                            {console.log("click"),verifyOtp(otp,router)}}>
                      Verify
                    </button>
                      // <Button type="submit" fullWidth variant="contained" color="primary" onClick={()=>
                      //   {console.log("click"),verifyOtp(otp,router)}}
                      //   className={classes.submit}
                      //   >
                      //   Verify
                      // </Button>
                      )}
                    </div>
                  </Grid>
                {/* </MuiThemeProvider> */}
              </Grid>
            </Grid>
          </div>
          // null
            }
        </div>
      </div>
          </React.Fragment>
          
    </div>
  </div>
  )
}
export async function getServerSideProps({req}) {
  console.log("req login",req.cookies.token)
  if(req.cookies.token || false)
  return {
    redirect: {
      permanent:false,
      destination: "/odc"
    }
  }
  else
  return {
    props: {token: req.cookies.token || ""}, // will be passed to the page component as props
  }
}
const mapStateToProps = state =>({
  isLoading: state.Auth.loading.login,
  telegramToken: state.Auth.telegramToken,
  isUserVerifyLoading: state.Auth.loading.verifyUser,
  isUserVerify: state.Auth.openTelegramVerify,
  isOtpLoading: state.Auth.loading.otp,
  isOtpVerify: state.Auth.openOtpService
});
const mapDispatchToProps = {
  checkLogin,
  forgotPageClosed,
  verifyOtp
}
export default connect(mapStateToProps,mapDispatchToProps)(withRouter(Index_evolve));