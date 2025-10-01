import { createContext, useEffect, useState } from "react"

export const GlobalContext = createContext()

const GlobalProvider = ({ children }) => {
    const [listaTattoos, setListaTattoos] = useState([])
    const [tattoos, setTattoos] = useState([])

    // register & login

    
    const [products, setProducts] = useState([])

    const getTattoos = async () => {
        const response = await fetch ("http://localhost:5000/api/tattoos")
        const data = await response.json()
        setListaTattoos(data)
      }

    useEffect(() => {
        getTattoos()
      }, [])

    return (
        <GlobalContext.Provider value={{listaTattoos, setListaTattoos, getTattoos, tattoos}}>
            {children}
        </GlobalContext.Provider>
    )
}

export default GlobalProvider