function addToCart(name, price) {
    let cart = JSON.parse(localStorage.getItem('cart')) || [];
    cart.push({ name, price });
    localStorage.setItem('cart', JSON.stringify(cart));
    alert(`${name} added to cart!`);
}

function loadShopProducts() {
    const container = document.getElementById('shop-products');
    const products = JSON.parse(localStorage.getItem('products')) || [];

    if (products.length === 0) {
        container.innerHTML = '<p>No products available. Check back soon!</p>';
        return;
    }

    container.innerHTML = '';
    products.forEach(product => {
        const item = document.createElement('div');
        item.className = 'product';
        item.innerHTML = `
      <img src="${product.image}" alt="${product.name}">
      <h3>${product.name}</h3>
      <p>₹${product.price.toFixed(2)}</p>
      <button onclick="addToCart('${product.name}', ${product.price})">Add to Cart</button>
    `;
        container.appendChild(item);
    });
}

document.addEventListener('DOMContentLoaded', loadShopProducts);
