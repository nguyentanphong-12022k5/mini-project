// Khi submit form hỗ trợ
document.getElementById("supportForm").addEventListener("submit", function(e) {
    e.preventDefault();

    const name = document.getElementById("name").value;
    const email = document.getElementById("email").value;
    const message = document.getElementById("message").value;

    alert(
        `Cảm ơn ${name}! Yêu cầu hỗ trợ của bạn đã được gửi.\nChúng tôi sẽ phản hồi qua email: ${email}`
    );

    // Reset form
    this.reset();
});