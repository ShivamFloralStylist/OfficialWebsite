function addToCart(name, price, image) {
  let cart = JSON.parse(localStorage.getItem('cart')) || [];
  cart.push({ name, price, image });
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
        <img src="${item.image || 'https://via.placeholder.com/80'}" alt="${item.name}" class="cart-item-image">
        <div class="cart-item-details">
          <p class="item-name">${item.name}</p>
          <p class="item-price">₹${item.price}</p>
          <button onclick="removeItem(${index})">Remove</button>
        </div>
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
