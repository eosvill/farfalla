import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'

const testimonials = [
    {
        quote: "La pulsera de amatista me acompaña todos los días. Siento que me ayuda a estar más tranquila y presente.",
        author: "Valentina M.",
        location: "Montevideo",
    },
    {
        quote: "Regalé un collar de cuarzo rosa para el cumpleaños de mi hermana. Lloró de emoción cuando le conté el significado.",
        author: "Lucía R.",
        location: "Punta del Este",
    },
    {
        quote: "Lo que más me gusta es que cada pieza es única. Sabés que nadie tiene exactamente la misma que vos.",
        author: "Camila S.",
        location: "Montevideo",
    },
]

export default function Testimonials() {
    const ref = useRef(null)
    const inView = useInView(ref, { once: true, margin: '-60px' })

    return (
        <section
            id="testimonios"
            ref={ref}
            style={{
                padding: '100px 40px',
                background: '#F8F5F2',
                textAlign: 'center',
            }}
        >
            <div style={{ maxWidth: '1100px', margin: '0 auto' }}>

                {/* Header */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={inView ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.7 }}
                    style={{ marginBottom: '60px' }}
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
                        Testimonios
                    </p>

                    <h2 style={{
                        fontFamily: "'Cormorant Garamond', Georgia, serif",
                        fontSize: 'clamp(2rem, 4.5vw, 2.8rem)',
                        fontStyle: 'italic',
                        fontWeight: 400,
                        color: '#2D2420',
                        lineHeight: 1.2,
                        marginBottom: '20px',
                    }}>
                        Lo que dicen quienes las llevan
                    </h2>

                    <div style={{
                        width: '40px',
                        height: '1px',
                        background: '#B8860B',
                        margin: '0 auto'
                    }} />
                </motion.div>

                {/* Testimonials Grid */}
                <div style={{
                    display: 'grid',
                    gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
                    gap: '30px',
                }}>
                    {testimonials.map((t, i) => (
                        <motion.div
                            key={i}
                            initial={{ opacity: 0, y: 30 }}
                            animate={inView ? { opacity: 1, y: 0 } : {}}
                            transition={{ duration: 0.6, delay: i * 0.15 }}
                            style={{
                                border: '1px solid #E5DFD3',
                                padding: '40px 30px',
                                textAlign: 'left',
                                display: 'flex',
                                flexDirection: 'column',
                                justifyContent: 'space-between',
                                minHeight: '280px',
                            }}
                        >
                            <p style={{
                                fontFamily: "'Cormorant Garamond', Georgia, serif",
                                fontSize: '1.2rem',
                                fontStyle: 'italic',
                                color: '#2D2420',
                                lineHeight: 1.6,
                                marginBottom: '40px',
                            }}>
                                "{t.quote}"
                            </p>

                            <div>
                                <p style={{
                                    fontFamily: "'Lato', Helvetica, sans-serif",
                                    fontSize: '0.85rem',
                                    color: '#2D2420',
                                    fontWeight: 700,
                                    marginBottom: '2px',
                                }}>
                                    {t.author}
                                </p>
                                <p style={{
                                    fontFamily: "'Lato', Helvetica, sans-serif",
                                    fontSize: '0.75rem',
                                    color: '#6B5E55',
                                }}>
                                    {t.location}
                                </p>
                            </div>
                        </motion.div>
                    ))}
                </div>

            </div>
        </section>
    )
}
