# Agoralia

A modern, scalable cold calling and lead management platform with AI-powered agents, multi-language support, and comprehensive CRM integration.

## 🚀 Features

- **AI-Powered Agents**: Retell integration for intelligent outbound/inbound calling
- **Multi-Language Support**: 5 languages (EN, IT, FR, AR, HI) with RTL support
- **Lead Management**: Advanced filtering, scoring, and campaign management
- **CRM Integration**: HubSpot, Zoho, Odoo, Google Calendar
- **Compliance**: Legal review, country-specific rules, DNC management
- **Analytics**: Real-time dashboards, call analytics, performance metrics
- **Team Management**: Role-based access control, multi-user support

## 🛠 Tech Stack

### Frontend
- **React 18** with Vite
- **Internationalization (i18n)** with lazy-loaded locales
- **Modern UI/UX** with CSS variables and dark mode
- **Responsive Design** with mobile-first approach

### Backend
- **FastAPI** (Python 3.11+)
- **SQLAlchemy** with Alembic migrations
- **Redis** for caching and session management
- **Dramatiq** for background task processing

### Infrastructure
- **Frontend**: Vercel (CDN + Edge Functions)
- **Backend**: Railway (API + Worker)
- **Database**: Railway Postgres
- **Cache**: Upstash Redis
- **Storage**: Cloudflare R2
- **Voice**: Retell AI

## 📁 Project Structure

```
agoralia/
├── frontend/                 # React application
│   ├── src/
│   │   ├── components/      # Reusable UI components
│   │   ├── pages/          # Application pages
│   │   ├── layouts/        # Layout components
│   │   ├── lib/            # Utilities and API
│   │   └── locales/        # i18n translation files
│   ├── package.json
│   └── vite.config.js
├── backend/                 # FastAPI application
│   ├── alembic/            # Database migrations
│   ├── main.py             # Main application
│   ├── worker.py           # Background tasks
│   └── requirements.txt
└── README.md
```

## 🚀 Quick Start

### Prerequisites
- Python 3.11+
- Node.js 18+
- PostgreSQL
- Redis

### Frontend Setup
```bash
cd frontend
npm install
npm run dev
```

### Backend Setup
```bash
cd backend
python -m venv venv
source venv/bin/activate  # On Windows: venv\Scripts\activate
pip install -r requirements.txt

# Set environment variables
cp .env.example .env
# Edit .env with your configuration

# Run migrations
alembic upgrade head

# Start the application
uvicorn main:app --reload
```

### Worker Setup
```bash
cd backend
dramatiq worker
```

## 🌍 Internationalization

The application supports 5 languages:
- **English (en-US)** - Default
- **Italian (it-IT)**
- **French (fr-FR)**
- **Arabic (ar-EG)** - RTL support
- **Hindi (hi-IN)**

Translations are lazy-loaded and support fallback mechanisms.

## 🔧 Configuration

### Environment Variables

#### Backend
```bash
DATABASE_URL=postgresql://user:pass@localhost/db
REDIS_URL=redis://localhost:6379
RETELL_API_KEY=your_retell_key
RETELL_WEBHOOK_SECRET=your_webhook_secret
DEFAULT_FROM_NUMBER=+12025551234
JWT_SECRET=your_jwt_secret
FRONTEND_ORIGIN=https://your-app.vercel.app
ADMIN_EMAILS=admin@example.com
```

#### Frontend
```bash
VITE_API_BASE_URL=https://your-api.railway.app
```

## 🚀 Deployment

### Frontend (Vercel)
1. Connect your GitHub repository to Vercel
2. Set build command: `npm ci && npm run build`
3. Set output directory: `dist`
4. Configure environment variables

### Backend (Railway)
1. Create two services:
   - **API Service**: `uvicorn backend.main:app --host 0.0.0.0 --port $PORT`
   - **Worker Service**: `dramatiq backend.worker`
2. Configure environment variables
3. Set up PostgreSQL and Redis services

### Database
- Run migrations: `alembic upgrade head`
- Seed initial data if needed

## 📚 API Documentation

Once deployed, API documentation is available at:
- **Swagger UI**: `/docs`
- **ReDoc**: `/redoc`

## 🔒 Security

- JWT-based authentication
- Role-based access control
- Admin-only endpoints with email verification
- CORS configuration for production domains
- Environment variable protection

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests if applicable
5. Submit a pull request

## 📄 License

This project is proprietary software. All rights reserved.

## 🆘 Support

For support and questions:
- Create an issue on GitHub
- Contact the development team

---

**Agoralia** - Transforming cold calling with AI intelligence.
