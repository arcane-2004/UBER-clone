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

### GET /captain/profile

Retrieves the authenticated captain's profile.

- **URL**: `/captain/profile`
- **Method**: `GET`
- **Headers**:
  - `Authorization: Bearer <jwt_token>` or cookie with key `token`
- **Response**:
  - **200 OK**:
    ```json
    {
      "captain": {
        // ...captain details...
      }
    }
    ```
  - **401 Unauthorized**:
    ```json
    {
      "message": "Unauthorized"
    }
    ```

### GET /captain/logout

Logs out the authenticated captain by invalidating the current JWT token and clearing the cookie.

- **URL**: `/captain/logout`
- **Method**: `GET`
- **Headers**:
  - `Authorization: Bearer <jwt_token>` or cookie with key `token`
- **Response**:
  - **200 OK**:
    ```json
    {
      "message": "Logout successfully"
    }
    ```
  - **401 Unauthorized**:
    ```json
    {
      "message": "Unauthorized"
    }
    ```

---

## Ride Routes

### POST /rides/create

Creates a new ride.

#### Request

- **URL**: `/rides/create`
- **Method**: `POST`
- **Headers**: 
  - `Content-Type: application/json`
  - `Authorization: Bearer <jwt_token>`
- **Body**:
```json
{
  "pickup": "string",         // Pickup location (min 3 chars)
  "destination": "string",    // Destination location (min 3, max 24 chars)
  "vehicleType": "string"     // One of: 'Car', 'Bike', 'Auto'
}
```

#### Response

- **201 Created**:
  - **Body**:
    ```json
    {
      "_id": "ride_id",
      "user": "user_id",
      "pickup": "string",
      "destination": "string",
      "vehicleType": "string",
      "fare": 123.45,
      "status": "pending",
      // ...other ride details...
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

---

### GET /rides/get-fare

Get the calculated fare for a ride before booking.

#### Request

- **URL**: `/rides/get-fare?pickup=Pickup+Location&destination=Destination+Location`
- **Method**: `GET`
- **Headers**:
  - `Authorization: Bearer <jwt_token>`

#### Response

- **200 OK**:
  - **Body**:
    ```json
    {
      "Car": 120.5,
      "Auto": 80.25,
      "Bike": 60.0
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

#### Description

This endpoint returns the fare estimates for all vehicle types for the given pickup and destination. Use this to show fare options to the user before ride creation.

---

## Maps Routes

### GET /maps/get-coordinates

Get latitude and longitude for a given address.

#### Request

- **URL**: `/maps/get-coordinates?address=Some+Address`
- **Method**: `GET`
- **Headers**:
  - `Authorization: Bearer <jwt_token>`

#### Response

- **200 OK**:
  - **Body**:
    ```json
    {
      "lat": 12.9716,
      "lng": 77.5946
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
- **404 Not Found**:
  - **Body**:
    ```json
    {
      "message": "Coordinates not found"
    }
    ```

---

### GET /maps/get-distance-time

Get distance and duration between two locations.

#### Request

- **URL**: `/maps/get-distance-time?origin=Origin+Address&destination=Destination+Address`
- **Method**: `GET`
- **Headers**:
  - `Authorization: Bearer <jwt_token>`

#### Response

- **200 OK**:
  - **Body**:
    ```json
    {
      "distance": {
        "text": "12.3 km",
        "value": 12345
      },
      "duration": {
        "text": "25 mins",
        "value": 1500
      }
      // ...other Google Distance Matrix fields...
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
      "message": "Internal server error"
    }
    ```

---

### GET /maps/get-suggestions

Get address suggestions for a partial input.

#### Request

- **URL**: `/maps/get-suggestions?input=partial+address`
- **Method**: `GET`
- **Headers**:
  - `Authorization: Bearer <jwt_token>`

#### Response

- **200 OK**:
  - **Body**:
    ```json
    [
      {
        "description": "Some Place, City, Country",
        "place_id": "someplaceid"
      }
      // ...more suggestions...
    ]
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
      "message": "Internal server error"
    }
    ```

---
