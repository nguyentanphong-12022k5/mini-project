// ==========================
// SEED DATA - Insert sản phẩm mẫu
// ==========================
const mongoose = require("mongoose");

// Kết nối MongoDB
mongoose.connect(
        "mongodb+srv://nguyentanphong120295_db_user:tanphong789@cluster0.9jdlnmf.mongodb.net/ecommerce", {
            useNewUrlParser: true,
            useUnifiedTopology: true
        }
    )
    .then(() => console.log("✅ Kết nối MongoDB thành công"))
    .catch(err => console.error("❌ Lỗi MongoDB:", err));

// ==========================
// Schema sản phẩm
// ==========================
const productSchema = new mongoose.Schema({
    name: String,
    baseImage: String, // ảnh mặc định
    isFeatured: Boolean,
    isOnSale: Boolean,
    rating: Number,     // điểm trung bình (0–5)
    reviewCount: Number, // số lượt đánh giá

    // Màu sắc
    colors: [{
        key: String, // vd: "blue", "white"
        label: String, // vd: "Xanh", "Trắng"
        image: String // link ảnh theo màu
    }],

    // Giá theo dung lượng
    storages: [{
        capacity: Number, // 256, 512, 1024
        price: String, // "31.990.000đ"
        oldPrice: String, // "34.990.000đ"
        discount: String // "-9%"
    }]
});

const Product = mongoose.model("Product", productSchema);

// Dữ liệu mẫu
const sampleProducts = [{
        name: "iPhone 15 Pro Max",
        baseImage: "../img/iphone-15-pro-max_3.webp",
        isFeatured: true,
        isOnSale: true,
        colors: [
            { key: "blue", label: "Xanh", image: "titan-Xanh.jpg" },
            { key: "white", label: "Trắng", image: "titan-trang.jpg" },
            { key: "black", label: "Đen", image: "titan-den.jpg" },
            { key: "natural", label: "Tự nhiên", image: "titan-tunhien.jpg" }
        ],
        storages: [
            { capacity: 256, price: "31.990.000đ", oldPrice: "34.990.000đ", discount: "-9%" },
            { capacity: 512, price: "36.990.000đ", oldPrice: "39.990.000đ", discount: "-7%" },
            { capacity: 1024, price: "41.990.000đ", oldPrice: "44.990.000đ", discount: "-6%" }
        ]
    },
    {
        name: "Samsung Galaxy S24 Ultra",
        baseImage: "https://via.placeholder.com/200x200?text=Galaxy+S24+Ultra",
        isFeatured: true,
        isOnSale: true,
        colors: [
            { key: "black", label: "Đen", image: "galaxy-black.jpg" },
            { key: "silver", label: "Bạc", image: "galaxy-silver.jpg" }
        ],
        storages: [
            { capacity: 256, price: "27.990.000đ", oldPrice: "29.990.000đ", discount: "-7%" },
            { capacity: 512, price: "31.990.000đ", oldPrice: "33.990.000đ", discount: "-6%" }
        ]
    },
    {
        name: "Xiaomi Redmi Note 13",
        baseImage: "https://via.placeholder.com/200x200?text=Redmi+Note+13",
        isFeatured: false,
        isOnSale: true,
        colors: [
            { key: "blue", label: "Xanh dương", image: "redmi-blue.jpg" },
            { key: "green", label: "Xanh lá", image: "redmi-green.jpg" }
        ],
        storages: [
            { capacity: 128, price: "5.990.000đ", oldPrice: "6.490.000đ", discount: "-8%" },
            { capacity: 256, price: "6.490.000đ", oldPrice: "6.990.000đ", discount: "-7%" }
        ]
    },
    {
        name: "Oppo Reno 10",
        baseImage: "https://via.placeholder.com/200x200?text=Oppo+Reno+10",
        isFeatured: false,
        isOnSale: false,
        colors: [
            { key: "purple", label: "Tím", image: "reno-purple.jpg" },
            { key: "black", label: "Đen", image: "reno-black.jpg" }
        ],
        storages: [
            { capacity: 256, price: "10.990.000đ", oldPrice: "11.490.000đ", discount: "-4%" }
        ]
    },
    {
        name: "Laptop Dell XPS 13",
        baseImage: "https://via.placeholder.com/200x200?text=Dell+XPS+13",
        isFeatured: true,
        isOnSale: false,
        colors: [
            { key: "silver", label: "Bạc", image: "xps-silver.jpg" },
            { key: "black", label: "Đen", image: "xps-black.jpg" }
        ],
        storages: [
            { capacity: 512, price: "35.990.000đ", oldPrice: "37.990.000đ", discount: "-5%" },
            { capacity: 1024, price: "42.990.000đ", oldPrice: "44.990.000đ", discount: "-4%" }
        ]
    },
    {
        name: "Tai nghe Sony WH-1000XM5",
        baseImage: "https://via.placeholder.com/200x200?text=Sony+WH-1000XM5",
        isFeatured: false,
        isOnSale: true,
        colors: [
            { key: "black", label: "Đen", image: "sony-black.jpg" },
            { key: "white", label: "Trắng", image: "sony-white.jpg" }
        ],
        storages: [
            { capacity: 1, price: "8.990.000đ", oldPrice: "9.490.000đ", discount: "-6%" }
        ]
    }
];

// Xóa dữ liệu cũ + thêm mới
async function seedData() {
    await Product.deleteMany({});
    await Product.insertMany(sampleProducts);
    console.log("✅ Đã thêm dữ liệu mẫu xong!");
    mongoose.connection.close();
}

seedData();