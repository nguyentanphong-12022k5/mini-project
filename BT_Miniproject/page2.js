// Gán sự kiện cho nút "Thêm vào giỏ"
document.querySelector(".btn-cart").addEventListener("click", () => {
    const productId = "p1"; // Ở đây demo 1 sp -> bạn thay bằng id thực từ backend
    const color = document.querySelector(".color.active").dataset.color;
    const storage = document.querySelector(".storage.active").dataset.storage;

    // Lấy tên hiển thị của màu
    const colorName = document.querySelector(`.color[data-color="${color}"]`).textContent;

    // Lấy giá hiện tại từ DOM
    const priceText = document.getElementById("price").textContent.replace(/\D/g, "");
    const finalPrice = parseInt(priceText);

    // Tạo đối tượng item
    const item = {
        _id: `${productId}-${color}-${storage}`, // key duy nhất cho biến thể
        name: `iPhone 15 Pro Max - ${colorName} - ${storage}GB`,
        price: finalPrice,
        image: document.getElementById("product-img").src
    };

    // Thêm vào giỏ sử dụng hàm có sẵn
    state.cart[item._id] = state.cart[item._id] || { item, qty: 0 };
    state.cart[item._id].qty++;
    updateCartUI();
    renderCartList();

    alert("Đã thêm vào giỏ: " + item.name);
});