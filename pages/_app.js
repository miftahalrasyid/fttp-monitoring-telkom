import '../styles/globals.css';
import { wrapper } from '../components/store';

function MyApp({ Component, pageProps }) {
  return <Component {...pageProps} />
}

export default wrapper.withRedux(MyApp)
