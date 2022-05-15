import '../styles/globals.css'
import '@fontsource/roboto';
import "@fontsource/bebas-neue"
import { AnimatePresence, AnimateSharedLayout } from 'framer-motion';
import { useRouter } from 'next/router';
import { SessionProvider} from 'next-auth/react';

function MyApp({ Component, pageProps: { session, ...pageProps } }) {
  const router = useRouter();

  return (
    // <AnimateSharedLayout>
    <SessionProvider session={session}>
    <AnimatePresence exitBeforeEnter initial={false}>
      <Component {...pageProps} key={router.asPath} />
    </AnimatePresence>
    </SessionProvider>
    // </AnimateSharedLayout>
  )
}

export default MyApp
