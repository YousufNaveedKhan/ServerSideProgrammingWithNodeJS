# Lecture 07 — File Upload with `formidable`

> Tested on **Node.js v22.21.0**, **formidable 3.5.4** (Windows).

## Is Lecture Mein Kya Seekhenge

1. Browser file kaise bhejta hai (`multipart/form-data`)
2. `formidable` se upload ki hui file parse karna aur save karna
3. Upload ki hifazat: size limit aur file type check

**Pichle lectures se link:** Lecture 05 mein plain form (text) ka data parha tha. File ka data alag format mein aata hai, isliye ek package (`formidable`) use karte hain.

---

## 1. Browser File Kaise Bhejta Hai?

Normal form ka data `application/x-www-form-urlencoded` hota hai (sirf text). File ke liye browser **`multipart/form-data`** use karta hai — request ki body mein text fields aur file ka binary data alag alag hisson mein hota hai.

Form mein yeh likhna **zaroori** hai:

```html
<form action="/upload" method="post" enctype="multipart/form-data">
  <input type="file" name="myfile">
</form>
```

`enctype="multipart/form-data"` bhool gaye tou file nahi, sirf file ka naam jayega.

**Formidable kyun?** multipart body ko khud parse karna bohat mushkil hai. Formidable usay parse kar ke file disk par save kar deta hai aur hamein `fields` (text) aur `files` (files) de deta hai.

## 2. Practical — `01-file-upload.js`

Pehle ek dafa:

```bash
npm install
```

Phir:

```bash
node 01-file-upload.js
```

`http://localhost:3000` kholen, ek **image** chunein, title likhein aur **Upload** dabayen. Browser mein:

```
Upload successful!
Title: My pic
Original name: pic.png
Saved as: oqfa7w6t13346o1n8eqkms2cj.png
Size: 70 bytes
```

File `uploads/` folder mein random naam se save hoti hai.

### Humne Kya Settings Lagayi (Security)

| Option | Kaam |
|---|---|
| `uploadDir` | Files kahan save hongi |
| `keepExtensions: true` | `.png` / `.jpg` extension rakhna |
| `maxFileSize` | Size ki had (2 MB). Zyada → **413** error |
| `filter` | Sirf `image/*` accept. Baqi → "No valid image received" (**400**) |

Hum ne yeh cases test kiye: image upload → **200**, text file → **400** (rad), 3 MB image → **413** (rad).

**Hamesha yaad rakhein:** upload ki hui file par bharosa nahi karte. **Size limit** lagayein, **type check** karein, aur user ke diye hue file name par bharosa na karein (Formidable khud random naam deta hai).

> **Honest note 1:** purane tutorials mein `files.myfile.filepath` likha hota hai (Formidable v2). **v3 mein `files.myfile` ek array hai:** `files.myfile[0].filepath`, aur `fields.title[0]`. Agar tutorial ka code chalte hue `undefined` de tou version ka farq check karein.
>
> **Honest note 2:** agar upload size limit se zyada ho kar fail ho tou aadhi file `uploads/` mein reh sakti hai. Asli apps mein failed uploads ki safai bhi karni hoti hai.

## Common Questions / Confusions

**Q1. File upload mein sirf file ka naam aa raha hai, file nahi?**
Form mein `enctype="multipart/form-data"` bhool gaye.

**Q2. `files.myfile.filepath` undefined hai?**
Formidable v3 mein array hai: `files.myfile[0].filepath`.

**Q3. `uploads/` GitHub par kyun nahi jata?**
Users ki files code ka hissa nahi hoti; is folder ko `.gitignore` mein rakha hai.

**Q4. Sirf file extension check kar lein (`.png`)?**
Kaafi nahi — extension badla ja sakta hai. Isliye type (`mimetype`) check karte hain; asli apps mein file ka content bhi check hota hai.

## Quick Recap

- File upload ke liye `multipart/form-data` aur `enctype` zaroori
- Formidable body parse kar ke file save karta hai; v3 mein `files.x[0]`
- Size limit (`maxFileSize`) aur type filter lagayein
- Upload folder `.gitignore` mein

**Assignment:** [`assignment.md`](assignment.md)
