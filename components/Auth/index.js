import React from 'react';
import Layout from '../Layout';


export default function Auth(Component) {
    const AuthwithLayout = (pageProps) =>{

        return <Layout {...pageProps}>
            <Component {...pageProps}/>
        </Layout>
    }
  return AuthwithLayout
}