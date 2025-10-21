import { useContext } from 'react'
import Hero from '../components/Hero'
import { GlobalContext } from '../context/GlobalContext'
import CardTattoo from '../components/CardTattoo'


const Home = () => {

    const { listaTattoos, tattoos } = useContext(GlobalContext)

  return (
    <div>
        
        <Hero />

          <h2 className='text-center text-2xl font-bold my-4'>Galería de Tattoos</h2>
        <div id="tattoo-gallery" className='flex flex-wrap justify-center gap-4 p-4'>

        {Array.isArray(tattoos.results) && tattoos.results.map(results => (
          <CardTattoo
          key={results.id}
          id={results.id}
          desc={results.description}
          name={results.name}
          price={results.price}
          categories={results.categories}
          img={results.img}
          />
        ))}
        </div>

          <h2 className='text-2xl font-bold my-4 ml-8'>Necesitas inspiración para tu próximo tattoo? mira las solicitudes de otros usuarios</h2>

          <div className='flex flex-wrap justify-center gap-4 p-4'>
            {Array.isArray(tattoos.inspiration) && tattoos.inspiration.map(results => (
              <CardTattoo
                key={results.id}
                id={results.id}
                desc={results.description}
                name={results.name}
                price={results.price}
                categories={results.categories}
                img={results.img}
                hideActions={true}
              />
            ))}
          </div>

    </div>
  )
}

export default Home
