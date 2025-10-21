export const createCheckout = async (req, res) => {
    try{
        return res.status(200).json({
            message: "Checkout successful",
            cart: req.body,
            user: req.user
         })
    } catch (error) {
        console.error("Error en el proceso de pago:", error)
        res.status(500).json({
            message: "Error en el proceso de pago",
            error: error.message
        })
    }
}

