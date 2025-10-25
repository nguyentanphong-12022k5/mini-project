document.getElementById("btn-Buy").addEventListener("click", function() {
    fetch("http://localhost:3000/create-payment", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                orderId: Date.now().toString(),
                amount: 100000,
                orderInfo: "Thanh toan iPhone test"
            })
        })
        .then(res => res.json())
        .then(data => {
            if (data.paymentUrl) {
                window.location.href = data.paymentUrl;
            } else {
                alert("Có lỗi khi tạo thanh toán!");
            }
        });
});