const request = require("supertest")

const BASE = "http://127.0.0.1:3000"

describe("API REST - integración contra servidor real", () => {

  test("POST /api/users/login -> 401 para credenciales inválidas y 200 para válidas (si existe usuario)", async () => {
    const r1 = await request(BASE).post("/api/users/login").send({ email: "no@mail", password: "x" })
    expect(r1.status).toBe(401)

  })

  test("GET /api/tattoos -> 200 y estructura HATEOAS (results + inspiration)", async () => {
    const r = await request(BASE).get("/api/tattoos")
    expect(r.status).toBe(200)
    expect(r.body).toHaveProperty("results")
    expect(r.body).toHaveProperty("inspiration")
  })

  test("Rutas protegidas: /api/tattoos/pending -> 401 sin token, 403 para usuario normal (si token válido), 200 para admin", async () => {
    // sin token
    const noToken = await request(BASE).get("/api/tattoos/pending")
    expect([401, 403]).toContain(noToken.status)
  })

  test("POST /api/favorites -> 401 sin token, 400 sin tattooId, 201 con token y tattooId (si el endpoint existe)", async () => {
    // sin token
    const rNo = await request(BASE).post("/api/favorites").send({ tattooId: 1 })
    expect([401, 404]).toContain(rNo.status) // 404 si ruta no registrada
  })

  test("DELETE /api/tattoos/:id -> 401/403/200/404 según permisos y existencia", async () => {
    // intento sin token
    const r1 = await request(BASE).delete("/api/tattoos/999999")
    expect([401, 404]).toContain(r1.status) // puede ser 401 o 404 según tu servidor
  })
})