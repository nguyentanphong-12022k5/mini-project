// // Gán sự kiện cho nút "Thêm vào giỏ"
// document.querySelector(".btn-cart").addEventListener("click", () => {
//     const productId = "p1"; // Ở đây demo 1 sp -> bạn thay bằng id thực từ backend
//     const color = document.querySelector(".color.active").dataset.color;
//     const storage = document.querySelector(".storage.active").dataset.storage;

//     // Lấy tên hiển thị của màu
//     const colorName = document.querySelector(`.color[data-color="${color}"]`).textContent;

//     // Lấy giá hiện tại từ DOM
//     const priceText = document.getElementById("price").textContent.replace(/\D/g, "");
//     const finalPrice = parseInt(priceText);

//     // Tạo đối tượng item
//     const item = {
//         _id: `${productId}-${color}-${storage}`, // key duy nhất cho biến thể
//         name: `iPhone 15 Pro Max - ${colorName} - ${storage}GB`,
//         price: finalPrice,
//         image: document.getElementById("product-img").src
//     };

//     // Thêm vào giỏ sử dụng hàm có sẵn
//     state.cart[item._id] = state.cart[item._id] || { item, qty: 0 };
//     state.cart[item._id].qty++;
//     updateCartUI();
//     renderCartList();

//     alert("Đã thêm vào giỏ: " + item.name);
// });

// function renderProducts(list) {
//     const grid = document.getElementById('productGrid');
//     grid.innerHTML = '';
//     list.forEach(p => {
//         const card = document.createElement('div');
//         card.className = 'card';
//         card.innerHTML = `
//          <a href="../BT_Miniproject/page2.html"><div class="thumb"><img src="${p.image}" alt="${p.name}" style="max-width:60%"></div></a> 
//           <h3 class="title">${p.name}</h3>
//           <div class="price">${fmt(p.price)}</div>
//           <div class="meta">
//             <button class="btn" data-id="${p._id}">Mua ngay</button>
//             <button class="btn secondary" data-wish="${p._id}">Yêu thích</button>
//           </div>`;
//         grid.appendChild(card);
//     });
//     document.getElementById('shownCount').textContent = list.length;
// }
// // --- JavaScript giữ nguyên ---
// const images = {
//     blue: "titan-Xanh.jpg",
//     white: "titan-trang.jpg",
//     black: "titan-den.jpg",
//     natural: "titan-tunhien.jpg"
// };

// const colors = ["blue", "white", "black", "natural"];
// let currentColorIndex = 0;

// const prices = {
//     256: {
//         price: "31.990.000đ",
//         old: "34.990.000đ",
//         discount: "-9%"
//     },
//     512: {
//         price: "36.990.000đ",
//         old: "39.990.000đ",
//         discount: "-7%"
//     },
//     1024: {
//         price: "41.990.000đ",
//         old: "44.990.000đ",
//         discount: "-6%"
//     }
// };

// const storages = ["256", "512", "1024"];
// let currentStorageIndex = 0;

// const productImg = document.getElementById("product-img");
// const priceEl = document.getElementById("price");
// const oldPriceEl = document.getElementById("old-price");
// const discountEl = document.getElementById("discount");
// const productTitle = document.getElementById("product-title");

// function updateProduct() {
//     const color = colors[currentColorIndex];
//     const storage = storages[currentStorageIndex];

//     productImg.src = images[color];
//     priceEl.textContent = prices[storage].price;
//     oldPriceEl.textContent = prices[storage].old;
//     discountEl.textContent = prices[storage].discount;

//     const colorName = document.querySelector(`.color[data-color="${color}"]`).textContent;
//     productTitle.textContent = `iPhone 15 Pro Max - ${colorName} - ${storage}GB`;

//     document.querySelectorAll(".color").forEach(el => el.classList.remove("active"));
//     document.querySelectorAll(".storage").forEach(el => el.classList.remove("active"));
//     document.querySelector(`.color[data-color="${color}"]`).classList.add("active");
//     document.querySelector(`.storage[data-storage="${storage}"]`).classList.add("active");
// }

// document.querySelectorAll(".color").forEach(c => {
//     c.addEventListener("click", () => {
//         currentColorIndex = colors.indexOf(c.dataset.color);
//         updateProduct();
//     });
// });

// document.querySelectorAll(".storage").forEach(s => {
//     s.addEventListener("click", () => {
//         currentStorageIndex = storages.indexOf(s.dataset.storage);
//         updateProduct();
//     });
// });

// document.getElementById("next-color").addEventListener("click", () => {
//     currentColorIndex = (currentColorIndex + 1) % colors.length;
//     updateProduct();
// });

// document.getElementById("prev-color").addEventListener("click", () => {
//     currentColorIndex = (currentColorIndex - 1 + colors.length) % colors.length;
//     updateProduct();
// });

// document.getElementById("next-storage").addEventListener("click", () => {
//     currentStorageIndex = (currentStorageIndex + 1) % storages.length;
//     updateProduct();
// });

// document.getElementById("prev-storage").addEventListener("click", () => {
//     currentStorageIndex = (currentStorageIndex - 1 + storages.length) % storages.length;
//     updateProduct();
// });

// ================================
// 🟧 LẤY THÔNG TIN SẢN PHẨM CHI TIẾT
// ================================

// // ================================
// // 🟧 LẤY CHI TIẾT SẢN PHẨM
// // ================================
// const fmt = n => n.toString().replace(/\B(?=(\d{3})+(?!\d))/g, '.') + '₫';
// const params = new URLSearchParams(window.location.search);
// const productId = params.get("id");

// if (!productId) {
//     alert("❌ Không tìm thấy ID sản phẩm!");
// } else {
//     loadProductDetail(productId);
// }

// async function loadProductDetail(id) {
//     try {
//         const res = await fetch(`http://localhost:5000/api/products/${id}`);
//         if (!res.ok) throw new Error("Không thể tải chi tiết sản phẩm");
//         const product = await res.json();
//         renderProduct(product);
//     } catch (err) {
//         console.error(err);
//         alert("Lỗi tải chi tiết sản phẩm!");
//     }
// }

// // ================================
// // 🟧 HIỂN THỊ CHI TIẾT LÊN TRANG
// // ================================
// function renderProduct(p) {
//     document.getElementById("product-title").textContent = p.name;
//     document.getElementById("product-img").src = p.baseImage;

//     // --- ⭐ Hiển thị đánh giá ---
//     const ratingValue = p.rating || 4.8;
//     const reviewCount = p.reviewCount || 520;
//     const stars = "⭐".repeat(Math.round(ratingValue));
//     document.querySelector(".rating").textContent =
//         `${stars} (${ratingValue}/5 - ${reviewCount} đánh giá)`;

//     // --- Hiển thị giá ---
//     const firstStorage = p.storages?.[0];
//     if (firstStorage) {
//         const price = parseInt(firstStorage.price.replace(/\D/g, "")) || 0;
//         const oldPrice = parseInt(firstStorage.oldPrice?.replace(/\D/g, "")) || 0;
//         const discount = firstStorage.discount || "";

//         document.getElementById("price").textContent = fmt(price);
//         document.getElementById("old-price").textContent = oldPrice ? fmt(oldPrice) : "";
//         document.getElementById("discount").textContent = discount ? `-${discount}` : "";
//     }

//     // --- Màu sắc ---
//     const colorContainer = document.querySelector(".options strong + br").parentElement;
//     colorContainer.innerHTML = `<strong>Màu sắc:</strong><br>` +
//         p.colors.map((c, i) =>
//             `<span class="color ${i === 0 ? "active" : ""}" data-color="${c.key}">
//                 ${c.label}
//             </span>`
//         ).join("");

//     // --- Dung lượng ---
//     const storageContainer = document.querySelectorAll(".options")[1];
//     storageContainer.innerHTML = `<strong>Dung lượng:</strong><br>` +
//         p.storages.map((s, i) =>
//             `<span class="storage ${i === 0 ? "active" : ""}" data-storage="${s.capacity}">
//                 ${s.capacity}GB
//             </span>`
//         ).join("");

//     setupOptionEvents();
// }

// // ================================
// // 🟧 CHỌN MÀU & DUNG LƯỢNG
// // ================================
// function setupOptionEvents() {
//     document.querySelectorAll(".color").forEach(el => {
//         el.addEventListener("click", () => {
//             document.querySelectorAll(".color").forEach(c => c.classList.remove("active"));
//             el.classList.add("active");
//         });
//     });

//     document.querySelectorAll(".storage").forEach(el => {
//         el.addEventListener("click", () => {
//             document.querySelectorAll(".storage").forEach(s => s.classList.remove("active"));
//             el.classList.add("active");
//         });
//     });
// }

// // ================================
// // 🟧 GIỎ HÀNG
// // ================================
// document.getElementById("addToCartBtn").addEventListener("click", () => {
//     alert("🛒 Đã thêm sản phẩm vào giỏ hàng (demo)");
// });

// document.querySelector(".btn-buy").addEventListener("click", () => {
//     alert("💳 Thanh toán ngay (demo)");
// });
// ================================
// ================================
// 🟧 LẤY CHI TIẾT SẢN PHẨM THEO ID
// ================================
const params = new URLSearchParams(window.location.search);
const productId = params.get("id");

if (!productId) {
  alert("❌ Không tìm thấy ID sản phẩm!");
} else {
  loadProductDetail(productId);
}

// ================================
// 🟧 HÀM TẢI CHI TIẾT SẢN PHẨM TỪ BACKEND
// ================================
async function loadProductDetail(id) {
  try {
    const res = await fetch(`http://localhost:5000/api/products/${id}`);
    if (!res.ok) throw new Error("Không thể tải chi tiết sản phẩm");
    const product = await res.json();
    renderProduct(product);
  } catch (err) {
    console.error("❌ Lỗi tải sản phẩm:", err);
    alert("Không thể tải chi tiết sản phẩm!");
  }
}

// ================================
// 🟧 HIỂN THỊ DỮ LIỆU SẢN PHẨM LÊN TRANG
// ================================
function renderProduct(p) {
  // Tên + ảnh
  document.getElementById("product-title").textContent = p.name;
  document.getElementById("product-img").src = p.baseImage;

  // Đánh giá
  const ratingValue = p.rating || 4.8;
  const reviewCount = p.reviewCount || 520;
  const stars = "⭐".repeat(Math.round(ratingValue));
  document.querySelector(".rating").textContent =
    `${stars} (${ratingValue}/5 - ${reviewCount} đánh giá)`;

  // Màu sắc
  const colorContainer = document.getElementById("colorOptions");
  colorContainer.innerHTML = p.colors
    .map(
      (c, i) =>
        `<span class="color ${i === 0 ? "active" : ""}" 
            data-color="${c.key}">
          ${c.label}
        </span>`
    )
    .join("");

  // Dung lượng (và giá)
  const storageContainer = document.getElementById("storageOptions");
  storageContainer.innerHTML = p.storages
    .map(
      (s, i) =>
        `<span class="storage ${i === 0 ? "active" : ""}" 
            data-storage="${s.capacity}" 
            data-price="${s.price}">
          ${s.capacity}GB
        </span>`
    )
    .join("");

  // Hiển thị giá đầu tiên
  const firstStorage = p.storages[0];
  document.getElementById("price").textContent = firstStorage.price || "";
  document.getElementById("old-price").textContent = firstStorage.oldPrice || "";
  document.getElementById("discount").textContent = firstStorage.discount || "";

  // Cài đặt sự kiện chọn màu & dung lượng
  setupOptionEvents(p);
  setupCartAndBuy(p);
}

// ================================
// 🟧 CHỌN MÀU & DUNG LƯỢNG
// ================================
function setupOptionEvents(product) {
  document.querySelectorAll(".color").forEach((el) => {
    el.addEventListener("click", () => {
      document.querySelectorAll(".color").forEach((c) => c.classList.remove("active"));
      el.classList.add("active");
    });
  });

  document.querySelectorAll(".storage").forEach((el) => {
    el.addEventListener("click", () => {
      document.querySelectorAll(".storage").forEach((s) => s.classList.remove("active"));
      el.classList.add("active");

      // Cập nhật giá tương ứng
      const price = el.dataset.price || "";
      document.getElementById("price").textContent = price;
    });
  });
}

// ================================
// 🟧 XỬ LÝ GIỎ HÀNG & THANH TOÁN
// ================================
function setupCartAndBuy(product) {
  // 🛒 Thêm vào giỏ
  document.getElementById("addToCartBtn").addEventListener("click", () => {
    const colorEl = document.querySelector(".color.active");
    const storageEl = document.querySelector(".storage.active");
    if (!colorEl || !storageEl) return alert("⚠️ Hãy chọn màu và dung lượng!");

    const color = colorEl.textContent.trim();
    const storage = storageEl.dataset.storage;
    const price = storageEl.dataset.price;

    const item = {
      id: `${product._id}-${color}-${storage}`,
      name: `${product.name} - ${color} - ${storage}GB`,
      img: product.baseImage,
      price,
      quantity: 1,
    };

    const cart = JSON.parse(localStorage.getItem("cart")) || [];
    cart.push(item);
    localStorage.setItem("cart", JSON.stringify(cart));

    alert("🛒 Đã thêm vào giỏ hàng!");
  });

  // 💳 Mua ngay
  document.querySelector(".btn-buy").addEventListener("click", () => {
    const colorEl = document.querySelector(".color.active");
    const storageEl = document.querySelector(".storage.active");
    if (!colorEl || !storageEl) return alert("⚠️ Hãy chọn màu và dung lượng!");

    const color = colorEl.textContent.trim();
    const storage = storageEl.dataset.storage;
    const price = storageEl.dataset.price;

    const selectedItem = {
      id: product._id,
      name: `${product.name} - ${color} - ${storage}GB`,
      img: product.baseImage,
      price,
      quantity: 1,
    };

    localStorage.setItem("selectedItems", JSON.stringify([selectedItem]));
    window.location.href = "../miniproject_quan/thanhtoan/thanhtoan.html";
  });
}
