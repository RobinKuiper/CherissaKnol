import '../styles/globals.css'
import '@fontsource/roboto';
import "@fontsource/bebas-neue"
import { AnimatePresence, AnimateSharedLayout } from 'framer-motion';
import { Router, useRouter } from 'next/router';
import { SessionProvider } from 'next-auth/react';
import NProgress from 'nprogress'; //nprogress module
import 'nprogress/nprogress.css'; //styles of nprogress

NProgress.configure({
  template: ' \
  <div class="custom_bar" role="bar"> \
    <div class="custom_peg"></div> \
  </div> \
  <div class="spinner" role="spinner"> \
    <div class="spinner-icon"></div> \
  </div>',
  showSpinner: false
});

Router.events.on('routeChangeStart', () => NProgress.start());
Router.events.on('routeChangeComplete', () => NProgress.done());
Router.events.on('routeChangeError', () => NProgress.done());

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
