import { useState, useEffect } from 'react'
import { Menu, X, Home } from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'
import { Link } from 'react-router-dom'

const navLinks = [
    { label: 'TIENDA', href: '/tienda' },
    { label: 'PIEDRAS', href: '/#piedras' },
    { label: 'PROCESO', href: '/#proceso' },
]

export default function Navigation() {
    const [scrolled, setScrolled] = useState(false)
    const [menuOpen, setMenuOpen] = useState(false)

    useEffect(() => {
        const onScroll = () => setScrolled(window.scrollY > 60)
        window.addEventListener('scroll', onScroll)
        return () => window.removeEventListener('scroll', onScroll)
    }, [])

    return (
        <nav
            style={{
                position: 'fixed',
                top: 0,
                left: 0,
                right: 0,
                zIndex: 50,
                transition: 'all 0.4s ease',
                background: scrolled ? 'rgba(30,20,12,0.85)' : 'transparent',
                backdropFilter: scrolled ? 'blur(10px)' : 'none',
            }}
        >
            <div style={{
                maxWidth: '1280px',
                margin: '0 auto',
                padding: '0 40px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                height: '68px',
            }}>
                <Link to="/" className={`nav-logo${scrolled ? ' scrolled' : ''}`} style={{ display: 'flex', alignItems: 'center' }}>
                    <img
                        src="/logo2.png"
                        alt="Farfalla Bijou Logo"
                        style={{
                            height: '50px',
                            width: 'auto',
                        }}
                    />
                </Link>

                {/* Desktop links */}
                <ul style={{
                    display: 'flex',
                    gap: '36px',
                    listStyle: 'none',
                    margin: 0,
                    padding: 0,
                    alignItems: 'center',
                }} className="desktop-nav">
                    {navLinks.map(link => (
                        <li key={link.label}>
                            <a
                                href={link.href}
                                target={link.href.startsWith('http') ? '_blank' : undefined}
                                rel={link.href.startsWith('http') ? 'noopener noreferrer' : undefined}
                                style={{
                                    fontFamily: "'Lato', sans-serif",
                                    fontSize: '0.72rem',
                                    letterSpacing: '0.14em',
                                    color: 'rgba(255,255,255,0.92)',
                                    fontWeight: 400,
                                    transition: 'color 0.2s',
                                }}
                                onMouseEnter={e => (e.currentTarget.style.color = '#D4A843')}
                                onMouseLeave={e => (e.currentTarget.style.color = 'rgba(255,255,255,0.92)')}
                            >
                                {link.label}
                            </a>
                        </li>
                    ))}
                    <li>
                        <Link
                            to="/"
                            style={{ color: 'rgba(255,255,255,0.92)', display: 'flex', alignItems: 'center', transition: 'color 0.2s' }}
                            onMouseEnter={e => (e.currentTarget.style.color = '#D4A843')}
                            onMouseLeave={e => (e.currentTarget.style.color = 'rgba(255,255,255,0.92)')}
                            aria-label="Inicio"
                        >
                            <Home size={18} strokeWidth={1.5} />
                        </Link>
                    </li>
                </ul>

                {/* Hamburger */}
                <button
                    onClick={() => setMenuOpen(!menuOpen)}
                    className="mobile-nav"
                    style={{ background: 'none', border: 'none', cursor: 'pointer', color: 'white', padding: '8px' }}
                    aria-label="Menú"
                >
                    {menuOpen ? <X size={24} /> : <Menu size={24} />}
                </button>
            </div>

            {/* Mobile menu */}
            <AnimatePresence>
                {menuOpen && (
                    <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        exit={{ opacity: 0, height: 0 }}
                        style={{ background: 'rgba(30,20,12,0.97)', backdropFilter: 'blur(8px)', overflow: 'hidden' }}
                    >
                        <ul style={{ listStyle: 'none', padding: '16px 32px 28px', margin: 0, display: 'flex', flexDirection: 'column', gap: '22px' }}>
                            {navLinks.map(link => (
                                <li key={link.label}>
                                    <a
                                        href={link.href}
                                        onClick={() => setMenuOpen(false)}
                                        style={{ fontFamily: "'Lato', sans-serif", fontSize: '0.8rem', letterSpacing: '0.15em', color: 'rgba(255,255,255,0.85)' }}
                                    >
                                        {link.label}
                                    </a>
                                </li>
                            ))}
                            <li>
                                <Link
                                    to="/"
                                    onClick={() => setMenuOpen(false)}
                                    style={{ fontFamily: "'Lato', sans-serif", fontSize: '0.8rem', letterSpacing: '0.15em', color: 'rgba(255,255,255,0.85)', display: 'flex', alignItems: 'center', gap: '8px' }}
                                >
                                    <Home size={16} strokeWidth={1.5} /> INICIO
                                </Link>
                            </li>
                        </ul>
                    </motion.div>
                )}
            </AnimatePresence>

            <style>{`
        @media (min-width: 768px) { .mobile-nav { display: none !important; } }
        @media (max-width: 767px) { .desktop-nav { display: none !important; } }
        @media (max-width: 767px) {
          .nav-logo { opacity: 1; transition: opacity 0.4s ease; }
          .nav-logo:not(.scrolled) { opacity: 0; pointer-events: none; }
        }
      `}</style>
        </nav>
    )
}
