import React from 'react'
import { Link } from 'react-router-dom'

const NotFound = () => {
  return (
    <section className="flex flex-col items-center justify-center min-h-screen bg-base-200">
      <div className="card bg-base-100 shadow-xl p-8 max-w-md w-full text-center">
        <img
          src="/odilup-logo.jpg"
          alt="Odilup Logo"
          className="w-24 h-24 mx-auto mb-6 rounded-full border-4 border-primary"
        />
        <h1 className="text-4xl font-bold text-primary mb-2">404</h1>
        <h2 className="text-2xl font-semibold mb-4">Página no encontrada</h2>
        <p className="text-gray-500 mb-6">
          Lo sentimos, la página que buscas no existe o fue movida.
        </p>
        <Link to="/" className="btn btn-primary">
          Volver al inicio
        </Link>
      </div>
    </section>
  )
}

export default NotFound
