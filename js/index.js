// 🟧 State giỏ hàng
const state = { cart: {}, products: [] };

// 🟧 Hàm format giá
const fmt = n => n.toString().replace(/\B(?=(\d{3})+(?!\d))/g, '.') + '₫';

// 🟧 Render danh sách sản phẩm
function renderProducts(list) {
    const grid = document.getElementById('productGrid');
    grid.innerHTML = '';
    list.forEach(p => {
        const card = document.createElement('div');
        card.className = 'card';
        card.innerHTML = `
         <a href="../BT_Miniproject/page2.html"><div class="thumb"><img src="${p.image}" alt="${p.name}" style="max-width:60%"></div></a> 
          <h3 class="title">${p.name}</h3>
          <div class="price">${fmt(p.price)}</div>
          <div class="meta">
            <button class="btn" data-id="${p._id}">Mua ngay</button>
            <button class="btn secondary" data-wish="${p._id}">Yêu thích</button>
          </div>`;
        grid.appendChild(card);
    });
    document.getElementById('shownCount').textContent = list.length;
}

// 🟧 Thêm sản phẩm vào giỏ
function addToCart(id) {
    const item = state.products.find(x => x._id === id);
    if (!item) return;
    state.cart[id] = state.cart[id] || { item, qty: 0 };
    state.cart[id].qty++;
    updateCartUI();
}

// 🟧 Cập nhật số lượng giỏ hàng
function updateCartUI() {
    const count = Object.values(state.cart).reduce((s, c) => s + c.qty, 0);
    document.getElementById('cartCount').textContent = count;
}

// 🟧 Render danh sách giỏ hàng
function renderCartList() {
    const list = document.getElementById('cartList');
    list.innerHTML = '';
    const entries = Object.values(state.cart);
    if (entries.length === 0) {
        list.innerHTML = '<div style="color:var(--muted)">Giỏ hàng trống</div>';
        return;
    }
    entries.forEach(e => {
        const row = document.createElement('div');
        row.style.display = 'flex';
        row.style.justifyContent = 'space-between';
        row.style.alignItems = 'center';
        row.style.marginBottom = '8px';
        row.innerHTML = `
            <div>${e.item.name} x ${e.qty}</div>
            <div>
                ${fmt(e.item.price * e.qty)}
                <button class="btn secondary" data-remove="${e.item._id}">❌</button>
            </div>`;
        list.appendChild(row);
    });
}

// 🟧 Xóa khỏi giỏ
function removeFromCart(id) {
    if (state.cart[id]) {
        delete state.cart[id];
        updateCartUI();
        renderCartList();
    }
}

// 🟧 Mở/đóng giỏ hàng
function openCart() {
    document.getElementById('modal').style.display = 'flex';
    renderCartList();
}

function closeCart() { document.getElementById('modal').style.display = 'none'; }

// 🟧 Sự kiện click (chỉ 1 lần)
document.addEventListener('click', e => {
    const buy = e.target.closest('button[data-id]');
    if (buy) { addToCart(buy.dataset.id); return; }

    const remove = e.target.closest('button[data-remove]');
    if (remove) { removeFromCart(remove.dataset.remove); return; }

    if (e.target.id === 'viewCartBtn') { openCart(); return; }
    if (e.target.id === 'closeModal') { closeCart(); return; }
    if (e.target.id === 'checkoutBtn') {
        alert('Giỏ hàng sẽ được thanh toán (demo).');
        closeCart();
        state.cart = {};
        updateCartUI();
        renderCartList();
        return;
    }
});

// 🟧 Tìm kiếm sản phẩm
document.getElementById('searchInput').addEventListener('input', (ev) => {
    const q = ev.target.value.trim().toLowerCase();
    const filtered = state.products.filter(p => p.name.toLowerCase().includes(q));
    renderProducts(filtered);
});

// 🟧 Load sản phẩm từ API backend
async function loadProducts() {
    const res = await fetch("http://localhost:5000/api/products");
    state.products = await res.json();
    renderProducts(state.products);
    updateCartUI();
}

// 🟧 Khởi tạo
loadProducts();