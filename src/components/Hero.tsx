import { motion } from 'framer-motion'

export default function Hero() {
    return (
        <section
            id="inicio"
            style={{
                position: 'relative',
                width: '100%',
                height: '100vh',
                minHeight: '560px',
                overflow: 'hidden',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
            }}
        >
            {/* Background image */}
            <img
                src="/hero-bg.png"
                alt="Pulseras artesanales con piedras naturales de Farfalla Bijou"
                style={{
                    position: 'absolute',
                    inset: 0,
                    width: '100%',
                    height: '100%',
                    objectFit: 'cover',
                    objectPosition: 'center',
                }}
            />

            {/* Dark vignette overlay — slightly darker in center-left where text lives */}
            <div style={{
                position: 'absolute',
                inset: 0,
                background: 'linear-gradient(to right, rgba(20,12,5,0.45) 0%, rgba(20,12,5,0.25) 50%, rgba(20,12,5,0.1) 100%)',
            }} />

            {/* Content — centered as in reference */}
            <div style={{
                position: 'relative',
                zIndex: 2,
                textAlign: 'center',
                padding: '0 8px',
                maxWidth: '680px',
                width: '100%',
            }}>
                {/* Brand Logo */}
                <motion.div
                    initial={{ opacity: 0, y: 16 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.7, delay: 0.2 }}
                    style={{
                        marginBottom: '20px',
                        display: 'flex',
                        justifyContent: 'center'
                    }}
                >
                    <img
                        src="/logo2.png"
                        alt="Farfalla Bijou Logo"
                        style={{
                            height: '140px',
                            width: 'auto',
                            objectFit: 'contain'
                        }}
                    />
                </motion.div>

                {/* Main heading */}
                <motion.h1
                    initial={{ opacity: 0, y: 24 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.9, delay: 0.35 }}
                    style={{
                        fontFamily: "'Cormorant Garamond', 'Georgia', 'serif'",
                        fontSize: 'clamp(2.2rem, 6vw, 3.2rem)',
                        lineHeight: 1.15,
                        color: '#FFFFFF',
                        fontWeight: 400,
                        marginBottom: '0',
                        textShadow: '0 2px 16px rgba(0,0,0,0.35)',
                    }}
                >
                    Cada piedra tiene una historia.{' '}<br></br>
                    <em style={{ fontStyle: 'italic' }}>Cada pieza, una intención.</em>
                </motion.h1>

                {/* Subtext */}
                <motion.p
                    initial={{ opacity: 0, y: 16 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 0.6 }}
                    style={{
                        fontFamily: "'Lato', 'Helvetica', 'sans-serif'",
                        fontSize: 'clamp(1rem, 1.5vw, 1.2rem)',
                        color: 'rgba(255,255,255,0.82)',
                        lineHeight: 1.8,
                        marginTop: '20px',
                        marginBottom: '36px',
                        maxWidth: '680px',
                        marginLeft: 'auto',
                        marginRight: 'auto',
                        textShadow: '0 1px 6px rgba(0,0,0,0.4)',
                    }}
                >
                    Bijou artesanal hecha a mano en Uruguay, inspiradas en el significado
                    ancestral de las piedras y los colores.
                </motion.p>

                {/* CTA Button */}
                <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.6, delay: 0.85 }}
                >
                    <a
                        href="#colecciones"
                        style={{
                            display: 'inline-block',
                            padding: '14px 40px',
                            background: '#C9954A',
                            color: '#FFFFFF',
                            borderRadius: '4px',
                            fontFamily: "'Lato', sans-serif",
                            fontSize: '0.78rem',
                            letterSpacing: '0.2em',
                            textTransform: 'uppercase',
                            fontWeight: 700,
                            transition: 'background 0.25s, transform 0.2s',
                            boxShadow: '0 4px 20px rgba(0,0,0,0.25)',
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
                        VER COLECCIONES
                    </a>
                </motion.div>
            </div>
        </section>
    )
}
