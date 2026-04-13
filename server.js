const express = require("express");
const app = express();
const http = require("http");
const { Socket } = require("socket.io");
const server = http.createServer(app);
const io = require("socket.io")(server);
const PORT = 3000;

app.get("/", (req, res) => {
  res.sendFile(__dirname + "/index.html");
});

// ユーザー(クライアント)との接続を"connection"で受け取る
io.on("connection", (socket) => {
  console.log("ユーザーが接続しました");
  // メッセージを受け取る
  socket.on("chat message", (msg) => {
    // クライアント側に送信して画面で表示できるようにする
    io.emit("chat message", msg);
  });
});

server.listen(PORT, () => {
  console.log("listening on 3000");
});
