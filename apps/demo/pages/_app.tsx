import { AppProps } from 'next/app'
import Head from 'next/head'
import './styles.css'
import 'tippy.js/animations/scale.css'
import 'tippy.js/dist/tippy.css'


const App = ({ Component, pageProps }: AppProps) => {
  return (
    <>
      <Head>
        <title>Editor Demo</title>
      </Head>
      <main className="app">
        <Component {...pageProps} />
      </main>
    </>
  )
}

export default App
