const products = [
  { id: 1, name: "Wireless Headphones", description: "High-quality sound", price: 2500, image: "assets/images/wirelessheadphone.jpeg" },
  { id: 2, name: "Smart Watch", description: "Track fitness and time", price: 4500, image: "assets/images/smartwatch.jpeg" },
  { id: 3, name: "Gaming Mouse", description: "RGB lights, fast response", price: 1200, image: "assets/images/gaming mouse.jpeg" },
  { id: 4, name: "USB-C Charger", description: "Fast charging 20W", price: 799, image: "assets/images/usbcharger.jpeg" },
  { id: 5, name: "Mobile", description: "RGB lights, fast response", price: 1200, image: "assets/images/mobile phone.jpeg" },
  { id: 6, name: "Powerbank", description: "Fast charging 20W", price: 799, image: "assets/images/powerbank.jpeg" }
];

const productPage = document.getElementById("productPage");
const cartPage = document.getElementById("cartPage");
const cartCount = document.getElementById("cartCount");
const closeCartBtn = document.getElementById("closeCartBtn");
const searchInput = document.getElementById("searchInput");

let cart = JSON.parse(sessionStorage.getItem("cart")) || [];

function renderProducts(list) {
  productPage.innerHTML = "";
  list.forEach(product => {
    const card = document.createElement("article");
    card.innerHTML = `
      <img src="${product.image}" alt="${product.name}">
      <section>
        <h3>${product.name}</h3>
        <p>${product.description}</p>
        <span>₹${product.price}</span>
        <button class="add-btn">Add to Cart</button>
      </section>
    `;
    card.querySelector("button").addEventListener("click", () => {
      cart.push(product);
      sessionStorage.setItem("cart", JSON.stringify(cart));
      updateCartCount();
      alert(`${product.name} added to cart.`);
    });
    productPage.appendChild(card);
  });
}

function renderCart() {
  cartPage.innerHTML = "";
  let total = 0;

  if (cart.length === 0) {
    cartPage.innerHTML = "<h3>Your cart is empty.</h3>";
    return;
  }

  cart.forEach((item, index) => {
    const card = document.createElement("article");
    card.innerHTML = `
      <img src="${item.image}" alt="${item.name}">
      <section>
        <h3>${item.name}</h3>
        <p>${item.description}</p>
        <span>₹${item.price}</span>
        <button class="remove-btn">Remove</button>
      </section>
    `;
    card.querySelector("button").addEventListener("click", () => {
      cart.splice(index, 1);
      sessionStorage.setItem("cart", JSON.stringify(cart));
      updateCartCount();
      renderCart();
    });
    cartPage.appendChild(card);
    total += item.price;
  });

  // Total row at the bottom of the grid
  const totalRow = document.createElement("div");
  totalRow.className = "cart-total";
  totalRow.innerHTML = `Total: ₹${total}`;
  cartPage.appendChild(totalRow);
}

function updateCartCount() {
  cartCount.innerText = cart.length;
}

function toggleView() {
  const isProductVisible = productPage.style.display !== "none";
  productPage.style.display = isProductVisible ? "none" : "grid";
  cartPage.style.display = isProductVisible ? "grid" : "none";
  closeCartBtn.style.display = isProductVisible ? "inline-block" : "none";
  renderCart();
}

searchInput.addEventListener("keyup", (e) => {
  const text = e.target.value.toLowerCase();
  const filtered = products.filter(p => p.name.toLowerCase().includes(text));
  renderProducts(filtered);
});

// Initial load
renderProducts(products);
updateCartCount();