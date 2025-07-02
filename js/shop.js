// Initialize Firebase
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyAqRU87dMKMW49AUctNUO-ch494ZMBlAbE",
    authDomain: "shivam-floral-stylist.firebaseapp.com",
    projectId: "shivam-floral-stylist",
    storageBucket: "shivam-floral-stylist.firebasestorage.app",
    messagingSenderId: "433569550391",
    appId: "1:433569550391:web:be86a51137299a83b9afb2",
    measurementId: "G-VNJQM8DBT1"
};

firebase.initializeApp(firebaseConfig);
const db = firebase.firestore();

// Add to cart (still uses localStorage)
function addToCart(name, price, image) {
    let cart = JSON.parse(localStorage.getItem('cart')) || [];
    cart.push({ name, price, image });
    localStorage.setItem('cart', JSON.stringify(cart));
    alert(`${name} added to cart!`);
}


// Load products from Firestore
async function loadShopProducts() {
    const container = document.getElementById('shop-products');
    container.innerHTML = '<p>Loading products...</p>';

    try {
        const snapshot = await db.collection('products').get();
        if (snapshot.empty) {
            container.innerHTML = '<p>No products available. Check back soon!</p>';
            return;
        }

        container.innerHTML = '';
        snapshot.forEach(doc => {
            const product = doc.data();
            const item = document.createElement('div');
            item.className = 'product';
            item.innerHTML = `
        <img src="${product.productimagepath}" alt="${product.productname}">
        <h3>${product.productname}</h3>
        <p>₹${product.productprice.toFixed(2)}</p>
        <button onclick="addToCart('${product.productname}', ${product.productprice}, '${product.productimagepath}')">Add to Cart</button>
      `;
            container.appendChild(item);
        });
    } catch (error) {
        console.error('Error loading products:', error);
        container.innerHTML = '<p>Error loading products. Please try again later.</p>';
    }
}

document.addEventListener('DOMContentLoaded', loadShopProducts);
