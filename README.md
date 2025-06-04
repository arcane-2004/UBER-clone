# Uber Clone

This project is a full-stack clone of the Uber ride-hailing app, built with a React frontend and Node.js/Express backend. It allows users to book rides, track drivers in real-time, and for captains (drivers) to accept and complete rides. The app uses Google Maps for live tracking and location suggestions.

---

## Features

- **User & Captain Authentication:** Separate signup/login for users and captains (drivers).
- **Live Location Tracking:** Real-time map tracking using Google Maps API.
- **Ride Booking:** Users can search for pickup and destination, view fare estimates, and book rides.
- **Vehicle Selection:** Choose between Car, Bike, or Auto with dynamic fare calculation.
- **Captain Dashboard:** Captains receive ride requests, accept rides, and update ride status.
- **OTP Ride Start:** Secure ride start with OTP confirmation.
- **Real-Time Updates:** Socket.io for instant ride status updates between user and captain.
- **Responsive UI:** Optimized for mobile view (see instructions below).

---

## Getting Started

### 1. Clone the Repository

```sh
git clone https://github.com/your-username/uber-clone.git
cd uber-clone
```

### 2. Setup the Backend

```sh
cd Backend
npm install
```

- Create a `.env` file in the `Backend` directory with your MongoDB connection string, JWT secret, and Google Maps API key:
  ```
  DB_CONNECT=your_mongodb_connection_string
  JWT_SECRET=your_jwt_secret
  GOOGLE_MAPS_API=your_google_maps_api_key
  ```

- Start the backend server:
  ```sh
  node server.js
  ```

### 3. Setup the Frontend

```sh
cd ../Frontend
npm install
```

- Create a `.env` file in the `Frontend` directory:
  ```
  VITE_BASE_URL=http://localhost:4000
  VITE_GOOGLE_MAPS_API_KEY=your_google_maps_api_key
  ```

- Start the frontend development server:
  ```sh
  npm run dev
  ```

---

## Usage & Testing

- Open [http://localhost:5173](http://localhost:5173) in your browser.
- **Important:** For the best experience, open DevTools (F12), click the device toolbar, and switch to a mobile view (e.g., iPhone 12).
- Register as a user or captain and explore the app features.

---

## Screenshots


Screenshots of the app here:
<img width="858" alt="image" src="https://github.com/user-attachments/assets/d6ac8ce9-2288-49b9-befc-0d8994693361" />

<img width="713" alt="image" src="https://github.com/user-attachments/assets/1803004f-65e0-48ac-b9d7-ae911e839425" />


- User Home Page
<img width="744" alt="image" src="https://github.com/user-attachments/assets/bfa6f91c-bd4d-4130-a943-f66137bc11d6" />

- Ride Booking Flow
<img width="664" alt="image" src="https://github.com/user-attachments/assets/1fd32357-68a5-41e1-935b-0676a0b856e3" />
<img width="660" alt="image" src="https://github.com/user-attachments/assets/11875673-61b8-49e7-9525-4543d1e9ca23" />
<img width="629" alt="image" src="https://github.com/user-attachments/assets/4c034d60-9e13-411c-8b9e-7bd5cd165638" />
<img width="492" alt="image" src="https://github.com/user-attachments/assets/a62eaa22-4afb-4b75-ae22-09ade5094cfb" />






- Captain Dashboard
<img width="605" alt="image" src="https://github.com/user-attachments/assets/f8b29385-c2fe-4d46-b0aa-d55f66139802" />
<img width="526" alt="image" src="https://github.com/user-attachments/assets/9cbba77d-1c55-4d92-83d5-6ecc426db18e" />
<img width="541" alt="image" src="https://github.com/user-attachments/assets/01ab3397-fb8f-4472-8f65-86e5b6a17151" />



- Live Tracking
<img width="501" alt="image" src="https://github.com/user-attachments/assets/b1badc4c-759d-4b84-ac9e-98a2d5c17a2c" />
<img width="588" alt="image" src="https://github.com/user-attachments/assets/816ed212-a4aa-4daf-a562-4636ed890672" />
<img width="549" alt="image" src="https://github.com/user-attachments/assets/376e0231-5283-49fa-8d5a-5487df19242f" />
<img width="547" alt="image" src="https://github.com/user-attachments/assets/f6ec02f1-7323-4134-b0d1-5c321e7a4ddc" />





---

## Tech Stack

- **Frontend:** React, Vite, Tailwind CSS, Google Maps API, Socket.io-client
- **Backend:** Node.js, Express, MongoDB, Socket.io, Google Maps API

---

## License

This project is for educational purposes only and is not affiliated with Uber.
