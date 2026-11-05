# Lecture 05 — Assignment: Registration Form

`register.js` mein ek server banayen (port 3000).

## Routes

| URL | Method | Jawab |
|---|---|---|
| `/` | GET | HTML form: `name`, `email`, `course` (teen inputs) aur **Register** button. Form `/register` par **POST** kare |
| `/register` | POST | Teeno values ke sath HTML page: `<h1>Registered!</h1>` aur neeche `Name`, `Email`, `Course` ki list |
| `/search?q=node` | GET | `text/plain`: `You searched for: node` (agar `q` na ho tou `You searched for: nothing`) |
| Koi aur | any | 404 text |

## Qaide

1. Teeno fields mein se koi khali ho tou status **400** aur text `All fields are required`
2. User ke diye hue teeno values HTML mein dalne se pehle **escape** karein
3. Har registration par terminal mein `querystring.stringify(form)` ka output print karein

## Expected Output

Form mein `Ali Khan`, `ali@example.com`, `Node.js` bharne par terminal:

```
name=Ali%20Khan&email=ali%40example.com&course=Node.js
```

Browser mein: **Registered!** ke neeche teeno values.

`name` mein `<b>Ali</b>` likhne par page par `<b>Ali</b>` text ki tarah dikhna chahiye (bold nahi).

## Submit Karein

- `register.js`
- Screenshot: kamyab registration, khali field wala 400, aur `<b>` wala escape test
