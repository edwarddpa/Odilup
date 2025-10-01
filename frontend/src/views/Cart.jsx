import React, { useContext, useState } from 'react'
import { CartContext } from '../context/CartContext'
import { useNavigate } from 'react-router-dom'
import "cally"
import toast from 'react-hot-toast'

const Cart = () => {
  const { cart, sumar, restar, precioTotal } = useContext(CartContext)
  const [selectedDate, setSelectedDate] = useState("")
  const navigate = useNavigate()

  const handlePayment = () => {
    if (!selectedDate) {
      toast.error("Por favor selecciona una fecha antes de proceder con el pago.")
      return
    }
    document.getElementById('my_modal_5').showModal()
  }

  const handleCloseModal = () => {
    document.getElementById('my_modal_5').close()
    navigate('/')
  }

  return (
    <section className="bg-white py-8 antialiased dark:bg-gray-900 md:py-16">
      <div className="mx-auto max-w-screen-xl px-4 2xl:px-0">
        <h2 className="text-xl font-semibold text-gray-900 dark:text-white sm:text-2xl mt-5">Tu agenda</h2>

        <div className="mt-6 sm:mt-8 md:gap-6 lg:flex lg:items-start xl:gap-8">
          <div className="mx-auto w-full flex-none lg:max-w-2xl xl:max-w-4xl">
            <div className="space-y-6">
              {cart.length === 0 ? (
                <div className="text-center text-gray-500 dark:text-gray-400">No tienes tattoos agendados.</div>
              ) : (
                cart.map((tattoo) => (
                  <div key={tattoo.id} className="rounded-lg border border-gray-200 bg-white p-4 shadow-sm dark:border-gray-700 dark:bg-gray-800 md:p-6">
                    <div className="space-y-4 md:flex md:items-center md:justify-between md:gap-6 md:space-y-0">
                      <div className="shrink-0 md:order-1">
                        <img className="h-20 w-20 rounded" src={tattoo.img} alt={tattoo.name} />
                      </div>
                      <div className="flex items-center justify-between md:order-3 md:justify-end">
                        <div className="flex items-center">
                          <button
                            type="button"
                            className="inline-flex h-5 w-5 items-center justify-center rounded-md border border-gray-300 bg-gray-100 hover:bg-gray-200 dark:border-gray-600 dark:bg-gray-700 dark:hover:bg-gray-600"
                            onClick={() => restar(tattoo.id)}
                          >
                            <span className="text-lg font-bold">-</span>
                          </button>
                          <input
                            type="text"
                            className="w-10 border-0 bg-transparent text-center text-sm font-medium text-gray-900 dark:text-white"
                            value={tattoo.count}
                            readOnly
                          />
                          <button
                            type="button"
                            className="inline-flex h-5 w-5 items-center justify-center rounded-md border border-gray-300 bg-gray-100 hover:bg-gray-200 dark:border-gray-600 dark:bg-gray-700 dark:hover:bg-gray-600"
                            onClick={() => sumar(tattoo)}
                          >
                            <span className="text-lg font-bold">+</span>
                          </button>
                        </div>
                        <div className="text-end md:order-4 md:w-32">
                          <p className="text-base font-bold text-gray-900 dark:text-white">${tattoo.price}</p>
                        </div>
                      </div>
                      <div className="w-full min-w-0 flex-1 space-y-4 md:order-2 md:max-w-md">
                        <div className="text-base font-medium text-gray-900 dark:text-white">{tattoo.name}</div>
                        <div className="text-sm text-gray-500 dark:text-gray-400">{tattoo.desc}</div>
                        <div className="flex gap-2">
                          {tattoo.categories.map((cat, idx) => (
                            <span key={idx} className="badge badge-outline">{cat}</span>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>


          <div className="mx-auto mt-6 max-w-4xl flex-1 space-y-6 lg:mt-0 lg:w-full">
          <div className="my-4">
            <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
              Selecciona una fecha:
            </label>
            <input
              type="date"
              className="input input-bordered"
              value={selectedDate}
              onChange={e => setSelectedDate(e.target.value)}
            />
          </div>
            <div className="space-y-4 rounded-lg border border-gray-200 bg-white p-4 shadow-sm dark:border-gray-700 dark:bg-gray-800 sm:p-6">
              <p className="text-xl font-semibold text-gray-900 dark:text-white">Resumen</p>
              
              <dl className="flex items-center justify-between gap-4 border-t border-gray-200 pt-2 dark:border-gray-700">
                <dt className="text-base font-bold text-gray-900 dark:text-white">Total</dt>
                <dd className="text-base font-bold text-gray-900 dark:text-white">${precioTotal}</dd>
              </dl>

              {/* Resumen de tattoos agendados */}
              <div className="mt-4 space-y-2">
                {cart.map((tattoo) => (
                  <div key={tattoo.id} className="flex justify-between text-sm text-gray-700 dark:text-gray-200">
                    <span>{tattoo.name} <span className="text-xs text-gray-400">x{tattoo.count}</span></span>
                    <span>${(tattoo.price * tattoo.count).toLocaleString("es-VE")}</span>
                  </div>
                ))}
              </div>

              
              <button className="btn" onClick={handlePayment}>Proceder con el pago</button>
              <dialog id="my_modal_5" className="modal modal-bottom sm:modal-middle">
                <div className="modal-box">
                  <h3 className="font-bold text-lg mb-2">Factura</h3>
                  <div className="mb-2">
                    <span className="font-semibold">Fecha agendada:</span>{" "}
                    <span>{selectedDate ? selectedDate : "No seleccionada"}</span>
                  </div>
                  <div className="mb-4">
                    <span className="font-semibold">Tatuajes agendados:</span>
                    <ul className="mt-2 space-y-1">
                      {cart.map((tattoo) => (
                        <li key={tattoo.id} className="flex justify-between">
                          <span>
                            {tattoo.name} <span className="text-xs text-gray-400">x{tattoo.count}</span>
                          </span>
                          <span>${(tattoo.price * tattoo.count).toLocaleString("es-VE")}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                  <div className="flex justify-between border-t pt-2 font-bold">
                    <span>Total:</span>
                    <span>${precioTotal}</span>
                  </div>
                  <div className="modal-action">
                    <button className="btn" onClick={handleCloseModal}>Cerrar</button>
                  </div>
                </div>
              </dialog>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default Cart
