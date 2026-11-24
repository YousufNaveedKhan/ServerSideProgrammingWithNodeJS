# Lecture 11 — RESTful & HTTP APIs

> Tested on **Node.js v22.21.0**, **express 5.3.0** (Windows).

## Is Lecture Mein Kya Seekhenge

1. API kya hai aur uski types
2. REST ke principles aur features
3. HTTP methods ↔ CRUD, aur status codes
4. Data manage karna (Create / Read / Update / Delete)
5. Advantages aur disadvantages
6. RESTful API aur HTTP API ka farq
7. Practical: Students ki poori REST API (Express)

**Pichle lectures se link:** Lecture 02 aur 09 mein hum JSON bhejna seekh chuke hain. Lecture 10 mein `express.json()` se body parhna seekha. Aaj yeh sab mil kar ek **proper API** banayenge — yehi aage MongoDB ke sath jud kar real backend banegi.

---

## 1. API Kya Hai?

**API** (Application Programming Interface) = ek "contract" jis ke zariye ek software doosre software se baat karta hai.

Misal: restaurant mein **menu** (API) hota hai. Aap (client) menu dekh kar order dete hain, aap ko kitchen (server) ke andar ka pata nahi hota — aap ko sirf yeh pata hota hai ke kya maang sakte hain aur kya milega.

Web API mein client (mobile app, website) URL par request bhejta hai aur server **data** (aam taur par JSON) wapas bhejta hai. Facebook ki mobile app, weather app, payment gateway — sab APIs se chalte hain.

### API Ki Qismein

| Kis ke liye | Qism | Matlab |
|---|---|---|
| **Kaun use kar sakta hai** | Public (Open) | Sab ke liye (jaise weather API) |
| | Partner | Sirf business partners ke liye |
| | Private (Internal) | Sirf company ke andar |
| **Style / protocol** | **REST** | HTTP + JSON, sab se aam |
| | SOAP | XML par based, purani/enterprise systems |
| | GraphQL | Client khud batata hai kaunsa data chahiye |
| | gRPC / WebSocket | Fast services / real-time (Lecture 01 mein zikr aaya tha) |

Is course mein hum **REST API** banayenge.

## 2. REST Aur Uske Features

**REST** (Representational State Transfer) = web APIs banane ka ek **style** (rules ka set). Iske features:

| Feature | Matlab |
|---|---|
| **Client-Server** | Client aur server alag alag hain, sirf API se baat karte hain |
| **Stateless** | Har request mukammal hoti hai; server pichli request yaad nahi rakhta (Lecture 01 mein HTTP stateless dekha tha) |
| **Resources + URLs** | Har cheez (student, book) ek **resource** hai jis ka apna URL hai: `/students`, `/students/1` |
| **Uniform interface** | Sab resources par wohi HTTP methods (GET, POST, PUT, DELETE) |
| **Cacheable** | Jawab cache ho sakte hain (GET) |
| **JSON format** | Data aam taur par JSON mein |

### URL Likhne Ka Tareeqa

URL mein **noun (isim)** likhte hain, **verb (kaam)** HTTP method batata hai:

| Ghalat | Sahi |
|---|---|
| `GET /getStudents` | `GET /students` |
| `POST /createStudent` | `POST /students` |
| `POST /deleteStudent/1` | `DELETE /students/1` |

## 3. HTTP Methods ↔ CRUD

| Kaam (CRUD) | Method | URL | Kamyab status |
|---|---|---|---|
| **R**ead (sab) | GET | `/students` | 200 |
| **R**ead (ek) | GET | `/students/1` | 200 |
| **C**reate | POST | `/students` | **201** Created |
| **U**pdate | PUT | `/students/1` | 200 |
| **D**elete | DELETE | `/students/1` | **204** No Content |

*(PATCH sirf kuch fields update karne ke liye hota hai; PUT poora resource badalta hai.)*

### Status Codes

| Code | Matlab | Kab |
|---|---|---|
| 200 | OK | Kamyab GET/PUT |
| 201 | Created | Naya resource ban gaya |
| 204 | No Content | Delete kamyab, wapas bhejne ko kuch nahi |
| 400 | Bad Request | Client ne ghalat/adhoora data bheja |
| 401 | Unauthorized | Login/key chahiye |
| 403 | Forbidden | Login hai lekin ijazat nahi |
| 404 | Not Found | Resource nahi mila |
| 500 | Server Error | Server mein masla |

## 4. Data Manage Karna

REST API ka asal kaam data par **CRUD** karna hai. Aaj hum data ko program ki **memory** (array) mein rakh rahe hain, isliye server restart hote hi data wapas shuru ki halat par aa jata hai. Asli apps mein data **database** mein hota hai — Lecture 15 aur 16 mein yehi MongoDB mein karenge.

## 5. Advantages Aur Disadvantages

| Advantages | Disadvantages |
|---|---|
| Simple, URLs aur HTTP methods samajhna aasan | **Over-fetching:** zaroorat se zyada data aa jata hai (poora student, jab sirf naam chahiye) |
| Kisi bhi language/platform se use hoti hai | **Under-fetching:** kabhi kai requests karni parti hain |
| Scalable (stateless hone ki wajah se) | Stateless: har request ke sath auth (token) bhejna parta hai |
| Cacheable, tools bohat (Postman, browser) | Real-time updates built-in nahi (iske liye WebSocket) |
| JSON light-weight | API ke versions (`/v1`, `/v2`) sambhalna parta hai |

## 6. RESTful API vs HTTP API

| | **HTTP API** | **RESTful API** |
|---|---|---|
| Matlab | Koi bhi API jo HTTP par chale | HTTP API jo **REST ke rules** follow kare |
| URLs | Kuch bhi: `/api?action=getStudent&id=1` | Resources: `/students/1` |
| Methods | Aksar sab kuch `POST` se | Kaam ke hisab se GET / POST / PUT / DELETE |
| Status codes | Aksar hamesha 200 | Maqsad ke hisab se 201, 404, 400... |

**Har RESTful API ek HTTP API hai, lekin har HTTP API RESTful nahi.**

---

## 7. Practical — `01-students-api.js`

Pehle ek dafa `npm install`, phir:

```bash
node 01-students-api.js
```

**Test karne ka tareeqa:** Postman (sab se aasan) ya PowerShell. Browser sirf GET dikha sakta hai.

### Postman Mein

1. Method chunein (GET / POST / PUT / DELETE) aur URL likhein (`http://localhost:3000/students`)
2. POST/PUT ke liye **Body → raw → JSON** chunein aur likhein: `{"name": "Bilal", "city": "Quetta"}`
3. **Send** dabayen aur neeche status code aur jawab dekhein

### PowerShell Mein

```powershell
Invoke-RestMethod http://localhost:3000/students
Invoke-RestMethod -Method Post -Uri http://localhost:3000/students -ContentType "application/json" -Body '{"name":"Bilal","city":"Quetta"}'
Invoke-RestMethod -Method Put -Uri http://localhost:3000/students/3 -ContentType "application/json" -Body '{"name":"Bilal Ahmed","city":"Quetta"}'
Invoke-RestMethod -Method Delete -Uri http://localhost:3000/students/3
```

*(Error status (400, 404) par `Invoke-RestMethod` error throw karta hai — Postman mein status saaf dikhta hai.)*

### Expected Results

| Request | Status | Jawab |
|---|---|---|
| `GET /students` | 200 | `[{"id":1,"name":"Ali","city":"Karachi"},{"id":2,"name":"Sara","city":"Lahore"}]` |
| `GET /students?city=Lahore` | 200 | `[{"id":2,"name":"Sara","city":"Lahore"}]` |
| `GET /students/1` | 200 | `{"id":1,"name":"Ali","city":"Karachi"}` |
| `POST /students` `{"name":"Bilal","city":"Quetta"}` | **201** | `{"id":3,"name":"Bilal","city":"Quetta"}` |
| `POST /students` `{"name":"NoCity"}` | **400** | `{"error":"name and city are required"}` |
| `POST /students` toota hua JSON | **400** | `{"error":"Invalid JSON"}` |
| `PUT /students/3` `{"name":"Bilal Ahmed","city":"Quetta"}` | 200 | `{"id":3,"name":"Bilal Ahmed","city":"Quetta"}` |
| `PUT /students/99` | **404** | `{"error":"Student not found"}` |
| `DELETE /students/3` | **204** | (khali) |
| `DELETE /students/3` (dobara) | **404** | `{"error":"Student not found"}` |
| `GET /kuch-nahi` | 404 | `{"error":"Route not found"}` |

### Code Ke Hisse

- `let students = [...]` aur `nextId` — memory mein data aur agla id
- `req.body` — `express.json()` ki wajah se (Lecture 10)
- **Validation:** `if (!name || !city) return res.status(400)...` — client ka data hamesha check karein
- `find` / `findIndex` / `splice` — array mein dhoondhna aur hatana
- Aakhir mein 404 handler aur **error handler** (toota hua JSON 400 deta hai, warna Express stack trace dikha deta)

## Common Questions / Confusions

**Q1. POST aur PUT mein kya farq hai?**
POST naya resource banata hai (server id deta hai). PUT mojood resource ko replace/update karta hai (id URL mein hoti hai).

**Q2. Delete par 204 kyun, 200 kyun nahi?**
204 ka matlab "kamyab, aur wapas bhejne ko kuch nahi". 200 bhi chalta hai agar aap message bhejna chahein; dono common hain.

**Q3. Data restart par kyun ghayab ho jata hai?**
Kyunke data program ki memory mein hai. Database mein rakhne se bachta hai (Lecture 15-16).

**Q4. `/students/abc` par kya hoga?**
`Number("abc")` `NaN` hota hai, koi student match nahi karta, isliye 404.

**Q5. Postman kyun, browser kyun nahi?**
Browser address bar sirf GET bhej sakta hai. POST/PUT/DELETE ke liye Postman jaisa tool chahiye.

## Quick Recap

- API = software ke darmiyan contract; web API JSON bhejti hai
- REST = client-server, stateless, resources + URLs, uniform interface
- URL mein noun (`/students`), kaam HTTP method batata hai
- GET (read), POST (create, 201), PUT (update), DELETE (204)
- Hamesha input validate karein; 400 / 404 / 500 sahi use karein
- Har RESTful API ek HTTP API hai, har HTTP API RESTful nahi

**Assignment:** [`assignment.md`](assignment.md)
