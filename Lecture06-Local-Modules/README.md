# Lecture 06 — Local Modules

> Tested on **Node.js v22.21.0** (Windows). Koi package install nahi karna.

## Is Lecture Mein Kya Seekhenge

1. Apna module banana (`module.exports`)
2. Module ko `require("./file")` se use karna
3. Module ki privacy aur caching
4. `exports` aur `module.exports` ka farq

**Pichle lectures se link:** ab tak hum doosron ke modules (`http`, `events`) use kar rahe the. Aaj apne modules banayenge taake code tukron mein bat jaye.

---

## 1. Local Module Kya Hai?

Local module sirf ek aam `.js` file hai jo kuch cheezein **export** karti hai. Jo export nahi hota woh us file ke andar **private** rehta hai.

`math.js`:

```js
function add(a, b) { return a + b; }
function multiply(a, b) { return a * b; }
function divide(a, b) {
  if (b === 0) throw new Error("Cannot divide by zero");
  return a / b;
}
const secret = "only inside math.js";   // export nahi kiya -> private

module.exports = { add, multiply, divide };
```

Use karna (`./` zaroor):

```js
const math = require("./math");
math.add(2, 3);   // 5
```

> **Yaad rakhein:** `Math` (bara M) JavaScript ka apna built-in object hai (`Math.max`, `Math.round`) jo bina `require` ke chalta hai. Humara `math.js` us se alag hai, sirf ek example hai.

## 2. Export Karne Ke Tareeqe

| Kya export karna hai | Tareeqa |
|---|---|
| Kai functions ka object | `module.exports = { add, multiply }` |
| Ek ek karke | `exports.sayHello = function () {...}` |
| Sirf ek function | `module.exports = log` |
| Ek class | `module.exports = Student` |

**`exports` vs `module.exports`:** `exports` asal mein `module.exports` ka shortcut hai. Is par properties lagana theek hai (`exports.sayHello = ...`), lekin **`exports = {...}` (seedha assign) kaam nahi karta** — kuch export nahi hota. Poori cheez (function, class, object) export karni ho tou `module.exports =` likhein.

## 3. Practical — `math.js` + `01-local-modules.js`

```bash
node 01-local-modules.js
```

Expected output:

```
2 + 3 = 5
4 x 5 = 20
10 / 4 = 2.5
Error caught: Cannot divide by zero
Private value visible outside? undefined
Same module object? true
```

**Dekhne wali baatein:**

- **Sirf wohi bahar jata hai jo export kiya.** `secret` export nahi hua, isliye `math.secret` `undefined` hai.
- **Caching:** Node ek module ko **sirf ek dafa** load karta hai. Dobara `require("./math")` karein tou wohi object milta hai (`===` `true`).
- **`./` bhool gaye?** `require("math")` likhein tou error `Cannot find module 'math'` aayega. Khud try karein.
- **Lecture 01 se link:** Node har file ko ek function mein lapet deta hai jiske parameters `exports, require, module, __filename, __dirname` hain. Isi liye har file ki apni copy hoti hai (aur `global.__filename` `undefined` tha).
- **Folder ko module banana:** `require("./utils")` agar `utils` ek folder hai, tou Node uske andar `index.js` dhoondhta hai.

## Common Questions / Confusions

**Q1. `Cannot find module './math'`?**
File ka naam/jagah check karein, aur terminal usi folder mein kholein jahan file hai.

**Q2. `module.exports` aur `exports` mein se kaunsa use karun?**
`module.exports = ...` hamesha kaam karta hai. `exports.x = ...` sirf tab jab alag alag properties lagani hon.

**Q3. Module ek hi file mein kyun nahi likh dete?**
Chhoti app mein theek hai, lekin bari app mein code dhoondhna, test karna aur team mein baantna mushkil ho jata hai.

**Q4. Module ko do jagah `require` karein tou do copies banti hain?**
Nahi. Caching ki wajah se ek hi object milta hai — isliye module ke andar ki state (jaise counter) dono jagah shared rehti hai.

## Quick Recap

- Local module = apni `.js` file jo `module.exports` se kuch export kare
- `require("./file")` — `./` zaroor
- Jo export nahi hua woh private hai
- Node module ko ek dafa load kar ke cache karta hai
- `exports = ...` kaam nahi karta, `module.exports = ...` karta hai

**Assignment:** [`assignment.md`](assignment.md)
