# Lecture 02 — `http` Module & `url`

> Tested on **Node.js v22.21.0** (Windows). Is lecture mein koi package install nahi karna.

## Is Lecture Mein Kya Seekhenge

1. `http` module se server banana (`createServer`, `req`, `res`)
2. Routing: alag URL par alag jawab
3. Status codes aur Content-Type (text, HTML, JSON)
4. `url` module: path aur query parameters (`?name=Ali`) parhna
5. JSON response — API ki shuruaat

**Lecture 01 se link:** wahan humne 5 line ka server banaya tha jo har request par `Hello` bolta tha. Aaj usay asli server banayenge jo alag alag URL par alag jawab de.

---

## 1. `http` Module Kaise Kaam Karta Hai

```js
const server = http.createServer((req, res) => { ... });
server.listen(3000);
```

1. `createServer()` ki di hui function **har request par ek dafa chalti hai**
2. `listen(3000)` server ko **port 3000** par request ka intezar karne ko kehta hai
3. Function ko do objects milte hain:
   - **`req`** (request) — client ne kya bheja: `req.method` (GET/POST), `req.url` (kaunsa path), `req.headers`
   - **`res`** (response) — hum kya wapas bhej rahe hain

### Response Bhejne Ke Methods

| Method | Kaam |
|---|---|
| `res.writeHead(200, { "Content-Type": "text/html" })` | Status code aur headers set karta hai |
| `res.end("text")` | Response bhej kar **khatam** karta hai (hamesha likhna zaroori) |

### Status Codes

| Code | Matlab |
|---|---|
| `200` | OK — sab theek |
| `400` | Bad Request — client ne ghalat data bheja |
| `404` | Not Found — page/route nahi mila |
| `500` | Server Error — server mein masla |

### Content-Type: Kaunsa Likhein?

Content-Type browser ko batata hai ke jawab kis qism ka hai:

| Content-Type | Kab | Browser mein |
|---|---|---|
| `text/plain` | Sada text | Seedha text dikhta hai |
| `text/html` | HTML page | HTML render hota hai (`<h1>` heading ban jati hai) |
| `application/json` | JSON data (APIs) | Data dikhta hai; apps/frontend isay parhte hain |

> **Zaroori farq:** `res.end("<h1>Hi</h1>")` ko `text/plain` ke sath bhejein tou browser mein `<h1>Hi</h1>` **text ki tarah** nazar aayega, `text/html` ke sath heading banegi.

### Routing

Routing = `url.pathname` dekh kar faisla karna ke kya jawab dena hai. Pehle `if`, phir `else if`, aakhir mein `else` jo **404** deta hai.

---

## 2. `url` Module — Path Aur Query Parameters

Web address ke hisse:

```
https://www.example.com:8080/products/shoes?color=red&size=42#reviews
└─┬──┘   └──────┬──────┘└─┬─┘└──────┬─────┘└───────┬───────┘└──┬───┘
protocol    hostname    port   pathname        search         hash
```

`new URL(...)` is address ko object bana deta hai:

- `url.pathname` → `/products/shoes`
- `url.searchParams.get("color")` → `red`
- Jo parameter maujood na ho uska `get()` **`null`** deta hai

Server ke andar `req.url` mein sirf path aur query hoti hai (jaise `/greet?name=Ali`), pura address nahi. Isliye doosra argument (base) dete hain:

```js
const url = new URL(req.url, "http://localhost:3000");
```

Terminal mein `node` likh kar REPL kholen aur ek dafa khud try karein:

```
> new URL("https://www.example.com:8080/products/shoes?color=red&size=42#reviews")
```

> **Honest note:** purane tutorials mein `url.parse(...)` milta hai. Woh legacy hai, naye code mein `new URL()` use karein.

---

## 3. Practical — `01-http-url-server.js`

```bash
node 01-http-url-server.js
```

Terminal mein `Server running at http://localhost:3000` aayega. Browser mein in URLs ko kholen:

| URL | Status | Content-Type | Jawab |
|---|---|---|---|
| `/` | 200 | text/html | **Home Page** heading |
| `/about` | 200 | text/plain | This is the About page |
| `/greet?name=Ali` | 200 | text/plain | `Hello, Ali!` |
| `/greet` | 200 | text/plain | `Hello, Guest!` |
| `/api/students` | 200 | application/json | `[{"id":1,"name":"Ali","city":"Karachi"},{"id":2,"name":"Sara","city":"Lahore"}]` |
| `/koi-aur-page` | **404** | text/plain | 404 - Page not found |

Terminal mein har request ki line print hoti hai, jaise `GET /greet ?name=Ali`. (Browser aksar `GET /favicon.ico` bhi bhejta hai — normal hai.) Server band karne ke liye **Ctrl + C**.

**Code ke hisse:**

- `students` — array of objects, humara chhota sa "data"
- `new URL(req.url, ...)` — path aur query alag karna
- `url.searchParams.get("name") || "Guest"` — parameter na ho tou default `"Guest"`
- `JSON.stringify(students)` — array/object ko JSON text mein badalta hai (response hamesha text hota hai)

---

## Aam Ghaltiyan

- **`res.end()` bhool gaye** → browser hamesha loading rehta hai
- **Do dafa response bheja** → error `ERR_HTTP_HEADERS_SENT`; har request ka sirf ek `res.end()`
- **Code badla lekin purana jawab aa raha hai** → server restart karein (Ctrl + C, dobara `node ...`). Tip: `node --watch 01-http-url-server.js` khud restart karta hai.
- **`EADDRINUSE`** → port 3000 par pehle se koi server chal raha hai; purane terminal mein Ctrl + C karein.
- **JSON bhejte waqt `res.end(students)`** → error aayega; hamesha `JSON.stringify(...)` karein.

## Common Questions / Confusions

**Q1. `req.url` aur `url.pathname` mein farq?**
`req.url` mein path **aur** query hoti hai (`/greet?name=Ali`). `url.pathname` mein sirf path (`/greet`).

**Q2. `res.writeHead` zaroori hai?**
Nahi, lekin Content-Type aur status code set karne ke liye likhte hain. Na likhein tou default 200 aur browser apni marzi se samajhta hai.

**Q3. Sirf `/greet` likhein tou error kyun nahi aaya?**
Kyunke `searchParams.get("name")` `null` deta hai aur `|| "Guest"` default laga deta hai.

**Q4. Hum `http` kyun seekh rahe hain jab Express aa raha hai?**
Express `http` ke upar bana hai. Andar ka kaam samajhna zaroori hai taake Express magic na lage.

## Quick Recap

- `http.createServer((req, res) => ...)` har request par chalta hai; `listen(port)` se sunta hai
- Routing `url.pathname` se; na milne par **404**
- `res.writeHead(status, { "Content-Type": ... })` + `res.end(...)`
- `text/plain`, `text/html`, `application/json` ka farq
- Query parameters: `new URL(req.url, base)` + `searchParams.get("naam")`
- JSON bhejna: `JSON.stringify(data)` + `application/json`

**Assignment:** [`assignment.md`](assignment.md)
