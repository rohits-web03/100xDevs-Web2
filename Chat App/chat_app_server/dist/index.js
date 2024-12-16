"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const ws_1 = require("ws");
const wss = new ws_1.WebSocketServer({ port: 8080 });
let userCount = 0;
let allSockets = [];
wss.on("connection", (socket) => {
    allSockets.push(socket);
    userCount += 1;
    const userId = userCount;
    console.log(`User connected #${userId}`);
    socket.on("message", (message) => {
        console.log(`${message} received from #${userId}`);
        allSockets.forEach((client) => {
            client.send(`#${userId}:${message} from server`);
        });
    });
    socket.on("close", () => {
        userCount -= 1;
        console.log(`User disconnected #${userId}`);
    });
});
