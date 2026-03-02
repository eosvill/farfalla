import { Link, useNavigate } from 'react-router-dom'
import { supabase } from '../../lib/supabase'

export default function Dashboard() {
    const navigate = useNavigate()

    const handleLogout = async () => {
        await supabase.auth.signOut()
        navigate('/admin/login')
    }

    return (
        <div style={{ minHeight: '100vh', backgroundColor: '#F9F7F4', padding: '100px 40px 40px' }}>
            <div style={{ maxWidth: '900px', margin: '0 auto' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '40px' }}>
                    <h1 style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: '2.5rem', color: '#2D2420', margin: 0 }}>
                        Panel de Administración
                    </h1>
                    <button
                        onClick={handleLogout}
                        style={{ padding: '8px 16px', backgroundColor: 'transparent', border: '1px solid #C9954A', color: '#C9954A', borderRadius: '4px', cursor: 'pointer', fontFamily: "'Lato', sans-serif" }}
                    >
                        Cerrar Sesión
                    </button>
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '20px' }}>
                    <Link to="/admin/collections" style={{ textDecoration: 'none' }}>
                        <div style={{ backgroundColor: 'white', padding: '40px 20px', borderRadius: '8px', border: '1px solid #EAEAEA', boxShadow: '0 4px 12px rgba(0,0,0,0.03)', textAlign: 'center', height: '100%' }}>
                            <h2 style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: '1.6rem', color: '#2D2420', marginBottom: '10px' }}>Crear Colecciones</h2>
                            <p style={{ fontFamily: "'Lato', sans-serif", fontSize: '0.9rem', color: '#7A6E65', margin: 0 }}>Gestiona las colecciones principales</p>
                        </div>
                    </Link>

                    <Link to="/admin/stones" style={{ textDecoration: 'none' }}>
                        <div style={{ backgroundColor: 'white', padding: '40px 20px', borderRadius: '8px', border: '1px solid #EAEAEA', boxShadow: '0 4px 12px rgba(0,0,0,0.03)', textAlign: 'center', height: '100%' }}>
                            <h2 style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: '1.6rem', color: '#2D2420', marginBottom: '10px' }}>Crear Categorías (Piedras)</h2>
                            <p style={{ fontFamily: "'Lato', sans-serif", fontSize: '0.9rem', color: '#7A6E65', margin: 0 }}>Gestiona las guías de las piedras</p>
                        </div>
                    </Link>

                    <Link to="/admin/products" style={{ textDecoration: 'none' }}>
                        <div style={{ backgroundColor: 'white', padding: '40px 20px', borderRadius: '8px', border: '1px solid #EAEAEA', boxShadow: '0 4px 12px rgba(0,0,0,0.03)', textAlign: 'center', height: '100%' }}>
                            <h2 style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: '1.6rem', color: '#2D2420', marginBottom: '10px' }}>Cargar Productos</h2>
                            <p style={{ fontFamily: "'Lato', sans-serif", fontSize: '0.9rem', color: '#7A6E65', margin: 0 }}>Añade productos y asígnalos a múltiples colecciones y piedras</p>
                        </div>
                    </Link>
                </div>

                <div style={{ marginTop: '40px', textAlign: 'center' }}>
                    <Link to="/" style={{ fontFamily: "'Lato', sans-serif", fontSize: '0.9rem', color: '#C9954A', textDecoration: 'underline' }}>Volver a la tienda (Sitio principal)</Link>
                </div>
            </div>
        </div>
    )
}
