# 🛍️ Nuway – React E-Commerce Store

Nuway is a modern and responsive e-commerce web app built with **React**, **Redux Toolkit**, and **React Query**. 
It features a product catalog, search and filter functionality, shopping cart, and a user profile page with login simulation and editable user info.

---

## 🚀 Features

- 🔄 **Dynamic Product Listing** from [Fake Store API](https://fakestoreapi.com)
- 🔍 **Category Filter** and **Search**
- 🛒 **Cart Functionality** with quantity management and checkout
- 👤 **User Profile** with editable name/email and login simulation
- 💅 **Modern UI** using clean CSS and animations
- ❤️ **Add to favorites** (local toggle with heart icon)

---

## 🧱 Tech Stack

- **React 18**
- **TypeScript**
- **Redux Toolkit** (state management)
- **React Router DOM** (routing)
- **React Query** (data fetching & caching)
- **Fake Store API** (mock data)
- **CSS Modules** (custom styles)
- **React Toastify** (notifications)

---

## 📁 Folder Structure

```
src/
├── components/
│   └── NavBar.tsx, ProductCard.tsx + CSS
├── pages/
│   └── Home.tsx, Profile.tsx, Cart.tsx + CSS
├── redux/
│   └── store.ts, cartSlice.ts, userSlice.ts
├── context/
│   └── ProductContext.tsx
├── types/
│   └── types.ts
├── App.tsx
└── main.tsx
```

## 🧪 API Source

This project fetches data from [FakeStoreAPI](https://fakestoreapi.com/), a free RESTful API for dummy product data.

---

## 📄 License

MIT License. Feel free to use, modify, and distribute!

---
