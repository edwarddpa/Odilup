import { createContext,  useEffect,  useState } from "react";
import toast from "react-hot-toast";
import useInput from '../hooks/useInput'
import { useNavigate } from "react-router-dom";


export const UserContext = createContext()

const UserProvider = ({ children }) => {
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [nombre, setNombre] = useState('')
    const [confirmPassword, setConfirmPassword] = useState('')
    const [error, setError] = useState(false)
    const [user, setUser] = useState(null)
    const [userIsLogged, setUserIsLogged] = useState(false)
    
    const [token, setToken] = useState(() => {
        const storedToken = localStorage.getItem("token");
        return storedToken ? true : false;
    })

    // Estado para solicitudes personalizadas
    const [solicitudes, setSolicitudes] = useState([])
    const [solicitud, setSolicitud] = useState("")
    const [url, setUrl] = useState("")
    
    const navegar = useNavigate()

    const addFavorito = async (tattoo) => {
      const token = localStorage.getItem("token")
      if (!token) {
        toast.error("Debes iniciar sesión")
        return false
      }
      try {
        const res = await fetch("http://localhost:3000/api/favorites", {
          method: "POST",
          headers: { "Content-Type": "application/json", Authorization: `Bearer ${token}` },
          body: JSON.stringify({ tattooId: tattoo.id })
        })
        const data = await res.json()
        if (!res.ok) {
          toast.error(data?.message || "Error al agregar favorito")
          return false
        }
        setUser(prev => ({ ...prev, favorites: data.favorites }))
        toast.success("Favorito agregado")
        return true
      } catch (err) {
        console.error("addFavorito error:", err)
        toast.error("Error de conexión")
        return false
      }
    }

    const getFavoritos = async (tattoo) => {
      const token = localStorage.getItem("token")
      if (!token) return toast.error("Debes iniciar sesión")
      const res = await fetch("http://localhost:3000/api/favorites", {
        method: "GET",
        headers: { "Content-Type": "application/json", Authorization: `Bearer ${token}` },
      })
      const data = await res.json()
      if (!res.ok) return toast.error(data?.message || "Error")
      setUser(prev => ({ ...prev, favorites: data.favorites })) // actualizar UI
    }

    const deleteFavoritos = async (tattooId) => {
      const token = localStorage.getItem("token")
      if (!token) {
        toast.error("Debes iniciar sesión")
        return false
      }
      try {
        const res = await fetch(`http://localhost:3000/api/favorites/${tattooId}`, {
          method: "DELETE",
          headers: { "Content-Type": "application/json", Authorization: `Bearer ${token}` },
        })
        const data = await res.json()
        if (!res.ok) {
          toast.error(data?.message || "Error al eliminar favorito")
          return false
        }
        setUser(prev => ({ ...prev, favorites: data.favorites }))
        toast.success("Favorito eliminado")
        return true
      } catch (err) {
        console.error("deleteFavoritos error:", err)
        toast.error("Error de conexión")
        return false
      }
    }

  const handleSolicitudChange = (e) => setSolicitud(e.target.value)

  const handleAddSolicitud = (e) => {
    e.preventDefault()
    if (solicitud.trim() === "") return
    setSolicitudes([...solicitudes, solicitud])
    setSolicitud("")
    setUrl("") // limpia el input de url
  }

    // USER PROFILE

    useEffect(() => {
        const storedToken = localStorage.getItem("token")
        if (storedToken) {
          fetch("http://localhost:3000/api/users/me", {
            headers: {
              Authorization: `Bearer ${storedToken}`,
            },
          })
            .then((response) => response.json())
            .then((data) => setUser(data));
        }
      }, [token]);

    // LOGIN

    const handleSubmitLogin = async (e) => {
        e.preventDefault()
        console.log("Email:", email, "Password:", password);
        if ( email === "" || password === "" || password.length < 6) {
          console.log('Todos los campos son obligatorios')
          toast.error("Datos introducidos incorrectamente")
          return false
        }
        console.log('Formulario enviado')
        console.log(email, password)
        const response = await fetch("http://localhost:3000/api/users/login", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ password, email}),
        });
    
        const data = await response.json()
        if (data.token) {
            toast.success("Sesión iniciada con éxito")
            localStorage.setItem("token", data.token)
            setToken(true) // Actualiza el estado del token
            setUser({ email, password})
            navegar("/")
            setError(false)
        } else {
            toast.error(data?.error || "Error al iniciar sesión")
        }
    }
    

    // LOGOUT

    const handleLogout = () => {
        setUser(null)
        setToken(false)
        localStorage.removeItem("token")
        navegar("/")
    }
    
    const handleChangePassword = (e) => {
        setPassword(e.target.value)      
    }
    
    const handleChangeNombre = (e) => {
        setNombre(e.target.value)
        console.log
    }
    
    const handleChangeEmail = (e) => {
        setEmail(e.target.value)
    }
    
    const handleChangeConfirmPassword = (e) => {
        setConfirmPassword(e.target.value)
    }
    
    // REGISTER

    const handleSubmitRegister = async (e) => {
        e.preventDefault()
        if (nombre === "" || email === "" || password === "" || confirmPassword === "" || password !== confirmPassword || password.length < 6) {
            setError(true)
            toast.error("Datos introducidos incorrectamente")
            return false
        }
        const response = await fetch("http://localhost:3000/api/users/register", {
            method: "POST",
            headers: {"Content-Type": "application/json"},
            body: JSON.stringify({email, password, nombre})
        })
        const data = await response.json()
        if (response.status === 201) {
            toast.success("Usuario registrado con éxito")
            // Login automático para obtener token y perfil
            const loginResponse = await fetch("http://localhost:3000/api/users/login", {
                method: "POST",
                headers: {"Content-Type": "application/json"},
                body: JSON.stringify({email, password})
            })
            const loginData = await loginResponse.json()
            if (loginData.token) {
                localStorage.setItem("token", loginData.token)
                setToken(loginData.token)
                // Obtener perfil con el token
                fetch("http://localhost:3000/api/users/me", {
                    headers: {
                        Authorization: `Bearer ${loginData.token}`,
                    },
                })
                .then((response) => response.json())
                .then((profile) => setUser(profile))
                navegar("/")
                setError(false)
            } else {
                toast.error(loginData?.error || "Error al iniciar sesión después del registro")
            }
        } else {
            toast.error(data?.error || "Error al registrar el usuario")
        }
    }


    return(
        <UserContext.Provider value={{token, setToken, deleteFavoritos, getFavoritos, addFavorito, handleAddSolicitud, handleSolicitudChange, solicitudes, solicitud, url, setUrl, handleSubmitRegister, handleSubmitLogin, email, password, confirmPassword, handleChangePassword, handleChangeNombre, handleChangeEmail, handleChangeConfirmPassword, nombre, user, setUser, setUserIsLogged, userIsLogged, handleLogout}} >
            {children}
        </UserContext.Provider>
    )
}

export default UserProvider