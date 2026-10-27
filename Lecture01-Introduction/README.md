# Lecture 01 — Introduction to Server-side Programming & Node.js Essentials

Theory + Practical `01` se `05`.

> Tested on **Node.js v22.21.0** and **npm 11.6.2** (Windows). Agar aap ka version thora different ho tou koi masla nahi, saari demos basic Node.js features use karti hain.

## Is Lecture Mein Kya Seekhenge

1. Client-server architecture aur request/response cycle
2. Server-side programming kyun zaroori hai
3. Web server, request lifecycle, IP address (static vs dynamic)
4. HTTP protocol: methods, status codes, headers, stateless nature
5. Communication ke types (Simplex, Half-duplex, Full-duplex) aur HTTP ke ilawa doosre protocols
6. Node.js kya hai — aur kya **nahi** hai (language, runtime, library, framework, tool, backend ka farq)
7. Node.js ki features, benefits aur limitations
8. Node.js installation, NPM vs NVM
9. Node.js architecture (V8, libuv, event loop) ka basic idea
10. Practical: pehla program, global objects, programming constructs, console app aur pehla web server

---

## 1. Client-Server Architecture

Internet pe jo bhi website ya app use hoti hai, uske peeche **do side** hoti hain:

- **Client** — wo jo kuch **maangta** hai (request bhejta hai). Jaise browser, mobile app.
- **Server** — wo computer/program jo request ko **receive** kar ke **jawab** (response) bhejta hai.

```
   CLIENT (Browser)                          SERVER
  ┌───────────────┐   1. Request           ┌───────────────┐
  │               │ ─────────────────────► │               │
  │  Chrome /     │                        │  Node.js app  │
  │  Mobile App   │ ◄───────────────────── │  + Database   │
  │               │   2. Response          │               │
  └───────────────┘                        └───────────────┘
```

### Example: Login Form

1. User browser mein email aur password likh ke **Login** dabata hai.
2. Browser server ko **request** bhejta hai (email + password ke sath).
3. Server database mein check karta hai ke yeh user maujood hai ya nahi.
4. Server **response** bhejta hai — "Login successful" ya "Wrong password".
5. Browser response ko screen pe dikha deta hai.

**Yaad rakhein:** Client hamesha request shuru karta hai, server sirf jawab deta hai.

### Browser vs Server

| | Browser (Client) | Server |
|---|---|---|
| Kahan chalta hai | User ke device pe | Remote computer pe (company/cloud) |
| Kaam | Page dikhana, user se input lena | Request process karna, data dena |
| Languages | HTML, CSS, JavaScript | Node.js, Python, PHP, Java, C# etc. |
| Database access | Nahi | Haan |

---

## 2. Server-side Programming Kyun Zaroori Hai

### Static vs Dynamic Pages

- **Static page** — har user ko hamesha same HTML milti hai (jaise "About Us" page).
- **Dynamic page** — user aur data ke hisab se page **badalta** hai (jaise aap ka Facebook feed, aap ka bank balance).

Dynamic page banane ke liye server pe code chalana parta hai — yehi **server-side programming** hai.

### Server-side Ki Zaroorat Kyun?

1. **Dynamic content** — har user ke liye alag data dikhana
2. **Database access** — data store/read/update karna. Browser seedha database se connect nahi hona chahiye
3. **Security** — password check, validation, secret keys server pe safe rehti hain. Browser ka code har koi dekh sakta hai
4. **Business logic** — jaise price calculate karna, order process karna — yeh kaam server pe hona chahiye
5. **Central control** — ek jagah code, hazaron users

### Client-side vs Server-side

| | Client-side | Server-side |
|---|---|---|
| Chalta kahan hai | Browser mein | Server pe |
| User code dekh sakta hai? | Haan | Nahi |
| Kaam | UI, animations, form checks | Database, login, payments, APIs |
| Example | JavaScript in browser | Node.js |

---

## 3. Web Server Aur Uska Architecture

**Web server** ek software (aur kabhi us software ko chalane wala computer) hota hai jo client ki **HTTP requests** receive karta hai aur **responses** wapas bhejta hai.

Mashhoor web servers: **Apache**, **Nginx**, **IIS**. Node.js mein hum khud apna web server bana sakte hain (`http` module se) — yeh aaj ke practical mein (`05-server.js`) aur Lecture 02 mein dekhenge.

### Request Lifecycle (Ek Request Ka Safar)

```
Browser                                                  Server side
   │
   │ 1. User types  www.example.com
   │ 2. DNS: domain name  ──►  IP address
   │ 3. Connection (TCP) banta hai
   │ 4. HTTP Request bheji jati hai ───────────────►  Web Server receives
   │                                                    │
   │                                                    ▼
   │                                              5. Application code chalta hai
   │                                              6. Zaroorat ho tou Database se data
   │                                                    │
   │ 8. Browser page render karta hai  ◄──────────  7. HTTP Response bheji jati hai
   ▼
```

**Static request** mein server sirf file (HTML/image) utha ke bhej deta hai. **Dynamic request** mein server pehle code chalata hai, database se data leta hai, phir response banata hai.

### IP Address Kya Hai

**IP** = Internet Protocol. Internet se jure har device (computer, mobile, server) ki ek **unique pehchan** hoti hai jo numbers ki shakal mein hoti hai, jaise `192.168.1.1` ya `142.250.190.46`. Yeh bilkul ghar ke address ya phone number ki tarah hai, taake data sahi jagah pohnche.

Upar lifecycle ke step 2 mein **DNS** yehi karta hai: domain name (`google.com`) ko IP address mein badalta hai, kyunke computers numbers se baat karte hain.

> **Note:** `192.168.x.x` jaisi addresses **private IP** hoti hain (sirf ghar/office ke network ke andar). Internet pe jo address nazar aata hai wo **public IP** hota hai.
> **`localhost`** = aap ka apna computer (IP: `127.0.0.1`). Hum apne server isi pe test karenge.

### Static IP vs Dynamic IP

| | Dynamic IP | Static IP |
|---|---|---|
| Matlab | Badalti rehne wali IP | Pakki, fixed IP |
| Kaun deta hai | ISP, automatically | ISP (extra paise lekar) ya VPS/cloud provider |
| Kab badalti hai | Router restart ya kuch din baad | Kabhi nahi |
| Kiske liye theek | Aam browsing, streaming, ghar ka use | Server hosting, remote access, CCTV, domain ka DNS point karna |

**Kya humein zaroorat hai?** Aam coding aur seekhne ke liye Dynamic IP kaafi hai. Lekin jab koi server **doosre logon ke liye hamesha available** rakhna ho (VPS/cloud server, domain point karna), tou **Static (fixed) public IP** zaroori hai — cloud servers (VPS) mein yeh aam taur par milti hi hai.

---

## 4. HTTP Protocol — Detail

**HTTP (HyperText Transfer Protocol)** woh communication protocol hai jo internet pe client (browser, mobile app) aur server ke darmiyan data exchange ke **rules** define karta hai. HTTP ke paanch main concepts:

### 4.1 Request-Response Model

- **Client request bhejta hai:** "Mujhe yeh page/data chahiye."
- **Server response deta hai:** data, HTML page, JSON, ya error.
- **Rule:** HTTP mein server apni marzi se client ko data nahi bhejta jab tak client request na kare. (Real-time ke liye WebSocket jaise alag protocols hain — neeche dekhein.)

### 4.2 HTTP Methods (Verbs)

Client ko server ko batana parta hai ke wo **kya karna chahta hai**. Iske liye standard methods hain:

| Method | Kaam | Example |
|---|---|---|
| **GET** | Data/page maangna (fetch) | Website kholna, product list dekhna |
| **POST** | Naya data bhejna (create) | Form submit, sign up |
| **PUT / PATCH** | Mojood data update karna | Profile edit karna |
| **DELETE** | Data delete karna | Account/post delete karna |

> Yeh methods aage **REST APIs** (Class 3) aur **CRUD** (Class 5) mein bohat kaam aayengi.

### 4.3 Status Codes

Server ke response ke sath 3-digit **status code** aata hai jo batata hai request ka kya bana:

| Range | Category | Matlab | Example |
|---|---|---|---|
| **1xx** | Informational | Request mil gayi, process ho rahi hai | — |
| **2xx** | Success | Request kamyaab | `200 OK` |
| **3xx** | Redirection | Page kisi aur jagah shift ho gaya | `301 Moved Permanently` |
| **4xx** | Client Error | Galti client ki taraf se | `404 Not Found`, `401 Unauthorized` |
| **5xx** | Server Error | Kharabi server ki taraf | `500 Internal Server Error` |

**Yaad rakhne ka tareeqa:** 2 = sab theek, 4 = tumhari galti, 5 = meri (server ki) galti.

### 4.4 Headers (Metadata)

Request aur response dono ke sath kuch extra maloomat bheji jati hain jinhein **headers** kehte hain. Yeh batate hain ke data kaisa hai aur kaise handle hoga.

| Header | Kaam | Example |
|---|---|---|
| `Content-Type` | Data kis format mein hai | `application/json`, `text/html` |
| `Authorization` | Security token/credentials bhejna (user authenticated hai ya nahi) | `Bearer <token>` |
| `User-Agent` | Client ki details (browser, operating system) | `Mozilla/5.0 ...` |

### 4.5 Stateless Protocol

HTTP **stateless** hai: server ke liye har request **bilkul nayi** hoti hai. Server ko yaad nahi rehta ke pichli request kisne aur kyun bheji thi.

**Tou login kaise yaad rehta hai?** Agar session yaad rakhna ho (jaise login state), tou uske liye extra cheezein use hoti hain:

- **Cookies** — browser mein chhoti si information store hoti hai jo har request ke sath jati hai
- **Sessions** — server pe user ki state store hoti hai
- **Tokens (JWT)** — ek signed token jo client har request ke sath bhejta hai

> Inki detail aage course mein (authentication ke waqt) aayegi. Abhi sirf concept: **HTTP khud kuch yaad nahi rakhta.**

---

## 5. Communication Ke Types Aur Doosre Protocols

### 5.1 Transmission Modes

Devices ke aapas mein data bhejne ke tareeqe 3 hain:

| Type | Matlab | Misal |
|---|---|---|
| **Simplex** (One-way) | Data sirf ek taraf jata hai, samne wala jawab nahi de sakta | TV, Radio, Keyboard se computer ko data |
| **Half-duplex** (Two-way, ek waqt mein ek) | Data dono taraf ja sakta hai, lekin ek waqt mein sirf ek taraf | Walkie-Talkie ("Over" bolna) |
| **Full-duplex** (Simultaneous two-way) | Data dono taraf ek hi waqt mein | Phone call, WhatsApp voice/video call |

**WebSocket** ek **full-duplex** (bi-directional) protocol hai: client aur server dono ek hi waqt mein ek doosre ko data bhej sakte hain.

### 5.2 HTTP Ke Ilawa Protocols — Kab Kya Use Karein?

Hum inmein se **apni marzi se randomly** koi bhi select nahi kar sakte — har protocol ka apna use-case hai.

| Protocol | Kiske liye | Misal |
|---|---|---|
| **HTTP** (REST APIs) | Standard web traffic. Simple, stateless, cacheable. **Default choice.** | Product list, profile data, form submit |
| **WebSocket** | Real-time, dono taraf se instant (bi-directional) communication | Chat app, live multiplayer game, stock ticker |
| **SSE** (Server-Sent Events) | Sirf **server se client** ki taraf one-way real-time data, normal HTTP connection pe. WebSocket se simple | Live notifications, news feed |
| **gRPC** | High-performance, microservices. HTTP/2 pe chalta hai, JSON ki jagah **Protocol Buffers** (binary) use karta hai, isliye REST se fast aur lightweight | Services ke darmiyan communication |
| **MQTT** | IoT devices. Lightweight, kamzor internet pe bhi kaam karta hai | Smart bulbs, car trackers, smartwatches |
| **WebRTC** | Browser-to-browser (peer-to-peer) direct communication | Video call (Google Meet, Zoom type), direct file sharing |

**Do zaroori baatein:**

1. Har website ke liye WebSocket **mat** lagayein — server pe zyada load aata hai aur resources zaya hote hain. Jahan sirf data maangna ho wahan HTTP kaafi hai.
2. WebRTC mein media (video/audio) users ke darmiyan seedha jata hai, lekin shuru mein ek-dusre ko dhoondhne (signaling) ke liye ek server abhi bhi use hota hai.

**Khulasa:** HTTP web ki backbone hai. Baaqi protocols khaas zaroorat ke liye hain (real-time, IoT, microservices, video calling).

> **Is course mein humara focus HTTP aur REST par hai.** WebSocket, SSE, gRPC, MQTT, WebRTC sirf general knowledge ke liye hain.

---

## 6. Node.js Kya Hai

**Ek line ka jawab:** Node.js ek aisa software (**runtime environment**) hai jo **JavaScript language ko browser ke bahar** (computer ya server par) chalane ki taqat deta hai.

- Google Chrome ke **V8 engine** pe bana hai.
- 2009 mein **Ryan Dahl** ne banaya.
- Open source aur free hai, Windows / macOS / Linux sab pe chalta hai.

**Pehle:** JavaScript sirf browser (Chrome, Firefox) ke andar chal sakti thi. **Node.js ke baad:** wohi JavaScript server pe bhi chalti hai — matlab frontend aur backend dono **ek hi language** mein.

**Ryan Dahl ne kya kiya?** V8 engine ko uthaya, uske sath C++ ki libraries joriin, aur use operating system pe seedha chalne ke qabil bana diya. Is poore package ka naam **Node.js** rakha gaya.

### Terms Ka Farq: Language, Runtime, Library, Framework, Tool, Backend

Log Node.js ko alag alag naam se bulate hain, is liye confusion hoti hai. Pehle in alfaaz ka farq samjhein:

| Term | Matlab | Example |
|---|---|---|
| **Language** | Programming zabaan, jiske rules aur grammar hote hain | JavaScript |
| **Runtime Environment** | Woh mahol jo code ko chalane ki taqat deta hai | **Node.js** |
| **Library** | Bane-banaye code ka chhota toolbox; aap import kar ke apna kaam asaan karte hain (aap control mein hain) | React, Lodash |
| **Framework** | Bara dhancha (skeleton) jiske apne rules hote hain; aap ko uske andar reh kar app banani parti hai | Express.js, Laravel, .NET |
| **Tool** | Utilities jo development asaan banati hain | Vite, Webpack, CLI tools |
| **Backend** | Software nahi, ek **tier/layer** hai — server-side logic jo user ko nazar nahi aati | Node.js, Python etc. se banti hai |

### Tou Node.js Asal Mein Kya Hai?

| Log kehte hain | Sahi hai? | Wajah |
|---|---|---|
| "Node.js ek **JS Runtime Environment** hai" | ✅ **Haan — asli technical definition** | JavaScript ko browser se nikal kar computer/server pe chalata hai |
| "Node.js **Backend** hai" | ⚠️ Aam bolchal mein theek | Technically backend nahi, **backend banane ka zariya** hai (servers, database, APIs) |
| "Node.js **Language** hai" | ❌ Nahi | Language JavaScript hai |
| "Node.js **Framework** hai" | ❌ Nahi | Framework Express.js hai jo Node.js ke upar chalta hai |
| "Node.js **Package Manager** hai" | ❌ Nahi | Package manager **npm** hai (Node ke sath free aata hai). Log aksar Node.js aur npm ko ek hi cheez samajh lete hain |
| "Node.js **Dependency** hai" | ⚠️ Sirf is maayne mein | Aap ki app ko chalane ke liye Node.js installed hona zaroori hai. Lekin `package.json` ke `dependencies` mein **packages** (jaise `express`) likhe jate hain, Node.js nahi. Version batana ho tou optional `engines` field hoti hai |

### Node.js Ki Features

| Feature | Matlab |
|---|---|
| **Asynchronous & Non-blocking I/O** | File/network/database ka kaam shuru kar ke Node intezar nahi karta, agla kaam kar leta hai |
| **Event-driven** | Kaam events (jaise request aana) ke jawab mein hota hai |
| **Fast** | V8 engine JavaScript ko machine code mein compile karta hai |
| **Single-threaded event loop** | Ek main thread bohat saari requests ko handle karta hai |
| **Cross-platform** | Ek code, har operating system pe |
| **NPM ecosystem** | Lakhon ready-made packages |

### Benefits

- I/O wale kaam (API, chat, database calls) mein bohat tez
- Frontend aur backend dono mein **ek hi language** (JavaScript)
- Bara ecosystem — npm pe lakhon libraries
- Real-time apps (chat, notifications) ke liye achha
- Seekhna aasan, community bohat bari

### Limitations

- **CPU-heavy kaam** (video processing, bari calculations) achhe nahi — kyunke main thread block ho jata hai
- **Single main thread** — agar ek kaam bohat der le tou baqi requests intezar karti hain
- Callbacks ka ghalat use code ko mushkil bana deta hai (iska hal Class 4 mein — Promises, async/await)
- Npm pe har package quality mein achha nahi hota — soch samajh ke select karna parta hai

---

## 7. Node.js Installation

1. Browser mein jayen: **https://nodejs.org**
2. **LTS** version download karein (LTS = Long Term Support, stable, production ke liye). "Current" version mat lein.
3. Installer chalayen → Next → Next → Install (default options theek hain)
4. **Naya** terminal/PowerShell kholen (purana nahi) aur check karein:

```bash
node -v
npm -v
```

Expected output (version numbers aap ke different ho sakte hain):

```
v22.21.0
11.6.2
```

Dono ke version aa jayein tou install successful hai.

### Agar "node is not recognized" aaye

- Terminal band kar ke **dobara kholen** (PATH update hone ke liye)
- Phir bhi na chale tou computer restart karein
- Phir bhi na chale tou installer dobara chalayen

### Node REPL

Sirf `node` likhen tou interactive mode khulta hai (**R**ead-**E**val-**P**rint **L**oop) — yahan line by line JavaScript try kar sakte hain:

```
> 2 + 3
5
> console.log("Hi")
Hi
> .exit
```

---

## 8. NPM vs NVM

Dono ke naam milte-julte hain, lekin kaam bilkul alag hain:

| | **NPM** | **NVM** |
|---|---|---|
| Full form | Node Package Manager | Node Version Manager |
| Kaam | Packages (libraries) install/manage karna | Node.js ke **multiple versions** install karna aur switch karna |
| Node ke sath aata hai? | Haan, Node install karte hi mil jata hai | Nahi, alag se install karna parta hai |
| Example command | `npm install express` | `nvm use 22` |

### NPM ke kuch zaroori commands

```bash
npm init -y            # package.json file banata hai
npm install express    # package install karta hai (node_modules folder banta hai)
npm -v                 # npm ka version
```

- **`package.json`** — project ki information aur uski dependencies ki list
- **`node_modules/`** — installed packages ka folder (isay GitHub pe upload nahi karte)

### NVM kab kaam aata hai

Agar ek project ko Node 18 chahiye aur doosre ko Node 22, tou NVM se in versions ke darmiyan switch kar sakte hain.

> Windows pe **nvm-windows** alag tool hai (Mac/Linux wale `nvm` se different project). Is course ke liye NVM install karna **zaroori nahi** — sirf concept samajhna hai.

---

## 9. Node.js Architecture (Basic Idea)

Node.js ke andar teen bari cheezein kaam karti hain:

```
┌──────────────────────────────────────────────┐
│               Your JavaScript code           │
├──────────────────────────────────────────────┤
│    Node.js APIs  (http, fs, path, events ...) │
├───────────────────────┬──────────────────────┤
│  V8 Engine            │   libuv              │
│  (JS ko machine code  │   (Event loop,       │
│   mein chalata hai)   │    async I/O,        │
│                       │    thread pool)      │
├───────────────────────┴──────────────────────┤
│        Operating System (files, network)     │
└──────────────────────────────────────────────┘
```

- **V8** — Google ka JavaScript engine (C++ mein bana). JavaScript code ko tez machine code mein badalta hai.
- **libuv** — C library jo **event loop**, async file/network operations aur thread pool sambhalti hai.
- **Node.js APIs** — ready-made built-in modules (`http`, `fs`, `path`, ...) jo hum code mein use karte hain.

### Event Loop — Restaurant Example

Ek waiter (Node.js ka main thread) sochein:

- **Traditional server:** har customer ke liye ek alag waiter. 1000 customers = 1000 waiters (bohat memory).
- **Node.js:** sirf **ek waiter**. Wo order leta hai, kitchen (database/file system) ko de deta hai, **intezar nahi karta**, agle customer ka order lene chala jata hai. Jab khana ready hota hai tou wapas aa ke serve kar deta hai.

Yehi **non-blocking** hai. Is mein ek hi limitation hai: agar waiter khud koi bhari kaam (CPU-heavy) mein lag jaye, tou baqi customers intezar karte hain.

> Event loop ki poori detail **Class 4** (Async/Sync, Callbacks, Promises, async/await) mein aayegi. Aaj sirf idea chahiye. `02-global-objects.js` mein iska chota sa demo hai: timers lage hone ke bawajood "1)" line pehle print hoti hai.

---

## 10. Practical

Saari files terminal mein `node <filename>` se chalti hain. Pehle 4 programs **console-based** hain — koi window ya button nahi, sirf terminal mein text input/output. Aakhri file (`05`) ek chhota web server hai.

### Practical 01 — `01-hello.js` (Pehla Program)

VS Code mein folder kholen, `01-hello.js` banayen aur terminal mein chalayen:

```bash
node 01-hello.js
```

```js
console.log("Hello, Node.js");
console.log(typeof global, typeof process);
console.log(__filename);
console.log(__dirname);
```

Expected output (paths aap ke system ke hisab se hongay):

```
Hello, Node.js
object object
C:\...\Lecture01-Introduction\01-hello.js
C:\...\Lecture01-Introduction
```

- `console.log()` terminal pe output dikhata hai. Isi ke bhai: `console.error()` (error) aur `console.warn()` (warning).
- `typeof global` aur `typeof process` dono `object` aaye — matlab yeh bina import ke maujood hain (global objects).
- `__filename` = is file ka full path, `__dirname` = is file ke folder ka full path.

### Practical 02 — `02-global-objects.js` (Global Objects)

Global objects woh hain jo **bina `require()` ke** har file mein available hote hain. Browser mein global object `window` hota hai, Node.js mein `global` (ya `globalThis`).

| Object | Kaam |
|---|---|
| `global` / `globalThis` | Top-level global object |
| `process` | Chalte hue program ki info: `process.version`, `process.platform`, `process.argv`, `process.cwd()` |
| `console` | Output (`console.log` etc.) |
| `Buffer` | Binary data handle karna |
| `setTimeout`, `setInterval`, `clearInterval` | Timers |
| `__filename`, `__dirname` | Current file aur folder ka full path |
| `require`, `module`, `exports` | Modules ke liye (Class 2 mein detail) |

#### Ek zaroori baat (honest note)

`__filename`, `__dirname`, `require`, `module`, `exports` dekhne mein global lagte hain aur har file mein kaam karte hain, lekin yeh asal mein **global object ki properties nahi** hain — har file (module) ko apni apni copy milti hai. Proof:

```js
console.log(typeof global.__filename); // undefined
```

Expected output:

```
global is globalThis: true
Node version  : v22.21.0
Platform      : win32
Current folder: C:\...\Lecture01-Introduction
Arguments     : 2
__filename: C:\...\Lecture01-Introduction\02-global-objects.js
__dirname : C:\...\Lecture01-Introduction
global.__filename: undefined
require / module / exports: function object object
Buffer: <Buffer 4e 6f 64 65> -> Node
1) This line prints before the timers - Node does not wait
2) setInterval tick 1
2) setInterval tick 2
3) setTimeout ran after 1 second
```

**Dhyan dein:** "1)" line sabse pehle print hui, jabke `setTimeout` code mein pehle likha hua hai. Node timer ka intezar nahi karta — yehi non-blocking ka chhota sa nazara hai.

### Practical 03 — `03-constructs.js` (Programming Constructs)

Node.js mein hum **JavaScript** hi likhte hain, isliye saare constructs wohi hain. Yeh file sab ek jagah dikhati hai:

| Construct | Example |
|---|---|
| Variables | `const`, `let` |
| Data types | string, number, boolean, undefined, null, object, array |
| Operators | `+ - * / % **`, `===`, `>`, `&&`, `\|\|` |
| Conditions | `if / else if / else`, `switch` |
| Loops | `for`, `while`, `for...of` |
| Arrays | `push`, `length`, loop se access |
| Objects | `{ name: "Ali", age: 21 }` |
| Functions | `function add(a, b)`, arrow function `(a, b) => a * b` |
| Template literal | `` `${name} is learning` `` |

**`const` vs `let`:** `const` ki value dobara assign nahi ho sakti, `let` ki ho sakti hai. Default mein `const` use karein, jahan value badalni ho wahan `let`. `var` purana hai, avoid karein.

**`===` vs `==`:** hamesha `===` use karein (type bhi check karta hai). `5 === "5"` → `false`.

Expected output:

```
Variables: Node.js 25
Types: string number boolean undefined object object object
Operators: 15 5 50 2.5 1 8
Compare  : true false true false true
Grade B
Wednesday
for loop: 1
for loop: 2
for loop: 3
while loop: 3
while loop: 2
while loop: 1
Array: [ 'apple', 'banana', 'mango', 'orange' ] length = 4
 - apple
 - banana
 - mango
 - orange
Object: Ali Karachi
{ name: 'Ali', age: 22, city: 'Karachi' }
Functions: 5 6
Ali is learning Node.js
```

> `typeof null` aur `typeof []` dono `object` dete hain — yeh JavaScript ki purani quirk hai, ghalti na samjhein.

### Practical 04 — `04-console-app.js` (Console App)

Console app woh program hai jo **terminal mein** chalta hai. Ismein humne input lene ke **do tareeqe** dekhe:

1. **Command-line argument** — `process.argv` se
   ```bash
   node 04-console-app.js Ali
   ```
   `process.argv[0]` = node ka path, `[1]` = file ka path, `[2]` = pehla argument (`"Ali"`).

2. **Keyboard se input** — built-in `readline` module se: `rl.question("sawal", (jawab) => { ... })`

Program ke hisse:

- `readline.createInterface(...)` — keyboard se input aur screen pe output ka connection
- `getGrade(marks)` — marks se grade batane wali **function** (constructs wala `if` yahan kaam aaya)
- `rl.question(...)` — sawal poochta hai. Jawab milne par uske andar wali function (**callback**) chalti hai. *(Callback ki detail Class 4 mein.)*
- `Number(answer)` aur `Number.isNaN(...)` — jawab string hota hai, usay number banate hain aur check karte hain ke sahi number hai ya nahi
- `rl.close()` — input band karta hai, tab program khatam hota hai

Chalayen:

```bash
node 04-console-app.js
```

Expected output:

```
Enter your name: Ali
Enter your marks (0-100): 72
-----------------------
Name  : Ali
Marks : 72
Grade : B
-----------------------
```

Naam argument ke sath (`node 04-console-app.js Sara`) chalayen tou naam nahi poochhta, seedha marks poochhta hai.
Ghalat marks (jaise `150`) daalen tou `Invalid marks, please try again.` aata hai aur dobara poochhta hai.

### Practical 05 — `05-server.js` (Pehla Web Server)

```js
const http = require("http");

const server = http.createServer((req, res) => {
  res.end("Hello from Node server");
});

server.listen(3000, () => {
  console.log("Server running at http://localhost:3000");
});
```

Chalayen:

```bash
node 05-server.js
```

Terminal mein `Server running at http://localhost:3000` aayega. Browser mein **http://localhost:3000** kholen — `Hello from Node server` nazar aayega. Band karne ke liye terminal mein **Ctrl + C**.

**Samajhne wali baatein:**

- `require("http")` — built-in `http` module load kiya (install nahi karna parta)
- `req` = client ki **request** (jo browser ne bheji)
- `res` = hamara **response** (jo hum wapas bhej rahe hain)
- `res.end(...)` = response bhej ke khatam karta hai
- `3000` = **port number** — server is darwaze pe sunta hai
- `localhost` = aap ka apna computer
- Terminal wapas nahi aata — normal hai, server request ke intezar mein chalta rehta hai

Yeh server abhi sirf shuruaat hai. `http` module ki poori detail **Lecture 02** mein hai.

---

## Files

| File | Kya hai |
|---|---|
| `01-hello.js` | Pehla program, `global`, `process`, `__filename`, `__dirname` |
| `02-global-objects.js` | Global objects aur timers |
| `03-constructs.js` | Variables, conditions, loops, arrays, objects, functions |
| `04-console-app.js` | Console app: input lena (`process.argv`, `readline`) aur grade batana |
| `05-server.js` | Pehla web server (`http` module) |

## Common Questions / Confusions

**Q1. Node.js language hai ya framework?**
Na language, na framework. Yeh JavaScript ka **runtime environment** hai. Language JavaScript hai, framework (jaise Express) Node.js ke upar chalta hai.

**Q2. Browser wali JavaScript aur Node.js wali JavaScript mein farq?**
Language wohi hai. Farq environment ka hai: browser mein `window`, `document` (DOM) milta hai; Node.js mein `process`, file system, `http` milta hai. Node.js mein `document.getElementById` kaam nahi karta.

**Q3. NPM aur NVM mein se kaunsa zaroori hai?**
NPM — Node ke sath khud aa jata hai. NVM optional hai, sirf multiple Node versions ke liye.

**Q4. LTS aur Current mein se kaunsa lena hai?**
LTS. Stable hota hai aur zyada arsa support milta hai.

**Q5. `node` command "not recognized" kyun aa rahi hai?**
Install ke baad terminal naya kholna parta hai. Phir bhi masla ho tou restart ya re-install.

**Q6. Node.js single-threaded hai tou ek saath bohat saari requests kaise handle karta hai?**
Kyunke wo I/O kaam ke liye intezar nahi karta (non-blocking). Yeh event loop ka kamal hai — detail Class 4 mein.

**Q7. Node.js ko "Backend" kehna sahi hai?**
Aam bolchal mein haan. Technically backend ek layer hai (server-side logic), aur Node.js us layer ko banane ka zariya hai.

**Q8. HTTP "stateless" hai tou website mujhe login yaad kaise rakhti hai?**
Cookies, sessions ya tokens (JWT) ke zariye. HTTP khud kuch yaad nahi rakhta.

**Q9. HTTP, WebSocket — kaunsa use karein?**
Default HTTP. WebSocket sirf tab jab real-time, dono taraf se instant communication chahiye (chat, live game).

**Q10. Static IP lena zaroori hai?**
Seekhne ke liye nahi. Jab server ko hamesha doosron ke liye available rakhna ho (VPS/cloud, domain point karna), tab fixed public IP chahiye hoti hai.

**Q11. `192.168.1.1` public IP hai?**
Nahi, yeh private IP hai (sirf ghar/office network ke andar). Internet pe jo address dikhta hai wo public IP hai.

**Q12. `typeof null` `object` kyun deta hai?**
JavaScript ki purani known quirk hai. Null check karna ho tou `value === null` use karein.

**Q13. Server chalane ke baad terminal wapas nahi aata, kya masla hai?**
Koi masla nahi. Server chalta rehta hai request ke intezar mein. Band karne ke liye **Ctrl + C**.

**Q14. `Error: listen EADDRINUSE: address already in use :::3000` kya hai?**
Port 3000 pe pehle se koi aur server chal raha hai (shayad purana terminal). Usay Ctrl + C se band karein, ya naya port use karein (jaise 3001).

**Q15. Code badla lekin browser mein purana jawab aa raha hai?**
Server ko restart karna parta hai: Ctrl + C, phir dobara `node 05-server.js`.

## Quick Recap

- Client request bhejta hai, server response deta hai
- Dynamic apps ke liye server-side programming chahiye: database, security, business logic
- HTTP: methods (GET/POST/PUT/PATCH/DELETE), status codes (2xx/4xx/5xx), headers, **stateless**
- HTTP default hai; WebSocket real-time ke liye; SSE, gRPC, MQTT, WebRTC khaas use-cases ke liye
- Node.js = JavaScript **runtime environment** (V8 pe bana); na language, na framework, na package manager
- Acha hai I/O ke liye, CPU-heavy kaam ke liye nahi
- NPM = packages, NVM = Node versions
- V8 + libuv + Node APIs = Node.js architecture
- `global`, `process`, `console`, `__filename`, `__dirname` bina import ke milte hain
- Console app: input `process.argv` ya `readline` se, output `console.log` se
- `http.createServer((req, res) => ...)` + `server.listen(3000)` = pehla web server; band karne ke liye Ctrl + C

---

## Assignment (Self-Study)

1. **Install karein:** Node.js (LTS) aur npm install karein. `node -v` aur `npm -v` ka **screenshot** submit karein.

2. **Console script:** Ek file `info.js` banayen jo print kare:
   - Aap ka naam
   - Aaj ki date
   - `process.platform`

   Expected output (aap ka naam/date/platform hoga):
   ```
   Name: Ali Khan
   Date: 24/10/2026
   Platform: win32
   ```
   *Hint:* `new Date().toLocaleDateString()`

3. **Server:** Ek file `server.js` banayen jo port **3000** pe chale aur har request ka URL (`req.url`) **terminal mein print** kare. Browser mein `http://localhost:3000/about` kholen tou terminal mein yeh dikhna chahiye:
   ```
   /about
   ```
   *Note:* Browser aksar `/favicon.ico` ki alag request bhi bhejta hai, tou terminal mein woh bhi nazar aa sakti hai — yeh normal hai.
