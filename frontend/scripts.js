const productList = document.getElementById("product-list");
const searchInput = document.getElementById("search");
const minPriceInput = document.getElementById("minPrice");
const maxPriceInput = document.getElementById("maxPrice");
const minScoreInput = document.getElementById("minScore");
const applyBtn = document.getElementById("applyFilters");

/**
 * Fetches products from backend and displays them.
 * If a query string is passed, filtered results are retrieved.
 */
function fetchAndDisplayProducts(query = "") {
  productList.innerHTML = ""; // clear previous cards

  fetch(`https://product-listing-task-kzem.onrender.com/products${query}`)
    .then(res => res.json())
    .then(products => {
      console.log("Fetched products:", products);

      if (products.length === 0) {
        productList.innerHTML = "<p>No products found.</p>";
        return;
      }

      products.forEach(product => {
        const card = createProductCard(product);
        productList.appendChild(card);
      });
    })
    .catch(err => {
      productList.innerHTML = "<p>Error loading products.</p>";
      console.error(err);
    });
}

function createStarRating(score) {
  const container = document.createElement("div");
  container.className = "stars";

  const fullStars = Math.floor(score);
  const hasHalfStar = score % 1 >= 0.25 && score % 1 < 0.75;
  const emptyStars = 5 - fullStars - (hasHalfStar ? 1 : 0);

  for (let i = 0; i < fullStars; i++) {
    const star = document.createElement("span");
    star.className = "star full";
    container.appendChild(star);
  }

  if (hasHalfStar) {
    const star = document.createElement("span");
    star.className = "star half";
    container.appendChild(star);
  }

  for (let i = 0; i < emptyStars; i++) {
    const star = document.createElement("span");
    star.className = "star empty";
    container.appendChild(star);
  }

  return container;
}

/**
 * Generates a product card element based on the product data.
 */
function createProductCard(product) {
  const card = document.createElement("div");
  card.className = "card";

  const img = document.createElement("img");
  img.src = product.images.yellow;

  const name = document.createElement("h3");
  name.textContent = product.name;

  const price = document.createElement("p");
  price.textContent = `$${product.price.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })} USD`;

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

  const rating = document.createElement("div");
  rating.className = "rating";
  rating.appendChild(createStarRating(product.popularityOutOf5));

  const scoreText = document.createElement("span");
  scoreText.textContent = ` ${product.popularityOutOf5}/5`;
  rating.appendChild(scoreText);

  card.appendChild(img);
  card.appendChild(name);
  card.appendChild(price);
  card.appendChild(colors);
  card.appendChild(label);
  card.appendChild(rating);

  return card;
}

/**
 * Converts color keys to hex color codes.
 */
function getColorHex(color) {
  return {
    yellow: "#E5CA97",
    white: "#D9D9D9",
    rose: "#E1AAA9",
  }[color];
}

/**
 * Converts color keys to readable labels.
 */
function getColorLabel(color) {
  return {
    yellow: "Yellow Gold",
    white: "White Gold",
    rose: "Rose Gold",
  }[color];
}

// Scroll with arrows
document.querySelector(".arrow.left").onclick = () => {
  productList.scrollBy({ left: -300, behavior: "smooth" });
};
document.querySelector(".arrow.right").onclick = () => {
  productList.scrollBy({ left: 300, behavior: "smooth" });
};

// Swipe support (desktop & mobile)
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
  const walk = (x - startX) * 2;
  productList.scrollLeft = scrollLeft - walk;
});

/**
 * When Apply Filters button is clicked, collects input values and builds query string.
 */
applyBtn.addEventListener("click", () => {
  const query = [];

  const minPrice = minPriceInput.value.trim();
  const maxPrice = maxPriceInput.value.trim();
  const minScore = minScoreInput.value.trim();

  if (minPrice !== "") query.push(`minPrice=${minPrice}`);
  if (maxPrice !== "") query.push(`maxPrice=${maxPrice}`);
  if (minScore !== "") query.push(`minScore=${minScore}`);

  const queryString = query.length > 0 ? `?${query.join("&")}` : "";
  fetchAndDisplayProducts(queryString);
});

/**
 * Filters currently displayed cards in the DOM based on the product name.
 */
searchInput.addEventListener("input", () => {
  const searchTerm = searchInput.value.toLowerCase();
  const cards = document.querySelectorAll(".card");
  cards.forEach(card => {
    const name = card.querySelector("h3").textContent.toLowerCase();
    card.style.display = name.includes(searchTerm) ? "block" : "none";
  });
});

// Load all products when page first loads
fetchAndDisplayProducts();
