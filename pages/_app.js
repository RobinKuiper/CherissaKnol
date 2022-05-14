import '../styles/globals.css'
import '@fontsource/roboto';
import { AnimatePresence, AnimateSharedLayout } from 'framer-motion';
import { useRouter } from 'next/router';

function MyApp({ Component, pageProps }) {
  const router = useRouter();

  return (
    // <AnimateSharedLayout>
    <AnimatePresence exitBeforeEnter initial={false}>
      <Component {...pageProps} key={router.asPath} />
    </AnimatePresence>
    // </AnimateSharedLayout>
  )
}

export default MyApp
