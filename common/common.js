// ================== COMMON NAVIGATION ==================
function loadCommonNavigation() {
    // Kiểm tra xem đã có header chưa
    if (document.querySelector('.common-navbar')) return;

    const header = document.querySelector('header');
    if (!header) return;

    // Lưu lại các phần tử quan trọng trong trang tìm kiếm
    let searchInput = null;
    const isSearchPage = window.location.href.includes('timkiem');

    if (isSearchPage) {
        searchInput = document.getElementById('searchInput');
    }

    // Tạo HTML cho navbar - ĐƯỜNG DẪN THỐNG NHẤT
    header.innerHTML = `
        <div class="common-navbar">
            <div class="logo">
                <a href="../html/Trangchu.html">  <!-- THÊM ../ -->
                    <i class="fas fa-home"></i>
                </a>
            </div>
            <nav class="menu">
                <a href="../html/sanpham.html">Sản phẩm</a>  <!-- THÊM ../ -->
  <!-- THÊM ../ -->
                <a href="../chinhsach/chinhsach.html">Chính sách</a>   <!-- THÊM ../ -->
                <a href="../Toan/hotro/hotro.html">Hỗ trợ</a>               <!-- THÊM ../ -->
            </nav>
            <div class="icons">
                <a href="../timkiem/timkiem_loc_sp.html"><i class="fas fa-search"></i></a>  <!-- THÊM ../ -->
                <a href="../giohang/giohang.html"><i class="fas fa-shopping-cart"></i></a>   <!-- THÊM ../ -->
                <a href="../dangnhap/dangnhap.html"><i class="fas fa-user"></i></a>         <!-- THÊM ../ -->
            </div>
        </div>
    `;

    // Thêm lại search input vào đúng vị trí trong trang tìm kiếm
    if (isSearchPage && searchInput) {
        header.parentNode.insertBefore(searchInput, header.nextSibling);
    }
}

// Thêm CSS cho navbar chung
function addCommonStyles() {
    if (document.querySelector('#common-styles')) return;

    const style = document.createElement('style');
    style.id = 'common-styles';
    style.textContent = `
        .common-navbar {
            display: flex;
            align-items: center;
            justify-content: space-between;
            padding: 12px 40px;
            background: #ff6700;
            position: sticky;
            top: 0;
            z-index: 1000;
            box-shadow: 0 3px 6px rgba(0, 0, 0, 0.1);
        }
        
        .common-navbar .logo a {
            display: flex;
            align-items: center;
            gap: 8px;
            text-decoration: none;
            color: white;
            font-size: 20px;
            font-weight: bold;
            transition: transform 0.3s ease, color 0.3s ease;
        }
        
        .common-navbar .logo i {
            font-size: 26px;
            color: white;
        }
        
        .common-navbar .logo a:hover {
            color: #222;
            transform: scale(1.05);
        }
        
        .common-navbar .menu {
            display: flex;
            gap: 28px;
        }
        
        .common-navbar .menu a {
            text-decoration: none;
            color: white;
            font-weight: 600;
            font-size: 16px;
            position: relative;
            transition: color 0.3s ease;
        }
        
        .common-navbar .menu a::after {
            content: "";
            position: absolute;
            width: 0;
            height: 2px;
            bottom: -4px;
            left: 0;
            background: white;
            transition: width 0.3s ease;
        }
        
        .common-navbar .menu a:hover {
            color: #222;
        }
        
        .common-navbar .menu a:hover::after {
            width: 100%;
        }
        
        .common-navbar .icons a {
            margin-left: 20px;
            color: white;
            font-size: 18px;
            transition: transform 0.2s, color 0.3s;
        }
        
        .common-navbar .icons a:hover {
            color: #222;
            transform: scale(1.2);
        }
    `;
    document.head.appendChild(style);
}

// Khởi tạo khi trang load
document.addEventListener('DOMContentLoaded', function() {
    addCommonStyles();
    loadCommonNavigation();
});