import React from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '../redux/store';
import { collection, getDocs, query, where } from 'firebase/firestore';
import { db } from '../firebaseConfig';
import { useQuery } from '@tanstack/react-query';

// Function to fetch orders for a specific user
// Queries the Firestore database for orders matching the user's email
const fetchOrders = async (email: string) => {
  const q = query(collection(db, 'orders'), where('userId', '==', email));
  const snapshot = await getDocs(q);
  return snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
};

const Orders: React.FC = () => {
  // Access the user's email from the Redux store
  const user = useSelector((state: RootState) => state.user);
  const userEmail = user.email ?? '';

  // Fetch orders using React Query
  // The query is enabled only if the user is logged in (email exists)
  const { data: orders = [], isLoading } = useQuery({
    queryKey: ['orders', userEmail],
    queryFn: () => fetchOrders(userEmail),
    enabled: !!user.email
  });

  // If the user is not logged in, display a message prompting them to log in
  if (!user.email) return <p>Please log in to view your orders.</p>;

  // If the orders are still loading, display a loading message
  if (isLoading) return <p>Loading orders...</p>;

  return (
    <div style={{ padding: '30px' }}>
      {/* Page Header */}
      <h2>🧾 Order History</h2>

      {/* Display a message if no orders are found */}
      {orders.length === 0 ? (
        <p>No orders found.</p>
      ) : (
        // Render the list of orders
        orders.map((order: any) => (
          <div key={order.id} style={{ borderBottom: '1px solid #ccc', marginBottom: '20px' }}>
            {/* Order Date and Total */}
            <p><strong>Date:</strong> {new Date(order.createdAt.seconds * 1000).toLocaleString()}</p>
            <p><strong>Total:</strong> ${order.total}</p>

            {/* List of items in the order */}
            <ul>
              {order.items.map((item: any, i: number) => (
                <li key={i}>
                  🛍️ {item.title} – ${item.price} × {item.quantity || 1}
                </li>
              ))}
            </ul>
          </div>
        ))
      )}
    </div>
  );
};

export default Orders;
