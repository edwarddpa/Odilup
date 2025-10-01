import React, { useContext, useState } from 'react'
import { CartContext } from '../context/CartContext'
import { UserContext } from '../context/UserContext'
import toast from 'react-hot-toast'

const CardTattoo = ({ id, desc, name, price, categories, img }) => {
  const { sumar } = useContext(CartContext)
  const { token, addFavorito } = useContext(UserContext)
  const [favorito, setFavorito] = useState(false);

  const handleSubmit = () => {
    if (!token) {
      toast.error("Debes iniciar sesión para agendar un tattoo.")
      return
    }
    toast.success("Tattoo agendado con exito!")
    sumar({ id, name, price, desc, categories, img })
  }

  const handleSubmitFavoritos = () => {
    if (!token) {
      toast.error("Debes iniciar sesión para guardar en favoritos.")
      return
    }
    if (!favorito) {
      addFavorito({ id, name, price, desc, categories, img })
      toast.success("Tattoo agregado a favoritos!")
    }
    setFavorito(!favorito)
  }

  return (
    <div className="card bg-base-100 w-96 shadow-sm">
      <figure>
        <img
          src={img}
          alt={name} />
      </figure>
      <div className="card-body">
        <h2 className="card-title">{name}</h2>
        <div className="card-actions justify-start">
          <div className="badge badge-outline badge-info">{categories[0]}</div>
          <div className="badge badge-outline badge-info">{categories[1]}</div>
        </div>
        <p>{desc}</p>
        <div className="badge badge-soft badge-accent">${price}</div>
        <div className="card-actions justify-between items-center ">
          <div className="gap-1">
            {favorito ? (
              <i className="fa-solid fa-heart fa-2xl text-red-500" onClick={handleSubmitFavoritos}></i>
            ) : (
              <i className="fa-regular fa-heart fa-2xl" onClick={handleSubmitFavoritos}></i>
            )}
          </div>
          <div className="card-actions justify-end">
            <button className="btn btn-primary" onClick={handleSubmit}>
              Agendar cita
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default CardTattoo
