
function AddClicked(button) {
    const shopItem = button.closest('.shop-item');
    const title = shopItem.getElementsByClassName('shop-item-title')[0].innerText;
    const price = shopItem.getElementsByClassName('shop-item-price')[0].innerText;
    const image = shopItem.getElementsByClassName('shop-item-image')[0].src;
    AddtoCart(title, price, image);
    Total();
}

function AddtoCart(title, price, image) {
    const cartItems = document.getElementsByClassName('cart-items')[0];
    const cartItemNames = Array.from(cartItems.getElementsByClassName('cart-item-title')).map(item => item.innerText);
    if (cartItemNames.includes(title)) {
        return;
    }
    const cartRow = document.createElement('div');
    cartRow.classList.add('cart-row');
    cartRow.innerHTML = `
        <div class="cart-item cart-column">
            <img class="cart-item-image" src="${image}" width="100" height="100" alt="Product Image">
            <span class="cart-item-title">${title}</span>
        </div>
        <span class="cart-price cart-column">${price}</span>
        <div class="cart-quantity cart-column">
            <input class="cart-quantity-input" type="number" value="1" 
                   onchange="Quantity(this)">
            <button class="btn btn-danger" type="button" 
                   onclick="Remove(this)">REMOVE</button>
        </div>
    `;
    cartItems.append(cartRow);
}

function Quantity(input) {
    if (isNaN(input.value) || input.value <= 0) {
        input.value = 1;}
    Total();
}

function Remove(button) {
    button.closest('.cart-row').remove();
    Total();
}

function Total() {
    const cartItemContainer = document.getElementsByClassName('cart-items')[0];
    const cartRows = cartItemContainer.getElementsByClassName('cart-row');
    let total = 0;
    for (let i = 0; i < cartRows.length; i++) {
        const cartRow = cartRows[i];
        const priceElement = cartRow.getElementsByClassName('cart-price')[0];
        const quantityElement = cartRow.getElementsByClassName('cart-quantity-input')[0];
        const price = parseFloat(priceElement.innerText.replace('$', ''));
        const quantity = quantityElement.value;
        total += price * quantity;
    }
    total = Math.round(total * 100) / 100;
    document.getElementsByClassName('cart-total-price')[0].innerText = '$' + total;
}

function Purchase() {
    const cartItems = document.getElementsByClassName('cart-items')[0];
    cartItems.innerHTML = ''; 
    Total();
}










