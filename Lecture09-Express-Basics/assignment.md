# Lecture 09 — Assignments (Express)

**Submission date: Thursday, 19 November 2026** (dono assignments ki)

---

## Assignment 1 — Course API

Lecture 02 ka **Course API** ab Express mein banayen (`course-api.js`, port 3000). `npm install express` ek naye folder mein chalana na bhoolen.

### Data

```js
const courses = [
  { id: 1, title: "HTML Basics", level: "beginner", hours: 10 },
  { id: 2, title: "JavaScript Essentials", level: "beginner", hours: 20 },
  { id: 3, title: "Node.js Server", level: "intermediate", hours: 24 },
  { id: 4, title: "Advanced MongoDB", level: "advanced", hours: 30 },
];
```

### Routes

| # | URL | Status | Jawab |
|---|---|---|---|
| 1 | `/` | 200 | HTML: `<h1>Course API</h1>` |
| 2 | `/about` | 200 | **Plain text** (`text/plain`): `Course API v1 - built with Express` |
| 3 | `/api/courses` | 200 | Saare courses (JSON) |
| 4 | `/api/courses?level=beginner` | 200 | Sirf us level ke courses. Match na ho tou `[]` |
| 5 | `/api/courses/3` | 200 | Ek course (JSON). Id na mile tou **404** `{"error":"Course not found"}` |
| 6 | `/api/greet/Ali?city=Karachi` | 200 | `{"message":"Hello Ali from Karachi"}` (city na ho tou `Pakistan`) |
| 7 | `/api/add/5/3` | 200 | `{"a":5,"b":3,"sum":8}`. Agar koi number na ho (jaise `/api/add/x/3`) tou **400** `{"error":"a and b must be numbers"}` |
| 8 | Koi aur URL | 404 | JSON `{"error":"Route not found"}` |

Route 6 mein **route parameter aur query parameter dono** use hote hain. Route 7 mein **do route parameters**.

### Expected Output

| Request | Jawab |
|---|---|
| `/api/courses/3` | `{"id":3,"title":"Node.js Server","level":"intermediate","hours":24}` |
| `/api/courses/99` | `{"error":"Course not found"}` (404) |
| `/api/greet/Ali?city=Karachi` | `{"message":"Hello Ali from Karachi"}` |
| `/api/greet/Ali` | `{"message":"Hello Ali from Pakistan"}` |
| `/api/add/5/3` | `{"a":5,"b":3,"sum":8}` |
| `/api/add/x/3` | `{"error":"a and b must be numbers"}` (400) |

### Hints

- `req.params.id`, `req.params.name`, `req.query.city`
- `res.status(404).json({...})` aur `return` lagana na bhoolen
- `Number("x")` `NaN` deta hai; check ke liye `Number.isNaN(...)`

---

## Assignment 2 — Bookstore APIs

MongoDB ke Bookstore assignment wali cheezon ke **simple APIs** Express se banayen (`bookstore-api/`, port 3000). Data abhi JavaScript files mein hoga (database baad mein).

### APIs Aur Kam Az Kam Entries

| API | URL | Kam az kam entries |
|---|---|---|
| Books | `/api/books` | **15** |
| Customers | `/api/customers` | **50** |
| Orders | `/api/orders` | **25** |

Fields (aap apne MongoDB assignment wale bhi use kar sakte hain):

- **Book:** `id`, `name`, `author`, `genre`, `price`
- **Customer:** `id`, `name`, `email`, `city`
- **Order:** `id`, `customerId`, `bookId`, `orderDate` (jaise `2026-10-12`), `status` (jaise `pending`, `shipped`, `delivered`, `cancelled`)

### Searching

| API | Kis se search ho sake |
|---|---|
| Books | **author** (`?author=`), **genre** (`?genre=`), **name** (`?name=`), **id** (`/api/books/4`) |
| Customers | **name** (`?name=`), **city** (`?city=`) |
| Orders | **order date** (`?orderDate=`), **status** (`?status=`), **id** (`/api/orders/3`) |

- Bina search ke URL (`/api/books`) par saari entries aani chahiyen
- Search case-insensitive ho (`?genre=fantasy` aur `Fantasy` dono chalen)

### 404

Jab search mein **kuch na mile** (ya id maujood na ho) tou status **404** aur JSON jawab:

```json
{ "error": "No books found" }
```

(id ke liye `{ "error": "Book not found" }`, isi tarah customers aur orders ke liye.) Koi aur URL ho tou bhi 404 (`{"error":"Route not found"}`).

### Jo Parhaya Hai Woh Is Mein Use Karein

| Cheez | Kahan use karni hai |
|---|---|
| `npm init` / `npm install` (Lecture 03) | `express` install karein, `package.json` ho |
| Local modules (Lecture 06) | Data alag files mein: `data/books.js`, `data/customers.js`, `data/orders.js` (`module.exports = [...]`) |
| Express routes, params, query (Lecture 09) | Sab APIs |
| Status codes, JSON, `text/html`, `text/plain` (Lecture 02) | APIs JSON dein; `/` par HTML page; `/health` par plain text `OK` |
| Form (Lecture 05) | `/` ke HTML page mein books search karne ka GET form (`name`, `author`, `genre`) jo `/api/books` par jaye |
| Events (Lecture 04) | Har search par `emit("search", ...)` aur listener terminal mein ek line print kare |
| `url` aur `querystring` (Lecture 02, 05) | Us log line mein: `new URL(req.originalUrl, "http://localhost:3000").pathname` aur `querystring.stringify(filters)` |
| Email (Lecture 07) | `POST /api/orders/:id/send-receipt?to=email` — practice mode mein email ka subject aur text dikhaye |
| File upload (Lecture 08) | `POST /api/books/:id/cover` — sirf image, 2 MB tak |

### Example (Sample Entries)

```js
// data/books.js
{ id: 1, name: "The Hobbit", author: "J.R.R. Tolkien", genre: "Fantasy", price: 1800 }

// data/customers.js
{ id: 1, name: "Ali Raza", email: "ali.raza@example.com", city: "Karachi" }

// data/orders.js
{ id: 1, customerId: 1, bookId: 1, orderDate: "2026-10-05", status: "delivered" }
```

| Request | Status |
|---|---|
| `/api/books?genre=fantasy` | 200 — Fantasy ki books |
| `/api/books?author=austen&genre=Romance` | 200 — dono shartein poori karne wali |
| `/api/books/4` | 200 — ek book |
| `/api/books?author=Rowling` (data mein nahi) | **404** `{"error":"No books found"}` |
| `/api/customers?city=Karachi` | 200 |
| `/api/orders?status=shipped` | 200 |
| `/api/orders?orderDate=2026-10-12` | 200 |
| `/api/orders/999` | **404** `{"error":"Order not found"}` |

Terminal ki log line ka namoona: `[search] /api/books | genre=fantasy -> 2 result(s)`

### Submit Karein

- Poora `bookstore-api` folder (bina `node_modules` aur `uploads` ke)
- Screenshots: har API ki ek search, har API ka ek 404, `/` ka HTML page
- `/api/books`, `/api/customers`, `/api/orders` ka screenshot jisme entries ki ginti (15 / 50 / 25 ya zyada) saaf ho
