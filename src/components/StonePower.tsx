import { useRef, useState, useEffect } from 'react'
import { motion, useInView } from 'framer-motion'
import { Link } from 'react-router-dom'
import { supabase } from '../lib/supabase'

interface TipoPiedra {
    id: string
    nombre: string
    descripcion_corta: string | null
    imagen_hero: string | null
    imagen_card: string | null
}

export default function StonePower() {
    const ref = useRef(null)
    const inView = useInView(ref, { once: true, margin: '-60px' })
    const [stones, setStones] = useState<TipoPiedra[]>([])
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        supabase.from('tipos_piedra').select('*').order('created_at').then(({ data }) => {
            if (data) setStones(data)
            setLoading(false)
        })
    }, [])

    return (
        <section
            id="piedras"
            ref={ref}
            style={{ padding: '80px 40px 60px', background: '#F8F5F2' }}
        >
            <div style={{ maxWidth: '1100px', margin: '0 auto', display: 'flex', flexDirection: 'column' }}>

                {/* Header */}
                <motion.div
                    className="stone-header"
                    initial={{ opacity: 0, y: 24 }}
                    animate={inView ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.7 }}
                    style={{ textAlign: 'center', marginBottom: '52px' }}
                >
                    <p style={{ fontFamily: "'Cormorant Garamond', Georgia, serif", fontSize: '0.85rem', letterSpacing: '0.28em', textTransform: 'uppercase', color: '#C9954A', marginBottom: '12px', fontWeight: 400 }}>
                        Guía de Piedras
                    </p>
                    <h2 style={{ fontFamily: "'Cormorant Garamond', Georgia, serif", fontSize: 'clamp(1.8rem, 4vw, 2.7rem)', fontStyle: 'italic', fontWeight: 400, color: '#2D2420', marginBottom: '14px', lineHeight: 1.2 }}>
                        El poder de las piedras
                    </h2>
                    <div style={{ width: '40px', height: '1px', background: '#C9954A', margin: '0 auto 20px' }} />
                    <p style={{ fontFamily: "'Lato', Helvetica, sans-serif", fontSize: '0.88rem', color: '#7A6E65', maxWidth: '480px', margin: '0 auto', lineHeight: 1.85 }}>
                        Las piedras naturales han acompañado a culturas ancestrales durante milenios. Cada una tiene un significado simbólico y energético único.
                    </p>
                </motion.div>

                {/* Loading skeleton */}
                {loading && (
                    <div className="stone-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gridTemplateRows: 'repeat(2, 200px)', gap: '6px' }}>
                        {[1, 2, 3, 4, 5, 6].map(n => (
                            <div key={n} style={{ background: '#E0DBD5', opacity: 0.5 }} />
                        ))}
                    </div>
                )}

                {/* Empty state */}
                {!loading && stones.length === 0 && (
                    <p style={{ textAlign: 'center', color: '#B8A99A', fontFamily: "'Lato', sans-serif", padding: '40px 0' }}>
                        Próximamente nuestra guía de piedras.
                    </p>
                )}

                {/* Photo grid */}
                {!loading && stones.length > 0 && (
                    <div className="stone-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gridTemplateRows: `repeat(${Math.ceil(stones.length / 3)}, 200px)`, gap: '6px' }}>
                        {stones.map((stone, i) => (
                            <Link to={`/piedra/${stone.id}`} key={stone.id} style={{ textDecoration: 'none', display: 'block', height: '100%' }}>
                                <motion.div
                                    initial={{ opacity: 0, scale: 0.97 }}
                                    animate={inView ? { opacity: 1, scale: 1 } : {}}
                                    transition={{ duration: 0.55, delay: i * 0.08 }}
                                    style={{ position: 'relative', height: '100%', overflow: 'hidden', cursor: 'pointer' }}
                                >
                                    {stone.imagen_card ? (
                                        <img
                                            src={stone.imagen_card}
                                            alt={stone.nombre}
                                            loading="lazy"
                                            style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover', transition: 'transform 0.5s ease' }}
                                            onMouseEnter={e => ((e.currentTarget as HTMLElement).style.transform = 'scale(1.06)')}
                                            onMouseLeave={e => ((e.currentTarget as HTMLElement).style.transform = 'scale(1)')}
                                        />
                                    ) : (
                                        <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(135deg, #C9954A, #8B6010)' }} />
                                    )}

                                    <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to top, rgba(0,0,0,0.72) 0%, rgba(0,0,0,0.25) 55%, rgba(0,0,0,0.1) 100%)', transition: 'background 0.3s ease' }}
                                        onMouseEnter={e => ((e.currentTarget as HTMLElement).style.background = 'linear-gradient(to top, rgba(0,0,0,0.85) 0%, rgba(0,0,0,0.35) 55%, rgba(0,0,0,0.15) 100%)')}
                                        onMouseLeave={e => ((e.currentTarget as HTMLElement).style.background = 'linear-gradient(to top, rgba(0,0,0,0.72) 0%, rgba(0,0,0,0.25) 55%, rgba(0,0,0,0.1) 100%)')}
                                    />

                                    <div style={{ position: 'absolute', bottom: '18px', left: '18px', pointerEvents: 'none' }}>
                                        <p style={{ fontFamily: "'Cormorant Garamond', Georgia, serif", fontSize: '1rem', fontStyle: 'italic', fontWeight: 500, color: '#FFFFFF', margin: '0 0 2px', lineHeight: 1.2, textShadow: '0 1px 6px rgba(0,0,0,0.5)' }}>
                                            {stone.nombre}
                                        </p>
                                        {stone.descripcion_corta && (
                                            <p style={{ fontFamily: "'Lato', Helvetica, sans-serif", fontSize: '0.7rem', color: 'rgba(255,255,255,0.75)', margin: 0, fontStyle: 'italic', textShadow: '0 1px 4px rgba(0,0,0,0.5)' }}>
                                                {stone.descripcion_corta.slice(0, 60)}
                                            </p>
                                        )}
                                    </div>
                                </motion.div>
                            </Link>
                        ))}
                    </div>
                )}

                <motion.p
                    className="stone-disclaimer"
                    initial={{ opacity: 0 }}
                    animate={inView ? { opacity: 1 } : {}}
                    transition={{ duration: 0.7, delay: 0.6 }}
                    style={{ fontFamily: "'Cormorant Garamond', Georgia, serif", fontStyle: 'italic', fontSize: '0.72rem', color: '#9A8E85', textAlign: 'center', maxWidth: '500px', margin: '24px auto 0', lineHeight: 1.7 }}
                >
                    * Esta información responde a una mirada simbólica, energética y cultural sobre las piedras. No reemplaza ningún tratamiento médico o psicológico.
                </motion.p>
            </div>

            <style>{`
        @media (max-width: 700px) {
          .stone-header     { order: 0; }
          .stone-grid       { order: 1; grid-template-columns: 1fr !important; grid-template-rows: unset !important; grid-auto-rows: 220px !important; }
          .stone-disclaimer { order: 2; margin-top: 24px; }
        }
      `}</style>
        </section>
    )
}
