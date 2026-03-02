import { NavLink, Outlet, useNavigate } from 'react-router-dom'
import { supabase } from '../../lib/supabase'
import { useState } from 'react'
import { Menu, X } from 'lucide-react'

const menuItems = [
    { label: 'Dashboard', to: '/admin', end: true },
    { label: 'Categorías', to: '/admin/categorias' },
    { label: 'Tipos de Piedra', to: '/admin/piedras' },
    { label: 'Productos', to: '/admin/productos' },
]

const SIDEBAR_W = 220

const linkSt: React.CSSProperties = {
    display: 'block',
    padding: '11px 16px',
    borderRadius: '6px',
    textDecoration: 'none',
    fontFamily: "'Lato', sans-serif",
    fontSize: '0.9rem',
    color: '#555',
    transition: 'background 0.2s, color 0.2s',
}

const activeSt: React.CSSProperties = {
    backgroundColor: 'rgba(201,149,74,0.15)',
    color: '#C9954A',
    fontWeight: 700,
}

export default function AdminLayout() {
    const navigate = useNavigate()
    const [drawerOpen, setDrawerOpen] = useState(false)

    const handleLogout = async () => {
        await supabase.auth.signOut()
        navigate('/admin/login')
    }

    const NavLinks = ({ onClick }: { onClick?: () => void }) => (
        <>
            {menuItems.map(item => (
                <NavLink
                    key={item.to}
                    to={item.to}
                    end={item.end}
                    onClick={onClick}
                    style={({ isActive }) => isActive ? { ...linkSt, ...activeSt } : linkSt}
                >
                    {item.label}
                </NavLink>
            ))}
        </>
    )

    return (
        <div style={{ display: 'flex', minHeight: '100vh', backgroundColor: '#F9F7F4' }}>

            {/* ─── Desktop Sidebar ─── */}
            <aside className="admin-sidebar" style={{
                width: SIDEBAR_W, minWidth: SIDEBAR_W,
                backgroundColor: 'white', borderRight: '1px solid #EAEAEA',
                display: 'flex', flexDirection: 'column',
                padding: '28px 16px',
                position: 'fixed', top: 0, left: 0, bottom: 0, zIndex: 100,
            }}>
                <div style={{ marginBottom: '36px', textAlign: 'center' }}>
                    <img src="/logo2.png" alt="Farfalla" style={{ height: '40px' }} />
                    <p style={{ margin: '8px 0 0', fontFamily: "'Lato', sans-serif", fontSize: '0.65rem', color: '#AAA', letterSpacing: '0.1em' }}>ADMINISTRACIÓN</p>
                </div>
                <nav style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: '4px' }}>
                    <NavLinks />
                </nav>
                <button onClick={handleLogout} style={{ padding: '10px 16px', borderRadius: '6px', border: '1px solid #EEE', background: 'none', cursor: 'pointer', fontFamily: "'Lato', sans-serif", fontSize: '0.85rem', color: '#888' }}>
                    Cerrar sesión
                </button>
            </aside>

            {/* ─── Mobile Top Bar ─── */}
            <header className="admin-topbar" style={{
                display: 'none',
                position: 'fixed', top: 0, left: 0, right: 0, zIndex: 200,
                backgroundColor: 'white', borderBottom: '1px solid #EAEAEA',
                padding: '0 16px', height: '56px',
                alignItems: 'center', justifyContent: 'space-between',
            }}>
                <img src="/logo2.png" alt="Farfalla" style={{ height: '32px' }} />
                <button
                    onClick={() => setDrawerOpen(v => !v)}
                    style={{ background: 'none', border: 'none', cursor: 'pointer', color: '#2D2420', padding: '8px' }}
                    aria-label="Menú"
                >
                    {drawerOpen ? <X size={22} /> : <Menu size={22} />}
                </button>
            </header>

            {/* ─── Mobile Drawer ─── */}
            {drawerOpen && (
                <div
                    className="admin-drawer"
                    style={{
                        position: 'fixed', top: '56px', left: 0, right: 0, bottom: 0,
                        zIndex: 190, background: 'white', padding: '16px',
                        display: 'flex', flexDirection: 'column', gap: '4px',
                        borderTop: '1px solid #EAEAEA',
                        overflowY: 'auto',
                    }}
                    onClick={() => setDrawerOpen(false)}
                >
                    <NavLinks onClick={() => setDrawerOpen(false)} />
                    <button onClick={handleLogout} style={{ marginTop: '24px', padding: '12px 16px', borderRadius: '6px', border: '1px solid #EEE', background: 'none', cursor: 'pointer', fontFamily: "'Lato', sans-serif", fontSize: '0.9rem', color: '#888', textAlign: 'left' }}>
                        Cerrar sesión
                    </button>
                </div>
            )}

            {/* ─── Main content ─── */}
            <main className="admin-main" style={{ flex: 1, marginLeft: SIDEBAR_W, padding: '48px 40px 64px' }}>
                <Outlet />
            </main>

            <style>{`
                @media (max-width: 767px) {
                    .admin-sidebar  { display: none !important; }
                    .admin-topbar   { display: flex !important; }
                    .admin-main     { margin-left: 0 !important; padding: 72px 16px 48px !important; }
                    .admin-form-row { grid-template-columns: 1fr !important; }
                }
            `}</style>
        </div>
    )
}
