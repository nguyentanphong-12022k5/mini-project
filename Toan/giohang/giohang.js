// ================== LẤY GIỎ HÀNG TỪ LOCALSTORAGE ==================
// Nếu chưa có thì để mảng rỗng
let cart = JSON.parse(localStorage.getItem("cart")) || [];

// Lấy thẻ div chứa giỏ hàng và tổng tiền
const cartContainer = document.getElementById("cartContainer");
const totalPriceEl = document.getElementById("totalPrice");
const checkoutBtn = document.getElementById("checkoutBtn");

// ================== HÀM HIỂN THỊ GIỎ HÀNG ==================
function renderCart() {
    cartContainer.innerHTML = "";

    if (cart.length === 0) {
        cartContainer.innerHTML = "<p>Giỏ hàng đang trống!</p>";
        totalPriceEl.textContent = "0";
        return;
    }

    let total = 0;

    cart.forEach((item, index) => {
        const div = document.createElement("div");
        div.className = "cart-item";

        // Tính tổng tiền theo số lượng
        let itemTotal = item.price * item.quantity;
        total += itemTotal;

        div.innerHTML = `
      <img src="${item.img}" alt="${item.name}">
      <h4>${item.name}</h4>
      <p>${item.price.toLocaleString()} VNĐ</p>
      <input type="number" min="1" value="${item.quantity}" data-index="${index}">
      <p><b>${itemTotal.toLocaleString()} VNĐ</b></p>
      <button data-index="${index}" class="removeBtn">❌</button>
    `;

        cartContainer.appendChild(div);
    });

    // Cập nhật tổng tiền
    totalPriceEl.textContent = total.toLocaleString();

    // Gắn sự kiện xóa
    document.querySelectorAll(".removeBtn").forEach(btn => {
        btn.addEventListener("click", e => {
            let i = e.target.dataset.index;
            cart.splice(i, 1); // xóa sản phẩm
            saveCart();
            renderCart();
        });
    });

    // Gắn sự kiện thay đổi số lượng
    document.querySelectorAll("input[type='number']").forEach(input => {
        input.addEventListener("change", e => {
            let i = e.target.dataset.index;
            cart[i].quantity = parseInt(e.target.value);
            saveCart();
            renderCart();
        });
    });
}

// ================== LƯU GIỎ HÀNG VÀO LOCALSTORAGE ==================
function saveCart() {
    localStorage.setItem("cart", JSON.stringify(cart));
}

// ================== THANH TOÁN ==================
checkoutBtn.addEventListener("click", () => {
    if (cart.length === 0) {
        alert("Giỏ hàng trống, không thể thanh toán!");
        return;
    }

    const paymentMethod = document.getElementById("payment").value;
    alert("Bạn đã chọn thanh toán bằng: " + paymentMethod + "\nTổng tiền: " + totalPriceEl.textContent + " VNĐ");

    // Xóa giỏ hàng sau khi thanh toán
    cart = [];
    saveCart();
    renderCart();
});

// ================== HIỂN THỊ BAN ĐẦU ==================
renderCart();