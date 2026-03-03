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
        try { setUploading(true); onChange(await uploadImage(e.target.files[0], 'categorias')) }
        catch (err: any) { alert(err.message) }
        finally { setUploading(false) }
    }
    return (
        <div>
            <label style={labelSt}>{label}</label>
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                <button type="button" onClick={() => ref.current?.click()}
                    style={{ padding: '8px 16px', border: '1px dashed #CCC', borderRadius: '6px', background: 'none', cursor: 'pointer', fontFamily: "'Lato', sans-serif", fontSize: '0.85rem', color: '#666' }}>
                    {uploading ? 'Subiendo…' : 'Elegir imagen'}
                </button>
                {value ? <img src={value} alt="preview" style={{ height: 56, width: 80, objectFit: 'cover', borderRadius: 4 }} /> : <span style={{ fontSize: '0.8rem', color: '#AAA' }}>Sin imagen</span>}
            </div>
            <input ref={ref} type="file" accept="image/*" onChange={handleFile} style={{ display: 'none' }} />
        </div>
    )
}

const blank = { categoria: '', titulo: '', subtitulo: '', intro: '', imagen_hero: '', imagen_hero_mobile: '', imagen_card: '' }

export default function ManageCategorias() {
    const [items, setItems] = useState<any[]>([])
    const [saving, setSaving] = useState(false)
    const [loading, setLoading] = useState(true)
    const [form, setForm] = useState({ ...blank })
    const [editingId, setEditingId] = useState<string | null>(null)
    const formRef = useRef<HTMLDivElement>(null)

    const fetchItems = async () => {
        setLoading(true)
        const { data } = await supabase.from('categorias').select('*').order('created_at', { ascending: false })
        if (data) setItems(data)
        setLoading(false)
    }

    useEffect(() => { fetchItems() }, [])

    const set = (k: string, v: string) => setForm(prev => ({ ...prev, [k]: v }))

    const handleEdit = (item: any) => {
        setEditingId(item.id)
        setForm({
            categoria: item.categoria ?? '',
            titulo: item.titulo ?? '',
            subtitulo: item.subtitulo ?? '',
            intro: item.intro ?? '',
            imagen_hero: item.imagen_hero ?? '',
            imagen_hero_mobile: item.imagen_hero_mobile ?? '',
            imagen_card: item.imagen_card ?? '',
        })
        formRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' })
    }

    const handleCancel = () => { setEditingId(null); setForm({ ...blank }) }

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        setSaving(true)
        if (editingId) {
            const { error } = await supabase.from('categorias').update(form).eq('id', editingId)
            if (error) alert(error.message)
            else { setEditingId(null); setForm({ ...blank }); fetchItems() }
        } else {
            const { error } = await supabase.from('categorias').insert([form])
            if (error) alert(error.message)
            else { setForm({ ...blank }); fetchItems() }
        }
        setSaving(false)
    }

    const handleDelete = async (id: string) => {
        if (!confirm('¿Eliminar esta categoría?')) return
        await supabase.from('categorias').delete().eq('id', id)
        fetchItems()
    }

    return (
        <div>
            <h1 style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: '2rem', color: '#2D2420', margin: '0 0 32px' }}>Categorías</h1>

            {/* ── Form ── */}
            <div ref={formRef} style={{ backgroundColor: 'white', borderRadius: '12px', padding: '32px', border: editingId ? '2px solid #C9954A' : '1px solid #EAEAEA', marginBottom: '40px' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px' }}>
                    <h2 style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: '1.3rem', color: '#2D2420', margin: 0 }}>
                        {editingId ? 'Editar categoría' : 'Nueva categoría'}
                    </h2>
                    {editingId && (
                        <button onClick={handleCancel} style={{ background: 'none', border: 'none', cursor: 'pointer', fontFamily: "'Lato', sans-serif", fontSize: '0.85rem', color: '#888' }}>
                            Cancelar edición ✕
                        </button>
                    )}
                </div>

                <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '18px' }}>
                    <div className="admin-form-row" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
                        <div>
                            <label style={labelSt}>Categoría (slug/ID)</label>
                            <input style={inputSt} value={form.categoria} onChange={e => set('categoria', e.target.value)} required placeholder="ej: primavera-2025" />
                        </div>
                        <div>
                            <label style={labelSt}>Título</label>
                            <input style={inputSt} value={form.titulo} onChange={e => set('titulo', e.target.value)} required placeholder="ej: Colección Primavera" />
                        </div>
                    </div>

                    <div>
                        <label style={labelSt}>Subtítulo</label>
                        <input style={inputSt} value={form.subtitulo} onChange={e => set('subtitulo', e.target.value)} placeholder="Frase corta debajo del título" />
                    </div>

                    <div>
                        <label style={labelSt}>Intro (texto largo)</label>
                        <textarea value={form.intro} onChange={e => set('intro', e.target.value)} rows={4} style={{ ...inputSt, resize: 'vertical' }} placeholder="Descripción extensa de la categoría…" />
                    </div>

                    <div>
                        <ImageUploader label="Imagen Hero (desktop)" value={form.imagen_hero} onChange={v => set('imagen_hero', v)} />
                        <p style={{ margin: '4px 0 0', fontSize: '0.75rem', color: '#888', fontFamily: "'Lato', sans-serif" }}>Recomendado: 1920 x 800 px (Apaisada)</p>
                    </div>
                    <div>
                        <ImageUploader label="Imagen Tarjeta" value={form.imagen_card} onChange={v => set('imagen_card', v)} />
                        <p style={{ margin: '4px 0 0', fontSize: '0.75rem', color: '#888', fontFamily: "'Lato', sans-serif" }}>Recomendado: 800 x 1000 px (Vertical 4:5)</p>
                    </div>

                    <div>
                        <ImageUploader label="Imagen Hero Mobile (vertical / portrait)" value={form.imagen_hero_mobile} onChange={v => set('imagen_hero_mobile', v)} />
                        <p style={{ margin: '4px 0 0', fontSize: '0.75rem', color: '#888', fontFamily: "'Lato', sans-serif" }}>Recomendado: 800 x 1200 px (Vertical 2:3)</p>
                    </div>

                    <button type="submit" disabled={saving}
                        style={{ alignSelf: 'flex-start', padding: '11px 28px', backgroundColor: editingId ? '#3A6A5A' : '#C9954A', color: 'white', border: 'none', borderRadius: '6px', cursor: saving ? 'not-allowed' : 'pointer', fontFamily: "'Lato', sans-serif", fontWeight: 700 }}>
                        {saving ? 'Guardando…' : editingId ? 'Actualizar Categoría' : 'Crear Categoría'}
                    </button>
                </form>
            </div>

            {/* ── List ── */}
            <div style={{ backgroundColor: 'white', borderRadius: '12px', padding: '24px', border: '1px solid #EAEAEA' }}>
                <h2 style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: '1.3rem', color: '#2D2420', margin: '0 0 20px' }}>Categorías registradas</h2>
                {loading ? <p>Cargando…</p> : items.length === 0 ? (
                    <p style={{ color: '#AAA', fontFamily: "'Lato', sans-serif" }}>Sin categorías aún.</p>
                ) : (
                    <div style={{ display: 'flex', flexDirection: 'column' }}>
                        {items.map(item => (
                            <div
                                key={item.id}
                                style={{
                                    display: 'grid',
                                    gridTemplateColumns: '72px 1fr 64px',
                                    alignItems: 'center',
                                    gap: '14px',
                                    padding: '12px 0',
                                    borderBottom: '1px solid #F4F1EE',
                                    background: editingId === item.id ? '#FFFBF5' : 'transparent',
                                }}
                            >
                                {item.imagen_card
                                    ? <img src={item.imagen_card} alt={item.titulo} style={{ width: 72, height: 72, objectFit: 'cover', borderRadius: 8, display: 'block' }} />
                                    : <div style={{ width: 72, height: 72, background: '#F0EEE9', borderRadius: 8 }} />}

                                <div style={{ minWidth: 0 }}>
                                    <p style={{ margin: 0, fontFamily: "'Lato', sans-serif", fontWeight: 700, fontSize: '0.9rem', color: '#2D2420', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{item.titulo}</p>
                                    <p style={{ margin: '3px 0 0', fontFamily: "'Lato', sans-serif", fontSize: '0.78rem', color: '#AAA' }}>{item.categoria}</p>
                                </div>

                                <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', alignItems: 'center' }}>
                                    <button onClick={() => handleEdit(item)} title="Editar" style={{ background: 'none', border: 'none', cursor: 'pointer', color: '#999', padding: '4px' }}><Pencil size={18} strokeWidth={1.8} /></button>
                                    <button onClick={() => handleDelete(item.id)} title="Eliminar" style={{ background: 'none', border: 'none', cursor: 'pointer', color: '#999', padding: '4px' }}><Trash2 size={18} strokeWidth={1.8} /></button>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </div>
    )
}
