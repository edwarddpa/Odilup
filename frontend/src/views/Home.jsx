import React, { use, useContext } from 'react'
import Hero from '../components/Hero'
import Card from '../components/Card'
import { GlobalContext } from '../context/GlobalContext'
import CardTattoo from '../components/CardTattoo'



const Home = () => {

    const { listaTattoos } = useContext(GlobalContext)

  /*  const cards = [
            {
                title: "Construyendo un Legado",
                description: "Conoce más sobre mi experiencia profesional, mis logros y los oficios que han marcado mi trayectoria.",
                button: "Ver más",
                img: "../public/Bio.png"
            },
            {
                title: "Un viaje creativo e innovador",
                description: "Descubre mis logros más significativos y los proyectos que han dejado huella en mi vida.",
                button: "Proyectos",
                img: "../public/project.png"
            },
            {
                title: "Mi Presencia Digital",
                description: "Conéctate conmigo a través de mis plataformas digitales y establece un canal directo de comunicación.",
                button: "Contáctame",
                img: "../public/contact.png"
            }
        ]
*/

  return (
    <div>
        
        <Hero />

          <h2 className='text-center text-2xl font-bold my-4'>Galería de Tattoos</h2>
        <div className='flex flex-wrap justify-center gap-4 p-4'>

        {listaTattoos.map((tattoo, index) => (
          <CardTattoo
          key={index}
          id={tattoo.id}
          desc={tattoo.desc}
          name={tattoo.name}
          price={tattoo.price}
          categories={tattoo.categories}
          img={tattoo.img}
           />
          ))}



        </div>
    </div>
  )
}

export default Home
