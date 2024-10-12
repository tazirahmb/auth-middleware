---
description: 'Wrapper Router yang ditambah fitur autentikasi dan selection berdasarkan role.'
labels: ['elements', 'react', 'javascript']
---

// TODO:

- [x] Dokumentasi (penjelasan)
- [ ] composition
  - [ ] auth (login)
  - [ ] auth (blm login)
  - [ ] auth (akses level berbeda)
  - [ ] unauth (login)
  - [ ] unauth (blm login)
  - [ ] redirect
- [ ] test

## Short Overview

RouteMiddleware adalah komponen yang sudah ditambahkan validasi autentikasi. Komponen ini dapat otomatis me-redirect jika tidak sesuai `authType` atau `role` yang telah ditentukan.
