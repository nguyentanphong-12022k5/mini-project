// Lấy các phần tử
const tabLogin = document.getElementById("tab-login");
const tabRegister = document.getElementById("tab-register");
const loginForm = document.getElementById("loginForm");
const registerForm = document.getElementById("registerForm");
const closeBtn = document.getElementById("closeAuth");
const modal = document.getElementById("authModal");

// 👉 Chuyển tab
tabLogin.addEventListener("click", () => {
    tabLogin.classList.add("active");
    tabRegister.classList.remove("active");
    loginForm.style.display = "block";
    registerForm.style.display = "none";
});

tabRegister.addEventListener("click", () => {
    tabRegister.classList.add("active");
    tabLogin.classList.remove("active");
    registerForm.style.display = "block";
    loginForm.style.display = "none";
});

// 👉 Đóng modal
closeBtn.addEventListener("click", () => {
    modal.style.display = "none";
});

// 👉 Xử lý đăng nhập (giả lập)
loginForm.addEventListener("submit", (e) => {
    e.preventDefault();
    const user = document.getElementById("login-username").value;
    const pass = document.getElementById("login-password").value;

    if (user === "admin" && pass === "123") {
        document.getElementById("loginMsg").innerText = "✅ Đăng nhập thành công!";
        document.getElementById("loginMsg").style.color = "green";
    } else {
        document.getElementById("loginMsg").innerText = "❌ Sai tên đăng nhập hoặc mật khẩu!";
        document.getElementById("loginMsg").style.color = "red";
    }
});

// 👉 Xử lý đăng ký (giả lập)
registerForm.addEventListener("submit", (e) => {
    e.preventDefault();
    const user = document.getElementById("reg-username").value;
    const pass = document.getElementById("reg-password").value;
    const pass2 = document.getElementById("reg-password2").value;

    if (pass !== pass2) {
        document.getElementById("regMsg").innerText = "❌ Mật khẩu nhập lại không khớp!";
        document.getElementById("regMsg").style.color = "red";
    } else {
        document.getElementById("regMsg").innerText = "✅ Đăng ký thành công!";
        document.getElementById("regMsg").style.color = "green";
    }
});
// Đăng ký
registerForm.addEventListener("submit", (e) => {
    e.preventDefault();
    const user = document.getElementById("reg-username").value;
    const pass = document.getElementById("reg-password").value;
    const pass2 = document.getElementById("reg-password2").value;

    if (pass !== pass2) {
        document.getElementById("regMsg").innerText = "❌ Mật khẩu nhập lại không khớp!";
        document.getElementById("regMsg").style.color = "red";
    } else {
        // 👉 Lưu vào localStorage
        localStorage.setItem("username", user);
        localStorage.setItem("password", pass);

        document.getElementById("regMsg").innerText = "✅ Đăng ký thành công!";
        document.getElementById("regMsg").style.color = "green";
    }
});

// Đăng nhập
loginForm.addEventListener("submit", (e) => {
    e.preventDefault();
    const user = document.getElementById("login-username").value;
    const pass = document.getElementById("login-password").value;

    const savedUser = localStorage.getItem("username");
    const savedPass = localStorage.getItem("password");

    if (user === savedUser && pass === savedPass) {
        document.getElementById("loginMsg").innerText = "✅ Đăng nhập thành công!";
        document.getElementById("loginMsg").style.color = "green";
    } else {
        document.getElementById("loginMsg").innerText = "❌ Sai tên đăng nhập hoặc mật khẩu!";
        document.getElementById("loginMsg").style.color = "red";
    }
});