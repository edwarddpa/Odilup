import pool from "../db/config.js";

export const prepararHATEOAS = async (tattoos, queryString) => {
    const { limits } = queryString
    const { page } = queryString
    console.log(page)

    // separar por origen
    const adminTattoos = tattoos.filter(t => t.from_admin === true || t.from_admin === 'true' || t.from_admin === 1)
    const userTattoos = tattoos.filter(t => !(t.from_admin === true || t.from_admin === 'true' || t.from_admin === 1))

    const mapT = (t) => ({
        id: t.id,
        name: t.name,
        description: t.description,
        categories: t.categories,
        img: t.design_url,
        price: t.price,
        href: `http://localhost:3000/api/v1/tattoos/${t.id}`
    })

    if (limits) {
        // results: solo admin y aprobados
        const results = adminTattoos.filter(t => t.approved).map(mapT).slice(0, limits)
        // inspiration: solicitudes creadas por usuarios (no aprobadas)
        const inspiration = userTattoos.filter(t => !t.approved).map(mapT).slice(0, limits)
        const { rows: totalTattoos } = await pool.query('SELECT * FROM tattoos')
        const total = tattoos.length
        const HATEOAS = {
            total,
            stockTotal: totalTattoos.length,
            results,
            inspiration
        }
        return HATEOAS
    } else {
        const results = adminTattoos.filter(t => t.approved).map(mapT).slice(0, 10)
        const inspiration = userTattoos.filter(t => !t.approved).map(mapT).slice(0, 10)
        const { rows: totalTattoos } = await pool.query('SELECT * FROM tattoos')
        const total = tattoos.length
        const HATEOAS = {
            total,
            stockTotal: totalTattoos.length,
            results,
            inspiration
        }
        return HATEOAS
    }
}