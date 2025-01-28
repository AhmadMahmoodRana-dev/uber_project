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

## Login User
Authenticate and login an existing user.

### Endpoint
```
POST /auth/login
```

### Request Body
```json
{
  "email": "user@example.com",
  "password": "yourpassword"
}
```

### Request Body Parameters
| Parameter | Type | Required | Description | Validation Rules |
|-----------|------|----------|-------------|-----------------|
| email | string | Yes | User's email address | Must be a valid email format |
| password | string | Yes | User's password | Minimum 8 characters |

### Responses

#### Success Response
**Status Code:** 200 (OK)
```json
{
  "message": "Logged in successfully",
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

##### Invalid Credentials
**Status Code:** 401 (Unauthorized)
```json
{
  "message": "Invalid email or password"
}
```

##### Invalid Data Format
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
  "message": "Error logging in",
  "error": "Error details"
}
```

## Profile Route Documentation

## Route Name: `/auth/profile`

## Description:
The `/auth/profile` route allows users to retrieve their profile information. This route is secured and requires authentication to access.

## Usage Instructions:
To access the profile information, send a GET request to the `/auth/profile` endpoint. Ensure that the user is authenticated before making the request.

```javascript
// Example usage in user.controller.js
app.get('/auth/profile', authenticateUser, (req, res) => {
    // Logic to retrieve and return user profile information
});
```

## Dependencies:
- Authentication middleware to ensure the user is logged in.

## Examples:
1. **Fetching User Profile**:
   When a user accesses their profile, the following process occurs:
   - The request is authenticated.
   - The user's profile information is retrieved and returned in the response.

## Notes:
Ensure that the authentication middleware is properly integrated to protect the profile route.

## Logout Feature Documentation

## Feature Name: Logout

## Description:
The Logout feature allows users to securely log out of the application. Upon logging out, a token is generated and added to a blacklist to prevent further access with that token.

## Usage Instructions:
To log out a user, call the logout function in your controller. This function will generate a new token and add it to the blacklist.

```javascript
// Example usage in user.controller.js
const { logout } = require('../middlewares/auth.middleware');

app.post('/logout', (req, res) => {
    logout(req, res);
});
```

## Dependencies:
- `jsonwebtoken`: For token generation.
- `blacklistToken.model.js`: To manage blacklisted tokens.

## Examples:
1. **Logging Out a User**:
   When a user logs out, the following process occurs:
   - A token is generated.
   - The token is stored in the blacklist model.

## Notes:
Ensure that the blacklist token model is properly set up to handle the tokens and that the middleware is correctly integrated into your routes.

## Captain Registration

The `registerCaptain` function handles the registration of a new captain in the system.

### Functionality:
- Validates the incoming request data for errors.
- Checks if a captain with the provided email already exists. If so, it returns an error response.
- Hashes the password and creates a new captain record in the database.
- Generates an authentication token for the newly created captain.
- Responds with a success message, including the captain's details and the token.

### Usage:
This function is typically invoked via an HTTP POST request to the registration endpoint, with the necessary captain details included in the request body.

## API Request and Response

### Request
- **Method**: `POST`
- **Endpoint**: `/api/auth/registercaptain`
- **Request Body**:
```json
{
  "fullname": {
    "firstname": "string",
    "lastname": "string"
  },
  "email": "string",
  "password": "string",
  "vehicle": {
    "color": "string",
    "plate": "string",
    "capacity": "number",
    "vehicletype": "string"
  }
}
```

### Response
- **Success (201 Created)**:
```json
{
  "message": "Captain created successfully",
  "token": "string",
  "captain": {
    "id": "string",
    "fullname": {
      "firstname": "string",
      "lastname": "string"
    },
    "email": "string",
    "vehicle": {
      "color": "string",
      "plate": "string",
      "capacity": "number",
      "vehicletype": "string"
    }
  }
}
```
- **Error (400 Bad Request)**:
```json
{
  "errors": [
    {
      "msg": "Error message",
      "param": "parameter name",
      "location": "body"
    }
  ]
}
```
- **Error (500 Internal Server Error)**:
```json
{
  "message": "Error creating captain",
  "error": "error message"
}
```

## Captain Authentication Routes

### 1. Login Captain
- **Method**: `POST`
- **Endpoint**: `/api/auth/loginCaptain`
- **Request Body**:
```json
{
  "email": "string",
  "password": "string"
}
```
- **Response**:
  - **Success (200 OK)**:
  ```json
  {
    "message": "Captain logged in successfully",
    "token": "string",
    "captain": {
      "id": "string",
      "fullname": {
        "firstname": "string",
        "lastname": "string"
      },
      "email": "string",
      "vehicle": {
        "color": "string",
        "plate": "string",
        "capacity": "number",
        "vehicletype": "string"
      }
    }
  }
  ```
  - **Error (400 Bad Request)**:
  ```json
  {
    "message": "Invalid email or password"
  }
  ```
  - **Error (500 Internal Server Error)**:
  ```json
  {
    "message": "Error logging in",
    "error": "error message"
  }
  ```

### 2. Logout Captain
- **Method**: `GET`
- **Endpoint**: `/api/auth/logoutCaptain`
- **Response**:
  - **Success (200 OK)**:
  ```json
  {
    "message": "Captain logged out successfully"
  }
  ```

### 3. Get Captain Profile
- **Method**: `GET`
- **Endpoint**: `/api/auth/captainProfile`
- **Response**:
  - **Success (200 OK)**:
  ```json
  {
    "message": "Captain profile retrieved successfully",
    "captain": {
      "id": "string",
      "fullname": {
        "firstname": "string",
        "lastname": "string"
      },
      "email": "string",
      "vehicle": {
        "color": "string",
        "plate": "string",
        "capacity": "number",
        "vehicletype": "string"
      }
    }
  }
  ```
  - **Error (404 Not Found)**:
  ```json
  {
    "message": "Captain not found"
  }
  ```
  - **Error (500 Internal Server Error)**:
  ```json
  {
    "message": "Error retrieving captain profile",
    "error": "error message"
  }
  ```
