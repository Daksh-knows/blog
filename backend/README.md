# Blogging Platform API Documentation

Base URL: `http://localhost:5000/api/v1`

## Authentication Endpoints

### 1. Register User

**POST** `/auth/register`

**Body:**

```json
{
  "name": "John Doe",
  "email": "john@example.com",
  "password": "password123"
}
```

**Response:**

```json
{
  "success": true,
  "message": "User registered successfully",
  "data": {
    "token": "jwt_token_here",
    "user": {
      "id": "user_id",
      "name": "John Doe",
      "email": "john@example.com",
      "role": "user"
    }
  }
}
```

### 2. Login User

**POST** `/auth/login`

**Body:**

```json
{
  "email": "john@example.com",
  "password": "password123"
}
```

### 3. Get Current User

**GET** `/auth/me`

**Headers:** `Authorization: Bearer {token}`

### 4. Logout

**POST** `/auth/logout`

**Headers:** `Authorization: Bearer {token}`

---

## Posts Endpoints

### 5. Get All Published Posts (Public)

**GET** `/posts?page=1&limit=10&tag=technology&search=keyword`

**Query Parameters:**

- `page` (optional): Page number
- `limit` (optional): Items per page
- `tag` (optional): Filter by tag
- `search` (optional): Search in title/content

### 6. Get Single Post (Public)

**GET** `/posts/:id`

### 7. Get My Posts (Private)

**GET** `/posts/user/me`

**Headers:** `Authorization: Bearer {token}`

### 8. Create Post (Private)

**POST** `/posts`

**Headers:** `Authorization: Bearer {token}`

**Body:**

```json
{
  "title": "My Blog Post",
  "content": "This is the content of my blog post...",
  "excerpt": "Short description",
  "status": "published",
  "tags": ["technology", "javascript"]
}
```

### 9. Update Post (Private)

**PUT** `/posts/:id`

**Headers:** `Authorization: Bearer {token}`

**Body:** Same as create post

### 10. Delete Post (Private)

**DELETE** `/posts/:id`

**Headers:** `Authorization: Bearer {token}`

---

## Admin Endpoints

### 11. Get All Posts (Admin)

**GET** `/posts/admin/all`

**Headers:** `Authorization: Bearer {admin_token}`

### 12. Get All Users (Admin)

**GET** `/posts/admin/users`

**Headers:** `Authorization: Bearer {admin_token}`

### 13. Get Dashboard Stats (Admin)

**GET** `/posts/admin/stats`

**Headers:** `Authorization: Bearer {admin_token}`

**Response:**

```json
{
  "success": true,
  "data": {
    "totalUsers": 10,
    "totalPosts": 25,
    "publishedPosts": 20,
    "draftPosts": 5,
    "recentPosts": [...]
  }
}
```

---

## Error Responses

All error responses follow this format:

```json
{
  "success": false,
  "message": "Error message here",
  "errors": [
    {
      "field": "email",
      "message": "Email is required"
    }
  ]
}
```

**Common Status Codes:**

- `200` - Success
- `201` - Created
- `400` - Bad Request
- `401` - Unauthorized
- `403` - Forbidden
- `404` - Not Found
- `500` - Server Error

---

## Postman Collection

Import this JSON into Postman:

```json
{
  "info": {
    "name": "Blogging Platform API",
    "schema": "https://schema.getpostman.com/json/collection/v2.1.0/collection.json"
  },
  "item": [
    {
      "name": "Auth",
      "item": [
        {
          "name": "Register",
          "request": {
            "method": "POST",
            "header": [],
            "body": {
              "mode": "raw",
              "raw": "{\n  \"name\": \"John Doe\",\n  \"email\": \"john@example.com\",\n  \"password\": \"password123\"\n}",
              "options": {
                "raw": {
                  "language": "json"
                }
              }
            },
            "url": {
              "raw": "{{base_url}}/auth/register",
              "host": ["{{base_url}}"],
              "path": ["auth", "register"]
            }
          }
        },
        {
          "name": "Login",
          "request": {
            "method": "POST",
            "header": [],
            "body": {
              "mode": "raw",
              "raw": "{\n  \"email\": \"john@example.com\",\n  \"password\": \"password123\"\n}",
              "options": {
                "raw": {
                  "language": "json"
                }
              }
            },
            "url": {
              "raw": "{{base_url}}/auth/login",
              "host": ["{{base_url}}"],
              "path": ["auth", "login"]
            }
          }
        }
      ]
    }
  ],
  "variable": [
    {
      "key": "base_url",
      "value": "http://localhost:5000/api/v1"
    },
    {
      "key": "token",
      "value": ""
    }
  ]
}
```

---

## Creating an Admin User

To create an admin user, you can either:

1. **Manually update in MongoDB:**

```javascript
db.users.updateOne({ email: "admin@example.com" }, { $set: { role: "admin" } });
```

2. **Or modify the User model temporarily** to allow admin registration during development
