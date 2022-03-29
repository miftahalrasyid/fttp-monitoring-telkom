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
  import LockOutlinedIcon from "@material-ui/icons/LockOutlined";
  import styles from './index.module.css';
  import logo from "../public/img/telkom logo.png";
  import { connect } from "react-redux";
  import { checkLogin, verifyOtp} from "../components/store/login/actions"
  const CustomButton = styled(Button)(({ theme }) => ({
    background: theme.status.primary,
  }));
function Reset_password({isLoading,checkLogin}) {
    var [error, setError] = useState(null);
    var [activeTabId, setActiveTabId] = useState(0);
    var [nameValue, setNameValue] = useState("");
    var [loginValue, setLoginValue] = useState("");
    var [passwordValue, setPasswordValue] = useState("");
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
              <div>
                <Typography variant="h6" className={styles.resetPassword}>
                  Ganti Password
                </Typography>
                <Typography variant="subtitle1" className={styles.resetSubtitle}>
                Silahkan masukkan password baru anda
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
                <TextField id="password" InputProps={{
                  classes: {
                    underline: styles.textFieldUnderline,
                    input: styles.textField,
                  },
                }} value={loginValue} onChange={e=> setLoginValue(e.target.value)}
                  margin="normal"
                  placeholder="Password"
                  type="password"
                  fullWidth
                  />
                  <TextField id="password_confirm" InputProps={{
                  classes: {
                    underline: styles.textFieldUnderline,
                    input: styles.textField,
                  },
                }} value={passwordValue} onChange={e=> setPasswordValue(e.target.value)}
                    margin="normal"
                    placeholder="Konfirmasi password"
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
                    Reset
                    </Button>
                    )}    
                </div>

              </div>
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
    isLoading: state.Login.loading.login,
  });
  const mapDispatchToProps = {
    checkLogin,
    verifyOtp
  }
export default connect(mapStateToProps,mapDispatchToProps)(Reset_password)