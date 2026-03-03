import { useState, useEffect, useRef } from 'react'
import { supabase } from '../../lib/supabase'
import { Pencil, Trash2 } from 'lucide-react'

const inputSt: React.CSSProperties = {
    width: '100%', padding: '10px 12px', borderRadius: '6px',
    border: '1px solid #DDD', boxSizing: 'border-box',
    fontFamily: "'Lato', sans-serif", fontSize: '0.9rem', background: 'white',
}
const labelSt: React.CSSProperties = {
    display: 'block', marginBottom: '6px',
    fontFamily: "'Lato', sans-serif", fontSize: '0.85rem', fontWeight: 600, color: '#444',
}

async function uploadImage(file: File, folder: string): Promise<string> {
    const ext = file.name.split('.').pop()
    const path = `${folder}/${Date.now()}_${Math.random().toString(36).slice(2)}.${ext}`
    const { error } = await supabase.storage.from('images').upload(path, file)
    if (error) throw error
    return supabase.storage.from('images').getPublicUrl(path).data.publicUrl
}

function ImageUploader({ label, value, onChange }: {
    label: string; value: string; onChange: (url: string) => void
}) {
    const [uploading, setUploading] = useState(false)
    const ref = useRef<HTMLInputElement>(null)
    const handleFile = async (e: React.ChangeEvent<HTMLInputElement>) => {
        if (!e.target.files?.length) return
        try { setUploading(true); onChange(await uploadImage(e.target.files[0], 'products')) }
        catch (err: any) { alert(err.message) }
        finally { setUploading(false) }
    }
    return (
        <div>
            <label style={labelSt}>{label}</label>
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                <button type="button" onClick={() => ref.current?.click()} style={{ padding: '8px 16px', border: '1px dashed #CCC', borderRadius: '6px', background: 'none', cursor: 'pointer', fontFamily: "'Lato', sans-serif", fontSize: '0.85rem', color: '#666' }}>
                    {uploading ? 'Subiendo…' : 'Elegir imagen'}
                </button>
                {value ? <img src={value} alt="preview" style={{ height: 56, width: 80, objectFit: 'cover', borderRadius: 4 }} /> : <span style={{ fontSize: '0.8rem', color: '#AAA' }}>Sin imagen</span>}
            </div>
            <input ref={ref} type="file" accept="image/*" onChange={handleFile} style={{ display: 'none' }} />
        </div>
    )
}

function MultiSelect({ options, label, selected, onToggle }: {
    options: { id: string; label: string }[]
    label: string
    selected: string[]
    onToggle: (id: string) => void
}) {
    return (
        <div style={{ flex: 1 }}>
            <label style={labelSt}>{label}</label>
            <div style={{ border: '1px solid #DDD', borderRadius: '6px', padding: '10px 14px', minHeight: '80px', display: 'flex', flexDirection: 'column', gap: '6px' }}>
                {options.length === 0
                    ? <span style={{ fontSize: '0.82rem', color: '#BBB' }}>No hay opciones creadas.</span>
                    : options.map(opt => (
                        <label key={opt.id} style={{ display: 'flex', alignItems: 'center', gap: '8px', cursor: 'pointer', fontFamily: "'Lato', sans-serif", fontSize: '0.88rem', color: '#444' }}>
                            <input type="checkbox" checked={selected.includes(opt.id)} onChange={() => onToggle(opt.id)} />
                            {opt.label}
                        </label>
                    ))
                }
            </div>
        </div>
    )
}

const blank = { nombre: '', descripcion: '', precio: '', imagen: '' }

export default function ManageProductos() {
    const [productos, setProductos] = useState<any[]>([])
    const [categorias, setCategorias] = useState<any[]>([])
    const [piedras, setPiedras] = useState<any[]>([])
    const [saving, setSaving] = useState(false)
    const [loading, setLoading] = useState(true)

    const [form, setForm] = useState({ ...blank })
    const [selCats, setSelCats] = useState<string[]>([])
    const [selPiedras, setSelPiedras] = useState<string[]>([])
    const [editingId, setEditingId] = useState<string | null>(null)

    const formRef = useRef<HTMLDivElement>(null)

    const fetchAll = async () => {
        setLoading(true)
        const [pRes, cRes, sRes] = await Promise.all([
            supabase.from('products').select('*').order('created_at', { ascending: false }),
            supabase.from('categorias').select('id, titulo').order('titulo'),
            supabase.from('tipos_piedra').select('id, nombre').order('nombre'),
        ])
        if (pRes.data) setProductos(pRes.data)
        if (cRes.data) setCategorias(cRes.data)
        if (sRes.data) setPiedras(sRes.data)
        setLoading(false)
    }

    useEffect(() => { fetchAll() }, [])

    const set = (k: string, v: string) => setForm(prev => ({ ...prev, [k]: v }))
    const toggleCat = (id: string) => setSelCats(prev => prev.includes(id) ? prev.filter(x => x !== id) : [...prev, id])
    const togglePiedra = (id: string) => setSelPiedras(prev => prev.includes(id) ? prev.filter(x => x !== id) : [...prev, id])

    // ── Load product into form for editing ─────────────────────────────────
    const handleEdit = async (prod: any) => {
        setEditingId(prod.id)
        setForm({ nombre: prod.nombre, descripcion: prod.descripcion ?? '', precio: prod.precio ?? '', imagen: prod.imagen ?? '' })

        // Load existing pivot assignments
        const [catRes, piedraRes] = await Promise.all([
            supabase.from('product_categorias').select('categoria_id').eq('product_id', prod.id),
            supabase.from('product_tipos_piedra').select('tipo_piedra_id').eq('product_id', prod.id),
        ])
        setSelCats(catRes.data?.map((r: any) => r.categoria_id) ?? [])
        setSelPiedras(piedraRes.data?.map((r: any) => r.tipo_piedra_id) ?? [])

        // Scroll to form
        formRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' })
    }

    const handleCancelEdit = () => {
        setEditingId(null)
        setForm({ ...blank })
        setSelCats([])
        setSelPiedras([])
    }

    // ── Submit: create or update ──────────────────────────────────────────
    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        setSaving(true)

        if (editingId) {
            // UPDATE
            const { error } = await supabase.from('products').update(form).eq('id', editingId)
            if (error) { alert(error.message); setSaving(false); return }

            // Replace pivot data
            await supabase.from('product_categorias').delete().eq('product_id', editingId)
            await supabase.from('product_tipos_piedra').delete().eq('product_id', editingId)
            if (selCats.length > 0)
                await supabase.from('product_categorias').insert(selCats.map(cId => ({ product_id: editingId, categoria_id: cId })))
            if (selPiedras.length > 0)
                await supabase.from('product_tipos_piedra').insert(selPiedras.map(sId => ({ product_id: editingId, tipo_piedra_id: sId })))

            setEditingId(null)
        } else {
            // INSERT
            const { data: newProd, error } = await supabase.from('products').insert([form]).select().single()
            if (error || !newProd) { alert(error?.message ?? 'Error'); setSaving(false); return }

            if (selCats.length > 0)
                await supabase.from('product_categorias').insert(selCats.map(cId => ({ product_id: newProd.id, categoria_id: cId })))
            if (selPiedras.length > 0)
                await supabase.from('product_tipos_piedra').insert(selPiedras.map(sId => ({ product_id: newProd.id, tipo_piedra_id: sId })))
        }

        setForm({ ...blank })
        setSelCats([])
        setSelPiedras([])
        fetchAll()
        setSaving(false)
    }

    const handleDelete = async (id: string) => {
        if (!confirm('¿Eliminar este producto?')) return
        await supabase.from('products').delete().eq('id', id)
        fetchAll()
    }

    return (
        <div>
            <h1 style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: '2rem', color: '#2D2420', margin: '0 0 32px' }}>Productos</h1>

            {/* ── Form ── */}
            <div ref={formRef} style={{ backgroundColor: 'white', borderRadius: '12px', padding: '32px', border: editingId ? '2px solid #C9954A' : '1px solid #EAEAEA', marginBottom: '40px' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px' }}>
                    <h2 style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: '1.3rem', color: '#2D2420', margin: 0 }}>
                        {editingId ? 'Editar producto' : 'Nuevo producto'}
                    </h2>
                    {editingId && (
                        <button onClick={handleCancelEdit} style={{ background: 'none', border: 'none', cursor: 'pointer', fontFamily: "'Lato', sans-serif", fontSize: '0.85rem', color: '#888' }}>
                            Cancelar edición ✕
                        </button>
                    )}
                </div>

                <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '18px' }}>
                    <div className="admin-form-row" style={{ display: 'grid', gridTemplateColumns: '2fr 1fr', gap: '16px' }}>
                        <div>
                            <label style={labelSt}>Nombre de la joya</label>
                            <input style={inputSt} value={form.nombre} onChange={e => set('nombre', e.target.value)} required placeholder="ej: Pulsera Amatista Dorada" />
                        </div>
                        <div>
                            <label style={labelSt}>Precio (ej: $18.000)</label>
                            <input style={inputSt} value={form.precio} onChange={e => set('precio', e.target.value)} placeholder="$18.000" />
                        </div>
                    </div>

                    <div>
                        <label style={labelSt}>Descripción</label>
                        <textarea value={form.descripcion} onChange={e => set('descripcion', e.target.value)} rows={4} style={{ ...inputSt, resize: 'vertical' }} placeholder="Descripción detallada del diseño, materiales, energía…" />
                    </div>

                    <div>
                        <ImageUploader label="Imagen del Producto" value={form.imagen} onChange={v => set('imagen', v)} />
                        <p style={{ margin: '4px 0 0', fontSize: '0.75rem', color: '#888', fontFamily: "'Lato', sans-serif" }}>Recomendado: 1200 x 1600 px (Vertical 3:4)</p>
                    </div>

                    <div style={{ borderTop: '1px solid #F0EEE', paddingTop: '18px' }}>
                        <p style={{ ...labelSt, marginBottom: '12px', color: '#2D2420', fontSize: '0.9rem' }}>Asignaciones</p>
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
                            <MultiSelect label="Categorías" options={categorias.map(c => ({ id: c.id, label: c.titulo }))} selected={selCats} onToggle={toggleCat} />
                            <MultiSelect label="Tipos de Piedra" options={piedras.map(p => ({ id: p.id, label: p.nombre }))} selected={selPiedras} onToggle={togglePiedra} />
                        </div>
                    </div>

                    <button type="submit" disabled={saving || (!editingId && !form.imagen)}
                        style={{ alignSelf: 'flex-start', padding: '11px 28px', backgroundColor: editingId ? '#3A6A5A' : '#C9954A', color: 'white', border: 'none', borderRadius: '6px', cursor: saving ? 'not-allowed' : 'pointer', fontFamily: "'Lato', sans-serif", fontWeight: 700 }}>
                        {saving ? 'Guardando…' : editingId ? 'Actualizar Producto' : 'Guardar Producto'}
                    </button>
                </form>
            </div>

            {/* ── List ── */}
            <div style={{ backgroundColor: 'white', borderRadius: '12px', padding: '24px', border: '1px solid #EAEAEA' }}>
                <h2 style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: '1.3rem', color: '#2D2420', margin: '0 0 20px' }}>
                    Catálogo ({productos.length} productos)
                </h2>
                {loading ? <p>Cargando…</p> : productos.length === 0 ? (
                    <p style={{ color: '#AAA', fontFamily: "'Lato', sans-serif" }}>Sin productos aún.</p>
                ) : (
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '0' }}>
                        {productos.map(prod => (
                            <div
                                key={prod.id}
                                style={{
                                    display: 'grid',
                                    gridTemplateColumns: '72px 1fr 64px',
                                    alignItems: 'center',
                                    gap: '14px',
                                    padding: '12px 0',
                                    borderBottom: '1px solid #F4F1EE',
                                    background: editingId === prod.id ? '#FFFBF5' : 'transparent',
                                }}
                            >
                                {/* Col 1: Imagen */}
                                {prod.imagen
                                    ? <img src={prod.imagen} alt={prod.nombre} style={{ width: 72, height: 72, objectFit: 'cover', borderRadius: 8, display: 'block' }} />
                                    : <div style={{ width: 72, height: 72, background: '#F0EEE9', borderRadius: 8 }} />}

                                {/* Col 2: Descripción */}
                                <div style={{ minWidth: 0 }}>
                                    <p style={{ margin: 0, fontFamily: "'Lato', sans-serif", fontWeight: 700, fontSize: '0.9rem', color: '#2D2420', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                                        {prod.nombre}
                                    </p>
                                    {prod.precio && (
                                        <p style={{ margin: '3px 0 0', fontFamily: "'Lato', sans-serif", fontSize: '0.78rem', color: '#C9954A', fontWeight: 600 }}>
                                            {prod.precio}
                                        </p>
                                    )}
                                </div>

                                {/* Col 3: Acciones */}
                                <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', alignItems: 'center' }}>
                                    <button
                                        onClick={() => handleEdit(prod)}
                                        title="Editar"
                                        style={{ background: 'none', border: 'none', cursor: 'pointer', color: '#999', padding: '4px' }}
                                    >
                                        <Pencil size={18} strokeWidth={1.8} />
                                    </button>
                                    <button
                                        onClick={() => handleDelete(prod.id)}
                                        title="Eliminar"
                                        style={{ background: 'none', border: 'none', cursor: 'pointer', color: '#999', padding: '4px' }}
                                    >
                                        <Trash2 size={18} strokeWidth={1.8} />
                                    </button>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </div>
    )
}
