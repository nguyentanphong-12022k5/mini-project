// Lấy tất cả các mục accordion
const items = document.querySelectorAll(".accordion-item");

items.forEach(item => {
    // Khi di chuột vào thì mở mục đó
    item.addEventListener("mouseenter", () => {
        // Đóng tất cả mục khác
        items.forEach(i => i.classList.remove("active"));
        // Mở mục hiện tại
        item.classList.add("active");
    });

    // Khi rời chuột ra thì đóng mục đó
    item.addEventListener("mouseleave", () => {
        item.classList.remove("active");
    });
});