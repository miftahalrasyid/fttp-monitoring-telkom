import React from 'react';
import Document, { Html, Head, Main, NextScript } from 'next/document';
import { ServerStyleSheets } from '@material-ui/styles'; // works with @material-ui/core/styles, if you prefer to use it.
// import theme from '../src/theme'; // Adjust here as well
export default class MyDocument extends Document {
  render() {

    return (
      <Html lang="en" data-notch="true" data-orientation="portrait">
        <Head>
        <meta charSet={"utf-8"} /> 
        <meta name="theme-color" content="red"></meta>
        {/* <meta name="theme-color" content="hsla(40,95%,85%,0.5)"></meta> */}
        <meta name='viewport' content='initial-scale=1, viewport-fit=cover'></meta>
        <meta name="apple-mobile-web-app-status-bar-style" content="black"></meta>
        <meta name="apple-mobile-web-app-capable" content="yes" />
        {/* <meta name="viewport" content="width=device-width, initial-scale=1.0, user-scalable=no, minimum-scale=1.0, maximum-scale=1.0"/>
        <meta name="apple-mobile-web-app-capable" content="yes"/> 
        <meta name="apple-mobile-web-app-status-bar-style" content="black"/> */}
          {/* Not exactly required, but this is the PWA primary color */}
          {/* <meta name="theme-color" content={theme.palette.primary.main} /> */}
          <link rel="preconnect" href="https://fonts.googleapis.com"/>
          <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin={true as any}/>
          {/* <link href="../styles/globals.css" rel="stylesheet" /> */}
          {/* <base href="/"/> */}
          <link href="https://fonts.googleapis.com/css2?family=Montserrat:wght@500;600;700&display=swap" rel="stylesheet"></link>
          
        </Head>
        <body>
          <Main />
          <NextScript />
          
        </body>
      </Html>
    );
  }
}

// `getInitialProps` belongs to `_document` (instead of `_app`),
// it's compatible with server-side generation (SSG).
MyDocument.getInitialProps = async (ctx) => {
  // Resolution order
  //
  // On the server:
  // 1. app.getInitialProps
  // 2. page.getInitialProps
  // 3. document.getInitialProps
  // 4. app.render
  // 5. page.render
  // 6. document.render
  //
  // On the server with error:
  // 1. document.getInitialProps
  // 2. app.render
  // 3. page.render
  // 4. document.render
  //
  // On the client
  // 1. app.getInitialProps
  // 2. page.getInitialProps
  // 3. app.render
  // 4. page.render

  // Render app and page and get the context of the page with collected side effects.
  const sheets = new ServerStyleSheets();
  const originalRenderPage = ctx.renderPage;

  ctx.renderPage = () =>
    originalRenderPage({
      enhanceApp: (App) => (props) => sheets.collect(<App {...props} />),
    });

  const initialProps = await Document.getInitialProps(ctx);

  return {
    ...initialProps,
    // Styles fragment is rendered after the app and page rendering finish.
    styles: [...React.Children.toArray(initialProps.styles), sheets.getStyleElement()],
  };
};