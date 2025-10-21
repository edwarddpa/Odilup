import React, { useContext, useEffect, useState } from 'react'
import { UserContext } from '../context/UserContext'
import { CartContext } from '../context/CartContext'
import { GlobalContext } from '../context/GlobalContext'
import toast from 'react-hot-toast'

const Profile = () => {
  const { handleLogout, user, getFavoritos, deleteFavoritos} = useContext(UserContext)
  const { cart } = useContext(CartContext)
  const { categories, price, imgUrl, description, title, setTitle, setDescription, setImgUrl, setPrice, setCategories, handleCreateTattoo, pending, fetchPending, handleApprove, getUserTattoos, myTattoos, setMyTattoos, deleteUserTattoo, handleDeleteTattoo} = useContext(GlobalContext)

    useEffect(() => {
      if (user?.id) {
        getFavoritos()
      }
    }, [user?.id])

    useEffect(() => {
      if (user?.admin) fetchPending()
    }, [user?.admin])

    useEffect(() => {
      const load = async () => {
        if (!user?.id) return
        const rows = await getUserTattoos()
        setMyTattoos(rows)
      }
      load()
    }, [user?.id])



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
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-1">{user.username}</h2>
          <p className="text-gray-500 dark:text-gray-300 mb-4">{user.email}</p>
        </div>

       

        <div className="divider">Favoritos</div>
        <div className="px-8 pb-4">
          {!user.favorites || user.favorites.length === 0 ? (
            <p className="text-gray-400 text-center">No tienes favoritos aún.</p>
          ) : (
            <ul className="space-y-2">
              {user.favorites.map((fav) => (
                <li key={fav.id} className="flex justify-between items-center">
                  <div className="flex items-center gap-3">
                    <span>{fav.name}</span>
                  </div>
                  <span className="badge badge-primary">${fav.price || " (por asignar)"}</span>
                  <button className="btn btn-sm btn-error" onClick={() => deleteFavoritos(fav.id)}>Eliminar</button>
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
              {cart.map((tat) => (
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

           <div className="divider">Solicitudes personalizadas (Crear tattoo)</div>
        <div className="px-8 pb-4">
          <form onSubmit={handleCreateTattoo} className="flex flex-col gap-2">
            <input value={title} onChange={e => setTitle(e.target.value)} type="text" placeholder="Nombre del tattoo" className="input input-bordered" />
            <textarea value={description} onChange={e => setDescription(e.target.value)} className="textarea textarea-bordered" placeholder="Descripción..." rows={3} />
            <input value={imgUrl} onChange={e => setImgUrl(e.target.value)} type="url" placeholder="URL de la imagen (opcional)" className="input input-bordered" />
            <input value={categories} onChange={e => setCategories(e.target.value)} type="text" placeholder="Categorías (separadas por coma)" className="input input-bordered" />
            <div className="flex justify-end">
              <button className="btn btn-primary my-2" type="submit">Enviar solicitud / Crear tattoo</button>
            </div>
          </form>
        </div>

        {user?.admin && (
      <>
      <div className="divider">Panel Admin - Solicitudes</div>
      <div className="px-8 pb-4">
        {pending.length === 0 ? <p>No hay solicitudes pendientes.</p> :
          <ul className="space-y-3">
            {pending.map(t => {
              const imgSrc = t.design_url || t.img || "https://placehold.co/400";
              return (
                <li key={t.id} className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 bg-base-100 p-3 rounded shadow-sm">
                  <div className="flex items-start gap-4">
                    <img src={imgSrc} alt={t.name} className="w-28 h-20 object-cover rounded" />
                    <div>
                      <div className="font-semibold">{t.name}</div>
                      <div className="text-sm text-gray-500">{t.description}</div>
                      {t.categories?.length > 0 && <div className="text-xs text-gray-400 mt-1">{t.categories.join(", ")}</div>}
                    </div>
                  </div>
                  <div className="flex items-center gap-2 mt-2 md:mt-0">
                    <input
                      type="number"
                      step="0.01"
                      min="0"
                      placeholder="Precio (ej. 45.00)"
                      value={price[t.id] ?? ""}
                      onChange={e => setPrice(prev => ({ ...prev, [t.id]: e.target.value }))}
                      className="input input-sm w-32"
                    />
                    <button
                      className="btn btn-sm btn-success"
                      onClick={() => {
                        const p = price[t.id]
                        if (!p) return alert("Introduce un precio antes de aprobar")
                        handleApprove(t.id, Number(p))
                      }}
                    >
                      Aprobar y Pautar precio
                    </button>
                  </div>
                </li>
              )
            })}
          </ul>
        }
      </div>
    </>
    )}

      <div className="divider">Mis solicitudes / Mis tattoos</div>
      <div className="px-8 pb-4">
        {myTattoos.length === 0 ? <p>No tienes solicitudes.</p> :
          <ul>
            {myTattoos.map(t => (
              <li key={t.id} className="flex justify-between items-center">
                 <div>
                   <div className="font-semibold">{t.name} {t.approved ? <span className="text-sm text-green-500"> (Aprobado)</span> : <span className="text-sm text-yellow-500"> (Pendiente)</span>}</div>
                   <div className="text-sm text-gray-500">{t.description}</div>
                 </div>
                 <div className="flex items-center gap-2">
                   {t.approved ? <span className="badge badge-primary">${t.price}</span> : <span className="badge badge-ghost">Precio por asignar</span>}
                   <button className="btn btn-sm btn-error" onClick={() => handleDeleteTattoo(t.id)}>Eliminar</button>
                 </div>
              </li>
            ))}
          </ul>
        }
      </div>

      </div>

      
    </section>
  )
}

export default Profile
