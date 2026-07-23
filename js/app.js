function renderProducts({ featuredOnly = false } = {}) {
  const catalog = document.getElementById("catalog");
  const list = featuredOnly ? PRODUCTS.filter((p) => p.featured) : PRODUCTS;

  list.forEach((product) => {
    const card = document.createElement("div");
    card.className = "card";

    card.innerHTML = `
      <div class="card-images">
        <div class="printvel-cell">
          <img src="${product.images.printvel}" alt="Printvel van ${product.name}" />
        </div>
        <img class="shade-img" src="${product.images.lichtUit}" alt="${product.name}, licht uit" data-off="${product.images.lichtUit}" data-on="${product.images.lichtAan}" />
      </div>
      <div class="switch-row">
        <button class="light-switch" type="button" aria-pressed="false" aria-label="Licht aan of uit zetten">
          <span class="switch-track"><span class="switch-thumb"></span></span>
        </button>
        <span class="switch-label">Licht uit</span>
      </div>
      <div class="card-body">
        <h2 class="product-name-link">${product.name}</h2>
        <div class="options">
          <label>Diameter
            <select class="opt-diameter">
              ${product.options.diameters.map((d) => `<option>${d}</option>`).join("")}
            </select>
          </label>
          <label>Hoogte
            <select class="opt-height">
              ${product.options.heights.map((h) => `<option>${h}</option>`).join("")}
            </select>
          </label>
        </div>
        <div class="price">${product.price}</div>
        <button class="buy-button" type="button">Bestellen</button>
      </div>
    `;

    const shadeImg = card.querySelector(".shade-img");
    const switchButton = card.querySelector(".light-switch");
    const switchLabel = card.querySelector(".switch-label");

    switchButton.addEventListener("click", () => {
      const isOn = switchButton.getAttribute("aria-pressed") === "true";
      const turningOn = !isOn;
      switchButton.setAttribute("aria-pressed", String(turningOn));
      switchButton.classList.toggle("on", turningOn);
      shadeImg.src = turningOn ? shadeImg.dataset.on : shadeImg.dataset.off;
      switchLabel.textContent = turningOn ? "Licht aan" : "Licht uit";
    });

    const buyButton = card.querySelector(".buy-button");
    buyButton.addEventListener("click", () => {
      const chosenOptions = {
        diameter: card.querySelector(".opt-diameter").value,
        height: card.querySelector(".opt-height").value
      };
      startCheckout(product, chosenOptions);
    });

    const nameLink = card.querySelector(".product-name-link");
    nameLink.addEventListener("click", () => openProductModal(product));

    catalog.appendChild(card);
  });
}

async function startCheckout(product, chosenOptions) {
  try {
    const response = await fetch("/api/create-payment", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        slug: product.slug,
        name: product.name,
        price: product.price,
        options: chosenOptions
      })
    });

    if (!response.ok) {
      alert("Bestellen lukt nu nog niet, de betaalkoppeling moet nog worden aangesloten (Mollie API key).");
      return;
    }

    const data = await response.json();
    if (data.checkoutUrl) {
      window.location.href = data.checkoutUrl;
    }
  } catch (err) {
    alert("Bestellen lukt nu nog niet, de betaalkoppeling moet nog worden aangesloten (Mollie API key).");
  }
}

function openProductModal(product) {
  const existing = document.querySelector(".modal-backdrop");
  if (existing) existing.remove();

  const paletteHtml = product.palette
    ? `
      <div class="modal-colors">
        <span class="modal-colors-label">Gebruikte kleuren</span>
        <div class="color-chips">
          ${product.palette
            .map(
              (c) => `
            <span class="color-chip">
              <span class="color-dot" style="background:${c.hex}"></span>${c.name}
            </span>
          `
            )
            .join("")}
        </div>
      </div>
    `
    : `
      <div class="modal-colors">
        <span class="modal-colors-label">Gebruikte kleuren</span>
        <p class="modal-colors-pending">Foto's en kleuren volgen zodra dit ontwerp is gefotografeerd.</p>
      </div>
    `;

  const backdrop = document.createElement("div");
  backdrop.className = "modal-backdrop";
  backdrop.innerHTML = `
    <div class="modal-card">
      <button class="modal-close" type="button" aria-label="Sluiten">&times;</button>
      <div class="modal-media">
        <div class="modal-breadcrumb">Shop / ${product.name}</div>
        <img class="modal-shade-img" src="${product.images.lichtUit}" data-off="${product.images.lichtUit}" data-on="${product.images.lichtAan}" alt="${product.name}" />
        <div class="switch-row">
          <button class="light-switch modal-light-switch" type="button" aria-pressed="false" aria-label="Licht aan of uit zetten">
            <span class="switch-track"><span class="switch-thumb"></span></span>
          </button>
          <span class="switch-label">Licht uit</span>
        </div>
      </div>
      <div class="modal-info">
        <h2>${product.name}</h2>
        <p class="modal-description">${product.description}</p>
        ${paletteHtml}
        <div class="options">
          <label>Diameter
            <select class="opt-diameter">
              ${product.options.diameters.map((d) => `<option>${d}</option>`).join("")}
            </select>
          </label>
          <label>Hoogte
            <select class="opt-height">
              ${product.options.heights.map((h) => `<option>${h}</option>`).join("")}
            </select>
          </label>
        </div>
        <div class="price">${product.price}</div>
        <button class="buy-button modal-buy-button" type="button">Bestellen</button>
      </div>
    </div>
  `;

  document.body.appendChild(backdrop);
  document.body.style.overflow = "hidden";

  const shadeImg = backdrop.querySelector(".modal-shade-img");
  const switchButton = backdrop.querySelector(".modal-light-switch");
  const switchLabel = backdrop.querySelector(".switch-label");

  switchButton.addEventListener("click", () => {
    const isOn = switchButton.getAttribute("aria-pressed") === "true";
    const turningOn = !isOn;
    switchButton.setAttribute("aria-pressed", String(turningOn));
    switchButton.classList.toggle("on", turningOn);
    shadeImg.src = turningOn ? shadeImg.dataset.on : shadeImg.dataset.off;
    switchLabel.textContent = turningOn ? "Licht aan" : "Licht uit";
  });

  backdrop.querySelector(".modal-buy-button").addEventListener("click", () => {
    const chosenOptions = {
      diameter: backdrop.querySelector(".opt-diameter").value,
      height: backdrop.querySelector(".opt-height").value
    };
    startCheckout(product, chosenOptions);
  });

  function closeModal() {
    backdrop.remove();
    document.body.style.overflow = "";
  }

  backdrop.querySelector(".modal-close").addEventListener("click", closeModal);
  backdrop.addEventListener("click", (e) => {
    if (e.target === backdrop) closeModal();
  });
  document.addEventListener("keydown", function escHandler(e) {
    if (e.key === "Escape") {
      closeModal();
      document.removeEventListener("keydown", escHandler);
    }
  });
}

function initMobileMenu() {
  const hamburger = document.querySelector(".hamburger");
  const mobileMenu = document.querySelector(".mobile-menu");
  if (!hamburger || !mobileMenu) return;

  hamburger.addEventListener("click", () => {
    const isOpen = mobileMenu.classList.toggle("open");
    hamburger.setAttribute("aria-expanded", String(isOpen));
  });

  mobileMenu.querySelectorAll("a").forEach((link) => {
    link.addEventListener("click", () => {
      mobileMenu.classList.remove("open");
      hamburger.setAttribute("aria-expanded", "false");
    });
  });
}

document.addEventListener("DOMContentLoaded", () => {
  const isShopPage = document.body.dataset.page === "shop";
  renderProducts({ featuredOnly: !isShopPage });
  initMobileMenu();
});
