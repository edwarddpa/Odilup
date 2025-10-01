import React, { useContext, useState } from 'react'
import { UserContext } from '../context/UserContext'
import { CartContext } from '../context/CartContext'

const Profile = () => {
  const { user, handleLogout, handleAddSolicitud, handleSolicitudChange, solicitudes, solicitud, url, setUrl } = useContext(UserContext)
  const { cart } = useContext(CartContext)


  if (!user) {
    return (
      <section className="flex flex-col items-center justify-center min-h-screen bg-base-200 py-10">
        <div className="card w-full max-w-md bg-base-100 shadow-xl p-8">
          <h2 className="text-2xl font-bold text-center mb-4">Perfil</h2>
          <p className="text-center text-gray-500">Debes iniciar sesión para ver tu perfil.</p>
        </div>
      </section>
    )
  }

  return (
    <section className="flex flex-col items-center justify-center min-h-screen bg-base-200 py-10">
      <div className="card w-full max-w-md bg-base-100 shadow-xl">
        <div className="flex flex-col items-center p-8">
          <img
            src={user.avatar || "/odilup-logo.jpg"}
            alt="Avatar"
            className="w-24 h-24 rounded-full mb-4 border-4 border-primary object-cover"
          />
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-1">{user.nombre}</h2>
          <p className="text-gray-500 dark:text-gray-300 mb-4">{user.email}</p>
        </div>
        <div className="divider">Favoritos</div>
        <div className="px-8 pb-4">
          {!user.favoritos || user.favoritos.length === 0 ? (
            <p className="text-gray-400 text-center">No tienes favoritos aún.</p>
          ) : (
            <ul className="space-y-2">
              {user.favoritos.map((fav, idx) => (
                <li key={idx} className="flex justify-between items-center">
                  <span>{fav.name}</span>
                  <span className="badge badge-primary">${fav.price}</span>
                </li>
              ))}
            </ul>
          )}
        </div>

        <div className="divider">Tatuajes Agendados</div>
            <div className="px-8 pb-8">
              {cart.length === 0 ? (
              <p className="text-gray-400 text-center">No tienes tatuajes agendados.</p>
              ) : (
              <ul className="space-y-2">
                {cart.map((tat, idx) => (
                <li key={tat.id} className="flex justify-between items-center">
                  <div>
                    <span className="font-semibold">{tat.name}</span>
                    <span className="ml-2 text-xs text-gray-400">x{tat.count}</span>
                  </div>
                  <span className="badge badge-secondary">${tat.price * tat.count}</span>
                </li>
              ))}
            </ul>
          )}
        </div>
        <div className="divider">Solicitudes Personalizadas</div>
          
          <div className="px-8 pb-8">
            <h2 className='text-sm font-semibold mb-1'>Aquí podrás enviar tu idea para tu tattoo</h2>
            <form onSubmit={handleAddSolicitud} className="flex flex-col gap-2">
              <input type="text" placeholder="Nombre" className="input input-xs" />
              <textarea
                className="textarea textarea-bordered"
                placeholder="Describe tu idea de tatuaje..."
                value={solicitud}
                onChange={handleSolicitudChange}
                rows={3}
              />
              <label className="input validator">
                <i class="fa-solid fa-link"></i>
              <input
                type="url"
                required
                placeholder="https:// (añade tu imagen referencial via URL)"
                value={url}
                onChange={e => setUrl(e.target.value)}
                pattern="^(https?://)?([a-zA-Z0-9]([a-zA-Z0-9\-].*[a-zA-Z0-9])?\.)+[a-zA-Z].*$"
                title="Must be valid URL"
              />
              </label>
              <p className="validator-hint">Must be valid URL</p>
                <button className="btn btn-primary self-end" type="submit">
                  Enviar solicitud
                </button>
              </form>
              {solicitudes.length > 0 && (
              <ul className="mt-4 space-y-2">
                {solicitudes.map((s, idx) => (
                  <li key={idx} className="bg-base-200 rounded p-2 text-sm">
                    <div className="font-semibold">{s.nombre}</div>
                    <div>{s.descripcion}</div>
                    {s.url && (
                      <a href={s.url} target="_blank" rel="noopener noreferrer" className="text-blue-500 underline break-all">{s.url}</a>
                    )}
                  </li>
                ))}
              </ul>
            )}
          </div>
          </div>
      </section> 
  )
}
          

export default Profile
