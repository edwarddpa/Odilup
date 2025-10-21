import { createContext, useEffect, useState } from "react"
import toast from "react-hot-toast"


export const GlobalContext = createContext()

const GlobalProvider = ({ children }) => {
    const [listaTattoos, setListaTattoos] = useState([])
    const [tattoos, setTattoos] = useState([])
    const [products, setProducts] = useState([])
    
    const [pending, setPending] = useState([])
    const [myTattoos, setMyTattoos] = useState([])

    // campos del formulario para crear tattoo
      const [title, setTitle] = useState('')
      const [description, setDescription] = useState('')
      const [imgUrl, setImgUrl] = useState('')
      const [price, setPrice] = useState('')
      const [categories, setCategories] = useState('')
    
      
      const handleDeleteTattoo = async (id) => {
       const ok = await deleteUserTattoo(id)
       if (ok) {
        const rows = await getUserTattoos()
        setMyTattoos(rows || [])
       }
      }

    
      const handleCreateTattoo = async (e) => {
        e.preventDefault()
        if (!title.trim() || !description.trim()) {
          toast.error("Completa nombre, descripción")
          return
        }
        const tattoo = {
          name: title.trim(),
          description: description.trim(),
          img: imgUrl.trim() || undefined,
          categories: categories ? categories.split(",").map(c => c.trim()) : []
        }
        const result = await createTattoos(tattoo)
        if (result) {
          // limpiar formulario
          setTitle('')
          setDescription('')
          setImgUrl('')
          setPrice('')
          setCategories('')
        }
      }

        const handleApprove = async (tattooId, price) => {
      const token = localStorage.getItem("token")
      if (!token) return toast.error("No autorizado")
      try {
        const res = await fetch(`http://localhost:3000/api/tattoos/${tattooId}/approve`, {
          method: "PUT",
          headers: { "Content-Type": "application/json", Authorization: `Bearer ${token}` },
          body: JSON.stringify({ price }) // enviar precio al backend
        })
        const data = await res.json()
        if (!res.ok) {
          toast.error(data?.message || "Error al aprobar")
          return
        }
        toast.success("Tattoo aprobado y precio guardado")
        // refrescar lista de pendientes y listado público
        setPending(prev => prev.filter(t => t.id !== Number(tattooId)))
        getTattoos()
      } catch (err) {
        console.error("approve error:", err)
        toast.error("Error interno")
      }
    }

    const fetchPending = async () => {
    const token = localStorage.getItem("token")
    if (!token) return
    try {
      const res = await fetch("http://localhost:3000/api/tattoos/pending", {
        headers: { Authorization: `Bearer ${token}` }
      })
      const data = await res.json()
      if (res.ok) setPending(data.pending || [])
      else console.error(data)
    } catch (err) {
      console.error("fetchPending error:", err)
    }
  }

    

    const getTattoos = async () => {
      try {
        const response = await fetch ("http://localhost:3000/api/tattoos")
        const data = await response.json()
        console.log("Tattoos desde API:", data) 
        setTattoos(data)
      } catch (error) {
        console.error("Error fetching tattoos:", error)
      }
    }

    const getUserTattoos = async () => {
      const token = localStorage.getItem("token")
      if (!token) return []
      const res = await fetch("http://localhost:3000/api/tattoos/mine", {
      headers: { Authorization: `Bearer ${token}` }
    })
    if (!res.ok) return []
    const data = await res.json()
    return data.tattoos || []
}

    const createTattoos = async (tattoo) => {
      const token = localStorage.getItem("token")
      if (!token) {
        toast.error("Debes iniciar sesión para crear un tattoo")
        return null
      }
      try{
        const res = await fetch("http://localhost:3000/api/tattoos", {
          method: "POST",
          headers: { "Content-Type": "application/json", Authorization: `Bearer ${token}` },
          body: JSON.stringify(tattoo)
        })
        const data = await res.json()
        if (!res.ok) {
          toast.error(data?.message || "Error al crear tattoo")
          return null
        }
        toast.success("Tattoo creado correctamente")
        getTattoos()
        return data
      } catch (error) {
        console.error("createTattoo error:", error)
        toast.error("Error de conexión")
        return null
      }
    }

    const deleteUserTattoo = async (tattooId) => {
      const token = localStorage.getItem("token")
      if (!token) { toast.error("No autorizado"); return false }
      try {
        const res = await fetch(`http://localhost:3000/api/tattoos/${tattooId}`, {
          method: "DELETE",
          headers: { "Content-Type": "application/json", Authorization: `Bearer ${token}` }
        })
        const data = await res.json()
        if (!res.ok) {
          toast.error(data?.message || "Error al eliminar")
          return false
        }
        toast.success("Tatuaje eliminado")
        // refrescar mis tattoos y listado público
        getTattoos()
        return true
      } catch (err) {
        console.error("deleteUserTattoo error:", err)
        toast.error("Error de conexión")
        return false
      }
    }

    useEffect(() => {
        getTattoos()
      }, [])

    return (
        <GlobalContext.Provider value={{ categories, price, imgUrl, description, title, setTitle, setDescription, setImgUrl, setPrice, setCategories, handleCreateTattoo, listaTattoos, createTattoos, setListaTattoos, getTattoos, tattoos, pending, handleApprove, fetchPending, myTattoos, setMyTattoos, getUserTattoos, deleteUserTattoo, handleDeleteTattoo }}>
            {children}
        </GlobalContext.Provider>
    )
}

export default GlobalProvider