// // ================================
// // 🟩 THANHTOAN.JS - XỬ LÝ THANH TOÁN
// // ================================
// document.addEventListener("DOMContentLoaded", () => {
//   const items = JSON.parse(localStorage.getItem("selectedItems")) || [];
//   const list = document.getElementById("checkoutList");
//   const totalPriceEl = document.getElementById("totalPrice");

//   // Nếu không có sản phẩm
//   if (items.length === 0) {
//     list.innerHTML = "<p>⚠️ Không có sản phẩm nào để thanh toán!</p>";
//     return;
//   }

//   // Hiển thị sản phẩm
//   let total = 0;
//   items.forEach((p) => {
//     const priceNum = parseInt(p.price.toString().replace(/[^\d]/g, "")) || 0;
//     const sum = priceNum * p.quantity;
//     total += sum;

//     const itemDiv = document.createElement("div");
//     itemDiv.className = "checkout-item";
//     itemDiv.innerHTML = `
//       <img src="${p.img}" width="70">
//       <div>
//         <p>${p.name}</p>
//         <small>${p.quantity} x ${priceNum.toLocaleString("vi-VN")}₫</small>
//       </div>
//       <strong>${sum.toLocaleString("vi-VN")}₫</strong>
//     `;
//     list.appendChild(itemDiv);
//   });

//   totalPriceEl.textContent = total.toLocaleString("vi-VN") + "₫";

//   // ================================
//   // Hiển thị QR khi chọn ví điện tử
//   // ================================
//   const paymentSelect = document.getElementById("payment");
//   const qrSection = document.getElementById("qrSection");
//   const qrImage = document.getElementById("qrImage");
//   const qrInfo = document.getElementById("qrInfo");

//   paymentSelect.addEventListener("change", () => {
//     if (paymentSelect.value === "momo" || paymentSelect.value === "zalopay") {
//       qrSection.style.display = "block";
//       qrImage.src = `../thanhtoan/${paymentSelect.value}.png`; // đặt QR tương ứng
//       qrInfo.textContent = "Quét mã QR bằng ứng dụng " + paymentSelect.options[paymentSelect.selectedIndex].text;
//     } else {
//       qrSection.style.display = "none";
//     }
//   });

//   // ================================
//   // Xác nhận thanh toán
//   // ================================
//   document.getElementById("confirmBtn").addEventListener("click", () => {
//     const name = document.getElementById("receiverName").value.trim();
//     const phone = document.getElementById("phone").value.trim();
//     const address = document.getElementById("address").value.trim();
//     const payment = paymentSelect.value;

//     if (!name || !phone || !address) {
//       alert("⚠️ Vui lòng nhập đầy đủ thông tin giao hàng!");
//       return;
//     }

//     const newOrder = {
//       id: "DH" + Date.now(),
//       receiver: name,
//       phone,
//       address,
//       paymentMethod: payment,
//       total: total.toLocaleString("vi-VN") + "₫",
//       status: "Đã thanh toán",
//       date: new Date().toLocaleString("vi-VN"),
//       products: items.map((p) => ({
//         id: p.id,
//         name: p.name,
//         quantity: p.quantity,
//         price: p.price,
//         img: p.img,
//       })),
//     };

//     // Lưu vào LocalStorage
//     const existingOrders = JSON.parse(localStorage.getItem("orders")) || [];
//     existingOrders.push(newOrder);
//     localStorage.setItem("orders", JSON.stringify(existingOrders));

//     alert("✅ Đặt hàng thành công!");
//     localStorage.removeItem("selectedItems");
//     window.location.href = "../miniproject_quan/Quanlydonhang/donhang.html";
//   });
// });
document.addEventListener("DOMContentLoaded", () => {
  const items = JSON.parse(localStorage.getItem("selectedItems")) || [];
  const list = document.getElementById("checkoutList");
  const totalPriceEl = document.getElementById("totalPrice");
  if (!items.length) {
    list.innerHTML = "<p>⚠️ Không có sản phẩm nào để thanh toán!</p>";
    return;
  }

  let total = 0;
  items.forEach((p) => {
    const price = parseInt(p.price) || 0;
    const sum = price * p.quantity;
    total += sum;
    const div = document.createElement("div");
    div.className = "checkout-item";
    div.innerHTML = `
      <img src="${p.img}" width="70">
      <div>
        <p>${p.name}</p>
        <small>${p.quantity} x ${price.toLocaleString("vi-VN")}₫</small>
      </div>
      <strong>${sum.toLocaleString("vi-VN")}₫</strong>
    `;
    list.appendChild(div);
  });
  totalPriceEl.textContent = total.toLocaleString("vi-VN") + "₫";

  const paymentSelect = document.getElementById("payment");
  const qrSection = document.getElementById("qrSection");
  const qrImage = document.getElementById("qrImage");
  const qrInfo = document.getElementById("qrInfo");

  paymentSelect.addEventListener("change", () => {
    if (["momo", "zalopay"].includes(paymentSelect.value)) {
      qrSection.style.display = "block";
      qrImage.src = `../thanhtoan/${paymentSelect.value}.png`;
      qrInfo.textContent =
        "Quét mã QR bằng ứng dụng " +
        paymentSelect.options[paymentSelect.selectedIndex].text;
    } else qrSection.style.display = "none";
  });

  document.getElementById("confirmBtn").addEventListener("click", () => {
    const name = document.getElementById("receiverName").value.trim();
    const phone = document.getElementById("phone").value.trim();
    const address = document.getElementById("address").value.trim();
    if (!name || !phone || !address)
      return alert("⚠️ Vui lòng nhập đầy đủ thông tin giao hàng!");

    // Sau khi thanh toán xong
    const newOrder = {
      id: "DH" + Date.now(),
      date: new Date().toLocaleDateString("vi-VN"),
      receiver: customerName,
      address: customerAddress,
      phone: customerPhone,
      products: checkoutList,
      total: calcTotal(checkoutList),
      status: "Đã thanh toán",
    };

    // Cập nhật orders
    const orders = JSON.parse(localStorage.getItem("orders")) || [];
    orders.push(newOrder);
    localStorage.setItem("orders", JSON.stringify(orders));

    // Cập nhật purchaseHistory
    const history = JSON.parse(localStorage.getItem("purchaseHistory")) || [];
    history.push(newOrder);
    localStorage.setItem("purchaseHistory", JSON.stringify(history));

    // Xóa giỏ hàng
    localStorage.removeItem("selectedItems");

    alert("✅ Đặt hàng thành công!");
    localStorage.removeItem("selectedItems");
    window.location.href = "../miniproject_quan/Quanlydonhang/donhang.html";
  });
});
