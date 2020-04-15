import React from 'react';
import App from 'next/app';
import { ThemeProvider ,CSSReset} from "@chakra-ui/core";
import { NextSeo } from 'next-seo';
import SEO from 'next-seo.config';
import theme from 'theme'
import 'public/css'
import { ApolloProvider } from "@apollo/react-hooks";
import client from 'pages/api/apollo'

class MyApp extends App {

  static async getInitialProps({ Component, ctx }) {
    let pageProps = {};
    if (Component.getInitialProps) {
      pageProps = await Component.getInitialProps(ctx);
    }

    return { pageProps };
  }

  componentDidMount() {
   
  }

  render() {
    const { Component, pageProps } = this.props;

    return (
      <ApolloProvider {...{client}}>
      {/* Wrap every thing in JSS and Theme providers */}
      
      <NextSeo {...SEO} />
      <ThemeProvider {...{theme}}>
      <CSSReset />
          <Component {...pageProps} />
       </ThemeProvider>
      
      </ApolloProvider>
    );
  }
}

export default MyApp;
