// Producten van Fernhout & Fernhout
//
// Om een nieuw product toe te voegen: kopieer een blok hieronder en pas aan.
// Om een foto te vervangen: zet het echte bestand in images/products/<slug>/
// met dezelfde bestandsnaam (printvel.svg, licht-uit.svg, licht-aan.svg
// mogen ook .jpg of .png worden, pas dan ook het pad hieronder aan).

const PRODUCTS = [
  {
    slug: "ring-blad",
    name: "Ring & Blad",
    description: "Handgemaakte lampenkap met een botanisch bladpatroon, geprint op transparant papier.",
    price: "€ 0,00",
    images: {
      printvel: "images/products/ring-blad/printvel.svg",
      lichtUit: "images/products/ring-blad/licht-uit.svg",
      lichtAan: "images/products/ring-blad/licht-aan.svg"
    }
  },
  {
    slug: "cirkel-tak",
    name: "Cirkel & Tak",
    description: "Geometrisch patroon van cirkels en takken, ontworpen om met licht tot leven te komen.",
    price: "€ 0,00",
    images: {
      printvel: "images/products/cirkel-tak/printvel.svg",
      lichtUit: "images/products/cirkel-tak/licht-uit.svg",
      lichtAan: "images/products/cirkel-tak/licht-aan.svg"
    }
  },
  {
    slug: "venster-varen",
    name: "Venster & Varen",
    description: "Fijn varenmotief dat overdag nauwelijks zichtbaar is en 's avonds volledig oplicht.",
    price: "€ 0,00",
    images: {
      printvel: "images/products/venster-varen/printvel.svg",
      lichtUit: "images/products/venster-varen/licht-uit.svg",
      lichtAan: "images/products/venster-varen/licht-aan.svg"
    }
  }
];
