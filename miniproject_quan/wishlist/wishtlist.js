document.addEventListener("DOMContentLoaded", () => {
  const wishlistContainer = document.getElementById("wishlist-container");

  fetch("http://localhost:3000/api/wishlist")
    .then(response => response.json())
    .then(data => {
      if (data.length === 0) {
        wishlistContainer.innerHTML = "<p>Bạn chưa thêm sản phẩm mong muốn nào</p>";
      } else {
        let html = "";
        data.forEach(product => {
          html += `
            <div class="product-card">
              <img src="${product.image}" alt="${product.name}">
              <div class="product-info">
                <h3>${product.name}</h3>
                <p>Giá: ${product.price.toLocaleString()}đ</p>
              </div>
              <div class="actions">
                <button class="btn-view" onclick="viewProduct('${product.id}')">Xem</button>
                <button class="btn-remove" onclick="removeProduct('${product.id}')">Xóa</button>
              </div>
            </div>
          `;
        });
        wishlistContainer.innerHTML = html;
      }
    })
    .catch(err => {
      wishlistContainer.innerHTML = "<p>Lỗi khi tải dữ liệu</p>";
    });
});

// Xem sản phẩm
function viewProduct(id) {
  alert("Xem chi tiết sản phẩm: " + id);
}

// Xóa sản phẩm (gọi API backend)
function removeProduct(id) {
  if (confirm("Bạn có chắc muốn xóa sản phẩm " + id + " không?")) {
    fetch(`http://localhost:3000/api/wishlist/${id}`, {
      method: "DELETE"
    })
      .then(res => res.json())
      .then(msg => {
        alert(msg.message);
        location.reload();
      })
      .catch(err => alert("Lỗi khi xóa sản phẩm"));
  }
}
