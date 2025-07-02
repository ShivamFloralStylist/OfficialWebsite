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

let editProductId = null; // Tracks which product we're editing

// Handle form submit (Add or Update)
document.getElementById('add-product-form').addEventListener('submit', async (e) => {
    e.preventDefault();
    const productname = document.getElementById('product-name').value;
    const productprice = parseFloat(document.getElementById('product-price').value);
    const productimagepath = document.getElementById('product-image').value;

    try {
        if (editProductId) {
            // Update existing product
            await db.collection('products').doc(editProductId).update({ productname, productprice, productimagepath });
            alert('Product updated successfully!');
            editProductId = null; // Reset
            document.getElementById('submit-button').textContent = 'Add Product';
        } else {
            // Add new product
            await db.collection('products').add({ productname, productprice, productimagepath });
            alert('Product added successfully!');
        }
        document.getElementById('add-product-form').reset();
        loadProducts();
    } catch (error) {
        console.error('Error saving product:', error);
        alert('Error saving product. Check console.');
    }
});

// Load products and display
async function loadProducts() {
    const listContainer = document.getElementById('product-list');
    listContainer.innerHTML = '<p>Loading products...</p>';

    try {
        const snapshot = await db.collection('products').get();
        if (snapshot.empty) {
            listContainer.innerHTML = '<p>No products added yet.</p>';
            return;
        }

        listContainer.innerHTML = '';
        snapshot.forEach(doc => {
            const product = doc.data();
            const item = document.createElement('div');
            item.className = 'cart-item';
            item.innerHTML = `
        <div>
          <strong>${product.productname}</strong> - ₹${product.productprice}<br>
          <img src="${product.productimagepath}" alt="${product.productname}" width="100">
        </div>
        <div style="margin-top:0.5rem;">
          <button onclick="editProduct('${doc.id}', '${product.productname}', ${product.productprice}, '${product.productimagepath}')">Edit</button>
          <button onclick="deleteProduct('${doc.id}')">Delete</button>
        </div>
      `;
            listContainer.appendChild(item);
        });
    } catch (error) {
        console.error('Error loading products:', error);
        listContainer.innerHTML = '<p>Error loading products. Check console.</p>';
    }
}

// Delete a product
async function deleteProduct(id) {
    if (confirm('Are you sure you want to delete this product?')) {
        try {
            await db.collection('products').doc(id).delete();
            alert('Product deleted.');
            loadProducts();
        } catch (error) {
            console.error('Error deleting product:', error);
            alert('Error deleting product.');
        }
    }
}

// Edit a product (populate form)
function editProduct(productid, productname, productprice, productimagepath) {
    document.getElementById('product-name').value = productname;
    document.getElementById('product-price').value = productprice;
    document.getElementById('product-image').value = productimagepath;
    editProductId = productid;
    document.getElementById('submit-button').textContent = 'Update Product';
}

document.addEventListener('DOMContentLoaded', loadProducts);
