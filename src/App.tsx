import { Routes, Route, useLocation } from 'react-router-dom'
import './index.css'
import Navigation from './components/Navigation'
import Footer from './components/Footer'
import Home from './pages/Home'
import CollectionDetail from './pages/CollectionDetail'
import StoneDetail from './pages/StoneDetail'
import Tienda from './pages/Tienda'
import ScrollToTop from './components/ScrollToTop'
import FloatingWhatsApp from './components/FloatingWhatsApp'

// Admin
import Login from './pages/admin/Login'
import AdminRoute from './components/AdminRoute'
import AdminLayout from './pages/admin/AdminLayout'
import AdminDashboard from './pages/admin/AdminDashboard'
import ManageCategorias from './pages/admin/ManageCategorias'
import ManagePiedras from './pages/admin/ManagePiedras'
import ManageProductos from './pages/admin/ManageProductos'

function App() {
  const location = useLocation()
  const isAdmin = location.pathname.startsWith('/admin')

  return (
    <>
      <ScrollToTop />
      {!isAdmin && <Navigation />}
      <Routes>
        {/* Public Routes */}
        <Route path="/" element={<Home />} />
        <Route path="/producto/:id" element={<CollectionDetail />} />
        <Route path="/piedra/:id" element={<StoneDetail />} />
        <Route path="/tienda" element={<Tienda />} />

        {/* Admin Routes */}
        <Route path="/admin/login" element={<Login />} />
        <Route element={<AdminRoute />}>
          <Route element={<AdminLayout />}>
            <Route path="/admin" element={<AdminDashboard />} />
            <Route path="/admin/categorias" element={<ManageCategorias />} />
            <Route path="/admin/piedras" element={<ManagePiedras />} />
            <Route path="/admin/productos" element={<ManageProductos />} />
          </Route>
        </Route>
      </Routes>
      {!isAdmin && <FloatingWhatsApp />}
      {!isAdmin && <Footer />}
    </>
  )
}

export default App

