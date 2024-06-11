document.addEventListener('DOMContentLoaded', () => {
    let navbar = document.querySelector('.navbar');
    let search = document.querySelector('.search-form');
    let cartItemContainer = document.querySelector('.cart-item-container');
    let searchInput = document.querySelector('#search-box');
    let productBoxes = document.querySelectorAll('.menu .box');
    let cartItems = [];
    let cartIcon = document.querySelector('#cart');

    document.querySelector('#sub').onclick = () => {
        navbar.classList.toggle('active');
        search.classList.remove('active');
        cartItemContainer.classList.remove('active');
    };

    document.querySelector('#search').onclick = () => {
        search.classList.toggle('active');
        navbar.classList.remove('active');
        cartItemContainer.classList.remove('active');
    };

    cartIcon.onclick = () => {
        cartItemContainer.classList.toggle('active');
        navbar.classList.remove('active');
        search.classList.remove('active');
        updateCartDisplay();
    };

    window.onscroll = () => {
        navbar.classList.remove('active');
        search.classList.remove('active');
        cartItemContainer.classList.remove('active');
    };

    searchInput.addEventListener('input', (e) => {
        let query = e.target.value.toLowerCase();
        productBoxes.forEach((box) => {
            let productName = box.dataset.name.toLowerCase();
            if (productName.includes(query)) {
                box.style.display = 'block';
            } else {
                box.style.display = 'none';
            }
        });
    });

    AOS.init({
        duration: 400,
        delay: 200,
    });

    function addToCart(product) {
        let itemExists = cartItems.find(item => item.name === product.name);
        if (itemExists) {
            itemExists.quantity++;
        } else {
            product.quantity = 1;
            cartItems.push(product);
        }
        updateCartDisplay();
    }

    function updateCartDisplay() {
        cartItemContainer.innerHTML = '';
        let totalPrice = 0;
        cartItems.forEach(item => {
            totalPrice += item.price * item.quantity;
            let cartItem = document.createElement('div');
            cartItem.classList.add('cart-item');
            cartItem.innerHTML = `
            <div class="item-row">
                <img src="${item.img}" alt="${item.name}" class="item-image"/>
                <div class="quantity-controls">
                    <span class="fa-solid fa-minus decrease-quantity" data-name="${item.name}"></span>
                    <span class="quantity">${item.quantity}</span>
                    <span class="fa-solid fa-plus increase-quantity" data-name="${item.name}"></span>
                </div>
            </div>
            <div class="content">
                <h3>${item.name}</h3>
                <div class="price">Ksh ${item.price} x ${item.quantity}</div>
            </div>
        `;
      cartItemContainer.appendChild(cartItem);
});
        
       

        // Add total price element
        let cartTotalElement = document.createElement('div');
        cartTotalElement.classList.add('cart-total');
        cartTotalElement.innerHTML = `Total: Ksh <span id="cart-total">${totalPrice.toFixed(2)}</span>`;
        cartItemContainer.appendChild(cartTotalElement);
       

        // Add checkout button
        let checkoutButton = document.createElement('a');
        checkoutButton.href = '#';
        checkoutButton.classList.add('btn');
        checkoutButton.textContent = 'Checkout now';
        cartItemContainer.appendChild(checkoutButton);

        addQuantityChangeListeners();
    }

    function addQuantityChangeListeners() {
        document.querySelectorAll('.decrease-quantity').forEach(button => {
            button.addEventListener('click', (e) => {
                let productName = e.target.dataset.name;
                let item = cartItems.find(item => item.name === productName);
                if (item) {
                    item.quantity--;
                    if (item.quantity === 0) {
                        cartItems = cartItems.filter(cartItem => cartItem.name !== productName);
                    }
                    updateCartDisplay();
                }
            });
        });

        document.querySelectorAll('.increase-quantity').forEach(button => {
            button.addEventListener('click', (e) => {
                let productName = e.target.dataset.name;
                let item = cartItems.find(item => item.name === productName);
                if (item) {
                    item.quantity++;
                    updateCartDisplay();
                }
            });
        });
    }

    // Adding product to cart
    document.querySelectorAll('.add-to-cart').forEach(button => {
        button.addEventListener('click', (e) => {
            e.preventDefault();
            let productBox = e.target.closest('.box');
            let productName = productBox.dataset.name;
            let productPrice = parseFloat(productBox.dataset.price);
            let productImg = productBox.querySelector('img').src;

            let product = {
                name: productName,
                price: productPrice,
                img: productImg
            };

            addToCart(product);
        });
    });
});






