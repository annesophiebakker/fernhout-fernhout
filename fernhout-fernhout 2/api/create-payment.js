// POST /api/create-payment
// Body: { slug, name, price }
//
// Vereist environment variable MOLLIE_API_KEY in Vercel
// (Vercel dashboard -> project -> Settings -> Environment Variables).
// Gebruik eerst de TEST API key (begint met "test_"), later de live key.

module.exports = async function handler(req, res) {
  if (req.method !== "POST") {
    res.status(405).json({ error: "Method not allowed" });
    return;
  }

  const apiKey = process.env.MOLLIE_API_KEY;
  if (!apiKey) {
    res.status(500).json({ error: "MOLLIE_API_KEY ontbreekt in de environment variables" });
    return;
  }

  const { slug, name, price } = req.body || {};

  if (!slug || !name || !price) {
    res.status(400).json({ error: "slug, name en price zijn verplicht" });
    return;
  }

  // Verwacht price als "€ 12,50" of "12.50" - haal er een geldig bedrag uit.
  const numericPrice = String(price)
    .replace(/[^\d,.-]/g, "")
    .replace(",", ".");
  const amount = parseFloat(numericPrice);

  if (isNaN(amount) || amount <= 0) {
    res.status(400).json({ error: "Ongeldige prijs, zet een echt bedrag in products.js" });
    return;
  }

  const origin = `https://${req.headers.host}`;

  try {
    const mollieResponse = await fetch("https://api.mollie.com/v2/payments", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${apiKey}`,
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        amount: {
          currency: "EUR",
          value: amount.toFixed(2)
        },
        description: `Bestelling: ${name}`,
        redirectUrl: `${origin}/?bestelling=${encodeURIComponent(slug)}`,
        webhookUrl: `${origin}/api/webhook`,
        metadata: { slug }
      })
    });

    const data = await mollieResponse.json();

    if (!mollieResponse.ok) {
      res.status(502).json({ error: "Mollie API fout", details: data });
      return;
    }

    res.status(200).json({
      checkoutUrl: data._links.checkout.href,
      paymentId: data.id
    });
  } catch (err) {
    res.status(500).json({ error: "Kon geen verbinding maken met Mollie" });
  }
};
