// // ==========================
// // SERVER.JS (BACKEND)
// // ==========================

// // Import thư viện
// const express = require("express");
// const mongoose = require("mongoose");
// const cors = require("cors");

// // Khởi tạo app
// const app = express();
// app.use(cors()); // Cho phép frontend truy cập API
// app.use(express.json()); // Đọc JSON body

// // 🟧 Trỏ tới thư mục chứa file tĩnh (HTML, CSS, JS, ảnh...)
// const __dirname = path.resolve();
// app.use(express.static(path.join(__dirname, "mini-project/html")));

// // ==========================
// // KẾT NỐI MONGODB
// // ==========================
// mongoose.connect("mongodb://127.0.0.1:27017/ecommerce", {
//         useNewUrlParser: true,
//         useUnifiedTopology: true
//     })
//     .then(() => console.log("✅ Kết nối MongoDB thành công"))
//     .catch(err => console.error("❌ Lỗi MongoDB:", err));

// // ==========================
// // TẠO SCHEMA & MODEL
// // ==========================
// const productSchema = new mongoose.Schema({
//     name: String,
//     price: Number,
//     image: String,
//     isFeatured: Boolean, // Sản phẩm nổi bật
//     isOnSale: Boolean // Khuyến mãi
// });

// const Product = mongoose.model("Product", productSchema);

// // ==========================
// // API ROUTES
// // ==========================

// // Lấy tất cả sản phẩm
// app.get("/api/products", async(req, res) => {
//     try {
//         const { category, brand, price_lte } = req.query;
//         let filter = {};

//         if (category) filter.category = category; // lọc theo phân loại
//         if (brand) filter.brand = brand; // lọc theo thương hiệu
//         if (price_lte) filter.price = { $lte: Number(price_lte) }; // lọc theo giá

//         const products = await Product.find(filter);
//         res.json(products);
//     } catch (err) {
//         res.status(500).json({ message: "Lỗi server", error: err.message });
//     }
// });


// // Lấy sản phẩm nổi bật
// app.get("/api/products/featured", async(req, res) => {
//     const featured = await Product.find({ isFeatured: true });
//     res.json(featured);
// });

// // Thêm sản phẩm mới (demo)
// app.post("/api/products", async(req, res) => {
//     const newProduct = new Product(req.body);
//     await newProduct.save();
//     res.json(newProduct);
// });

// // Khởi động server
// const PORT = 5000;
// app.listen(PORT, () => {
//     console.log(`🚀 Server chạy tại http://localhost:${PORT}`);
// });
// ==========================
// SERVER.JS (BACKEND)
// ==========================

// Import thư viện
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const path = require("path");

// Khởi tạo app
const app = express();
app.use(cors());
app.use(express.json());


// 🟧 Dùng __dirname có sẵn trong CommonJS
app.use(express.static(path.join(__dirname, "..")));


// ==========================
// KẾT NỐI MONGODB
// ==========================
mongoose.connect("mongodb+srv://nguyentanphong120295_db_user:tanphong789@cluster0.9jdlnmf.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0", {
        useNewUrlParser: true,
        useUnifiedTopology: true
    })
    .then(() => console.log("✅ Kết nối MongoDB thành công"))
    .catch(err => console.error("❌ Lỗi MongoDB:", err));

// ==========================
// TẠO SCHEMA & MODEL
// ==========================
const productSchema = new mongoose.Schema({
    name: String,
    price: Number,
    image: String,
    isFeatured: Boolean,
    isOnSale: Boolean
});

const Product = mongoose.model("Product", productSchema);

// ==========================
// API ROUTES
// ==========================
app.get("/api/products", async(req, res) => {
    const products = await Product.find();
    res.json(products);
});

// ==========================
// START SERVER
// ==========================
const PORT = 5000;
app.listen(PORT, "0.0.0.0", () => {
    console.log(`🚀 Server chạy tại http://localhost:${PORT}`);
});