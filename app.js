const CART_KEY = "bellemode-cart";

const grid = document.getElementById("grid");
const filters = document.getElementById("filters");
const cartEl = document.getElementById("cart");
const cartItemsEl = document.getElementById("cart-items");
const cartCountEl = document.getElementById("cart-count");
const cartTotalEl = document.getElementById("cart-total");

let activeCategory = "All";
let cart = loadCart();

function loadCart() {
  try {
    return JSON.parse(localStorage.getItem(CART_KEY)) || {};
  } catch (e) {
    return {};
  }
}

function saveCart() {
  try {
    localStorage.setItem(CART_KEY, JSON.stringify(cart));
  } catch (e) {
    // storage unavailable; cart still works for this visit
  }
}

function money(n) {
  return n.toFixed(2);
}

function renderFilters() {
  const categories = ["All", ...new Set(PRODUCTS.map(p => p.category))];
  filters.innerHTML = "";
  categories.forEach(cat => {
    const b = document.createElement("button");
    b.textContent = cat;
    if (cat === activeCategory) b.classList.add("active");
    b.addEventListener("click", () => {
      activeCategory = cat;
      renderFilters();
      renderGrid();
    });
    filters.appendChild(b);
  });
}

function renderGrid() {
  grid.innerHTML = "";
  PRODUCTS.filter(p => activeCategory === "All" || p.category === activeCategory).forEach(p => {
    const card = document.createElement("article");
    card.className = "card";

    const img = document.createElement("div");
    img.className = "img";
    img.style.background = p.color;

    const info = document.createElement("div");
    info.className = "info";

    const cat = document.createElement("span");
    cat.className = "cat";
    cat.textContent = p.category;

    const name = document.createElement("span");
    name.className = "name";
    name.textContent = p.name;

    const price = document.createElement("span");
    price.className = "price";
    price.textContent = "$" + money(p.price);

    const btn = document.createElement("button");
    btn.textContent = "Add to cart";
    btn.addEventListener("click", () => addToCart(p.id));

    info.append(cat, name, price, btn);
    card.append(img, info);
    grid.appendChild(card);
  });
}

function addToCart(id) {
  cart[id] = (cart[id] || 0) + 1;
  saveCart();
  renderCart();
}

function changeQty(id, delta) {
  cart[id] = (cart[id] || 0) + delta;
  if (cart[id] <= 0) delete cart[id];
  saveCart();
  renderCart();
}

function renderCart() {
  cartItemsEl.innerHTML = "";
  let total = 0;
  let count = 0;

  Object.keys(cart).forEach(id => {
    const product = PRODUCTS.find(p => p.id === Number(id));
    if (!product) {
      delete cart[id];
      return;
    }
    const qty = cart[id];
    total += product.price * qty;
    count += qty;

    const li = document.createElement("li");

    const label = document.createElement("span");
    label.textContent = product.name + " ($" + money(product.price) + ")";

    const qtyBox = document.createElement("span");
    qtyBox.className = "qty";
    const minus = document.createElement("button");
    minus.textContent = "−";
    minus.addEventListener("click", () => changeQty(id, -1));
    const num = document.createElement("span");
    num.textContent = qty;
    const plus = document.createElement("button");
    plus.textContent = "+";
    plus.addEventListener("click", () => changeQty(id, 1));
    qtyBox.append(minus, num, plus);

    li.append(label, qtyBox);
    cartItemsEl.appendChild(li);
  });

  if (count === 0) {
    const li = document.createElement("li");
    li.className = "empty";
    li.textContent = "Your cart is empty.";
    cartItemsEl.appendChild(li);
  }

  cartCountEl.textContent = count;
  cartTotalEl.textContent = money(total);
}

document.getElementById("cart-toggle").addEventListener("click", () => {
  cartEl.hidden = !cartEl.hidden;
});
document.getElementById("cart-close").addEventListener("click", () => {
  cartEl.hidden = true;
});
document.getElementById("checkout").addEventListener("click", () => {
  alert("Checkout is not set up yet. Connect a payment provider to enable it.");
});

renderFilters();
renderGrid();
renderCart();
