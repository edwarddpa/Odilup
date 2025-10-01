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

    const addFavorito = (tattoo) => {
        setUser(prev => ({
        ...prev,
        favoritos: prev.favoritos
        ? [...prev.favoritos, tattoo]
        : [tattoo]
    }))
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
        if (token) {
          fetch("http://localhost:5000/api/auth/me", {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          })
            .then((response) => response.json())
            .then((data) => setUser(data));
        }
      }, []);

    // LOGIN

    const handleSubmitLogin = async (e) => {
        e.preventDefault()
        console.log("Email:", email, "Password:", password);
        if (nombre === "" || email === "" || password === "" || password.length < 6) {
          console.log('Todos los campos son obligatorios')
          toast.error("Datos introducidos incorrectamente")
          return false
        }
        console.log('Formulario enviado')
        console.log(email, password)
        const response = await fetch("http://localhost:5000/api/auth/login", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ password, email }),
        });
    
        const data = await response.json()
        if (data.token) {
            toast.success("Sesión iniciada con éxito")
            localStorage.setItem("token", data.token)
            setToken(true) // Actualiza el estado del token
            setUser({ email, password, nombre })
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
            console.log('Las contraseñas no coinciden')
            console.log('Todos los campos son obligatorios')
            setError(true)
            toast.error("Datos introducidos incorrectamente")
            return false
        }
        else {
          console.log('Formulario enviado')
          console.log({email, password})

            const response = await fetch("http://localhost:5000/api/auth/register",
            {
                method: "POST",
                headers: {"Content-Type": "application/json"},
                body: JSON.stringify({email, password})
            }
        )
            const data = await response.json()
            if (data.token) {
                toast.success("Usuario registrado con éxito")
                localStorage.setItem("token", data.token)
                setToken(true) // Actualiza el estado del token
                setUser({ email, password, nombre })
                navegar("/")
                setError(false)
            } else {
                toast.error(data?.error || "Error al registrar el usuario")
            }
        }
    }


    return(
        <UserContext.Provider value={{token, setToken, addFavorito, handleAddSolicitud, handleSolicitudChange, solicitudes, solicitud, url, setUrl, handleSubmitRegister, handleSubmitLogin, email, password, confirmPassword, handleChangePassword, handleChangeNombre, handleChangeEmail, handleChangeConfirmPassword, nombre, user, setUser, setUserIsLogged, userIsLogged, handleLogout}} >
            {children}
        </UserContext.Provider>
    )
}

export default UserProvider