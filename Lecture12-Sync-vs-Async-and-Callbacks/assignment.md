# Lecture 12 — Assignment: Sync, Async & Callbacks

## Task 1 — Pehle socho, phir chalao

Is code ka output **pehle likh kar** socho (kaghaz par), phir chala kar check karo:

```js
console.log("A");
setTimeout(() => console.log("B"), 100);
setTimeout(() => console.log("C"), 0);
console.log("D");
```

Expected output:

```
A
D
C
B
```

Ek-do line mein likhein: `C` `B` se pehle kyun aaya, jabke `B` code mein pehle likha hai?

## Task 2 — Do files, nested callbacks

1. Do files banayen: `a.txt` (andar: `Hello`) aur `b.txt` (andar: `World`)
2. `readTwo.js` mein `fs.readFile` ke **callbacks** se pehle `a.txt` parhein, phir uske andar `b.txt`, aur aakhir mein print karein:

```
Hello World
```

3. Ab `b.txt` ka naam ghalat kar dein (`c.txt`). Error-first callback ki wajah se program crash na ho, balke yeh print ho:

```
Could not read c.txt
```

## Task 3 — Apna delay helper

Function `delay(ms, callback)` banayen jo `ms` baad `callback` bulaye. Isay teen dafa nested istemal karein taake yeh **ek ek second ke baad** print ho:

```
One
Two
Three
```

Phir likhein: is code mein kitne levels nested hain aur agar 10 steps hote tou kya masla hota?

## Submit Karein

- Teeno tasks ki files
- Task 1 aur Task 3 ke sawalon ke jawab
