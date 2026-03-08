const VALID_USER = {
    email: "qa@example.com",
    password: "Test1234!"
  };
const detailButtons = document.querySelectorAll('[data-cy="product-detail-btn"]');

detailButtons.forEach(button => {
  button.addEventListener("click", () => {
    window.location.href = "/product-detail.html";
  });
});
  
  function getCart() {
    return JSON.parse(localStorage.getItem("cart") || "[]");
  }
  
  function setCart(cart) {
    localStorage.setItem("cart", JSON.stringify(cart));
  }
  
  function saveLoggedInUser() {
    localStorage.setItem("isLoggedIn", "true");
  }
  
  function isLoggedIn() {
    return localStorage.getItem("isLoggedIn") === "true";
  }
  
  function formatPrice(price) {
    return `${price} TL`;
  }
  
  async function getProducts() {
    const response = await fetch("./data/products.json");
    return response.json();
  }
  
  function addToCart(product) {
    const cart = getCart();
    const existing = cart.find((item) => item.id === product.id);
  
    if (existing) {
      existing.quantity += 1;
    } else {
      cart.push({ ...product, quantity: 1 });
    }
  
    setCart(cart);
  }
  
  async function initLoginPage() {
    const emailInput = document.getElementById("email");
    const passwordInput = document.getElementById("password");
    const loginBtn = document.getElementById("loginBtn");
    const loginMessage = document.getElementById("loginMessage");
  
    if (!loginBtn) return;
  
    loginBtn.addEventListener("click", () => {
      const email = emailInput.value.trim();
      const password = passwordInput.value.trim();
  
      if (!email || !password) {
        loginMessage.textContent = "E-posta ve şifre zorunludur";
        loginMessage.className = "error";
        return;
      }
  
      if (email === VALID_USER.email && password === VALID_USER.password) {
        saveLoggedInUser();
        loginMessage.textContent = "Giriş başarılı, yönlendiriliyorsunuz...";
        loginMessage.className = "success";
  
        setTimeout(() => {
          window.location.href = "./products.html";
        }, 500);
      } else {
        loginMessage.textContent = "Geçersiz kullanıcı bilgisi";
        loginMessage.className = "error";
      }
    });
  }
  
  async function initProductsPage() {
    const productList = document.getElementById("product-list");
    if (!productList) return;
  
    if (!isLoggedIn()) {
      window.location.href = "./login.html";
      return;
    }
  
    const products = await getProducts();
  
    productList.innerHTML = products
      .map(
        (product) => `
      <div class="card" data-cy="product-card">
        <h3 data-cy="product-title">${product.name}</h3>
        <p data-cy="product-price">${formatPrice(product.price)}</p>
        <p data-cy="product-stock">
          ${product.stock > 0 ? `Stok: ${product.stock}` : "Stokta yok"}
        </p>
        <button data-cy="product-detail-btn" onclick="goToDetail(${product.id})">Detay</button>
        <button
          data-cy="add-to-cart"
          onclick='handleAddToCart(${JSON.stringify(product)})'
          ${product.stock === 0 ? "disabled" : ""}
        >
          Sepete Ekle
        </button>
      </div>
    `
      )
      .join("");
  }
  
  function goToDetail(productId) {
    window.location.href = `./product-detail.html?id=${productId}`;
  }
  
  function handleAddToCart(product) {
    addToCart(product);
    alert(`${product.name} sepete eklendi`);
  }
  
  async function initProductDetailPage() {
    const detailContainer = document.getElementById("product-detail");
    if (!detailContainer) return;
  
    if (!isLoggedIn()) {
      window.location.href = "./login.html";
      return;
    }
  
    const params = new URLSearchParams(window.location.search);
    const productId = Number(params.get("id"));
    const products = await getProducts();
    const product = products.find((p) => p.id === productId);
  
    if (!product) {
      detailContainer.innerHTML = `<p class="error">Ürün bulunamadı</p>`;
      return;
    }
  
    detailContainer.innerHTML = `
      <h2 data-cy="detail-name">${product.name}</h2>
      <p data-cy="detail-description">${product.description}</p>
      <p data-cy="detail-price">${formatPrice(product.price)}</p>
      <p data-cy="detail-stock">${product.stock > 0 ? `Stok: ${product.stock}` : "Stokta yok"}</p>
      <button
        data-cy="add-to-cart"
        ${product.stock === 0 ? "disabled" : ""}
      >
        Sepete Ekle
      </button>
    `;
  
    const addBtn = document.querySelector('[data-cy="add-to-cart"]');
    addBtn?.addEventListener("click", () => {
      addToCart(product);
      alert(`${product.name} sepete eklendi`);
    });
  }
  
  function calculateTotal(cart, couponApplied = false) {
    const total = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
    return couponApplied ? Math.round(total * 0.9) : total;
  }
  
  function renderCart(couponApplied = false) {
    const cartItemsContainer = document.getElementById("cart-items");
    const totalElement = document.querySelector('[data-cy="cart-total"]');
    const cart = getCart();
  
    if (!cartItemsContainer || !totalElement) return;
  
    if (cart.length === 0) {
      cartItemsContainer.innerHTML = `<p data-cy="empty-cart-message">Sepetiniz boş</p>`;
      totalElement.textContent = "Toplam: 0 TL";
      return;
    }
  
    cartItemsContainer.innerHTML = cart
      .map(
        (item) => `
      <div class="card" data-cy="cart-item-${item.id}">
        <h3 data-cy="cart-item-name-${item.id}">${item.name}</h3>
        <p data-cy="cart-item-price-${item.id}">${formatPrice(item.price)}</p>
        <p data-cy="cart-item-quantity-${item.id}">Adet: ${item.quantity}</p>
      </div>
    `
      )
      .join("");
  
    totalElement.textContent = `Toplam: ${calculateTotal(cart, couponApplied)} TL`;
  }
  
  function initCartPage() {
    const cartItems = document.getElementById("cart-items");
    if (!cartItems) return;
  
    if (!isLoggedIn()) {
      window.location.href = "./login.html";
      return;
    }
  
    let couponApplied = false;
    renderCart(couponApplied);
  
    const couponInput = document.getElementById("couponInput");
    const applyCouponBtn = document.getElementById("applyCouponBtn");
    const couponMessage = document.getElementById("couponMessage");
  
    applyCouponBtn?.addEventListener("click", () => {
      const coupon = couponInput.value.trim();
  
      if (coupon === "INDIRIM10") {
        couponApplied = true;
        couponMessage.textContent = "Kupon başarıyla uygulandı";
        couponMessage.className = "success";
        renderCart(couponApplied);
      } else {
        couponMessage.textContent = "Geçersiz kupon kodu";
        couponMessage.className = "error";
      }
    });
  }
  
  initLoginPage();
  initProductsPage();
  initProductDetailPage();
  initCartPage();