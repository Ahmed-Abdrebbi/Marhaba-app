# Marhba 👋

Application mobile minimaliste d'authentification — inscription, connexion, écran d'accueil personnalisé. Le circuit complet va du formulaire mobile jusqu'à PostgreSQL, avec double protection des routes (backend via middlewares, frontend via `<Stack.Protected>`).

## Stack technique

| | |
|---|---|
| **Backend** | Node.js, Express, PostgreSQL, Sequelize, bcrypt, jsonwebtoken, dotenv |
| **Frontend** | Expo, Expo Router, Axios, Zustand, expo-secure-store |
| **Outils** | Postman, Git/GitHub, Jira |

## Structure du repo

```
marhba-app/
├── backend/
│   ├── config/         # connexion Sequelize / PostgreSQL
│   ├── models/         # modèle User
│   ├── controllers/    # logique métier (register, login, me)
│   ├── middlewares/    # logger, validateRegister, validateLogin, authenticate, errorHandler
│   ├── routes/          # /api/auth/*
│   ├── .env.example
│   └── server.js
└── mobile/
    ├── app/
    │   ├── _layout.tsx        # guard <Stack.Protected> + écran de chargement
    │   ├── (auth)/
    │   │   ├── _layout.tsx
    │   │   ├── login.tsx
    │   │   └── register.tsx
    │   └── (app)/
    │       ├── _layout.tsx
    │       └── home.tsx
    ├── services/
    │   └── api.js          # instance Axios + intercepteurs
    ├── store/
    │   └── useAuthStore.js # état global (Zustand)
    └── .env.example
```

## Prérequis

- Node.js 18+
- PostgreSQL en local (ou une instance distante)
- Expo Go installé sur ton téléphone (Android/iOS), sur le **même réseau Wi-Fi** que ton PC

## 1. Backend

```bash
cd backend
npm install
cp .env.example .env
```

Remplis `backend/.env` :

```
PORT=3000
DATABASE_URL=postgres://user:password@localhost:5432/marhba
JWT_SECRET=une_chaine_secrete_longue_et_aleatoire
```

Lance le serveur :

```bash
npm run dev
```

### Endpoints

| Méthode | Route | Accès | Description |
|---|---|---|---|
| POST | `/api/auth/register` | Publique | Inscription — retourne `{ token, user }` |
| POST | `/api/auth/login` | Publique | Connexion — retourne `{ token, user }` |
| GET | `/api/auth/me` | 🔒 `authenticate` | Retourne l'utilisateur connecté (sans mot de passe) |

## 2. Mobile

```bash
cd mobile
npx expo install expo-secure-store
npm install axios zustand
cp .env.example .env
```

Remplis `mobile/.env` — **uniquement l'URL de l'API**, jamais de secret backend :

```
EXPO_PUBLIC_API_URL=http://<TON_IP_LOCALE>:3000/api
```

> ⚠️ Trouve ton IP locale avec `ipconfig` (Windows) et utilise-la, jamais `localhost` — un téléphone/émulateur ne peut pas atteindre le `localhost` de ton PC. `JWT_SECRET` et `DATABASE_URL` n'ont rien à faire dans `mobile/.env` : ce sont des secrets serveur, le mobile n'a besoin que de l'URL de l'API.

Lance l'app :

```bash
npx expo start -c
```

Scanne le QR code avec Expo Go (Android) ou l'app Caméra (iOS).

## Sécurité

- Mots de passe hashés avec `bcrypt` (jamais en clair en base, jamais dans les réponses JSON)
- JWT signé avec un secret stocké dans `backend/.env` (jamais commité — voir `.gitignore`)
- Token expirant (`expiresIn: "7d"`)
- Message d'erreur identique pour email inexistant / mauvais mot de passe : `"Email ou mot de passe incorrect"`
- Token stocké côté mobile dans `expo-secure-store` (jamais `AsyncStorage`)
- Chaque route protégée est vérifiée **des deux côtés** : middleware `authenticate` côté backend + `<Stack.Protected>` côté frontend

## Tester avec Postman

Importe `marhba.postman_collection.json` (à exporter depuis Postman une fois tes 3 endpoints testés, avec et sans token) et vérifie :
- `register`/`login` sans token → 200
- `me` sans token → 401
- `me` avec token valide → 200
- `me` avec token expiré/invalide → 401

## Dépannage rapide

| Symptôme | Cause | Solution |
|---|---|---|
| Metro crashe en scannant `AppData` | Terminal Git Bash (MINGW64) ou pas de `watchFolders` défini | Utiliser PowerShell/cmd + définir `config.watchFolders = [__dirname]` dans `mobile/metro.config.js` |
| `npx.ps1 cannot be loaded` | Politique d'exécution PowerShell restrictive | `Set-ExecutionPolicy -Scope CurrentUser -ExecutionPolicy RemoteSigned` |
| Erreur réseau dans l'app mobile | `EXPO_PUBLIC_API_URL` pointe vers `localhost` | Remplacer par l'IP locale du PC affichée dans le terminal Expo |
| `git push` rejeté (`fetch first`) | Historique distant différent du local | `git pull origin main --allow-unrelated-histories`, résoudre les conflits, puis push |


## Auteur

Ahmed — projet individuel, 5 jours de travail, soutenance de 15 min (démo + questions).
