const express = require("express");
const qs = require("qs");
const crypto = require("crypto");
const cors = require("cors");

const app = express();
app.use(express.json());
app.use(cors());

// Config VNPay
const vnp_TmnCode = "ZWMLEKNN";
const vnp_HashSecret = "6NN1RBYXC5U6Y1Q71827ELVRH859PYTC";
const vnp_Url = "https://sandbox.vnpayment.vn/paymentv2/vpcpay.html";
const vnp_ReturnUrl = "http://localhost:3000/payment-return";

// Hàm format datetime đúng chuẩn VNPay
function formatDate(date) {
    const yyyy = date.getFullYear().toString();
    const MM = (date.getMonth() + 1).toString().padStart(2, '0');
    const dd = date.getDate().toString().padStart(2, '0');
    const HH = date.getHours().toString().padStart(2, '0');
    const mm = date.getMinutes().toString().padStart(2, '0');
    const ss = date.getSeconds().toString().padStart(2, '0');
    return yyyy + MM + dd + HH + mm + ss;
}

app.post("/create-payment", (req, res) => {
    const { orderId, amount, orderInfo } = req.body;

    const createDate = formatDate(new Date());
    const ipAddr = req.headers['x-forwarded-for'] || req.socket.remoteAddress || "127.0.0.1";

    let vnp_Params = {
        vnp_Version: "2.1.0",
        vnp_Command: "pay",
        vnp_TmnCode: vnp_TmnCode,
        vnp_Locale: "vn",
        vnp_CurrCode: "VND",
        vnp_TxnRef: orderId.toString().replace(/[^a-zA-Z0-9]/g, ""),
        vnp_OrderInfo: orderInfo,
        vnp_OrderType: "billpayment",
        vnp_Amount: parseInt(amount, 10) * 100,
        vnp_ReturnUrl: vnp_ReturnUrl,
        vnp_IpAddr: "127.0.0.1",
        vnp_CreateDate: createDate
    };


    // Sắp xếp tham số để tạo chuỗi ký
    vnp_Params = sortObject(vnp_Params);
    const signData = qs.stringify(vnp_Params, { encode: false });
    const hmac = crypto.createHmac("sha512", vnp_HashSecret);
    const signed = hmac.update(Buffer.from(signData, "utf-8")).digest("hex");
    vnp_Params["vnp_SecureHash"] = signed;

    const paymentUrl = vnp_Url + "?" + qs.stringify(vnp_Params, { encode: false });
    res.json({ paymentUrl });
});

// ✅ Route trả kết quả
app.get("/payment-return", (req, res) => {
    const vnp_Params = req.query;
    const responseCode = vnp_Params["vnp_ResponseCode"];

    if (responseCode === "00") {
        res.send("<h1 style='color:green'>✅ Thanh toán thành công!</h1>");
    } else {
        res.send("<h1 style='color:red'>❌ Thanh toán thất bại hoặc bị hủy!</h1>");
    }
});

function sortObject(obj) {
    const sorted = {};
    const keys = Object.keys(obj).sort();
    keys.forEach(k => { sorted[k] = obj[k]; });
    return sorted;
}

app.listen(3000, () => console.log("Server chạy tại http://localhost:3000"));