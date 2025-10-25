// charts.js
document.addEventListener("DOMContentLoaded", () => {
  // 🟢 Hàm tạo số ngẫu nhiên
  const rand = (min, max) => Math.floor(Math.random() * (max - min + 1)) + min;

  // 🟢 Hàm vẽ biểu đồ
  function makeChart(id, type, labels, data, label, bgColors, borderColors) {
    new Chart(document.getElementById(id), {
      type,
      data: {
        labels,
        datasets: [
          {
            label,
            data,
            borderWidth: 1.5,
            backgroundColor: bgColors,
            borderColor: borderColors,
            tension: 0.3
          },
        ],
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          legend: {
            display: true,
            labels: { color: "#111" },
          },
        },
        scales: type !== "pie" && type !== "doughnut" ? {
          y: { beginAtZero: true }
        } : {}
      },
    });
  }

  // 🟧 1️⃣ Đơn hàng (Bar Chart)
  const ordersData = [rand(100, 200), rand(30, 80), rand(60, 120), rand(5, 20)];
  makeChart(
    "ordersChart",
    "bar",
    ["Tổng đơn", "Đang giao", "Hoàn thành", "Hủy"],
    ordersData,
    "Đơn hàng",
    ["#60a5fa", "#fbbf24", "#34d399", "#f87171"],
    ["#3b82f6", "#f59e0b", "#10b981", "#ef4444"]
  );

  // 🟧 2️⃣ Khách hàng (Pie Chart)
  const newCustomers = rand(40, 100);
  const oldCustomers = rand(60, 120);
  makeChart(
    "customersChart",
    "pie",
    ["Khách mới", "Khách cũ"],
    [newCustomers, oldCustomers],
    "Khách hàng",
    ["#3b82f6", "#fbbf24"],
    ["#2563eb", "#d97706"]
  );

  // 🟧 3️⃣ Doanh thu (Line Chart)
  const months = ["T1", "T2", "T3", "T4", "T5", "T6"];
  const revenueData = months.map(() => rand(20, 80));
  makeChart(
    "revenueChart",
    "line",
    months,
    revenueData,
    "Doanh thu (triệu VND)",
    ["rgba(16,185,129,0.3)"],
    ["#10b981"]
  );

  // 🟧 4️⃣ Hiệu suất bán hàng (Bar Chart)
  makeChart(
    "salesChart",
    "bar",
    ["iPhone", "Samsung", "Oppo", "Xiaomi", "Realme"],
    [rand(30, 90), rand(20, 70), rand(15, 60), rand(10, 50), rand(5, 30)],
    "Số lượng bán ra",
    ["#f87171", "#60a5fa", "#fbbf24", "#34d399", "#a78bfa"],
    ["#dc2626", "#2563eb", "#d97706", "#059669", "#7c3aed"]
  );

  // 🟧 5️⃣ Marketing (Doughnut Chart)
  makeChart(
    "marketingChart",
    "doughnut",
    ["Facebook", "Google", "TikTok", "Instagram"],
    [rand(20, 60), rand(10, 50), rand(5, 30), rand(5, 25)],
    "Chi phí Marketing (%)",
    ["#3b82f6", "#fbbf24", "#ec4899", "#8b5cf6"],
    ["#2563eb", "#d97706", "#be185d", "#6d28d9"]
  );

  // 🟧 6️⃣ Tài chính (Line Chart)
  const financeExpense = months.map(() => rand(30, 60));
  const financeRevenue = months.map(() => rand(50, 100));
  new Chart(document.getElementById("financeChart"), {
    type: "line",
    data: {
      labels: months,
      datasets: [
        {
          label: "Chi phí (triệu)",
          data: financeExpense,
          borderColor: "#ef4444",
          backgroundColor: "rgba(239,68,68,0.2)",
          tension: 0.3,
          fill: true,
        },
        {
          label: "Doanh thu (triệu)",
          data: financeRevenue,
          borderColor: "#10b981",
          backgroundColor: "rgba(16,185,129,0.2)",
          tension: 0.3,
          fill: true,
        },
      ],
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      plugins: { legend: { position: "bottom" } },
      scales: { y: { beginAtZero: true } },
    },
  });
});
