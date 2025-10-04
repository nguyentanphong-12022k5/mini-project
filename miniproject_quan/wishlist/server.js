const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const app = express();
app.use(cors());
app.use(express.json());

// 🔹 Kết nối MongoDB
mongoose.connect("mongodb://localhost:####", {
  useNewUrlParser: true,
  useUnifiedTopology: true
}).then(() => console.log("✅ Kết nối MongoDB thành công"))
  .catch(err => console.error("❌ Lỗi MongoDB:", err));

// 🔹 Schema cho sản phẩm mong muốn
const WishlistSchema = new mongoose.Schema({
  id: String,
  name: String,
  price: Number,
  image: String
});

const Wishlist = mongoose.model("Wishlist", WishlistSchema);

// 🔹 API lấy danh sách sản phẩm mong muốn
app.get("/api/wishlist", async (req, res) => {
  try {
    const products = await Wishlist.find();
    res.json(products);
  } catch (err) {
    res.status(500).json({ message: "Lỗi server" });
  }
});

// 🔹 API thêm sản phẩm mới
app.post("/api/wishlist", async (req, res) => {
  try {
    const newProduct = new Wishlist(req.body);
    await newProduct.save();
    res.json({ message: "Đã thêm sản phẩm mong muốn" });
  } catch (err) {
    res.status(500).json({ message: "Lỗi khi thêm sản phẩm" });
  }
});

// 🔹 API xóa sản phẩm theo id
app.delete("/api/wishlist/:id", async (req, res) => {
  try {
    await Wishlist.deleteOne({ id: req.params.id });
    res.json({ message: "Đã xóa sản phẩm" });
  } catch (err) {
    res.status(500).json({ message: "Lỗi khi xóa sản phẩm" });
  }
});

// Chạy server
app.listen(3000, () => console.log("🚀 Server chạy tại http://localhost:3000"));
