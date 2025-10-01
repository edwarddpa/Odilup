import React from 'react'

const Projects = () => {
  return (
    <section className="flex flex-col items-center justify-center min-h-screen bg-base-200 py-10">
      <div className="card w-full max-w-5xl bg-base-100 shadow-xl p-8">
        <h1 className="text-3xl font-bold text-primary text-center mb-4">Mis Proyectos</h1>
        <p className="mb-8 text-justify text-gray-600">
          Cada uno de mis proyectos refleja mi pasión por la innovación y el deseo de crear experiencias únicas. A través de diversas disciplinas, desde el desarrollo de aplicaciones hasta la escritura, busco explorar nuevas formas de conectar con las personas y transformar ideas en realidades.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-10">
          <div>
            <h2 className="text-2xl font-semibold text-center mb-4">Aplicaciones Publicadas</h2>
            <div className="card bg-base-200 shadow p-4 mb-6">
              <a href="https://play.google.com/store/apps/details?id=appinventor.ai_jhonpulidob.Arttatoo" target="_blank" rel="noopener noreferrer">
                <img src="../jpartink.png" alt="JPartInk" className="rounded-lg mx-auto mb-4  h-40 object-contain" />
              </a>
              <h5 className="text-lg font-bold mb-2 text-center">Art Tattoo</h5>
              <p className="text-sm text-justify mb-2">
                Primera versión, desarrollada con MIT App Inventor, que estima el costo de un tatuaje en dólares basado en las dimensiones y datos proporcionados por el usuario. Los precios son aproximados y pueden variar según la técnica, la reputación del artista y otros factores adicionales. Ideal para obtener una referencia inicial antes de consultar a un tatuador.
              </p>
              <a href="https://play.google.com/store/apps/details?id=appinventor.ai_jhonpulidob.Arttatoo" target="_blank" rel="noopener noreferrer" className="btn btn-outline btn-primary w-full mt-2">
                Ver en Google Play
              </a>
            </div>
          </div>
          <div>
            <h2 className="text-2xl font-semibold text-center mb-4">Desarrollo de Games</h2>
            <div className="card bg-base-200 shadow p-4 mb-6">
              <img src="../Energex.gif" alt="Energex" className="rounded-lg mx-auto mb-4  h-40 object-contain" />
              <h5 className="text-lg font-bold mb-2 text-center">Juego "Energex"</h5>
              <p className="text-sm text-justify mb-2">
                "Energex" es un proyecto independiente que se encuentra actualmente en su fase de creación. Este juego, que combina acción y estrategia, está diseñado para ofrecer una experiencia inmersiva tanto en PC como en otras plataformas. El objetivo es proporcionar a los jugadores desafíos emocionantes, mecánicas de juego innovadoras y una historia.
              </p>
            </div>
          </div>
        </div>

        <div className="divider">Libros en Desarrollo</div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Libro 1 */}
          <div className="card bg-base-200 shadow p-4">
            <img src="../El_Arca.jpg" alt="El Arca" className="rounded-lg mx-auto mb-4 h-40 object-contain cursor-pointer" />
            <h5 className="text-lg font-bold mb-1">"El Arca"</h5>
            <div className='flex gap-2 mt-1'>
              <div className="badge badge-soft badge-info">Ficción</div>
              <div className="badge badge-soft badge-info">Suspenso</div>
              <div className="badge badge-soft badge-info">Misterio</div>
            </div>
            <p className="text-sm text-justify mt-2">
              Una expedición al imponente pico El Kaçkar se convierte en una lucha por la supervivencia cuando un grupo de especialistas en turismo y aventuras descubre una estructura desconocida y una criatura que desafía las leyes de la ciencia. Atrapados en un entorno cada vez más hostil, deberán enfrentar lo inexplicable mientras desentrañan los secretos ocultos en las profundidades de la montaña.
            </p>
          </div>
          {/* Libro 2 */}
          <div className="card bg-base-200 shadow p-4">
            <img src="../Del_Acero_Al_Vidrio.jpg" alt="El Cambio del Acero al Vidrio" className="rounded-lg mx-auto mb-4 h-40 object-contain cursor-pointer" />
            <h5 className="text-lg font-bold mb-1">"El Cambio del Acero al Vidrio"</h5>
            <div className='flex gap-2 mt-1'>
              <div className="badge badge-soft badge-info">Evolución emocional</div>
              <div className="badge badge-soft badge-info">Reflexión crítica</div>
            </div>
            <p className="text-sm text-justify mt-2">
              Un libro técnico y educativo que explora la transformación de la fortaleza emocional y su impacto en la identidad. A través de una profunda analogía, compara la resistencia del acero con la fragilidad del vidrio, analizando cómo la aceptación pasiva ha reemplazado la firmeza e integridad.
            </p>
          </div>
          {/* Libro 3 */}
          <div className="card bg-base-200 shadow p-4">
            <img src="../La_Foto.jpg" alt="La Foto" className="rounded-lg mx-auto mb-4 h-40 object-contain cursor-pointer" />
            <h5 className="text-lg font-bold mb-1">"La Foto"</h5>
            <div className='flex gap-2 mt-1'>
              <div className="badge badge-soft badge-info">Crimen</div>
              <div className="badge badge-soft badge-info">Intriga</div>
              <div className="badge badge-soft badge-info">Conspiración</div>
            </div>
            <p className="text-sm text-justify mt-2">
              Un fotógrafo en apuros decide participar en el World Nature Photography, con la esperanza de ganar el premio de un millón de dólares. Se adentra en el Parque Nacional Olympic, buscando capturar la foto perfecta, pero se ve envuelto en una oscura conspiración de alto nivel.
            </p>
          </div>
          {/* Libro 4 */}
          <div className="card bg-base-200 shadow p-4">
            <img src="../Gerencia_de_la_Vida.jpg" alt="La Gerencia de Vivencias" className="rounded-lg mx-auto mb-4 h-40 object-contain cursor-pointer" />
            <h5 className="text-lg font-bold mb-1">"Gerencia de la Vida"</h5>
            <div className='flex gap-2 mt-1'>
              <div className="badge badge-soft badge-info">Desarrolo personal</div>
              <div className="badge badge-soft badge-info">Liderazgo</div>
              <div className="badge badge-soft badge-info">Estrategia</div>
            </div>
            <p className="text-sm text-justify mt-2">
              Cada decisión influye en nuestro futuro. La vida, como una empresa, requiere planificación y estrategia para el éxito. Este libro te enseña a aplicar principios de liderazgo y gerencia en el día a día, convirtiendo desafíos en oportunidades.
            </p>
          </div>
          {/* Libro 5 */}
          <div className="card bg-base-200 shadow p-4">
            <img src="../La_Llegada.jpg" alt="La Llegada" className="rounded-lg mx-auto mb-4 h-40 object-contain cursor-pointer" />
            <h5 className="text-lg font-bold mb-1">"La Llegada"</h5>
            <div className='flex gap-2 mt-1'>
              <div className="badge badge-soft badge-info">Ficción</div>
              <div className="badge badge-soft badge-info">Intriga</div>
              <div className="badge badge-soft badge-info">Misterio</div>
            </div>

            <p className="text-sm text-justify mt-2">
              Un meteorito desciende a la Tierra, pero su naturaleza desafía toda lógica. Un equipo de científicos y exploradores intenta descifrar su origen y propósito, enfrentando secretos ocultos y teorías conspirativas.
            </p>
          </div>
          {/* Libro 6 */}
          <div className="card bg-base-200 shadow p-4">
            <img src="../Uroboro.jpg" alt="Uroboros" className="rounded-lg mx-auto mb-4 h-40 object-contain cursor-pointer" />
            <h5 className="text-lg font-bold mb-1">"Uróboros"</h5>
           <div className='flex gap-2 mt-1'>
              <div className="badge badge-soft badge-info">Crimen</div>
              <div className="badge badge-soft badge-info">Conspiración</div>
              <div className="badge badge-soft badge-info">Venganza</div>
            </div>
            <p className="text-sm text-justify mt-2">
              En las sombras del mundo, una organización secreta entrena a huérfanos para convertirlos en letales centinelas. Un thriller implacable donde el destino parece repetirse, una y otra vez.
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}

export default Projects
