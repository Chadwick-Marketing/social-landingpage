import '../styles/index.css';

import Analytics from '../components/Analytics';

function App({ Component, pageProps }) {
  return (
    <>
      <Component {...pageProps} />
      <Analytics />
    </>
  );
}

export default App;
