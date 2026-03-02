import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { supabase } from '../lib/supabase'
import { Search } from 'lucide-react'
import { formatPrice } from '../lib/formatPrice'

interface Producto {
    id: string
    nombre: string
    descripcion: string | null
    precio: string | null
    imagen: string | null
}

const WA_NUMBER = '59899650979'
const waLink = (nombre: string) =>
    `https://wa.me/${WA_NUMBER}?text=${encodeURIComponent('Hola! quiero esta bijou: ' + nombre)}`

export default function Tienda() {
    const [productos, setProductos] = useState<Producto[]>([])
    const [filtered, setFiltered] = useState<Producto[]>([])
    const [query, setQuery] = useState('')
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        supabase.from('products').select('*').order('created_at', { ascending: false }).then(({ data }) => {
            if (data) { setProductos(data); setFiltered(data) }
            setLoading(false)
        })
    }, [])

    useEffect(() => {
        const q = query.trim().toLowerCase()
        setFiltered(q ? productos.filter(p => p.nombre.toLowerCase().includes(q) || (p.descripcion ?? '').toLowerCase().includes(q)) : productos)
    }, [query, productos])

    return (
        <div style={{ background: '#FDFBF9', minHeight: '100vh', paddingBottom: '80px' }}>

            {/* ── Hero ── */}
            <section style={{
                position: 'relative',
                height: '55vh',
                minHeight: '360px',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                textAlign: 'center',
                background: 'linear-gradient(135deg, #2D211A 0%, #4A3020 100%)',
                marginBottom: '0',
            }}>
                {/* decorative overlay */}
                <div style={{
                    position: 'absolute', inset: 0,
                    backgroundImage: 'radial-gradient(ellipse at 60% 40%, rgba(201,149,74,0.18) 0%, transparent 65%)',
                    pointerEvents: 'none',
                }} />

                <p style={{
                    position: 'relative', zIndex: 1,
                    fontFamily: "'Cormorant Garamond', serif", fontSize: '0.75rem',
                    letterSpacing: '0.32em', textTransform: 'uppercase',
                    color: '#C9954A', marginBottom: '14px',
                }}>
                    ✦ Farfalla Bijou ✦
                </p>
                <h1 style={{
                    position: 'relative', zIndex: 1,
                    fontFamily: "'Cormorant Garamond', serif",
                    fontSize: 'clamp(2rem, 5vw, 3.6rem)',
                    fontStyle: 'italic', fontWeight: 400,
                    color: '#FFFFFF', lineHeight: 1.2,
                    maxWidth: '720px', margin: '0 24px 20px',
                }}>
                    Nuestra Colección
                </h1>
                <div style={{ position: 'relative', zIndex: 1, width: '40px', height: '1px', background: '#C9954A', margin: '0 auto 24px' }} />
                <p style={{
                    position: 'relative', zIndex: 1,
                    fontFamily: "'Lato', sans-serif", fontSize: '0.9rem',
                    color: 'rgba(255,255,255,0.75)', maxWidth: '480px', margin: '0 24px',
                    lineHeight: 1.8,
                }}>
                    Joyas artesanales con piedras naturales, hechas con intención y a tu medida.
                </p>

                {/* ── Search bar ── */}
                <div style={{
                    position: 'relative', zIndex: 1,
                    display: 'flex', alignItems: 'center',
                    background: 'rgba(255,255,255,0.1)', backdropFilter: 'blur(8px)',
                    border: '1px solid rgba(255,255,255,0.2)',
                    borderRadius: '40px', padding: '0 20px',
                    marginTop: '32px', width: 'min(460px, calc(100% - 48px))',
                }}>
                    <Search size={16} color="rgba(255,255,255,0.6)" strokeWidth={1.5} style={{ flexShrink: 0 }} />
                    <input
                        type="text"
                        placeholder="Buscar bijou…"
                        value={query}
                        onChange={e => setQuery(e.target.value)}
                        style={{
                            flex: 1, background: 'none', border: 'none', outline: 'none',
                            padding: '14px 12px', color: '#FFF',
                            fontFamily: "'Lato', sans-serif", fontSize: '0.88rem',
                        }}
                    />
                    {query && (
                        <button onClick={() => setQuery('')} style={{ background: 'none', border: 'none', cursor: 'pointer', color: 'rgba(255,255,255,0.5)', fontSize: '1rem', lineHeight: 1, padding: '4px' }}>✕</button>
                    )}
                </div>
            </section>

            {/* Back link */}
            <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '24px 24px 0', position: 'relative', zIndex: 10 }}>
                <Link to="/" style={{ fontFamily: "'Lato', sans-serif", fontSize: '0.82rem', color: '#9A8E85', textDecoration: 'none', letterSpacing: '0.05em' }}>
                    ← Volver al inicio
                </Link>
            </div>

            {/* ── Grid ── */}
            <section style={{ maxWidth: '1200px', margin: '0 auto', padding: '32px 24px 0' }}>

                {loading && (
                    <div className="tienda-grid">
                        {[1, 2, 3, 4, 5, 6].map(n => (
                            <div key={n} style={{ borderRadius: '12px', overflow: 'hidden', background: '#EDE8E2' }}>
                                <div style={{ aspectRatio: '3/4', background: '#E0D9D0' }} />
                                <div style={{ padding: '16px' }}>
                                    <div style={{ height: '14px', background: '#DDD', borderRadius: 4, marginBottom: 8, width: '70%' }} />
                                    <div style={{ height: '12px', background: '#DDD', borderRadius: 4, width: '40%' }} />
                                </div>
                            </div>
                        ))}
                    </div>
                )}

                {!loading && filtered.length === 0 && (
                    <p style={{ textAlign: 'center', color: '#B8A99A', fontFamily: "'Lato', sans-serif", padding: '60px 0' }}>
                        {query ? `Sin resultados para "${query}"` : 'Sin productos disponibles aún.'}
                    </p>
                )}

                {!loading && filtered.length > 0 && (
                    <div className="tienda-grid">
                        {filtered.map(product => (
                            <a
                                key={product.id}
                                href={waLink(product.nombre)}
                                target="_blank"
                                rel="noopener noreferrer"
                                style={{ textDecoration: 'none', color: 'inherit' }}
                            >
                                <div className="tienda-card">
                                    <div style={{ position: 'relative', aspectRatio: '3/4', overflow: 'hidden', background: '#EDE8E2' }}>
                                        {product.imagen ? (
                                            <img
                                                src={product.imagen}
                                                alt={product.nombre}
                                                loading="lazy"
                                                style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block', transition: 'transform 0.5s ease' }}
                                                className="tienda-img"
                                            />
                                        ) : (
                                            <div style={{ width: '100%', height: '100%', background: 'linear-gradient(135deg, #C9954A22, #8B601022)' }} />
                                        )}
                                        <div className="tienda-overlay">
                                            <span style={{ fontFamily: "'Lato', sans-serif", fontSize: '0.75rem', letterSpacing: '0.15em', fontWeight: 700, textTransform: 'uppercase', color: '#FFF' }}>
                                                Consultar
                                            </span>
                                        </div>
                                    </div>
                                    <div style={{ padding: '14px 4px 8px' }}>
                                        <p style={{ fontFamily: "'Cormorant Garamond', serif", fontStyle: 'italic', fontSize: '1.05rem', color: '#2D2420', margin: '0 0 4px', lineHeight: 1.3 }}>
                                            {product.nombre}
                                        </p>
                                        {product.precio && (
                                            <p style={{ fontFamily: "'Lato', sans-serif", fontSize: '0.95rem', fontWeight: 700, color: '#C9954A', margin: 0, letterSpacing: '0.03em' }}>
                                                {formatPrice(product.precio)}
                                            </p>
                                        )}
                                    </div>
                                </div>
                            </a>
                        ))}
                    </div>
                )}
            </section>

            <style>{`
                .tienda-grid {
                    display: grid;
                    grid-template-columns: repeat(3, 1fr);
                    gap: 24px;
                }
                .tienda-card {
                    border-radius: 12px;
                    overflow: hidden;
                    background: #FFF;
                    box-shadow: 0 2px 12px rgba(0,0,0,0.06);
                    transition: box-shadow 0.3s ease, transform 0.3s ease;
                    cursor: pointer;
                }
                .tienda-card:hover {
                    box-shadow: 0 8px 28px rgba(0,0,0,0.12);
                    transform: translateY(-4px);
                }
                .tienda-card:hover .tienda-img {
                    transform: scale(1.05);
                }
                .tienda-overlay {
                    position: absolute; inset: 0;
                    background: rgba(45,33,26,0.55);
                    display: flex; align-items: center; justify-content: center;
                    opacity: 0;
                    transition: opacity 0.3s ease;
                }
                .tienda-card:hover .tienda-overlay { opacity: 1; }

                @media (max-width: 700px) {
                    .tienda-grid { grid-template-columns: repeat(2, 1fr); gap: 14px; }
                }
            `}</style>
        </div>
    )
}
