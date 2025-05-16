# Event Booking System Backend

A Django REST Framework backend for an event booking system that allows users to browse events, book tickets, and provides an admin panel for event management.

## Features

- User authentication with JWT tokens
- Role-based access control (Admin and User roles)
- Event management with categories
- Booking system
- Admin dashboard with statistics
- Search and filter capabilities
- API endpoints for React frontend integration

## Technologies Used

- Django 5.1
- Django REST Framework
- JWT Authentication
- Pillow (for image handling)
- Django CORS Headers
- Django Filter

## Setup Instructions

### Prerequisites

- Python 3.8+
- pip

### Installation

1. Clone the repository
```bash
git clone https://github.com/mohammedhisham1/ATC_01033627155.git

cd backend
```

2. Create and activate a virtual environment
```bash
python -m venv venv
source venv/bin/activate  # On Windows: venv\Scripts\activate
```

3. Install dependencies
```bash
pip install -r requirements.txt
```

4. Setup the database
```bash
python manage.py makemigrations
python manage.py migrate
```

5. Create a superuser (admin)
```bash
python manage.py createsuperuser
```

6. Run the development server
```bash
python manage.py runserver
```

The API will be available at `http://localhost:8000/api/`

## API Endpoints

### Authentication
- `POST /api/register/` - Register a new user
- `POST /api/token/` - Login and get JWT tokens
- `POST /api/token/refresh/` - Refresh JWT token
- `GET /api/profile/` - View user profile

### Events
- `GET /api/events/` - List all events
- `POST /api/events/` - Create a new event (admin only)
- `GET /api/events/{id}/` - Get event details
- `PUT /api/events/{id}/` - Update event (admin only)
- `DELETE /api/events/{id}/` - Delete event (admin only)

### Categories
- `GET /api/categories/` - List all categories
- `POST /api/categories/` - Create a new category (admin only)
- `PUT /api/categories/{id}/` - Update category (admin only)
- `DELETE /api/categories/{id}/` - Delete category (admin only)

### Bookings
- `GET /api/bookings/` - List user's bookings (or all for admin)
- `POST /api/bookings/` - Book an event
- `GET /api/bookings/{id}/` - Get booking details
- `DELETE /api/bookings/{id}/` - Cancel booking (admin only)

### Admin
- `GET /api/admin/stats/` - Get dashboard statistics (admin only)
- `GET /api/admin/users/` - List all users (admin only)
- `POST /api/admin/users/` - Create a new user (admin only)
- `PUT /api/admin/users/{id}/` - Update user (admin only)



## Running Tests

```bash
python manage.py test
```
