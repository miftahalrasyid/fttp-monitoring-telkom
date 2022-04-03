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
    Fade,
    Avatar,
    Paper,
    makeStyles, useTheme, styled, createTheme,MuiThemeProvider
  } from "@material-ui/core";
  import Box from '@mui/material/Box';
import IconButton from '@mui/material/IconButton';
import Input from '@mui/material/Input';
import InputLabel from '@mui/material/InputLabel';
import InputAdornment from '@mui/material/InputAdornment';
import FormControl from '@mui/material/FormControl';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
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
    const [showPassword, setShowPassword] = useState(false);
    const handleChange = (prop) => (event) => {

      setValues({ ...values, [prop]: event.target.value });
    };
  
    const handleClickShowPassword = () => {
      setValues({
        ...values,
        showPassword: !values.showPassword,
      });
    };
  
    const handleMouseDownPassword = (event) => {
      event.preventDefault();
    };
    const handleChangeConfirm = (prop) => (event) => {

      setValuesConfirm({ ...valuesConfirm, [prop]: event.target.value });
    };
  
    const handleClickShowPasswordConfirm = () => {
      setValuesConfirm({
        ...valuesConfirm,
        showPassword: !valuesConfirm.showPassword,
      });
    };
  
    const handleMouseDownPasswordConfirm = (event) => {
      event.preventDefault();
    };
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

        <FormControl sx={{ m: 1, width: '100%' }} variant="standard">
          <InputLabel htmlFor="standard-adornment-password">Password</InputLabel>
          <Input
            id="standard-adornment-password"
            type={values.showPassword ? 'text' : 'password'}
            value={values.password}
            onChange={handleChange('password')}
            endAdornment={
              <InputAdornment position="end">
                <IconButton
                  aria-label="toggle password visibility"
                  onClick={handleClickShowPassword}
                  onMouseDown={handleMouseDownPassword}
                >
                  {values.showPassword ? <VisibilityOff /> : <Visibility />}
                </IconButton>
              </InputAdornment>
            }
          />
        </FormControl>
        <FormControl sx={{ m: 1, width: '100%' }} variant="standard">
          <InputLabel htmlFor="standard-adornment-password">Konfirmasi password</InputLabel>
          <Input
            id="standard-adornment-password"
            type={valuesConfirm.showPassword ? 'text' : 'password'}
            value={valuesConfirm.password}
            onChange={handleChangeConfirm('password')}
            endAdornment={
              <InputAdornment position="end">
                <IconButton
                  aria-label="toggle password visibility"
                  onClick={handleClickShowPasswordConfirm}
                  onMouseDown={handleMouseDownPasswordConfirm}
                >
                  {valuesConfirm.showPassword ? <VisibilityOff /> : <Visibility />}
                </IconButton>
              </InputAdornment>
            }
          />
        </FormControl>

                 
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