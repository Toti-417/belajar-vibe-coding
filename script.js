const cartCount = document.getElementById('cart-count');
const searchInput = document.getElementById('search-input');
const exploreBtn = document.getElementById('explore-btn');
const categoryButtons = document.querySelectorAll('.category-item');
const products = document.querySelectorAll('.product-card');
let cartTotal = 0;

function updateCart(value = 0) {
  cartTotal += value;
  cartCount.textContent = cartTotal;
}

function filterProducts(filter) {
  const query = filter.toLowerCase();

  products.forEach((product) => {
    const title = product.querySelector('h3').textContent.toLowerCase();
    const category = product.dataset.category.toLowerCase();

    if (category === 'all' || title.includes(query) || category.includes(query)) {
      product.style.display = 'grid';
    } else {
      product.style.display = 'none';
    }
  });
}

searchInput.addEventListener('input', (event) => {
  filterProducts(event.target.value);
  categoryButtons.forEach((button) => button.classList.remove('active'));
});

categoryButtons.forEach((button) => {
  button.addEventListener('click', () => {
    categoryButtons.forEach((btn) => btn.classList.remove('active'));
    button.classList.add('active');

    const category = button.dataset.category;

    products.forEach((product) => {
      if (category === 'all' || product.dataset.category === category) {
        product.style.display = 'grid';
      } else {
        product.style.display = 'none';
      }
    });
  });
});

products.forEach((product) => {
  const button = product.querySelector('.add-button');
  button.addEventListener('click', () => {
    updateCart(1);
    button.textContent = 'Berhasil ditambahkan';
    button.disabled = true;
    setTimeout(() => {
      button.textContent = 'Tambah ke Keranjang';
      button.disabled = false;
    }, 1200);
  });
});

exploreBtn.addEventListener('click', () => {
  document.getElementById('product-grid').scrollIntoView({ behavior: 'smooth' });
});
