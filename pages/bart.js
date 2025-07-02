// pages/bart.js
import { useRef, useState } from 'react'
import Head from 'next/head'
import html2canvas from 'html2canvas'

export default function BartGenerator() {
  const [text, setText] = useState('')
  const [preview, setPreview] = useState(false)
  const outputRef = useRef(null)

  const handleDownload = async () => {
    if (!outputRef.current) return
    const canvas = await html2canvas(outputRef.current)
    const link = document.createElement('a')
    link.download = 'bart.png'
    link.href = canvas.toDataURL('image/png')
    link.click()
  }

  return (
    <>
      <Head>
        <title>Bart Generator - Marimo</title>
      </Head>

      <main style={{ padding: '40px', textAlign: 'center', background: '#111', color: '#fff', minHeight: '100vh' }}>
        <h1 style={{ fontSize: '2rem', color: '#00ffee' }}>🧠 Bart Generator</h1>

        <textarea
          placeholder="Tulis kata-kata Bart lo di sini..."
          rows={4}
          style={{
            width: '90%',
            maxWidth: '500px',
            marginTop: '20px',
            padding: '10px',
            fontSize: '1rem',
            borderRadius: '10px',
            border: 'none',
            outline: 'none',
            resize: 'none'
          }}
          value={text}
          onChange={e => setText(e.target.value)}
        />

        <div style={{ marginTop: '20px' }}>
          <button onClick={() => setPreview(true)} style={buttonStyle}>Preview</button>
          <button onClick={handleDownload} style={{ ...buttonStyle, background: '#00ffee', color: '#000' }}>
            Download PNG
          </button>
        </div>

        {preview && (
          <div ref={outputRef} style={outputStyle}>
            <p style={{ whiteSpace: 'pre-wrap', fontSize: '1.2rem' }}>{text}</p>
          </div>
        )}
      </main>
    </>
  )
}

const buttonStyle = {
  padding: '10px 20px',
  margin: '10px',
  borderRadius: '8px',
  background: '#222',
  color: '#00ffee',
  border: '2px solid #00ffee',
  cursor: 'pointer',
  fontWeight: 'bold',
  transition: '0.3s',
}

const outputStyle = {
  margin: '40px auto 0',
  background: '#fff',
  color: '#000',
  padding: '20px',
  borderRadius: '15px',
  maxWidth: '500px',
  minHeight: '100px',
  boxShadow: '0 0 10px #00ffee'
            }
