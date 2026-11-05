# Lecture 06 — Assignment: Local Modules

## Task 1 — Temperature module

`temperature.js` module banayen jis mein 2 functions hon: `celsiusToFahrenheit(c)` aur `fahrenheitToCelsius(f)`. `main.js` mein usay `require` kar ke print karein.

Expected output:

```
37C = 98.6F
98.6F = 37C
```

*Hint:* F = C × 9 / 5 + 32

## Task 2 — Counter aur caching

`counter.js` banayen jis ke andar ek `count` variable (0 se shuru) ho aur ek function `increment()` jo count ko 1 se barha kar naya value return kare. Sirf `increment` export karein.

`main.js` mein `counter.js` ko **do alag variables** mein `require` karein (`a` aur `b`) aur yeh chalayen:

```js
console.log(a.increment(), b.increment(), a.increment());
```

Expected output:

```
1 2 3
```

Is ka jawab likhein: teen numbers `1 1 2` ki jagah `1 2 3` kyun aaye?

## Task 3 — Class module

`Student.js` mein ek `Student` class banayen (`name`, `marks`, method `isPassed()` jo `marks >= 40` par `true` de). Export kar ke `main.js` mein do students banayen aur `Sara (72): Pass` aur `Bilal (35): Fail` jaisi lines print karein.

## Submit Karein

- Teeno tasks ki files
- Task 2 ke sawal ka jawab
