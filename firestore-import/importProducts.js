const fetch = require('node-fetch'); // Import the `node-fetch` library to make HTTP requests
const admin = require('firebase-admin'); // Import Firebase Admin SDK for Firestore operations

// Initialize Firebase Admin SDK
const serviceAccount = require('./firebase-service-account.json'); // Load the service account credentials

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount), // Authenticate using the service account
});

const db = admin.firestore(); // Initialize Firestore database instance

// Function to import products into Firestore
async function importProducts() {
  // Fetch product data from the Fake Store API
  const res = await fetch('https://fakestoreapi.com/products');
  const products = await res.json(); // Parse the response as JSON

  const batch = db.batch(); // Create a Firestore batch for bulk writes

  // Iterate over each product and prepare it for Firestore
  products.forEach((product) => {
    const docRef = db.collection('products').doc(); // Create a new document reference in the 'products' collection
    batch.set(docRef, {
      title: product.title, // Set the product title
      price: product.price, // Set the product price
      description: product.description, // Set the product description
      category: product.category, // Set the product category
      image: product.image, // Set the product image URL
      rating: product.rating, // Set the product rating
    });
  });

  // Commit the batch to Firestore
  await batch.commit();
  console.log('✅ Products imported into Firestore'); // Log success message
}

// Execute the import function and handle errors
importProducts().catch((err) => console.error('❌ Error:', err)); // Log any errors that occur

