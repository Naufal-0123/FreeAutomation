# Firebase Login (React + Vite)

Login email/password dengan Firebase Authentication. Setelah login diarahkan ke `/dashboard`, yang punya tombol Keluar.

## Setup
1. Firebase Console > Authentication > Sign-in method > aktifkan **Email/Password**.
2. Tab **Users** > Add user (buat akun uji).
3. Project settings > Your apps > Web app > salin config.
4. `cp .env.example .env` lalu isi nilainya.
5. `npm install` lalu `npm run dev` (buka http://localhost:5173).

## Selector untuk automation testing
| Elemen | Selector |
|---|---|
| Input email | `[data-testid="email-input"]` |
| Input password | `[data-testid="password-input"]` |
| Tombol login | `[data-testid="login-button"]` |
| Pesan error | `[data-testid="error-message"]` |
| Judul dashboard | `[data-testid="dashboard-title"]` |
| Email user | `[data-testid="user-email"]` |
| Tombol logout | `[data-testid="logout-button"]` |

## Deploy
`npm run build` lalu `firebase deploy` (Firebase Hosting, public dir: `dist`, single-page app: yes).
Tambahkan domain hosting ke Authentication > Settings > Authorized domains.
