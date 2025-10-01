import {  createContext, useContext, useEffect, useState } from "react";
import { GlobalContext } from "./GlobalContext";
import toast from "react-hot-toast";
import { UserContext } from "./UserContext";

export const CartContext = createContext()

const CartProvider = ({ children }) => {
    const { user } = useContext(UserContext)
    const { listaTattoos } = useContext(GlobalContext); // se obtienen los tatuajes desde GlobalContext
    const [cart, setCart] = useState([])

    const token = localStorage.getItem("token")

    const fetchCheckout = async () => {
        try {
            const response = await fetch("http://localhost:5000/api/checkouts", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`
                },
                body: JSON.stringify({ cart, user}), // Envía el carrito actual
            });
    
            if (response.ok) {
                const data = await response.json()
                toast.success("Pago realizado con éxito!")
                console.log("Respuesta del backend:", data)
            } else {
                toast.error("Error al procesar el pago");
                console.error("Error en la respuesta del backend:", response.statusText)
            }
        } catch (error) {
            toast.error("Error al conectar con el servidor")
            console.error("Error en fetchCheckout:", error)
        }
    }
        

    const handlePago = (e) => {
        e.preventDefault()
        toast.success("Pago realizado con exito!")
        console.log("hola")
    }

    useEffect(() => {
        if (listaTattoos.length > 0) {
            setCart(listaTattoos.map((tattoo) => ({ ...tattoo, count: 1 })));
        }
    }, [listaTattoos])

    const precioTotal = cart.reduce((acc, tattoo) => acc + tattoo.price * tattoo.count, 0).toLocaleString('es-VE')

    const recargarCarrito = () => {
        if (listaTattoos.length > 0) {
            setCart(listaTattoos.map((tattoo) => ({ ...tattoo, count: 1 })));
        }
    }

    const sumar = (tattoo) => {
      setCart(prevCart => {
        const index = prevCart.findIndex(item => item.id === tattoo.id)
        if (index !== -1) {
          // Ya existe, incrementa count en 1
          return prevCart.map((item, i) =>
            i === index ? { ...item, count: (item.count || 1) + 1 } : item
          )
        } else {
          // Nuevo tattoo, agrega con count 1
          return [...prevCart, { ...tattoo, count: 1 }]
        }
      })
    }

    const restar = (id) => {
        const newCart = cart.map((tattoo) => {
            if (tattoo.id === id) {
                return {
                    ...tattoo,
                    count: tattoo.count - 1,
                };
            }
            return tattoo;
        })
        .filter((tattoo) => tattoo.count > 0)
        setCart(newCart);
    }
 
    return (
        <CartContext.Provider value={{cart, sumar, restar, precioTotal, recargarCarrito, handlePago, fetchCheckout}}>
            {children}
        </CartContext.Provider>
    )
}

export default CartProvider