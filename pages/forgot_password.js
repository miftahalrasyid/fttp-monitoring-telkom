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
  import styles from './index.module.css';
  import logo from "../public/img/telkom logo.png";
  import { connect } from "react-redux";
  import { checkLogin, verifyOtp,requestForgotPassword} from "../components/store/login/actions";
  import correctImg from '../public/img/correct.png';

import { 
  styled as styledCustom 
} from "@mui/material/styles";
const CustomButton = styledCustom(Button)(({ theme }) => ({
  borderColor: theme.status.primary,
  color:theme.status.primary,
  textDecoration: "none",
}));

function Forgot_password({requestForgotPassword,isRequestConfirm}) {
  const router = useRouter();
    var [error, setError] = useState(null);
    var [activeTabId, setActiveTabId] = useState(0);
    var [nameValue, setNameValue] = useState("");
    var [loginValue, setLoginValue] = useState("admin@telkom.com");
    var [passwordValue, setPasswordValue] = useState("password");
    console.log("openconfirmation page",isRequestConfirm)
  return (
    <Grid container className={styles.container}>
        <div className={styles.logotypeContainer}>
            <div className={styles.pattern}>
            <div className={styles.logotypeImage}>
                <Image src={logo} alt="logo" />

            </div>
            <Typography className={styles.logotypeText}>Telkom Indonesia</Typography>
            </div>
            {/* <img src={logo} /> */}
        </div>
        <div className={styles.formContainer}>
        <div className={styles.form}>
        <React.Fragment>
            <div>
              <div>
                <div className={styles.logotypeImageMobile}>
                  <Image src={logo} alt="logo" />

                </div>
                <Typography className={styles.logotypeTextMobile}>Telkom Indonesia</Typography>
              </div>
              {!isRequestConfirm?
                <div>
                  <Typography variant="h6" className={styles.resetPassword}>
                    Ajukan ganti password
                  </Typography>
                  <Typography variant="subtitle1" className={styles.resetSubtitle}>
                    Silahkan masukkan email anda
                  </Typography>
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

                    <div className={styles.formButtons}>
                      {isRequestConfirm ? (
                      <CircularProgress size={26} className={styles.loginLoader} />
                      ) : (
                      <Button className={styles.loginbtn} disabled={ loginValue.length===0 ||
                        passwordValue.length===0 } onClick={()=>
                          requestForgotPassword(email)
                        }
                        variant="outlined"
                        color="primary"
                        size="large"
                        >
                        Submit
                      </Button>
                      )}
                    </div>
                    <p className={styles.goToLogin}>
                      {"apakah sudah ingat? "}
                      <Link href={"/"}><a className={styles.decorationNone}>Sign In</a></Link>
                    </p>

                </div>
              :<div className={styles.confirmationPageWrapper}>
                <Image src={correctImg} alt="correctImg" width={50} height={50}/>
                <Typography variant='h5' className={styles.confirmationTitle}>
                  Permintaan anda telah kami proses
                </Typography>
                <Typography variant='subtitle2' className={styles.confirmationDetail}>
                  Link reset password akan segera dikirimkan ke telegram anda  
                </Typography>
                <Link href={"/"}>
                  <a className={styles.decorationNone}>
                    <CustomButton variant="outlined" >
                      Kembali
                    </CustomButton>
                  </a>
                </Link>
              </div>
              }

            </div>

          </React.Fragment>
        </div>
            <Typography color="primary" className={styles.copyright}>
            © 2014-{new Date().getFullYear()} <a style={{ textDecoration: 'none', color: 'inherit' }} href="https://telkom.com" rel="noopener noreferrer" target="_blank">Telkom Indonesia</a>, LLC. All rights reserved.
            </Typography>
        </div>
    </Grid>
  )
}
const mapStateToProps = state =>({
    isRequestConfirm: state.Login.openConfirmationPage,
  });
  const mapDispatchToProps = {
    requestForgotPassword
  }
export default connect(mapStateToProps,mapDispatchToProps)(Forgot_password)