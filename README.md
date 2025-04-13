# 🛍️ Firebase E-Commerce App (React + Redux Toolkit)

A fully functional e-commerce application built with React, Redux Toolkit, and Firebase. This app features user authentication, product management, cart functionality, and order history, all integrated with Firebase services.

---

## 🚀 Features

### 🔐 Authentication
- User registration and login using Firebase Authentication.
- Secure user session management with Redux Toolkit.

### 👤 User Profile Management
- View and update user profile information.
- Delete user account along with associated data in Firestore.

### 🛒 Shopping Cart
- Add products to the cart with quantity management.
- Update or remove items from the cart.
- Checkout process that creates an order in Firestore.

### 📦 Product Management
- Display products fetched from Firestore.
- Admin functionality to add, update, and delete products.
- Initial product data is imported from [https://fakestoreapi.com](https://fakestoreapi.com) using a Firestore import script (`importProducts.js`) via Firebase Admin SDK.

### 🧾 Order History
- View past orders with details like order ID, date, and total price.
- Access full order details including the list of products.

---

## 🛠️ Technologies Used

- React
- Redux Toolkit
- Firebase Authentication
- Cloud Firestore
- React Router
- TypeScript
- React Toastify for notifications

---

## 📁 Project Structure

```
src/
├── components/
│   ├── Cart.tsx
│   ├── Navbar.tsx
│   ├── Profile.tsx
│   ├── Orders.tsx
│   └── Admin.tsx
├── redux/
│   ├── store.ts
│   ├── cartSlice.ts
│   └── userSlice.ts
├── firebaseConfig.ts
├── App.tsx
└── index.tsx
```

---

## 🔧 Setup Instructions

1. **Clone the Repository:**

   ```bash
   git clone https://github.com/yourusername/firebase-ecommerce-app.git
   cd firebase-ecommerce-app
   ```

2. **Install Dependencies:**

   ```bash
   npm install
   ```

3. **Firebase Configuration:**

   - Create a Firebase project at [Firebase Console](https://console.firebase.google.com/).
   - Enable **Authentication** (Email/Password) and **Cloud Firestore**.
   - Obtain your Firebase config object and replace the placeholder in `firebaseConfig.ts`.

4. **Run the Application:**

   ```bash
   npm run dev
   ```

5. **Import Initial Products:**

   - Use the included `importProducts.js` script to fetch and import products from `https://fakestoreapi.com/products` into Firestore.
   - Requires Firebase Admin SDK setup and service account credentials.

---

## ✅ Completed Functionalities

- **Firebase Setup:**
  - Project created and configured with Firebase SDK.
  - Authentication and Firestore enabled.

- **Authentication:**
  - User registration and login implemented.
  - Logout functionality added.

- **User Management:**
  - User profile creation upon registration.
  - Profile viewing and updating capabilities.
  - Account deletion removes user data from Firestore.

- **Product Management:**
  - Products fetched from Firestore.
  - Admin can add, update, and delete products.
  - FakeStoreAPI used as the seed data source via Firestore import.

- **Shopping Cart:**
  - Add to cart functionality with quantity management.
  - Cart updates and item removal.
  - Checkout creates an order in Firestore.

- **Order History:**
  - Users can view their past orders.
  - Detailed order information displayed.

---

## 📄 License

This project is licensed under the MIT License.
