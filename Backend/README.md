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
