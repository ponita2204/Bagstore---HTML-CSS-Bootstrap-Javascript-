function loadCart() {
    const cart = JSON.parse(localStorage.getItem('cart')) || [];
    const cartItems = document.getElementById("cartItems");
    cartItems.innerHTML = ""; // Clear existing items

    cart.forEach(item => {
        if (!item.image || !item.name || !item.price || !item.total) {
            console.error('Item is missing properties:', item);
            return; // Skip this item
        }
    
        const row = document.createElement("tr");
        row.innerHTML = `
            <td><img src="${item.image}" class="cart-item-image" alt="${item.name}">${item.name}</td>
            <td>${item.quantity}</td>
            <td>$${item.price.toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, ",")}</td>
            <td>$${item.total.toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, ",")}</td>
            <td><button class="btn btn-danger btn-sm" onclick="removeFromCart('${item.name}')">Remove</button></td>
        `;
        cartItems.appendChild(row);
    });

    const cartTotal = cart.reduce((total, item) => total + (item.total || 0), 0);
    document.getElementById("cartTotal").textContent = `$${cartTotal.toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, ",")}`;
}

function updateQuantity(productName, quantity) {
    const cart = JSON.parse(localStorage.getItem('cart')) || [];
    const item = cart.find(item => item.name === productName);
    if (item) {
        item.quantity = parseInt(quantity);
        item.total = item.price * item.quantity;
        localStorage.setItem('cart', JSON.stringify(cart));
        loadCart();
    }
}

function removeFromCart(productName) {
    let cart = JSON.parse(localStorage.getItem('cart')) || [];
    cart = cart.filter(item => item.name !== productName);
    localStorage.setItem('cart', JSON.stringify(cart));
    loadCart();
}



window.onload = loadCart; // Call loadCart when the page loads

document.getElementById("checkoutButton").addEventListener("click", function() {
    // Redirect to the Checkout page
    window.location.href = "Checkout.html";
});
