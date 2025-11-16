document.addEventListener('DOMContentLoaded', () => {
    const cartSidebar = document.getElementById('cart-sidebar');
    const cartIcon = document.getElementById('cart-icon');
    const closeCartBtn = document.getElementById('close-cart-btn');
    const cartItemsContainer = document.getElementById('cart-items-container');
    const cartCount = document.getElementById('cart-count');
    const cartTotal = document.getElementById('cart-total');
    const emptyMessage = document.getElementById('empty-cart-message');

    let cart = []; 

    
    cartIcon.addEventListener('click', () => {
        cartSidebar.classList.toggle('visible');
    });

    closeCartBtn.addEventListener('click', () => {
        cartSidebar.classList.remove('visible');
    });

    
    function updateCartUI() {
        cartItemsContainer.innerHTML = ''; 
        let total = 0;
        
        if (cart.length === 0) {
            emptyMessage.style.display = 'block';
        } else {
            emptyMessage.style.display = 'none';
        }

        cart.forEach((item, index) => {
            const itemElement = document.createElement('div');
            itemElement.classList.add('cart-item');
            
            total += item.price * item.quantity;
            
            itemElement.innerHTML = `
                <div>
                    <strong>${item.name}</strong> (${item.quantity}x) <br>
                    <small>R$ ${(item.price * item.quantity).toFixed(2).replace('.', ',')}</small>
                </div>
                <button class="remove-item-btn" data-index="${index}">Remover</button>
            `;
            cartItemsContainer.appendChild(itemElement);
        });

        cartTotal.textContent = total.toFixed(2).replace('.', ',');
        cartCount.textContent = cart.reduce((sum, item) => sum + item.quantity, 0); 
        
        document.querySelectorAll('.remove-item-btn').forEach(button => {
            button.addEventListener('click', (e) => {
                const index = e.target.getAttribute('data-index');
                removeItemFromCart(index);
            });
        });
    }
    
   
    function addItemToCart(name, price) {
       
        const existingItem = cart.find(item => item.name === name);
        
        if (existingItem) {
            existingItem.quantity += 1;
        } else {
            cart.push({ name, price, quantity: 1 }); 
        }
        
        updateCartUI();
        cartSidebar.classList.add('visible'); 
    }

    
    function removeItemFromCart(indexToRemove) {
        cart.splice(indexToRemove, 1); 
        updateCartUI();
    }

    
    document.querySelectorAll('.produto button').forEach(button => {
        button.addEventListener('click', (e) => {
            const productArticle = e.target.closest('.produto');
            const name = productArticle.querySelector('h3').textContent;
            
        
            const priceText = productArticle.querySelector('p:nth-of-type(2)').textContent;
            const price = parseFloat(priceText.replace('Preço: R$', '').trim().replace(',', '.'));

            addItemToCart(name, price);
        });
    });

   
    updateCartUI();
});