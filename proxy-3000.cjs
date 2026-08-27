const http = require('http');
const net = require('net');

const TARGET_PORT = 3001;
const PROXY_PORT = 3000;

const server = http.createServer((req, res) => {
  const targetHeaders = { ...req.headers };
  targetHeaders.host = `localhost:${TARGET_PORT}`;

  if (targetHeaders.origin) {
    targetHeaders.origin = targetHeaders.origin.replace(`:${PROXY_PORT}`, `:${TARGET_PORT}`);
  }
  if (targetHeaders.referer) {
    targetHeaders.referer = targetHeaders.referer.replace(`:${PROXY_PORT}`, `:${TARGET_PORT}`);
  }

  const options = {
    hostname: '127.0.0.1',
    port: TARGET_PORT,
    path: req.url,
    method: req.method,
    headers: targetHeaders,
  };

  const proxyReq = http.request(options, (proxyRes) => {
    const resHeaders = { ...proxyRes.headers };
    if (resHeaders.location) {
      resHeaders.location = resHeaders.location.replace(`:${TARGET_PORT}`, `:${PROXY_PORT}`);
    }
    res.writeHead(proxyRes.statusCode, resHeaders);
    proxyRes.pipe(res);
  });

  proxyReq.on('error', (err) => {
    if (!res.headersSent) {
      res.writeHead(502, { 'Content-Type': 'text/plain' });
      res.end('Proxy Error: ' + err.message);
    }
  });

  req.pipe(proxyReq);
});

// Full WebSocket support for Vite HMR
server.on('upgrade', (req, clientSocket, head) => {
  const targetSocket = net.connect(TARGET_PORT, '127.0.0.1', () => {
    let headersText = `${req.method} ${req.url} HTTP/${req.httpVersion}\r\n`;
    for (let i = 0; i < req.rawHeaders.length; i += 2) {
      let key = req.rawHeaders[i];
      let val = req.rawHeaders[i + 1];
      if (key.toLowerCase() === 'host') {
        val = `localhost:${TARGET_PORT}`;
      } else if (key.toLowerCase() === 'origin') {
        val = val.replace(`:${PROXY_PORT}`, `:${TARGET_PORT}`);
      }
      headersText += `${key}: ${val}\r\n`;
    }
    headersText += '\r\n';
    targetSocket.write(headersText);
    if (head && head.length > 0) {
      targetSocket.write(head);
    }
    targetSocket.pipe(clientSocket);
    clientSocket.pipe(targetSocket);
  });

  targetSocket.on('error', () => clientSocket.destroy());
  clientSocket.on('error', () => targetSocket.destroy());
});

server.listen(PROXY_PORT, '0.0.0.0', () => {
  console.log(`Port ${PROXY_PORT} proxying to ${TARGET_PORT} with WebSocket & Origin rewriting support`);
});
