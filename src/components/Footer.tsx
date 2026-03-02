import { Instagram } from 'lucide-react'
import { motion } from 'framer-motion'

export default function Footer() {
    return (
        <footer style={{
            padding: '60px 40px 40px',
            background: '#F0ECE6', // Updated by user recently
            color: '#2D2420',
            fontFamily: "'Lato', sans-serif",
        }}>
            <div style={{ maxWidth: '1100px', margin: '0 auto' }}>

                {/* Top Divider */}
                <div style={{
                    width: '100%',
                    height: '1px',
                    background: '#DED7CB',
                    marginBottom: '40px'
                }} />

                {/* Center Content: Logo & Instagram */}
                <div style={{
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    gap: '24px',
                    marginBottom: '40px'
                }}>

                    {/* Brand Logo */}
                    <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6 }}
                    >
                        <img
                            src="/logo.png"
                            alt="Farfalla Bijou Logo"
                            style={{
                                height: '110px',
                                width: 'auto',
                                display: 'block'
                            }}
                        />
                    </motion.div>

                    {/* Instagram Link */}
                    <motion.a
                        href="https://instagram.com/farfalla.bijou"
                        target="_blank"
                        rel="noopener noreferrer"
                        initial={{ opacity: 0 }}
                        whileInView={{ opacity: 1 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6, delay: 0.2 }}
                        style={{
                            display: 'flex',
                            alignItems: 'center',
                            gap: '8px',
                            textDecoration: 'none',
                            color: '#2D2420',
                            opacity: 0.7,
                            transition: 'opacity 0.2s'
                        }}
                        onMouseEnter={e => e.currentTarget.style.opacity = '1'}
                        onMouseLeave={e => e.currentTarget.style.opacity = '0.7'}
                    >
                        <Instagram size={18} strokeWidth={1.5} />
                        <span style={{ fontSize: '0.85rem', letterSpacing: '0.05em' }}>@farfalla.bijou</span>
                    </motion.a>
                </div>

                {/* Bottom Divider */}
                <div style={{
                    width: '100%',
                    height: '1px',
                    background: '#DED7CB',
                    marginBottom: '32px'
                }} />

                {/* Copyright */}
                <div style={{
                    textAlign: 'center',
                    fontSize: '0.75rem',
                    color: '#8A7D75',
                    fontFamily: "'Lato', sans-serif"
                }}>
                    © 2026 Farfalla Bijou. Todos los derechos reservados.
                </div>

            </div>
        </footer>
    )
}
