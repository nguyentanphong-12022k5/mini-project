// const state = { products: [] };

// // ================================
// // 🔹 FORMAT GIÁ
// // ================================
// const fmt = (n) => n.toLocaleString("vi-VN") + "₫";

// // ================================
// // 🔹 CẬP NHẬT SỐ LƯỢNG GIỎ HÀNG
// // ================================
// function updateCartCount() {
//   const cart = JSON.parse(localStorage.getItem("cart")) || [];
//   document.getElementById("cartCount").textContent = cart.reduce(
//     (sum, p) => sum + p.qty,
//     0
//   );
// }

// // ================================
// // 🔹 RENDER NGƯỜI DÙNG
// // ================================
// function renderUserUI() {
//   const userMenu = document.getElementById("userMenu");
//   const currentUser = JSON.parse(localStorage.getItem("currentUser"));

//   if (currentUser) {
//     userMenu.innerHTML = `
//       <div class="user-avatar" id="avatarBtn">
//         <img src="${currentUser.avatar}" alt="avatar">
//         <span>${currentUser.username}</span>
//         <div class="dropdown" id="dropdownMenu">
//           <a href="../miniproject_quan/profile_user/account.html">👤 Tài khoản của tôi</a>
//           <a href="../miniproject_quan/Quanlydonhang/donhang.html">📦 Đơn hàng của tôi</a>
//           <a href="#" id="logoutBtn">🚪 Đăng xuất</a>
//         </div>
//       </div>
//     `;
//   } else {
//     userMenu.innerHTML = `
//       <button class="btn secondary" id="loginBtn">Đăng nhập/Đăng ký</button>
//     `;
//   }
// }

// document.addEventListener("click", (e) => {
//   const avatar = e.target.closest("#avatarBtn");
//   const dropdown = document.getElementById("dropdownMenu");

//   if (avatar && dropdown) dropdown.classList.toggle("show");
//   else if (dropdown) dropdown.classList.remove("show");

//   if (e.target.id === "logoutBtn") {
//     localStorage.removeItem("currentUser");
//     renderUserUI();
//     updateCartCount();
//   }

//   if (e.target.id === "loginBtn") {
//     window.location.href = "../html/login.html";
//   }
// });

// renderUserUI();
// updateCartCount();

// // ================================
// // 🔹 RENDER DANH SÁCH SẢN PHẨM
// // ================================
// function renderProducts(list) {
//   const grid = document.getElementById("productGrid");
//   grid.innerHTML = "";

//   list.forEach((p) => {
//     const rawPrice = p.storages?.[0]?.price;
//     const priceNum = typeof rawPrice === "string"
//       ? parseInt(rawPrice.replace(/\D/g, "")) || 0
//       : rawPrice || 0;

//     const card = document.createElement("div");
//     card.className = "card";
//     card.innerHTML = `
//       <a href="../BT_Miniproject/page2.html?id=${p._id}">
//         <div class="thumb">
//           <img src="${p.baseImage}" alt="${p.name}" style="max-width:60%">
//         </div>
//       </a>
//       <h3 class="title">${p.name}</h3>
//       <div class="price">${fmt(priceNum)}</div>
//       <div class="meta">
//         <button class="btn" data-id="${p._id}">🛒 Mua ngay</button>
//         <button class="btn secondary" data-cart="${p._id}">➕ Thêm vào giỏ hàng</button>
//       </div>
//     `;
//     grid.appendChild(card);
//   });

//   document.getElementById("shownCount").textContent = list.length;
// }

// // ================================
// // 🔹 THÊM SẢN PHẨM VÀO GIỎ HÀNG
// // ================================
// function addToCart(id) {
//   const item = state.products.find((x) => x._id === id);
//   if (!item) return;

//   const rawPrice = item.storages?.[0]?.price;
//   const priceNum = typeof rawPrice === "string"
//     ? parseInt(rawPrice.replace(/\D/g, "")) || 0
//     : rawPrice || 0;

//   let cart = JSON.parse(localStorage.getItem("cart")) || [];
//   const existing = cart.find((p) => p.id === id);

//   if (existing) {
//     existing.qty += 1;
//   } else {
//     cart.push({
//       id: item._id,
//       name: item.name,
//       img: item.baseImage,
//       price: priceNum,
//       qty: 1,
//     });
//   }

//   localStorage.setItem("cart", JSON.stringify(cart));
//   alert("🛒 Đã thêm vào giỏ hàng!");
//   updateCartCount();
// }

// // ================================
// // 🔹 SỰ KIỆN CLICK
// // ================================
// document.addEventListener("click", (e) => {
//   const buy = e.target.closest("button[data-id]");
//   const add = e.target.closest("button[data-cart]");

//   if (buy) {
//     const id = buy.dataset.id;
//     const item = state.products.find((x) => x._id === id);
//     if (!item) return;

//     const rawPrice = item.storages?.[0]?.price;
//     const priceNum = typeof rawPrice === "string"
//       ? parseInt(rawPrice.replace(/\D/g, "")) || 0
//       : rawPrice || 0;

//     const selectedItem = {
//       id: item._id,
//       name: item.name,
//       img: item.baseImage,
//       price: priceNum,
//       quantity: 1,
//     };

//     localStorage.setItem("selectedItems", JSON.stringify([selectedItem]));
//     window.location.href = "../thanhtoan/thanhtoan.html";
//     return;
//   }

//   if (add) {
//     addToCart(add.dataset.cart);
//   }
// });

// // ================================
// // 🔹 TÌM KIẾM
// // ================================
// document.getElementById("searchInput").addEventListener("input", (ev) => {
//   const q = ev.target.value.trim().toLowerCase();
//   const filtered = state.products.filter((p) =>
//     p.name.toLowerCase().includes(q)
//   );
//   renderProducts(filtered);
// });

// // ================================
// // 🔹 LOAD SẢN PHẨM
// // ================================
// async function loadProducts() {
//   try {
//     const res = await fetch("http://localhost:5000/api/products");
//     if (!res.ok) throw new Error("Lỗi tải sản phẩm");
//     state.products = await res.json();
//     renderProducts(state.products);
//     updateCartCount();
//   } catch (err) {
//     console.error("❌ Không thể tải sản phẩm:", err);
//   }
// }
// loadProducts();
// ================================
// 🟩 TRANG CHỦ - QUẢN LÝ SẢN PHẨM & GIỎ HÀNG
// ================================

const state = { products: [] };

// Format giá
const fmt = n => n.toLocaleString("vi-VN") + "₫";

// Cập nhật số lượng giỏ hàng
function updateCartCount() {
  const cart = JSON.parse(localStorage.getItem("cart")) || [];
  const count = cart.reduce((sum, p) => sum + (p.qty || p.quantity || 0), 0);
  const el = document.getElementById("cartCount");
  if (el) el.textContent = count;
}

// Render người dùng
function renderUserUI() {
  const userMenu = document.getElementById("userMenu");
  const currentUser = JSON.parse(localStorage.getItem("currentUser"));
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

// Click event chung
document.addEventListener("click", e => {
  const avatar = e.target.closest("#avatarBtn");
  const dropdown = document.getElementById("dropdownMenu");
  if (avatar && dropdown) dropdown.classList.toggle("show");
  else dropdown?.classList.remove("show");

  if (e.target.id === "logoutBtn") {
    localStorage.removeItem("currentUser");
    renderUserUI();
    updateCartCount();
  }
  if (e.target.id === "loginBtn") window.location.href = "../html/login.html";

  // Mua ngay
  const buy = e.target.closest("button[data-id]");
  if (buy) {
    const id = buy.dataset.id;
    const item = state.products.find(p => p._id === id);
    if (!item) return;
    const priceNum = parseInt(item.storages?.[0]?.price?.replace(/\D/g, "")) || 0;
    const selectedItem = { id: item._id, name: item.name, img: item.baseImage, price: priceNum, quantity: 1 };
    localStorage.setItem("selectedItems", JSON.stringify([selectedItem]));
    window.location.href = "../thanhtoan/thanhtoan.html";
  }

  // Thêm vào giỏ
  const add = e.target.closest("button[data-cart]");
  if (add) addToCart(add.dataset.cart);
});

// Thêm vào giỏ
function addToCart(id) {
  const item = state.products.find(p => p._id === id);
  if (!item) return;
  const priceNum = parseInt(item.storages?.[0]?.price?.replace(/\D/g, "")) || 0;
  let cart = JSON.parse(localStorage.getItem("cart")) || [];
  const existing = cart.find(p => p._id === id);
  if (existing) existing.qty += 1;
  else cart.push({ _id: id, name: item.name, img: item.baseImage, price: priceNum, qty: 1 });
  localStorage.setItem("cart", JSON.stringify(cart));
  alert("🛒 Đã thêm vào giỏ hàng!");
  updateCartCount();
}

// Render sản phẩm
function renderProducts(list) {
  const grid = document.getElementById("productGrid");
  grid.innerHTML = "";
  if (!list || list.length === 0) {
    grid.innerHTML = "<p>Không tìm thấy sản phẩm phù hợp.</p>";
    return;
  }
  list.forEach(p => {
    const priceNum = parseInt(p.storages?.[0]?.price?.replace(/\D/g, "")) || 0;
    const card = document.createElement("div");
    card.className = "card";
    card.innerHTML = `
      <a href="../BT_Miniproject/page2.html?id=${p._id}">
        <div class="thumb"><img src="${p.baseImage}" alt="${p.name}" style="max-width:60%"></div>
      </a>
      <h3 class="title">${p.name}</h3>
      <div class="price">${fmt(priceNum)}</div>
      <div class="meta">
        <button class="btn" data-id="${p._id}">🛒 Mua ngay</button>
        <button class="btn secondary" data-cart="${p._id}">➕ Thêm vào giỏ hàng</button>
      </div>
    `;
    grid.appendChild(card);
  });
  document.getElementById("shownCount").textContent = list.length;
}

// Search
document.getElementById("searchInput").addEventListener("input", ev => {
  const q = ev.target.value.trim().toLowerCase();
  const filtered = state.products.filter(p => p.name.toLowerCase().includes(q));
  renderProducts(filtered);
});

// Load sản phẩm từ backend
async function loadProducts() {
  try {
    const res = await fetch("http://localhost:5000/api/products");
    if (!res.ok) throw new Error("Lỗi tải sản phẩm");
    state.products = await res.json();
    renderProducts(state.products);
    updateCartCount();
  } catch (err) { console.error(err); }
}

// Khởi chạy
renderUserUI();
updateCartCount();
loadProducts();
