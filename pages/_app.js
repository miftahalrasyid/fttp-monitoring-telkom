import '../styles/globals.css';
import { wrapper } from '../components/store';
import 'bootstrap/dist/css/bootstrap.css';
import {initFirebaseBackend} from '../components/Firebase/index';

function MyApp({ Component, pageProps }) {
  if(typeof window !="undefined"){
    console.log("window",process.env.NEXT_SERVER_TEST_1)

    initFirebaseBackend();
  }
  return <Component {...pageProps} />
}

export default wrapper.withRedux(MyApp)
