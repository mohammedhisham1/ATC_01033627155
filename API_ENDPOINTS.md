# Event Booking API Documentation

Base URL: `https://event-booking-api.vercel.app`

## Authentication
All protected endpoints require the following header:
```
Authorization: Bearer <access_token>
```

## Common Query Parameters
List endpoints support the following query parameters:
- `page`: Page number for pagination
- `page_size`: Number of items per page
- `ordering`: Field to order by (prefix with - for descending)
- `search`: Search term for filtering

## Endpoints

### Authentication

#### Register User
```http
POST /api/register/
```
**Body:**
```json
{
  "username": "string",
  "email": "user@example.com",
  "password": "string",
  "phone_number": "string",
  "date_of_birth": "YYYY-MM-DD",
  "address": "string",
  "city": "string",
  "state": "string",
  "country": "string",
  "postal_code": "string"
}
```

#### Login
```http
POST /api/token/
```
**Body:**
```json
{
  "email": "user@example.com",
  "password": "string"
}
```
**Response:**
```json
{
  "access_token": "string",
  "refresh_token": "string"
}
```

#### Refresh Token
```http
POST /api/token/refresh/
```
**Body:**
```json
{
  "refresh_token": "string"
}
```
**Response:**
```json
{
  "access_token": "string"
}
```

### User Profile

#### Get Profile
```http
GET /api/profile/
```

#### Update Profile
```http
PUT /api/profile/
```
**Body:**
```json
{
  "phone_number": "string",
  "date_of_birth": "YYYY-MM-DD",
  "address": "string",
  "city": "string",
  "state": "string",
  "country": "string",
  "postal_code": "string",
  "email_notifications": boolean,
  "sms_notifications": boolean,
  "push_notifications": boolean
}
```

### Events

#### List Events
```http
GET /api/events/
```
**Query Parameters:**
- `category`: Filter by category ID
- `search`: Search in title and description
- `date`: Filter by date
- `price_min`: Minimum price
- `price_max`: Maximum price

#### Create Event (Admin)
```http
POST /api/events/
```
**Body:**
```json
{
  "title": "string",
  "description": "string",
  "end_date": "YYYY-MM-DD HH:MM:SS",
  "venue": "integer (venue_id)",
  "price": "decimal",
  "category": "integer (category_id)",
  "total_tickets": "integer",
  "available_tickets": "integer",
  "images": ["string (URL)"],
  "is_featured": boolean
}
```

#### Get Event
```http
GET /api/events/{id}/
```

#### Update Event (Admin)
```http
PUT /api/events/{id}/
```

#### Delete Event (Admin)
```http
DELETE /api/events/{id}/
```

### Categories

#### List Categories
```http
GET /api/categories/
```

#### Create Category (Admin)
```http
POST /api/categories/
```
**Body:**
```json
{
  "name": "string",
  "description": "string"
}
```

#### Get Category
```http
GET /api/categories/{id}/
```

#### Update Category (Admin)
```http
PUT /api/categories/{id}/
```

#### Delete Category (Admin)
```http
DELETE /api/categories/{id}/
```

### Bookings

#### List User Bookings
```http
GET /api/bookings/
```

#### Create Booking
```http
POST /api/bookings/
```
**Body:**
```json
{
  "event_id": "integer",
  "event_availability_id": "integer",
  "number_of_tickets": "integer"
}
```

#### Get Booking
```http
GET /api/bookings/{id}/
```

#### Update Booking Status
```http
PUT /api/bookings/{id}/
```
**Body:**
```json
{
  "booking_status": "string (pending|confirmed|cancelled)"
}
```

#### Cancel Booking
```http
DELETE /api/bookings/{id}/
```

### Admin

#### Dashboard Statistics
```http
GET /api/admin/stats/
```
**Response:**
```json
{
  "total_users": "integer",
  "total_events": "integer",
  "total_bookings": "integer",
  "revenue": "decimal"
}
```

#### List Users (Admin)
```http
GET /api/admin/users/
```

#### Get User (Admin)
```http
GET /api/admin/users/{id}/
```

#### Update User (Admin)
```http
PUT /api/admin/users/{id}/
```
**Body:**
```json
{
  "role": "string",
  "is_active": boolean
}
```

#### Delete User (Admin)
```http
DELETE /api/admin/users/{id}/
```

## Response Codes

- `200`: Success
- `201`: Created
- `400`: Bad Request
- `401`: Unauthorized
- `403`: Forbidden
- `404`: Not Found
- `500`: Server Error

## Error Response Format
```json
{
  "error": "string",
  "message": "string",
  "details": {}
}
``` 