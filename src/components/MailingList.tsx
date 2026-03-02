import { useState, useRef } from 'react'
import { motion, useInView } from 'framer-motion'

export default function MailingList() {
    const [email, setEmail] = useState('')
    const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle')
    const ref = useRef(null)
    const inView = useInView(ref, { once: true, margin: '-60px' })

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        setStatus('loading')
        try {
            const res = await fetch('https://formspree.io/f/xwvndogk', {
                method: 'POST',
                headers: { 'Accept': 'application/json', 'Content-Type': 'application/json' },
                body: JSON.stringify({ email }),
            })
            if (res.ok) { setStatus('success'); setEmail('') }
            else setStatus('error')
        } catch { setStatus('error') }
    }

    return (
        <section
            id="novedades"
            ref={ref}
            style={{
                padding: '100px 40px',
                background: '#F2EEE9', // Match Collections background
                textAlign: 'center',
            }}
        >
            <div style={{ maxWidth: '640px', margin: '0 auto' }}>

                {/* Header */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={inView ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.7 }}
                    style={{ marginBottom: '40px' }}
                >
                    <p style={{
                        fontFamily: "'Lato', Helvetica, sans-serif",
                        fontSize: '0.65rem',
                        letterSpacing: '0.28em',
                        textTransform: 'uppercase',
                        color: '#B8860B',
                        marginBottom: '16px',
                        fontWeight: 400,
                    }}>
                        Novedades
                    </p>

                    <h2 style={{
                        fontFamily: "'Cormorant Garamond', Georgia, serif",
                        fontSize: 'clamp(2rem, 5vw, 2.8rem)',
                        fontStyle: 'italic',
                        fontWeight: 400,
                        color: '#2D2420',
                        lineHeight: 1.2,
                        marginBottom: '20px',
                    }}>
                        Recibí ofertas y lanzamientos
                    </h2>

                    <div style={{
                        width: '40px',
                        height: '1px',
                        background: '#B8860B',
                        margin: '0 auto 24px'
                    }} />

                    <p style={{
                        fontFamily: "'Lato', Helvetica, sans-serif",
                        fontSize: '0.92rem',
                        color: '#6B5E55',
                        lineHeight: 1.7,
                        maxWidth: '520px',
                        margin: '0 auto',
                    }}>
                        Suscribite para enterarte antes que nadie de nuevas colecciones,
                        descuentos exclusivos y el significado de las piedras del mes.
                    </p>
                </motion.div>

                {/* Form */}
                {status === 'success' ? (
                    <motion.div
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                        style={{
                            padding: '32px',
                            color: '#B8860B',
                            fontFamily: "'Lato', sans-serif",
                            fontSize: '1rem',
                            fontWeight: 700,
                        }}
                    >
                        ¡Gracias por suscribirte! Pronto recibirás nuestras novedades.
                    </motion.div>
                ) : status === 'error' ? (
                    <motion.div
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                        style={{ padding: '24px', color: '#C0392B', fontFamily: "'Lato', sans-serif", fontSize: '0.95rem' }}
                    >
                        Hubo un error al enviar. Por favor intentá de nuevo.
                        <br />
                        <button onClick={() => setStatus('idle')} style={{ marginTop: '12px', background: 'none', border: 'none', cursor: 'pointer', color: '#A67C37', fontFamily: "'Lato', sans-serif", fontWeight: 700, fontSize: '0.85rem' }}>Reintentar</button>
                    </motion.div>
                ) : (
                    <motion.form
                        onSubmit={handleSubmit}
                        initial={{ opacity: 0, y: 20 }}
                        animate={inView ? { opacity: 1, y: 0 } : {}}
                        transition={{ duration: 0.7, delay: 0.2 }}
                        style={{
                            display: 'flex',
                            gap: '12px',
                            maxWidth: '520px',
                            margin: '0 auto',
                            flexWrap: 'wrap',
                            justifyContent: 'center'
                        }}
                    >
                        <input
                            type="email"
                            placeholder="Tu email"
                            required
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            disabled={status === 'loading'}
                            style={{
                                flex: '1',
                                minWidth: '240px',
                                padding: '16px 20px',
                                background: '#F9F7F4',
                                border: '1px solid #DED7CB',
                                color: '#2D2420',
                                fontFamily: "'Lato', Helvetica, sans-serif",
                                fontSize: '0.9rem',
                                outline: 'none',
                            }}
                        />
                        <button
                            type="submit"
                            disabled={status === 'loading'}
                            style={{
                                padding: '16px 32px',
                                background: '#A67C37',
                                color: '#FFFFFF',
                                border: 'none',
                                fontFamily: "'Lato', Helvetica, sans-serif",
                                fontSize: '0.82rem',
                                letterSpacing: '0.15em',
                                fontWeight: 700,
                                textTransform: 'uppercase',
                                cursor: status === 'loading' ? 'not-allowed' : 'pointer',
                                transition: 'background 0.25s',
                                minWidth: '160px',
                            }}
                            onMouseEnter={e => !status.startsWith('load') && (e.currentTarget.style.background = '#B8860B')}
                            onMouseLeave={e => !status.startsWith('load') && (e.currentTarget.style.background = '#A67C37')}
                        >
                            {status === 'loading' ? 'Enviando...' : 'SUSCRIBIRME'}
                        </button>
                    </motion.form>
                )}

            </div>
        </section>
    )
}
