const API_URL = "http://localhost:5000/api/products";
let allProducts = [];
let filteredProducts = [];

// 🛒 Giỏ hàng
function getCart() {
  return JSON.parse(localStorage.getItem("cart") || "[]");
}

function saveCart(cart) {
  localStorage.setItem("cart", JSON.stringify(cart));
}

function updateCartCount() {
  const cart = getCart();
  const count = cart.reduce((sum, i) => sum + i.quantity, 0);
  const el = document.getElementById("cartCount");
  if (el) el.textContent = count;
}

// 📦 Lấy dữ liệu sản phẩm từ backend
async function fetchProducts() {
  try {
    const res = await fetch(API_URL);
    allProducts = await res.json();
    filteredProducts = allProducts;
    renderProducts(filteredProducts);
  } catch (err) {
    console.error("❌ Không thể tải sản phẩm:", err);
  }
}

// 🎨 Hiển thị danh sách sản phẩm
function renderProducts(list) {
  const grid = document.getElementById("productGrid");
  grid.innerHTML = "";

  if (!list || list.length === 0) {
    grid.innerHTML = "<p>Không tìm thấy sản phẩm phù hợp.</p>";
    return;
  }

  list.forEach(p => {
    const img = p.baseImage || "https://via.placeholder.com/200";
    const price = p.storages?.[0]?.price || "Liên hệ";

    const card = document.createElement("div");
    card.className = "product-card";
    card.innerHTML = `
      <div class="product-click" data-id="${p._id}">
        <img src="${img}" alt="${p.name}">
        <h4>${p.name}</h4>
      </div>
      <p class="price">${price}</p>
      <div class="actions">
        <button class="btn-add" data-id="${p._id}">🛒 Thêm vào giỏ</button>
        <button class="btn-buy" data-id="${p._id}">⚡ Mua ngay</button>
      </div>
    `;
    grid.appendChild(card);
  });
}

// 🔍 Lọc sản phẩm theo keyword + chi tiết bộ lọc
function applyFilters() {
  const keyword = document.getElementById("searchInput")?.value.trim().toLowerCase() || "";
  const category = document.getElementById("filterCategory")?.value || "";
  const brand = document.getElementById("filterBrand")?.value || "";
  const storage = document.getElementById("filterStorage")?.value || "";
  const color = document.getElementById("filterColor")?.value || "";

  const priceMin = parseInt(document.getElementById("filterPriceMin")?.value) || 0;
  const priceMax = parseInt(document.getElementById("filterPriceMax")?.value) || Infinity;

  filteredProducts = allProducts.filter(p => {
    const name = p.name.toLowerCase();
    const priceNum = parseInt(p.storages?.[0]?.price?.replace(/\D/g, "")) || 0;
    const storageVal = p.storages?.[0]?.storage || "";
    const colorVal = p.colors?.[0] || "";

    const matchKeyword = name.includes(keyword);
    const matchCategory = !category || name.includes(category.toLowerCase());
    const matchBrand = !brand || name.includes(brand.toLowerCase());
    const matchStorage = !storage || storageVal === storage;
    const matchColor = !color || colorVal === color;
    const matchPrice = priceNum >= priceMin && priceNum <= priceMax;

    return matchKeyword && matchCategory && matchBrand && matchStorage && matchColor && matchPrice;
  });

  renderProducts(filteredProducts);
}

// ⚡ Sự kiện lọc & tìm kiếm
document.getElementById("btnFilter").addEventListener("click", applyFilters);
document.getElementById("searchInput").addEventListener("input", applyFilters);

// 👆 Xử lý click: thêm giỏ, mua ngay, xem chi tiết
document.addEventListener("click", (e) => {
  const id = e.target.dataset.id;

  // 🛒 Thêm vào giỏ
  if (e.target.classList.contains("btn-add")) {
    const product = allProducts.find(p => p._id === id);
    if (!product) return;
    const cart = getCart();
    const exist = cart.find(i => i._id === id);
    if (exist) exist.quantity++;
    else
      cart.push({
        _id: id,
        name: product.name,
        img: product.baseImage,
        price: parseInt(product.storages?.[0]?.price?.replace(/\D/g, "")) || 0,
        quantity: 1,
      });
    saveCart(cart);
    updateCartCount();
    alert("✅ Đã thêm vào giỏ hàng!");
  }

  // 💰 Mua ngay
  if (e.target.classList.contains("btn-buy")) {
    const product = allProducts.find(p => p._id === id);
    if (!product) return;
    const singleCart = [
      {
        _id: id,
        name: product.name,
        img: product.baseImage,
        price: parseInt(product.storages?.[0]?.price?.replace(/\D/g, "")) || 0,
        quantity: 1,
      },
    ];
    saveCart(singleCart);
    window.location.href = "../giohang/giohang.html";
  }

  // 👀 Xem chi tiết sản phẩm
  const click = e.target.closest(".product-click");
  if (click) {
    window.location.href = `../BT_Miniproject/page2.html?id=${click.dataset.id}`;
  }
});

// 🚀 Khởi tạo
fetchProducts();
updateCartCount();
