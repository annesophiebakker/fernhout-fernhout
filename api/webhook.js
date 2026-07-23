// POST /api/webhook
// Mollie stuurt hier naartoe met { id: "tr_xxx" } zodra een betaling van status verandert.
// Wij moeten vervolgens zelf de actuele status opvragen bij Mollie (nooit de status
// uit een webhook-body vertrouwen, altijd opnieuw ophalen).

module.exports = async function handler(req, res) {
  if (req.method !== "POST") {
    res.status(405).end();
    return;
  }

  const apiKey = process.env.MOLLIE_API_KEY;
  const { id } = req.body || {};

  if (!apiKey || !id) {
    res.status(400).end();
    return;
  }

  try {
    const mollieResponse = await fetch(`https://api.mollie.com/v2/payments/${id}`, {
      headers: { Authorization: `Bearer ${apiKey}` }
    });
    const payment = await mollieResponse.json();

    // TODO: vervang deze console.log door het wegschrijven van de order
    // (bijvoorbeeld naar Supabase of een Google Sheet), gebruik makend van
    // payment.status ("paid", "failed", "expired", "canceled", ...),
    // payment.metadata.slug en payment.amount.
    console.log("Mollie betaalstatus:", payment.status, payment.metadata);

    res.status(200).end();
  } catch (err) {
    res.status(500).end();
  }
};
