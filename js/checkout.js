function loadCart() {
    const cart = JSON.parse(localStorage.getItem('cart')) || [];
    const cartItems = document.getElementById("cartItems");
    cartItems.innerHTML = ""; // Clear existing items

    if (cart.length === 0) {
        document.getElementById("emptyCartMsg").style.display = "block";
        document.getElementById("cartTotal").innerText = "$0.00";
        return;
    }

    let cartTotal = 0;

    cart.forEach((item, index) => {
        // Validate price, quantity, and image
        if (!item.name || !item.price || !item.quantity) {
            // If any of the required properties are missing, skip this item
            return;
        }

        const price = parseFloat(item.price);
        const quantity = parseInt(item.quantity);
        const image = item.image;

        if (isNaN(price) || isNaN(quantity)) {
            // If the price or quantity is not a number, skip this item
            return;
        }

        const row = document.createElement("tr");
        row.innerHTML = `
            <td>
                ${image ? `<img src="${image}" class="cart-item-image" alt="${item.name}">` : ''}
                ${item.name}
            </td>
            <td>${quantity}</td>
            <td>$${price.toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, ",")}</td>
            <td>$${(price * quantity).toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, ",")}</td>
            <td>
                <button class="btn btn-danger btn-sm" onclick="removeFromCart(${index})">X</button>
            </td>
        `;
        cartItems.appendChild(row);
        cartTotal += price * quantity;
    });

    document.getElementById("cartTotal").innerText = `$${cartTotal.toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, ",")}`;
}

function removeFromCart(index) {
    const cart = JSON.parse(localStorage.getItem('cart')) || [];
    cart.splice(index, 1); // Remove the item at the specified index
    localStorage.setItem('cart', JSON.stringify(cart)); // Update local storage
    loadCart(); // Reload the cart to reflect changes
}
    // PayPal Button Integration
    paypal.Buttons({
        createOrder: function(data, actions) {
            return actions.order.create({
                purchase_units: [{
                    amount: {
                        value: document.getElementById("cartTotal").innerText.replace('$', '')
                    }
                }]
            });
        },
        onApprove: function(data, actions) {
            return actions.order.capture().then(function(details) {
                alert('Transaction completed by ' + details.payer.name.given_name);
                // Optionally, redirect to a success page or clear the cart
            });
        }
    }).render('#paypal-button-container');

    // Load cart items on page load
    window.onload = loadCart;
    document.getElementById('cartButton').addEventListener('click', function () {
        window.location.href = 'ShoppingCart.html'; // Redirect to ShoppingCart page
      });