// ==========================
// SEED DATA - Insert sản phẩm mẫu
// ==========================

const mongoose = require("mongoose");

// Kết nối 
//mongodb://127.0.0.1:27017/ecommerce
mongoose.connect("mongodb+srv://nguyentanphong120295_db_user:tanphong789@cluster0.9jdlnmf.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0", {
        useNewUrlParser: true,
        useUnifiedTopology: true
    })
    .then(() => console.log("✅ Kết nối MongoDB thành công"))
    .catch(err => console.error("❌ Lỗi MongoDB:", err));

// Schema
const productSchema = new mongoose.Schema({
    name: String,
    price: Number,
    image: String,
    isFeatured: Boolean,
    isOnSale: Boolean
});
const Product = mongoose.model("Product", productSchema);

// Dữ liệu mẫu
const sampleProducts = [{
        name: "iPhone 15 Pro Max",
        price: 32990000,
        image: "../img/iphone-15-pro-max_3.webp",
        isFeatured: true,
        isOnSale: false
    },
    {
        name: "Samsung Galaxy S24 Ultra",
        price: 27990000,
        image: "https://via.placeholder.com/200x200?text=Galaxy+S24+Ultra",
        isFeatured: true,
        isOnSale: true
    },
    {
        name: "Xiaomi Redmi Note 13",
        price: 5990000,
        image: "https://via.placeholder.com/200x200?text=Redmi+Note+13",
        isFeatured: false,
        isOnSale: true
    },
    {
        name: "Oppo Reno 10",
        price: 10990000,
        image: "https://via.placeholder.com/200x200?text=Oppo+Reno+10",
        isFeatured: false,
        isOnSale: false
    },
    {
        name: "Laptop Dell XPS 13",
        price: 35990000,
        image: "https://via.placeholder.com/200x200?text=Dell+XPS+13",
        isFeatured: true,
        isOnSale: false
    },
    {
        name: "Tai nghe Sony WH-1000XM5",
        price: 8990000,
        image: "https://via.placeholder.com/200x200?text=Sony+WH-1000XM5",
        isFeatured: false,
        isOnSale: true
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