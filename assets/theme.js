document.addEventListener('DOMContentLoaded', function () {
  /* ---------------- Menu mobile ---------------- */
  var mobileMenu = document.querySelector('[data-mobile-menu]');
  document.querySelectorAll('[data-mobile-menu-toggle]').forEach(function (btn) {
    btn.addEventListener('click', function () {
      mobileMenu.classList.add('is-open');
      mobileMenu.setAttribute('aria-hidden', 'false');
    });
  });
  document.querySelectorAll('[data-mobile-menu-close]').forEach(function (btn) {
    btn.addEventListener('click', function () {
      mobileMenu.classList.remove('is-open');
      mobileMenu.setAttribute('aria-hidden', 'true');
    });
  });

  /* ---------------- Busca ---------------- */
  var searchPanel = document.querySelector('[data-search-panel]');
  document.querySelectorAll('[data-search-toggle]').forEach(function (btn) {
    btn.addEventListener('click', function () {
      var isHidden = searchPanel.hasAttribute('hidden');
      if (isHidden) {
        searchPanel.removeAttribute('hidden');
        var input = searchPanel.querySelector('input');
        if (input) input.focus();
      } else {
        searchPanel.setAttribute('hidden', '');
      }
    });
  });

  /* ---------------- Drawer da sacola ---------------- */
  var cartDrawer = document.querySelector('[data-cart-drawer]');

  function openCartDrawer() {
    cartDrawer.classList.add('is-open');
    cartDrawer.setAttribute('aria-hidden', 'false');
    refreshCartDrawer();
  }
  function closeCartDrawer() {
    cartDrawer.classList.remove('is-open');
    cartDrawer.setAttribute('aria-hidden', 'true');
  }
  document.querySelectorAll('[data-cart-drawer-open]').forEach(function (btn) {
    btn.addEventListener('click', function (e) {
      e.preventDefault();
      openCartDrawer();
    });
  });
  document.querySelectorAll('[data-cart-drawer-close]').forEach(function (btn) {
    btn.addEventListener('click', closeCartDrawer);
  });

  function moneyFormat(cents) {
    return 'R$ ' + (cents / 100).toFixed(2).replace('.', ',');
  }

  function renderCartItems(cart) {
    var container = document.getElementById('cart-drawer-items');
    var subtotalEl = document.getElementById('cart-drawer-subtotal');
    if (!container) return;

    if (!cart.items.length) {
      container.innerHTML = '<div class="cart-drawer__empty">Sua sacola está vazia.</div>';
    } else {
      container.innerHTML = cart.items.map(function (item) {
        var img = item.image ? '<img src="' + item.image + '" alt="">' : '';
        return (
          '<div class="cart-drawer__item">' +
          img +
          '<div><div>' + item.product_title + '</div>' +
          '<div>' + item.quantity + ' &times; ' + moneyFormat(item.price) + '</div></div>' +
          '</div>'
        );
      }).join('');
    }

    if (subtotalEl) subtotalEl.textContent = moneyFormat(cart.total_price);

    document.querySelectorAll('[data-cart-count]').forEach(function (el) {
      el.textContent = cart.item_count;
    });
  }

  function refreshCartDrawer() {
    fetch('/cart.js')
      .then(function (res) { return res.json(); })
      .then(renderCartItems)
      .catch(function () {});
  }

  /* ---------------- Adicionar ao carrinho (AJAX) ---------------- */
  document.querySelectorAll('[data-add-to-cart]').forEach(function (button) {
    var form = button.closest('form');
    if (!form) return;

    form.addEventListener('submit', function (e) {
      e.preventDefault();
      var formData = new FormData(form);

      fetch('/cart/add.js', {
        method: 'POST',
        headers: { Accept: 'application/json' },
        body: formData
      })
        .then(function (res) { return res.json(); })
        .then(function () {
          openCartDrawer();
        })
        .catch(function () {
          form.submit();
        });
    });
  });

  /* ---------------- Slideshow do hero ---------------- */
  document.querySelectorAll('[data-hero]').forEach(function (hero) {
    var slides = hero.querySelectorAll('[data-hero-slide]');
    var dots = hero.querySelectorAll('[data-hero-dot]');
    if (slides.length < 2) return;

    var current = 0;
    var autoplay = hero.getAttribute('data-autoplay') === 'true';
    var speed = (parseInt(hero.getAttribute('data-autoplay-speed'), 10) || 5) * 1000;
    var timer;

    function goTo(index) {
      slides[current].classList.remove('is-active');
      if (dots[current]) dots[current].classList.remove('is-active');
      current = (index + slides.length) % slides.length;
      slides[current].classList.add('is-active');
      if (dots[current]) dots[current].classList.add('is-active');
    }

    function startAutoplay() {
      if (!autoplay) return;
      timer = setInterval(function () { goTo(current + 1); }, speed);
    }
    function stopAutoplay() {
      clearInterval(timer);
    }

    var prevBtn = hero.querySelector('[data-hero-prev]');
    var nextBtn = hero.querySelector('[data-hero-next]');
    if (prevBtn) prevBtn.addEventListener('click', function () { stopAutoplay(); goTo(current - 1); startAutoplay(); });
    if (nextBtn) nextBtn.addEventListener('click', function () { stopAutoplay(); goTo(current + 1); startAutoplay(); });
    dots.forEach(function (dot, i) {
      dot.addEventListener('click', function () { stopAutoplay(); goTo(i); startAutoplay(); });
    });

    startAutoplay();
  });

  /* ---------------- Galeria de imagens do produto ---------------- */
  document.querySelectorAll('[data-thumb]').forEach(function (thumb) {
    thumb.addEventListener('click', function () {
      var mainImage = document.getElementById('ProductMainImage');
      if (mainImage) mainImage.src = thumb.getAttribute('data-full');
      document.querySelectorAll('[data-thumb]').forEach(function (t) { t.classList.remove('is-active'); });
      thumb.classList.add('is-active');
    });
  });

  /* ---------------- Seletor de variante ---------------- */
  var productJsonEl = document.querySelector('[data-product-json]');
  if (productJsonEl) {
    var product = JSON.parse(productJsonEl.textContent);
    var selectors = document.querySelectorAll('[data-option-selector]');
    var variantInput = document.querySelector('[data-variant-id]');
    var priceEl = document.querySelector('[data-product-price]');

    function updateVariant() {
      var selectedOptions = Array.prototype.map.call(selectors, function (s) { return s.value; });
      var match = product.variants.find(function (variant) {
        return variant.options.every(function (opt, i) { return opt === selectedOptions[i]; });
      });
      if (!match) return;

      if (variantInput) variantInput.value = match.id;
      if (priceEl) {
        priceEl.innerHTML = match.compare_at_price && match.compare_at_price > match.price
          ? '<s>' + moneyFormat(match.compare_at_price) + '</s> <span class="price--sale">' + moneyFormat(match.price) + '</span>'
          : '<span>' + moneyFormat(match.price) + '</span>';
      }
      if (match.featured_image) {
        var mainImage = document.getElementById('ProductMainImage');
        if (mainImage) mainImage.src = match.featured_image.src;
      }
    }

    selectors.forEach(function (select) {
      select.addEventListener('change', updateVariant);
    });
  }
});
