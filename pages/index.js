import React, { useState } from "react";
import {
  Grid,
  CircularProgress,
  Typography,
  Button,
  Tabs,
  Tab,
  TextField,
  Fade,
} from "@material-ui/core";
import { withRouter } from "next/router";
import classnames from "classnames";
import Image from 'next/image';
// styles
// import useStyles from "./styles";
import styles from './index.module.css';
// logo
import logo from "../public/img/telkom logo.png";

// import logo from "./logo.svg";
import google from "../public/img/google.svg";
import { connect } from "react-redux";
import { checkLogin} from "../components/store/login/actions"

// context
// import { useUserDispatch, loginUser } from "../../context/UserContext";

function Login(props) {
  const {checkLogin,router,isLoading} = props;
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

  return (
    <Grid container className={styles.container}>
      <div className={styles.logotypeContainer}>
        <div className={styles.pattern}>
          <div className={styles.logotypeImage}>
            <Image src={logo} alt="logo" />

          </div>
          <Typography className={styles.logotypeText}>Telkom Indonesia</Typography>
          </div>
        {/* <img src={logo}  /> */}
      </div>
      <div className={styles.formContainer}>
        <div className={styles.form}>
          {/* <Tabs
            value={activeTabId}
            onChange={(e, id) => setActiveTabId(id)}
            indicatorColor="primary"
            textColor="primary"
            centered
          >
            <Tab label="Login" classes={{ root: styles.tab }} />
            <Tab label="New User" classes={{ root: styles.tab }} />
          </Tabs> */}
          {/* {activeTabId === 0 && ( */}
            <React.Fragment>
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
              <div className={styles.formButtons}>
                {isLoading ? (
                  <CircularProgress size={26} className={styles.loginLoader} />
                ) : (
                  <Button
                  className={styles.loginbtn}
                    disabled={
                      loginValue.length === 0 || passwordValue.length === 0
                    }
                    onClick={() =>
                      // loginUser(
                      //   userDispatch,
                      //   loginValue,
                      //   passwordValue,
                      //   props.history,
                      //   setIsLoading,
                      //   setError,
                      // )
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
                <Button
                  color="primary"
                  size="large"
                  className={styles.forgetButton}
                >
                  Forget Password
                </Button>
              </div>
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
  isLoading: state.Login.loading
});
const mapDispatchToProps = {
  checkLogin
}

export default connect(mapStateToProps,mapDispatchToProps)(withRouter(Login));
