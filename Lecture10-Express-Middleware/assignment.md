# Lecture 10 — Assignment: Middleware Practice

`app.js` mein Express server banayen (port 3000) aur yeh features lagayen.

## Task 1 — Request counter

Ek application-level middleware banayen jo har request par ek counter 1 se barhaye. Route `GET /stats` yeh JSON de:

```json
{"requests":3}
```

(`/stats` ko bhi ek request ginein. Tarteeb: pehle `/`, phir `/about`, phir `/stats` ➜ `3`.)

## Task 2 — Role check (route-level middleware)

`requireAdmin` middleware banayen jo header `x-role` check kare:

| Request | Status | Jawab |
|---|---|---|
| `GET /admin` (header nahi) | **403** | `{"error":"Admins only"}` |
| `GET /admin` + `x-role: admin` | 200 | `{"message":"Welcome, admin"}` |

## Task 3 — Feedback form

1. `public/feedback.html` banayen: `name`, `email`, `rating` (1-5) ka form jo JSON ya form data `POST /feedback` par bheje
2. `POST /feedback`: teeno fields zaroori. Koi gayab ho tou **400** `{"error":"All fields are required"}`. `rating` 1 se 5 ke beech na ho tou **400** `{"error":"rating must be 1 to 5"}`
3. Kamyab hone par **201** `{"message":"Thank you, <name>!"}`

## Task 4 — Error handler

`GET /crash` par `throw new Error("Test crash")` karein. Client ko **500** `{"error":"Internal server error"}` mile aur terminal mein asal error message print ho.

## Submit Karein

- `app.js` aur `public/feedback.html`
- Postman/Network tab ke screenshots: `/stats`, `/admin` (403 aur 200), feedback ka 400, `/crash` ka 500
