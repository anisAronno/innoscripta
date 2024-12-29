# News Aggregator Platform

A full-stack news aggregation platform built with Laravel 10 (PHP 8.2) and React.js.

## 🚀 Tech Stack

### Backend

- PHP 8.2
- Laravel 10
- MySQL 8.0
- Redis
- Docker

### Frontend

- React.js
- Vite
- Node.js 18
- Docker

## 🛠 Prerequisites

- Docker & Docker Compose
- Git

## ⚡️ Quick Start

1. **Clone the Repository**

```bash
git clone <repository-url>
cd news-aggregator
```

2. **Environment Setup**

```bash
# Backend environment
cp backend/.env.example backend/.env

# Frontend environment
cp frontend/.env.example frontend/.env
```

3. **Configure Environment Variables**

Backend `.env`:

```env
APP_URL=http://localhost:8000
DB_CONNECTION=mysql
DB_HOST=db
DB_PORT=3306
DB_DATABASE=news_aggregator
DB_USERNAME=root
DB_PASSWORD=secret

REDIS_HOST=redis
REDIS_PASSWORD=null
REDIS_PORT=6379

CORS_ALLOWED_ORIGINS=http://localhost:3000
```

Frontend `.env`:

```env
VITE_API_URL=http://localhost:8000
VITE_APP_NAME="News Aggregator"
```

4. **Start Docker Containers**

```bash
docker-compose up -d --build
```

5. **Setup Backend**

```bash
# Install dependencies
docker-compose exec backend composer install

# Generate application key
docker-compose exec backend php artisan key:generate

# Run migrations
docker-compose exec backend php artisan migrate

# Cache configuration
docker-compose exec backend php artisan config:cache
```

6. **Access Applications**

- Frontend: [http://localhost:3000](http://localhost:3000)
- Backend API: [http://localhost:8000](http://localhost:8000)

## 🐳 Docker Commands

```bash
# Start containers
docker-compose up -d

# Stop containers
docker-compose down

# View logs
docker-compose logs -f

# Backend container shell
docker-compose exec backend sh

# Frontend container shell
docker-compose exec frontend sh

# Clear cache
docker-compose exec backend php artisan cache:clear
```

## 📁 Project Structure

```
news-aggregator/
├── backend/             # Laravel API
│   ├── app/
│   ├── database/
│   ├── routes/
│   └── Dockerfile
├── frontend/            # React Application
│   ├── src/
│   ├── public/
│   └── Dockerfile
└── docker-compose.yml
```

## 🔧 Development

### Backend Development

```bash
# Run tests
docker-compose exec backend php artisan test

# Create new migration
docker-compose exec backend php artisan make:migration create_table_name

# Fresh migration with seeders
docker-compose exec backend php artisan migrate:fresh --seed
```

### Frontend Development

```bash
# Install new package
docker-compose exec frontend npm install package-name
```