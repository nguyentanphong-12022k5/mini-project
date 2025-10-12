// // Lấy các phần tử
// const tabLogin = document.getElementById("tab-login");
// const tabRegister = document.getElementById("tab-register");
// const loginForm = document.getElementById("loginForm");
// const registerForm = document.getElementById("registerForm");
// const closeBtn = document.getElementById("closeAuth");
// const modal = document.getElementById("authModal");

// // 👉 Chuyển tab
// tabLogin.addEventListener("click", () => {
//     tabLogin.classList.add("active");
//     tabRegister.classList.remove("active");
//     loginForm.style.display = "block";
//     registerForm.style.display = "none";
// });

// tabRegister.addEventListener("click", () => {
//     tabRegister.classList.add("active");
//     tabLogin.classList.remove("active");
//     registerForm.style.display = "block";
//     loginForm.style.display = "none";
// });

// // 👉 Đóng modal
// closeBtn.addEventListener("click", () => {
//     modal.style.display = "none";
// });

// // 👉 Đăng ký
// registerForm.addEventListener("submit", (e) => {
//     e.preventDefault();
//     const user = document.getElementById("reg-username").value;
//     const pass = document.getElementById("reg-password").value;
//     const pass2 = document.getElementById("reg-password2").value;
//     const email = document.getElementById("reg-email").value;

//     if (pass !== pass2) {
//         document.getElementById("regMsg").innerText = "❌ Mật khẩu nhập lại không khớp!";
//         document.getElementById("regMsg").style.color = "red";
//     } else {
//         // 👉 Lưu vào localStorage (gói thành userData)
//         const userData = {
//             username: user,
//             password: pass,
//             email: email, // bạn có thể thêm field
//             phone: "",
//             address: "",
//             avatar: "https://i.pravatar.cc/120"
//         };

//         localStorage.setItem("userData", JSON.stringify(userData));

//         document.getElementById("regMsg").innerText = "✅ Đăng ký thành công!";
//         document.getElementById("regMsg").style.color = "green";

//         setTimeout(() => {
//             window.location.href = "../html/Trangchu.html";
//         }, 1000);
//     }
// });

// // 👉 Đăng nhập
// loginForm.addEventListener("submit", (e) => {
//     e.preventDefault();
//     const user = document.getElementById("login-username").value;
//     const pass = document.getElementById("login-password").value;
//     const email = document.getElementById("reg-email").value;
//     const savedUser = JSON.parse(localStorage.getItem("userData"));

//     if (savedUser && user === savedUser.username && pass === savedUser.password) {
//         document.getElementById("loginMsg").innerText = "✅ Đăng nhập thành công!";
//         document.getElementById("loginMsg").style.color = "green";

//         setTimeout(() => {
//             window.location.href = "../html/Trangchu.html";
//         }, 1000);
//     } else {
//         document.getElementById("loginMsg").innerText = "❌ Sai tên đăng nhập hoặc mật khẩu!";
//         document.getElementById("loginMsg").style.color = "red";
//     }
// });// Lấy các phần tử
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

// 👉 Đăng ký
registerForm.addEventListener("submit", (e) => {
    e.preventDefault();
    const user = document.getElementById("reg-username").value;
    const pass = document.getElementById("reg-password").value;
    const pass2 = document.getElementById("reg-password2").value;
    const email = document.getElementById("reg-email").value;

    if (pass !== pass2) {
        document.getElementById("regMsg").innerText = "❌ Mật khẩu nhập lại không khớp!";
        document.getElementById("regMsg").style.color = "red";
    } else {
        const userData = {
            username: user,
            password: pass,
            email: email,
            phone: "",
            address: "",
            avatar: "https://i.pravatar.cc/120"
        };

        // Lưu user (demo: chỉ 1 user)
        localStorage.setItem("userData", JSON.stringify(userData));
        // Ghi nhớ user hiện tại
        localStorage.setItem("currentUser", JSON.stringify(userData));

        document.getElementById("regMsg").innerText = "✅ Đăng ký thành công!";
        document.getElementById("regMsg").style.color = "green";

        setTimeout(() => {
            window.location.href = "../html/Trangchu.html";
        }, 1000);
    }
});

// 👉 Đăng nhập
loginForm.addEventListener("submit", (e) => {
    e.preventDefault();
    const user = document.getElementById("login-username").value;
    const pass = document.getElementById("login-password").value;
    const savedUser = JSON.parse(localStorage.getItem("userData"));

    if (savedUser && user === savedUser.username && pass === savedUser.password) {
        document.getElementById("loginMsg").innerText = "✅ Đăng nhập thành công!";
        document.getElementById("loginMsg").style.color = "green";

        // Ghi nhớ user hiện tại
        localStorage.setItem("currentUser", JSON.stringify(savedUser));

        setTimeout(() => {
            window.location.href = "../html/Trangchu.html";
        }, 1000);
    } else {
        document.getElementById("loginMsg").innerText = "❌ Sai tên đăng nhập hoặc mật khẩu!";
        document.getElementById("loginMsg").style.color = "red";
    }
});