// ==========================
// KẾT NỐI API BACKEND
// ==========================
const API_URL = "http://localhost:5000/api/products";

// Render sản phẩm
function renderProducts(containerId, products) {
    const container = document.getElementById(containerId);
    container.innerHTML = "";
    products.forEach(p => {
        const card = document.createElement("div");
        card.className = "product-card";
        card.innerHTML = `
      <img src="${p.image}" alt="${p.name}">
      <h3>${p.name}</h3>
      <p>${p.price.toLocaleString()} VNĐ</p>
      <button>Mua ngay</button>
    `;
        container.appendChild(card);
    });
}

// Lấy dữ liệu từ API
async function loadProducts() {
    // Tất cả sản phẩm
    const all = await fetch(API_URL).then(res => res.json());
    renderProducts("all-products", all);

    // Sản phẩm nổi bật
    const featured = await fetch(`${API_URL}/featured`).then(res => res.json());
    renderProducts("featured-products", featured);

    // Khuyến mãi (lọc thủ công)
    const sale = all.filter(p => p.isOnSale);
    renderProducts("sale-products", sale);
}

loadProducts();