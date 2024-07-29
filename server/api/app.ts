import userRoute from "./routes/User.route";
import phoneRoute from "./routes/Phone.route";
import tokenRoute from "./routes/Token.route";

import connection from "./models/index";
import express from "express";
import path from 'path';
import { swaggerSpec, swaggerUi } from "./swagger";
import http from "http";
import { Server } from "socket.io";
import { JWTdecoder } from "./utilities/jwtencoder";
import { tokenDecoder } from "./utilities/tokenHandler";
import PhoneService from "./services/Phone.service";
import cors from "cors"
// import upload from "./utilities/multerConfig";

const app = express();
const server = http.createServer(app); // Crea un servidor HTTP
const io = new Server(server); // Inicializa Socket.IO con el servidor HTTP

app.use(cors({
    origin: "*"
}))
app.use(express.json());
app.use("/api/user", userRoute)
app.use("/api/phone", phoneRoute)
app.use("/api/token", tokenRoute)


app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

io.use((socket, next)=>{
    try {
        const authHeader = socket.handshake.headers.authorization?.split(' ')

        if(authHeader[0] != 'Bearer'){
            next(new Error('You dont have the required accesss.'))
        }

        const payload = JWTdecoder(authHeader[1])?.payload || tokenDecoder(authHeader[1]).payload;
        socket.payload = payload;
        next();
    const token = socket.handshake.headers.authorization?.split(' ')
    } catch (error) {
        next(new Error('Authentification error.'))
    }
})

// Conexión a Socket.IO
io.on('connection', (socket) => {
    console.log('A user connected');

    socket.on('loadPhones', (loading)=>{
        console.log(loading)
        if(loading){
            const userId = socket.payload.userId;

            PhoneService.loadPhones(userId, socket)
            .then((response)=>{
                console.log(response);
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

connection.sequelize.sync({ force: true })
.then(()=> {
    server.listen(3000, ()=>{
        console.log("Server running in port 3000!")
    })
})

// server.listen(3000, ()=>{
//     console.log("Server running in port 3000!")
// })