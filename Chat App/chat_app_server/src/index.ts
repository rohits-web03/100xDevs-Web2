import { WebSocketServer, WebSocket } from "ws";

const wss = new WebSocketServer({ port: 8080 });

let userCount = 0;
let allSockets: Map<string,WebSocket[]> =new Map();

wss.on("connection", (socket) => {
    socket.on("message", (msg)=>{
        let message=JSON.parse(msg.toString());
        if(message.type==="join"){
            const room=message.payload.roomId;
            if(!allSockets.has(room)){
                allSockets.set(room,[]);
            }
            allSockets.get(room)?.push(socket);
        }
        if(message.type==="chat"){
            const room=message.payload.roomId;
            const roomUsers=allSockets.get(room);
            roomUsers?.forEach((user)=>{
                user.send(message.payload.message);
            })
        }
    })

    socket.on("close", () => {
        // userCount-=1;
        console.log(`User disconnected`);
    });
});
