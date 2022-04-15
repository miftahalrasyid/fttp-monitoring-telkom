import React, { useEffect, useState } from 'react';
import Layout from '../Layout';
import {connect } from 'react-redux';
import {useRouter} from 'next/router';
import Login from '../../pages';


export default function Auth(Component) {
    const AuthwithLayout = (pageProps) =>{
      const router = useRouter();
        const getCookie = (cname)=> {
            let name = cname + "=";
            let decodedCookie = (typeof window !== "undefined") ? decodeURIComponent(document.cookie) : "";
            let ca = decodedCookie.split(';');
            for(let i = 0; i < ca.length; i++) {
              let c = ca[i];
              while (c.charAt(0) == ' ') {
                c = c.substring(1);
              }
              if (c.indexOf(name) == 0) {
                return c.substring(name.length, c.length);
              }
            }
            return "";
          }
          const [auth,setAuth] = useState("")
          useEffect(()=>{
            setAuth(getCookie("token"))
          },[setAuth])
          // if(auth)
        return <Layout {...pageProps}>
            <Component {...pageProps}/>
        </Layout>
        // else {
        //   console.log("test")
        //   return <Login/>
        // }
    }
  return AuthwithLayout
}