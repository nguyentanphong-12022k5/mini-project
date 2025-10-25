document.addEventListener("DOMContentLoaded", () => {
  const orderTable = document.getElementById("orderTable");
  const orderDetail = document.getElementById("orderDetail");
  const alertMsg = document.getElementById("alertMsg");
  const statsBox = document.getElementById("orderStats");
  const historyTable = document.getElementById("historyTable"); // Bảng lịch sử

  let orders = JSON.parse(localStorage.getItem("orders")) || [];
  let purchaseHistory =
    JSON.parse(localStorage.getItem("purchaseHistory")) || [];

  // ================== HIỂN THỊ DANH SÁCH ĐƠN HÀNG ==================
  function renderOrders() {
    orders = JSON.parse(localStorage.getItem("orders")) || []; // đọc lại
    if (!orders.length) {
      orderTable.innerHTML =
        "<tr><td colspan='6'>Chưa có đơn hàng nào.</td></tr>";
      statsBox.innerHTML = "<p>📊 Chưa có dữ liệu thống kê.</p>";
    } else {
      orderTable.innerHTML = orders
        .map(
          (order) => `
        <tr>
          <td>${order.id}</td>
          <td>${order.receiver}</td>
          <td>${order.total.toLocaleString("vi-VN")}₫</td>
          <td><span class="status ${getStatusClass(order.status)}">${
            order.status
          }</span></td>
          <td>
            <select class="statusSelect" data-id="${order.id}">
              ${["Đã thanh toán", "Đang giao", "Đã giao", "Đã hủy", "Hoàn trả"]
                .map(
                  (s) =>
                    `<option value="${s}" ${
                      s === order.status ? "selected" : ""
                    }>${s}</option>`
                )
                .join("")}
            </select>
          </td>
          <td><button class="view-btn" data-id="${
            order.id
          }" data-type="current">Xem</button></td>
        </tr>
      `
        )
        .join("");
      renderStats();
    }
    attachEventHandlers();
  }

  // ================== HIỂN THỊ LỊCH SỬ MUA SẮM ==================
  function renderHistory() {
    purchaseHistory = JSON.parse(localStorage.getItem("purchaseHistory")) || []; // đọc lại
    if (!purchaseHistory.length) {
      historyTable.innerHTML =
        "<tr><td colspan='5'>Chưa có đơn hàng nào trong lịch sử.</td></tr>";
    } else {
      historyTable.innerHTML = purchaseHistory
        .map(
          (order) => `
        <tr>
          <td>${order.id}</td>
          <td>${order.date}</td>
          <td>${order.total.toLocaleString("vi-VN")}₫</td>
          <td><span class="status ${getStatusClass(order.status)}">${
            order.status
          }</span></td>
          <td><button class="view-btn" data-id="${
            order.id
          }" data-type="history">Xem</button></td>
        </tr>
      `
        )
        .join("");
    }
  }

  // ================== XEM CHI TIẾT ==================
  function viewOrder(id, type = "current") {
    const list = type === "current" ? orders : purchaseHistory;
    const order = list.find((o) => o.id === id);
    if (!order) return;

    document.getElementById("detailId").textContent = order.id;
    document.getElementById("detailReceiver").textContent = order.receiver;
    document.getElementById("detailAddress").textContent = order.address || "";
    document.getElementById("detailPhone").textContent = order.phone || "";
    document.getElementById("detailTotal").textContent =
      order.total.toLocaleString("vi-VN") + "₫";
    document.getElementById("detailStatus").textContent = order.status;
    document.getElementById("detailProducts").innerHTML = order.products
      .map(
        (p) => `
      <div style="display:flex;align-items:center;gap:8px;margin:5px 0;">
        <img src="${
          p.img || ""
        }" width="50" height="50" style="border-radius:5px;">
        <span>${p.name} x${p.quantity}</span>
      </div>
    `
      )
      .join("");

    orderDetail.style.display = "block";
  }

  document.getElementById("closeDetail").addEventListener("click", () => {
    orderDetail.style.display = "none";
  });

  // ================== CẬP NHẬT TRẠNG THÁI ==================
  function updateStatus(id, newStatus) {
    const idx = orders.findIndex((o) => o.id === id);
    if (idx === -1) return;
    orders[idx].status = newStatus;
    localStorage.setItem("orders", JSON.stringify(orders));
    showAlert(`✅ Đơn hàng ${id} đã được cập nhật sang "${newStatus}".`);
    renderOrders();
  }

  // ================== THỐNG KÊ ==================
  function renderStats() {
    const total = orders.length;
    const paid = orders.filter((o) => o.status === "Đã thanh toán").length;
    const shipping = orders.filter((o) => o.status === "Đang giao").length;
    const delivered = orders.filter((o) => o.status === "Đã giao").length;
    const cancelled = orders.filter((o) => o.status === "Đã hủy").length;
    const returned = orders.filter((o) => o.status === "Hoàn trả").length;
    statsBox.innerHTML = `
      <p>📦 Tổng đơn hàng: <b>${total}</b></p>
      <p>💳 Đã thanh toán: <b>${paid}</b></p>
      <p>🚚 Đang giao: <b>${shipping}</b></p>
      <p>✅ Đã giao: <b>${delivered}</b></p>
      <p>❌ Đã hủy: <b>${cancelled}</b></p>
      <p>🔁 Hoàn trả: <b>${returned}</b></p>
    `;
  }

  // ================== TIỆN ÍCH ==================
  function attachEventHandlers() {
    document.querySelectorAll(".view-btn").forEach((btn) => {
      btn.addEventListener("click", () =>
        viewOrder(btn.dataset.id, btn.dataset.type)
      );
    });
    document.querySelectorAll(".statusSelect").forEach((select) => {
      select.addEventListener("change", (e) =>
        updateStatus(select.dataset.id, e.target.value)
      );
    });
  }

  function showAlert(msg) {
    alertMsg.textContent = msg;
    alertMsg.classList.add("show");
    setTimeout(() => alertMsg.classList.remove("show"), 3000);
  }

  function getStatusClass(status) {
    switch (status) {
      case "Đã giao":
        return "completed";
      case "Đang giao":
        return "shipping";
      case "Đã hủy":
        return "cancelled";
      case "Hoàn trả":
        return "returned";
      default:
        return "pending";
    }
  }

  // ================== KHỞI CHẠY ==================
  renderOrders();
  renderHistory();
});
