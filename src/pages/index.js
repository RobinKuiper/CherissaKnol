import Head from 'next/head'
import { Layout } from '../components'

export default function Home() {

  return (
    <Layout>
      <Head>
        <title>Cherissa Knol</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <div className='flex justify-center items-center h-full'>
        <h1 className='text-8xl font-bold -mt-20 text-shadow'>Welcome!</h1>
      </div>
    </Layout>
  )
}
