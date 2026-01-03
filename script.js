const items = [
    { id: 1, type: 'food', name: "ხბოს ჩაქაფული", price: 25, img: "https://images.unsplash.com/photo-1547928576-a4a33237cbc3?w=600" },
    { id: 2, type: 'food', name: "მწვადი საქონლის", price: 22, img: "https://images.unsplash.com/photo-1529692236671-f1f6e9460272?w=600" },
    { id: 3, type: 'drink', name: "ღვინო საფერავი", price: 40, img: "https://images.unsplash.com/photo-1510812431401-41d2bd2722f3?w=600" },
    { id: 4, type: 'dessert', name: "ტირამისუ", price: 16, img: "https://images.unsplash.com/photo-1571877227200-a0d98ea607e9?w=600" },
    { id: 5, type: 'food', name: "ხინკალი (10ც)", price: 15, img: "https://images.unsplash.com/photo-1563379926898-05f4575a45d8?w=600" },
    { id: 6, type: 'dessert', name: "ჩიზქეიქი", price: 14, img: "https://images.unsplash.com/photo-1533134242443-d4fd215305ad?w=600" }
];

let cart = [];

function toggleMode() {
    const body = document.body;
    const icon = document.getElementById('mode-icon');
    body.classList.toggle('light-mode');
    if(body.classList.contains('light-mode')) {
        icon.classList.replace('fa-moon', 'fa-sun');
    } else {
        icon.classList.replace('fa-sun', 'fa-moon');
    }
}

function displayMenu(cat = 'all') {
    const grid = document.getElementById('menu-grid');
    grid.innerHTML = '';
    const filtered = cat === 'all' ? items : items.filter(i => i.type === cat);
    
    filtered.forEach(item => {
        grid.innerHTML += `
            <div class="menu-card">
                <img src="${item.img}" onclick="openFullImg(this.src)">
                <div class="card-info">
                    <h3>${item.name}</h3>
                    <p class="price">${item.price} ₾</p>
                    <button class="add-btn" onclick="addToCart(${item.id})">დამატება</button>
                </div>
            </div>`;
    });
}

function filterMenu(cat, btn) {
    document.querySelectorAll('.filter-btn').forEach(b => b.classList.remove('active'));
    btn.classList.add('active');
    displayMenu(cat);
}

function addToCart(id) {
    const prod = items.find(i => i.id === id);
    const existing = cart.find(i => i.id === id);
    if(existing) existing.qty++; else cart.push({...prod, qty: 1});
    updateCartUI();
}

function updateCartUI() {
    const list = document.getElementById('cart-items-list');
    let total = 0, count = 0;
    list.innerHTML = '';
    cart.forEach((item, idx) => {
        total += item.price * item.qty;
        count += item.qty;
        list.innerHTML += `
            <div style="display:flex; justify-content:space-between; margin-bottom:15px; border-bottom:1px solid rgba(128,128,128,0.2); padding-bottom:8px;">
                <span>${item.name} (x${item.qty})</span>
                <span>${item.price * item.qty}₾ <i class="fas fa-trash-alt" onclick="removeItem(${idx})" style="color:#ff4444; cursor:pointer; margin-left:10px;"></i></span>
            </div>`;
    });
    document.getElementById('cart-total').innerText = total;
    document.getElementById('cart-count').innerText = count;
}

function removeItem(idx) { cart.splice(idx, 1); updateCartUI(); }
function toggleCart() { document.getElementById('cart-sidebar').classList.toggle('open'); }
function openFullImg(src) { document.getElementById('lightbox').style.display = 'flex'; document.getElementById('light-img').src = src; }
function closeFullImg() { document.getElementById('lightbox').style.display = 'none'; }

function sendToWhatsApp() {
    const name = document.getElementById('cust-name').value;
    const table = document.getElementById('table-num').value;
    if(!name || !table || cart.length === 0) return alert("გთხოვთ შეავსოთ სახელი, მაგიდის ნომერი და დაამატოთ კერძები!");
    
    let text = `*ახალი შეკვეთა - Gourmet Palace*\n`;
    text += `👤 სახელი: ${name}\n`;
    text += `📍 მაგიდა: ${table}\n`;
    text += `--------------------------\n`;
    cart.forEach(i => text += `• ${i.name} x${i.qty} - ${i.price * i.qty}₾\n`);
    text += `--------------------------\n`;
    text += `*💰 ჯამი: ${document.getElementById('cart-total').innerText} ₾*`;
    
    window.open(`https://wa.me/995555123456?text=${encodeURIComponent(text)}`);
}

window.onload = () => displayMenu();