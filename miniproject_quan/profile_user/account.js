// // Xử lý sidebar click
// document.querySelectorAll(".sidebar ul li").forEach(item => {
//     item.addEventListener("click", () => {
//         document.querySelectorAll(".sidebar ul li").forEach(li => li.classList.remove("active"));
//         item.classList.add("active");

//         let modalName = item.getAttribute("data-modal");
//         let section = item.getAttribute("data-section");

//         // Nếu click vào mục hiển thị trang (profile)
//         if (section) {
//             document.getElementById(section).style.display = "block";
//         } else {
//             document.getElementById("profile").style.display = "block";
//         }

//         // Nếu có modal thì mở modal
//         if (modalName) {
//             document.getElementById(modalName + "Modal").style.display = "block";
//         }
//     });
// });

// // Đóng modal khi nhấn nút X
// document.querySelectorAll(".close").forEach(btn => {
//     btn.addEventListener("click", () => {
//         btn.parentElement.parentElement.style.display = "none";
//     });
// });
// window.addEventListener("DOMContentLoaded", () => {
//     const userData = JSON.parse(localStorage.getItem("userData"));

//     if (userData) {
//         document.getElementById("account-name").innerText = userData.username;
//         document.getElementById("account-email").innerText = userData.email;
//         document.getElementById("account-phone").innerText = userData.phone;
//         document.getElementById("account-address").innerText = userData.address;
//         document.getElementById("account-avatar").src = userData.avatar || "https://via.placeholder.com/120";
//     } else {
//         // Nếu chưa có dữ liệu thì quay lại login
//         window.location.href = "/html/login.html";

//     }
// });

// // Đóng modal khi nhấn ngoài
// window.onclick = function(event) {
//     document.querySelectorAll(".modal").forEach(modal => {
//         if (event.target == modal) {
//             modal.style.display = "none";
//         }
//     });
// };
document.addEventListener("DOMContentLoaded", () => {
  // ==== Sidebar & Section & Modal ====
  const sidebarItems = document.querySelectorAll(".sidebar ul li");
  const sections = document.querySelectorAll(".content > section");
  const modals = document.querySelectorAll(".modal");

  // ==== Load user data ====
  const userData = JSON.parse(localStorage.getItem("userData")) || {};
  document.getElementById("account-name").innerText = userData.username || "Chưa có tên";
  document.getElementById("account-email").innerText = userData.email || "Chưa có email";
  document.getElementById("account-phone").innerText = userData.phone || "Chưa có số điện thoại";
  document.getElementById("account-address").innerText = userData.address || "Chưa có địa chỉ";
  document.getElementById("account-avatar").src = userData.avatar || "https://via.placeholder.com/120";

  // ==== Sidebar click ====
  sidebarItems.forEach(item => {
    item.addEventListener("click", () => {
      sidebarItems.forEach(li => li.classList.remove("active"));
      item.classList.add("active");
      sections.forEach(sec => sec.style.display = "none");
      modals.forEach(modal => modal.style.display = "none");

      const sectionName = item.getAttribute("data-section");
      const modalName = item.getAttribute("data-modal");

      if (sectionName) {
        const sec = document.getElementById(sectionName);
        if (sec) sec.style.display = "block";
      }

      if (modalName) {
        const modal = document.getElementById(modalName + "Modal");
        if (modal) modal.style.display = "block";
      }
    });
  });

  // ==== Đóng modal khi nhấn X ====
  document.querySelectorAll(".modal .close").forEach(btn => {
    btn.addEventListener("click", () => {
      btn.closest(".modal").style.display = "none";
    });
  });

  // ==== Đóng modal khi nhấn ngoài ====
  window.addEventListener("click", (event) => {
    modals.forEach(modal => {
      if (event.target === modal) modal.style.display = "none";
    });
  });

  // ==== Hiển thị profile mặc định khi load trang ====
  sections.forEach(sec => sec.style.display = "none");
  const profileSection = document.getElementById("profile");
  if (profileSection) profileSection.style.display = "block";
  sidebarItems.forEach(li => li.classList.remove("active"));
  const profileItem = document.querySelector(".sidebar ul li[data-section='profile']");
  if (profileItem) profileItem.classList.add("active");

  // ==== Nút mở form chỉnh sửa ====
  const editBtn = document.getElementById("editProfileBtn");
  const editForm = document.getElementById("editProfileForm");
  const saveBtn = document.getElementById("saveProfileBtn");
  const cancelBtn = document.getElementById("cancelEditBtn");

  editBtn.addEventListener("click", () => {
      editForm.style.display = "block";
      document.getElementById("editName").value = userData.username || "";
      document.getElementById("editEmail").value = userData.email || "";
      document.getElementById("editPhone").value = userData.phone || "";
      document.getElementById("editAddress").value = userData.address || "";
  });

  // === Nút hủy ===
  cancelBtn.addEventListener("click", () => {
      editForm.style.display = "none";
  });

  // === Nút lưu thông tin ===
  saveBtn.addEventListener("click", () => {
      const newName = document.getElementById("editName").value;
      const newEmail = document.getElementById("editEmail").value;
      const newPhone = document.getElementById("editPhone").value;
      const newAddress = document.getElementById("editAddress").value;

      // Cập nhật userData
      userData.username = newName;
      userData.email = newEmail;
      userData.phone = newPhone;
      userData.address = newAddress;

      // Lưu vào localStorage
      localStorage.setItem("userData", JSON.stringify(userData));

      // Cập nhật hiển thị
      document.getElementById("account-name").innerText = newName;
      document.getElementById("account-email").innerText = newEmail;
      document.getElementById("account-phone").innerText = newPhone;
      document.getElementById("account-address").innerText = newAddress;

      editForm.style.display = "none";
      alert("✅ Thông tin cá nhân đã được cập nhật!");
  });
});
