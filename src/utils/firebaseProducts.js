// src/utils/firebaseProducts.js
import { 
  collection, 
  addDoc, 
  getDocs, 
  query, 
  where, 
  orderBy,
  serverTimestamp 
} from 'firebase/firestore';
import { db } from '../pages/firebase';

// Get products from Firebase
export const getProducts = async (filters = {}) => {
  try {
    console.log('📦 Fetching products from Firebase...');
    
    let q = collection(db, 'products');
    
    // Apply filters
    if (filters.featured) {
      q = query(q, where('featured', '==', true));
    }
    
    if (filters.category) {
      q = query(q, where('category', '==', filters.category));
    }
    
    if (filters.subcategory) {
      q = query(q, where('subcategory', '==', filters.subcategory));
    }
    
    // Only get active products, newest first
    q = query(q, where('isActive', '==', true), orderBy('createdAt', 'desc'));
    
    const snapshot = await getDocs(q);
    const products = [];
    
    snapshot.forEach((doc) => {
      const data = doc.data();
      products.push({ 
        id: doc.id, 
        ...data,
        // Convert Firestore timestamp to date
        createdAt: data.createdAt?.toDate?.() || new Date()
      });
    });
    
    console.log(`✅ Found ${products.length} products`);
    return products;
  } catch (error) {
    console.error('❌ Error getting products:', error);
    return []; // Return empty array instead of crashing
  }
};

// Add sample data to Firebase (run this once)
export const addSampleProducts = async () => {
  const sampleProducts = [
    {
      title: "Macbook Pro 2020 M1 Chip",
      price: 350000,
      description: "8GB RAM, 256GB SSD, perfect condition for coding and design.",
      category: "Electronics & Gadgets",
      subcategory: "Laptops & Computers",
      location: "Moremi Hall",
      condition: "Like New",
      featured: true,
      sellerId: "demo-seller-1",
      views: 124,
      isVerified: true,
      isActive: true,
      createdAt: serverTimestamp()
    },
    {
      title: "Chemistry Textbook - 200 Level",
      price: 5000,
      description: "Essential chemistry textbook, no highlights or writings.",
      category: "Textbooks & Academic",
      subcategory: "Core Course Textbooks", 
      location: "Faculty of Science",
      condition: "Excellent",
      featured: true,
      sellerId: "demo-seller-2",
      views: 89,
      isVerified: true,
      isActive: true,
      createdAt: serverTimestamp()
    },
    {
      title: "Portable Room Heater",
      price: 8000,
      description: "Perfect for cold nights in the hostel. Energy efficient.",
      category: "Hostel & Room Essentials",
      subcategory: "Cooking Appliances",
      location: "Mariere Hall", 
      condition: "Good",
      featured: false,
      sellerId: "demo-seller-3",
      views: 67,
      isVerified: false,
      isActive: true,
      createdAt: serverTimestamp()
    }
  ];

  try {
    console.log('🌱 Adding sample products to Firebase...');
    
    for (const product of sampleProducts) {
      await addDoc(collection(db, 'products'), product);
    }
    
    console.log('✅ Sample products added successfully!');
    return true;
  } catch (error) {
    console.error('❌ Error adding sample products:', error);
    return false;
  }
};