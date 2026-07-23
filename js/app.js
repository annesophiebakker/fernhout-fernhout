function renderProducts() {
  const catalog = document.getElementById("catalog");

  PRODUCTS.forEach((product) => {
    const card = document.createElement("div");
    card.className = "card";

    card.innerHTML = `
      <div class="card-images">
        <div class="printvel-cell">
          <img src="${product.images.printvel}" alt="Printvel van ${product.name}" />
        </div>
        <img class="shade-img" src="${product.images.lichtUit}" alt="${product.name}, licht uit" data-off="${product.images.lichtUit}" data-on="${product.images.lichtAan}" />
        <img class="shade-img-placeholder" src="${product.images.lichtAan}" alt="${product.name}, licht aan" style="display:none;" />
      </div>
      <div class="toggle-row">
        <button class="light-off active" type="button">Licht uit</button>
        <button class="light-on" type="button">Licht aan</button>
      </div>
      <div class="card-body">
        <h2>${product.name}</h2>
        <p>${product.description}</p>
        <div class="price">${product.price}</div>
        <button class="buy-button" type="button">Bestellen</button>
      </div>
    `;

    const shadeImg = card.querySelector(".shade-img");
    const offBtn = card.querySelector(".light-off");
    const onBtn = card.querySelector(".light-on");

    offBtn.addEventListener("click", () => {
      shadeImg.src = shadeImg.dataset.off;
      offBtn.classList.add("active");
      onBtn.classList.remove("active");
    });

    onBtn.addEventListener("click", () => {
      shadeImg.src = shadeImg.dataset.on;
      onBtn.classList.add("active");
      offBtn.classList.remove("active");
    });

    const buyButton = card.querySelector(".buy-button");
    buyButton.addEventListener("click", () => startCheckout(product));

    catalog.appendChild(card);
  });
}

async function startCheckout(product) {
  try {
    const response = await fetch("/api/create-payment", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ slug: product.slug, name: product.name, price: product.price })
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

document.addEventListener("DOMContentLoaded", renderProducts);
