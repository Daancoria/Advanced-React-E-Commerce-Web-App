import React from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '../redux/store';
import { collection, getDocs, query, where } from 'firebase/firestore';
import { db } from '../firebaseConfig';
import { useQuery } from '@tanstack/react-query';
import { Order, OrderItem } from '../types/types';

// Function to fetch orders for a specific user
const fetchOrders = async (email: string): Promise<Order[]> => {
  const q = query(collection(db, 'orders'), where('userId', '==', email));
  const snapshot = await getDocs(q);
  return snapshot.docs.map((doc) => ({
    id: doc.id,
    ...(doc.data() as Omit<Order, 'id'>),
  }));
};

const Orders: React.FC = () => {
  const user = useSelector((state: RootState) => state.user);
  const userEmail = user.email ?? '';

  const { data: orders = [], isLoading } = useQuery<Order[]>({
    queryKey: ['orders', userEmail],
    queryFn: () => fetchOrders(userEmail),
    enabled: !!user.email
  });

  if (!user.email) return <p>Please log in to view your orders.</p>;
  if (isLoading) return <p>Loading orders...</p>;

  return (
    <div style={{ padding: '30px' }}>
      <h2>🧾 Order History</h2>

      {orders.length === 0 ? (
        <p>No orders found.</p>
      ) : (
        orders.map((order: Order) => (
          <div key={order.id} style={{ borderBottom: '1px solid #ccc', marginBottom: '20px' }}>
            <p><strong>Date:</strong> {new Date(order.createdAt.seconds * 1000).toLocaleString()}</p>
            <p><strong>Total:</strong> ${order.total}</p>
            <ul>
              {order.items.map((item: OrderItem, i: number) => (
                <li key={i}>
                  🛍️ {item.title} – ${item.price} × {item.quantity}
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
