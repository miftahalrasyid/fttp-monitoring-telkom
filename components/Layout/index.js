import React from 'react';
import Navbar from '../Navbar';
import Footer from '../Footer';

export default function Layout(Component) {
    const LayoutDiv = (pageProps) =>{
        return <div>
            <Navbar/>
            <Component {...pageProps}/>
            <Footer/>
        </div>
    }
  
    return LayoutDiv;
}
