// ================== DANH SÁCH SẢN PHẨM ==================
// Mỗi sản phẩm là 1 object gồm: tên, hãng, giá, dung lượng, pin, năm SX, ảnh
const products = [
    // Apple
    { name: "iPhone 15 Pro Max", brand: "Apple", price: 30000, storage: "512GB", battery: 4500, year: 2025, img: "https://via.placeholder.com/200x180?text=iPhone+15+Pro+Max" },
    { name: "iPhone 15", brand: "Apple", price: 25000, storage: "256GB", battery: 4200, year: 2025, img: "https://via.placeholder.com/200x180?text=iPhone+15" },
    { name: "iPhone 14 Pro", brand: "Apple", price: 22000, storage: "256GB", battery: 4000, year: 2024, img: "https://via.placeholder.com/200x180?text=iPhone+14+Pro" },
    { name: "iPhone 13", brand: "Apple", price: 18000, storage: "128GB", battery: 3800, year: 2022, img: "https://via.placeholder.com/200x180?text=iPhone+13" },

    // Samsung
    { name: "Samsung Galaxy S24 Ultra", brand: "Samsung", price: 28000, storage: "512GB", battery: 5000, year: 2025, img: "https://via.placeholder.com/200x180?text=Galaxy+S24+Ultra" },
    { name: "Samsung Galaxy S23", brand: "Samsung", price: 20000, storage: "256GB", battery: 4800, year: 2024, img: "https://via.placeholder.com/200x180?text=Galaxy+S23" },
    { name: "Samsung A54", brand: "Samsung", price: 9000, storage: "128GB", battery: 4800, year: 2023, img: "https://via.placeholder.com/200x180?text=Samsung+A54" },

    // Xiaomi
    { name: "Xiaomi 14 Ultra", brand: "Xiaomi", price: 16000, storage: "512GB", battery: 5200, year: 2025, img: "https://via.placeholder.com/200x180?text=Xiaomi+14+Ultra" },
    { name: "Xiaomi 13 Pro", brand: "Xiaomi", price: 14000, storage: "256GB", battery: 5000, year: 2024, img: "https://via.placeholder.com/200x180?text=Xiaomi+13+Pro" },
    { name: "Xiaomi Redmi Note 12", brand: "Xiaomi", price: 7000, storage: "128GB", battery: 5000, year: 2022, img: "https://via.placeholder.com/200x180?text=Redmi+Note+12" },

    // Redmi
    { name: "Redmi Note 13 Pro", brand: "Redmi", price: 8000, storage: "256GB", battery: 5100, year: 2024, img: "https://via.placeholder.com/200x180?text=Redmi+Note+13+Pro" },
    { name: "Redmi 12C", brand: "Redmi", price: 5000, storage: "128GB", battery: 5000, year: 2023, img: "https://via.placeholder.com/200x180?text=Redmi+12C" },

    // Honor
    { name: "Honor Magic 6 Pro", brand: "Honor", price: 19000, storage: "512GB", battery: 5200, year: 2025, img: "https://via.placeholder.com/200x180?text=Honor+Magic+6+Pro" },
    { name: "Honor X9b", brand: "Honor", price: 10000, storage: "256GB", battery: 5100, year: 2024, img: "https://via.placeholder.com/200x180?text=Honor+X9b" },

    // Oppo
    { name: "Oppo Find X7 Pro", brand: "Oppo", price: 21000, storage: "512GB", battery: 4800, year: 2025, img: "https://via.placeholder.com/200x180?text=Oppo+Find+X7+Pro" },
    { name: "Oppo Reno 11", brand: "Oppo", price: 12000, storage: "256GB", battery: 4600, year: 2024, img: "https://via.placeholder.com/200x180?text=Oppo+Reno+11" }
];

// ================== LẤY CÁC PHẦN TỬ TRÊN HTML ==================
const productList = document.getElementById("productList"); // nơi hiển thị danh sách sản phẩm
const searchInput = document.getElementById("searchInput"); // ô tìm kiếm theo tên
const brandFilter = document.getElementById("brandFilter"); // lọc theo hãng
const priceFilter = document.getElementById("priceFilter"); // lọc theo giá
const storageFilter = document.getElementById("storageFilter"); // lọc theo dung lượng
const batteryFilter = document.getElementById("batteryFilter"); // lọc theo pin
const yearMin = document.getElementById("yearMin"); // năm SX tối thiểu
const yearMax = document.getElementById("yearMax"); // năm SX tối đa
const latestFilter = document.getElementById("latestFilter"); // checkbox: chỉ lấy sản phẩm mới nhất

// ================== HÀM HIỂN THỊ SẢN PHẨM ==================
function displayProducts(items) {
    productList.innerHTML = ""; // Xóa hết sản phẩm cũ trước khi render lại

    if (items.length === 0) {
        productList.innerHTML = "<p>Không tìm thấy sản phẩm nào!</p>";
        return;
    }

    items.forEach((p, index) => {
        const div = document.createElement("div");
        div.className = "product-card";
        div.innerHTML = `
      <img src="${p.img}" alt="${p.name}">
      <h3>${p.name}</h3>
      <p>Hãng: ${p.brand}</p>
      <p>Giá: ${p.price.toLocaleString()} VNĐ</p>
      <p>Dung lượng: ${p.storage}</p>
      <p>Pin: ${p.battery} mAh</p>
      <p>Năm sản xuất: ${p.year}</p>
      <div class="actions">
        <button class="buyNowBtn" data-index="${index}">Mua ngay</button>
        <button class="addToCartBtn" data-index="${index}">Thêm vào giỏ</button>
      </div>
    `;
        productList.appendChild(div);
    });

    // ================== GẮN SỰ KIỆN NÚT MUA NGAY ==================
    document.querySelectorAll(".buyNowBtn").forEach(btn => {
        btn.addEventListener("click", e => {
            const i = e.target.dataset.index;
            let selectedProduct = {...items[i], quantity: 1 };

            // Ghi đè giỏ hàng chỉ có sản phẩm này
            localStorage.setItem("cart", JSON.stringify([selectedProduct]));

            // Chuyển sang trang giỏ hàng
            window.location.href = "cart.html";
        });
    });

    // ================== GẮN SỰ KIỆN NÚT THÊM VÀO GIỎ ==================
    document.querySelectorAll(".addToCartBtn").forEach(btn => {
        btn.addEventListener("click", e => {
            const i = e.target.dataset.index;
            let selectedProduct = {...items[i], quantity: 1 };

            // Lấy giỏ hàng cũ từ localStorage
            let cart = JSON.parse(localStorage.getItem("cart")) || [];

            // Kiểm tra sản phẩm đã có trong giỏ chưa
            let existing = cart.find(item => item.name === selectedProduct.name);
            if (existing) {
                existing.quantity += 1; // nếu có thì tăng số lượng
            } else {
                cart.push(selectedProduct); // nếu chưa thì thêm mới
            }

            // Lưu lại vào localStorage
            localStorage.setItem("cart", JSON.stringify(cart));

            // ✅ Sau khi thêm → chuyển sang trang giỏ hàng
            window.location.href = "../giohang/giohang.html";
        });
    });

}

// ================== CẬP NHẬT SỐ LƯỢNG GIỎ HÀNG ==================
function updateCartCount() {
    let cart = JSON.parse(localStorage.getItem("cart")) || [];
    let total = cart.reduce((sum, item) => sum + item.quantity, 0);
    document.getElementById("cartCount").textContent = total;
}


// ================== HÀM LỌC SẢN PHẨM ==================
function filterProducts() {
    const keyword = searchInput.value.toLowerCase(); // từ khóa tìm kiếm
    const brand = brandFilter.value; // hãng chọn
    const price = priceFilter.value; // giá chọn
    const storage = storageFilter.value; // dung lượng chọn
    const battery = batteryFilter.value; // pin chọn
    const minYear = parseInt(yearMin.value) || null; // năm SX từ
    const maxYear = parseInt(yearMax.value) || null; // năm SX đến
    const latest = latestFilter.checked; // có bật "sản phẩm mới nhất" không

    // Lọc theo từ khóa
    let filtered = products.filter(p =>
        p.name.toLowerCase().includes(keyword)
    );

    // Lọc theo hãng
    if (brand) filtered = filtered.filter(p => p.brand === brand);

    // Lọc theo giá
    if (price === "duoi-10000") filtered = filtered.filter(p => p.price < 10000);
    else if (price === "10000-20000") filtered = filtered.filter(p => p.price >= 10000 && p.price <= 20000);
    else if (price === "tren-20000") filtered = filtered.filter(p => p.price > 20000);

    // Lọc theo dung lượng
    if (storage) filtered = filtered.filter(p => p.storage === storage);

    // Lọc theo pin
    if (battery === "duoi-4000") filtered = filtered.filter(p => p.battery < 4000);
    else if (battery === "4000-5000") filtered = filtered.filter(p => p.battery >= 4000 && p.battery <= 5000);
    else if (battery === "tren-5000") filtered = filtered.filter(p => p.battery > 5000);

    // Lọc theo năm SX
    if (minYear) filtered = filtered.filter(p => p.year >= minYear);
    if (maxYear) filtered = filtered.filter(p => p.year <= maxYear);

    // Nếu bật "sản phẩm mới nhất" -> chỉ lấy sản phẩm có năm SX lớn nhất
    if (latest) {
        const maxYear = Math.max(...products.map(p => p.year));
        filtered = filtered.filter(p => p.year === maxYear);
    }

    // Hiển thị kết quả cuối cùng
    displayProducts(filtered);
}

// ================== GẮN SỰ KIỆN VÀO CÁC Ô LỌC ==================
searchInput.addEventListener("input", filterProducts);
brandFilter.addEventListener("change", filterProducts);
priceFilter.addEventListener("change", filterProducts);
storageFilter.addEventListener("change", filterProducts);
batteryFilter.addEventListener("change", filterProducts);
yearMin.addEventListener("input", filterProducts);
yearMax.addEventListener("input", filterProducts);
latestFilter.addEventListener("change", filterProducts);

// ================== HIỂN THỊ TOÀN BỘ SẢN PHẨM LÚC BAN ĐẦU ==================
displayProducts(products);
// Cập nhật số lượng giỏ khi vừa load trang
updateCartCount();