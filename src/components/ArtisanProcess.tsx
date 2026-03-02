import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'

export default function ArtisanProcess() {
    const ref = useRef(null)
    const inView = useInView(ref, { once: true, margin: '-60px' })

    return (
        <section
            id="proceso"
            ref={ref}
            style={{
                padding: '100px 40px',
                background: '#F2EEE9',
                overflow: 'hidden',
            }}
        >
            <div style={{
                maxWidth: '1100px',
                margin: '0 auto',
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
                gap: '60px',
                alignItems: 'center'
            }}>

                {/* Left Column: Text Content */}
                <motion.div
                    initial={{ opacity: 0, x: -30 }}
                    animate={inView ? { opacity: 1, x: 0 } : {}}
                    transition={{ duration: 0.8, ease: 'easeOut' }}
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
                        Proceso Artesanal
                    </p>

                    <h2 style={{
                        fontFamily: "'Cormorant Garamond', Georgia, serif",
                        fontSize: 'clamp(2.2rem, 5vw, 3.2rem)',
                        fontStyle: 'italic',
                        fontWeight: 400,
                        color: '#2D2420',
                        lineHeight: 1.15,
                        marginBottom: '16px',
                    }}>
                        Hecho a mano, con intención
                    </h2>

                    <div style={{
                        width: '40px',
                        height: '1px',
                        background: '#B8860B',
                        marginBottom: '32px'
                    }} />

                    <div style={{
                        fontFamily: "'Lato', Helvetica, sans-serif",
                        fontSize: '0.92rem',
                        color: '#6B5E55',
                        lineHeight: 1.8,
                        display: 'flex',
                        flexDirection: 'column',
                        gap: '24px',
                    }}>
                        <p>
                            Cada pieza se arma una a una, con intención y respeto por los
                            materiales. Las piedras se eligen por su energía, su color y su forma. No
                            hay dos pulseras iguales.
                        </p>
                        <p>
                            El proceso comienza con la selección cuidadosa de cada piedra, sigue
                            con el diseño de la combinación perfecta y termina con el armado a
                            mano de cada pieza.
                        </p>
                        <p>
                            Es un ritual en sí mismo: cada joya se crea en calma, con música y
                            buena energía.
                        </p>
                    </div>
                </motion.div>

                {/* Right Column: Artisan Imagery */}
                <motion.div
                    initial={{ opacity: 0, x: 30 }}
                    animate={inView ? { opacity: 1, x: 0 } : {}}
                    transition={{ duration: 0.8, delay: 0.2, ease: 'easeOut' }}
                    style={{
                        position: 'relative',
                        width: '100%',
                        aspectRatio: '4/3',
                        boxShadow: '0 20px 40px rgba(0,0,0,0.1)',
                    }}
                >
                    <img
                        src="/artisan-process.png"
                        alt="Proceso artesanal de Farfalla Bijou"
                        style={{
                            width: '100%',
                            height: '100%',
                            objectFit: 'cover',
                            display: 'block',
                        }}
                    />
                </motion.div>

            </div>
        </section>
    )
}
