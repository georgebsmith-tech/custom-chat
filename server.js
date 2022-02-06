const express = require("express");
const app = express();
const http = require("http");
const server = http.createServer(app);
const cors = require("cors");
// const { Server } = require("socket.io");
// const io = new Server(server);

app.use(cors());

const io = (exports.io = require("socket.io")(server, {
  cors: {
    origin: "*",
    methods: ["GET", "POST"],
  },
}));

app.get("/", (req, res) => {
  res.sendFile(__dirname + "/index.html");
});

io.on("connection", (socket) => {
  console.log("a user connected");
  socket.emit("users", [1, 2, 3, 4, 3, 78]);
  socket.on("con", (data) => console.log(data));
});

server.listen(5500, () => {
  console.log("listening on *:5500");
});
