// Serves the page and passes the Google Maps key from the GOOGLE_MAPS_API_KEY environment variable.
const http = require("http");
const fs = require("fs");
const path = require("path");

const PORT = process.env.PORT || 3000;
const KEY = process.env.GOOGLE_MAPS_API_KEY || "";

http.createServer((req, res) => {
  const url = req.url.split("?")[0];

  if (url === "/config.js") {
    res.writeHead(200, { "Content-Type": "application/javascript", "Cache-Control": "no-store" });
    res.end(`window.GOOGLE_MAPS_API_KEY = ${JSON.stringify(KEY)};`);
  } else if (url === "/" || url === "/index.html") {
    res.writeHead(200, { "Content-Type": "text/html; charset=utf-8" });
    fs.createReadStream(path.join(__dirname, "index.html")).pipe(res);
  } else {
    res.writeHead(404, { "Content-Type": "text/plain" });
    res.end("Not found");
  }
}).listen(PORT, "0.0.0.0", () => console.log(`Listening on port ${PORT}`));
