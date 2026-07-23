// Producten van Fernhout & Fernhout
//
// Om een nieuw product toe te voegen: kopieer een blok hieronder en pas aan.
// Om een foto te vervangen: zet het echte bestand in images/products/<slug>/
// met dezelfde bestandsnaam (printvel.svg, licht-uit.svg, licht-aan.svg
// mogen ook .jpg of .png worden, pas dan ook het pad hieronder aan).

const PRODUCT_OPTIONS = {
  colors: ["Naturel", "Bordeaux", "Antraciet"],
  diameters: ["20 cm", "25 cm", "30 cm"],
  heights: ["18 cm", "22 cm", "26 cm"]
};

const PRODUCTS = [
  {
    slug: "ring-blad",
    name: "Nico",
    description: "Handgemaakte lampenkap met een botanisch bladpatroon, geprint op transparant papier.",
    price: "€ 0,00",
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
    options: PRODUCT_OPTIONS,
    images: {
      printvel: "images/products/venster-varen/printvel.svg",
      lichtUit: "images/products/venster-varen/licht-uit.svg",
      lichtAan: "images/products/venster-varen/licht-aan.svg"
    }
  }
];
