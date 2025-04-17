import React, { useState } from 'react';
import { useQuery, useQueryClient } from '@tanstack/react-query';
import { db } from '../firebaseConfig';
import {
  collection,
  getDocs,
  addDoc,
  updateDoc,
  deleteDoc,
  doc
} from 'firebase/firestore';
import { Product } from '../types/types';

// Fetch products from Firestore
// This function retrieves all products from the 'products' collection in Firestore
const fetchProducts = async (): Promise<Product[]> => {
  const snapshot = await getDocs(collection(db, 'products'));
  return snapshot.docs.map((docSnap) => {
    const data = docSnap.data() as Omit<Product, 'id'>;
    return { id: docSnap.id, ...data };
  });
};

const Admin: React.FC = () => {
  // React Query client for cache invalidation
  const queryClient = useQueryClient();

  // Fetch products using React Query
  const { data: products = [] } = useQuery({
    queryKey: ['products'],
    queryFn: fetchProducts
  });

  // State for managing the form inputs and editing state
  const [form, setForm] = useState<Partial<Product>>({});
  const [editingId, setEditingId] = useState<string | null>(null);

  // Handle form input changes
  // Updates the form state as the user types in the input fields
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  // Handle form submission
  // Adds a new product or updates an existing product in Firestore
  const handleSubmit = async () => {
    const { title, price, description, category, image } = form;

    // Validate that all fields are filled
    if (!title || !price || !description || !category || !image) {
      alert('All fields are required');
      return;
    }

    if (editingId) {
      // Update an existing product
      await updateDoc(doc(db, 'products', editingId), {
        title,
        price: Number(price),
        description,
        category,
        image,
        rating: { rate: 4.5, count: 1 } // Default rating
      });
      setEditingId(null); // Reset editing state
    } else {
      // Add a new product
      await addDoc(collection(db, 'products'), {
        title,
        price: Number(price),
        description,
        category,
        image,
        rating: { rate: 4.5, count: 1 } // Default rating
      });
    }

    // Reset the form and refresh the product list
    setForm({});
    queryClient.invalidateQueries({ queryKey: ['products'] });
  };

  // Handle editing a product
  // Populates the form with the selected product's data
  const handleEdit = (product: Product) => {
    setEditingId(product.id);
    setForm(product);
  };

  // Handle deleting a product
  // Removes the product from Firestore and refreshes the product list
  const handleDelete = async (id: string) => {
    await deleteDoc(doc(db, 'products', id));
    queryClient.invalidateQueries({ queryKey: ['products'] });
  };

  return (
    <div style={{ padding: '40px', maxWidth: '800px', margin: 'auto' }}>
      {/* Admin Dashboard Header */}
      <h2>🛠️ Admin Dashboard</h2>

      {/* Product Form */}
      {/* Form for adding or editing products */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', marginBottom: '20px' }}>
        <input name="title" value={form.title || ''} onChange={handleChange} placeholder="Title" />
        <input name="price" value={form.price || ''} onChange={handleChange} placeholder="Price" />
        <input name="category" value={form.category || ''} onChange={handleChange} placeholder="Category" />
        <input name="image" value={form.image || ''} onChange={handleChange} placeholder="Image URL" />
        <textarea name="description" value={form.description || ''} onChange={handleChange} placeholder="Description" />
        <button onClick={handleSubmit}>
          {editingId ? '💾 Update Product' : '➕ Add Product'}
        </button>
      </div>

      {/* Product List */}
      {/* Displays the list of products with edit and delete options */}
      <ul style={{ listStyle: 'none', padding: 0 }}>
        {products.map((product) => (
          <li
            key={product.id}
            style={{ marginBottom: '20px', borderBottom: '1px solid #ccc', paddingBottom: '10px' }}
          >
            <strong>{product.title}</strong> - ${product.price}
            <br />
            <small>{product.category}</small>
            <br />
            <img src={product.image} alt={product.title} style={{ width: '80px', height: '80px' }} />
            <br />
            <button onClick={() => handleEdit(product)}>✏️ Edit</button>
            <button
              onClick={() => handleDelete(product.id!)}
              style={{ marginLeft: '10px', color: 'red' }}
            >
              🗑️ Delete
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Admin;
