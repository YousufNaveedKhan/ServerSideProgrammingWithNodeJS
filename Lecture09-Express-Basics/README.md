# Lecture 09 — Introduction to Express.js

> Tested on **Node.js v22.21.0**, **express 5.3.0** (Windows).

## Is Lecture Mein Kya Seekhenge

1. Express.js kya hai aur kyun use karte hain
2. Express ka architecture aur yeh kaise kaam karta hai
3. Express ke faide (plain `http` ke muqable mein)
4. Routes, route parameters, query parameters, `res.send` / `res.json`

**Pichle lectures se link:** Lecture 02 mein humne `http` module se routing `if / else if` ke zariye khud likhi thi. Lecture 03 mein seekha tha ke **framework** ek ready-made dhancha hota hai. Aaj wohi kaam Express se karenge aur farq dekhenge.

---

## 1. Express.js Kya Hai?

**Express.js** Node.js ka sab se mashhoor **web framework** hai. Yeh `http` module ke upar bana hai (andar `http.createServer` hi chal raha hota hai), lekin routing, JSON, static files jaisi cheezein aasan bana deta hai.

Express ek **third-party package** hai (`npm install express`).

## 2. Express Ka Architecture — Request Kaise Guzarti Hai

```
Request ──► Middleware 1 ──► Middleware 2 ──► Route handler ──► Response
            (logger)         (json parser)    (app.get(...))
```

- Har request ek **pipeline** se guzarti hai
- Pipeline mein **middleware** functions hote hain (agle lecture mein detail)
- Aakhir mein **route handler** jawab bhejta hai
- Koi route match na ho tou aakhri `app.use(...)` 404 de deta hai

## 3. Express Kaam Kaise Karta Hai (4 Cheezein)

```js
const express = require("express");
const app = express();                                   // 1. app banayi

app.get("/about", (req, res) => { res.send("About"); }); // 2. route: METHOD + path + handler

app.listen(3000);                                        // 3. sunna shuru
```

4. **`req`** aur **`res`** wohi hain jo `http` mein the, lekin Express unhein zyada taqatwar bana deta hai.

| `http` module (Lecture 02) | Express |
|---|---|
| `if (url.pathname === "/about")` | `app.get("/about", ...)` |
| `res.writeHead(200, {"Content-Type": "application/json"}); res.end(JSON.stringify(x))` | `res.json(x)` |
| `new URL(req.url, base).searchParams.get("q")` | `req.query.q` |
| Path se `id` khud nikalna | `app.get("/students/:id")` → `req.params.id` |
| 404 ke liye aakhri `else` | aakhri `app.use(...)` |
| POST body ke liye `data`/`end` events | `express.json()` (agle lecture mein) |

## 4. Faide (Advantages)

- **Kam code** — routing, JSON, params sab built-in
- **Middleware system** — logging, auth, validation jaisi cheezein ek jagah
- **Bara ecosystem** — hazaron middleware packages
- **Seekhna aasan** aur industry mein bohat use hota hai
- Baqi sab (database, templates) ke sath mil jata hai

**Limitation:** Express bohat "minimal" hai — folder structure, validation, security khud sochni parti hai.

> **Honest note:** is course mein **Express 5** use ho raha hai (naya version). Internet par bohat se tutorials Express 4 ke hain. Ziyada tar code same chalta hai, lekin kuch farq hain (jaise wildcard route ka syntax `*` ab `/{*splat}` hai).

---

## 5. Practical — `01-express-basics.js`

Pehle ek dafa:

```bash
npm install
```

Phir:

```bash
node 01-express-basics.js
```

Browser mein kholen:

| URL | Status | Content-Type | Jawab |
|---|---|---|---|
| `/` | 200 | text/html | **Home Page** heading |
| `/about` | 200 | text/plain | This is the About page |
| `/greet/Ali` | 200 | text/html | `Hello, Ali!` |
| `/search?q=node` | 200 | text/html | `You searched for: node` |
| `/search` | 200 | text/html | `You searched for: nothing` |
| `/api/students` | 200 | application/json | `[{"id":1,"name":"Ali","city":"Karachi"},{"id":2,"name":"Sara","city":"Lahore"}]` |
| `/api/students/2` | 200 | application/json | `{"id":2,"name":"Sara","city":"Lahore"}` |
| `/api/students/99` | **404** | application/json | `{"error":"Student not found"}` |
| `/koi-aur-page` | **404** | text/html | 404 - Page not found |

### Dhyan Dene Wali Baatein

- **`res.send()` vs `res.json()` vs `res.end()`:** `send` string/HTML ke liye (Content-Type khud set), `json` object/array ke liye (JSON mein badal kar), `end` bina data ke band karne ke liye.
- **Route parameter vs query parameter:**
  - `/greet/Ali` — `:name` **route param** → `req.params.name` (resource ki pehchan)
  - `/search?q=node` — **query param** → `req.query.q` (filter/search)
- **`return res.status(404)...`:** `return` isliye lagate hain ke handler wahin ruk jaye, warna neeche wala `res.json` dobara response bhejne ki koshish karega.
- **Route ki tarteeb:** Express routes ko upar se neeche check karta hai. 404 wala `app.use` hamesha **sab se aakhir** mein hona chahiye.
- `req.params.id` hamesha **string** hota hai, isliye `Number(req.params.id)` kiya.

## Common Questions / Confusions

**Q1. `Cannot find module 'express'`?**
`npm install` nahi chalaya, ya ghalat folder mein terminal hai.

**Q2. Express aur Node.js mein farq?**
Node.js runtime hai (JavaScript chalata hai). Express ek package/framework hai jo Node.js ke upar server banana aasan karta hai.

**Q3. Express ke baghair server ban sakta hai?**
Haan, `http` module se (Lecture 02). Express sirf kaam asaan banata hai.

**Q4. Server badla lekin purana jawab aa raha hai?**
Restart karein (Ctrl + C, dobara run) ya `node --watch 01-express-basics.js`.

**Q5. `Cannot GET /something` kyun dikhta hai?**
Express ka default 404 hai (jab humne apna 404 handler nahi lagaya). Humne aakhir mein `app.use` se apna 404 lagaya hai.

## Quick Recap

- Express = Node.js ka web framework, `http` ke upar bana
- `app.get(path, handler)`, `app.listen(port)`
- `res.send()` (text/HTML), `res.json()` (JSON), `res.status(404)`
- `req.params` (route `:id`), `req.query` (`?q=`)
- Routes upar se neeche check hote hain; 404 sab se aakhir mein

**Assignment:** [`assignment.md`](assignment.md)
