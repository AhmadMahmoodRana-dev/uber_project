# User API Documentation

## Register User
Register a new user in the system.

### Endpoint
```
POST /auth/register
```

### Request Body
```json
{
  "email": "user@example.com",
  "password": "yourpassword",
  "fullname": {
    "firstname": "John",
    "lastname": "Doe"
  }
}
```

### Request Body Parameters
| Parameter | Type | Required | Description | Validation Rules |
|-----------|------|----------|-------------|-----------------|
| email | string | Yes | User's email address | Must be a valid email format |
| password | string | Yes | User's password | Minimum 8 characters |
| fullname.firstname | string | Yes | User's first name | Minimum 3 characters |
| fullname.lastname | string | Yes | User's last name | Minimum 3 characters |

### Responses

#### Success Response
**Status Code:** 201 (Created)
```json
{
  "message": "User created successfully",
  "token": "jwt_token_here",
  "user": {
    "fullname": {
      "firstname": "John",
      "lastname": "Doe"
    },
    "email": "user@example.com"
  }
}
```

#### Error Responses

##### Invalid Data
**Status Code:** 400 (Bad Request)
```json
{
  "message": "Invalid data",
  "errors": [
    {
      "msg": "Invalid Email",
      "param": "email",
      "location": "body"
    }
  ]
}
```

##### Server Error
**Status Code:** 500 (Internal Server Error)
```json
{
  "message": "Error creating user",
  "error": "Error message details"
}
```

### Example cURL Request
```bash
curl -X POST http://your-api-url/auth/register \
  -H "Content-Type: application/json" \
  -d '{
    "email": "user@example.com",
    "password": "yourpassword",
    "fullname": {
      "firstname": "John",
      "lastname": "Doe"
    }
  }'
```

### Notes
- All fields are required
- Password is hashed before storing in the database
- A JWT token is generated and returned upon successful registration
- Email must be unique in the system
