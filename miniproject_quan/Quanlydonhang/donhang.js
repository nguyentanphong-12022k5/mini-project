document.addEventListener("DOMContentLoaded", () => {
  const ordersContainer = document.getElementById("orders-container");

  fetch("http://localhost:3000/api/orders")
    .then(response => response.json())
    .then(data => {
      if (data.length === 0) {
        ordersContainer.innerHTML = "<p>Chưa có đơn hàng</p>";
      } else {
        let table = `
          <table>
            <thead>
              <tr>
                <th>Mã đơn</th>
                <th>Ngày đặt</th>
                <th>Tổng tiền</th>
                <th>Trạng thái</th>
                <th>Thao tác</th>
              </tr>
            </thead>
            <tbody>
        `;
        data.forEach(order => {
          table += `
            <tr>
              <td>${order.id}</td>
              <td>${order.date}</td>
              <td>${order.total.toLocaleString()}đ</td>
              <td class="status ${order.status}">${order.status}</td>
              <td>
                <button onclick="viewOrder('${order.id}')">Xem</button>
                <button onclick="cancelOrder('${order.id}')">Hủy</button>
              </td>
            </tr>
          `;
        });
        table += "</tbody></table>";
        ordersContainer.innerHTML = table;
      }
    })
    .catch(err => {
      ordersContainer.innerHTML = "<p>Lỗi khi tải dữ liệu</p>";
    });
});

// Hàm xem chi tiết
function viewOrder(id) {
  alert("Xem chi tiết đơn hàng: " + id);
}

// Hàm hủy đơn hàng
function cancelOrder(id) {
  if (confirm("Bạn có chắc muốn hủy đơn hàng " + id + " không?")) {
    fetch(`http://localhost:3000/api/orders/${id}/cancel`, {
      method: "PUT"
    })
      .then(res => res.json())
      .then(msg => {
        alert(msg.message);
        location.reload(); // Refresh lại danh sách
      })
      .catch(err => alert("Lỗi khi hủy đơn hàng"));
  }
}
