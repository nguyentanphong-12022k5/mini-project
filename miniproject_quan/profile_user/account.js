// Xử lý sidebar click
document.querySelectorAll(".sidebar ul li").forEach(item => {
    item.addEventListener("click", () => {
        document.querySelectorAll(".sidebar ul li").forEach(li => li.classList.remove("active"));
        item.classList.add("active");

        let modalName = item.getAttribute("data-modal");
        let section = item.getAttribute("data-section");

        // Nếu click vào mục hiển thị trang (profile)
        if (section) {
            document.getElementById(section).style.display = "block";
        } else {
            document.getElementById("profile").style.display = "block";
        }

        // Nếu có modal thì mở modal
        if (modalName) {
            document.getElementById(modalName + "Modal").style.display = "block";
        }
    });
});

// Đóng modal khi nhấn nút X
document.querySelectorAll(".close").forEach(btn => {
    btn.addEventListener("click", () => {
        btn.parentElement.parentElement.style.display = "none";
    });
});
window.addEventListener("DOMContentLoaded", () => {
    const userData = JSON.parse(localStorage.getItem("userData"));

    if (userData) {
        document.getElementById("account-name").innerText = userData.username;
        document.getElementById("account-email").innerText = userData.email;
        document.getElementById("account-phone").innerText = userData.phone;
        document.getElementById("account-address").innerText = userData.address;
        document.getElementById("account-avatar").src = userData.avatar || "https://via.placeholder.com/120";
    } else {
        // Nếu chưa có dữ liệu thì quay lại login
        window.location.href = "/html/login.html";

    }
});

// Đóng modal khi nhấn ngoài
window.onclick = function(event) {
    document.querySelectorAll(".modal").forEach(modal => {
        if (event.target == modal) {
            modal.style.display = "none";
        }
    });
};