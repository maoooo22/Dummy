// pages/index.js
import Head from 'next/head'
import Link from 'next/link'
import '../styles/globals.css' // ganti dengan lokasi CSS global kamu

export default function Home() {
  return (
    <>
      <Head>
        <title>Portofolio Marimo</title>
        <meta name="description" content="Portofolio web buatan Marimo" />
      </Head>

      <main style={{ padding: '40px', textAlign: 'center' }}>
        <h1 style={{ fontSize: '2.5rem', color: '#00ffee' }}>HI, I'M MARIMO</h1>
        <p style={{ maxWidth: '600px', margin: '20px auto', color: '#ccc' }}>
          Gue anak SMP yang hobi ngoding, main Roblox dan eksperimen. Welcome to my portfolio website!
        </p>

        <Link href="/bart">
          <a style={{
            marginTop: '20px',
            display: 'inline-block',
            padding: '12px 24px',
            background: '#00ffee',
            color: '#000',
            borderRadius: '25px',
            fontWeight: 'bold',
            textDecoration: 'none',
            transition: '0.3s',
          }}>
            🚀 Coba Bart Generator
          </a>
        </Link>
      </main>
    </>
  )
            }
