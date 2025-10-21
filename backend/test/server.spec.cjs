const request = require("supertest")
const express = require("express")

describe("API REST - rutas simuladas (smoke tests)", () => {
  let app

  beforeAll(() => {
    app = express()
    app.use(express.json())

    const authMiddleware = (req, res, next) => {
      const auth = req.headers.authorization
      if (!auth) return res.status(401).json({ message: "No token proporcionado" })
      const token = auth.split(" ")[1]
      if (token === "test-admin") req.user = { id: 1, email: "admin@test", admin: true }
      else if (token === "test-user") req.user = { id: 2, email: "user@test", admin: false }
      else return res.status(401).json({ message: "Token inválido" })
      next()
    }

    // Rutas simuladas
    app.post("/api/users/register", (req, res) => {
      const { email, password, nombre } = req.body
      if (!email || !password || !nombre) return res.status(400).json({ message: "missing fields" })
      return res.status(201).json({ message: "Usuario registrado", user: { id: 99, email, nombre } })
    })

    app.post("/api/users/login", (req, res) => {
      const { email, password } = req.body
      if (email === "5@gmail.com" && password === "123123") return res.json({ token: "test-user" })
      if (email === "admin@gmail.com" && password === "admin123") return res.json({ token: "test-admin" })
      return res.status(401).json({ message: "Credenciales inválidas" })
    })

    app.get("/api/tattoos", (req, res) => {
      return res.json({
        total: 2,
        stockTotal: 2,
        results: [{ id: 1, name: "Admin Tattoo", description: "A", img: "a.png", price: 50, approved: true, from_admin: true }],
        inspiration: [{ id: 2, name: "User Request", description: "B", img: "b.png", price: null, approved: false, from_admin: false }]
      })
    })

    app.get("/api/tattoos/pending", authMiddleware, (req, res) => {
      if (!req.user.admin) return res.status(403).json({ message: "No autorizado" })
      return res.json({ pending: [{ id: 2, name: "User Request", design_url: "b.png", description: "B" }] })
    })

    app.post("/api/favorites", authMiddleware, (req, res) => {
      const { tattooId } = req.body
      if (!tattooId) return res.status(400).json({ message: "tattooId requerido" })
      return res.status(201).json({ message: "Favorito añadido", favorites: [{ id: tattooId, name: "Some Tattoo" }] })
    })

    app.delete("/api/tattoos/:id", authMiddleware, (req, res) => {
      const { id } = req.params
      if (!req.user.admin && Number(id) !== 2) return res.status(403).json({ message: "No autorizado para eliminar este tatuaje" })
      return res.json({ message: "Tatuaje eliminado", tattoo: { id: Number(id) } })
    })
  })

  test("POST /api/users/register -> 400 si faltan campos, 201 si ok", async () => {
    const r1 = await request(app).post("/api/users/register").send({ email: "a@b.com" })
    expect(r1.status).toBe(400)

    const r2 = await request(app).post("/api/users/register").send({ email: "a@b.com", password: "123456", nombre: "A" })
    expect(r2.status).toBe(201)
    expect(r2.body.user.email).toBe("a@b.com")
  })

  test("POST /api/users/login -> 401 credenciales inválidas y 200 para credenciales válidas", async () => {
    const r1 = await request(app).post("/api/users/login").send({ email: "no@mail", password: "x" })
    expect(r1.status).toBe(401)

    const r2 = await request(app).post("/api/users/login").send({ email: "5@gmail.com", password: "123123" })
    expect(r2.status).toBe(200)
    expect(r2.body.token).toBe("test-user")
  })

  test("GET /api/tattoos -> 200 y estructura HATEOAS con results e inspiration", async () => {
    const r = await request(app).get("/api/tattoos")
    expect(r.status).toBe(200)
    expect(Array.isArray(r.body.results)).toBe(true)
    expect(Array.isArray(r.body.inspiration)).toBe(true)
  })

  test("GET /api/tattoos/pending -> 403 para user, 200 para admin", async () => {
    const r1 = await request(app).get("/api/tattoos/pending").set("Authorization", "Bearer test-user")
    expect(r1.status).toBe(403)

    const r2 = await request(app).get("/api/tattoos/pending").set("Authorization", "Bearer test-admin")
    expect(r2.status).toBe(200)
    expect(Array.isArray(r2.body.pending)).toBe(true)
  })

  test("POST /api/favorites -> 401 sin token, 400 sin tattooId, 201 con token y tattooId", async () => {
    const r1 = await request(app).post("/api/favorites").send({ tattooId: 1 })
    expect(r1.status).toBe(401)

    const r2 = await request(app).post("/api/favorites").set("Authorization", "Bearer test-user").send({})
    expect(r2.status).toBe(400)

    const r3 = await request(app).post("/api/favorites").set("Authorization", "Bearer test-user").send({ tattooId: 5 })
    expect(r3.status).toBe(201)
    expect(r3.body.favorites[0].id).toBe(5)
  })

  test("DELETE /api/tattoos/:id -> 403 si no autorizado, 200 para admin o autor", async () => {
    const r1 = await request(app).delete("/api/tattoos/1").set("Authorization", "Bearer test-user")
    expect(r1.status).toBe(403)

    const r2 = await request(app).delete("/api/tattoos/1").set("Authorization", "Bearer test-admin")
    expect(r2.status).toBe(200)
    expect(r2.body.tattoo.id).toBe(1)

    const r3 = await request(app).delete("/api/tattoos/2").set("Authorization", "Bearer test-user")
    expect(r3.status).toBe(200)
    expect(r3.body.tattoo.id).toBe(2)
  })
})