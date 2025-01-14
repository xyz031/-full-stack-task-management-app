# Food Delivery App

This project is a **Food Delivery App** built using the **MERN stack (MongoDB, Express.js, React.js, Node.js)** with features for user registration, login, placing orders, viewing order history, and managing the cart.

---

## Features

1. **User Authentication**
   - User registration and login using JWT authentication.
   - Passwords are securely hashed using bcrypt.

2. **Menu Management**
   - Displays a list of food items fetched from the backend.

3. **Cart Functionality**
   - Users can add items to their cart.
   - Cart items are displayed with quantities and prices.
   - Total price calculation for items in the cart.

4. **Order Management**
   - Users can place orders.
   - Orders are stored in the database with details like user ID, items, and total price.

5. **Order History**
   - Users can view their past orders with order status and details.

---

## Tech Stack

- **Frontend**: React.js, Tailwind CSS
- **Backend**: Node.js, Express.js
- **Database**: MongoDB (Mongoose ORM)
- **Authentication**: JWT (JSON Web Tokens)
- **Other Libraries**: Axios, bcrypt, express-validator

---

## Setup Instructions

### Prerequisites

- Node.js (v14 or later)
- MongoDB (local instance or MongoDB Atlas)
- npm or yarn

### Steps to Run Locally

1. **Clone the repository:**
   ```bash
   git clone <repository-url>
   cd food-delivery-app
   ```

2. **Install backend dependencies:**
   ```bash
   cd backend
   npm install
   ```

3. **Set up environment variables:**
   Create a `.env` file in the `backend` directory and add the following:
   ```env
   MONGO_URI=<your-mongodb-uri>
   JWT_SECRET=<your-jwt-secret>
   PORT=5000
   ```

4. **Start the backend server:**
   ```bash
   node server.js
   ```
   The backend will be running at `http://localhost:5000`.

5. **Install frontend dependencies:**
   ```bash
   cd ../frontend
   npm install
   ```

6. **Start the frontend server:**
   ```bash
   npm run dev
   ```
   The frontend will be running at `http://localhost:5173`.

---

## API Endpoints

### **User Routes**

- **POST /api/users/register** - Register a new user
- **POST /api/users/login** - Login an existing user

### **Menu Routes**

- **GET /api/menu** - Get all available menu items

### **Order Routes**

- **POST /api/orders** - Place a new order
- **GET /api/orders/:userId** - Get order history for a specific user

---

## Folder Structure

```
food-delivery-app/
├── backend/
│   ├── models/         # Mongoose models
│   ├── routes/         # Express routes
│   ├── controllers/    # Route handlers
│   └── server.js       # Entry point for backend
├── frontend/
│   ├── src/
│   │   ├── components/ # React components
│   │   ├── pages/      # React pages (Login, Register, Menu, Order History)
│   │   └── App.js      # Main app file
└── README.md
```

---

## Screenshots

1. **Login Page**
   ![image](https://github.com/user-attachments/assets/4dad6eda-89a5-432a-91c9-8bf190f00ec8)


2. **Menu Page**
   ![image](https://github.com/user-attachments/assets/b4ad196b-1853-4d8e-97b8-8f1b697ac7e0)


3. **Order History Page**
   ![image](https://github.com/user-attachments/assets/f7e3d7e8-c0b1-4a54-9f43-30a4e49195e0)


---

## Future Enhancements

- Add role-based access (Admin and User roles).
- Implement real-time order tracking.
- Add payment gateway integration.
- Improve UI/UX with advanced animations.

---

## License

This project is licensed under the MIT License. See the LICENSE file for details.

---

## Acknowledgments

- Thanks to all contributors and open-source libraries used in this project.

---

## Contact

For any queries, please contact:
- **Name**: Aditya Maurya
- **Email**: adityamaurya0401@gmail.com
- **GitHub**: https://github.com/xyz031

