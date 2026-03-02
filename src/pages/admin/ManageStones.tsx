import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { supabase } from '../../lib/supabase'

export default function ManageStones() {
    const [stones, setStones] = useState<any[]>([])
    const [loading, setLoading] = useState(true)

    // Form states
    const [name, setName] = useState('')
    const [slug, setSlug] = useState('')
    const [tag, setTag] = useState('')
    const [description, setDescription] = useState('')
    const [iconColor, setIconColor] = useState('#C9954A')
    const [iconBg, setIconBg] = useState('radial-gradient(circle at 40% 35%, #F5D080, #C9954A 60%, #8B6010)')
    const [imageUrl, setImageUrl] = useState('')
    const [uploading, setUploading] = useState(false)

    const fetchStones = async () => {
        setLoading(true)
        const { data } = await supabase.from('stones').select('*').order('created_at', { ascending: false })
        if (data) setStones(data)
        setLoading(false)
    }

    useEffect(() => {
        fetchStones()
    }, [])

    const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
        try {
            setUploading(true)
            if (!e.target.files || e.target.files.length === 0) {
                throw new Error('Debes seleccionar una imagen.')
            }
            const file = e.target.files[0]
            const fileExt = file.name.split('.').pop()
            const fileName = `${Math.random()}.${fileExt}`
            const filePath = `stones/${fileName}`

            const { error: uploadError } = await supabase.storage.from('images').upload(filePath, file)
            if (uploadError) throw uploadError

            const { data } = supabase.storage.from('images').getPublicUrl(filePath)
            setImageUrl(data.publicUrl)
        } catch (error: any) {
            alert(error.message)
        } finally {
            setUploading(false)
        }
    }

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        setLoading(true)

        // Auto-generate slug if empty
        const finalSlug = slug || name.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)+/g, '')

        const { error } = await supabase.from('stones').insert([
            { name, slug: finalSlug, tag, description, bg_image_url: imageUrl, icon_color: iconColor, icon_bg: iconBg }
        ])

        if (error) {
            alert(error.message)
        } else {
            setName('')
            setSlug('')
            setTag('')
            setDescription('')
            setImageUrl('')
            fetchStones()
        }
        setLoading(false)
    }

    const handleDelete = async (id: string) => {
        if (!window.confirm('¿Seguro que deseas eliminar esta categoría?')) return
        const { error } = await supabase.from('stones').delete().eq('id', id)
        if (error) alert(error.message)
        else fetchStones()
    }

    return (
        <div style={{ minHeight: '100vh', backgroundColor: '#F9F7F4', padding: '100px 40px 40px' }}>
            <div style={{ maxWidth: '1000px', margin: '0 auto' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
                    <h1 style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: '2rem', color: '#2D2420', margin: 0 }}>
                        Gestionar Categorías de Piedras
                    </h1>
                    <Link to="/admin" style={{ padding: '8px 16px', textDecoration: 'none', backgroundColor: '#EAEAEA', color: '#333', borderRadius: '4px', fontFamily: "'Lato', sans-serif" }}>
                        Volver al Dashboard
                    </Link>
                </div>

                {/* Create Form */}
                <div style={{ backgroundColor: 'white', padding: '30px', borderRadius: '8px', boxShadow: '0 2px 8px rgba(0,0,0,0.05)', marginBottom: '40px' }}>
                    <h2 style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: '1.4rem', color: '#2D2420', marginBottom: '20px' }}>Crear Nueva Categoría</h2>
                    <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                        <div style={{ display: 'flex', gap: '16px' }}>
                            <div style={{ flex: 1 }}>
                                <label style={{ display: 'block', marginBottom: '8px', fontFamily: "'Lato', sans-serif", fontSize: '0.9rem' }}>Nombre de la Piedra</label>
                                <input type="text" value={name} onChange={(e) => setName(e.target.value)} required style={{ width: '100%', padding: '10px', borderRadius: '4px', border: '1px solid #CCC', boxSizing: 'border-box' }} />
                            </div>
                            <div style={{ flex: 1 }}>
                                <label style={{ display: 'block', marginBottom: '8px', fontFamily: "'Lato', sans-serif", fontSize: '0.9rem' }}>Slug (URL) - Opcional</label>
                                <input type="text" value={slug} onChange={(e) => setSlug(e.target.value)} placeholder="ej: amatista-2026" style={{ width: '100%', padding: '10px', borderRadius: '4px', border: '1px solid #CCC', boxSizing: 'border-box' }} />
                            </div>
                        </div>

                        <div>
                            <label style={{ display: 'block', marginBottom: '8px', fontFamily: "'Lato', sans-serif", fontSize: '0.9rem' }}>Etiqueta (Tag)</label>
                            <input type="text" value={tag} onChange={(e) => setTag(e.target.value)} placeholder="Ej: Calma, protección, intuición" style={{ width: '100%', padding: '10px', borderRadius: '4px', border: '1px solid #CCC', boxSizing: 'border-box', fontFamily: "'Lato', sans-serif" }} />
                        </div>

                        <div>
                            <label style={{ display: 'block', marginBottom: '8px', fontFamily: "'Lato', sans-serif", fontSize: '0.9rem' }}>Descripción General</label>
                            <textarea value={description} onChange={(e) => setDescription(e.target.value)} rows={3} style={{ width: '100%', padding: '10px', borderRadius: '4px', border: '1px solid #CCC', boxSizing: 'border-box', fontFamily: "'Lato', sans-serif" }} />
                        </div>

                        <div style={{ display: 'flex', gap: '16px' }}>
                            <div style={{ flex: 1 }}>
                                <label style={{ display: 'block', marginBottom: '8px', fontFamily: "'Lato', sans-serif", fontSize: '0.9rem' }}>Color Principal (Hex)</label>
                                <input type="text" value={iconColor} onChange={(e) => setIconColor(e.target.value)} style={{ width: '100%', padding: '10px', borderRadius: '4px', border: '1px solid #CCC', boxSizing: 'border-box' }} />
                            </div>
                            <div style={{ flex: 2 }}>
                                <label style={{ display: 'block', marginBottom: '8px', fontFamily: "'Lato', sans-serif", fontSize: '0.9rem' }}>Gradiente del Icono (CSS radial-gradient)</label>
                                <input type="text" value={iconBg} onChange={(e) => setIconBg(e.target.value)} style={{ width: '100%', padding: '10px', borderRadius: '4px', border: '1px solid #CCC', boxSizing: 'border-box' }} />
                            </div>
                        </div>

                        <div>
                            <label style={{ display: 'block', marginBottom: '8px', fontFamily: "'Lato', sans-serif", fontSize: '0.9rem' }}>Imagen de Fondo (Cuadricula Mosaico)</label>
                            <input type="file" accept="image/*" onChange={handleImageUpload} disabled={uploading} style={{ marginBottom: '10px' }} />
                            {uploading && <span style={{ fontSize: '0.85rem', color: '#666', marginLeft: '10px' }}>Subiendo...</span>}
                            {imageUrl && (
                                <div style={{ marginTop: '10px' }}>
                                    <img src={imageUrl} alt="Preview" style={{ height: '100px', objectFit: 'cover', borderRadius: '4px' }} />
                                </div>
                            )}
                        </div>

                        <button type="submit" disabled={loading || uploading} style={{ marginTop: '10px', padding: '12px', backgroundColor: '#C9954A', color: 'white', border: 'none', borderRadius: '4px', fontFamily: "'Lato', sans-serif", fontWeight: 600, cursor: (loading || uploading) ? 'not-allowed' : 'pointer' }}>
                            Crear Piedra
                        </button>
                    </form>
                </div>

                {/* List */}
                <div style={{ backgroundColor: 'white', padding: '30px', borderRadius: '8px', boxShadow: '0 2px 8px rgba(0,0,0,0.05)' }}>
                    <h2 style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: '1.4rem', color: '#2D2420', marginBottom: '20px' }}>Piedras Registradas</h2>

                    {loading ? (
                        <p>Cargando...</p>
                    ) : stones.length === 0 ? (
                        <p style={{ color: '#666', fontFamily: "'Lato', sans-serif" }}>No hay piedras creadas todavía.</p>
                    ) : (
                        <ul style={{ listStyle: 'none', padding: 0, margin: 0 }}>
                            {stones.map(stone => (
                                <li key={stone.id} style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '16px 0', borderBottom: '1px solid #EEE' }}>
                                    <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
                                        {stone.bg_image_url ? (
                                            <img src={stone.bg_image_url} alt={stone.name} style={{ width: '60px', height: '60px', objectFit: 'cover', borderRadius: '4px' }} />
                                        ) : (
                                            <div style={{ width: '60px', height: '60px', backgroundColor: '#f0f0f0', borderRadius: '4px' }} />
                                        )}
                                        <div>
                                            <h3 style={{ margin: '0 0 4px', fontFamily: "'Lato', sans-serif", fontSize: '1.05rem', color: '#333' }}>{stone.name}</h3>
                                            <p style={{ margin: 0, fontSize: '0.85rem', color: '#888' }}>{stone.tag}</p>
                                        </div>
                                    </div>
                                    <button onClick={() => handleDelete(stone.id)} style={{ padding: '6px 12px', backgroundColor: '#FFEDED', color: '#D32F2F', border: 'none', borderRadius: '4px', cursor: 'pointer', fontFamily: "'Lato', sans-serif", fontSize: '0.85rem' }}>
                                        Eliminar
                                    </button>
                                </li>
                            ))}
                        </ul>
                    )}
                </div>
            </div>
        </div>
    )
}
