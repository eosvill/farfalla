import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { supabase } from '../../lib/supabase'

export default function ManageProducts() {
    const [products, setProducts] = useState<any[]>([])

    // Data for selectors
    const [allCollections, setAllCollections] = useState<any[]>([])
    const [allStones, setAllStones] = useState<any[]>([])

    const [loading, setLoading] = useState(true)

    // Form states
    const [name, setName] = useState('')
    const [price, setPrice] = useState('')
    const [description, setDescription] = useState('')
    const [imageUrl, setImageUrl] = useState('')
    const [uploading, setUploading] = useState(false)

    // Multi-select state (storing IDs)
    const [selectedCollections, setSelectedCollections] = useState<string[]>([])
    const [selectedStones, setSelectedStones] = useState<string[]>([])

    const fetchData = async () => {
        setLoading(true)

        // Fetch products
        const { data: pData } = await supabase.from('products').select('*').order('created_at', { ascending: false })
        if (pData) setProducts(pData)

        // Fetch lists for the checkboxes
        const { data: cData } = await supabase.from('collections').select('id, title').order('title')
        if (cData) setAllCollections(cData)

        const { data: sData } = await supabase.from('stones').select('id, name').order('name')
        if (sData) setAllStones(sData)

        setLoading(false)
    }

    useEffect(() => {
        fetchData()
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
            const filePath = `products/${fileName}`

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

    const toggleCollection = (id: string) => {
        setSelectedCollections(prev =>
            prev.includes(id) ? prev.filter(cId => cId !== id) : [...prev, id]
        )
    }

    const toggleStone = (id: string) => {
        setSelectedStones(prev =>
            prev.includes(id) ? prev.filter(sId => sId !== id) : [...prev, id]
        )
    }

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        setLoading(true)

        // 1. Insert the main product
        const { data: newProduct, error: productError } = await supabase.from('products').insert([
            { name, price, description, image_url: imageUrl }
        ]).select().single()

        if (productError) {
            alert(productError.message)
            setLoading(false)
            return
        }

        const productId = newProduct.id

        // 2. Insert relations into pivot tables
        if (selectedCollections.length > 0) {
            const colRelations = selectedCollections.map(cId => ({ product_id: productId, collection_id: cId }))
            await supabase.from('product_collections').insert(colRelations)
        }

        if (selectedStones.length > 0) {
            const stoneRelations = selectedStones.map(sId => ({ product_id: productId, stone_id: sId }))
            await supabase.from('product_stones').insert(stoneRelations)
        }

        // Reset and refresh
        setName('')
        setPrice('')
        setDescription('')
        setImageUrl('')
        setSelectedCollections([])
        setSelectedStones([])
        fetchData()
        setLoading(false)
    }

    const handleDelete = async (id: string) => {
        if (!window.confirm('¿Seguro que deseas eliminar este producto de toda la tienda?')) return

        // Since we put ON DELETE CASCADE in the pivot tables, deleting the product will clean up relations
        const { error } = await supabase.from('products').delete().eq('id', id)
        if (error) alert(error.message)
        else fetchData()
    }

    return (
        <div style={{ minHeight: '100vh', backgroundColor: '#F9F7F4', padding: '100px 40px 40px' }}>
            <div style={{ maxWidth: '1000px', margin: '0 auto' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
                    <h1 style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: '2rem', color: '#2D2420', margin: 0 }}>
                        Cargar Productos
                    </h1>
                    <Link to="/admin" style={{ padding: '8px 16px', textDecoration: 'none', backgroundColor: '#EAEAEA', color: '#333', borderRadius: '4px', fontFamily: "'Lato', sans-serif" }}>
                        Volver al Dashboard
                    </Link>
                </div>

                {/* Create Form */}
                <div style={{ backgroundColor: 'white', padding: '30px', borderRadius: '8px', boxShadow: '0 2px 8px rgba(0,0,0,0.05)', marginBottom: '40px' }}>
                    <h2 style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: '1.4rem', color: '#2D2420', marginBottom: '20px' }}>Información del Producto</h2>
                    <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>

                        <div style={{ display: 'flex', gap: '16px' }}>
                            <div style={{ flex: 2 }}>
                                <label style={{ display: 'block', marginBottom: '8px', fontFamily: "'Lato', sans-serif", fontSize: '0.9rem' }}>Nombre de la joya</label>
                                <input type="text" value={name} onChange={(e) => setName(e.target.value)} required style={{ width: '100%', padding: '10px', borderRadius: '4px', border: '1px solid #CCC', boxSizing: 'border-box' }} />
                            </div>
                            <div style={{ flex: 1 }}>
                                <label style={{ display: 'block', marginBottom: '8px', fontFamily: "'Lato', sans-serif", fontSize: '0.9rem' }}>Precio (Texto, Ej: $18.000)</label>
                                <input type="text" value={price} onChange={(e) => setPrice(e.target.value)} required style={{ width: '100%', padding: '10px', borderRadius: '4px', border: '1px solid #CCC', boxSizing: 'border-box' }} />
                            </div>
                        </div>

                        <div>
                            <label style={{ display: 'block', marginBottom: '8px', fontFamily: "'Lato', sans-serif", fontSize: '0.9rem' }}>Descripción Corta</label>
                            <textarea value={description} onChange={(e) => setDescription(e.target.value)} rows={2} style={{ width: '100%', padding: '10px', borderRadius: '4px', border: '1px solid #CCC', boxSizing: 'border-box', fontFamily: "'Lato', sans-serif" }} />
                        </div>

                        <div>
                            <label style={{ display: 'block', marginBottom: '8px', fontFamily: "'Lato', sans-serif", fontSize: '0.9rem' }}>Foto del Producto</label>
                            <input type="file" accept="image/*" onChange={handleImageUpload} disabled={uploading} style={{ marginBottom: '10px' }} />
                            {uploading && <span style={{ fontSize: '0.85rem', color: '#666', marginLeft: '10px' }}>Subiendo foto...</span>}
                            {imageUrl && (
                                <div style={{ marginTop: '10px' }}>
                                    <img src={imageUrl} alt="Preview" style={{ height: '100px', objectFit: 'cover', borderRadius: '4px' }} />
                                </div>
                            )}
                        </div>

                        {/* RELATIONS SELECTORS */}
                        <div style={{ display: 'flex', gap: '30px', marginTop: '10px', padding: '20px', backgroundColor: '#FAFAFA', border: '1px solid #EAEAEA', borderRadius: '8px' }}>

                            {/* Box Colecciones */}
                            <div style={{ flex: 1 }}>
                                <h3 style={{ fontFamily: "'Lato', sans-serif", fontSize: '1rem', color: '#333', marginBottom: '12px' }}>¿A qué Colecciones pertenece?</h3>
                                {allCollections.length === 0 ? (
                                    <p style={{ fontSize: '0.85rem', color: '#888' }}>No hay colecciones creadas.</p>
                                ) : (
                                    <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                                        {allCollections.map(col => (
                                            <label key={col.id} style={{ display: 'flex', alignItems: 'center', gap: '8px', fontFamily: "'Lato', sans-serif", fontSize: '0.9rem', cursor: 'pointer' }}>
                                                <input
                                                    type="checkbox"
                                                    checked={selectedCollections.includes(col.id)}
                                                    onChange={() => toggleCollection(col.id)}
                                                />
                                                {col.title}
                                            </label>
                                        ))}
                                    </div>
                                )}
                            </div>

                            {/* Box Piedras */}
                            <div style={{ flex: 1 }}>
                                <h3 style={{ fontFamily: "'Lato', sans-serif", fontSize: '1rem', color: '#333', marginBottom: '12px' }}>¿Qué Piedras contiene? (Categorías)</h3>
                                {allStones.length === 0 ? (
                                    <p style={{ fontSize: '0.85rem', color: '#888' }}>No hay piedras registradas.</p>
                                ) : (
                                    <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                                        {allStones.map(stone => (
                                            <label key={stone.id} style={{ display: 'flex', alignItems: 'center', gap: '8px', fontFamily: "'Lato', sans-serif", fontSize: '0.9rem', cursor: 'pointer' }}>
                                                <input
                                                    type="checkbox"
                                                    checked={selectedStones.includes(stone.id)}
                                                    onChange={() => toggleStone(stone.id)}
                                                />
                                                {stone.name}
                                            </label>
                                        ))}
                                    </div>
                                )}
                            </div>
                        </div>

                        <button type="submit" disabled={loading || uploading || !imageUrl} style={{ marginTop: '20px', padding: '14px', backgroundColor: '#C9954A', color: 'white', border: 'none', borderRadius: '4px', fontFamily: "'Lato', sans-serif", fontWeight: 600, cursor: (loading || uploading || !imageUrl) ? 'not-allowed' : 'pointer' }}>
                            Guardar Joya en el Catálogo
                        </button>
                    </form>
                </div>

                {/* List */}
                <div style={{ backgroundColor: 'white', padding: '30px', borderRadius: '8px', boxShadow: '0 2px 8px rgba(0,0,0,0.05)' }}>
                    <h2 style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: '1.4rem', color: '#2D2420', marginBottom: '20px' }}>Joyas Creadas ({products.length})</h2>

                    {loading && products.length === 0 ? (
                        <p>Cargando catálogo...</p>
                    ) : products.length === 0 ? (
                        <p style={{ color: '#666', fontFamily: "'Lato', sans-serif" }}>No hay productos cargados.</p>
                    ) : (
                        <ul style={{ listStyle: 'none', padding: 0, margin: 0 }}>
                            {products.map(prod => (
                                <li key={prod.id} style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '16px 0', borderBottom: '1px solid #EEE' }}>
                                    <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
                                        {prod.image_url ? (
                                            <img src={prod.image_url} alt={prod.name} style={{ width: '60px', height: '60px', objectFit: 'cover', borderRadius: '4px' }} />
                                        ) : (
                                            <div style={{ width: '60px', height: '60px', backgroundColor: '#f0f0f0', borderRadius: '4px' }} />
                                        )}
                                        <div>
                                            <h3 style={{ margin: '0 0 4px', fontFamily: "'Lato', sans-serif", fontSize: '1.05rem', color: '#333' }}>{prod.name}</h3>
                                            <p style={{ margin: 0, fontSize: '0.85rem', color: '#888' }}>{prod.price}</p>
                                        </div>
                                    </div>
                                    <button onClick={() => handleDelete(prod.id)} style={{ padding: '6px 12px', backgroundColor: '#FFEDED', color: '#D32F2F', border: 'none', borderRadius: '4px', cursor: 'pointer', fontFamily: "'Lato', sans-serif", fontSize: '0.85rem' }}>
                                        Borrar
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
