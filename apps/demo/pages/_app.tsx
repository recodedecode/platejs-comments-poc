import { AppProps } from 'next/app'
import Head from 'next/head'
import TimeAgo from 'javascript-time-ago'
import en from 'javascript-time-ago/locale/en.json'
import './styles.css'
import 'tippy.js/animations/scale.css'
import 'tippy.js/dist/tippy.css'


TimeAgo.addDefaultLocale(en)

const App = ({ Component, pageProps }: AppProps) => {
  return (
    <>
      <Head>
        <title>Editor Demo</title>
      </Head>
      <Component {...pageProps} />
    </>
  )
}

export default App
