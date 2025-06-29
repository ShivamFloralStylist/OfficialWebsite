function loadProducts() {
    const products = JSON.parse(localStorage.getItem('products')) || [];
    const listContainer = document.getElementById('product-list');
    listContainer.innerHTML = '';

    if (products.length === 0) {
        listContainer.innerHTML = '<p>No products added yet.</p>';
        return;
    }

    products.forEach((product, index) => {
        const item = document.createElement('div');
        item.className = 'cart-item';
        item.innerHTML = `
      <div>
        <strong>${product.name}</strong> - ₹${product.price}<br>
        <img src="${product.image}" alt="${product.name}" width="100">
      </div>
      <button onclick="removeProduct(${index})">Remove</button>
    `;
        listContainer.appendChild(item);
    });
}

function removeProduct(index) {
    const products = JSON.parse(localStorage.getItem('products')) || [];
    products.splice(index, 1);
    localStorage.setItem('products', JSON.stringify(products));
    loadProducts();
}

document.getElementById('add-product-form').addEventListener('submit', (e) => {
    e.preventDefault();
    const name = document.getElementById('product-name').value;
    const price = parseFloat(document.getElementById('product-price').value);
    const image = document.getElementById('product-image').value;

    const products = JSON.parse(localStorage.getItem('products')) || [];
    products.push({ name, price, image });
    localStorage.setItem('products', JSON.stringify(products));

    document.getElementById('add-product-form').reset();
    loadProducts();
    alert('Product added!');
});

document.addEventListener('DOMContentLoaded', loadProducts);
