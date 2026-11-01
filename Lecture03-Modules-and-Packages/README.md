# Lecture 03 — Modules & Packages

> Tested on **Node.js v22.21.0**, **npm 11.6.2**, **lodash 4.18.1** (Windows).

## Is Lecture Mein Kya Seekhenge

1. Module kya hai aur uski 3 types (built-in, local, third-party)
2. `require()` kaise kaam karta hai
3. Package kya hai, npm, `package.json`, `node_modules`
4. Web framework aur utility packages ka farq
5. Practical: built-in modules (`os`, `path`) aur ek package (`lodash`) install kar ke use karna

**Pichle lecture se link:** Lecture 02 mein humne `require("http")` likha tha. Aaj samjhenge ke `require` asal mein kya karta hai aur `http` jaise modules kahan se aate hain.

---

## 1. Module Kya Hota Hai?

**Module** = code ka ek alag hissa (aam taur par ek file) jo ek khaas kaam karta hai aur dobara use ho sakta hai.

**Kyun?** Agar poora code ek hi file mein ho tou hazaron lines mein kuch dhoondhna mushkil hota hai. Modules se code **tukron mein** bat jata hai — jaise ghar mein alag alag kamray, sab kuch ek hi kamray mein nahi.

### 3 Types

| Type | Kahan se aata hai | Install? | Example |
|---|---|---|---|
| **Built-in (Core)** | Node.js ke sath aata hai | Nahi | `http`, `url`, `events`, `querystring`, `fs`, `os`, `path` |
| **Local** | Hum khud banate hain | Nahi | `./math.js` |
| **Third-party** | Doosron ne banaya, npm par maujood | `npm install` | `express`, `lodash`, `nodemailer`, `formidable` |

### `require()` Ka Rule

```js
const os = require("os");             // sirf naam   -> built-in (ya npm package)
const _ = require("lodash");          // sirf naam   -> pehle built-in dekhta hai, phir node_modules
const math = require("./math");       // ./ se shuru -> hamari apni file
```

Apni file ke liye path **hamesha `./` ya `../`** se shuru hota hai. Jo package install nahi hua uska `require` karein tou `Cannot find module` error (code `MODULE_NOT_FOUND`) aata hai.

> **Honest note:** Node.js mein modules ke do systems hain: **CommonJS** (`require`, `module.exports`) jo hum is course mein use kar rahe hain, aur **ES Modules** (`import`/`export`, jis ke liye `package.json` mein `"type": "module"` chahiye). Dono chalte hain; internet par dono styles milenge.

---

## 2. Packages Aur npm

**Package** = ek ya zyada modules ka ready-made bundle jis ka naam aur version hota hai, aur jo **npm registry** (online store) par milta hai.

*(Module = code ka hissa/file. Package = poora bundle jo install hota hai. Aam bolchal mein log dono ko mix kar dete hain.)*

**Packages kyun?** Time bachta hai (email, file upload, date handling khud likhna mushkil), hazaron log use kar chuke hote hain isliye tested hote hain, aur masla aaye tou community se jawab mil jata hai.

### Packages Ki Do Bari Qismein

| Qism | Matlab | Example |
|---|---|---|
| **Web framework** | Web app banane ka ready-made dhancha (routing waghera). Aap ko uske rules ke andar kaam karna parta hai | **Express.js** (aage ke lecture mein) |
| **Utility packages** | Chhote helper functions jo roz ke kaam asaan banate hain | `lodash` (arrays/objects/strings), `dayjs` (dates), `validator` (email/URL check) |

### `package.json`, `node_modules`, `package-lock.json`

- **`package.json`** — project ka "card": naam, version, aur **dependencies** (kaunse packages chahiye)
- **`node_modules/`** — installed packages ka folder. Bohat bara hota hai, **GitHub par upload nahi karte**
- **`package-lock.json`** — exact versions lock karta hai taake sab ke paas same versions install hon. Isay upload karte hain.

```json
{
  "name": "lecture03-modules-and-packages",
  "version": "1.0.0",
  "private": true,
  "dependencies": {
    "lodash": "^4.18.1"
  }
}
```

`^4.18.1` ka matlab: 4.x.x ke andar naya version chalega, 5.0.0 nahi (major version badalne par code toot sakta hai).

### Zaroori npm Commands

```bash
npm init -y                 # naya package.json banata hai
npm install lodash          # package install + package.json ki dependencies mein add
npm install                 # package.json mein likhe saare packages install
npm uninstall lodash        # package hatana
npm ls --depth=0            # installed packages ki list
```

> **Tip:** Package install karne se pehle npmjs.com par uski popularity dekh lein (weekly downloads, last update). Har package quality mein achha nahi hota.

---

## 3. Practical

### Step A — Built-in Modules REPL Mein

Terminal mein `node` likh kar:

```
> require("os").platform()
'win32'
> require("path").basename("C:/folder/file.js")
'file.js'
> .exit
```

Yeh built-in hain, inhe install nahi karna parta.

### Step B — Package Install Karna

Is folder mein (`package.json` pehle se maujood hai) bas:

```bash
npm install
```

Agar aap naya folder bana kar khud shuru karna chahein tou:

```bash
npm init -y
npm install lodash
```

`package.json` kholein — `dependencies` mein `lodash` likha hoga. `node_modules` folder ban gaya hoga.

### Step C — `01-modules-demo.js`

```bash
node 01-modules-demo.js
```

Expected output (platform aur CPU cores aap ke computer ke hisab se):

```
Platform : win32
CPU cores: 4

File name: 01-modules-demo.js
Extension: .js

capitalize: Node.js is fun
chunk     : [ [ 1, 2 ], [ 3, 4 ], [ 5 ] ]
sum       : 60

Error code: MODULE_NOT_FOUND
```

**File mein kya hai:**

- `os`, `path` — built-in modules (koi install nahi)
- `lodash` — third-party package, `npm install` ke baad hi `require` hota hai
- `_.capitalize`, `_.chunk`, `_.sum` — lodash ke **utility functions**; yehi "utility package" ka matlab hai
- Aakhir mein `try/catch` — jo package install hi nahi hua uska `require` karein tou `MODULE_NOT_FOUND` aata hai

---

## Common Questions / Confusions

**Q1. Module aur package mein farq?**
Module = code ka hissa/file. Package = modules ka bundle jo npm se install hota hai.

**Q2. `require("math")` aur `require("./math")` mein farq?**
`./` ke sath = hamari apni file. Bina `./` ke = built-in ya `node_modules` ka package.

**Q3. `Cannot find module 'lodash'` kyun aaya?**
`npm install` nahi chalaya, ya ghalat folder mein terminal khola hai. Is folder ke andar `npm install` chalayen.

**Q4. `node_modules` GitHub par kyun nahi jata?**
Bohat bara hota hai, aur `package.json` se kabhi bhi `npm install` karke dobara ban jata hai.

**Q5. `npm install` aur `npm install lodash` mein farq?**
Pehla `package.json` ke saare packages install karta hai. Doosra ek naya package install kar ke `package.json` mein jor deta hai.

**Q6. Package aur framework mein farq?**
Framework bhi ek package hai (jaise Express), lekin wo poora dhancha deta hai jiske rules mein aap kaam karte hain. Utility package sirf chhote helper functions deta hai.

## Quick Recap

- Module = code ka alag hissa; 3 types: **built-in, local, third-party**
- `require("./file")` = apni file; `require("naam")` = built-in ya package
- Package = npm bundle; `package.json` dependencies batata hai
- `node_modules` upload nahi hota, `package-lock.json` upload hota hai
- Framework = dhancha (Express); utility = helper functions (lodash)
- `npm init -y`, `npm install <package>`, `npm install`

**Assignment:** [`assignment.md`](assignment.md)
