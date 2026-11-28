# Lecture 13 — Promises & async/await

> Tested on **Node.js v22.21.0** (Windows). Koi package install nahi karna.

## Is Lecture Mein Kya Seekhenge

1. Promise kya hai aur uski 3 states
2. `.then()`, `.catch()`, `.finally()` aur chaining
3. `Promise.all` (kai kaam ek sath)
4. `async` / `await` aur `try / catch`
5. Sequential vs parallel kaam

**Pichle lecture se link:** Lecture 12 mein callback hell dekha tha. Aaj usi example ko do tareeqon se saaf karenge: Promises se, phir async/await se.

---

## 1. Promise Kya Hai?

**Promise** = ek object jo aisi value ka "waada" hai jo **future** mein aayegi. Misal: restaurant mein token — khana abhi nahi, lekin token hai: jab ready hoga tou ya khana milega ya "maaf kijiye, khatam ho gaya".

### 3 States

```
              ┌─► fulfilled (resolved)  ──► .then(value)
 pending ─────┤
              └─► rejected              ──► .catch(error)
```

- **pending** — abhi kaam chal raha hai
- **fulfilled** — kamyab, value mil gayi (`resolve(value)`)
- **rejected** — nakam, error aaya (`reject(error)`)

Ek promise ek hi dafa settle hota hai (ya fulfilled ya rejected).

### Promise Banana Aur Use Karna

```js
function divide(a, b) {
  return new Promise((resolve, reject) => {
    if (b === 0) reject(new Error("Cannot divide by zero"));
    else resolve(a / b);
  });
}

divide(10, 2)
  .then((result) => console.log(result))   // kamyab
  .catch((error) => console.log(error))    // koi bhi error
  .finally(() => console.log("done"));     // dono surat mein
```

### Chaining

`.then()` khud ek naya promise return karta hai, isliye hum unhein jod sakte hain. Callback hell ki jagah **seedhi line**, aur **ek hi `.catch`** poori chain ke errors pakar leta hai.

```js
getUser(1)
  .then((user) => getOrders(user))
  .then((orders) => getTotal(orders))
  .then((total) => console.log(total))
  .catch((error) => console.log(error));
```

### `Promise.all`

Kai kaam **ek sath** shuru karta hai aur sab ke khatam hone par sab ke results ki array deta hai. Agar **koi ek** fail ho tou poora `Promise.all` reject ho jata hai.

## 2. async / await

Promises ke upar ek aasan syntax — code **step-by-step** parhne mein aata hai, lekin phir bhi non-blocking hai.

- `async` function hamesha ek **promise** return karti hai
- `await` promise ke result ka **intezar** karta hai (sirf `async` function ke andar chal sakta hai)
- Errors ke liye aam `try / catch`

```js
async function main() {
  try {
    const user = await getUser(1);
    const orders = await getOrders(user);
    const total = await getTotal(orders);
    console.log(total);
  } catch (error) {
    console.log(error.message);
  }
}
main();
```

**`await` ruk kar intezar karta hai, kya Node block ho jata hai?** Nahi. Sirf yeh async function ruka rehta hai; baqi program (aur doosri requests) chalta rehta hai.

### Sequential vs Parallel

```js
// Ek ke baad ek: 0.1 + 0.1 + 0.1 = 0.3 second
await divide(10, 2);
await divide(20, 4);
await divide(9, 3);

// Ek sath: sab se lamba kaam = 0.1 second
await Promise.all([divide(10, 2), divide(20, 4), divide(9, 3)]);
```

Jo kaam ek doosre par depend **nahi** karte unhein `Promise.all` se ek sath chalayein.

---

## 3. Practical

### `01-promises.js`

```bash
node 01-promises.js
```

Expected output:

```
1) 10 / 2 = 5
1) finally: runs in both cases
2) Error: Cannot divide by zero

3) Chain:
   total = 550

4) Promise.all:
   results = [ 5, 5, 3 ] (took about 0.1 seconds, not 0.3)
```

- Part 1 & 2: promise banana, `.then` / `.catch` / `.finally`
- Part 3: Lecture 12 ka callback hell ab seedhi chain mein, aur ek hi `.catch`
- Part 4: `Promise.all` — teeno ek sath, isliye ~0.1 second

### `02-async-await.js`

```bash
node 02-async-await.js
```

Expected output (timing mein thora farq ho sakta hai):

```
1) 10 / 2 = 5
2) Error: Cannot divide by zero
3) Ali has 2 orders, total = 550
4) one after another  : 0.3 seconds (about 0.3)
4) all at the same time: 0.1 seconds (about 0.1) [ 5, 5, 3 ]
5) File says: Hello from data.txt
```

Wohi kaam async/await mein — code ab bilkul sync jaisa parhne mein aata hai. Part 5 mein `fs/promises` (fs ka promise version) se file parhi.

## Aam Ghaltiyan

- **`await` bhool gaye:** `const user = getUser(1);` → `user` ek **Promise** hai, object nahi. Console par `Promise { <pending> }` aata hai.
- **`await` async function ke bahar:** (CommonJS file ke top level par) error — hamesha `async function main() {...}` mein rakhein.
- **`try/catch` ke baghair await:** rejected promise ka error pakra na jaye tou "Unhandled promise rejection" aata hai.
- **`forEach` ke andar `await`:** `forEach` await ka intezar nahi karta. `for...of` loop ya `Promise.all(array.map(...))` use karein.
- **Jo kaam ek sath ho sakte hain unhein ek ek karke await karna:** program bila wajah dheema ho jata hai.

## Common Questions / Confusions

**Q1. async/await aur Promises mein se kaunsa behtar?**
Dono wohi cheez hain. async/await parhne mein aasan hai, isliye zyada use hota hai; Promises (`Promise.all`) tab kaam aate hain jab kai kaam ek sath karne hon.

**Q2. `async` function kya return karti hai?**
Hamesha promise. `return 5` karein tou `Promise` jo `5` se fulfill hota hai.

**Q3. Callback wala purana code (jaise `fs.readFile`) kaise use karein?**
Ya tou `fs/promises` jaisa promise version use karein, ya khud ek `new Promise` mein lapet dein.

**Q4. `.catch` aur `try/catch` mein farq?**
Kaam same hai: `.catch` promise chain ke liye, `try/catch` async/await ke liye.

## Quick Recap

- Promise = future value ka waada; states: pending → fulfilled / rejected
- `.then` (kamyab), `.catch` (error), `.finally` (hamesha)
- Chain flat hoti hai aur ek `.catch` kaafi
- `Promise.all` = kai kaam ek sath
- `async` function promise return karti hai; `await` result ka intezar karta hai; errors ke liye `try/catch`
- Independent kaam parallel karo (`Promise.all`)

**Assignment:** [`assignment.md`](assignment.md)
