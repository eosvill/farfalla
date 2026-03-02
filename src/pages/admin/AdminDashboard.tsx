import { Link } from 'react-router-dom'
import { useEffect, useState } from 'react'
import { supabase } from '../../lib/supabase'

interface CardData {
    label: string
    desc: string
    to: string
    table: string
    imageField: string
    count: number
    previewImg: string | null
    loading: boolean
}

const CARD_DEFS = [
    {
        label: 'Categorías',
        desc: 'Crea y gestiona las categorías del catálogo.',
        to: '/admin/categorias',
        table: 'categorias',
        imageField: 'imagen',
    },
    {
        label: 'Tipos de Piedra',
        desc: 'Registra los tipos de piedras y sus imágenes.',
        to: '/admin/piedras',
        table: 'tipos_piedra',
        imageField: 'imagen_card',
    },
    {
        label: 'Productos',
        desc: 'Carga joyas y asígnalas a categorías y piedras.',
        to: '/admin/productos',
        table: 'products',
        imageField: 'imagen',
    },
]

export default function AdminDashboard() {
    const [cards, setCards] = useState<CardData[]>(
        CARD_DEFS.map(d => ({ ...d, count: 0, previewImg: null, loading: true }))
    )

    useEffect(() => {
        CARD_DEFS.forEach(async (def, i) => {
            const [{ count }, { data: rows }] = await Promise.all([
                supabase.from(def.table).select('*', { count: 'exact', head: true }),
                supabase.from(def.table).select(def.imageField).order('created_at', { ascending: false }).limit(1),
            ])
            setCards(prev => prev.map((c, idx) =>
                idx !== i ? c : {
                    ...c,
                    count: count ?? 0,
                    previewImg: rows?.[0]?.[def.imageField as keyof typeof rows[0]] as string | null ?? null,
                    loading: false,
                }
            ))
        })
    }, [])

    return (
        <div>
            <h1 style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: '2.2rem', color: '#2D2420', margin: '0 0 8px' }}>
                Panel de Administración
            </h1>
            <p style={{ fontFamily: "'Lato', sans-serif", fontSize: '0.95rem', color: '#888', marginBottom: '48px' }}>
                Bienvenida. Seleccioná una sección para comenzar.
            </p>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: '24px' }}>
                {cards.map(card => (
                    <Link key={card.to} to={card.to} style={{ textDecoration: 'none' }}>
                        <div
                            style={{
                                backgroundColor: 'white',
                                border: '1px solid #EAEAEA',
                                borderRadius: '14px',
                                overflow: 'hidden',
                                cursor: 'pointer',
                                transition: 'box-shadow 0.2s, transform 0.2s',
                            }}
                            onMouseEnter={e => {
                                (e.currentTarget as HTMLElement).style.boxShadow = '0 8px 28px rgba(0,0,0,0.1)'
                                    ; (e.currentTarget as HTMLElement).style.transform = 'translateY(-3px)'
                            }}
                            onMouseLeave={e => {
                                (e.currentTarget as HTMLElement).style.boxShadow = 'none'
                                    ; (e.currentTarget as HTMLElement).style.transform = 'translateY(0)'
                            }}
                        >
                            {/* Image preview */}
                            <div style={{
                                width: '100%', height: '160px', background: '#F2EEE9',
                                position: 'relative', overflow: 'hidden',
                            }}>
                                {card.loading ? (
                                    <div style={{ width: '100%', height: '100%', background: 'linear-gradient(90deg, #EEE 25%, #F5F5F5 50%, #EEE 75%)', backgroundSize: '200% 100%', animation: 'shimmer 1.4s infinite' }} />
                                ) : card.previewImg ? (
                                    <img
                                        src={card.previewImg}
                                        alt={card.label}
                                        style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }}
                                    />
                                ) : (
                                    <div style={{ width: '100%', height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                                        <span style={{ fontFamily: "'Lato', sans-serif", fontSize: '0.8rem', color: '#C0B8B0' }}>Sin imagen</span>
                                    </div>
                                )}
                                {/* Count badge */}
                                <div style={{
                                    position: 'absolute', top: '10px', right: '10px',
                                    background: 'rgba(45,33,26,0.82)', backdropFilter: 'blur(4px)',
                                    borderRadius: '20px', padding: '4px 12px',
                                    fontFamily: "'Lato', sans-serif", fontSize: '0.78rem',
                                    fontWeight: 700, color: '#FFFFFF', letterSpacing: '0.04em',
                                }}>
                                    {card.loading ? '…' : `${card.count} item${card.count !== 1 ? 's' : ''}`}
                                </div>
                            </div>

                            {/* Text */}
                            <div style={{ padding: '20px 24px 24px' }}>
                                <h2 style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: '1.5rem', color: '#2D2420', margin: '0 0 6px' }}>
                                    {card.label}
                                </h2>
                                <p style={{ fontFamily: "'Lato', sans-serif", fontSize: '0.85rem', color: '#888', margin: 0, lineHeight: 1.6 }}>
                                    {card.desc}
                                </p>
                            </div>
                        </div>
                    </Link>
                ))}
            </div>

            <style>{`
                @keyframes shimmer {
                    0% { background-position: 200% 0; }
                    100% { background-position: -200% 0; }
                }
            `}</style>
        </div>
    )
}
