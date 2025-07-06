const productList = document.getElementById("product-list");

fetch("http://localhost:3000/products") // senin backend'in bu portta çalışıyorsa
  .then(res => res.json())
  .then(products => {
    products.forEach(product => {
      const card = createProductCard(product);
      productList.appendChild(card);
    });
  });

function createProductCard(product) {
  const card = document.createElement("div");
  card.className = "card";

  const img = document.createElement("img");
  img.src = product.images.yellow;

  const name = document.createElement("h3");
  name.textContent = product.name;

  const price = document.createElement("p");
  price.textContent = `$${product.price.toFixed(2)} USD`;

  const colors = document.createElement("div");
  colors.className = "color-picker";

  ["yellow", "white", "rose"].forEach(color => {
    const btn = document.createElement("button");
    btn.style.backgroundColor = getColorHex(color);
    btn.onclick = () => {
      img.src = product.images[color];
      label.textContent = getColorLabel(color);
    };
    colors.appendChild(btn);
  });

  const label = document.createElement("p");
  label.textContent = "Yellow Gold";

  const rating = document.createElement("p");
  rating.innerHTML = `<span class="stars">★</span> ${product.popularityOutOf5}/5`;

  card.appendChild(img);
  card.appendChild(name);
  card.appendChild(price);
  card.appendChild(colors);
  card.appendChild(label);
  card.appendChild(rating);

  return card;
}

function getColorHex(color) {
  return {
    yellow: "#E5CA97",
    white: "#D9D9D9",
    rose: "#E1AAA9",
  }[color];
}

function getColorLabel(color) {
  return {
    yellow: "Yellow Gold",
    white: "White Gold",
    rose: "Rose Gold",
  }[color];
}

// Carousel scroll
document.querySelector(".arrow.left").onclick = () => {
  productList.scrollBy({ left: -300, behavior: "smooth" });
};

document.querySelector(".arrow.right").onclick = () => {
  productList.scrollBy({ left: 300, behavior: "smooth" });
};

// swipe support (mobile)
let isDown = false;
let startX;
let scrollLeft;

productList.addEventListener('mousedown', (e) => {
  isDown = true;
  productList.classList.add('active');
  startX = e.pageX - productList.offsetLeft;
  scrollLeft = productList.scrollLeft;
});
productList.addEventListener('mouseleave', () => {
  isDown = false;
  productList.classList.remove('active');
});
productList.addEventListener('mouseup', () => {
  isDown = false;
  productList.classList.remove('active');
});
productList.addEventListener('mousemove', (e) => {
  if (!isDown) return;
  e.preventDefault();
  const x = e.pageX - productList.offsetLeft;
  const walk = (x - startX) * 2; // hız
  productList.scrollLeft = scrollLeft - walk;
});

const searchInput = document.getElementById("search");
const minPriceInput = document.getElementById("minPrice");
const maxPriceInput = document.getElementById("maxPrice");
const minScoreInput = document.getElementById("minScore");
const applyBtn = document.getElementById("applyFilters");

applyBtn.addEventListener("click", () => {
  const query = [];

  if (minPriceInput.value) query.push(`minPrice=${minPriceInput.value}`);
  if (maxPriceInput.value) query.push(`maxPrice=${maxPriceInput.value}`);
  if (minScoreInput.value) query.push(`minScore=${minScoreInput.value}`);

  fetchAndDisplayProducts(`?${query.join("&")}`);
});

searchInput.addEventListener("input", () => {
  const searchTerm = searchInput.value.toLowerCase();
  const cards = document.querySelectorAll(".card");
  cards.forEach(card => {
    const name = card.querySelector("h3").textContent.toLowerCase();
    card.style.display = name.includes(searchTerm) ? "block" : "none";
  });
});

function fetchAndDisplayProducts(query = "") {
  productList.innerHTML = ""; // önce temizle
}

// Sayfa açıldığında çağır
fetchAndDisplayProducts();


