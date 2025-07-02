// Your Google Apps Script Web App URL
const WEB_APP_URL = 'https://script.google.com/macros/s/AKfycbxL_-bCq7tDZ5jjo128tIrY0uU2A_S_JWbDaZy_Nt3SHwk54BDXs1qmI9o287Dsly0J4w/exec';  // ← Replace with your actual deployed Google Apps Script URL

// Global cart + total
let cart = [];
let total = 0;

// Load cart and show order summary
function loadOrderSummary() {
    const orderItems = document.getElementById('order-items');
    const orderTotal = document.getElementById('order-total');

    cart = JSON.parse(localStorage.getItem('cart')) || [];
    if (cart.length === 0) {
        orderItems.innerHTML = '<p>Your cart is empty.</p>';
        orderTotal.textContent = '';
        document.getElementById('checkout-form').style.display = 'none';
        return;
    }

    total = 0;
    orderItems.innerHTML = '';
    cart.forEach(item => {
        total += item.price;
        orderItems.innerHTML += `
      <div class="checkout-item">
        <img src="${item.image || 'https://via.placeholder.com/80'}" alt="${item.name}">
        <div class="checkout-item-details">
          <p class="item-name">${item.name}</p>
          <p class="item-price">₹${item.price ? item.price.toFixed(2) : '0.00'}</p>
        </div>
      </div>
    `;
    });

    orderTotal.textContent = `Total: ₹${total.toFixed(2)}`;
}

// Handle checkout form submission
document.getElementById('checkout-form').addEventListener('submit', async (e) => {
    e.preventDefault();

    const name = document.getElementById('customer-name').value.trim();
    const email = document.getElementById('customer-email').value.trim();
    const phone = document.getElementById('customer-phone').value.trim();
    const address = document.getElementById('customer-address').value.trim();

    if (!name || !email || !phone || !address) {
        alert('Please fill in all fields!');
        return;
    }

    if (cart.length === 0) {
        alert('Your cart is empty!');
        return;
    }

    const date = new Date().toISOString();

    // Prepare payload
    const orderData = {
        customerName: name,
        customerEmail: email,
        customerPhone: phone,
        customerAddress: address,
        cart: cart,
        total: total.toFixed(2),
        date: date
    };

    try {
        // Submit order to Google Apps Script Web App
        await fetch(WEB_APP_URL, {
            method: 'POST',
            body: JSON.stringify(orderData),
            // headers: {
            //     'Content-Type': 'application/json'
            // }
        });

        // Success
        alert(`Thank you ${name}! Your order has been placed.`);

        // Clear cart
        localStorage.removeItem('cart');

        // Redirect to thank-you page
        window.location.href = 'order-confirm.html';

    } catch (error) {
        console.error('Error submitting order:', error);
        alert('Error placing your order. Please try again.');
    }
});

// Initialize on page load
document.addEventListener('DOMContentLoaded', loadOrderSummary);
