# Lecture 10 — Express Middleware

> Tested on **Node.js v22.21.0**, **express 5.3.0** (Windows).

## Is Lecture Mein Kya Seekhenge

1. Middleware kya hai aur `next()` kya karta hai
2. Built-in middleware: `express.json()`, `express.urlencoded()`, `express.static()`
3. Apna middleware (logger, route-level API key check)
4. 404 aur error-handling middleware
5. Form/JSON ka data `req.body` mein lena

**Pichle lectures se link:** Lecture 05 mein POST ki body `data`/`end` events se khud jama karni parti thi. Express mein ek middleware (`express.json()`) yeh kaam kar deta hai. Lecture 09 mein pipeline ka zikr aaya tha — aaj usi ko samjhenge.

---

## 1. Middleware Kya Hai?

**Middleware** = ek function jo request aur route handler ke **beech** mein chalta hai. Uske paas `(req, res, next)` hote hain. Woh kuch kaam kar sakta hai (log, check, badlav) aur phir:

- `next()` bula kar request ko **aage** bhej deta hai, **ya**
- khud `res.json(...)` bhej kar request wahin **rok** deta hai

```
Request ─► logger ─► express.json() ─► checkApiKey ─► Route handler ─► Response
              │              │               │
            next()         next()      (key galat? 401 bhej do, aage na jao)
```

Misal: airport par security check. Har passenger (request) guzarta hai; kisi ke papers galat hon tou wahin rok liya jata hai.

## 2. Middleware Ki Qismein

| Qism | Kaise lagate hain | Is lecture mein |
|---|---|---|
| **Application-level** (har request par) | `app.use(fn)` | logger |
| **Route-level** (sirf ek route par) | `app.get("/private", fn, handler)` | `checkApiKey` |
| **Built-in** | `express.json()`, `express.urlencoded()`, `express.static()` | teeno |
| **Error-handling** (4 parameters) | `app.use((err, req, res, next) => ...)` | 500 handler |
| **Third-party** | `npm install` (jaise `morgan`, `cors`) | sirf naam |

**Sab se zaroori rule: tarteeb (order) matter karti hai.** Middleware upar se neeche chalte hain. `express.json()` routes se **pehle** lagana hota hai, aur 404/error handlers sab se **aakhir** mein.

## 3. Built-in Middleware

| Middleware | Kaam |
|---|---|
| `express.json()` | JSON body (`{"name":"Ali"}`) ko `req.body` mein object bana deta hai |
| `express.urlencoded({ extended: true })` | HTML form ka body (`name=Ali&city=...`) ko `req.body` mein object banata hai |
| `express.static("public")` | `public` folder ki files (HTML, CSS, images) seedha serve karta hai |

## 4. Error-Handling Middleware

Jab kisi route mein error ho (`throw new Error(...)`), Express usay seedha **4 parameters** wale middleware tak pohancha deta hai. Is mein hum client ko saaf-suthra jawab dete hain (500) aur asal error terminal mein log karte hain. Client ko kabhi error ki andar ki detail (stack trace) nahi dikhate.

---

## 5. Practical — `01-middleware.js` + `public/index.html`

Pehle ek dafa `npm install`, phir:

```bash
node 01-middleware.js
```

### Static Page

`http://localhost:3000` kholen — `public/index.html` (contact form) nazar aayega. Form bharein aur **Send** dabayen — neeche jawab dikhega.

### Baqi Routes (Postman ya PowerShell mein `Invoke-RestMethod`)

| Request | Status | Jawab |
|---|---|---|
| `POST /contact` body `{"name":"Ali","message":"Hi"}` (JSON) | 201 | `{"received":{"name":"Ali","message":"Hi"}}` |
| `POST /contact` body `{"name":"Ali"}` (message gayab) | 400 | `{"error":"name and message are required"}` |
| `POST /contact` form data `name=Sara&message=Hello` | 201 | `{"received":{"name":"Sara","message":"Hello"}}` |
| `GET /private` (header ke baghair) | 401 | `{"error":"Invalid or missing API key"}` |
| `GET /private` + header `x-api-key: secret123` | 200 | `{"message":"Welcome, you have access"}` |
| `GET /error` | 500 | `{"error":"Internal server error"}` (terminal mein `Error: Something broke!`) |
| `GET /kuch-nahi` | 404 | `{"error":"Route not found"}` |

Terminal mein har request ki line aati hai (logger): `GET /`, `POST /contact`, ...

PowerShell mein:

```powershell
Invoke-RestMethod http://localhost:3000/private -Headers @{ "x-api-key" = "secret123" }
Invoke-RestMethod -Method Post -Uri http://localhost:3000/contact -ContentType "application/json" -Body '{"name":"Ali","message":"Hi"}'
```

*(Windows PowerShell mein `curl.exe` ke saath JSON ki quotes ka masla aata hai, isliye `Invoke-RestMethod` likha hai. Postman sab se aasan hai. Error status (401, 404...) par `Invoke-RestMethod` error throw karta hai — woh normal hai.)*

## Aam Ghaltiyan

- **`next()` bhool gaye** → request wahin atak jati hai, browser loading rehta hai
- **`express.json()` routes ke baad lagaya** → `req.body` `undefined` aata hai
- **`next()` bhi bulaya aur `res.json()` bhi** → "headers already sent" error
- **404 middleware routes se pehle lagaya** → har cheez 404 de degi
- **JSON bhejte waqt `Content-Type: application/json` header na ho** → `express.json()` body ko nahi parhega

## Common Questions / Confusions

**Q1. `app.use` aur `app.get` mein farq?**
`app.use` har method aur har path par chalta hai (ya diye gaye path ke shuru par). `app.get` sirf GET requests ke liye ek khaas path par.

**Q2. API key `secret123` code mein likhna theek hai?**
Sirf seekhne ke liye. Asli app mein key `.env` mein hoti hai (Lecture 07 mein dekha).

**Q3. `express.static` ka path `path.join(__dirname, "public")` kyun?**
Taake terminal kisi bhi folder se khola jaye, `public` folder sahi mile (relative path current folder se dekhta hai).

**Q4. Error handler mein 4 parameters zaroori hain?**
Haan. Express parameters ginti se pehchanta hai: 4 hon tou error-handling middleware, warna aam middleware.

## Quick Recap

- Middleware = `(req, res, next)` function jo request aur route ke beech chalta hai
- `next()` aage bhejta hai, `res.json()` request rok deta hai
- **Tarteeb important:** `express.json()` routes se pehle, 404 aur error handlers aakhir mein
- `express.json()` / `express.urlencoded()` → `req.body`; `express.static()` → public files
- Error handler ke 4 parameters: `(err, req, res, next)`

**Assignment:** [`assignment.md`](assignment.md)
