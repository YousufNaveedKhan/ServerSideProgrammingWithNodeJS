# Lecture 13 — Assignment: Promises & async/await

## Task 1 — Promise function

`delay(ms)` function banayen jo ek Promise return kare aur `ms` milliseconds baad resolve ho. Phir `.then()` se yeh print karein:

```
Waited 1 second
```

## Task 2 — Callback ko Promise banayen

Lecture 12 ke tareeqe se `fs.readFile` callback wala function `readFilePromise(filename)` banayen jo **`new Promise`** mein lapeta ho (`fs/promises` use **nahi** karna). `readFilePromise("a.txt")` kamyab ho tou content de, warna reject kare.

`.then` / `.catch` se test karein:

```
Content: Hello
```

aur ghalat naam par:

```
Error: Could not read missing.txt
```

## Task 3 — async/await report

Teen functions banayen jo har ek 300 ms baad kuch return kare: `getStudent()` → `{ name: "Ali" }`, `getMarks()` → `85`, `getGrade(marks)` → `"A"` (80+ par A, warna B). `async function report()` mein **ek ke baad ek `await`** kar ke print karein:

```
Ali scored 85, grade A
```

Poora `report()` `try/catch` mein ho. Time (ms) bhi print karein (taqreeban 900).

## Task 4 — Parallel

Task 3 ke pehle do functions (`getStudent` aur `getMarks`) ko `Promise.all` se **ek sath** chalayen aur dikhayen ke ab taqreeban 300 ms lagte hain. Ek-do line mein likhein: `getGrade` ko bhi `Promise.all` mein kyun nahi daal sakte?

## Submit Karein

- Chaaron tasks ki files
- Task 4 ke sawal ka jawab
