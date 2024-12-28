# News Aggregator

## 📁 Directory Structure
```
├── backend/
│   ├── app/
│   ├── config/
│   ├── database/
│   ├── routes/
│   └── tests/
└── frontend/
    ├── src/
    ├── public/
    └── tests/
```

## 🚀 Quick Start

### Backend
```bash
cd backend
composer install
cp .env.example .env
php artisan key:generate
php artisan migrate
php artisan serve
```

### Frontend
```bash
cd frontend
npm install
cp .env.example .env.local
npm run dev
```

## ⚙️ Tech Stack
- Backend: Laravel 10.x, PHP 8.1+
- Frontend: React 18, TypeScript
- Database: MySQL/PostgreSQL
- API: RESTful

## 🔧 Configuration

### Backend ENV
```
DB_CONNECTION=mysql
DB_HOST=127.0.0.1
DB_PORT=3306
DB_DATABASE=news_aggregator
DB_USERNAME=root
DB_PASSWORD=

NEWS_API_KEY=
GUARDIAN_API_KEY=
REUTERS_API_KEY=
```

### Frontend ENV
```
VITE_API_URL=http://localhost:8000
VITE_APP_NAME="News Aggregator"
```

## 🧪 Testing

### Backend Tests
```bash
cd backend
php artisan test
```

### Frontend Tests
```bash
cd frontend
npm run test
```

## 📝 API Endpoints

### Articles
- GET /api/articles
- GET /api/articles/{id}
- GET /api/articles/search

### Categories
- GET /api/categories
- GET /api/categories/{id}/articles

### Auth
- POST /api/auth/login
- POST /api/auth/register
- POST /api/auth/logout

## 🔐 License
MIT