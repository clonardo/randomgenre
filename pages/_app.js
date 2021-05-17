import 'antd/dist/antd.css';
import '../styles/globals.css';
import '../styles/vars.css';
import { useState, useEffect } from 'react';
import GenreProvider from '../context/genre-context';
import { nanoid } from 'nanoid';
import { Typography } from 'antd';

// localstorage key
const lsKey = 'uniqid';

export default function MyApp({ Component, pageProps }) {
  const [uniqueId, setUniqueId] = useState(null);
  const [clientReady, setClientReady] = useState(false);
  useEffect(() => {
    if (window && window.localStorage) {
      const lsVal = window.localStorage.getItem(lsKey);
      if (!lsVal) {
        const newId = nanoid();
        console.log(`localStorage setting ID: ${newId}`);
        localStorage.setItem(lsKey, newId);
        setUniqueId(newId);
        setClientReady(true);
      } else {
        console.log(`localStorage ID already set: ${lsVal}`);
        setUniqueId(lsVal);
        setClientReady(true);
      }
    } else {
      console.log('localStorage not defined');
    }
  }, []);
  return clientReady ? (
    <GenreProvider targetId={uniqueId}>
      <Component {...pageProps} />
    </GenreProvider>
  ) : (
    <div>
      <Typography.Title>Initializing..</Typography.Title>
      {/* <div>
      <Component {...pageProps} />
      </div> */}
    </div>
  );
}
