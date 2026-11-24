# Lecture 11 — Assignment: Books REST API

Express mein **Books** ki REST API banayen (`books-api.js`, port 3000). Data memory mein (array) rakhein.

## Starting Data

```js
let books = [
  { id: 1, title: "Learn Node.js", author: "Ali Raza", price: 450 },
  { id: 2, title: "JavaScript Basics", author: "Sara Khan", price: 300 },
  { id: 3, title: "REST API Guide", author: "Ali Raza", price: 600 },
];
```

## Endpoints

| Method | URL | Kaam | Kamyab status |
|---|---|---|---|
| GET | `/books` | Saari books. Filters: `?author=Ali Raza` aur/ya `?maxPrice=500` | 200 |
| GET | `/books/:id` | Ek book | 200 |
| POST | `/books` | Nayi book (`title`, `author`, `price`) | **201** |
| PUT | `/books/:id` | Poori book update | 200 |
| DELETE | `/books/:id` | Book hatana | **204** |

## Qaide (Validation)

1. `title` aur `author` khali nahi hone chahiyen, `price` ek **number** hona chahiye aur `0` se zyada. Warna **400** `{"error":"Invalid book data"}`
2. Jis `id` ki book na ho uske liye GET/PUT/DELETE **404** `{"error":"Book not found"}`
3. Na milne wala URL: **404** `{"error":"Route not found"}`
4. Toota hua JSON: **400** `{"error":"Invalid JSON"}`

## Expected Output

| Request | Status | Jawab |
|---|---|---|
| `GET /books?maxPrice=500` | 200 | `id` 1 aur 2 wali books |
| `GET /books?author=Ali Raza&maxPrice=500` | 200 | Sirf `id` 1 |
| `POST /books` `{"title":"Express Guide","author":"Sara Khan","price":500}` | 201 | `{"id":4,"title":"Express Guide","author":"Sara Khan","price":500}` |
| `POST /books` `{"title":"X","author":"Y","price":"free"}` | 400 | `{"error":"Invalid book data"}` |
| `DELETE /books/2` | 204 | (khali) |
| `GET /books/2` (delete ke baad) | 404 | `{"error":"Book not found"}` |

## Hints

- `req.query.maxPrice` string hota hai: `Number(...)` karein
- Filters ek ke baad ek laga sakte hain (`filter` ke upar `filter`)
- `typeof price === "number"` se number check hota hai

## Chhote Jawab

1. `PUT /books/1` aur `POST /books` mein kya farq hai?
2. Delete par 204 kyun diya?

## Submit Karein

- `books-api.js`
- Postman screenshots: 201 (POST), 400 (validation), 404 (delete ke baad GET)
- Chhote jawab
