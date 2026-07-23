// Vercel Edge Middleware - zet een simpel wachtwoord-slot op de hele site.
//
// Werkt op het gratis Hobby-plan, geen betaalde Vercel-functie nodig.
//
// Instellen: zet in Vercel -> Settings -> Environment Variables twee waardes:
//   SITE_USER   (bijvoorbeeld: fernhout)
//   SITE_PASS   (een wachtwoord naar keuze)
// en klik daarna op Redeploy.
//
// Verwijderen zodra de site echt live mag: verwijder dit bestand (of de
// SITE_PASS variabele) en deploy opnieuw.

export const config = {
  matcher: "/((?!api/webhook).*)"
};

export default function middleware(request) {
  const expectedUser = process.env.SITE_USER || "fernhout";
  const expectedPass = process.env.SITE_PASS;

  // Als er geen wachtwoord is ingesteld, laat de site gewoon door
  // (voorkomt dat je jezelf per ongeluk buitensluit voordat SITE_PASS bestaat).
  if (!expectedPass) {
    return;
  }

  const authHeader = request.headers.get("authorization");

  if (authHeader && authHeader.startsWith("Basic ")) {
    const encoded = authHeader.slice(6);
    const decoded = atob(encoded);
    const separatorIndex = decoded.indexOf(":");
    const user = decoded.slice(0, separatorIndex);
    const pass = decoded.slice(separatorIndex + 1);

    if (user === expectedUser && pass === expectedPass) {
      return;
    }
  }

  return new Response("Authenticatie vereist", {
    status: 401,
    headers: {
      "WWW-Authenticate": 'Basic realm="Fernhout & Fernhout - nog niet live"'
    }
  });
}
