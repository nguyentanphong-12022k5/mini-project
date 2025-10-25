// document.addEventListener("DOMContentLoaded", () => {
//   const API_URL = "http://localhost:5000/api/products";

//   const addProductBtn = document.getElementById("addProduct");
//   const productTableBody = document.getElementById("productTableBody");

//   // Input
//   const idInput = document.getElementById("productId");
//   const nameInput = document.getElementById("productName");
//   const baseImageInput = document.getElementById("baseImage");
//   const ratingInput = document.getElementById("rating");
//   const reviewCountInput = document.getElementById("reviewCount");
//   const colorKeyInput = document.getElementById("colorKey");
//   const colorLabelInput = document.getElementById("colorLabel");
//   const colorImageInput = document.getElementById("colorImage");
//   const storageCapacityInput = document.getElementById("storageCapacity");
//   const storagePriceInput = document.getElementById("storagePrice");
//   const storageOldPriceInput = document.getElementById("storageOldPrice");
//   const storageDiscountInput = document.getElementById("storageDiscount");

//   let products = [];

//   // 🟢 Load sản phẩm
//   async function loadProducts() {
//     try {
//       const res = await fetch(API_URL);
//       products = await res.json();
//       renderProducts();
//     } catch (err) {
//       console.error("❌ Lỗi tải sản phẩm:", err);
//     }
//   }

//   // 🟢 Hiển thị danh sách
//   function renderProducts() {
//     productTableBody.innerHTML = "";
//     products.forEach(p => {
//       const row = document.createElement("tr");
//       row.innerHTML = `
//         <td>${p.name}</td>
//         <td>${p.storages?.[0]?.price || "N/A"}</td>
//         <td>${p.colors?.[0]?.label || "-"}</td>
//         <td>${p.rating || "0"}</td>
//         <td>
//           <button class="btn btn-edit" data-id="${p._id}">✏️ Sửa</button>
//           <button class="btn btn-delete" data-id="${p._id}">🗑️ Xóa</button>
//         </td>
//       `;
//       productTableBody.appendChild(row);
//     });

//     document.querySelectorAll(".btn-delete").forEach(btn =>
//       btn.addEventListener("click", () => deleteProduct(btn.dataset.id))
//     );
//     document.querySelectorAll(".btn-edit").forEach(btn =>
//       btn.addEventListener("click", () => startEdit(btn.dataset.id))
//     );
//   }

//   // 🟢 Bắt đầu sửa — đổ dữ liệu vào form
//   function startEdit(id) {
//     const product = products.find(p => p._id === id);
//     if (!product) return;

//     idInput.value = product._id;
//     nameInput.value = product.name;
//     baseImageInput.value = product.baseImage;
//     ratingInput.value = product.rating || 0;
//     reviewCountInput.value = product.reviewCount || 0;

//     const color = product.colors?.[0] || {};
//     colorKeyInput.value = color.key || "";
//     colorLabelInput.value = color.label || "";
//     colorImageInput.value = color.image || "";

//     const storage = product.storages?.[0] || {};
//     storageCapacityInput.value = storage.capacity || "";
//     storagePriceInput.value = storage.price?.replace("đ", "") || "";
//     storageOldPriceInput.value = storage.oldPrice || "";
//     storageDiscountInput.value = storage.discount || "";

//     addProductBtn.textContent = "💾 Lưu thay đổi";
//     addProductBtn.classList.add("editing");
//   }

//   // 🟢 Lưu hoặc thêm mới
//   addProductBtn.addEventListener("click", async e => {
//     e.preventDefault();

//     const id = idInput.value;
//     const name = nameInput.value.trim();
//     const baseImage = baseImageInput.value.trim();
//     const rating = parseFloat(ratingInput.value) || 0;
//     const reviewCount = parseInt(reviewCountInput.value) || 0;
//     const colorKey = colorKeyInput.value.trim();
//     const colorLabel = colorLabelInput.value.trim();
//     const colorImage = colorImageInput.value.trim();
//     const storageCapacity = parseInt(storageCapacityInput.value) || 128;
//     const storagePrice = storagePriceInput.value.trim();
//     const storageOldPrice = storageOldPriceInput.value.trim();
//     const storageDiscount = storageDiscountInput.value.trim();

//     if (!name || !baseImage || !storagePrice) {
//       return alert("⚠️ Vui lòng nhập đủ thông tin!");
//     }

//     const productData = {
//         name,
//         baseImage,
//         isFeatured: false,
//         isOnSale: false,
//         rating,
//         reviewCount,
//         colors: [
//             { key: colorKey || "default", label: colorLabel || "Mặc định", image: colorImage || baseImage }
//         ],
//         storages // ✅ nhiều dung lượng
//         };

//     try {
//       let res;
//       if (addProductBtn.classList.contains("editing")) {
//         // 🟡 Sửa sản phẩm
//         res = await fetch(`${API_URL}/${id}`, {
//           method: "PUT",
//           headers: { "Content-Type": "application/json" },
//           body: JSON.stringify(productData)
//         });
//         const updated = await res.json();
//         const idx = products.findIndex(p => p._id === id);
//         if (idx !== -1) products[idx] = updated;
//         alert("✅ Đã cập nhật sản phẩm!");
//       } else {
//         // 🟢 Thêm sản phẩm mới
//         res = await fetch(API_URL, {
//           method: "POST",
//           headers: { "Content-Type": "application/json" },
//           body: JSON.stringify(productData)
//         });
//         const saved = await res.json();
//         products.push(saved);
//         alert("✅ Đã thêm sản phẩm mới!");
//       }

//       renderProducts();
//       resetForm();
//     } catch (err) {
//       console.error("❌ Lỗi thêm/sửa sản phẩm:", err);
//     }
//   });

//   // 🟢 Xóa
//   async function deleteProduct(id) {
//     if (!confirm("Bạn có chắc muốn xóa sản phẩm này không?")) return;
//     try {
//       const res = await fetch(`${API_URL}/${id}`, { method: "DELETE" });
//       if (res.ok) {
//         products = products.filter(p => p._id !== id);
//         renderProducts();
//         alert("🗑️ Đã xóa sản phẩm!");
//       } else {
//         alert("❌ Xóa thất bại!");
//       }
//     } catch (err) {
//       console.error("❌ Lỗi xóa:", err);
//     }
//   }

//   // 🟢 Reset form
//   function resetForm() {
//     document.getElementById("productForm").reset();
//     idInput.value = "";
//     addProductBtn.textContent = "Thêm sản phẩm";
//     addProductBtn.classList.remove("editing");
//   }

//   loadProducts();
// });
document.addEventListener("DOMContentLoaded", () => {
  const API_URL = "http://localhost:5000/api/products";

  const addProductBtn = document.getElementById("addProduct");
  const productTableBody = document.getElementById("productTableBody");

  // 🟡 Các ô nhập liệu
  const idInput = document.getElementById("productId");
  const nameInput = document.getElementById("productName");
  const baseImageInput = document.getElementById("baseImage");
  const ratingInput = document.getElementById("rating");
  const reviewCountInput = document.getElementById("reviewCount");
  const colorKeyInput = document.getElementById("colorKey");
  const colorLabelInput = document.getElementById("colorLabel");
  const colorImageInput = document.getElementById("colorImage");
  const storageCapacityInput = document.getElementById("storageCapacity");
  const storagePriceInput = document.getElementById("storagePrice");
  const storageOldPriceInput = document.getElementById("storageOldPrice");
  const storageDiscountInput = document.getElementById("storageDiscount");
  const descInput = document.getElementById("productDesc");

  let products = [];

  // 🟢 Load sản phẩm
  async function loadProducts() {
    try {
      const res = await fetch(API_URL);
      products = await res.json();
      renderProducts();
    } catch (err) {
      console.error("❌ Lỗi tải sản phẩm:", err);
    }
  }

  // 🟢 Hiển thị danh sách
  function renderProducts() {
    productTableBody.innerHTML = "";
    products.forEach(p => {
      const row = document.createElement("tr");
      row.innerHTML = `
        <td>${p.name}</td>
        <td>${p.storages?.[0]?.price || "N/A"}</td>
        <td>${p.colors?.[0]?.label || "-"}</td>
        <td>${p.rating || "0"}</td>
        <td>
          <button class="btn btn-edit" data-id="${p._id}">✏️ Sửa</button>
          <button class="btn btn-delete" data-id="${p._id}">🗑️ Xóa</button>
        </td>
      `;
      productTableBody.appendChild(row);
    });

    document.querySelectorAll(".btn-delete").forEach(btn =>
      btn.addEventListener("click", () => deleteProduct(btn.dataset.id))
    );
    document.querySelectorAll(".btn-edit").forEach(btn =>
      btn.addEventListener("click", () => startEdit(btn.dataset.id))
    );
  }

  // 🟡 Đổ dữ liệu vào form khi sửa
  function startEdit(id) {
    const product = products.find(p => p._id === id);
    if (!product) return;

    idInput.value = product._id;
    nameInput.value = product.name;
    baseImageInput.value = product.baseImage;
    ratingInput.value = product.rating || 0;
    reviewCountInput.value = product.reviewCount || 0;
    descInput.value = product.description || "";

    const color = product.colors?.[0] || {};
    colorKeyInput.value = color.key || "";
    colorLabelInput.value = color.label || "";
    colorImageInput.value = color.image || "";

    const storage = product.storages?.[0] || {};
    storageCapacityInput.value = product.storages.map(s => s.capacity).join(",");
    storagePriceInput.value = product.storages.map(s => s.price.replace("đ", "")).join(",");

    storageOldPriceInput.value = storage.oldPrice || "";
    storageDiscountInput.value = storage.discount || "";

    addProductBtn.textContent = "💾 Lưu thay đổi";
    addProductBtn.classList.add("editing");
  }

  // 🟢 Thêm hoặc sửa sản phẩm
  addProductBtn.addEventListener("click", async e => {
    e.preventDefault();

    const name = nameInput.value.trim();
    const baseImage = baseImageInput.value.trim();
    const rating = parseFloat(ratingInput.value) || 0;
    const reviewCount = parseInt(reviewCountInput.value) || 0;
    const desc = descInput.value.trim();

    if (!name || !baseImage) return alert("⚠️ Vui lòng nhập đủ thông tin!");

    // ✅ Xử lý nhiều dung lượng / giá
    const capacities = storageCapacityInput.value.split(",").map(x => x.trim());
    const prices = storagePriceInput.value.split(",").map(x => x.trim());
    const storages = capacities.map((c, i) => ({
      capacity: parseInt(c) || 128,
      price: prices[i] ? prices[i] + "đ" : "",
      oldPrice: storageOldPriceInput.value || "",
      discount: storageDiscountInput.value || ""
    }));

    const productData = {
      name,
      baseImage,
      isFeatured: false,
      isOnSale: false,
      rating,
      reviewCount,
      description: desc,
      colors: [
        { key: colorKeyInput.value || "default", label: colorLabelInput.value || "Mặc định", image: colorImageInput.value || baseImage }
      ],
      storages
    };

    try {
      let res;
      if (addProductBtn.classList.contains("editing")) {
        const id = idInput.value;
        res = await fetch(`${API_URL}/${id}`, {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(productData)
        });
        alert("✅ Đã cập nhật sản phẩm!");
      } else {
        res = await fetch(API_URL, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(productData)
        });
        alert("✅ Đã thêm sản phẩm mới!");
      }

      await loadProducts();
      resetForm();
    } catch (err) {
      console.error("❌ Lỗi thêm/sửa sản phẩm:", err);
    }
  });

  // 🗑️ Xóa sản phẩm
  async function deleteProduct(id) {
    if (!confirm("Bạn có chắc muốn xóa sản phẩm này không?")) return;
    try {
      const res = await fetch(`${API_URL}/${id}`, { method: "DELETE" });
      if (res.ok) {
        products = products.filter(p => p._id !== id);
        renderProducts();
        alert("🗑️ Đã xóa sản phẩm!");
      }
    } catch (err) {
      console.error("❌ Lỗi xóa:", err);
    }
  }

  // 🧹 Reset form
  function resetForm() {
    document.getElementById("productForm").reset();
    idInput.value = "";
    addProductBtn.textContent = "Thêm sản phẩm";
    addProductBtn.classList.remove("editing");
  }

  loadProducts();
});
