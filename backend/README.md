# News Aggregator Backend

## 🛠 Tech Stack
- PHP 8.2+
- Laravel 10.x
- MySQL/PostgreSQL
- Redis (optional)

## 📋 Requirements
- PHP >= 8.2
- Composer
- MySQL/PostgreSQL
- News API Keys

## ⚡️ Installation

```bash
# Install dependencies
composer install

# Configure environment
cp .env.example .env

# Generate application key
php artisan key:generate

# Run migrations
php artisan migrate

# Start server
php artisan serve
```

## 📁 Project Structure
```
├── app/
│   ├── Console/Commands/       # CLI Commands
│   ├── Http/Controllers/      # API Controllers
│   ├── Models/               # Database Models
│   ├── Services/            # Business Logic
│   └── Observers/          # Model Observers
├── config/                 # Configuration files
├── database/
│   ├── migrations/        # Database migrations
│   └── seeders/          # Database seeders
├── routes/
│   └── api.php          # API routes
└── tests/              # Test files
```

## 🔑 Environment Variables
```
DB_CONNECTION=mysql
DB_HOST=127.0.0.1
DB_PORT=3306
DB_DATABASE=news_aggregator
DB_USERNAME=root
DB_PASSWORD=

NEWS_API_KEY=your_newsapi_key
GUARDIAN_API_KEY=your_guardian_key
REUTERS_API_KEY=your_reuters_key
```

## 🚀 Available Commands
```bash
# Fetch articles from sources
php artisan app:scrape-articles

# Run scheduled tasks
php artisan schedule:run
```

## 🔄 API Endpoints

### Articles
```
GET    /api/articles
GET    /api/articles/{id}
GET    /api/articles/search
```

### Categories
```
GET    /api/categories
GET    /api/categories/{id}/articles
```

### Sources
```
GET    /api/sources
GET    /api/sources/{id}/articles
```

## 🧪 Testing
```bash
# Run all tests
php artisan test

# Run specific test
php artisan test --filter=ArticleTest
```

## 📦 Cache
```bash
# Clear application cache
php artisan cache:clear

# Clear config cache
php artisan config:clear
```

## 🔒 License
MIT