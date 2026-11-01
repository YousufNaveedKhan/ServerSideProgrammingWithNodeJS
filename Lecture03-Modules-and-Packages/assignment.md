# Lecture 03 — Assignment: Modules & Packages

## Task 1 — Apna pehla package project

1. Naya folder `my-first-package` banayen aur usme terminal kholen
2. `npm init -y` chalayen
3. `npm install lodash` chalayen
4. `app.js` banayen jo lodash use kar ke yeh 3 lines print kare:
   - `_.uniq([1, 2, 2, 3, 3, 3])`
   - `_.max([4, 9, 2])`
   - `_.upperCase("hello node")`

Expected output:

```
[ 1, 2, 3 ]
9
HELLO NODE
```

## Task 2 — Built-in `path` module

`app.js` mein built-in `path` module `require` kar ke `"report.final.pdf"` ka file name aur extension print karein.

Expected output:

```
Name: report.final.pdf
Extension: .pdf
```

## Task 3 — `node_modules` wapas lana

1. `node_modules` folder delete kar dein
2. `node app.js` chalayen — kya error aata hai? (error ka screenshot lein)
3. `npm install` chalayen aur dobara `node app.js` chalayen — ab sahi chalna chahiye

## Task 4 — Chhote jawab (har ek 2-3 lines)

1. Module aur package mein kya farq hai?
2. `node_modules` ko GitHub par upload kyun nahi karte?
3. Web framework aur utility package mein kya farq hai? Har ek ki ek example dein.

## Submit Karein

- `my-first-package` folder (bina `node_modules` ke)
- Task 3 ke error ka screenshot
- Task 4 ke jawab (text file ya document)
