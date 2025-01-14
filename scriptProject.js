const cart = [];

function addToCart(itemName, itemPrice, itemImg) {
    cart.push({ name: itemName, price: itemPrice, img: itemImg });
    alert(`${itemName} has been added to your cart!`);
    updateCartPage();
}

// Save cart to localStorage
function updateCartPage() {
    localStorage.setItem('cart', JSON.stringify(cart));
}

function loadCart() {
    const cart = JSON.parse(localStorage.getItem('cart')) || [];
    const cartContainer = document.getElementById('cart-container');
    cartContainer.innerHTML = ''; // Clear existing items

    if (cart.length > 0) {
        cart.forEach((item, index) => {
            const cartItem = document.createElement('div');
            cartItem.classList.add('cart-item');
            cartItem.innerHTML = `
                <img src="${item.img}" alt="${item.name}" style="max-width: 100px; margin-right: 20px; border-radius: 8px;">
                <span>${item.name}</span>
                <span>RM ${item.price.toFixed(2)}</span>
                <button class="remove-button" onclick="removeItemFromCart(${index})">Remove</button>
                `;
                cartContainer.appendChild(cartItem);
            });
        } else {
                cartContainer.innerHTML = '<p>Your cart is empty.</p>';
            }
        }

        
function removeItemFromCart(index) {
    const cart = JSON.parse(localStorage.getItem('cart')) || [];
    cart.splice(index, 1); // Remove item from array
    localStorage.setItem('cart', JSON.stringify(cart)); // Save updated cart to localStorage
    loadCart(); // Reload cart
}

function proceedToCheckout() {
    const loadedCart = JSON.parse(localStorage.getItem('cart') || '[]');
    if (loadedCart.length === 0) {
        alert('Your cart is empty. Add items before checking out!');
        return;
    }
    localStorage.setItem('checkoutCart', JSON.stringify(loadedCart));
    window.location.href = 'checkoutPage.html';
}

function loadCheckoutCart() {
    const checkoutCart = JSON.parse(localStorage.getItem('checkoutCart') || '[]');
    const orderSummary = document.getElementById('order-summary');
    const totalAmountElement = document.getElementById('total-amount');
    let totalAmount = 0;

    orderSummary.innerHTML = '';
    if (checkoutCart.length > 0) {
        checkoutCart.forEach((item) => {
            const itemDiv = document.createElement('div');
            itemDiv.style.display = 'flex';
            itemDiv.style.alignItems = 'center';
            itemDiv.style.marginBottom = '15px';

            itemDiv.innerHTML = `
                <img src="${item.img || 'default-image.jpg'}" 
                     alt="${item.name}" 
                     style="max-width: 80px; margin-right: 10px; border-radius: 8px;">
                <div style="line-height: 1.4;">
                    <p style="margin: 0;">${item.name}</p>
                    <p style="margin: 0;">RM ${item.price.toFixed(2)}</p>
                </div>
            `;
            orderSummary.appendChild(itemDiv);
            totalAmount += item.price;
        });
    } else {
        orderSummary.innerHTML = '<p>No items in the cart.</p>';
    }

    totalAmountElement.textContent = `RM ${totalAmount.toFixed(2)}`;
}


function handleCheckoutForm() {
    document.getElementById('checkout-form').addEventListener('submit', (e) => {
        e.preventDefault();
        const paymentMethod = document.getElementById('payment-method').value;
        if (!paymentMethod) {
            alert('Please select a payment method.');
            return;
        }
        alert(`Order placed successfully! Payment method: ${paymentMethod}`);
        localStorage.removeItem('checkoutCart');
        localStorage.removeItem('cart');
        window.location.href = 'menuProject.html';
    });
}

function goBackToCart() {
    window.location.href = 'cartProject.html'; // Redirects the user back to the cart page
}

if (window.location.pathname.includes('cartProject.html')) {
    loadCart();
} else if (window.location.pathname.includes('checkoutPage.html')) {
    loadCheckoutCart();
    handleCheckoutForm();
}
