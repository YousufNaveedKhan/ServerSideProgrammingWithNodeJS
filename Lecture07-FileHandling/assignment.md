# Lecture 08 — Assignment: PDF Upload

`01-file-upload.js` ko copy kar ke `pdf-upload.js` banayen aur badlein:

1. Sirf **PDF** files (`application/pdf`) accept hon
2. Size limit **1 MB** ho
3. Kamyab upload par response mein file ka size **KB** mein dikhayen (jaise `Size: 245.3 KB`, ek decimal tak)
4. Agar PDF na ho tou status **400** aur text `Only PDF files are allowed`
5. Agar 1 MB se bari ho tou status **413** (Formidable ka error code khud de dega)

## Test Karein

| File | Expected |
|---|---|
| Koi chhoti PDF | `Upload successful!` aur size KB mein |
| Koi PNG image | 400: `Only PDF files are allowed` |
| 1 MB se bari PDF | 413 error |

## Chhote Jawab

1. Sirf extension (`.pdf`) check karna kaafi kyun nahi?
2. `uploads/` folder `.gitignore` mein kyun hai?

## Submit Karein

- `pdf-upload.js`
- Teeno test cases ka screenshot
- Chhote jawab
