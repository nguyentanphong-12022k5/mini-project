const API_URL = "http://localhost:5000/api/products"; // thay bằng server của bạn

// Lấy dữ liệu sản phẩm
async function fetchProducts(params = {}) {
    const query = new URLSearchParams(params).toString();
    const res = await fetch(`${API_URL}?${query}`);
    return await res.json();
}

// Render danh sách sản phẩm
function renderProducts(products) {
    const grid = document.getElementById("productGrid");
    grid.innerHTML = "";

    if (products.length === 0) {
        grid.innerHTML = "<p>Không có sản phẩm nào phù hợp.</p>";
        return;
    }

    products.forEach(p => {
        const card = document.createElement("div");
        card.className = "product-card";
        card.innerHTML = `
      <img src="${p.image || 'https://via.placeholder.com/200'}" alt="${p.name}">
      <h4>${p.name}</h4>
      <p>Thương hiệu: ${p.brand}</p>
      <p>Giá: ${p.price.toLocaleString()}₫</p>
    `;
        grid.appendChild(card);
    });
}

// Xử lý filter
document.getElementById("btnFilter").addEventListener("click", async() => {
    const category = document.getElementById("filterCategory").value;
    const brand = document.getElementById("filterBrand").value;
    const price = document.getElementById("filterPrice").value;

    const params = {};
    if (category) params.category = category;
    if (brand) params.brand = brand;
    if (price) params.price_lte = price;

    const products = await fetchProducts(params);
    renderProducts(products);
});

// Load ban đầu
(async() => {
    const products = await fetchProducts();
    renderProducts(products);
})();