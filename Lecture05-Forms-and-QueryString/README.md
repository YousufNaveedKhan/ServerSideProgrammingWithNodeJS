# Lecture 05 — HTML Forms & `querystring`

> Tested on **Node.js v22.21.0** (Windows). Koi package install nahi karna.

## Is Lecture Mein Kya Seekhenge

1. Query string kya hai aur `querystring` module (`parse`, `stringify`)
2. GET vs POST
3. POST ka data (body) server par kaise aata hai (`data` aur `end` events)
4. User ke diye hue text ko HTML mein dalne se pehle escape karna (XSS)

**Pichle lecture se link:** Lecture 04 mein events seekhe. Request bhi ek EventEmitter hai, aur POST ka data `data`/`end` events se hi aata hai.

---

## 1. Query String

**Query string** = `key=value` pairs jo `&` se alag hote hain: `name=Ali&age=21`. Yeh do jagah milti hai:

1. URL mein `?` ke baad (GET): `/search?name=Ali&age=21`
2. HTML form ki POST body mein (`application/x-www-form-urlencoded`)

`querystring` module string ↔ object badalta hai. Terminal mein `node` likh kar khud try karein:

```js
> const qs = require("querystring")
> qs.parse("name=Ali&age=21&hobby=cricket&hobby=chess")
[Object: null prototype] { name: 'Ali', age: '21', hobby: [ 'cricket', 'chess' ] }
> qs.stringify({ name: "Sara Khan", city: "Karachi" })
'name=Sara%20Khan&city=Karachi'
```

- `parse()` — string se object. Dohraya hua key (`hobby`) **array** ban jata hai.
- Saari values **strings** hoti hain (`age: '21'`, number nahi). Number chahiye tou `Number(...)`.
- `[Object: null prototype]` normal object jaisa hi hai (sirf built-in methods nahi hote).
- `stringify()` — object se string. Space `%20` ban jata hai (URL encoding).

> **Honest note:** `querystring` legacy hai. Naye code mein `URLSearchParams` recommended hai (same idea, `url.searchParams` ke andar bhi yehi hai). Course ke liye `querystring` seekhna zaroori hai.

## 2. GET vs POST

| | GET | POST |
|---|---|---|
| Data kahan | URL mein (`?name=Ali`) | Request ki **body** mein |
| Kab | Data maangna, search | Form submit, login, sign up |
| URL mein nazar aata hai? | Haan | Nahi |

## 3. POST Ki Body Chunks Mein Aati Hai

Data ek sath nahi aata, **chunks** (tukron) mein aata hai. Request ek EventEmitter hai:

```js
let body = "";
req.on("data", (chunk) => { body += chunk.toString(); });   // har tukra
req.on("end", () => {                                        // sab aa gaya
  const form = querystring.parse(body);                      // "name=Ali&city=Karachi" -> object
});
```

## 4. `escapeHtml()` Kyun? (XSS)

User jo likhe usay seedha HTML mein nahi daalte. Agar koi naam ki jagah `<script>alert(1)</script>` likh de aur hum seedha page mein daal dein tou woh script **chal jayegi** (isay **XSS attack** kehte hain). `escapeHtml()` `<` ko `&lt;` banata hai, tou browser usay sirf text dikhata hai.

**Rule: user ka text hamesha escape karo.**

---

## 5. Practical — `01-form-server.js`

```bash
node 01-form-server.js
```

`http://localhost:3000` kholen, form bharein aur **Send** dabayen. Terminal mein:

```
Raw body : name=Ali+Khan&city=Karachi
As object: [Object: null prototype] { name: 'Ali Khan', city: 'Karachi' }
Back to string: name=Ali%20Khan&city=Karachi
```

Browser mein: **Thank you, Ali Khan** aur `City: Karachi`.

**Khud test karein:** naam mein `<b>hi</b>` ya `<script>alert(1)</script>` likhein. Page par woh text ki tarah nazar aayega, chalega nahi. Phir code mein `escapeHtml(form.name)` ki jagah sirf `form.name` likh kar dobara try karein (server restart ke baad) aur farq dekhein — **test ke baad wapas escape laga dein.**

## Common Questions / Confusions

**Q1. POST ka data `req.body` mein kyun nahi mil raha?**
Plain `http` module mein `req.body` hota hi nahi. Data chunks mein aata hai (`data`/`end`). Express mein yeh kaam aasan ho jata hai (aage ke lecture mein).

**Q2. Form ka `name` attribute kyun zaroori hai?**
`<input name="city">` ka `name` hi key banta hai (`city=Karachi`). Bina `name` ke data bheja hi nahi jata.

**Q3. Space `+` kyun ban gaya (`Ali+Khan`)?**
Form data mein space `+` ya `%20` hota hai. `parse()` usay wapas space bana deta hai.

**Q4. GET form hota tou kya hota?**
Data URL mein aata (`/submit?name=Ali&city=Karachi`) aur body ki zaroorat na hoti.

## Quick Recap

- Query string: `key=value&key=value`
- `querystring.parse()` string → object, `stringify()` object → string; values strings hoti hain
- GET = URL mein data, POST = body mein data
- POST body `data` events se chunks mein aati hai, `end` par mukammal
- User ka text HTML mein dalne se pehle **escape** karo (XSS se bachao)

**Assignment:** [`assignment.md`](assignment.md)
