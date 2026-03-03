import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'

export default function ZodiacBanner() {
    const ref = useRef(null)
    const inView = useInView(ref, { once: true, margin: '-60px' })

    return (
        <section
            ref={ref}
            style={{
                padding: '90px 40px',
                background: '#2D211A',
                textAlign: 'center',
            }}
        >
            <div style={{ maxWidth: '680px', margin: '0 auto' }}>

                {/* "✦ SERVICIO EXCLUSIVO ✦" */}
                <motion.p
                    initial={{ opacity: 0, y: 16 }}
                    animate={inView ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.6 }}
                    style={{
                        fontFamily: "'Cormorant Garamond', Georgia, serif",
                        fontSize: '0.85rem',
                        letterSpacing: '0.3em',
                        textTransform: 'uppercase',
                        color: '#C9954A',
                        marginBottom: '18px',
                        fontWeight: 400,
                    }}
                >
                    ✦ Servicio Exclusivo ✦
                </motion.p>

                {/* Main title */}
                <motion.h2
                    initial={{ opacity: 0, y: 24 }}
                    animate={inView ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.8, delay: 0.1 }}
                    style={{
                        fontFamily: "'Cormorant Garamond', Georgia, serif",
                        fontSize: 'clamp(1.9rem, 4vw, 2.8rem)',
                        fontStyle: 'italic',
                        fontWeight: 400,
                        color: '#C9954A',
                        lineHeight: 1.25,
                        marginBottom: '16px',
                    }}
                >
                    Tu piedra de poder según tu carta numerológica
                </motion.h2>

                {/* Thin gold line */}
                <motion.div
                    initial={{ opacity: 0, scaleX: 0 }}
                    animate={inView ? { opacity: 1, scaleX: 1 } : {}}
                    transition={{ duration: 0.6, delay: 0.25 }}
                    style={{
                        width: '40px',
                        height: '1px',
                        background: '#C9954A',
                        margin: '0 auto 28px',
                    }}
                />

                {/* Body text */}
                <motion.p
                    initial={{ opacity: 0, y: 16 }}
                    animate={inView ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.7, delay: 0.35 }}
                    style={{
                        fontFamily: "'Lato', Helvetica, sans-serif",
                        fontSize: '0.9rem',
                        color: 'rgba(255,255,255,0.82)',
                        lineHeight: 1.85,
                        marginBottom: '20px',
                    }}
                >
                    Los números asociados a tu nacimiento revelan qué energías te acompañan y cuáles necesitás
                    fortalecer. Te guiamos para descubrir tu piedra personal a partir de tu carta numerológica.
                </motion.p>

                {/* Italic secondary text */}
                <motion.p
                    initial={{ opacity: 0, y: 12 }}
                    animate={inView ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.7, delay: 0.48 }}
                    style={{
                        fontFamily: "'Lato', Helvetica, sans-serif",
                        fontStyle: 'italic',
                        fontSize: '0.85rem',
                        color: 'rgba(255,255,255,0.5)',
                        lineHeight: 1.9,
                        marginBottom: '44px',
                    }}
                >
                    Recibí una recomendación personalizada y una pieza artesanal diseñada especialmente para tu
                    energía — hecha a mano, con intención y a tu medida.
                </motion.p>

                {/* CTA Button */}
                <motion.div
                    initial={{ opacity: 0, y: 16 }}
                    animate={inView ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.6, delay: 0.6 }}
                >
                    <a
                        href="https://wa.me/59899650979?text=Hola!%20quiero%20descubrir%20mi%20piedra."
                        target="_blank"
                        rel="noopener noreferrer"
                        style={{
                            display: 'inline-block',
                            padding: '16px 48px',
                            background: '#C9954A',
                            color: '#FFFFFF',
                            borderRadius: '4px',
                            fontFamily: "'Lato', Helvetica, sans-serif",
                            fontSize: '0.72rem',
                            letterSpacing: '0.22em',
                            textTransform: 'uppercase',
                            fontWeight: 700,
                            transition: 'background 0.25s, transform 0.2s',
                        }}
                        onMouseEnter={e => {
                            (e.currentTarget as HTMLElement).style.background = '#B8860B'
                                ; (e.currentTarget as HTMLElement).style.transform = 'translateY(-2px)'
                        }}
                        onMouseLeave={e => {
                            (e.currentTarget as HTMLElement).style.background = '#C9954A'
                                ; (e.currentTarget as HTMLElement).style.transform = 'translateY(0)'
                        }}
                    >
                        Quiero Descubrir mi Piedra
                    </a>
                </motion.div>

            </div>
        </section>
    )
}
