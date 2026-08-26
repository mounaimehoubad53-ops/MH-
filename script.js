// ================================
// منتجات المقهى
// ================================

let products = JSON.parse(localStorage.getItem("cafeProducts")) || [
    {
        id: 1,
        name: "Espresso",
        price: 150,
        icon: "☕"
    },
    {
        id: 2,
        name: "Cappuccino",
        price: 250,
        icon: "☕"
    },
    {
        id: 3,
        name: "Café Crème",
        price: 200,
        icon: "☕"
    },
    {
        id: 4,
        name: "Latte",
        price: 280,
        icon: "🥛"
    },
    {
        id: 5,
        name: "Thé",
        price: 150,
        icon: "🍵"
    },
    {
        id: 6,
        name: "Croissant",
        price: 150,
        icon: "🥐"
    }
];


// ================================
// سلة المبيعات
// ================================

let cart = [];


// ================================
// عرض المنتجات
// ================================

function displayProducts() {

    const productsContainer = document.getElementById("products");

    productsContainer.innerHTML = "";

    products.forEach(product => {

        const productElement = document.createElement("div");

        productElement.className = "product";

        productElement.innerHTML = `
            <div class="icon">${product.icon}</div>

            <h3>${product.name}</h3>

            <div class="price">
                ${product.price} DA
            </div>
        `;

        productElement.addEventListener("click", () => {
            addToCart(product.id);
        });

        productsContainer.appendChild(productElement);
    });
}


// ================================
// إضافة المنتج إلى السلة
// ================================

function addToCart(productId) {

    const product = products.find(p => p.id === productId);

    if (!product) return;

    const existingProduct = cart.find(item => item.id === productId);

    if (existingProduct) {

        existingProduct.quantity++;

    } else {

        cart.push({
            id: product.id,
            name: product.name,
            price: product.price,
            quantity: 1
        });
    }

    displayCart();
}


// ================================
// عرض الفاتورة
// ================================

function displayCart() {

    const cartContainer = document.getElementById("cart");
    const totalElement = document.getElementById("total");

    cartContainer.innerHTML = "";

    if (cart.length === 0) {

        cartContainer.innerHTML = `
            <p class="empty-cart">
                لم يتم اختيار أي منتج
            </p>
        `;

        totalElement.textContent = "0";

        return;
    }

    let total = 0;

    cart.forEach(item => {

        const itemTotal = item.price * item.quantity;

        total += itemTotal;

        const cartItem = document.createElement("div");

        cartItem.className = "cart-item";

        cartItem.innerHTML = `

            <div class="cart-item-info">

                <div class="cart-item-name">
                    ${item.name}
                </div>

                <div class="cart-item-price">
                    ${item.price} DA × ${item.quantity}
                </div>

            </div>

            <div class="quantity">

                <button onclick="decreaseQuantity(${item.id})">
                    −
                </button>

                <span>
                    ${item.quantity}
                </span>

                <button onclick="increaseQuantity(${item.id})">
                    +
                </button>

            </div>

            <strong>
                ${itemTotal} DA
            </strong>
        `;

        cartContainer.appendChild(cartItem);
    });

    totalElement.textContent = total.toLocaleString("fr-DZ");
}


// ================================
// زيادة الكمية
// ================================

function increaseQuantity(productId) {

    const item = cart.find(item => item.id === productId);

    if (!item) return;

    item.quantity++;

    displayCart();
}


// ================================
// إنقاص الكمية
// ================================

function decreaseQuantity(productId) {

    const item = cart.find(item => item.id === productId);

    if (!item) return;

    item.quantity--;

    if (item.quantity <= 0) {

        cart = cart.filter(item => item.id !== productId);
    }

    displayCart();
}


// ================================
// إتمام البيع
// ================================

document.getElementById("checkout").addEventListener("click", () => {

    if (cart.length === 0) {

        alert("السلة فارغة");

        return;
    }

    const total = cart.reduce(
        (sum, item) => sum + item.price * item.quantity,
        0
    );

    alert(
        "تم إتمام البيع بنجاح\n\n" +
        "المجموع: " +
        total.toLocaleString("fr-DZ") +
        " DA"
    );

    cart = [];

    displayCart();
});


// ================================
// حفظ المنتجات
// ================================

function saveProducts() {

    localStorage.setItem(
        "cafeProducts",
        JSON.stringify(products)
    );
}


// ================================
// تشغيل الموقع
// ================================

saveProducts();

displayProducts();

displayCart();
