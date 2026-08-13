async function testMarkdownGTX() {
  const markdownText = `# Trekking to Nanga Parbat

Nanga Parbat is the **ninth-highest mountain** in the world.

- Elevation: 8,126 meters
- Location: Diamer District, Gilgit-Baltistan, Pakistan

Read more at [our guide](https://ndsolotravel.com/destinations/nanga-parbat).`;

  const params = new URLSearchParams({
    client: "gtx",
    sl: "en",
    tl: "ur",
    dt: "t",
    q: markdownText
  });

  const res = await fetch("https://translate.googleapis.com/translate_a/single", {
    method: "POST",
    headers: {
      "Content-Type": "application/x-www-form-urlencoded"
    },
    body: params.toString()
  });

  const data = await res.json();
  if (Array.isArray(data) && Array.isArray(data[0])) {
    const translated = data[0].map(item => item ? item[0] : "").join("");
    console.log("Original:\n", markdownText);
    console.log("\nTranslated (Urdu):\n", translated);
  }
}

testMarkdownGTX();
