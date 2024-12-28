# News Aggregator Platform

## 🏗 Architecture
- Backend: Laravel 10.x API
- Frontend: React 18 with TypeScript
- Database: MySQL/PostgreSQL
- Cache: Redis
- API Sources: NewsAPI, Guardian, Reuters

## 📁 Project Structure
```
├── backend/               # Laravel API
│   ├── app/              # Core application code
│   ├── database/         # Migrations & seeds
│   └── tests/           # Backend tests
└── frontend/            # React application
    ├── src/            # Source files
    ├── public/        # Static assets
    └── tests/        # Frontend tests
```

## ⚡️ Quick Start

### Backend Setup
```bash
cd backend
composer install
cp .env.example .env
php artisan key:generate
php artisan migrate
php artisan serve
```

### Frontend Setup
```bash
cd frontend
npm install
cp .env.example .env.local
npm run dev
```

## 🔑 Environment Setup

### Backend (.env)
```
DB_CONNECTION=mysql
DB_HOST=127.0.0.1
DB_PORT=3306
DB_DATABASE=news_aggregator
DB_USERNAME=root
DB_PASSWORD=

NEWS_API_KEY=your_key
GUARDIAN_API_KEY=your_key
REUTERS_API_KEY=your_key
```

### Frontend (.env)
```
VITE_API_URL=http://localhost:8000
VITE_APP_NAME="News Aggregator"
```

## 🚀 Development

### Backend Commands
```bash
php artisan app:scrape-articles    # Fetch news
php artisan test                   # Run tests
php artisan serve                  # Start API server
```

### Frontend Commands
```bash
npm run dev     # Start dev server
npm run build   # Build for production
npm run test    # Run tests
```

## 📝 API Routes

### Articles
```
GET     /api/articles
GET     /api/articles/{id}
GET     /api/articles/search
```

### Categories
```
GET     /api/categories
GET     /api/categories/{id}/articles
```

### Authentication
```
POST    /api/auth/login
POST    /api/auth/register
POST    /api/auth/logout
```

## 🧪 Testing
```bash
# Backend tests
cd backend && php artisan test

# Frontend tests
cd frontend && npm test
```

## 📦 Production Build
```bash
# Backend
cd backend
composer install --optimize-autoloader --no-dev
php artisan config:cache
php artisan route:cache

# Frontend
cd frontend
npm run build
```

## 🔐 License
MIT