# UBER Clone Backend API Documentation

## Endpoints

### POST /user/register

Registers a new user.

#### Request

- **URL**: `/user/register`
- **Method**: `POST`
- **Headers**: 
  - `Content-Type: application/json`
- **Body**:

```json
    {
  "token": "string", // JWT token as a string
  "user": {
    "fullname": {
      "firstname": "string", // User's first name as a string
      "lastname": "string" // User's last name as a string
    },
    "email": "string", // User's email as a string
    "socketId": "string" // User's socket ID as a string (optional)
  }
}
```
Example:- 
  ```json
  {
    "fullname": {
      "firstname": "John",
      "lastname": "Doe"
    },
    "email": "john.doe@example.com",
    "password": "password123"
  }
  ```

#### Response

- **201 Created**:
  - **Body**:
    ```json
    {
      "token": "jwt_token",
      "user": {
        // ...user details...
      }
    }
    ```
- **400 Bad Request**:
  - **Body**:
    ```json
    {
      "errors": [
        {
          "msg": "Invalid Email",
          "param": "email",
          "location": "body"
        },
        {
          "msg": "First name must be three characters or long",
          "param": "fullname.firstname",
          "location": "body"
        },
        {
          "msg": "Password must be six characters or long",
          "param": "password",
          "location": "body"
        }
      ]
    }
    ```
- **500 Internal Server Error**:
  - **Body**:
    ```json
    {
      "message": "Internal Server Error"
    }
    ```

#### Description

This endpoint registers a new user by taking the user's full name, email, and password. The password is hashed before saving, and a JWT token is generated upon successful registration.

### POST /user/login

Logs in an existing user.

#### Request

- **URL**: `/user/login`
- **Method**: `POST`
- **Headers**:
  - `Content-Type: application/json`
- **Body**:

```json
{
  "email": "string",       // User's email as a string
  "password": "string"     // User's password as a string
}
```

Example:
```json
{
  "email": "john.doe@example.com",
  "password": "password123"
}
```

#### Response

- **200 OK**:
  - **Body**:
    ```json
    {
      "token": "jwt_token",
      "user": {
        // ...user details...
      }
    }
    ```
- **400 Bad Request**:
  - **Body**:
    ```json
    {
      "errors": [
        // ...validation errors...
      ]
    }
    ```
- **401 Unauthorized**:
  - **Body**:
    ```json
    {
      "message": "invalid email or password"
    }
    ```
- **500 Internal Server Error**:
  - **Body**:
    ```json
    {
      "message": "Internal Server Error"
    }
    ```

### GET /user/profile

Retrieves the authenticated user's profile.

#### Request

- **URL**: `/user/profile`
- **Method**: `GET`
- **Headers**: 
  - `Authorization: Bearer <jwt_token>` or use cookie with key `token`

#### Response

- **200 OK**:
  - **Body**:
    ```json
    {
      // ...user details...
    }
    ```
- **401 Unauthorized**:
  - **Body**:
    ```json
    {
      "message": "Unauthorized"
    }
    ```

### GET /user/logout

Logs out the authenticated user by clearing the token.

#### Request

- **URL**: `/user/logout`
- **Method**: `GET`
- **Headers**: 
  - `Authorization: Bearer <jwt_token>` or use cookie with key `token`

#### Response

- **200 OK**:
  - **Body**:
    ```json
    {
      "message": "Logged out"
    }
    ```
- **401 Unauthorized**:
  - **Body**:
    ```json
    {
      "message": "Unauthorized"
    }
    ```

## Captain Routes

### POST /captain/register

Registers a new captain.

#### Request

- **URL**: `/captain/register`
- **Method**: `POST`
- **Headers**: 
  - `Content-Type: application/json`
- **Body**:
```json
{
	"email": "string",                // Valid email address
	"password": "string",             // Minimum 6 characters
	"fullname": {
		"firstname": "string",        // Minimum 3 characters
		"lastname": "string"           // Optional or required based on service logic
	},
	"vehicle": {
		"capacity": number,           // Integer, at least 1
		"vehicleType": "string",      // One of: 'car', 'bike', 'auto'
		"color": "string",            // Vehicle color (required)
		"plate": "string"             // Vehicle plate number (required)
	}
}
```

#### Response

- **201 Created**:
  - **Body**:
    ```json
    {
      "token": "jwt_token",
      "captain": {
        // ...captain details...
      }
    }
    ```
- **400 Bad Request**:
  - **Body**:
    ```json
    {
      "errors": [
        // ...validation errors...
      ]
    }
    ```
- **500 Internal Server Error**:
  - **Body**:
    ```json
    {
      "message": "Internal Server Error"
    }
    ```
