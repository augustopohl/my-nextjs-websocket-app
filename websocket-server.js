// websocket-server.js
const express = require('express');
const expressWs = require('express-ws');
const cors = require('cors');

const app = express();
const wsInstance = expressWs(app);

app.use(cors({
  origin: '*'
}));

app.ws('/', (ws, req) => {
  console.log('Client connected to WebSocket');

  const intervalId = setInterval(() => {
    ws.send(Math.floor(Math.random() * (9999999 - 1000000 + 1)) + 1000000);
  }, 100);

  ws.on('close', () => {
    clearInterval(intervalId);
    console.log('Client disconnected from WebSocket');
  });
});

app.listen(8080, () => {
  console.log('Express server started on port 8080');
});
