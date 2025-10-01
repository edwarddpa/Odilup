import React from 'react'

const About = () => {
  return (
    <section className="flex flex-col items-center justify-center min-h-screen bg-base-200 py-10">
      <div className="card w-full max-w-3xl bg-base-100 shadow-xl p-8">
        <div className="flex flex-col items-center mb-6 mt-4">
          <img
            src="/odilup-logo.jpg"
            alt="Odilup Logo"
            className="w-24 h-24 rounded-full border-4 border-primary mb-4"
          />
          <h1 className="text-3xl font-bold text-primary mb-2">Jhon Edward Pulido Bustamante</h1>
          <p className="text-gray-500">Ingeniero, gestor de proyectos y desarrollador tecnológico</p>
        </div>
        <p className="mb-6 text-justify">
          Soy Jhon Edward Pulido Bustamante, un profesional con una visión multidisciplinaria y un enfoque apasionado por la innovación. Nacido el 5 de junio de 1978 en Caracas, mi carrera ha estado dedicada a la ingeniería, la gestión de proyectos y el desarrollo tecnológico, áreas en las que he adquirido un conocimiento profundo y una capacidad adaptativa que me permite abordar proyectos de gran envergadura con éxito. A lo largo de mi experiencia laboral en diversas industrias, he aprendido a integrar soluciones tecnológicas de manera eficiente y efectiva, destacándome por mi habilidad para liderar equipos, gestionar recursos y transformar ideas en realidades tangibles. Siempre busco la mejora continua y el aprendizaje, con el objetivo de contribuir al progreso y a la evolución de los sectores en los que participo.
        </p>

        <div className="divider">Trayectoria Académica</div>
        <ul className="mb-6 space-y-2">
          <li className="flex items-start gap-2">
            <span className="font-semibold">Ingeniero de Sistemas</span>
            <span className="text-gray-500">– I.U. Politécnico Santiago Mariño (2005)</span>
          </li>
          <li className="flex items-start gap-2">
            <span className="font-semibold">Magíster en Ciencias, Gerencia y Seguridad Industrial en Mantenimiento</span>
            <span className="text-gray-500">– Universidad Gran Mariscal de Ayacucho (UGMA) (2011)</span>
          </li>
          <li className="flex items-start gap-2">
            <span className="font-semibold">Magíster en Gerencia de Mercadeo</span>
            <span className="text-gray-500">– Universidad Gran Mariscal de Ayacucho (UGMA) (2017)</span>
          </li>
        </ul>

        <div className="divider">Desempeño Profesional</div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
          <div className="bg-base-200 rounded p-4">
            <h5 className="font-semibold text-primary mb-1">Energía y Petróleo</h5>
            <p className="text-sm">Trabajé en PDVSA como Analista de Procura y posteriormente como Ingeniero de Proyectos, donde lideré la gestión de adquisición de equipos y materiales para proyectos de gran envergadura.</p>
          </div>
          <div className="bg-base-200 rounded p-4">
            <h5 className="font-semibold text-primary mb-1">Telecomunicaciones</h5>
            <p className="text-sm">Participé en el proyecto de despliegue de fibra óptica para CANTV, en alianza con Huawei, cubriendo la ruta desde Caucagua hasta Barcelona.</p>
          </div>
          <div className="bg-base-200 rounded p-4">
            <h5 className="font-semibold text-primary mb-1">Banca y Finanzas</h5>
            <p className="text-sm">Durante mi carrera en el Banco Mercantil, escalé posiciones desde Cajero hasta Gerente Operativo, gestionando operaciones clave y equipos de alto rendimiento.</p>
          </div>
          <div className="bg-base-200 rounded p-4">
            <h5 className="font-semibold text-primary mb-1">Distribución y Logística</h5>
            <p className="text-sm">Como Gerente Regional en PDVAL, lideré la logística y distribución de alimentos en una región estratégica, garantizando el abastecimiento y la eficiencia operativa.</p>
          </div>
        </div>

        <div className="divider">Iniciativas y Proyectos Autónomos</div>
        <ul className="mb-6 list-disc list-inside space-y-1">
          <li>Diseño y confección en serigrafía textil.</li>
          <li>Un salón de barbería.</li>
          <li>Un estudio de tatuajes, donde he destacado por ofrecer una experiencia única al cliente.</li>
        </ul>
        <p className="mb-6">
          Actualmente, me desempeño como freelancer en España, especializándome en:
        </p>
        <ul className="mb-6 list-disc list-inside space-y-1">
          <li>
            <span className="font-semibold">Desarrollo web y aplicaciones:</span> Uso tecnologías como Python, Flask, HTML, CSS y JavaScript.
          </li>
          <li>
            <span className="font-semibold">Diseño digital y arte:</span> Creación de ilustraciones, tatuajes personalizados y contenido visual de alta calidad.
          </li>
          <li>
            <span className="font-semibold">Escritura y creación de contenido:</span> Estoy desarrollando seis libros, incluidos textos técnicos y novelas con títulos provisionales como <em>Del acero al cristal</em> y <em>Oruboru</em>.
          </li>
        </ul>

        <div className="divider">Competencias Destacadas</div>
        <ul className="mb-6 list-disc list-inside space-y-1">
          <li>
            <span className="font-semibold">Gestión de proyectos:</span> Planificación, procura y ejecución de proyectos tecnológicos e industriales.
          </li>
          <li>
            <span className="font-semibold">Desarrollo tecnológico:</span> Experiencia en programación, diseño web y optimización de procesos digitales.
          </li>
          <li>
            <span className="font-semibold">Creatividad y arte:</span> Pasión por el diseño gráfico, tatuajes y escritura, fusionando técnica y creatividad.
          </li>
          <li>
            <span className="font-semibold">Liderazgo estratégico:</span> Formación y dirección de equipos en ambientes multidisciplinarios.
          </li>
        </ul>

        <div className="divider">Perspectiva Personal</div>
        <p className="mb-2 text-justify">
          Mi enfoque profesional se basa en la innovación continua y la búsqueda de soluciones estratégicas para los desafíos más complejos. Estoy comprometido con el desarrollo personal y profesional, combinando mi formación técnica, creatividad y experiencia en la gestión de recursos.
        </p>
      </div>
    </section>
  )
}

export default About
