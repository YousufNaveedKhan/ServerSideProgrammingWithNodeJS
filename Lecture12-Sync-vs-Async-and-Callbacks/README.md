# Lecture 12 — Synchronous vs Asynchronous Programming & Callbacks

> Tested on **Node.js v22.21.0** (Windows). Koi package install nahi karna.

## Is Lecture Mein Kya Seekhenge

1. Synchronous (blocking) aur asynchronous (non-blocking) code ka farq
2. Node.js async kyun hai
3. Callback kya hai, error-first callback
4. Callback hell kya hai aur masla kya hai

**Pichle lectures se link:** Lecture 01 mein "non-blocking" ka zikr aaya aur `setTimeout` ka demo dekha tha ("1)" line pehle print hui). Aaj uski poori wajah samjhenge. Lecture 04 mein events dekhe — callback unhi ka bhai hai.

---

## 1. Synchronous vs Asynchronous

| | **Synchronous** (blocking) | **Asynchronous** (non-blocking) |
|---|---|---|
| Kaam ka tareeqa | Ek kaam khatam, phir agla | Kaam shuru kar ke agle par chale jao, jab ready ho tab wapas aao |
| Intezar | Poora program ruk jata hai | Program chalta rehta hai |
| Misal | Queue mein khare ho kar ek ek ka kaam hota hai | Restaurant: order de diya, table par baith gaye, khana ready hone par waiter laya |
| Node.js mein | `fs.readFileSync(...)` | `fs.readFile(..., callback)` |

### Node.js Async Kyun Hai?

Server ka zyada waqt **intezar** mein guzarta hai: file parhna, database se jawab, kisi doosri API ka jawab. Agar Node.js (jo ek main thread par chalta hai) har intezar par ruk jaye, tou sab users ruk jayenge. Async hone se woh intezar ke dauran doosre users ka kaam kar leta hai (Lecture 01 ka waiter wala example).

> **Sync kab theek hai?** Program shuru hone par ek dafa config file parhni ho. Server chalte waqt (har request par) sync I/O **na** karein.

## 2. Callback

**Callback** = ek function jo hum kisi doosre function ko dete hain, taake woh kaam hone ke **baad** usay bula le.

```js
fs.readFile("data.txt", "utf8", (error, data) => {   // yeh callback hai
  console.log(data);                                   // file ready hone par chalega
});
console.log("Yeh pehle print hoga");
```

### Error-First Callback (Node.js ka qaida)

Node.js ke callbacks mein **pehla parameter hamesha error** hota hai, doosra result:

```js
callback(error, result);
// kamyab:  callback(null, result)
// nakam:   callback(new Error("masla"))
```

Isliye callback ke andar sab se pehle `if (error) { ... return; }` likhte hain.

## 3. Callback Hell

Jab har step ko pichle step ka result chahiye, callbacks ek ke andar ek (nested) hote jate hain aur code daayen taraf barhta jata hai — isay **callback hell** ya "pyramid of doom" kehte hain. Masle: parhna mushkil, error handling har level par dohrani parti hai, aur code badalna khatarnak.

Is ka hal **Promises** aur **async/await** hain (agle lecture mein).

---

## 4. Practical

### `data.txt`

Chhoti si sample file jo `fs` module parhta hai.

### `01-sync-vs-async.js`

```bash
node 01-sync-vs-async.js
```

Expected output:

```
1) Sync: before reading
1) Sync: file content -> Hello from data.txt
1) Sync: after reading

2) Async: before reading
2) Async: after reading (printed BEFORE the content!)

The last line of the file - but not the last output.
2) Async: file content -> Hello from data.txt
3) Timer finished after 1 second
```

**Dekhne wali baat:** Sync wale hisse mein sab kuch tarteeb se aaya. Async wale hisse mein "after reading" **pehle** print hua aur file ka content **baad** mein, kyunke callback tab chala jab file ready thi. Aur file ki aakhri line ke baad bhi output aaya.

### `02-callbacks.js`

```bash
node 02-callbacks.js
```

Expected output:

```
Hello, Ali!
1) greet() is done, now the callback runs
2) 10 / 2 = 5
2) Error: Cannot divide by zero

3) Callback hell:
   Ali has 2 orders, total = 550
```

- Part 1: callback sirf ek function hai jo argument ke tor par diya gaya
- Part 2: error-first callback; `divide(5, 0)` ne `callback(new Error(...))` bheja
- Part 3: `getUser` → `getOrders` → `getTotal` — teen level nested. Code ka shape dekhein, daayen taraf barhta hai.

## Aam Ghaltiyan

- **Async result ko sync ki tarah use karna:** `let data; fs.readFile(..., (e, d) => data = d); console.log(data);` → `undefined`, kyunke `console.log` pehle chal gaya.
- **Error check bhool jana:** callback mein `error` ko ignore kiya aur `data` use kiya → program crash.
- **`return` bhool jana:** `if (error) { console.log(error); }` ke baad `return` na ho tou neeche wala code bhi chal jata hai.

## Common Questions / Confusions

**Q1. Async code kya alag thread par chalta hai?**
JavaScript code hamesha main thread par hi chalta hai. Intezar wale kaam (file, network) Node.js ka libuv/OS sambhalta hai, aur jab ready ho tou callback main thread par chalta hai.

**Q2. `setTimeout(fn, 0)` foran kyun nahi chalta?**
Kyunke woh bhi async hai: pehle sab sync code khatam hota hai, phir timer ka callback chalta hai. (Lecture 14 mein tafseel.)

**Q3. Callback aur event listener mein farq?**
Callback aam taur par ek kaam khatam hone par ek dafa chalta hai; event listener kai dafa chal sakta hai.

**Q4. `readFileSync` hamesha ghalat hai?**
Nahi. Shuru mein ek dafa config parhne jaisi jagah par theek hai. Server ki requests ke andar na karein.

## Quick Recap

- Sync = ek kaam ke baad doosra, program ruk jata hai; Async = kaam shuru kar ke aage barho
- Node.js async hai taake intezar ke dauran doosra kaam ho sake
- Callback = function jo kaam hone ke baad bulaya jata hai
- Error-first: `callback(error, result)` aur pehle error check karo
- Callback hell = nested callbacks → Promises / async-await ka hal (agla lecture)

**Assignment:** [`assignment.md`](assignment.md)
