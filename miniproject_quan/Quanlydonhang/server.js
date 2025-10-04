const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const app = express();
app.use(cors());
app.use(express.json());

// 🔹 Kết nối MongoDB
mongoose.connect("mongodb://localhost:###", {
  useNewUrlParser: true,
  useUnifiedTopology: true
}).then(() => console.log("✅ Kết nối MongoDB thành công"))
  .catch(err => console.error("❌ Lỗi MongoDB:", err));

// 🔹 Schema cho đơn hàng
const OrderSchema = new mongoose.Schema({
  id: String,        // Mã đơn hàng (ví dụ: DH001)
  date: String,      // Ngày đặt
  total: Number,     // Tổng tiền
  status: String     // Trạng thái: pending, completed, cancelled
});

const Order = mongoose.model("Order", OrderSchema);

// 🔹 API lấy danh sách đơn hàng
app.get("/api/orders", async (req, res) => {
  try {
    const orders = await Order.find();
    res.json(orders);
  } catch (err) {
    res.status(500).json({ message: "Lỗi server" });
  }
});

// 🔹 API thêm đơn hàng
app.post("/api/orders", async (req, res) => {
  try {
    const newOrder = new Order(req.body);
    await newOrder.save();
    res.json({ message: "Đã thêm đơn hàng" });
  } catch (err) {
    res.status(500).json({ message: "Lỗi khi thêm đơn hàng" });
  }
});

// 🔹 API hủy đơn hàng
app.put("/api/orders/:id/cancel", async (req, res) => {
  try {
    await Order.updateOne({ id: req.params.id }, { status: "cancelled" });
    res.json({ message: "Đơn hàng đã bị hủy" });
  } catch (err) {
    res.status(500).json({ message: "Lỗi khi hủy đơn hàng" });
  }
});

// Chạy server
app.listen(3000, () => console.log("🚀 Server chạy tại http://localhost:3000"));
