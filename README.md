# Event Booking System

A full-stack event booking application built with React, TypeScript, Django, and Django REST Framework.

## Table of Contents
- [Features](#features)
- [Tech Stack](#tech-stack)
- [Getting Started](#getting-started)
  - [Prerequisites](#prerequisites)
  - [Backend Setup](#backend-setup)
  - [Frontend Setup](#frontend-setup)
- [Project Structure](#project-structure)
- [API Documentation](#api-documentation)
- [Development](#development)
- [Deployment](#deployment)
- [Contributing](#contributing)

## Features

- User authentication and authorization
- Event creation and management
- Event categories and filtering
- Ticket booking system
- Payment processing
- User profiles
- Admin dashboard
- Real-time notifications
- Location-based event search

## Tech Stack

### Backend
- Python 3.9+
- Django 4.2+
- Django REST Framework
- PostgreSQL
- JWT Authentication
- Stripe Payment Integration

### Frontend
- React 18
- TypeScript
- Vite
- TailwindCSS
- Zustand (State Management)
- React Query
- Axios
- React Router DOM

## Getting Started

### Prerequisites

- Python 3.9 or higher
- Node.js 16 or higher
- npm or yarn
- PostgreSQL (recommended) or SQLite

### Backend Setup

1. Create and activate virtual environment:
```bash
cd Backend
python -m venv venv
# On Windows
.\venv\Scripts\activate
# On macOS/Linux
source venv/bin/activate
```

2. Install dependencies:
```bash
pip install -r requirements.txt
```

3. Set up environment variables:
```bash
# Create .env file in Backend directory
SECRET_KEY=your_secret_key
DEBUG=True
DATABASE_URL=your_database_url
STRIPE_SECRET_KEY=your_stripe_key
```

4. Run migrations:
```bash
python manage.py migrate
```

5. Create superuser:
```bash
python manage.py createsuperuser
```

6. Start development server:
```bash
python manage.py runserver
```

The backend will be available at `http://localhost:8000`

### Frontend Setup

1. Install dependencies:
```bash
cd Frontend
npm install
```

2. Set up environment variables:
```bash
# Create .env file in Frontend directory
VITE_API_URL=http://localhost:8000/api
```

3. Start development server:
```bash
npm run dev
```

The frontend will be available at `http://localhost:3000`

## Project Structure

### Backend Structure
```
Backend/
├── event_booking_system/  # Project settings
├── events/               # Events app
├── bookings/            # Bookings app
├── users/               # User management app
├── requirements.txt     # Python dependencies
└── manage.py           # Django management script
```

### Frontend Structure
```
Frontend/
├── src/
│   ├── components/     # Reusable components
│   ├── hooks/         # Custom hooks
│   ├── lib/           # Utilities and services
│   ├── pages/         # Page components
│   └── App.tsx        # Root component
├── package.json
└── vite.config.ts
```

## API Documentation

Detailed API documentation is available in `API_ENDPOINTS.md`. The API follows RESTful conventions and uses JWT for authentication.

### Authentication
- All protected endpoints require Bearer token authentication
- Tokens can be obtained through `/api/token/`
- Refresh tokens at `/api/token/refresh/`

### Rate Limiting
- API requests are limited to 100 requests per minute per user
- Unauthenticated requests are limited to 20 requests per minute

### Error Handling
- API returns standard HTTP status codes
- Error responses include detailed messages and error codes

## Development

### Backend Development

1. Running tests:
```bash
python manage.py test
```

2. Code formatting:
```bash
black .
```

3. Linting:
```bash
flake8
```

### Frontend Development

1. Running tests:
```bash
npm run test
```

2. Linting:
```bash
npm run lint
```

3. Building for production:
```bash
npm run build
```

## Deployment

### Backend Deployment

1. Set production environment variables
2. Collect static files:
```bash
python manage.py collectstatic
```
3. Configure your web server (e.g., Nginx)
4. Use Gunicorn for production server

### Frontend Deployment

1. Build the production bundle:
```bash
npm run build
```
2. Deploy the `dist` directory to your hosting service
3. Configure your web server for SPA routing

## Contributing

1. Fork the repository
2. Create a feature branch
3. Commit your changes
4. Push to the branch
5. Create a Pull Request

## License

This project is licensed under the MIT License - see the LICENSE file for details.
