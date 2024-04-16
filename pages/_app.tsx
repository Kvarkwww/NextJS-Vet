//import '../styles/globals.css'
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { AppProps } from 'next/app';
import 'bootstrap/dist/css/bootstrap.min.css';

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <>
      <Navbar />
      <Component {...pageProps} />
      {/* Footer */}
      <Footer />
    </>
  )
}

export default MyApp