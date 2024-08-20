import userRoute from "./routes/User.route";
import phoneRoute from "./routes/Phone.route";
import tokenRoute from "./routes/Token.route";
// import connection from "./models/index";
import express from "express";
import path from 'path';
import { swaggerSpec, swaggerUi } from "./swagger";
import http from "http";
import { Server } from "socket.io";
import { JWTdecoder } from "./utilities/jwtencoder";
import { tokenDecoder } from "./utilities/tokenHandler";
import PhoneService from "./services/Phone.service";
import cors from "cors";
// import upload from "./utilities/multerConfig";

const app = express();
const server = http.createServer(app); // Crea un servidor HTTP
const io = new Server(server, {
    cors: {
        origin: "*", // Permitir solicitudes de cualquier origen. Cambia esto según sea necesario.
        methods: ["GET", "POST"],
        allowedHeaders: ["Authorization"],
        credentials: true
    }
}); // Inicializa Socket.IO con el servidor HTTP y configura CORS

app.use(cors({
    origin: "*" // Permitir solicitudes de cualquier origen. Cambia esto según sea necesario.
}));
app.use(express.json());
app.use("/api/user", userRoute);
app.use("/api/phone", phoneRoute);
app.use("/api/token", tokenRoute);
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

io.use((socket, next) => {
    try {
        const authHeader = socket.handshake.headers.authorization?.split(' ');

        if (authHeader[0] !== 'Bearer') {
            return next(new Error('You don\'t have the required access.'));
        }

        const payload = JWTdecoder(authHeader[1])?.payload || tokenDecoder(authHeader[1])?.payload;
        socket.payload = payload;
        next();
    } catch (error) {
        next(new Error('Authentication error.'));
    }
});

// Conexión a Socket.IO
io.on('connection', (socket) => {
    console.log('A user connected');

    socket.on('loadPhones', (loading) => {
        console.log(loading);
        if (loading) {
            const userId = socket.payload.userId;

            PhoneService.loadPhones(userId, socket)
                .then((response) => {
                    console.log(response);
                    // Emitir solo al socket que hizo la solicitud
                    // socket.broadcast.emit('loadPhoneResponse', response);
                })
                .catch((err) => {
                    console.log(err);
                    // Emitir el error al socket que hizo la solicitud
                    // socket.emit('loadPhoneResponse', { error: err.message });
                });
        }
    });

    socket.on('deletePhones', (loading)=>{
        console.log(loading);
        if(loading){
            const userId = socket.payload.userId;

            PhoneService.deletePhones(userId, socket)
            .then((response)=>{
                console.log(response)
            })
            .catch((err)=>{
                console.log(err)
            })
        }
    })

    // Manejar desconexión
    socket.on('disconnect', () => {
        console.log('User disconnected');
    });
});

// connection.sequelize.sync({ force: true })
// .then(()=> {
//     server.listen(3000, ()=>{
//         console.log("Server running on port 3000!")
//     })
// });

server.listen(3000, () => {
    console.log("Server running on port 3000!");
});
