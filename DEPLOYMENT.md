# Frontend Deployment Guide

## 🚀 Quick Start

### 1. Environment Setup

Copy the example environment file:
```bash
cp .env.example .env.local
```

Update `.env.local` with your API URL:
```bash
# Production (Railway Backend)
NEXT_PUBLIC_API_URL=https://backend-lamis-production.up.railway.app/api/v1

# OR Local Development
# NEXT_PUBLIC_API_URL=http://127.0.0.1:8000/api/v1
```

### 2. Install Dependencies

```bash
npm install
```

### 3. Run Development Server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to see the application.

## 🌐 API Configuration

The frontend connects to the Django REST API using the `NEXT_PUBLIC_API_URL` environment variable.

### Current Production API
**Backend URL:** `https://backend-lamis-production.up.railway.app`

**API Base:** `https://backend-lamis-production.up.railway.app/api/v1`

### API Endpoints Used

The application uses these API services:

**Products API** (`services/api/products.ts`):
- `/api/v1/sections/` - Get all sections
- `/api/v1/brands/` - Get all brands
- `/api/v1/categories/` - Get all categories
- `/api/v1/collections/` - Get all collections
- `/api/v1/types/` - Get product types
- `/api/v1/products/` - Get products with filters
- `/api/v1/products/{slug}/` - Get product by slug
- `/api/v1/catalog/{section}/{category}/{item}/` - Catalog navigation
- `/api/v1/search/` - Search products

**Tutorials API** (`services/api/tutorials.ts`):
- `/api/v1/tutorials/{category}/` - Get video tutorials

## 🔧 CORS Configuration

Ensure your backend has CORS configured to allow your frontend domain.

**Backend CORS Settings:**
```python
# In backend settings.py
CORS_ALLOWED_ORIGINS = [
    'http://localhost:3000',  # Local development
    'https://your-frontend.vercel.app',  # Production
]
```

## 📦 Deployment (Vercel)

### 1. Connect Repository
- Go to [Vercel Dashboard](https://vercel.com/dashboard)
- Click "Add New Project"
- Import your GitHub repository

### 2. Configure Environment Variables
In Vercel project settings → Environment Variables:

```bash
NEXT_PUBLIC_API_URL=https://backend-lamis-production.up.railway.app/api/v1
```

### 3. Deploy
- Vercel will automatically deploy on push to main branch
- Or click "Deploy" manually

### 4. Update Backend CORS
After deployment, add your Vercel domain to backend CORS:

**In Railway Backend Variables:**
```bash
CORS_ALLOWED_ORIGINS=http://localhost:3000,https://your-app.vercel.app
ALLOWED_HOSTS=backend-lamis-production.up.railway.app,your-custom-domain.com
```

## ✅ Testing Connection

### Test API Connection
```bash
# Check if backend is accessible
curl https://backend-lamis-production.up.railway.app/api/v1/sections/
```

### Test Frontend
```bash
# Start dev server
npm run dev

# Open browser and check Network tab
# Should see successful API calls to your backend
```

## 🐛 Troubleshooting

### CORS Errors
**Error:** "Access to fetch has been blocked by CORS policy"

**Solution:**
1. Add your frontend domain to backend `CORS_ALLOWED_ORIGINS`
2. Ensure you're using the full URL with protocol (https://)
3. Restart your Railway backend after changing environment variables

### 404 Errors
**Error:** "Failed to fetch sections: Not Found"

**Solution:**
1. Check `NEXT_PUBLIC_API_URL` in `.env.local`
2. Ensure it includes `/api/v1` at the end
3. Verify backend is deployed and accessible

### DisallowedHost Error
**Error:** Backend returns 400 DisallowedHost

**Solution:**
1. Add your Railway domain to backend `ALLOWED_HOSTS`
2. Format: `backend-lamis-production.up.railway.app`

## 📁 File Structure

```
frontend-lamis/
├── .env.local              # Your local config (not in git)
├── .env.example            # Example config (in git)
├── services/
│   └── api/
│       ├── products.ts     # Products API service
│       └── tutorials.ts    # Tutorials API service
├── components/             # React components
├── app/                    # Next.js app directory
└── package.json
```

## 🔗 Related Documentation

- [Backend Railway Setup](../backend-lamis/RAILWAY_SETUP.md)
- [Next.js Documentation](https://nextjs.org/docs)
- [Vercel Deployment](https://vercel.com/docs)
