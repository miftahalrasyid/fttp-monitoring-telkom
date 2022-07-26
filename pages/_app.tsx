
import '../styles/globals.css';
import { wrapper } from '../components/store';
import 'bootstrap/dist/css/bootstrap.css';
import {initFirebaseBackend} from '../components/Firebase/index';
import { 
  createTheme as createThemeCustom, 
  ThemeProvider,
  styled as styledCustom
} from "@mui/material/styles";
import {ToastContainer} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export const statusTheme = {
  // primary: "#ee2d24!important",
  primary: "#B10040!important",
  warning: "#fb8c00!important",
  // success: "#43a047!important",
  success: "#009873!important",
  darkgray: "darkgray!important",
  info: "#1976d2!important"
}
declare module '@mui/material/styles' {
  // fix the type error when calling `createTheme()` with a custom theme option
  interface ThemeOptions {
    status?: {
      success?: string;
      primary?: string;
      darkgray?: string;
      warning?: string;
      info?: string;
    };
  }
  type ButtonProps = {
    btntype?:string,
    theme?: ThemeOptions,
    itemType?:string
  } 
  type TabsProps ={
    theme?: ThemeOptions,
  }
  type CircularProgressProps = {
    svgtype?:string,
    btncolor?:string,
    theme?: ThemeOptions
  } 
  type InputLabelProps = {
    theme?: ThemeOptions,
  }
  type TextFieldProps = {
    theme?: ThemeOptions,
    label?: string,
    texttype?: string,
  }
  type FormControlProps = {
    theme?: ThemeOptions,
    label?: string
  }
  type NativeSelectProps = {
    theme?: ThemeOptions,
  }
}
export const tema = createThemeCustom({
  status:statusTheme,
  spacing: (factor) => `${0.25 * factor}rem`,
  components:{
    MuiTypography:{
      styleOverrides:{
        root:{
          "&h5":{
            fontFamily: "'GothamRounded-Book' !important",

          },
        },
        h6:{
          fontFamily: "'GothamRounded-Bold' !important",
        },
        body1:{
          fontFamily: "'GothamRounded-Book' !important",

        },
        subtitle2:{
          fontFamily: "'GothamRounded-Book' !important",
          lineHeight: '1.5'
        }
      }
    },
    MuiPaper:{
      styleOverrides:{
        root:{
          // margin:"1rem 0",
          // background: 'rgba(255,255,255,0.3)',
          background: 'transparent',
          // padding:'0 1rem',
          boxShadow:"none",
          '[class*="MUIDataTable-responsiveBase"]':{
            padding: "0 2rem"
          },
          ".MuiList-root":{
            width: "100%"
          },
          ".MuiMenuItem-root":{
            width: "100%",
            display: "flex",
            paddingTop: "8px",
            paddingBottom: "8px",
          }
        }
      }
    },
    MuiPopover:{
      styleOverrides:{
        paper:{
          background:"white",
          boxShadow:"0px 2px 1px -1px rgb(0 0 0 / 20%), 0px 1px 1px 0px rgb(0 0 0 / 14%), 0px 1px 3px 0px rgb(0 0 0 / 12%)"
        }
      }
    },
    // MuiTable:{
    //   styleOverrides:{
    //     root:{
    //       width: "calc(100% - 2rem)",
    //       marginLeft: "1rem"
    //     }
    //   }
    // },
    MuiOutlinedInput:{
      styleOverrides:{
        root:{
          color: "#ee2d24!important"
        }
      }
    },
    // MuiTypography:{
    //   styleOverrides:{
    //     root:{
    //       fontFamily:"'GothamRounded-Book' !important"
    //     }
    //   }
    // },
    MuiButtonBase:{
      styleOverrides:{
        root:{
          fontFamily:"'GothamRounded-Book' !important"
        }
      }
    },
    MuiTableRow:{
      styleOverrides:{
        root:{
          color:"#ee2d24",
          backgroundColor:"transparent"
          // background:"rgba(255,255,255,0.3)"
        },
        "head":{
          // backgroundImage:"linear-gradient(to right,rgba(178,98,98,0.3),rgb(255 228 228 / 30%))",
          backgroundImage:"linear-gradient(to right,rgb(237 167 88 / 30%),rgb(253 243 236 / 30%))",
        },
      }
    },
    MuiTableCell:{
      styleOverrides:{
        root:{
          "span":{
            display:"flex",
            justifyContent:"center",
          },
        },
        head:{
          backgroundColor:"transparent !important",
        }
      }
    },
    MuiMenu:{
      styleOverrides:{
        paper:{
          boxShadow:"0px 2px 1px -1px rgb(0 0 0 / 20%), 0px 1px 1px 0px rgb(0 0 0 / 14%), 0px 1px 3px 0px rgb(0 0 0 / 12%) !important"
        },
        list:{
          background:"white",
        }
      }
    },
    MuiInputLabel:{
      styleOverrides:{
        root:{
          '&.Mui-focused':{
            color:"#ee2d24!important"
          }
        }
      }
    },
    MuiInput:{
      styleOverrides:{
        underline:{'&:after':{borderBottomColor:"#ee2d24!important"}}
      }
    },
    MuiButton:{
      styleOverrides:{
        textPrimary:{
          color: "#ee2d24!important"
        }
      }
    },
    MuiCheckbox:{
      styleOverrides:{
        colorPrimary:{
          color:"#ee2d24!important"
        }
      }
    },
    MuiIconButton:{
      styleOverrides:{
        root:{
          flex:" 0 0 auto !important",
          color: "rgba(0, 0, 0, 0.54) !important",
          padding:" 12px !important",
          overflow: "visible !important",
          fontSize: "1.5rem !important",
          textAlign: "center !important",
          transition: "background-color 150ms cubic-bezier(0.4, 0, 0.2, 1) 0ms !important",
          borderRadius:" 50% !important",
          '&:hover': {color: '#ee2d24 !important'},
          '&[class*="iconActive"]':{
            color: '#ee2d24 !important'
          }
        } as any,
        
      }
    },
    MuiToolbar:{
      styleOverrides:{
        root:{
          
        },
      }
    },
  }
});
function MyApp({ Component, pageProps }) {
  if(typeof window !="undefined"){
    // console.log("window",process.env.NEXT_SERVER_TEST_1)

    initFirebaseBackend();
  }
  return  <ThemeProvider theme={tema}>
    <Component {...pageProps} />
    <ToastContainer/>
  </ThemeProvider>
}

export default wrapper.withRedux(MyApp)
