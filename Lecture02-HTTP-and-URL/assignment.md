# Lecture 02 — Assignment: Course API

Ek chhota **Course API** server banayen (`api.js`, port **3000**). Isme `text/html`, `text/plain` aur JSON teeno qism ke jawab dene hain, aur query parameters bhi use karne hain.

## Data

Yeh array apne code mein rakhein:

```js
const courses = [
  { id: 1, title: "HTML Basics", level: "beginner", hours: 10 },
  { id: 2, title: "JavaScript Essentials", level: "beginner", hours: 20 },
  { id: 3, title: "Node.js Server", level: "intermediate", hours: 24 },
  { id: 4, title: "Advanced MongoDB", level: "advanced", hours: 30 },
];
```

## Routes

| # | URL | Status | Content-Type | Jawab |
|---|---|---|---|---|
| 1 | `/` | 200 | `text/html` | Ek `<h1>Course API</h1>` heading aur ek `<p>` jisme endpoints ke naam likhe hon |
| 2 | `/about` | 200 | `text/plain` | `Course API v1 - built with Node.js` |
| 3 | `/api/courses` | 200 | `application/json` | Saare courses ki list |
| 4 | `/api/courses?level=beginner` | 200 | `application/json` | Sirf us `level` wale courses. Koi match na ho tou khali array `[]` |
| 5 | `/api/greet?name=Ali&city=Karachi` | 200 | `application/json` | `{"message":"Hello Ali from Karachi"}` |
| 6 | `/api/add?a=5&b=3` | 200 | `application/json` | `{"a":5,"b":3,"sum":8}` |
| 7 | Koi aur URL | 404 | `application/json` | `{"error":"Route not found"}` |

### Route 5 ke rules (do parameters)

- `name` zaroori hai. Na ho tou status **400** aur `{"error":"name is required"}`
- `city` optional hai. Na ho tou default `Pakistan`: `/api/greet?name=Ali` → `{"message":"Hello Ali from Pakistan"}`

### Route 6 ke rules (numbers)

- `a` aur `b` dono number hon. Koi missing ho ya number na ho (jaise `a=x`) tou status **400** aur `{"error":"a and b must be numbers"}`

## Expected Output

| Request | Jawab |
|---|---|
| `/about` | `Course API v1 - built with Node.js` |
| `/api/courses?level=beginner` | `[{"id":1,"title":"HTML Basics","level":"beginner","hours":10},{"id":2,"title":"JavaScript Essentials","level":"beginner","hours":20}]` |
| `/api/courses?level=expert` | `[]` |
| `/api/greet?name=Ali&city=Karachi` | `{"message":"Hello Ali from Karachi"}` |
| `/api/greet?name=Ali` | `{"message":"Hello Ali from Pakistan"}` |
| `/api/greet` | `{"error":"name is required"}` (status 400) |
| `/api/add?a=5&b=3` | `{"a":5,"b":3,"sum":8}` |
| `/api/add?a=5` | `{"error":"a and b must be numbers"}` (status 400) |
| `/api/add?a=x&b=3` | `{"error":"a and b must be numbers"}` (status 400) |
| `/koi-aur-page` | `{"error":"Route not found"}` (status 404) |

## Hints

- `new URL(req.url, "http://localhost:3000")` aur `url.searchParams.get("naam")`
- JSON bhejne ke liye `JSON.stringify(...)` aur `"Content-Type": "application/json"`
- Baar baar JSON bhejna pare tou ek helper function `sendJson(res, status, data)` bana lein
- `Number("5")` → `5`. Number check karne ke liye `Number.isNaN(...)`
- **Dhyan:** `Number("")` `0` deta hai, isliye pehle check karein ke parameter `null` tou nahi
- Test karne ke liye browser kaafi hai (status code dekhne ke liye browser ka **DevTools → Network** tab, ya Postman)

## Submit Karein

- `api.js` file via GitHub
- Network tab ya Postman ka screenshot jisme kam az kam ye 3 dikhein: `/api/courses?level=beginner`, `/api/greet` (400 ke sath), `/koi-aur-page` (404 ke sath)
