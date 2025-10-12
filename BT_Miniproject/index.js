async function fetchProducts() {
    const res = await fetch("http://localhost:3000/api/products");
    return res.json();
}

async function renderProducts() {
    const list = await fetchProducts();
    const grid = document.getElementById("productGrid");
    grid.innerHTML = "";

    list.forEach(p => {
        const card = document.createElement("div");
        card.className = "card";
        card.innerHTML = `
      <a href="page2.html?id=${p._id}">
        <div class="thumb"><img src="${p.image}" alt="${p.name}" style="max-width:60%"></div>
      </a>
      <h3 class="title">${p.name}</h3>
      <div class="price">${p.price.toLocaleString("vi-VN")}đ</div>
    `;
        grid.appendChild(card);
    });

    document.getElementById("shownCount").textContent = list.length;
}

renderProducts();