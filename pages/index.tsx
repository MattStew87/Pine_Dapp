import Head from 'next/head';
import type { NextPage } from 'next';

// Imported Pages
import Main from './main';


const Home: NextPage = () => {
  
  return (
    <>
      <Head>
        <title>Pine</title>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, height=device-height, initial-scale=1.0" />
        <meta httpEquiv="X-UA-Compatible" content="IE=edge" />
        <meta property="og:title" content="Pine" />
        <meta property="og:description" content="Pine!!!" />
        <meta property="og:image" content="http://digipunk.netii.net/images/radar.gif" />
        <meta property="og:url" content="http://digipunk.netii.net" />
        <link rel="icon" href="https://pbs.twimg.com/profile_images/1659657965417160704/spa6XX5m_400x400.png" type="image/x-icon" />
      </Head>
      <div>

        <div> 
          <Main />
        </div>



      
   
      </div>

    </>
  );
};

export default Home;
