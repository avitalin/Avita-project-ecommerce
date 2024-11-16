// Initialize shopping cart
const shoppingCart = new ShoppingCart();

// Function to render cart items
function renderCartItems() {
    const cartItemsContainer = document.getElementById('cartItems');
    const items = shoppingCart.getItems();

    if (items.length === 0) {
        cartItemsContainer.innerHTML = '<p class="empty-cart">Your cart is empty</p>';
        return;
    }

    let html = '';
    items.forEach(item => {
        html += `
            <div class="cart_item">
                <div class="item_info">
                    <img src="images/${item.image}" alt="${item.name}">
                    <div class="item_details">
                        <h5>${item.name}</h5>
                        <p>Price: $${item.price.toFixed(2)}</p>
                    </div>
                </div>
                <div class="item_quantity">
                    <button onclick="updateQuantity(${item.id}, ${item.quantity - 1})">-</button>
                    <span>${item.quantity}</span>
                    <button onclick="updateQuantity(${item.id}, ${item.quantity + 1})">+</button>
                </div>
                <div class="item_total">
                    $${(item.price * item.quantity).toFixed(2)}
                </div>
                <button class="remove_btn" onclick="removeItem(${item.id})">
                    <i class="fa fa-trash"></i>
                </button>
            </div>
        `;
    });

    cartItemsContainer.innerHTML = html;
    updateCartSummary();
}

// Function to update cart summary
function updateCartSummary() {
    const subtotal = shoppingCart.getTotalPrice();
    const tax = subtotal * 0.1; // 10% tax
    const total = subtotal + tax;

    document.getElementById('subtotal').textContent = `$${subtotal.toFixed(2)}`;
    document.getElementById('tax').textContent = `$${tax.toFixed(2)}`;
    document.getElementById('total').textContent = `$${total.toFixed(2)}`;
}

// Function to update item quantity
function updateQuantity(itemId, newQuantity) {
    if (newQuantity < 0) return;
    shoppingCart.updateQuantity(itemId, newQuantity);
    renderCartItems();
}

// Function to remove item
function removeItem(itemId) {
    shoppingCart.removeItem(itemId);
    renderCartItems();
}

// Function to handle checkout
function checkout() {
    if (shoppingCart.getItems().length === 0) {
        alert('Your cart is empty!');
        return;
    }
    alert('Thank you for your order! Proceeding to checkout...');
    shoppingCart.clearCart();
    renderCartItems();
}

// Initialize cart display
document.addEventListener('DOMContentLoaded', function () {
    renderCartItems();
}); 