import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import { Link } from 'react-router-dom'

export default function CTABanner() {
    const ref = useRef(null)
    const inView = useInView(ref, { once: true, margin: '-60px' })

    return (
        <section
            id="tienda"
            ref={ref}
            style={{
                padding: '120px 40px',
                background: '#2A1E16', // Dark earthy brown from reference
                textAlign: 'center',
                position: 'relative'
            }}
        >
            <div style={{ maxWidth: '720px', margin: '0 auto' }}>

                {/* Small label: ✦ FARFALLA BIJOU ✦ */}
                <motion.p
                    initial={{ opacity: 0, y: 10 }}
                    animate={inView ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.6 }}
                    style={{
                        fontFamily: "'Cormorant Garamond', Georgia, serif",
                        fontSize: '0.85rem',
                        letterSpacing: '0.3em',
                        textTransform: 'uppercase',
                        color: '#C9954A',
                        marginBottom: '24px',
                        fontWeight: 400,
                    }}
                >
                    ✦ Farfalla Bijou ✦
                </motion.p>

                {/* Main Title */}
                <motion.h2
                    initial={{ opacity: 0, y: 20 }}
                    animate={inView ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.8, delay: 0.1 }}
                    style={{
                        fontFamily: "'Cormorant Garamond', Georgia, serif",
                        fontSize: 'clamp(2.2rem, 6vw, 3.2rem)',
                        color: '#FFFFFF',
                        fontWeight: 400,
                        lineHeight: 1.1,
                        marginBottom: '32px',
                    }}
                >
                    Elegí la piedra que conecte con tu momento
                </motion.h2>

                {/* Divider with dot */}
                <motion.div
                    initial={{ opacity: 0, scaleX: 0 }}
                    animate={inView ? { opacity: 1, scaleX: 1 } : {}}
                    transition={{ duration: 0.7, delay: 0.3 }}
                    style={{
                        width: '80px',
                        height: '1px',
                        background: '#C9954A',
                        margin: '0 auto 32px',
                        position: 'relative'
                    }}
                >
                    <div style={{
                        position: 'absolute',
                        top: '50%',
                        left: '50%',
                        transform: 'translate(-50%, -50%)',
                        width: '4px',
                        height: '4px',
                        background: '#C9954A',
                        borderRadius: '50%'
                    }} />
                </motion.div>

                {/* Subtitle */}
                <motion.p
                    initial={{ opacity: 0, y: 15 }}
                    animate={inView ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.7, delay: 0.45 }}
                    style={{
                        fontFamily: "'Lato', Helvetica, sans-serif",
                        fontSize: '1.2rem',
                        color: 'rgba(255,255,255,0.8)',
                        lineHeight: 1.7,
                        maxWidth: '580px',
                        margin: '0 auto 48px',
                    }}
                >
                    Cada joya es un objeto con historia, hecho para acompañarte.
                    Visitá nuestra tienda y encontrá la pieza que resuena con vos.
                </motion.p>

                {/* Button */}
                <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={inView ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.6, delay: 0.6 }}
                >
                    <Link
                        to="/tienda"
                        style={{
                            display: 'inline-flex',
                            alignItems: 'center',
                            gap: '12px',
                            padding: '16px 44px',
                            background: '#AF7B3D',
                            color: '#FFFFFF',
                            borderRadius: '2px',
                            fontFamily: "'Lato', Helvetica, sans-serif",
                            fontSize: '0.85rem',
                            letterSpacing: '0.15em',
                            textTransform: 'uppercase',
                            fontWeight: 700,
                            textDecoration: 'none',
                            transition: 'background 0.25s, transform 0.2s',
                        }}
                        onMouseEnter={e => {
                            (e.currentTarget as HTMLElement).style.background = '#C9954A'
                                ; (e.currentTarget as HTMLElement).style.transform = 'translateY(-2px)'
                        }}
                        onMouseLeave={e => {
                            (e.currentTarget as HTMLElement).style.background = '#AF7B3D'
                                ; (e.currentTarget as HTMLElement).style.transform = 'translateY(0)'
                        }}
                    >
                        IR A LA TIENDA <span style={{ fontSize: '1.2rem' }}>→</span>
                    </Link>
                </motion.div>

            </div>
        </section>
    )
}
