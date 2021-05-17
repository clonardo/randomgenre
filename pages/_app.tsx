import 'antd/dist/antd.css';
import '../styles/globals.css';
import '../styles/vars.css';
import { Provider } from 'next-auth/client';
import type { AppProps } from 'next/app';

// Use the <Provider> to improve performance and allow components that call
// `useSession()` anywhere in your application to access the `session` object.
export default function App({ Component, pageProps }: AppProps) {
  return (
    <Provider>
      <Component {...pageProps} />
    </Provider>
  );
}
