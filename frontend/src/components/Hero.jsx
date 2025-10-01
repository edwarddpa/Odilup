import React from 'react'
import lunaodilup from '../assets/lunaodilup.png';

const Hero = () => {
  return (
<div
  className="hero min-h-screen"
  style={{
    backgroundImage: `url(${lunaodilup})`,
  }}
>
  <div className="hero-overlay"></div>
  <div className="hero-content text-neutral-content text-center">
    <div className="max-w-md">
      <h1 className="mb-5 text-5xl font-bold">Explora diseños únicos, creados por artistas reales</h1>
      <p className="mb-5">
        Descubre tatuajes originales, reserva con artistas, o compra diseños digitales listos para entintar.
      </p>
      <button className="btn btn-primary">Comenzar</button>
    </div>
  </div>
</div>
  )
}

export default Hero
