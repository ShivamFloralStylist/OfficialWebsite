function addToCart(name, price) {
  let cart = JSON.parse(localStorage.getItem('cart')) || [];
  cart.push({ name, price });
  localStorage.setItem('cart', JSON.stringify(cart));
  alert(`${name} added to cart!`);
}

function displayCart() {
  const cart = JSON.parse(localStorage.getItem('cart')) || [];
  const container = document.getElementById('cart-items');
  const total = document.getElementById('total');
  if (!container) return;
  container.innerHTML = '';
  let sum = 0;
  cart.forEach((item, index) => {
    sum += item.price;
    container.innerHTML += `
      <div class="cart-item">
        ${item.name} - ₹${item.price.toFixed(2)}
        <button onclick="removeItem(${index})">Remove</button>
      </div>
    `;
  });
  total.textContent = `Total: ₹${sum.toFixed(2)}`;
}

function removeItem(index) {
  let cart = JSON.parse(localStorage.getItem('cart')) || [];
  cart.splice(index, 1);
  localStorage.setItem('cart', JSON.stringify(cart));
  displayCart();
}

document.addEventListener('DOMContentLoaded', displayCart);
