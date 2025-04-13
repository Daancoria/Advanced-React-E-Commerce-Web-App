import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Profile from "./pages/Profile";
import { ProductProvider } from "./context/ProductContext";
import { QueryClientProvider, QueryClient } from "@tanstack/react-query";
import Cart from "./pages/Cart";
import Auth from "./pages/Auth";
import Navbar from "./components/NavBar";
import Admin from "./pages/Admin";
import PrivateRoute from "./components/PrivateRoute";
import Orders from "./pages/Orders";
import OrderSuccess from "./pages/OrderSuccess";

// App Component
// The root component that sets up the application structure, routing, and providers
function App() {
  // Initialize React Query client
  const queryClient = new QueryClient();

  return (
    // Provide React Query client to the application
    <QueryClientProvider client={queryClient}>
      {/* Provide global product state using ProductContext */}
      <ProductProvider>
        {/* Set up routing for the application */}
        <BrowserRouter>
          {/* Navbar is displayed on all pages */}
          <Navbar />
          <Routes>
            {/* Public Routes */}
            {/* Home page */}
            <Route path="/" element={<Home />} />
            {/* Profile page */}
            <Route path="/profile" element={<Profile />} />
            {/* Cart page */}
            <Route path="/cart" element={<Cart />} />
            {/* Authentication page */}
            <Route path="/auth" element={<Auth />} />
            {/* Orders page */}
            <Route path="/orders" element={<Orders />} />
            {/* Order success confirmation page */}
            <Route path="/order-success" element={<OrderSuccess />} />

            {/* Protected Route */}
            {/* Admin page is wrapped in a PrivateRoute to restrict access */}
            <Route
              path="/admin"
              element={
                <PrivateRoute>
                  <Admin />
                </PrivateRoute>
              }
            />
          </Routes>
        </BrowserRouter>
      </ProductProvider>
    </QueryClientProvider>
  );
}

export default App;
