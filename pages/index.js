import React, { useCallback, useEffect, useState } from "react";
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
import Skeleton, { SkeletonTheme } from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';
import { 
  styled as styledCustom 
} from "@mui/material/styles";
import Link from 'next/link';
import LockOutlinedIcon from "@material-ui/icons/LockOutlined";
import OtpInput from "react-otp-input";
import { withRouter } from "next/router";
import classnames from "classnames";
import Image from 'next/image';
// styles
// import useStyles from "./styles";
import styles from './index.module.css';
// logo
import logo from "../public/img/telkom logo.png";

// import logo from "./logo.svg";
import teleLogo from '../public/img/telegram.svg';
import google from "../public/img/google.svg";
import { connect } from "react-redux";
import { checkLogin, verifyOtp,forgotPageClosed} from "../components/store/login/actions"

// context
// import { useUserDispatch, loginUser } from "../../context/UserContext";
const CustomButton = styledCustom(Button)(({ theme }) => ({
  borderColor: theme.status.primary,
  color:theme.status.primary,
  textDecoration: "none",
  typography: {
    fontFamily: 'GothamRounded-Book',
  },
}));

function Login(props) {
  const {checkLogin,router,isLoading,isOtpVerify,verifyOtp,isOtpLoading, isUserVerify,isUserVerifyLoading,forgotPageClosed} = props;
  // console.log(isLoading)
  // console.log(isOtpVerify)
  // console.log(verifyOtp("test",router))
  // verifyOtp("test",router)
  // var classes = useStyles();

  // global
  // var userDispatch = useUserDispatch();

  // local
  // var [isLoading, setIsLoading] = useState(false);
  var [error, setError] = useState(null);
  var [activeTabId, setActiveTabId] = useState(0);
  var [nameValue, setNameValue] = useState("");
  var [loginValue, setLoginValue] = useState("admin@telkom.com");
  var [passwordValue, setPasswordValue] = useState("password");
  const [otp,setOtp] = useState(null);

  React.useEffect(()=>{
    setOtp("1234")
    forgotPageClosed();
  },[])
  const otpHandleChange = React.useCallback((value)=>{
    setOtp(value)
    console.log(value)
  },[otp])

  // const otpHandleChange = (value) =>{
    
  // }
  const useStyles = makeStyles(theme => ({
    grid: {
      backgroundColor: "grey",
      height: "50vh",
      textAlign: "center"
    },
    avatar: {
      margin: theme.spacing(1),
      backgroundColor: "#ee2e24"
    },
    submit: {
      margin: theme.spacing(3, 0, 2),
      backgroundColor: "#ee2e24"
    },
    paper: {
      marginTop: theme.spacing(8),
      display: "flex",
      flexDirection: "column",
      alignItems: "center"
    },
    paperroot:{
      // backgroundColor: "#fafafa"
    }
  }));
  const classes = useStyles();
  const theme = createTheme({
    status: {
      primary: "#ee2d24!important",
      darkgray: "darkgray!important"
    },
  });
  const [isImageReady, setIsImageReady] = useState(false);
  useEffect(()=>{
    logoLoadCallback()
  },[isImageReady])
  const logoLoadCallback = useCallback((ev)=>{
    setIsImageReady(true)
    typeof onLoad === "function" && onLoad(e)
  },[isImageReady])
  // const logoLoadCallback = (ev) =>{
  //   console.log("loading image",ev)
     
  // }
  return (
    <Grid container className={styles.container}>
      <div className={styles.logotypeContainer}>
        <div className={styles.pattern}>
          <div className={`${styles.logotypeImage}`}>
          {!isImageReady ? (
              <Skeleton
                  circle
                  width="165px"
                  height="165px"
                  containerClassName="avatar-skeleton"
              />
          ):<Image layout="responsive" onLoadingComplete={(ev)=>logoLoadCallback(ev)} src={logo} alt="logo" />}
            

          </div>
          <Typography className={styles.logotypeText}>Telkom Indonesia</Typography>
        </div>
        {/* <img src={logo} /> */}
      </div>
      <div className={styles.formContainer}>
        <div className={styles.form}>
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
            {isUserVerifyLoading ?
            <div>
              <div>
                <div className={styles.logotypeImageMobile}>
                  <Image onLoad={logoLoadCallback} src={logo} alt="logo" />

                </div>
                <Typography className={styles.logotypeTextMobile}>Telkom Indonesia</Typography>
              </div>
              <div>
                <Typography variant="h1" className={styles.greeting}>
                  Welcome to Diginote ODC
                </Typography>
                {/* <Button size="large" className={styles.googleButton}>
                  <img src={google} alt="google" className={styles.googleIcon} />
                  &nbsp;Sign in with Google
                </Button> */}
                {/* <div className={styles.formDividerContainer}>
                  <div className={styles.formDivider} />
                  <Typography className={styles.formDividerWord}>or</Typography>
                  <div className={styles.formDivider} />
                </div> */}
                <Fade in={error}>
                  <Typography color="secondary" className={styles.errorMessage}>
                    Something is wrong with your login or password :(
                  </Typography>
                </Fade>
                <TextField id="email" InputProps={{
                  classes: {
                    underline: styles.textFieldUnderline,
                    input: styles.textField,
                  },
                }} value={loginValue} onChange={e=> setLoginValue(e.target.value)}
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
                }} value={passwordValue} onChange={e=> setPasswordValue(e.target.value)}
                    margin="normal"
                    placeholder="Password"
                    type="password"
                    fullWidth
                    />
                    <div className={styles.formButtons}>
                      {isLoading ? (
                      <CircularProgress size={26} className={styles.loginLoader} />
                      ) : (
                      <Button className={styles.loginbtn} disabled={ loginValue.length===0 || passwordValue.length===0 }
                        onClick={()=>
                        checkLogin(
                        loginValue,
                        passwordValue,
                        router,
                        )
                        }
                        variant="outlined"
                        color="primary"
                        size="large"
                        >
                        Login
                      </Button>
                      )}
                      <Link href={'/forgot_password'}>
                        <a className={styles.decorationNone}>
                          <Button color="primary" size="large" className={styles.forgetButton}>
                            Forgot Password
                          </Button>
                        </a>
                      </Link>
                    </div>
              </div>
            </div>
            :
             isUserVerify ? <div className={styles.telegramWrapper}>
              <Image src={teleLogo} alt="telegram logo" width={50} height={50} />
              <Typography Typography variant="h5" className={styles.telegramTitle}>
                Integrasi dengan Telegram
              </Typography>
              <Typography variant="subtitle1" className={styles.telegramSubTitle}>
                untuk menyambungkan akun anda dengan telegram, silahkan ikuti langkah berikut:
              </Typography>
              <ol>
                <li>
                  klik token dibawah untuk menyalin ke clipboard
                </li>
                <div className={styles.tooltip}>
                  <span className={styles.tooltiptext} id="myTooltip">Salin token</span>
                  <Button onClick={(ev)=>{myTooltip.innerHTML = "token disalin"; setTimeout(()=>{myTooltip.style.visibility = "hidden"},1000); navigator.clipboard.writeText(ev.target.innerHTML)}} className={styles.telegramToken}>
                    TOKEN123As2DwYTKLWSKWL234Sm
                  </Button>
                </div>
                <li>
                  buka link dibawah, lalu masukkan token ke dalam chat
                </li>
                <Link href={"https://t.me/yoga_test01bot"}>
                <a >
                <Typography variant="subtitle1" className={styles.telegramToken}>
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
                    <Typography component="h1" variant="h5">
                      Verification Code
                    </Typography>
                  </Grid>
                </Grid>
              </Grid>
              <Grid item xs={12} textAlign="center">
                <Paper elevation={0} className={classes.paperroot}>
                  <Typography variant="h6">
                    Please enter the verification code sent to your mobile
                  </Typography>
                </Paper>
              </Grid>
              <Grid item xs={12} container justify="center" alignItems="center" direction="column">
                <Grid item spacing={3} justify="center">
                  <OtpInput separator={ <span>
                    <strong>.</strong>
                    </span>
                    }
                    numInputs={4}
                    value={otp}
                    onChange={(ev)=>otpHandleChange(ev)}
                    inputStyle={{
                width: "3rem",
                height: "3rem",
                margin: "0 1rem",
                fontSize: "2rem",
                borderRadius: 4,
                border: "1px solid rgba(0,0,0,0.3)"
              }}
                    />
                </Grid>
                <MuiThemeProvider theme={theme}>
                  <Grid item>
                    <div className={styles.formButtons}>
                      {isOtpLoading ? (
                      <CircularProgress size={26} className={styles.loginLoader} />
                      ) : (
                      <Button type="submit" fullWidth variant="contained" color="primary" onClick={()=>
                        {console.log("click"),verifyOtp(otp,router)}}
                        className={classes.submit}
                        >
                        Verify
                      </Button>
                      )}
                    </div>
                  </Grid>
                </MuiThemeProvider>
              </Grid>
            </Grid>
          </div>
          // null
            }

          </React.Fragment>
          {/* )}*/}
          {/* {activeTabId === 1 && (
            <React.Fragment>
              <Typography variant="h1" className={styles.greeting}>
                Welcome!
              </Typography>
              <Typography variant="h2" className={styles.subGreeting}>
                Create your account
              </Typography>
              <Fade in={error}>
                <Typography color="secondary" className={styles.errorMessage}>
                  Something is wrong with your login or password :(
                </Typography>
              </Fade>
              <TextField
                id="name"
                InputProps={{
                  classes: {
                    underline: styles.textFieldUnderline,
                    input: styles.textField,
                  },
                }}
                value={nameValue}
                onChange={e => setNameValue(e.target.value)}
                margin="normal"
                placeholder="Full Name"
                type="text"
                fullWidth
              />
              <TextField
                id="email"
                InputProps={{
                  classes: {
                    underline: styles.textFieldUnderline,
                    input: styles.textField,
                  },
                }}
                value={loginValue}
                onChange={e => setLoginValue(e.target.value)}
                margin="normal"
                placeholder="Email Adress"
                type="email"
                fullWidth
              />
              <TextField
                id="password"
                InputProps={{
                  classes: {
                    underline: styles.textFieldUnderline,
                    input: styles.textField,
                  },
                }}
                value={passwordValue}
                onChange={e => setPasswordValue(e.target.value)}
                margin="normal"
                placeholder="Password"
                type="password"
                fullWidth
              />
              <div className={styles.creatingButtonContainer}>
                {isLoading ? (
                  <CircularProgress size={26} />
                ) : (
                  <Button
                    onClick={() =>
                      loginUser(
                        userDispatch,
                        loginValue,
                        passwordValue,
                        props.history,
                        setIsLoading,
                        setError,
                      )
                    }
                    disabled={
                      loginValue.length === 0 ||
                      passwordValue.length === 0 ||
                      nameValue.length === 0
                    }
                    size="large"
                    variant="contained"
                    color="primary"
                    fullWidth
                    className={styles.createAccountButton}
                  >
                    Create your account
                  </Button>
                )}
              </div>
              <div className={styles.formDividerContainer}>
                <div className={styles.formDivider} />
                <Typography className={styles.formDividerWord}>or</Typography>
                <div className={styles.formDivider} />
              </div>
              <Button
                size="large"
                className={classnames(
                  styles.googleButton,
                  styles.googleButtonCreating,
                )}
              >
                <img src={google} alt="google" className={styles.googleIcon} />
                &nbsp;Sign in with Google
              </Button>
            </React.Fragment>
          )} */}
        </div>
        <Typography color="primary" className={styles.copyright}>
        © 2014-{new Date().getFullYear()} <a style={{ textDecoration: 'none', color: 'inherit' }} href="https://telkom.com" rel="noopener noreferrer" target="_blank">Telkom Indonesia</a>, LLC. All rights reserved.
        </Typography>
      </div>
    </Grid>
  );
}
const mapStateToProps = state =>({
  isLoading: state.Login.loading.login,
  isUserVerifyLoading: state.Login.loading.verifyUser,
  isUserVerify: state.Login.openTelegramVerify,
  isOtpLoading: state.Login.loading.otp,
  isOtpVerify: state.Login.openOtpService
});
const mapDispatchToProps = {
  checkLogin,
  forgotPageClosed,
  verifyOtp
}

export default connect(mapStateToProps,mapDispatchToProps)(withRouter(Login));
