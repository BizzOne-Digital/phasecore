# PhaseCore Consulting LLC — MERN Website

Full-stack website + admin panel built with MongoDB, Express, React, Node.js.

---

## Project Structure

```
phasecore/
├── backend/          # Express API server
│   ├── config/       # DB + Cloudinary config
│   ├── controllers/  # Route logic
│   ├── middleware/   # Auth, upload, error handling
│   ├── models/       # Mongoose schemas
│   ├── routes/       # API routes
│   ├── utils/        # Email utility
│   └── server.js     # Entry point
│
└── frontend/         # React (Vite) app
    └── src/
        ├── admin/    # Admin panel (pages + components)
        ├── components/
        │   ├── layout/   # Navbar, Footer
        │   ├── sections/ # Hero, Services, etc.
        │   └── ui/       # Reusable UI
        ├── context/  # AuthContext
        ├── pages/    # Public pages
        └── utils/    # Axios API instance
```

---

## Setup Instructions

### 1. Backend

```bash
cd backend
cp .env.example .env
# Fill in all values in .env
npm install
npm run dev
```

**Required `.env` values:**
- `MONGO_URI` — MongoDB Atlas connection string
- `JWT_SECRET` — any random secret string (min 32 chars)
- `CLOUDINARY_CLOUD_NAME`, `CLOUDINARY_API_KEY`, `CLOUDINARY_API_SECRET` — from cloudinary.com
- `SMTP_HOST`, `SMTP_PORT`, `SMTP_USER`, `SMTP_PASS` — Gmail SMTP with App Password
- `ADMIN_EMAIL` — where contact form notifications go
- `CLIENT_URL` — your frontend URL (http://localhost:5173 for dev)

### 2. Frontend

```bash
cd frontend
cp .env.example .env
# Set VITE_API_URL if not using proxy (defaults to http://localhost:5000/api)
npm install
npm run dev
```

---

## First Admin Account

On first startup, visit:
```
POST http://localhost:5000/api/auth/register
Body: { "name": "Admin Name", "email": "admin@email.com", "password": "yourpassword" }
```

The first account auto-gets `superadmin` role. After that, only superadmins can create more admins.

**Admin panel URL:** `http://localhost:5173/admin/login`

---

## API Endpoints

| Method | Route | Auth | Description |
|--------|-------|------|-------------|
| POST | /api/auth/login | — | Admin login |
| GET | /api/auth/me | ✓ | Get current admin |
| POST | /api/auth/register | ✓ SuperAdmin | Create admin |
| POST | /api/contact | — | Submit contact form |
| GET | /api/contact | ✓ | Get all contacts |
| PUT | /api/contact/:id | ✓ | Update status |
| DELETE | /api/contact/:id | ✓ | Delete contact |
| GET | /api/portfolio | — | Get published items |
| GET | /api/portfolio/admin | ✓ | Get all items |
| POST | /api/portfolio | ✓ | Create item (multipart) |
| PUT | /api/portfolio/:id | ✓ | Update item |
| DELETE | /api/portfolio/:id | ✓ | Delete item |
| GET | /api/services | — | Get published services |
| POST | /api/services | ✓ | Create service |
| GET | /api/faqs | — | Get published FAQs |
| POST | /api/faqs | ✓ | Create FAQ |

---

## Public Pages

| Route | Page |
|-------|------|
| / | Home |
| /about | About Us |
| /services | Services |
| /portfolio | Portfolio (filterable) |
| /faq | FAQ (accordion) |
| /contact | Contact Form |

## Admin Pages

| Route | Page |
|-------|------|
| /admin/login | Login |
| /admin/dashboard | Overview + recent contacts |
| /admin/contacts | View/manage all inquiries |
| /admin/portfolio | Add/edit/delete portfolio items |
| /admin/services | Manage service listings |
| /admin/faqs | Manage FAQ entries |

---

## Deployment

**Backend** → Deploy to Railway, Render, or any Node host
**Frontend** → Deploy to Vercel or Netlify

Set `VITE_API_URL=https://your-backend-url.com/api` in the frontend environment.

---

## Brand Colors

| Token | Hex | Use |
|-------|-----|-----|
| Gold | `#C9962C` | Primary accent |
| Navy | `#0D1B2A` | Primary background |
| White | `#FFFFFF` | Text on dark |
| Off-white | `#F8F6F1` | Section backgrounds |
