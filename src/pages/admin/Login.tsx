import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { supabase } from '../../lib/supabase'

export default function Login() {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [error, setError] = useState<string | null>(null)
    const [message, setMessage] = useState<string | null>(null)
    const [loading, setLoading] = useState(false)
    const [isRegistering, setIsRegistering] = useState(false)
    const navigate = useNavigate()

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        setLoading(true)
        setError(null)
        setMessage(null)

        if (isRegistering) {
            const { data, error } = await supabase.auth.signUp({
                email,
                password,
            })
            if (error) {
                setError(error.message)
            } else {
                // Check if email confirmation is required by Supabase
                if (data?.user?.identities && data.user.identities.length === 0) {
                    setError('Este email ya está registrado. Intenta iniciar sesión.')
                } else {
                    setMessage('¡Registro exitoso! Ya puedes iniciar sesión (si Supabase pide confirmar email, revisa tu bandeja de entrada).')
                    setIsRegistering(false) // toggle back to login
                }
            }
            setLoading(false)
        } else {
            const { error } = await supabase.auth.signInWithPassword({
                email,
                password,
            })

            if (error) {
                setError(error.message)
                setLoading(false)
            } else {
                navigate('/admin')
            }
        }
    }

    return (
        <div style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', backgroundColor: '#F9F7F4' }}>
            <div style={{ backgroundColor: 'white', padding: '40px', borderRadius: '8px', boxShadow: '0 4px 12px rgba(0,0,0,0.1)', width: '100%', maxWidth: '400px' }}>
                <h1 style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: '2rem', color: '#2D2420', textAlign: 'center', marginBottom: '8px' }}>Farfalla Admin</h1>
                <p style={{ fontFamily: "'Lato', sans-serif", fontSize: '0.9rem', color: '#7A6E65', textAlign: 'center', marginBottom: '24px' }}>
                    {isRegistering ? 'Crear una nueva cuenta' : 'Ingresa a tu panel'}
                </p>

                {isRegistering && !message && !error && (
                    <div style={{ backgroundColor: '#FFF4E5', color: '#663C00', padding: '12px', borderRadius: '4px', marginBottom: '20px', fontSize: '0.85rem', fontFamily: "'Lato', sans-serif", borderLeft: '4px solid #FFA000' }}>
                        <strong>Atención:</strong> Una vez registrado, deberás revisar tu bandeja de entrada y hacer clic en el enlace de confirmación antes de poder iniciar sesión.
                    </div>
                )}

                {error && (
                    <div style={{ backgroundColor: '#FDECEA', color: '#D32F2F', padding: '12px', borderRadius: '4px', marginBottom: '20px', fontSize: '0.9rem', fontFamily: "'Lato', sans-serif" }}>
                        {error}
                    </div>
                )}

                {message && (
                    <div style={{ backgroundColor: '#EDF7ED', color: '#1E4620', padding: '12px', borderRadius: '4px', marginBottom: '20px', fontSize: '0.9rem', fontFamily: "'Lato', sans-serif" }}>
                        {message}
                    </div>
                )}

                <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                    <div>
                        <label style={{ display: 'block', marginBottom: '8px', fontFamily: "'Lato', sans-serif", fontSize: '0.9rem', color: '#4A4A4A' }}>Email</label>
                        <input
                            type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                            style={{ width: '100%', padding: '10px', borderRadius: '4px', border: '1px solid #CCC', fontFamily: "'Lato', sans-serif", boxSizing: 'border-box' }}
                        />
                    </div>
                    <div>
                        <label style={{ display: 'block', marginBottom: '8px', fontFamily: "'Lato', sans-serif", fontSize: '0.9rem', color: '#4A4A4A' }}>Contraseña</label>
                        <input
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                            style={{ width: '100%', padding: '10px', borderRadius: '4px', border: '1px solid #CCC', fontFamily: "'Lato', sans-serif", boxSizing: 'border-box' }}
                        />
                    </div>
                    <button
                        type="submit"
                        disabled={loading}
                        style={{
                            marginTop: '8px',
                            padding: '12px',
                            backgroundColor: '#C9954A',
                            color: 'white',
                            border: 'none',
                            borderRadius: '4px',
                            fontFamily: "'Lato', sans-serif",
                            fontWeight: 600,
                            cursor: loading ? 'not-allowed' : 'pointer',
                            opacity: loading ? 0.7 : 1
                        }}
                    >
                        {loading ? 'Procesando...' : (isRegistering ? 'Registrarse' : 'Ingresar')}
                    </button>
                </form>

                <div style={{ marginTop: '24px', textAlign: 'center' }}>
                    <button
                        onClick={() => {
                            setIsRegistering(!isRegistering)
                            setError(null)
                            setMessage(null)
                        }}
                        style={{
                            background: 'none',
                            border: 'none',
                            color: '#C9954A',
                            fontFamily: "'Lato', sans-serif",
                            fontSize: '0.9rem',
                            cursor: 'pointer',
                            textDecoration: 'underline'
                        }}
                    >
                        {isRegistering ? '¿Ya tienes cuenta? Inicia Sesión' : '¿No tienes cuenta? Regístrate'}
                    </button>
                </div>
            </div>
        </div>
    )
}
