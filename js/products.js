// Producten van Fernhout & Fernhout
//
// Om een nieuw product toe te voegen: kopieer een blok hieronder en pas aan.
// Om een foto te vervangen: zet het echte bestand in images/products/<slug>/
// met dezelfde bestandsnaam (printvel.svg, licht-uit.svg, licht-aan.svg
// mogen ook .jpg of .png worden, pas dan ook het pad hieronder aan).
//
// "featured: true" zorgt dat een product ook op de homepage verschijnt.
// Nieuwe producten zonder "featured: true" verschijnen automatisch alleen
// op de volledige shop-pagina (shop.html), niet op de homepage.

const PRODUCT_OPTIONS = {
  diameters: ["20 cm", "25 cm", "30 cm"],
  heights: ["18 cm", "22 cm", "26 cm"]
};

const PRODUCTS = [
  {
    slug: "ring-blad",
    name: "Nico",
    description: "Handgemaakte lampenkap met een botanisch bladpatroon, geprint op transparant papier.",
    price: "€ 0,00",
    featured: true,
    palette: [
      { name: "Roestbruin", hex: "#8a5a3c" },
      { name: "Zandbeige", hex: "#d8c9a3" },
      { name: "Leigrijs", hex: "#6b7280" }
    ],
    options: PRODUCT_OPTIONS,
    images: {
      printvel: "images/products/ring-blad/printvel.svg",
      lichtUit: "images/products/ring-blad/licht-uit.jpg",
      lichtAan: "images/products/ring-blad/licht-aan.jpg"
    }
  },
  {
    slug: "cirkel-tak",
    name: "Hermine",
    description: "Geometrisch patroon van cirkels en takken, ontworpen om met licht tot leven te komen.",
    price: "€ 0,00",
    featured: true,
    options: PRODUCT_OPTIONS,
    images: {
      printvel: "images/products/cirkel-tak/printvel.svg",
      lichtUit: "images/products/cirkel-tak/licht-uit.svg",
      lichtAan: "images/products/cirkel-tak/licht-aan.svg"
    }
  },
  {
    slug: "venster-varen",
    name: "Thora",
    description: "Fijn varenmotief dat overdag nauwelijks zichtbaar is en 's avonds volledig oplicht.",
    price: "€ 0,00",
    featured: true,
    options: PRODUCT_OPTIONS,
    images: {
      printvel: "images/products/venster-varen/printvel.svg",
      lichtUit: "images/products/venster-varen/licht-uit.svg",
      lichtAan: "images/products/venster-varen/licht-aan.svg"
    }
  },
  {
    slug: "ecky",
    name: "Ecky",
    description: "Handgemaakt, uniek patroon, geprint op transparant papier.",
    price: "€ 0,00",
    options: PRODUCT_OPTIONS,
    images: {
      printvel: "images/products/ecky/printvel.svg",
      lichtUit: "images/products/ecky/licht-uit.svg",
      lichtAan: "images/products/ecky/licht-aan.svg"
    }
  },
  {
    slug: "myra",
    name: "Myra",
    description: "Handgemaakt, uniek patroon, geprint op transparant papier.",
    price: "€ 0,00",
    options: PRODUCT_OPTIONS,
    images: {
      printvel: "images/products/myra/printvel.svg",
      lichtUit: "images/products/myra/licht-uit.svg",
      lichtAan: "images/products/myra/licht-aan.svg"
    }
  },
  {
    slug: "lietje",
    name: "Lietje",
    description: "Handgemaakt, uniek patroon, geprint op transparant papier.",
    price: "€ 0,00",
    options: PRODUCT_OPTIONS,
    images: {
      printvel: "images/products/lietje/printvel.svg",
      lichtUit: "images/products/lietje/licht-uit.svg",
      lichtAan: "images/products/lietje/licht-aan.svg"
    }
  },
  {
    slug: "carel",
    name: "Carel",
    description: "Handgemaakt, uniek patroon, geprint op transparant papier.",
    price: "€ 0,00",
    options: PRODUCT_OPTIONS,
    images: {
      printvel: "images/products/carel/printvel.svg",
      lichtUit: "images/products/carel/licht-uit.svg",
      lichtAan: "images/products/carel/licht-aan.svg"
    }
  },
  {
    slug: "margie",
    name: "Margie",
    description: "Handgemaakt, uniek patroon, geprint op transparant papier.",
    price: "€ 0,00",
    options: PRODUCT_OPTIONS,
    images: {
      printvel: "images/products/margie/printvel.svg",
      lichtUit: "images/products/margie/licht-uit.svg",
      lichtAan: "images/products/margie/licht-aan.svg"
    }
  },
  {
    slug: "henriette",
    name: "Henriëtte",
    description: "Handgemaakt, uniek patroon, geprint op transparant papier.",
    price: "€ 0,00",
    options: PRODUCT_OPTIONS,
    images: {
      printvel: "images/products/henriette/printvel.svg",
      lichtUit: "images/products/henriette/licht-uit.svg",
      lichtAan: "images/products/henriette/licht-aan.svg"
    }
  }
];
