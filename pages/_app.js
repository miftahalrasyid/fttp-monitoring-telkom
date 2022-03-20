import '../styles/globals.css';
import { wrapper } from '../components/store';
import 'bootstrap/dist/css/bootstrap.css';
import {initFirebaseBackend} from '../components/Firebase/index';
import { 
  createTheme as createThemeCustom, 
  ThemeProvider,
  styled as styledCustom
} from "@mui/material/styles";
const tema = createThemeCustom({
  status: {
    primary: "#ee2d24!important",
    warning: "#fb8c00!important",
    success: "#43a047!important",
    darkgray: "darkgray!important",
    info: "#1976d2!important"
  },
});
function MyApp({ Component, pageProps }) {
  if(typeof window !="undefined"){
    console.log("window",process.env.NEXT_SERVER_TEST_1)

    initFirebaseBackend();
  }
  return  <ThemeProvider theme={tema}>
    <Component {...pageProps} />
  </ThemeProvider>
}

export default wrapper.withRedux(MyApp)
