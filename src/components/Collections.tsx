import { useRef, useState, useEffect } from 'react'
import { motion, useInView } from 'framer-motion'
import { supabase } from '../lib/supabase'

interface Categoria {
    id: string
    categoria: string
    titulo: string
    subtitulo: string | null
    intro: string | null
    imagen_hero: string | null
    imagen_card: string | null
}

export default function Collections() {
    const ref = useRef(null)
    const inView = useInView(ref, { once: true, margin: '-60px' })
    const [items, setItems] = useState<Categoria[]>([])
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        supabase.from('categorias').select('*').order('created_at').then(({ data }) => {
            if (data) setItems(data)
            setLoading(false)
        })
    }, [])

    return (
        <section
            id="colecciones"
            ref={ref}
            style={{ padding: '80px 40px 100px', background: '#F2EEE9' }}
        >
            <div style={{ maxWidth: '1100px', margin: '0 auto' }}>

                {/* Header */}
                <motion.div
                    initial={{ opacity: 0, y: 24 }}
                    animate={inView ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.7 }}
                    style={{ textAlign: 'center', marginBottom: '60px' }}
                >
                    <p style={{
                        fontFamily: "'Cormorant Garamond', 'Georgia', 'serif'",
                        fontSize: '0.85rem', letterSpacing: '0.28em', textTransform: 'uppercase',
                        color: '#B8860B', marginBottom: '14px', fontWeight: 400,
                    }}>Colecciones</p>

                    <h2 style={{
                        fontFamily: "'Cormorant Garamond', 'Georgia', 'serif'",
                        fontSize: 'clamp(1.9rem, 4vw, 2.8rem)', fontStyle: 'italic', fontWeight: 400,
                        color: '#2D2420', marginBottom: '14px', lineHeight: 1.2,
                    }}>Joyas con intención</h2>

                    <div style={{ width: '40px', height: '1px', background: '#B8860B', margin: '0 auto 20px' }} />

                    <p style={{
                        fontFamily: "'Cormorant Garamond', 'Georgia', 'serif'",
                        fontSize: '0.9rem', color: '#6B5E55', maxWidth: '480px', margin: '0 auto', lineHeight: 1.8,
                    }}>
                        Cada colección está pensada alrededor de una intención. Elegí la que resuene con tu momento.
                    </p>
                </motion.div>

                {/* Loading skeleton */}
                {loading && (
                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '40px' }}>
                        {[1, 2, 3].map(n => (
                            <div key={n} style={{ opacity: 0.4 }}>
                                <div style={{ width: '100%', aspectRatio: '4/3', background: '#E0DBD5', borderRadius: '4px', marginBottom: '20px' }} />
                                <div style={{ height: '10px', width: '40%', background: '#D0CAC4', borderRadius: '4px', marginBottom: '10px' }} />
                                <div style={{ height: '14px', width: '70%', background: '#D0CAC4', borderRadius: '4px', marginBottom: '8px' }} />
                                <div style={{ height: '10px', width: '90%', background: '#D0CAC4', borderRadius: '4px' }} />
                            </div>
                        ))}
                    </div>
                )}

                {/* Empty state */}
                {!loading && items.length === 0 && (
                    <p style={{ textAlign: 'center', color: '#B8A99A', fontFamily: "'Lato', sans-serif", padding: '40px 0' }}>
                        Próximamente nuevas colecciones.
                    </p>
                )}

                {/* Grid */}
                {!loading && items.length > 0 && (
                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '40px' }}>
                        {items.map((item, i) => (
                            <motion.article
                                key={item.id}
                                initial={{ opacity: 0, y: 32 }}
                                animate={inView ? { opacity: 1, y: 0 } : {}}
                                transition={{ duration: 0.65, delay: i * 0.14 }}
                            >
                                <div style={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
                                    {/* Category label */}
                                    <p style={{
                                        fontFamily: "'Cormorant Garamond', 'Georgia', 'serif'",
                                        fontSize: '0.62rem', letterSpacing: '0.22em', textTransform: 'uppercase',
                                        color: '#B8860B', marginBottom: '12px', fontWeight: 400,
                                    }}>{item.categoria.toUpperCase()}</p>

                                    {/* Image — also a link */}
                                    <a href={`/producto/${item.categoria}`} style={{ display: 'block', textDecoration: 'none', marginBottom: '20px' }}>
                                        <div style={{ width: '100%', aspectRatio: '4/3', overflow: 'hidden' }}>
                                            {item.imagen_card ? (
                                                <img
                                                    src={item.imagen_card}
                                                    alt={item.titulo}
                                                    loading="lazy"
                                                    style={{ width: '100%', height: '100%', objectFit: 'cover', transition: 'transform 0.5s ease', display: 'block', cursor: 'pointer' }}
                                                    onMouseEnter={e => ((e.currentTarget as HTMLElement).style.transform = 'scale(1.04)')}
                                                    onMouseLeave={e => ((e.currentTarget as HTMLElement).style.transform = 'scale(1)')}
                                                />
                                            ) : (
                                                <div style={{ width: '100%', height: '100%', background: '#E8E2DB' }} />
                                            )}
                                        </div>
                                    </a>

                                    {/* Title */}
                                    <h3 style={{
                                        fontFamily: "'Lato', 'Helvetica', 'sans-serif'",
                                        fontSize: '1.2rem', fontStyle: 'italic', fontWeight: 400,
                                        color: '#2D2420', marginBottom: '10px', lineHeight: 1.4,
                                    }}>{item.titulo}</h3>

                                    {/* Subtitle / intro preview */}
                                    {(item.subtitulo || item.intro) && (
                                        <p style={{
                                            fontFamily: "'Lato', 'Helvetica', 'sans-serif'",
                                            fontSize: '0.85rem', color: '#7A6E65', lineHeight: 1.8, marginBottom: '20px',
                                        }}>
                                            {item.subtitulo ?? item.intro?.slice(0, 120)}
                                        </p>
                                    )}

                                    {/* CTA link */}
                                    <a
                                        href={`/producto/${item.categoria}`}
                                        style={{
                                            display: 'inline-flex', alignItems: 'center', padding: '12px 28px',
                                            background: '#1A1A1A', color: '#FFFFFF', fontFamily: "'Lato', sans-serif",
                                            fontSize: '0.85rem', fontWeight: 700, textDecoration: 'none',
                                            borderRadius: '6px', transition: 'background 0.2s', marginTop: 'auto',
                                            alignSelf: 'flex-start'
                                        }}
                                        onMouseEnter={e => (e.currentTarget.style.background = '#333')}
                                        onMouseLeave={e => (e.currentTarget.style.background = '#1A1A1A')}
                                    >
                                        Ver detalle
                                    </a>
                                </div>
                            </motion.article>
                        ))}
                    </div>
                )}
            </div>
        </section>
    )
}
