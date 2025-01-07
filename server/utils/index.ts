import {Server, type ServerOptions, type Socket} from 'socket.io'
import type {H3Event} from 'h3'
import orderModel from "~/server/models/order.model";

const options: Partial<ServerOptions> = {
    path: '/api/socket.io',
    serveClient: true,
    allowEIO3: true,
    cors: {
        origin: "*",
        methods: ["GET", "POST"],
        credentials: false
    },
    transports: [
        'websocket',
        'polling'
    ]
}

export const io = new Server(options);

export function initSocket(event: H3Event) {
    try {
    // @ts-ignore
    io.attach(event.node.res.socket?.server);

    io.on('connection', (socket: Socket) => {
        console.log("Conexao estabelecida com o socket")

        orderModel.find({}).then(function (data) {
            io.to(socket.id).emit('data-retriver', data)
        });

        orderModel.watch().on('change', data => {
            orderModel.find({}).then(function (data) {
                io.to(socket.id).emit('data-retriver', data)
            });
        });
    })
    } catch (e) {
        console.log("err socket", e)
    }
}