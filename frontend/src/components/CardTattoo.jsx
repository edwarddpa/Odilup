import React, { useContext, useEffect, useState } from 'react'
import { CartContext } from '../context/CartContext'
import { UserContext } from '../context/UserContext'
import toast from 'react-hot-toast'

const CardTattoo = ({ id, desc, name, price, categories, img, hideActions = false }) => {
  const { sumar } = useContext(CartContext)
  const { token, addFavorito, deleteFavoritos, user } = useContext(UserContext)
  const [favorito, setFavorito] = useState(false)

  useEffect(() => {
    // marcar corazón si el tattoo está en los favoritos del usuario
    const isFav = !!user?.favorites?.some(f => Number(f.id) === Number(id))
    setFavorito(isFav)
  }, [user, id])

  const handleSubmit = () => {
    if (!token) {
      toast.error("Debes iniciar sesión para agendar un tattoo.")
      return
    }
    toast.success("Tattoo agendado con exito!")
    sumar({ id, name, price, desc, categories, img })
  }

  const handleSubmitFavoritos = async () => {
    if (!token) {
      toast.error("Debes iniciar sesión para guardar en favoritos.")
      return
    }

    const previous = favorito
    setFavorito(!previous)

    try {
      if (!previous) {
        const ok = await addFavorito({ id, name, price, desc, categories, img })
        if (!ok) setFavorito(previous) // revertir si falla
      } else {
        const ok = await deleteFavoritos(id)
        if (!ok) setFavorito(previous) // revertir si falla
      }
    } catch (err) {
      console.error("Error al togglear favorito:", err)
      setFavorito(previous)
      toast.error("No se pudo actualizar favorito")
    }
  }

  return (
    <div className="card bg-base-100 w-96 shadow-sm">
      <figure>
        <img src={img} alt={name} />
      </figure>
      <div className="card-body">
        <h2 className="card-title">{name}</h2>
        <div className="card-actions justify-start">
          {categories?.[0] && <div className="badge badge-outline badge-info">{categories[0]}</div>}
          {categories?.[1] && <div className="badge badge-outline badge-info">{categories[1]}</div>}
        </div>
        <p>{desc}</p>

        {/* precio: solo si NO hideActions */}
        {!hideActions && (
          <div className="badge badge-soft badge-accent">${price}</div>
        )}

        <div className="card-actions justify-between items-center ">
          <div className="gap-1">
            {favorito ? (
              <i className="fa-solid fa-heart fa-2xl text-red-500" onClick={handleSubmitFavoritos}></i>
            ) : (
              <i className="fa-regular fa-heart fa-2xl" onClick={handleSubmitFavoritos}></i>
            )}
          </div>

          {/* botón Agendar: solo si NO hideActions */}
          {!hideActions && (
            <div className="card-actions justify-end">
              <button className="btn btn-primary" onClick={handleSubmit}>
                Agendar cita
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default CardTattoo
