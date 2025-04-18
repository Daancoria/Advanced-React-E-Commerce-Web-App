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


---

## ✅ CI/CD & Testing Overview

### ✅ Test-Driven Development (TDD)

- Unit Tests:
  - `ProductCard.test.tsx`: Validates rendering and cart button behavior.
  - `NavBar.test.tsx`: Validates login/logout UI based on Redux state.
- Integration Test:
  - `CartFlow.test.tsx`: Ensures cart count updates correctly in NavBar when product is added.

### 🧪 Tech Stack for Testing
- React Testing Library
- Jest with `ts-jest`
- Firebase mocking via Redux state

---

### ✅ Continuous Integration (CI)

- GitHub Actions Workflow (`.github/workflows/main.yml`)
- Runs:
  - TypeScript type checks
  - Jest unit and integration tests
  - Production build

- CI blocks deployment on any failed test

---

### ✅ Continuous Deployment (CD)

- Vercel deployed via GitHub Actions (`amondnet/vercel-action`)
- Only deploys after successful CI
- Uses `vercel-args: --prod` to trigger production deployment

---

### ✅ Coverage

You can view coverage locally:

```bash
npm run test -- --coverage
```

### Live site 

https://reactecommerce-navy.vercel.app/


## 📄 License

This project is licensed under the MIT License.
