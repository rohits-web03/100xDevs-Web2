"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const ws_1 = require("ws");
const wss = new ws_1.WebSocketServer({ port: 8080 });
let userCount = 0;
let allSockets = new Map();
/*
{
   "type": "join",
   "payload": {
     "roomId": "123"
   }
}
{
    "type": "chat",
    "payload": {
        "message: "hi there",
        "roomId": "123"
    }
}
*/
wss.on("connection", (socket) => {
    socket.on("message", (msg) => {
        var _a;
        let message = JSON.parse(msg.toString());
        if (message.type === "join") {
            const room = message.payload.roomId;
            if (!allSockets.has(room)) {
                allSockets.set(room, []);
            }
            (_a = allSockets.get(room)) === null || _a === void 0 ? void 0 : _a.push(socket);
        }
        if (message.type === "chat") {
            const room = message.payload.roomId;
            const roomUsers = allSockets.get(room);
            roomUsers === null || roomUsers === void 0 ? void 0 : roomUsers.forEach((user) => {
                user.send(message.payload.message);
            });
        }
    });
    socket.on("close", () => {
        userCount -= 1;
        console.log(`User disconnected`);
    });
});
