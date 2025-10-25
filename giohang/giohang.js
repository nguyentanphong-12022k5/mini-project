// ==========================
// Gio hàng + Thanh toán
// ==========================

// Format tiền
function fmt(n) {
  return Number(n).toLocaleString("vi-VN") + "₫";
}

// Render giỏ hàng
function renderCart() {
  const cart = JSON.parse(localStorage.getItem("cart")) || [];
  const container = document.getElementById("cartContainer");
  const totalEl = document.getElementById("totalPrice");

  if (!cart.length) {
    container.innerHTML = `<p>🛒 Giỏ hàng trống! <a href="../html/Trangchu.html">← Tiếp tục mua sắm</a></p>`;
    totalEl.textContent = "0₫";
    document.getElementById("cartCount").textContent = 0;
    return;
  }

  container.innerHTML = cart.map((item, i) => {
    const price = parseInt(item.price) || 0;
    const sum = price * item.qty;
    return `
      <div class="cart-item">
        <input type="checkbox" class="selectItem" data-index="${i}" checked>
        <img src="${item.img}" alt="${item.name}">
        <div class="info">
          <h4>${item.name}</h4>
          <p>${fmt(price)}</p>
          <div class="qty-controls">
            <button onclick="updateQty(${i}, -1)">-</button>
            <span>${item.qty}</span>
            <button onclick="updateQty(${i}, 1)">+</button>
          </div>
        </div>
        <div class="total">${fmt(sum)}
          <button class="remove-btn" onclick="removeItem(${i})">❌</button>
        </div>
      </div>
    `;
  }).join("");

  updateSelectedTotal();
  document.getElementById("cartCount").textContent = cart.reduce((sum, i) => sum + i.qty, 0);

  document.querySelectorAll(".selectItem").forEach(cb => {
    cb.addEventListener("change", updateSelectedTotal);
  });
}

// Cập nhật tổng tiền
function updateSelectedTotal() {
  const cart = JSON.parse(localStorage.getItem("cart")) || [];
  const checkboxes = document.querySelectorAll(".selectItem");
  let total = 0;
  checkboxes.forEach(cb => {
    if (cb.checked) {
      const idx = parseInt(cb.dataset.index);
      const item = cart[idx];
      total += (parseInt(item.price) || 0) * item.qty;
    }
  });
  document.getElementById("totalPrice").textContent = fmt(total);
}

// Sửa số lượng
function updateQty(i, delta) {
  let cart = JSON.parse(localStorage.getItem("cart")) || [];
  if (!cart[i]) return;
  cart[i].qty += delta;
  if (cart[i].qty < 1) cart[i].qty = 1;
  localStorage.setItem("cart", JSON.stringify(cart));
  renderCart();
}

// Xóa sản phẩm
function removeItem(i) {
  let cart = JSON.parse(localStorage.getItem("cart")) || [];
  cart.splice(i, 1);
  localStorage.setItem("cart", JSON.stringify(cart));
  renderCart();
}

// Thanh toán
function checkoutSelectedItems() {
  const cart = JSON.parse(localStorage.getItem("cart")) || [];
  const checkboxes = document.querySelectorAll(".selectItem");
  const selectedItems = [];

  checkboxes.forEach(cb => {
    if (cb.checked) {
      const idx = parseInt(cb.dataset.index);
      const item = cart[idx];
      selectedItems.push({
        id: item._id || item.id,
        name: item.name,
        img: item.img,
        price: parseInt(item.price) || 0,
        quantity: item.qty
      });
    }
  });

  if (!selectedItems.length) {
    alert("⚠️ Chọn ít nhất 1 sản phẩm để thanh toán!");
    return;
  }

  localStorage.setItem("selectedItems", JSON.stringify(selectedItems));
  window.location.href = "../thanhtoan/thanhtoan.html";
}

// ==========================
// User UI
// ==========================
function renderUserUI() {
  const userMenu = document.getElementById("userMenu");
  const currentUser = JSON.parse(localStorage.getItem("currentUser"));
  if (!userMenu) return;

  if (currentUser) {
    userMenu.innerHTML = `
      <div class="user-avatar" id="avatarBtn">
        <img src="${currentUser.avatar}" alt="avatar">
        <span>${currentUser.username}</span>
        <div class="dropdown" id="dropdownMenu">
          <a href="../miniproject_quan/profile_user/account.html">👤 Tài khoản của tôi</a>
          <a href="../miniproject_quan/Quanlydonhang/donhang.html">📦 Đơn hàng của tôi</a>
          <a href="#" id="logoutBtn">🚪 Đăng xuất</a>
        </div>
      </div>
    `;
  } else {
    userMenu.innerHTML = `<button class="btn secondary" id="loginBtn">Đăng nhập/Đăng ký</button>`;
  }
}

// ==========================
// Click event chung
// ==========================
document.addEventListener("click", e => {
  const avatar = e.target.closest("#avatarBtn");
  const dropdown = document.getElementById("dropdownMenu");

  if (avatar && dropdown) dropdown.classList.toggle("show");
  else if (!e.target.closest("#dropdownMenu")) dropdown?.classList.remove("show");

  if (e.target.id === "logoutBtn") {
    localStorage.removeItem("currentUser");
    renderUserUI();
    renderCart();
  }

  if (e.target.id === "loginBtn") window.location.href = "../html/login.html";
});

// ==========================
// Khởi tạo
// ==========================
document.addEventListener("DOMContentLoaded", () => {
  renderCart();
  renderUserUI();

  const checkoutBtn = document.getElementById("checkoutBtn");
  if (checkoutBtn) checkoutBtn.addEventListener("click", checkoutSelectedItems);
});
