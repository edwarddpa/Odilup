import React from 'react'

const contacts = [
  {
    href: "https://wa.me/+34660986240",
    img: "/ws.png",
    label: "WhatsApp"
  },
  {
    href: "https://www.instagram.com/jp.artink",
    img: "/inst.png",
    label: "Instagram"
  },
  {
    href: "https://play.google.com/store/apps/developer?id=Jhon+Pulido",
    img: "/google.png",
    label: "Store App"
  },
  {
    href: "mailto:jhonpulidob@gmail.com",
    img: "/email.png",
    label: "Correo"
  },
  {
    href: "https://github.com/Jhonpulidob",
    img: "/github.png",
    label: "GitHub"
  },
  {
    href: "https://store.steampowered.com/?l=spanish",
    img: "/steam.png",
    label: "Steam"
  }
]

const Contact = () => {
  return (
    <section className="flex flex-col items-center justify-center min-h-screen bg-base-200 py-10">
      <div className="card w-full max-w-2xl bg-base-100 shadow-xl p-8">
        <img src="../contact.png" alt="Contact" className="w-50  mx-auto" />
        <h1 className="text-3xl font-bold text-primary text-center mb-6">Contáctame</h1>
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-6">
          {contacts.map((contact, idx) => (
            <a
              key={idx}
              href={contact.href}
              target="_blank"
              rel="noopener noreferrer"
              className="flex flex-col items-center hover:scale-105 transition-transform"
            >
              <img
                src={contact.img}
                alt={contact.label}
                className="w-16 h-16 mb-2 rounded-full border-2 border-primary bg-base-200 object-contain"
              />
              <span className="text-sm font-medium text-gray-700">{contact.label}</span>
            </a>
          ))}
        </div>
      </div>
    </section>
  )
}

export default Contact
