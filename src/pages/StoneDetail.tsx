import { useParams, Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { useState, useEffect } from 'react'
import { supabase } from '../lib/supabase'
import { formatPrice } from '../lib/formatPrice'

interface TipoPiedra {
    id: string
    nombre: string
    descripcion_corta: string | null
    imagen_hero: string | null
    imagen_card: string | null
}

interface Producto {
    id: string
    nombre: string
    descripcion: string | null
    precio: string | null
    imagen: string | null
}

export default function StoneDetail() {
    const { id } = useParams<{ id: string }>()
    const [stone, setStone] = useState<TipoPiedra | null>(null)
    const [productos, setProductos] = useState<Producto[]>([])
    const [loading, setLoading] = useState(true)
    const [notFound, setNotFound] = useState(false)

    useEffect(() => {
        if (!id) return
        const fetchData = async () => {
            setLoading(true)

            // 1. Fetch stone type by ID
            const { data: stoneData, error } = await supabase
                .from('tipos_piedra')
                .select('*')
                .eq('id', id)
                .single()

            if (error || !stoneData) { setNotFound(true); setLoading(false); return }
            setStone(stoneData)

            // 2. Fetch products via pivot table
            const { data: pivotData } = await supabase
                .from('product_tipos_piedra')
                .select('product_id')
                .eq('tipo_piedra_id', id)

            if (pivotData && pivotData.length > 0) {
                const ids = pivotData.map((p: any) => p.product_id)
                const { data: prodData } = await supabase.from('products').select('*').in('id', ids)
                if (prodData) setProductos(prodData)
            }

            setLoading(false)
        }
        fetchData()
    }, [id])

    if (loading) {
        return (
            <div style={{ padding: '200px 40px', textAlign: 'center', background: '#F9F7F4', minHeight: '100vh' }}>
                <p style={{ fontFamily: "'Lato', sans-serif", color: '#AAA' }}>Cargando…</p>
            </div>
        )
    }

    if (notFound || !stone) {
        return (
            <div style={{ padding: '160px 40px', textAlign: 'center', background: '#F9F7F4', minHeight: '60vh' }}>
                <h2 style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: '2rem', color: '#2D2420' }}>Piedra no encontrada</h2>
                <Link to="/#piedras" style={{ color: '#C9954A', textDecoration: 'underline', marginTop: '20px', display: 'inline-block', fontFamily: "'Lato', sans-serif" }}>Volver al inicio</Link>
            </div>
        )
    }

    return (
        <div style={{ background: '#FDFBF9', minHeight: '100vh', paddingBottom: '100px', paddingTop: '120px' }}>

            {/* Hero Section — image only */}
            <section style={{
                position: 'relative',
                height: '60vh',
                minHeight: '400px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                marginBottom: '40px',
                marginTop: '-120px',
            }}>
                <div style={{
                    position: 'absolute',
                    top: 0, left: 0, right: 0, bottom: 0,
                    backgroundImage: stone.imagen_hero
                        ? `url(${stone.imagen_hero})`
                        : 'linear-gradient(135deg, #C9954A 0%, #8B6010 100%)',
                    backgroundSize: 'cover',
                    backgroundPosition: 'center',
                    backgroundColor: '#C9954A',
                    zIndex: 0,
                }} />
                <div style={{ position: 'absolute', top: 0, left: 0, right: 0, bottom: 0, backgroundColor: 'rgba(45, 36, 32, 0.5)', zIndex: 1 }} />

                {/* Text over hero */}
                <div style={{ position: 'relative', zIndex: 2, textAlign: 'center', padding: '0 24px', maxWidth: '800px', color: '#FFF' }}>
                    <motion.p
                        initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}
                        style={{ fontFamily: "'Lato', sans-serif", fontSize: '0.75rem', letterSpacing: '0.25em', textTransform: 'uppercase', marginBottom: '16px', color: 'rgba(255,255,255,0.8)' }}
                    >
                        El Poder de las Piedras
                    </motion.p>
                    <motion.h1
                        initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7, delay: 0.1 }}
                        style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: 'clamp(1.8rem, 4vw, 3rem)', fontStyle: 'italic', fontWeight: 400, lineHeight: 1.2, marginBottom: '20px' }}
                    >
                        {stone.nombre}
                    </motion.h1>
                    {stone.descripcion_corta && (
                        <motion.p
                            initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7, delay: 0.2 }}
                            style={{ fontFamily: "'Lato', sans-serif", fontSize: '1rem', color: 'rgba(255,255,255,0.9)', lineHeight: 1.8, maxWidth: '600px', margin: '0 auto' }}
                        >
                            {stone.descripcion_corta}
                        </motion.p>
                    )}
                </div>
            </section>

            {/* Back link */}
            <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '24px 24px 0', position: 'relative', zIndex: 10 }}>
                <Link to="/#piedras" style={{ fontFamily: "'Lato', sans-serif", fontSize: '0.82rem', color: '#9A8E85', textDecoration: 'none', letterSpacing: '0.05em' }}>
                    ← Volver al inicio
                </Link>
            </div>

            {/* Products */}
            <section style={{ maxWidth: '1200px', margin: '0 auto', padding: '40px 24px 0' }}>
                {productos.length === 0 ? (
                    <p style={{ textAlign: 'center', color: '#B8A99A', fontFamily: "'Lato', sans-serif", padding: '40px 0' }}>
                        Próximamente productos con esta piedra.
                    </p>
                ) : (
                    <>
                        {productos.map((product, index) => {
                            const isEven = index % 2 === 0
                            return (
                                <div
                                    key={product.id}
                                    style={{
                                        display: 'flex',
                                        flexDirection: isEven ? 'row' : 'row-reverse',
                                        alignItems: 'center',
                                        gap: '8%',
                                        marginBottom: '120px',
                                        flexWrap: 'wrap',
                                    }}
                                >
                                    {/* Text side */}
                                    <div className="product-text-col" style={{ flex: '1 1 400px', position: 'relative', display: 'flex', flexDirection: 'column', justifyContent: 'center', padding: '40px 0' }}>
                                        <div style={{
                                            position: 'absolute', top: '-40px',
                                            left: isEven ? '-30px' : 'auto', right: isEven ? 'auto' : '-30px',
                                            fontFamily: "'Cormorant Garamond', serif", fontSize: '14rem', fontWeight: 700,
                                            color: 'rgba(215, 203, 187, 0.25)', zIndex: 0, lineHeight: 0.8, userSelect: 'none',
                                        }}>
                                            {String(index + 1).padStart(2, '0')}
                                        </div>

                                        <div style={{ position: 'relative', zIndex: 1 }}>
                                            <h2 style={{ fontFamily: "'Lato', sans-serif", fontSize: 'clamp(1.8rem, 3vw, 2.4rem)', fontWeight: 700, color: '#1A1A1A', marginBottom: '16px', lineHeight: 1.2 }}>
                                                {product.nombre}
                                            </h2>
                                            {product.descripcion && (
                                                <p style={{ fontFamily: "'Lato', sans-serif", fontSize: '1rem', color: '#6B5E55', lineHeight: 1.8, marginBottom: '20px', maxWidth: '480px' }}>
                                                    {product.descripcion}
                                                </p>
                                            )}
                                            {product.precio && (
                                                <div style={{ display: 'block', marginBottom: '28px' }}>
                                                    <span style={{ fontFamily: "'Lato', sans-serif", fontSize: 'clamp(1.3rem, 2.2vw, 1.7rem)', fontWeight: 700, color: '#C9954A', letterSpacing: '0.03em' }}>
                                                        {formatPrice(product.precio)}
                                                    </span>
                                                </div>
                                            )}
                                            <a
                                                href={`https://wa.me/59899650979?text=${encodeURIComponent('Hola! quiero esta bijou: ' + product.nombre)}`}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                style={{
                                                    display: 'inline-flex', alignItems: 'center', padding: '16px 36px',
                                                    background: '#1A1A1A', color: '#FFFFFF', fontFamily: "'Lato', sans-serif",
                                                    fontSize: '0.9rem', fontWeight: 700, textDecoration: 'none',
                                                    borderRadius: '6px', transition: 'background 0.2s', gap: '8px',
                                                }}
                                                onMouseEnter={e => e.currentTarget.style.background = '#333'}
                                                onMouseLeave={e => e.currentTarget.style.background = '#1A1A1A'}
                                            >
                                                Comprar en Tienda ↗
                                            </a>
                                        </div>
                                    </div>

                                    {/* Image side */}
                                    <div className="product-image-col" style={{ flex: '1 1 500px', position: 'relative' }}>
                                        <motion.div
                                            initial={{ opacity: 0, y: 30 }}
                                            whileInView={{ opacity: 1, y: 0 }}
                                            viewport={{ once: true, margin: '-100px' }}
                                            transition={{ duration: 0.8 }}
                                            style={{ border: '1px solid rgba(0,0,0,0.05)', borderRadius: '16px', overflow: 'hidden', boxShadow: '0 20px 40px rgba(0,0,0,0.06)', background: '#FFF' }}
                                        >
                                            {product.imagen ? (
                                                <img src={product.imagen} alt={product.nombre} style={{ width: '100%', height: 'auto', display: 'block', aspectRatio: '4/4', objectFit: 'cover' }} />
                                            ) : (
                                                <div style={{ width: '100%', aspectRatio: '4/4', background: '#EDE8E2' }} />
                                            )}
                                        </motion.div>
                                    </div>
                                </div>
                            )
                        })}
                    </>
                )}
            </section>

            <style>{`
                @media (max-width: 700px) {
                    .product-image-col { order: -1; }
                    .product-text-col  { order:  1; }
                }
            `}</style>
        </div >
    )
}
