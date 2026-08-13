async function testGTX() {
  const params = new URLSearchParams({
    client: "gtx",
    sl: "en",
    tl: "es",
    dt: "t",
    q: "Hello world! This is a test of long blog post content translation."
  });

  const res = await fetch("https://translate.googleapis.com/translate_a/single", {
    method: "POST",
    headers: {
      "Content-Type": "application/x-www-form-urlencoded"
    },
    body: params.toString()
  });

  const data = await res.json();
  console.log("Status:", res.status);
  console.log("Result:", JSON.stringify(data[0]));
}

testGTX();
